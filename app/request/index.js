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

//查询设备基部件
export function getLimsBasicDevicePart(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdeviceparts/page", data);
}
//新增设备部件
export function addLimsBasicDevicePart(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdeviceparts/save", data);
}
//删除设备部件
export function delLimsBasicDevicePart(data) {
  return fetchJSONData("POST", "/api/base/LimsBasicdeviceparts/del", data);
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

/**借出管理 */

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
//根据ID查询借出清单
export function getLimsUselendById(data) {
  return fetchJSONData("POST", "/api/base/LimsUselendapply/queryById", data);
}
//审批借出流程
export function approvalLimsUseLendapply(data) {
  return fetchJSONData("POST", "/api/base/LimsUselendapply/approval", data);
}

/**归还管理 */
//查询归还
//查询归还申请
export function getLimsUseReturn(data) {
  return fetchJSONData("POST", "/api/base/LimsUsereturnapply/page", data);
}
//添加归还申请
export function addLimsUseReturn(data) {
  return fetchJSONData("POST", "/api/base/LimsUsereturnapply/save", data);
}
//更新归还申请
export function updLimsUseReturn(data) {
  return fetchJSONData("POST", "/api/base/LimsUsereturnapply/update", data);
}
//删除归还申请
export function delLimsUseReturn(data) {
  return fetchJSONData("POST", "/api/base/LimsUsereturnapply/del", data);
}
//根据ID查询归还清单
export function getReturnById(data) {
  return fetchJSONData("POST", "/api/base/LimsUsereturnapply/queryById", data);
}
//审批归还流程
export function approvaReturn(data) {
  return fetchJSONData("POST", "/api/base/LimsUsereturnapply/approval", data);
}

//查询归还清单
export function getLimsUseReturnList(data) {
  return fetchJSONData("POST", "/api/base/LimsUsereturnapplyitem/page", data);
}

/** 购置申请*/
//查询购置申请
export function getLimsUselanapply(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapply/page", data);
}
//添加购置申请
export function addLimsUselanapply(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapply/save", data);
}
//更新购置申请
export function updLimsUselanapply(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapply/update", data);
}
//删除购置申请
export function delLimsUselanapply(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapply/del", data);
}
//根据ID查询购置申请清单
export function getLimsUselanapplyById(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapply/queryById", data);
}
//审批购置流程
export function approvalLimsUselanapply(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapply/approval", data);
}
//导出购置申请
export function exportLimsUselanapply() {
  return "/api/base/LimsPurplanapply/export";
}

//查询购置申请清单
export function getLimsUselanapplyList(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapplyitem/page", data);
}
//添加购置申请清单
export function addLimsUselanapplyList(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapplyitem/save", data);
}
//更新购置申请清单
export function updLimsUselanapplyList(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapplyitem/update", data);
}
//删除购置申请清单
export function delLimsUselanapplyList(data) {
  return fetchJSONData("POST", "/api/base/LimsPurplanapplyitem/del", data);
}

//查询购置申请清单管理
export function getLanapplyPurByList(data) {
  return fetchJSONData("POST", "/api/base/LimsPur/query", data);
}

//查询购置管理
export function getLimsUselanapplyListPur(data) {
  return fetchJSONData("POST", "/api/base/LimsPur/page", data);
}
//修改购置管理
export function updLimsUselanapplyListPur(data) {
  return fetchJSONData("POST", "/api/base/LimsPur/update", data);
}
//添加购置管理
export function addLimsUselanapplyListPur(data) {
  return fetchJSONData("POST", "/api/base/LimsPur/save", data);
}


//查询购置申请清单 购置清单列表
export function getLimsUselanapplyListPurItem(data) {
  return fetchJSONData("POST", "/api/base/LimsPuritem/query", data);
}

//购置单管理导出
export function exportLimsUselanapplyListPurItem(data) {
  return "/api/base/LimsPur/export";
}

//查询单据附件
export function getAttachment(data) {
  return fetchJSONData("POST", "/api/base/LimsAttachment/page", data);
}
//新增单据附件
export function addAttachment(data) {
  return fetchJSONData("POST", "/api/base/LimsAttachment/saveAll", data);
}
//修改单据附件
export function updAttachment(data) {
  return fetchJSONData("POST", "/api/base/LimsAttachment/update", data);
}
//删除单据附件
export function delAttachment(data) {
  return fetchJSONData("POST", "/api/base/LimsAttachment/del", data);
}

/**维修管理 */
//查询维修申请
export function getRepair(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairapply/page", data);
}
//添加维修申请
export function addRepair(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairapply/save", data);
}
//更新维修申请
export function updRepair(data) {
  return fetchJSONData("POST", "api/base/LimsRepairapply/update", data);
}
//删除维修申请
export function delRepair(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairapply/del", data);
}
//根据ID查询维修清单
export function getRepairById(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairapply/queryById", data);
}
//审批维修流程
export function approvaRepair(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairapply/approval", data);
}

/**年度经费 */
//查询年度经费
export function getComplexfound(data) {
  return fetchJSONData("POST", "/api/base/LimsComplexfund/page", data);
}
//添加年度经费
export function addComplexfound(data) {
  return fetchJSONData("POST", "/api/base/LimsComplexfund/save", data);
}
//更新年度经费
export function updComplexfound(data) {
  return fetchJSONData("POST", "api/base/LimsComplexfund/update", data);
}
//删除年度经费
export function delComplexfound(data) {
  return fetchJSONData("POST", "/api/base/LimsComplexfund/del", data);
}

//查询工作流
export function getFlow(data) {
  return fetchJSONData("POST", "/api/base/LimsActivitimodel/page", data);
}
/**维修单管理 */
//查询维修管理
export function getRepairList(data) {
  return fetchJSONData("POST", "/api/base/LimsRepair/page", data);
}
//修改维修管理
export function updRepairList(data) {
  return fetchJSONData("POST", "/api/base/LimsRepair/update", data);
}
//导出维修管理
export function exportRepairList() {
  return "/api/base/LimsRepair/export";
}
//查询维修清单
export function getRepairItem(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairitem/page", data);
}

/**养护申请 */
//查询养护申请
export function getMaintian(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairmaintainapply/page", data);
}
//添加养护申请
export function addMaintian(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairmaintainapply/save", data);
}
//更新养护申请
export function updMaintian(data) {
  return fetchJSONData(
    "POST",
    "/api/base/LimsRepairmaintainapply/update",
    data
  );
}
//删除养护申请
export function delMaintian(data) {
  return fetchJSONData("POST", "/api/base/LimsRepairmaintainapply/del", data);
}
//根据id查询养护详情
export function getMaintianById(data) {
  return fetchJSONData(
    "POST",
    "/api/base/LimsRepairmaintainapply/queryById",
    data
  );
}
//导出养护详情
export function exportMaintian(data) {
  return "/api/base/LimsRepairmaintainapply/export";
}
/**养护管理 */
