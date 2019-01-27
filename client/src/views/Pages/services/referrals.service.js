import axios from "axios";

export function ReferFriend(username, first_name, last_name, email) {
  return axios.post("/api/refer-friend/" + username + '/' + first_name + '/' + last_name + '/' + email);
}
