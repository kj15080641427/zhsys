import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { getRepairList, updRepairList } from "../../../request/index";
import BaseNewPageLayout from "./baseLayout";

const obj = {
  0: "待维修",
  1: "已维修",
};
export const columns = [
  {
    title: "维修单号",
    dataIndex: "code",
  },
  {
    title: "申请单号",
    dataIndex: "applyCode",
  },
  {
    title: "申请日期",
    dataIndex: "applyDate",
  },
  {
    title: "申请人",
    dataIndex: "userRealName",
    hidden: true,
    sort: 4,
  },
  {
    title: "联系电话",
    dataIndex: "applyPhone",
    sort: 1,
    hidden: true,
  },
  {
    title: "申请内容",
    dataIndex: "applyRemark",
    hidden: true,
    sort: 2,
  },
  {
    title: "维修内容",
    dataIndex: "remark",
    hidden: true,
    sort: 2,
  },
  {
    title: "维修费用",
    dataIndex: "totalPrice",
    hidden: true,
  },
  {
    title: "维修技师",
    dataIndex: "repairUserName",
    hidden: true,
  },
  {
    title: "状态",
    dataIndex: "status",
    hidden: true,
    render: (e) => obj[e],
  },
];
const LendapplyList = (props) => {
  return (
    <div>
      <BaseNewPageLayout
        get={getRepairList} // 分页查询接口
        upd={updRepairList} // 更新数据接口
        columns={columns} // 表格配置项
        // listFormItem={listFormItems}
        keyId={"id"} // 数据的唯一ID
        storeKey={"purpLanapply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["applyDate"]} //需要转换时间格式的表单字段
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
