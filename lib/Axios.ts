import axios from "axios";

const Axios = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "key",
  },
});

export default Axios;
