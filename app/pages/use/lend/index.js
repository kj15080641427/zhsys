import React from "react";
import { Input, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  getLimsUselendapply,
  addLimsUselendapply,
  updLimsUselendapply,
  delLimsUselendapply,
  getUser,
  getUserCompany,
  getLimsBasicDict,
} from "../../../request/index";
import LendLayout from "./baseLayout";
import { columnsToFormFlow } from "../../../utils/common";
import FormSelect from "../../../components/formItems/select";
import { statusElement } from "../../../components/formItems/baseDict";

const Lendapply = () => {
  const columns = [
    {
      title: "借出单号",
      dataIndex: "code",
      hidden: true,
    },
    {
      title: "借出时间",
      dataIndex: "lendDate",
      hidden: true,
    },
    {
      title: "借出人",
      dataIndex: "realName",
      hidden: true,
    },
    {
      title: "借出单位",
      dataIndex: "lendCompanyName",
      hidden: true,
    },
    {
      title: "借出类型",
      dataIndex: "lendTypeName",
      require: true,
      hidden: true,
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      hidden: true,
      require: true,
    },
    {
      title: "借出理由",
      dataIndex: "reason",
      hidden: true,
    },
    {
      title: "借出费用(元)",
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
      title: "借出人",
      dataIndex: "lendUser",
      labelName: "realName",
      require: true,
      ele: (
        <FormSelect
          request={getUser}
          storeKey="user"
          labelString="realName"
          valueString="id"
        ></FormSelect>
      ),
    },
    {
      title: "借出单位",
      dataIndex: "lendCompany",
      labelName: "lendCompanyName",
      require: true,
      ele: (
        <FormSelect
          request={getUserCompany}
          storeKey="userCompany"
          labelString="name"
          valueString="id"
        ></FormSelect>
      ),
    },
    {
      title: "借出时间",
      dataIndex: "lendDate",
      ele: (
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%" }}
        ></DatePicker>
      ),
    },
    {
      title: "借出类型",
      dataIndex: "lendType",
      labelName: "lendTypeName",
      require: true,
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "6" }}
          storeKey="jclx"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
    },
    {
      title: "证件号码",
      dataIndex: "cardNo",
      require: true,
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      require: true,
      ele: <Input type="tel" style={{ width: "100%" }}></Input>,
    },
    {
      title: "借出理由",
      dataIndex: "reason",
      ele: <Input style={{ width: "100%" }} />,
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
      name: "使用管理",
    },
    {
      name: "借出申请",
    },
  ];
  return (
    <div>
      <LendLayout
        get={getLimsUselendapply} // 分页查询接口
        add={addLimsUselendapply} // 添加数据接口
        upd={updLimsUselendapply} // 更新数据接口
        del={delLimsUselendapply} // 删除数据接口
        columns={columns} // 表格配置项
        baseFormItem={formItems} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"lendApply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["lendDate"]} //需要转换时间格式的表单字段
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

export default connect(mapStateToProps, mapDispatchToProps)(Lendapply);
