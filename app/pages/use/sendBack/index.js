//购置申请清单
import React, { useEffect } from "react";
import {
  Input,
  DatePicker,
  // Select
} from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  delLimsUseReturn,
  getLimsUseReturn,
  updLimsUseReturn,
  addLimsUseReturn,
  getUser, //查询用户
} from "../../../request/index";
import FormSelect from "../../../components/formItems/select";
import BaseNewPageLayout from "./baseLayout";
import { columnsToForm } from "../../../utils/common";
import { statusElement } from "../../../components/formItems/baseDict";
export const columns = [
  {
    title: "归还单号",
    dataIndex: "code",
    hidden: true,
  },
  {
    title: "借出单号",
    dataIndex: "",
    hidden: true,
  },
  {
    title: "借出时间",
    dataIndex: "lendDate",
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    formWidth: "120px",
  },
  {
    title: "归还时间",
    dataIndex: "returnDate",
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    formWidth: "120px",
  },
  {
    title: "归还人",
    dataIndex: "realName",
    hidden: true,
  },
  {
    title: "归还单位",
    dataIndex: "returnCompany",
    hidden: true,
  },

  {
    title: "联系电话",
    dataIndex: "contactTel",
    hidden: true,
  },
  {
    title: "审批状态",
    dataIndex: "status",
    hidden: true,
    render: (e) => statusElement[e],
  },
];
const LendapplyList = (props) => {
  useEffect(() => {
    props.actions;
  }, []);

  const baseFormItems = columnsToForm([
    {
      title: "归还人",
      dataIndex: "returnUser",
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
      dataIndex: "contactTel",
      ele: <Input style={{ width: "100%" }} />,
    },
    {
      title: "归还时间",
      dataIndex: "returnDate",
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    },
  ]);

  const rowSelect = [
    {
      label: "",
      name: "name",
      element: <Input placeholder="单位名称" className=""></Input>,
    },
  ];
  return (
    <div>
      <BaseNewPageLayout
        add={addLimsUseReturn}
        get={getLimsUseReturn} // 分页查询接口
        upd={updLimsUseReturn} // 更新数据接口
        del={delLimsUseReturn} // 删除数据接口
        columns={columns} // 表格配置项
        baseFormItem={baseFormItems} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"purpLanapply"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["applyDate", "returnDate"]} //需要转换时间格式的表单字段
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
