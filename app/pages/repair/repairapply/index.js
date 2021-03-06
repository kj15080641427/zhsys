import React from "react";
import { Input, DatePicker, Select, InputNumber } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  getRepair,
  addRepair,
  updRepair,
  delRepair,
  getUser,
  getLimsBasicDict,
} from "../../../request/index";
import LendLayout from "./baseLayout";
import { columnsToFormFlow } from "../../../utils/common";
import FormSelect from "../../../components/formItems/select";
import { statusElement } from "../../../components/formItems/baseDict";

const ReparirApply = () => {
  const columns = [
    {
      title: "申请单号",
      dataIndex: "code",
    },
    {
      title: "申请时间",
      dataIndex: "applyDate",
      render: (e) => e.slice(0, 10),
    },
    {
      title: "申请人",
      dataIndex: "userRealName",
    },
    {
      title: "联系电话",
      dataIndex: "applyPhone",
    },
    {
      title: "申请内容",
      dataIndex: "remark",
    },

    {
      title: "业务类型",
      dataIndex: "bussineName",
    },
    {
      title: "业务单号",
      dataIndex: "bussineId",
    },

    {
      title: "预估费用(元)",
      dataIndex: "totalFee",
    },
    {
      title: "审批状态",
      dataIndex: "status",
      render: (e) => statusElement[e],
    },
  ];
  const formItems = columnsToFormFlow([
    {
      title: "申请人",
      dataIndex: "applyUser",
      labelName: "userRealName",
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
      labelName: "bussineName",
      require: true,
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "7" }}
          storeKey="ghsh"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
    },
    {
      title: "业务单号",
      dataIndex: "bussineId",
      require: true,
      ele: <InputNumber type="tel" style={{ width: "100%" }}></InputNumber>,
    },
    {
      title: "申请内容",
      dataIndex: "remark",
      ele: <Input.TextArea style={{ width: "100%" }} />,
      col: 16,
      labelCol: 2,
    },
  ]);

  return (
    <div>
      <LendLayout
        get={getRepair} // 分页查询接口
        add={addRepair} // 添加数据接口
        upd={updRepair} // 更新数据接口
        del={delRepair} // 删除数据接口
        columns={columns} // 表格配置项
        baseFormItem={formItems} // 表单配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"repairApply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["applyDate"]} //需要转换时间格式的表单字段
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
