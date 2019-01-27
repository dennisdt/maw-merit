var volunteers = require('./volunteers')

async function referFriend(username, first_name, last_name, email) {
  await volunteers.addReferralReward(username, first_name, last_name)
}

exports.referFriend = referFriend
