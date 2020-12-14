import { fetchJSONData } from "@app/utils/common";

// 用户登录
export function loginIn(data) {
  // return testLogin("api/users/login", data);
  return fetchJSONData("POST", "/api/base/user/login", data);
}
//查询用户单位
export function getUserCompany(data) {
  return fetchJSONData("POST", "/api/base/LimsUsercompany/page", data);
}
//新增用户单位
export function addUserCompany(data) {
  return fetchJSONData("POST", "/api/base/LimsUsercompany/save", data);
}
//修改用户单位
export function updUserCompany(data) {
  return fetchJSONData("POST", "/api/base/LimsUsercompany/update", data);
}
//删除用户单位
export function delUserCompany(data) {
  return fetchJSONData("POST", "/api/base/LimsUsercompany/del", data);
}

//查询用户部门
export function getUserDepartment(data) {
  return fetchJSONData("POST", "/api/base/LimsUserdepartment/page", data);
}
//新增用户部门
export function addUserDepartment(data) {
  return fetchJSONData("POST", "/api/base/LimsUserdepartment/save", data);
}
//修改用户部门
export function updUserDepartment(data) {
  return fetchJSONData("POST", "/api/base/LimsUserdepartment/update", data);
}
//删除用户部门
export function delUserDepartment(data) {
  return fetchJSONData("POST", "/api/base/LimsUserdepartment/del", data);
}

//查询用户
export function getUser(data) {
  return fetchJSONData("POST", "/api/base/LimsUser/page", data);
}
//新增用户
export function addUser(data) {
  return fetchJSONData("POST", "/api/base/LimsUser/save", data);
}
//修改用户
export function updUser(data) {
  return fetchJSONData("POST", "/api/base/LimsUser/update", data);
}
//删除用户
export function delUser(data) {
  return fetchJSONData("POST", "/api/base/LimsUser/del", data);
}

//查询角色
export function getRole(data) {
  return fetchJSONData("POST", "/api/base/LimsUserrole/page", data);
}
//新增角色
export function addRole(data) {
  return fetchJSONData("POST", "/api/base/LimsUserrole/save", data);
}
//修改角色
export function updRole(data) {
  return fetchJSONData("POST", "/api/base/LimsUserrole/update", data);
}
//删除角色
export function delRole(data) {
  return fetchJSONData("POST", "/api/base/LimsUserrole/del", data);
}
//角色授权
export function setPermission(data) {
  return fetchJSONData("POST", "/api/base/LimsUserrolepermissions/save", data);
}
//查询权限
export function getJurisdiction(data) {
  return fetchJSONData("POST", "/api/base/LimsUserpermissions/page", data);
}
//新增权限
export function addJurisdiction(data) {
  return fetchJSONData("POST", "/api/base/LimsUserpermissions/save", data);
}
//修改权限
export function updJurisdiction(data) {
  return fetchJSONData("POST", "/api/base/LimsUserpermissions/update", data);
}
//删除权限
export function delJurisdiction(data) {
  return fetchJSONData("POST", "/api/base/LimsUserpermissions/del", data);
}

//查询用户账户
export function getLimsUseraccount(data) {
  return fetchJSONData("POST", "/api/base/LimsUseraccount/page", data);
}
//新增用户账户
export function addLimsUseraccount(data) {
  return fetchJSONData("POST", "/api/base/LimsUseraccount/save", data);
}
//修改用户账户
export function updLimsUseraccount(data) {
  return fetchJSONData("POST", "/api/base/LimsUseraccount/update", data);
}
//删除用户账户
export function delLimsUseraccount(data) {
  return fetchJSONData("POST", "/api/base/LimsUseraccount/del", data);
}

//查询设备类别
export function getLimsBasiccategory(data) {
  return fetchJSONData("POST", "/api/base/LimsBasiccategory/page", data);
}
//新增设备类别
export function addLimsBasiccategory(data) {
  return fetchJSONData("POST", "/api/base/LimsBasiccategory/save", data);
}
//修改设备类别
export function updLimsBasiccategory(data) {
  return fetchJSONData("POST", "/api/base/LimsBasiccategory/update", data);
}
//删除设备类别
export function delLimsBasiccategory(data) {
  return fetchJSONData("POST", "/api/base/LimsBasiccategory/del", data);
}

//查询设备基础数据
export function getLimsBasicDevice(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdevice/page", data);
}
//新增设备基础数据
export function addLimsBasicDevice(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdevice/save", data);
}
//修改设备基础数据
export function updLimsBasicDevice(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdevice/update", data);
}
//删除设备基础数据
export function delLimsBasicDevice(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdevice/del", data);
}

//查询供应商
export function getLimsSupplier(data) {
  return fetchJSONData("POST", "/api/base/LimsSupplier/page", data);
}
//新增供应商
export function addLimsSupplier(data) {
  return fetchJSONData("POST", "/api/base/LimsSupplier/save", data);
}
//修改供应商
export function updLimsSupplier(data) {
  return fetchJSONData("POST", "/api/base/LimsSupplier/update", data);
}
//删除供应商
export function delLimsSupplier(data) {
  return fetchJSONData("POST", "/api/base/LimsSupplier/del", data);
}


//查询数据字典
export function getLimsBasicDict(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdict/page", data);
}
//新增数据字典
export function addLimsBasicDict(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdict/save", data);
}
//修改数据字典
export function updLimsBasicDict(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdict/update", data);
}
//删除数据字典
export function delLimsBasicDict(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdict/del", data);
}

//查询使用借出
export function getLimsUselendapply(data) {
  return fetchJSONData("POST", "/api/base/LimsUselendapply/page", data);
}
//新增使用借出
export function addLimsUselendapply(data) {
  return fetchJSONData("POST", "/api/base/LimsUselendapply/save", data);
}
//修改使用借出
export function updLimsUselendapply(data) {
  return fetchJSONData("POST", "/api/base/LimsUselendapply/update", data);
}
//删除使用借出
export function delLimsUselendapply(data) {
  return fetchJSONData("POST", "/api/base/LimsUselendapply/del", data);
}