import React from "react";
import { Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getLimsUselendapply,
  addLimsUselendapply,
  updLimsUselendapply,
  delLimsUselendapply,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
import { columnsToForm } from "./../../utils/common";
const Lendapply = () => {
  const columns = [
    {
      title: "借出单号",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "借出时间",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "借出人",
      dataIndex: "type",
    },
    {
      title: "借出单位",
      dataIndex: "type",
    },
    {
      title: "借出类型",
      dataIndex: "type",
    },
    {
      title: "联系电话",
      dataIndex: "type",
    },
    {
      title: "借出理由",
      dataIndex: "type",
    },
    {
      title: "借出费用",
      dataIndex: "type",
    },
    {
      title: "审批状态",
      dataIndex: "status",
      key: "status",
      render: (e) => (e == 0 ? "启用" : "停用"),
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      key: "createDate",
      width: "250px",
    },
    {
      title: "创建人",
      dataIndex: "createUser",
      key: "createUser",
    },
  ];
  const formItems = columnsToForm(columns);

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
      name: "使用管理",
    },
    {
      name: "借出申请",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getLimsUselendapply} // 分页查询接口
        add={addLimsUselendapply} // 添加数据接口
        upd={updLimsUselendapply} // 更新数据接口
        del={delLimsUselendapply} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItems} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"userCompany"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["createDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
      ></BaseLayout>
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
