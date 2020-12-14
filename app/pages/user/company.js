import React from "react";
import { Input, Radio } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getUserCompany,
  addUserCompany,
  updUserCompany,
  delUserCompany,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
import { columnsToForm } from "./../../utils/common";
const Company = () => {
  const columns = [
    {
      title: "单位名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "单位地址",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "单位类型",
      dataIndex: "type",
      ele: (
        <Radio.Group>
          <Radio.Button value={"0"}>内部单位</Radio.Button>
          <Radio.Button value={"1"}>外部单位</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (e) => (e == 0 ? "启用" : "停用"),
      ele: (
        <Radio.Group>
          <Radio.Button value={"0"}>启用</Radio.Button>
          <Radio.Button value={"1"}>停用</Radio.Button>
        </Radio.Group>
      ),
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
      name: "用户管理",
    },
    {
      name: "单位管理",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getUserCompany} // 分页查询接口
        add={addUserCompany} // 添加数据接口
        upd={updUserCompany} // 更新数据接口
        del={delUserCompany} // 删除数据接口
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

export default connect(mapStateToProps, mapDispatchToProps)(Company);
