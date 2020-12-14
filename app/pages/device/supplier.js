import React from "react";
import { Input, Radio } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getLimsSupplier,
  addLimsSupplier,
  updLimsSupplier,
  delLimsSupplier,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
import { columnsToForm } from "../../utils/common";

const Supplier = () => {
  const columns = [
    {
      title: "供应商名称",
      dataIndex: "name",
    },
    {
      title: "供应商编号",
      dataIndex: "code",
    },
    {
      title: "联系地址",
      dataIndex: "address",
    },
    {
      title: "联系人",
      dataIndex: "contactName",
    },
    {
      title: "联系电话",
      dataIndex: "contactPhone",
    },

    {
      title: "备注",
      dataIndex: "remark",
    },
    {
      title: "供应商类型",
      dataIndex: "supType",
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
      name: "供应商",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getLimsSupplier} // 分页查询接口
        add={addLimsSupplier} // 添加数据接口
        upd={updLimsSupplier} // 更新数据接口
        del={delLimsSupplier} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItems} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"supplier"} // store中的key值. 要与 mapStatetoProps 中的key相同
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

export default connect(mapStateToProps, mapDispatchToProps)(Supplier);
