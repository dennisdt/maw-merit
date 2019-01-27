import axios from "axios";

export function RedeemReward(username, id) {
  return axios.post("/api/redeem-reward/" + username + "/" + id);
}
export function CancelReward(username, id) {
  return axios.post("/api/remove-pending-reward/" + username + "/" + id);
}
