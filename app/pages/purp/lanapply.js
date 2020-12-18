//购置申请
import React, { useEffect } from "react";
import { Input, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getLimsUselanapply,
  addLimsUselanapply,
  updLimsUselanapply,
  delLimsUselanapply,
  getUserCompany, //查询单位
  getUser, //查询用户
} from "../../request/index";
import BaseNewPageLayout from "../../components/baseComponent/newPageComponent/newPageComponent";
import { columnsToForm } from "./../../utils/common";
import ChildTable from "../../components/home/childTable";
import FormSelect from "./../../components/formItems/select";

const statusElement = {
  0: (
    <div
      style={{
        color: "#057272",
      }}
    >
      暂存
    </div>
  ),
  1: (
    <div
      style={{
        color: "#C0C003",
      }}
    >
      待审批
    </div>
  ),
  2: (
    <div
      style={{
        color: "#4D7B05",
      }}
    >
      已驳回
    </div>
  ),
  3: (
    <div
      style={{
        color: "#AE1414",
      }}
    >
      已拒绝
    </div>
  ),
  4: (
    <div
      style={{
        color: "#17AE14",
      }}
    >
      已审批
    </div>
  ),
};
export const columns = [
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
    title: "申请单位",
    dataIndex: "compayName",
    formDataIndex: "applyCompany",
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
    title: "申请时间",
    dataIndex: "applyDate",
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
  },
  {
    title: "申请单号",
    dataIndex: "name",
    hidden: true,
  },
  {
    title: "申请标题",
    dataIndex: "title",
  },
  {
    title: "申购类型",
    dataIndex: "purType",
  },
  {
    title: "期望供货时间",
    dataIndex: "expectedDate",
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    formWidth: "120px",
  },
  // {
  //   title: "提交类型",
  //   dataIndex: "submitType",
  // },

  {
    title: "审批状态",
    dataIndex: "status",
    hidden: true,
    render: (e) => statusElement[e],
  },
  // {
  //   title: "创建时间",
  //   dataIndex: "createDate",
  //   key: "createDate",
  //   width: "250px",
  //   hidden: true,
  // },
  // {
  //   title: "创建人",
  //   dataIndex: "createUser",
  //   key: "createUser",
  //   hidden: true,
  // },
];
const Lendapply = (props) => {
  useEffect(() => {
    props.actions;
  }, []);

  const baseFormItems = columnsToForm([
    ...columns,
    {
      title: "申请理由",
      dataIndex: "remark",
      ele: <Input style={{ width: "100%" }} />,
      col: 16,
      labelCol: 4,
    },
  ]);

  const listFormItems = columnsToForm([
    {
      title: "",
      dataIndex: "limsBasicdeviceDTOList",
      ele: <ChildTable />,
      rules: [{ required: true, message: "请输入购置清单" }],
      labelCol: 1,
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
      name: "购置管理",
    },
    {
      name: "购置申请管理",
    },
  ];
  return (
    <div>
      <BaseNewPageLayout
        get={getLimsUselanapply} // 分页查询接口
        add={addLimsUselanapply} // 添加数据接口
        upd={updLimsUselanapply} // 更新数据接口
        del={delLimsUselanapply} // 删除数据接口
        columns={columns} // 表格配置项
        baseFormItem={baseFormItems} // 表单配置项
        listFormItem={listFormItems}
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"purpLanapply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["applyDate", "expectedDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
        formWidth={"1000px"} //宽度
      ></BaseNewPageLayout>
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
