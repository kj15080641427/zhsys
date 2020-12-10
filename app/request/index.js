import { fetchJSONData } from "@app/utils/common";

// 用户登录
export function loginIn(data) {
  // return testLogin("api/users/login", data);
  return fetchJSONData("POST", "/api/base/LimsUser/login", data);
}
