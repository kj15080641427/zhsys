import React from "react";
import BaseTable from "./baseTable";
import { Input, DatePicker, Select } from "antd";
import FormSelect from "../../../components/formItems/select";
import { columnsToFormFlow } from "../../../utils/common";
import {
  getRepair,
  addRepair,
  updRepair,
  delRepair,
  // getRepairById,
  // approvaRepair,
  getUser,
} from "../../../request/index";
const columns = [
  {
    title: "申请单号",
    dataIndex: "code",
    hidden: true,
  },
  {
    title: "申请时间",
    dataIndex: "lendDate",
    require: true,
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
  },
  {
    title: "申请人",
    dataIndex: "lendUser",
    require: true,
  },
  {
    title: "联系电话",
    dataIndex: "phone",
    require: true,
    ele: <Input type="tel" style={{ width: "100%" }}></Input>,
  },
  {
    title: "申请内容",
    dataIndex: "reason",
    hidden: true,
  },
  {
    title: "业务类型",
    dataIndex: "lendType",
    require: true,
    ele: (
      <Select>
        <Select.Option value={"1"}>意外损坏</Select.Option>
      </Select>
    ),
  },
  {
    title: "业务单号",
    dataIndex: "totalFee",
    hidden: true,
  },
  {
    title: "预估费用",
    dataIndex: "totalFee",
    hidden: true,
  },
  {
    title: "审批状态",
    dataIndex: "status",
    hidden: true,
    // render: (e) => (e == 0 ? "启用" : "停用"),
  },
];
const baseFormItems = columnsToFormFlow([
  {
    title: "申请人",
    dataIndex: "applyUser",
    ele: (
      <FormSelect
        request={getUser}
        storeKey="user"
        labelString="roleName"
        valueString="id"
      ></FormSelect>
    ),
  },
  {
    title: "联系电话",
    dataIndex: "applyPhone",
    require: true,
    ele: <Input type="tel" style={{ width: "100%" }}></Input>,
  },
  {
    title: "申请时间",
    dataIndex: "applyDate",
    require: true,
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
  },
  {
    title: "业务类型",
    dataIndex: "phone",
    require: true,
    ele: (
      <Select>
        <Select.Option value={"1"}>归还损坏</Select.Option>
      </Select>
    ),
  },
  {
    title: "业务单号",
    dataIndex: "bussineId",
    require: true,
    ele: <div></div>,
  },
  {
    title: "申请内容",
    dataIndex: "remark	",
    require: true,
    ele: <Input.TextArea></Input.TextArea>,
    col: 16,
    labelCol: 2,
  },
]);

const rowSelect = [
  {
    label: "",
    name: "name",
    element: <Input placeholder="单位名称" className=""></Input>,
  },
];
const breadcrumb = [
  {
    name: "首页",
  },
  {
    name: "设备维护",
  },
  {
    name: "维修申请",
  },
];
const ReparirApply = (props) => {
  return (
    <>
      {console.log(props, "INDEX_PROPS")}
      <BaseTable
        pathname={props.match.path}
        get={getRepair} // 分页查询
        add={addRepair} // 添加数据
        upd={updRepair} // 更新数据
        del={delRepair} // 删除数据
        columns={columns}
        keyId={"id"} // 数据的唯一ID
        storeKey={"repairApply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["lendDate", "applyDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
        rowSelect={rowSelect} //查询
        baseFormItem={baseFormItems}
      ></BaseTable>
    </>
  );
};
export default ReparirApply;
