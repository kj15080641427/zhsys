/**年度经费 */
import React from "react";
import { Input, Radio } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getComplexfound,
  addComplexfound,
  updComplexfound,
  delComplexfound,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
import { columnsToFormFlow } from "./../../utils/common";

const DeviceType = () => {
  const columns = [
    {
      title: "应用项目",
      dataIndex: "projectName",
    },
    {
      title: "年度",
      dataIndex: "year",
    },
    {
      title: "经费",
      dataIndex: "fund",
    },
    {
      title: "已使用经费",
      dataIndex: "useFund",
    },
    {
      title: "剩余经费",
      dataIndex: "surplusFund",
    },
    {
      title: "领用单位",
      dataIndex: "useCompany",
    },
    {
      title: "领用人",
      dataIndex: "useUser",
    },
    {
      title: "创建人",
      dataIndex: "createUser",
      key: "createUser",
    },
  ];
  const formItem = columnsToFormFlow(columns);

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
      name: "综合管理",
    },
    {
      name: "年度经费",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getComplexfound} // 分页查询接口
        add={addComplexfound} // 添加数据接口
        upd={updComplexfound} // 更新数据接口
        del={delComplexfound} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"deviceType"} // store中的key值. 要与 mapStatetoProps 中的key相同
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

export default connect(mapStateToProps, mapDispatchToProps)(DeviceType);
