var mongo = require('./mongo')
var util = require('./utility')
var hash = require('object-hash')

function getEvent(id) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    var q = {id: id}
    db.collection('events').findOne(q, (e, res) => {
      resolve(res)
    })
  })
  return promise
}

exports.getEvent = getEvent

function addEvent(data) {
  var id = hash([data.name, data.description, data.date, data.reward])
  data.id = id
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    db.collection('events').insertOne(data, (err, res) => {
      resolve()
    })
  })
  return promise
}

exports.addEvent = addEvent

function removeEvent(id) {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    var q = {id: id}
    db.collection('events').deleteOne(q, (err, res) => {
      resolve()
    })
  })
  return promise
}

exports.removeEvent = removeEvent

function getData() {
  var promise = new Promise((resolve, reject) => {
    var db = mongo.getDB()
    db.collection("events").find({}).toArray((e, res) => {
      resolve(res)
    })
  })
  return promise
}

exports.getData = getData

var data1 = {
  name: 'Smash Bros Tourney',
  description: 'Smash Bros for Charity',
  date: '2019-01-30',
  reward: 25
}

var eid = '684eda380d497fed2abf200f459176a94888bea1'

mongo.init().then(() => {
  // addEvent(data1)
  // removeEvent('a4f0abdda0b960321d99d046f6b3281d7ef71ddb')
  // getData().then(d => console.log(d))
})
