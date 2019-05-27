const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');

const jwt = require('jsonwebtoken');
const config = require('./config');
const middleware = require('./middleware');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
	console.log('server started on 3000');
});

const MongoClient = require('mongodb').MongoClient;
const mongoUri = 'mongodb://foodie:f00diepw@ds211875.mlab.com:11875/food_diary';

const client = new MongoClient(mongoUri, { useNewUrlParser: true });

var db;
var recordsCollection;
var usersCollection;
var ObjectId = require('mongodb').ObjectID;

client.connect((err) => {
	assert.equal(null, err);
	console.log("Connected successfully to Mongo server");

	db = client.db('food_diary');
	usersCollection = db.collection('users');
	recordsCollection = db.collection('records');
	mealsCollection = db.collection('meals');
	dishesCollection = db.collection('dishes');
});

app.post('/login', (req, res) => {
	return login(req, res);
});

app.post('/signup', (req, res) => {
	return signup(req, res);
});

app.route('/meals')
	.get(middleware.checkToken, (req, res) => {
		findMeals(req.decoded.userId, (docs) => {
			console.log("get all meals");
			console.log(docs);
			res.json(docs);
		})
	})
	.post(middleware.checkToken, (req, res) => {
		const userId = req.decoded.userId;
		date = zeroDate(req.body.lastEaten);
		req.body.lastEaten = date;
		insertMeal(userId, req.body, (results) => {
			console.log("insert meal");
			res.json(results.insertedId);
		})
	})
	.delete(middleware.checkToken, (req, res) => {
		const userId = req.decoded.userId;
		deleteMeals(userId, (results) => {
			console.log("deleted meals");
		})
	})

app.route('/meals/:meal')
	.delete(middleware.checkToken, (req, res) => {
		const userId = req.decoded.userId;
		deleteMeal(userId, req.body, (results) => {
			console.log("deleted meal");
		})
	})

app.route('/days')
	.get(middleware.checkToken, (req, res) => {
		findDays(req.decoded.userId, (days) => {
			recordsCollection.aggregate([
				{
					$match: { "userId": ObjectId(req.decoded.userId) }
				},
				{
					$unwind: "$dayRecords"
				},
				{
					$unwind: "$dayRecords.meals"
				},
				{
					$lookup:
					{
						from: "meals",
						localField: "dayRecords.meals",
						foreignField: "_id",
						as: "mealRecords"
					}
				},
				{
					$unwind: "$mealRecords"
				},
				{
					$group: {
						_id: "$dayRecords.date",
						meals: { $push: "$mealRecords" }
					}
				}
			]).toArray().then((aggregatedRes) => {
				var records = [];

				aggregatedRes.forEach(record => {
					var dayRecord = {
						date: record._id,
						meals: []
					};

					record.meals.forEach(meal => {
						dayRecord.meals.push(meal.meal);
					});

					records.push(dayRecord)
				});

				res.json(records)
			})
		})
	})
	.post(middleware.checkToken, (req, res) => {
		updateDay(req.decoded.userId, req.body, (result) => {
			res.json(result);
		})
	})
	.put(middleware.checkToken, (req, res) => {
		updateDay(req.decoded.userId, req.body, (result) => {
			res.json(result);
		})
	})
	.delete(middleware.checkToken, (req, res) => {
		deleteDays(req.decoded.userId, (response) => {
			res.json(response);
		})
	})

app.route('/days/:date', middleware.checkToken)
	.get(middleware.checkToken, (req, res) => {
		let date = req.params.date;
		findDay(req.decoded.userId, date, (doc) => {
			res.json(doc);
		})
	})
	.delete(middleware.checkToken, (req, res) => {
		let date = req.params.date;
		deleteDay(req.decoded.userId, date, (response) => {
			res.json(response);
		})
	})

//format it to only return meal.meal?
const findMeals = (userId, callback) => {
	mealsCollection.find({ userId: userId }).toArray((err, docs) => {
		assert.equal(err, null);
		callback(docs);
	});
}

const findMeal = (userId, mealId, callback) => {
	mealsCollection.findOne({ $and: [{ userId: userId }, { _id: mealId }] }, (err, doc) => {
		callback(doc.meal);
	})
}

const insertMeal = (userId, meal, callback) => {
	mealsCollection.insertOne({ userId: userId, "meal": meal }, (err, res) => {
		assert.equal(err, null);
		callback(res);
	})
}

const deleteMeals = (userId, callback) => {
	mealsCollection.deleteMany({ userId: userId}, (err, res) => {
		assert.equal(err, null);
		callback(res);
	})
}

const deleteMeal = (userId, meal, callback) => {
	mealsCollection.deleteOne({ userId: userId, meal: meal }, (err, res) => {
		assert.equal(err, null);
		callback(res);
	})
}

/* find all */
const findDays = (userId, callback) => {
	findUserRecord(userId, (userRecord) => {
		assert.notEqual(userRecord, null);
		callback(userRecord.dayRecords);
	})
}

/* find one */
const findDay = (userId, dateParam, callback) => {
	const date = parseInt(dateParam, 10);

	findUserRecord(userId, (userRecord) => {
		let filteredRecords = userRecord.dayRecords.filter(dayRecord => ((new Date(dayRecord.date)).getTime() === date))[0];
		callback(filteredRecords);
	})
}

/* update */
const updateDay = (userId, day, callback) => {
	const date = parseInt((new Date(day.date)).getTime(), 10);
	findUserRecord(userId, (userRecord) => {
		day.meals = day.meals.map(mealId => ObjectId(mealId));

		let dayRecords = userRecord.dayRecords;
		let newRecords = dayRecords.filter(dayRecord => ((new Date(dayRecord.date)).getTime() !== date));

		newRecords.push(day);

		recordsCollection.updateOne({ userId: ObjectId(userId) }, { $set: { dayRecords: newRecords } }, (err, results) => {
			assert.equal(err, null);
			callback("updated one");
		})
	})
}

/* delete one */
const deleteDay = (userId, dateParam, callback) => {
	const date = parseInt(dateParam, 10);

	findUserRecord(userId, (userRecord) => {
		let updatedDays = userRecord.dayRecords.filter(dayRecord => ((new Date(dayRecord.date)).getTime() !== date));

		recordsCollection.updateOne({ userId: ObjectId(userId) }, { $set: { dayRecords: updatedDays } }, (err, results) => {
			assert.equal(err, null);
			callback("deleted day");
		});
	})
}

/* delete all */
const deleteDays = (userId, callback) => {
	recordsCollection.updateOne({ userId: ObjectId(userId) }, { $set: { dayRecords: [] } }, (err, results) => {
		assert.equal(err, null);
		callback(results);
	});
}

const findUserRecord = (userId, callback) => {
	recordsCollection.findOne({ userId: ObjectId(userId) }, (err, doc) => {
		assert.equal(err, null);
		callback(doc);
	})
}

const login = (req, res) => {
	let email = req.res.req.body.email;
	let password = req.res.req.body.password;

	usersCollection.findOne({ email: email }, (err, doc) => {
		assert.equal(err, null);
		if (doc) {
			if (doc.password === password) {
				let expiresInTime = 300000;
				let token = jwt.sign({ userId: doc._id }, config.secret, { expiresIn: expiresInTime });
				res.json({ success: true, message: 'Authentication successful', token: token, expiresIn: expiresInTime });
			} else {
				console.log("no user found for email " + email + " password " + password);
				res.sendStatus(403);
			}
		} else {
			console.log("no user with this email was found");
			res.sendStatus(403);
		}
	})
}

const signup = (req, resSignup) => {
	let email = req.res.req.body.email;
	let password = req.res.req.body.password;
	usersCollection.insertOne({ email: email, password: password }, (err, res) => {
		assert.equal(err, null);

		recordsCollection.insertOne({ userId: res.insertedId, dayRecords: [] }, (err, res) => {
			assert.equal(err, null);
			resSignup.json({ success: true, message: 'Sign up successful, new user: ' + res.insertedId });
		})
	});
}

const zeroDate = (date) => {
	var newDate = new Date(date);
	newDate.setHours(0, 0, 0, 0);
	return newDate;
}