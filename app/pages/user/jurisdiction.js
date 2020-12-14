import React from "react";
import { Input } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getJurisdiction,
  addJurisdiction,
  updJurisdiction,
  delJurisdiction,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
import ReadOnlyTable from "../../components/baseComponent/readOnlyTable";
const columns = [
  {
    title: "权限名称",
    dataIndex: "permName",
  },
  {
    title: "访问uri地址",
    dataIndex: "url",
  },
  {
    title: "权限标识符",
    dataIndex: "permTag",
  },
  {
    title: "创建时间",
    dataIndex: "createDate",
    width: "250px",
  },
  {
    title: "创建人",
    dataIndex: "createUser",
  },
];
const rowSelect = [
  {
    label: "",
    name: "name",
    element: <Input placeholder="角色名称" className=""></Input>,
  },
];
const Jurisdiction = () => {
  const formItem = [
    {
      label: "权限名称",
      name: "permName",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "访问uri地址",
      name: "url",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "权限标识符",
      name: "permTag",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    // {
    //   label: "创建时间",
    //   name: "createDate",
    //   rules: [{ required: true }],
    //   ele: <DatePicker format="YYYY-MM-DD HH:mm:ss" />,
    // },
    // {
    //   label: "创建人",
    //   name: "createUser",
    //   rules: [{ required: true }],
    //   ele: <Input></Input>,
    // },
  ];

  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "用户管理",
    },
    {
      name: "权限管理",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getJurisdiction} // 分页查询接口
        add={addJurisdiction} // 添加数据接口
        upd={updJurisdiction} // 更新数据接口
        del={delJurisdiction} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"jurisdiction"} // store中的key值. 要与 mapStatetoProps 中的key相同
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

export default connect(mapStateToProps, mapDispatchToProps)(Jurisdiction);
export const ReadonlyPermission = (props) => {
  return (
    <ReadOnlyTable
      rowKey={"id"}
      rowSelection={props.rowSelection}
      columns={columns}
      get={getJurisdiction}
      storeKey={"jurisdiction"}
      param={{
        current: 1,
        size: -1,
      }}
    />
  );
};
