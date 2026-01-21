import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api`,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default http;
