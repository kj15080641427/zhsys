import React from "react";
import { Input, Radio, DatePicker, Upload, Button } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import {
  getLimsBasicDevice,
  addLimsBasicDevice,
  updLimsBasicDevice,
  delLimsBasicDevice,
} from "../../../request/index";
import BaseLayout from "./devicelayout";

const state = {
  0: "默认",
  1: "入库代采购",
  2: "闲置",
  3: "借出申请中",
  4: "已借出",
  5: "维修申请中",
  6: "维修中",
};

const BaseDevice = () => {
  const columns = [
    {
      title: "设备名称",
      dataIndex: "deviceName",
    },
    {
      title: "设备编号",
      dataIndex: "deviceNo",
    },
    {
      title: "单位",
      dataIndex: "unitName",
    },
    {
      title: "型号",
      dataIndex: "model",
    },
    {
      title: "折旧率",
      dataIndex: "depreceRate",
      rules: [{ required: false }],
      ele: <Input suffix="%"></Input>,
    },
    {
      title: "价值",
      dataIndex: "price",
      rules: [{ required: false }],
    },
    {
      title: "生产日期",
      dataIndex: "produceDate",
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
      rules: [{ required: false }],
      // hidden: true,
    },
    {
      title: "使用寿命",
      dataIndex: "useLife",
      rules: [{ required: false }],
    },
    {
      title: "设备状态",
      dataIndex: "status",
      key: "status",
      hidden: true,
      render: (e) => state[e],
      // ele: (
      //   <Radio.Group>
      //     <Radio.Button value={"0"}>启用</Radio.Button>
      //     <Radio.Button value={"1"}>停用</Radio.Button>
      //   </Radio.Group>
      // ),
      rules: [{ required: false }],
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
      name: "基础管理",
    },
    {
      name: "设备类型",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getLimsBasicDevice} // 分页查询接口
        add={addLimsBasicDevice} // 添加数据接口
        upd={updLimsBasicDevice} // 更新数据接口
        del={delLimsBasicDevice} // 删除数据接口
        columns={columns} // 表格配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"baseDevice"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["produceDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
        formWidth={1200}
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

export default connect(mapStateToProps, mapDispatchToProps)(BaseDevice);
