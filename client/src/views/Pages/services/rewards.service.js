import axios from "axios";

export function GetData() {
  return axios.get("/api/get-volunteer-data/jj92");
}

export function GetUserInfo(username) {
  return axios.get("/api/get-volunteer-data/" + username);
}

export function SubtractPoints(points) {
  return axios.post("/api/subtract-points/jj92/" + points);
}
