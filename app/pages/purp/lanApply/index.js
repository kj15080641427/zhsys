//购置申请
import React from "react";
import { Input, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  getLimsUselanapply,
  addLimsUselanapply,
  updLimsUselanapply,
  delLimsUselanapply,
  getUserCompany, //查询单位
  getUser, //查询用户
  getLimsBasicDict, //查询字典
} from "../../../request/index";
import BaseNewPageLayout from "./newPageComponent";
import { columnsToForm } from "../../../utils/common";
import ChildTable from "./childTable";
import FormSelect from "../../../components/formItems/select";
import { statusElement } from "../../../components/formItems/baseDict";

export const columns = [
  {
    title: "申请单号",
    dataIndex: "code",
  },
  {
    title: "申请时间",
    dataIndex: "applyDate",
    render: (e) => e && e.slice(0, -9),
  },
  {
    title: "申请人",
    dataIndex: "userRealName",
  },
  {
    title: "申请单位",
    dataIndex: "compayName",
  },
  {
    title: "申请标题",
    dataIndex: "title",
  },
  {
    title: "申购类型",
    dataIndex: "dictName",
  },
  {
    title: "期望供货时间",
    dataIndex: "expectedDate",
    render: (e) => e && e.slice(0, -9),
  },
  {
    title: "审批状态",
    dataIndex: "status",
    hidden: true,
    render: (e) => statusElement[e],
  },
];
const Lendapply = (props) => {
  const { setShowForm } = props.actions;

  const baseFormItems = columnsToForm([
    {
      title: "申请人",
      dataIndex: "applyUser",
      labelName: "userRealName",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getUser}
          storeKey="user"
          labelString="realName"
          valueString="id"
        ></FormSelect>
      ),
    },
    {
      title: "申请单位",
      dataIndex: "applyCompany",
      labelName: "compayName",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
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
      title: "申请标题",
      dataIndex: "title",
      ele: <Input style={{ width: "100%" }}></Input>,
    },
    {
      title: "申购类型",
      dataIndex: "purType",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "2" }}
          storeKey="sglx"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
      labelName: "dictName",
    },
    {
      title: "期望供货时间",
      dataIndex: "expectedDate",
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
      formWidth: "120px",
    },
    {
      title: "申请理由",
      dataIndex: "remark",
      ele: <Input.TextArea style={{ width: "100%" }} />,
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
      click: () => setShowForm(false),
    },
    {
      name: "购置申请",
      click: () => setShowForm(false),
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
        // listFormItem={listFormItems}
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
