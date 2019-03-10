const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const assert = require('assert');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.listen(3000, () => {
	console.log('server started on 3000');
});

const MongoClient = require('mongodb').MongoClient;
const mongoUri = 'mongodb://foodie:f00diepw@ds211875.mlab.com:11875/food_diary';

const client = new MongoClient(mongoUri, {useNewUrlParser: true});

var db;
var foodCollection;

client.connect((err) => {
	assert.equal(null, err);
	console.log("Connected successfully to Mongo server");

	db = client.db('food_diary');
	foodCollection = db.collection('food');
});

app.get('/days', (req, res) => {
	findDays(db, (docs) => {
		console.log("get all");
		console.log(docs);
		res.json(docs);
	})
});

app.get('/days/:date', (req, res) => {
	findDay(db, req.params.date, (doc) => {
		console.log("get");
		console.log(doc);
		res.json(doc);
	})
})

app.delete('/days', (req, res) => {
	deleteDays(db, (response) => {
		console.log("delete all");
		console.log(response);
		res.json(response);
	})
});

app.delete('/days/:date', (req, res) => {
	deleteDay(db, req.params.date, (response) => {
		console.log("delete");
		console.log(response);
		res.json(response);
	})
});

app.post('/days', (req, res) => {
	insertDay(db, req.body, (result) => {
		console.log("post");
		console.log(result);
		res.json(result);
	})
});

app.put('/days/:date', (req, res) => {
	updateDay(db, req.params.date, req.body, (result) => {
		console.log("update");
		console.log(result);
		res.json(result);
	})
});

/* insert */
const insertDay = (db, day, callback) => {
	foodCollection.insertOne(day, (err, result) => {
		assert.equal(err, null);
		callback(result);
	})
}

/* update */
const updateDay = (db, date, day, callback) => {
	foodCollection.updateOne({"date": (new Date(parseInt(date, 10)).toISOString())}, { $set: { "meals": day.meals}});
}

/* find all */
const findDays = (db, callback) => {
	foodCollection.find({}).sort( { date: -1 }).toArray((err, docs) => {
		assert.equal(err, null);
		callback(docs);
	});
}

/* find one */
const findDay = (db, date, callback) => {
	const newDate = new Date(parseInt(date, 10));
	foodCollection.findOne({date: newDate.toISOString()}, (err, doc) => {
		assert.equal(err, null);
		callback(doc);
	})
}

/* delete */
const deleteDays = (db, callback) => {
	/*foodCollection.deleteMany({a: {$in: [1,2]}}, () => {
		console.log("deleted all!");
	})*/

	foodCollection.deleteMany({}, (response) => {
		console.log("deleted all!");
		callback(response);
	})
}

const deleteDay = (db, date, callback) => {
	const newDate = new Date(parseInt(date, 10));
	foodCollection.deleteOne({date: newDate.toISOString()}, (err, response) => {
		assert.equal(err, null);
		callback(response);
	})
}