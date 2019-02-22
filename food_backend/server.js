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

app.get('/foods', (req, res) => {
	findDocuments(db, (docs) => {
		res.json(docs);
	})
});

app.delete('/foods', (req, res) => {
	console.log("inside delete!");
	deleteDocuments(db, (response) => {
		console.log("deleted");
		res.json(response);
	})
});

app.post('/food', (req, res) => {
	console.log("inside post");
	console.log(req.body);
	insertFood(db, req.body, (result) => {
		console.log("posted");
		res.json(result);
	})
	//res.json();
})

/* insert */
const insertFood = (db, food, callback) => {
	foodCollection.insert(food, (err, result) => {
		assert.equal(err, null);
		callback(result);
	})
}

/* find */
const findDocuments = (db, callback) => {
	foodCollection.find({}).toArray(function(err, docs) {
		assert.equal(err, null);
		console.log("Found the following records");
		console.log(docs);
		callback(docs);
	});
}

/* delete */
const deleteDocuments = (db, callback) => {
	/*foodCollection.deleteMany({a: {$in: [1,2]}}, () => {
		console.log("deleted all!");
	})*/

	foodCollection.deleteMany({}, (response) => {
		console.log("deleted all!");
		callback(response);
	})
}