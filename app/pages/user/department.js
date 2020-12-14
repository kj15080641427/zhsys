import React, { useEffect } from "react";
import { Input, Radio, Select } from "antd";
import {
  getUserDepartment,
  addUserDepartment,
  updUserDepartment,
  delUserDepartment,
  getUserCompany,
} from "../../request/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import BaseLayout from "../../components/baseComponent/connectComponents";
const { Option } = Select;

const Department = (props) => {
  const { userCompany } = props;
  useEffect(() => {
    props.actions.getBase({
      request: getUserCompany,
      key: "userCompany",
      param: {
        current: 1,
        size: -1,
      },
    });
  }, []);
  const columns = [
    {
      title: "部门编号",
      dataIndex: "id",
      key: "name",
    },
    {
      title: "部门名称",
      dataIndex: "name",
      key: "address",
    },
    {
      title: "所属单位",
      dataIndex: "companyId",
      key: "address",
      render: (e) => {
        let item = userCompany?.records?.filter((item) => item.id == e);
        console.log(e, item);
        return item && item[0]?.name;
      },
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
    // {
    //   label: "部门编号",
    //   name: "id",
    //   rules: [{ required: true }],
    //   ele: <Input></Input>,
    // },
    {
      label: "部门名称",
      name: "name",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "所属单位",
      name: "companyId",
      rules: [{ required: true }],
      ele: (
        <Select>
          {userCompany?.records?.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      ),
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
      name: "用户管理",
    },
    {
      name: "单位管理",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getUserDepartment} // 分页查询接口
        add={addUserDepartment} // 添加数据接口
        upd={updUserDepartment} // 更新数据接口
        del={delUserDepartment} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"userDepartment"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["createDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
      ></BaseLayout>
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    userCompany: state.currency.userCompany,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Department);
