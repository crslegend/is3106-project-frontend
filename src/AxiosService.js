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

// set JWT, add refresh token to cookie
const storeCredentials = ({ access, refresh }) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  Cookies.set("token", refresh, { expires: 1, path: "" });
};

// remove refresh token cookie
const removeCredentials = () => {
  Cookies.remove("token");
};

// set interceptor to refresh token when 401 is encountered
client.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      const originReq = err.config;
      // console.log(originReq);
      if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
        originReq.__isRetryRequest = true;

        let res = axios
          .post(`${BACKEND_URL}/api/token/refresh/`, {
            refresh: Cookies.get("token"),
          })
          .then((res) => {
            client.defaults.headers.common["Authorization"] = `Bearer ${res.data.access}`;
            originReq.headers.Authorization = `Bearer ${res.data.access}`;
            return client(originReq);
          });

        resolve(res);
      }

      return Promise.reject(err);
    });
  }
);

export default {
  client,
  ntucClient,
  storeCredentials,
  removeCredentials,
};
