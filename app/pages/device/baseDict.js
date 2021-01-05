import React from "react";
import { Input, Radio } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getLimsBasicDict,
  addLimsBasicDict,
  updLimsBasicDict,
  delLimsBasicDict,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
import {columnsToForm} from "../../utils/common";

const BaseDict = () => {
  const columns = [
    {
      title: "字典类型",
      dataIndex: "businessName",
    },
    {
      title: "类型编号",
      dataIndex: "businessType",
    },
    {
      title: "字典编号",
      dataIndex: "code",
    },
    {
      title: "字典名称",
      dataIndex: "name",
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
      width: "200px",
      hidden: true,
    },
    {
      title: "创建人",
      dataIndex: "createUser",
      key: "createUser",
      hidden: true,
    },
  ];
  const formItems = columnsToForm(columns);
  const rowSelect = [
    {
      label: "",
      name: "name",
      element: <Input placeholder="字典名称" className=""></Input>,
    },
  ];
  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "基础管理",
    },
    {
      name: "基础字典",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getLimsBasicDict} // 分页查询接口
        add={addLimsBasicDict} // 添加数据接口
        upd={updLimsBasicDict} // 更新数据接口
        del={delLimsBasicDict} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItems} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"basicDictId"} // 数据的唯一ID
        storeKey={"baseDict"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["produceDate"]} //需要转换时间格式的表单字段
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

export default connect(mapStateToProps, mapDispatchToProps)(BaseDict);
