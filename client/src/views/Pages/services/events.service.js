import axios from "axios";

export function GetEvents() {
  return axios.get("/api/get-events/");
}
export function SignUpEvent(id) {
  return axios.post("/api/add-event-reward/jj92/" + id);
}
export function SubmitEvent(payload) {
  return axios.post("/api/add-event/" + JSON.stringify(payload));
}
export function CancelEvent(id) {
  return axios.post("/api/remove-event/" + id);
}
export function GetData() {
  return axios.get("/api/get-volunteer-data/jj92");
}
