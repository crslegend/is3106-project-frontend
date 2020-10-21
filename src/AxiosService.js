import axios from "axios";
import Cookies from "js-cookie";
import { BACKEND_URL } from "./config";

axios.defaults.timeout = 2500;

const baseClient = axios.create({
  baseURL: BACKEND_URL,
});

const client = axios.create({
  baseURL: BACKEND_URL,
});

const ntucClient = axios.create({
  baseURL: "https://website-api.omni.fairprice.com.sg/api/layout/category/v2",
});

// set JWT, add refresh token to cookie
const storeCredentials = ({ access, refresh }) => {
  client.defaults.headers.common.Authorization = `Bearer ${access}`;
  Cookies.set("t1", access, { expires: 1, path: "/" });
  Cookies.set("t2", refresh, { expires: 1, path: "/" });
};

// remove refresh token cookie
const removeCredentials = () => {
  Cookies.remove("t1");
  Cookies.remove("t2");
};

// set request interceptor to use access token if exists
client.interceptors.request.use(
  (config) => {
    if (Cookies.get("t1")) {
      config.headers.Authorization = `Bearer ${Cookies.get("t1")}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// set response interceptor to refresh token when 401 is encountered
client.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    return new Promise((resolve, reject) => {
      const originReq = err.config;
      // console.log(originReq);
      if (err.response.status === 401 && err.config && !err.config.isRetryRequest) {
        originReq.isRetryRequest = true;

        const q = axios
          .post(`${BACKEND_URL}/api/token/refresh/`, {
            refresh: Cookies.get("t2"),
          })
          .then((res) => {
            client.defaults.headers.common.Authorization = `Bearer ${res.data.access}`;
            originReq.headers.Authorization = `Bearer ${res.data.access}`;
            Cookies.remove("t1");
            Cookies.set("t1", res.data.access, { expires: 1, path: "" });
            return client(originReq);
          });

        resolve(q);
      }

      return reject(err);
    });
  }
);

export default {
  baseClient,
  client,
  ntucClient,
  storeCredentials,
  removeCredentials,
};
