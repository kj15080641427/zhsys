//购置申请
import React from "react";
import { Input, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  getDepositstockOut,
  // addLimsUselanapply,
  updDepositstockOut,
  delDepositstockOut,
  // getUser, //查询用户
  getLimsBasicDict, //查询字典
} from "../../../request/index";
import BaseNewPageLayout from "./baseLayout";
import { columnsToForm } from "../../../utils/common";
import FormSelect from "../../../components/formItems/select";
import { statusElement } from "../../../components/formItems/baseDict";

export const columns = [
  {
    title: "出库单号",
    dataIndex: "code",
  },
  {
    title: "出库类型",
    dataIndex: "outName",
    render: (e) => e && e.slice(0, -9),
  },
  {
    title: "业务单号",
    dataIndex: "bussineId",
  },
  {
    title: "出库时间",
    dataIndex: "modifyDate",
  },
  {
    title: "备注",
    dataIndex: "remark",
    width: "250px",
  },
  {
    title: "审批状态",
    dataIndex: "status",
    hidden: true,
    render: (e) => statusElement[e],
    width: "100px",
  },
];
const Lendapply = (props) => {
  const { setShowForm } = props.actions;

  const baseFormItems = columnsToForm([
    {
      title: "出库类型",
      dataIndex: "outType",
      labelName: "outName",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "10" }}
          storeKey="cklx"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
    },
    {
      title: "出库时间",
      dataIndex: "applyDate",
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    },
    {
      title: "业务单号",
      dataIndex: "bussineId",
      ele: <Input style={{ width: "100%" }}></Input>,
    },
    {
      title: "备注说明",
      dataIndex: "remark",
      ele: <Input.TextArea style={{ width: "100%" }} />,
      col: 16,
      labelCol: 4,
    },
  ]);

  // const listFormItems = columnsToForm([
  //   {
  //     title: "",
  //     dataIndex: "limsBasicdeviceDTOList",
  //     ele: <ChildTable />,
  //     rules: [{ required: true, message: "请输入购置清单" }],
  //     labelCol: 1,
  //   },
  // ]);

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
    <div className="purp">
      <BaseNewPageLayout
        get={getDepositstockOut} // 分页查询接口
        // add={addLimsUselanapply} // 添加数据接口
        upd={updDepositstockOut} // 更新数据接口
        del={delDepositstockOut} // 删除数据接口
        columns={columns} // 表格配置项
        baseFormItem={baseFormItems} // 表单配置项
        // listFormItem={listFormItems}
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
