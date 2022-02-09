const express = require('express');
const router = express.Router();

const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://abubakar2000:abubakar2000@cluster0.jm8lx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const collection = client.db("chatapi").collection("message");
    // perform actions on the collection object
    console.log("Chatapi Database connection successfull...");
    console.log("Schema messages test: Successful");
    client.close();
});

router.get('/', (req, res) => {
    res.send("messsages api")
});


// localhost:3000/messages/addroom/traffic
router.get('/addroom/:roomname', (req, res) => {

    client.connect(err => {
        const collection = client.db("chatapi").collection("room");
        collection.find().toArray()
            .then(rooms => {
                if (rooms.findIndex(r => r.name === req.params.roomname) === -1) {
                    client.connect(err => {
                        const collection = client.db("chatapi").collection("room");
                        collection.insertOne({ name: req.params.roomname }, (err, res2) => {
                            if (!err) {
                                res.send("Room added");
                            } else {
                                res.send("Cant create new room");
                            }
                        });
                    });
                }
                else {
                    res.send("Room already exists")
                }
            })
            .catch(err => {
                res.send("Cant transfer data")
            });
    });




});


// localhost:3000/messages/rooms
router.get('/rooms', (req, res) => {
    client.connect(err => {
        const collection = client.db("chatapi").collection("room");
        collection.find().toArray()
            .then(rooms => {
                res.send(rooms);
            })
            .catch(err => {
                res.send("Cant transfer data")
            });
    });
});

// localhost:3000/messages/send
// {
//     "from_user": "pritamworld",
//         "to_user": "moxdroid",
//             "room": "covid19",
//                 "message": "What about covid19 vaccine?",
//                     "date_sent": "01-28 - 2021 18: 30 PM"
// }
router.post('/send', (req, res) => {
    client.connect(err => {
        const collection = client.db("chatapi").collection("message");
        collection.insertOne(req.body, (error, messErr) => {
            res.send("Sent message")
        });
    });
});


// localhost:4000/messages/chat/covid19/pritamworld
router.get('/chat/:room/:username', (req, res) => {
    client.connect(err => {
        const collection = client.db("chatapi").collection("message");
        collection.find({ room: req.params.room, from_user: req.params.username }).toArray()
            .then(chat => {
                res.send(chat);
            })
            .catch(err => {
                res.send(err)
            })
            .finally(() => {
                console.log("Done");
            });
    });
});

module.exports = router;