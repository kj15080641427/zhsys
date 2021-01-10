//购置申请清单
import React from "react";
import { Input, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  delLimsUselanapplyList,
  getLimsUselanapplyListPur,
  updLimsUselanapplyListPur,
  getUser, //查询用户
  getLimsSupplier, //查询供应商
  getLimsBasicDict,
} from "../../../request/index";
import FormSelect from "../../../components/formItems/select";
import BaseNewPageLayout from "./lanapplyListComponent";
import { columnsToForm } from "../../../utils/common";

const obj = {
  1: "待购置",
  2: "已购置",
};
export const columns = [
  {
    title: "购置单号",
    dataIndex: "applyCode",
    hidden: true,
  },
  {
    title: "购置类型",
    dataIndex: "purName",
    sort: 1,
    hidden: true,
  },
  {
    title: "申请单号",
    dataIndex: "code",
    hidden: true,
  },

  {
    title: "供应商",
    dataIndex: "supplierName",
    hidden: true,
    sort: 2,
  },
  {
    title: "购置金额",
    dataIndex: "totalPrice",
    hidden: true,
  },
  {
    title: "购置日期",
    dataIndex: "purDate",
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    formWidth: "120px",
    sort: 3,
    hidden: true,
  },
  {
    title: "购置人",
    dataIndex: "realName",
    hidden: true,
    sort: 4,
  },
  {
    title: "状态",
    dataIndex: "status",
    hidden: true,
    render: (e) => obj[e],
  },
];
const LendapplyList = (props) => {
  const baseFormItems = columnsToForm([
    {
      title: "购置类型",
      dataIndex: "purType",
      labelName: "purName",
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
    },
    {
      title: "供应商",
      dataIndex: "supplierId",
      formWidth: "120px",
      ele: (
        <FormSelect
          request={getLimsSupplier}
          storeKey="supplier"
          labelString="name"
          valueString="id"
        ></FormSelect>
      ),
    },
    {
      title: "购置日期",
      dataIndex: "purDate",
      labelName: "purDate",
      ele: (
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%" }}
        ></DatePicker>
      ),
      formWidth: "120px",
      sort: 3,
    },
    {
      title: "购置人",
      dataIndex: "purUser",
      labelName: "realName",
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
      title: "备注说明",
      dataIndex: "remark",
      ele: <Input style={{ width: "100%" }} />,
      col: 16,
      labelCol: 2,
    },
  ]);

  return (
    <div>
      <BaseNewPageLayout
        get={getLimsUselanapplyListPur} // 分页查询接口
        upd={updLimsUselanapplyListPur} // 更新数据接口
        del={delLimsUselanapplyList} // 删除数据接口
        columns={columns} // 表格配置项
        baseFormItem={baseFormItems} // 表单配置项
        // listFormItem={listFormItems}
        keyId={"id"} // 数据的唯一ID
        storeKey={"purpLanapply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["applyDate", "expectedDate", "purDate"]} //需要转换时间格式的表单字段
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

export default connect(mapStateToProps, mapDispatchToProps)(LendapplyList);
