//购置申请清单
import React, { useEffect } from "react";
import { Input, DatePicker } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  getLimsUselanapplyList,
  addLimsUselanapplyList,
  updLimsUselanapplyList,
  delLimsUselanapplyList,
  getLimsUselanapplyListPur,
  updLimsUselanapplyListPur,
  getUserCompany, //查询单位
  getUser, //查询用户
  getLimsUselanapplyListPurItem, //购置清单列表
} from "../../../request/index";
import BaseNewPageLayout from "./lanapplyListComponent";
import { columnsToForm } from "../../../utils/common";
import ChildTable from "./childTable";

export const columns = [
  // {
  //   title: "申请人",
  //   dataIndex: "applyUser",
  //   ele: (
  //     <FormSelect
  //       request={getUser}
  //       storeKey="user"
  //       labelString="roleName"
  //       valueString="id"
  //     ></FormSelect>
  //   ),
  // },
  // {
  //   title: "申请单位",
  //   dataIndex: "compayName",
  //   formDataIndex: "applyCompany",
  //   ele: (
  //     <FormSelect
  //       request={getUserCompany}
  //       storeKey="userCompany"
  //       labelString="name"
  //       valueString="id"
  //     ></FormSelect>
  //   ),
  // },
  // {
  //   title: "申请时间",
  //   dataIndex: "applyDate",
  //   ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
  // },
  {
    title: "购置单号",
    dataIndex: "code",
    hidden: true,
  },
  {
    title: "购置类型",
    dataIndex: "title",
  },
  {
    title: "供应商",
    dataIndex: "supplierId",
    formWidth: "120px",
  },
  {
    title: "购置日期",
    dataIndex: "purDate",
    ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    formWidth: "120px",
  },
  {
    title: "购置人",
    dataIndex: "purUser",
  },
  {
    title: "申请单号",
    dataIndex: "applyId",
    hidden: true,
  },

  {
    title: "购置金额",
    dataIndex: "totalPrice",
    hidden: true,
  },
];
const LendapplyList = (props) => {
  useEffect(() => {
    props.actions;
  }, []);

  const baseFormItems = columnsToForm([
    ...columns,
    {
      title: "备注说明",
      dataIndex: "remark",
      ele: <Input style={{ width: "100%" }} />,
      col: 16,
      labelCol: 2,
    },
  ]);

  // const listFormItems = columnsToForm([
  //   {
  //     title: "",
  //     dataIndex: "limsBasicdeviceDTOList",
  //     ele: <ChildTable />,
  //     labelCol: 1,
  //   },
  // ]);

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
        get={getLimsUselanapplyListPur} // 分页查询接口
        add={addLimsUselanapplyList} // 添加数据接口
        upd={updLimsUselanapplyList} // 更新数据接口
        del={delLimsUselanapplyList} // 删除数据接口
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

export default connect(mapStateToProps, mapDispatchToProps)(LendapplyList);
