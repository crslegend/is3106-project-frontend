import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "./config";

axios.defaults.timeout = 2500;

const client = axios.create({
  baseURL: BACKEND_URL,
});

const ntucClient = axios.create({
  baseURL: "https://website-api.omni.fairprice.com.sg/api/layout/category/v2",
});

const storeCredentials = ({ access, refresh }) => {
  client.defaults.headers.common["Authorization"] = `Bearer `;
  Cookies.set("token", refresh);
};

// set interceptor to refresh token when 401 is encountered
client.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      console.log(err.config);
    }
  }
);

export default {
  client,
  ntucClient,
  storeCredentials,
};
