import React from "react";
import { Input, DatePicker, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  getRepair,
  addRepair,
  updRepair,
  delRepair,
  getUser,
} from "../../../request/index";
import LendLayout from "./baseLayout";
import { columnsToFormFlow } from "../../../utils/common";
import FormSelect from "../../../components/formItems/select";
import { statusElement } from "../../../components/formItems/baseDict";

const type = {
  1: "内部借出",
};
const ReparirApply = () => {
  const columns = [
    {
      title: "申请单号",
      dataIndex: "code",
      hidden: true,
    },
    {
      title: "申请时间",
      dataIndex: "applyDate",
      require: true,
      hidden: true,
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    },
    {
      title: "申请人",
      dataIndex: "userRealName",
      hidden: true,
    },
    {
      title: "联系电话",
      dataIndex: "applyPhone",
      hidden: true,
    },
    {
      title: "申请内容",
      dataIndex: "remark",
      hidden: true,
    },

    {
      title: "业务类型",
      dataIndex: "lendType",
      require: true,
      hidden: true,
      ele: (
        <Select>
          <Select.Option value={"1"}>归还损坏</Select.Option>
        </Select>
      ),
      render: (e) => type[e],
    },
    {
      title: "业务单号",
      dataIndex: "phone",
      require: true,
      hidden: true,
      ele: <Input type="tel" style={{ width: "100%" }}></Input>,
    },

    {
      title: "预估费用(元)",
      dataIndex: "totalFee",
      hidden: true,
    },
    {
      title: "审批状态",
      dataIndex: "status",
      hidden: true,
      render: (e) => statusElement[e],
      // render: (e) => (e == 0 ? "启用" : "停用"),
    },
  ];
  const formItems = columnsToFormFlow([
    {
      title: "申请人",
      dataIndex: "applyUser",
      require: true,
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
    },
    {
      title: "申请时间",
      dataIndex: "applyDate",
      require: true,
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    },
    {
      title: "业务类型",
      dataIndex: "bussineType",
      require: true,
      ele: (
        <Select>
          <Select.Option value={"1"}>归还损坏</Select.Option>
        </Select>
      ),
      render: (e) => type[e],
    },
    {
      title: "业务单号",
      dataIndex: "bussineId",
      require: true,
      ele: <Input type="tel" style={{ width: "100%" }}></Input>,
    },
    {
      title: "申请内容",
      dataIndex: "remark",
      ele: <Input.TextArea style={{ width: "100%" }} />,
      col: 16,
      labelCol: 2,
    },
  ]);

  const rowSelect = [
    {
      label: "",
      name: "name",
      element: <Input placeholder="" className=""></Input>,
    },
  ];
  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "维护管理",
    },
    {
      name: "维修申请",
    },
  ];

  return (
    <div>
      <LendLayout
        get={getRepair} // 分页查询接口
        add={addRepair} // 添加数据接口
        upd={updRepair} // 更新数据接口
        del={delRepair} // 删除数据接口
        columns={columns} // 表格配置项
        baseFormItem={formItems} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"repairApply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["applyDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
      ></LendLayout>
    </div>
  );
};
const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReparirApply);
