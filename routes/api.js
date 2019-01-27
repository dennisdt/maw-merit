var express = require("express");
var router = express.Router();
var volunteers = require("../server/volunteers");
var events = require('../server/events')
var referral = require('../server/referral')

router.get("/ping", (req, res) => {
  var data = '"pong"';
  res.send(data);
});

router.get("/get-volunteer-data/:username", (req, res) => {
  var username = req.params.username;
  volunteers.getData(username).then(d => {
    var str = JSON.stringify(d);
    res.send(str);
  });
});

router.post('/subtract-points/:username/:pts', (req, res) => {
  var username = req.params.username
  var pts = req.params.pts
  volunteers.subtractPoints(username, pts).then(() => {
    res.end()
  })
})

router.post('/remove-pending-reward/:username/:id', (req, res) => {
  var username = req.params.username
  var id = req.params.id
  volunteers.removePendingReward(username, id).then(() => {
    res.end()
  })
})

router.post('/redeem-reward/:username/:reward_str', (req, res) => {
  var username = req.params.username
  var reward = JSON.parse(req.params.reward_str)
  volunteers.redeemReward(username, reward).then(() => {
    res.end()
  })
})

router.get('/get-events', (req, res) => {
  events.getData().then(d => {
    var str = JSON.stringify(d)
    res.send(str)
  })
})

router.post('/add-event/:event_data', (req, res) => {
  var d = JSON.parse(req.params.event_data)
  events.addEvent(d).then(() => {
    res.end()
  })
})

router.post('/remove-event/:id', (req, res) => {
  var id = req.params.id
  events.removeEvent(id).then(() => {
    res.end()
  })
})

router.post('/add-event-reward/:username/:id', (req, res) => {
  var username = req.params.username
  var id = req.params.id
  volunteers.addEventReward(username, id).then(() => {
    res.end()
  })
})

router.post('/refer-friend/:username/:first_name/:last_name/:email', (req, res) => {
  var username = req.params.username,
      first_name = req.params.first_name,
      last_name = req.params.last_name,
      email = req.params.email
  referral.referFriend(username, first_name, last_name, email).then(() => {
    res.end()
  })
})

module.exports = router;
