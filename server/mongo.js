var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://forrest:testing123@ds213755.mlab.com:13755/merit"
var db
var connected

async function init()
{
  if(!connected) await connect()
}

exports.init = init

function connect()
{
  var promise = new Promise(function(resolve, reject) {
    MongoClient.connect(url, function(err, database) {
      if(err) throw err
      db = database
      connected = true
      resolve()
    })
  })
  return promise
}

function getDB()
{
  return db.db("merit")
}

exports.getDB = getDB
