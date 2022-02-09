var express = require('express');
var router = express.Router();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://abubakar2000:abubakar2000@cluster0.jm8lx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("chatapi").collection("user");
  // perform actions on the collection object
  console.log("Chatapi Database connection successfull...");
  console.log("Schema users test: Successful");
  client.close();
});

var loggedInUsers = [];

router.get('/', function (req, res, next) {
  res.send('users api');
});




//localhost:3000/users/signup
// {
//   "username": "pritamworld123",
//   "firstname": "pritesh",
//   "lastname": "Patel",
//   "password": "What about covid19 vaccine?",
//   "createon": "01-28-2022 18:30 PM"
// }

router.post('/signup', (req, res) => {

  client.connect(err => {

    client.connect(err => {
      const collection = client.db("chatapi").collection("user");

      collection.find().toArray()
        .then(_ => {
          if (_.findIndex(d => d.username === req.body.username) === -1) {
            client.connect(err => {
              const collection = client.db("chatapi").collection("user");
              collection.insertOne(req.body, (error, insertRes) => {
                if (!err) {
                  res.send("Inserted record")
                } else {
                  res.send(err)
                }
              });
            });
          } else {
            res.send({ message: "username already chosen" })
          }
        });
    });
  });
});


//localhost:3000/users/login
// {
//   "username": "pritamworld123",
//   "password": "What about covid19 vaccine?"
// }
router.post('/login', (req, res) => {
  client.connect(err => {

    client.connect(err => {
      const collection = client.db("chatapi").collection("user");

      collection.find().toArray()
        .then(_ => {

          if (_.findIndex(d => d.username === req.body.username && d.password === req.body.password) !== -1) {
            loggedInUsers.push(req.body.username);

            console.log(loggedInUsers);
            res.send("User logged In")
          } else {
            res.send("Invalid Username password")
          }
        });
    });
  });
});


//localhost:3000/users/logout/pritamworld123
router.get('/logout/:username', (req, res) => {
  loggedInUsers = loggedInUsers.filter(d => d !== req.params.username);
  console.log(loggedInUsers);
  res.send("Logout")
});

//localhost:3000/users/isloggedin/username
router.get('/isloggedin/:username', (req, res) => {
  if (loggedInUsers.findIndex(d => d === req.params.username) !== -1) {
    res.send("OK")
  } else {
    res.send("ERR")
  }
});
module.exports = router;
