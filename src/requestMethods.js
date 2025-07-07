import axios from "axios";

const BASE_URL = "http://localhost:5000/api/"; // NEW LINK
// const BASE_URL = "https://rd-backend.herokuapp.com/api/"; // NEW LINK

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});
