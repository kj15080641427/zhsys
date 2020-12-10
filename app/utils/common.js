import { createHashHistory } from "history";
import { message } from "antd";
const hashHistory = createHashHistory();

const isV2 = 0;
export const URL = isV2 ? "/api" : "/api";

export function fetchJSONData(method, url, data) {
  // url = URL + url;
  return fetch(url, {
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    // 注意 post 时候参数的形式
    body: data ? JSON.stringify(data) : null,
  }).then((res) => {
    if (res.status == 500) {
      message.error("网络请求失败,500");
    }
    if (res.status == 400) {
      hashHistory.push("/");
    }
    if (res.status == "404") {
      message.error("网络请求失败,404");
    }
    if (url === "/api/users/login") {
      return res.ok ? res : Promise.reject("接口出错");
    } else {
      return res.ok ? res.json() : Promise.reject("接口出错");
    }
  });
}
