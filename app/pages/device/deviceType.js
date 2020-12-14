import React from "react";
import { Input, Radio } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getLimsBasiccategory,
  addLimsBasiccategory,
  updLimsBasiccategory,
  delLimsBasiccategory,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
const DeviceType = () => {
  const columns = [
    {
      title: "编号",
      dataIndex: "code",
    },
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
      render: (e) => (e == 0 ? "启用" : "停用"),
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      key: "createDate",
      width: "250px",
    },
    {
      title: "创建人",
      dataIndex: "createUser",
      key: "createUser",
    },
  ];
  const formItem = [
    {
      label: "名称",
      name: "name",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "编号地址",
      name: "code",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "状态",
      name: "status",
      rules: [{ required: true }],
      ele: (
        <Radio.Group>
          <Radio.Button value={"0"}>启用</Radio.Button>
          <Radio.Button value={"1"}>停用</Radio.Button>
        </Radio.Group>
      ),
    },
    // {
    //   label: "创建时间",
    //   name: "createDate",
    //   rules: [{ required: true }],
    //   ele: <DatePicker format="YYYY-MM-DD HH:mm:ss" />,
    // },
    // {
    //   label: "创建人",
    //   name: "createUser",
    //   rules: [{ required: true }],
    //   ele: <Input></Input>,
    // },
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
        get={getLimsBasiccategory} // 分页查询接口
        add={addLimsBasiccategory} // 添加数据接口
        upd={updLimsBasiccategory} // 更新数据接口
        del={delLimsBasiccategory} // 删除数据接口
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
