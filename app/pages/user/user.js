import React, { useEffect } from "react";
import { Input, Radio, Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import {
  getUser,
  addUser,
  updUser,
  delUser,
  getUserCompany,
  getUserDepartment,
  getRole,
} from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
const { Option } = Select;

const User = (props) => {
  const { userCompany, userDepartment, role } = props;
  useEffect(() => {
    props.actions.getBase({
      request: getUserCompany,
      key: "userCompany",
      param: {
        current: 1,
        size: -1,
      },
    });
    props.actions.getBase({
      request: getUserDepartment,
      key: "userDepartment",
      param: {
        current: 1,
        size: -1,
      },
    });
    props.actions.getBase({
      request: getRole,
      key: "role",
      param: {
        current: 1,
        size: -1,
      },
    });
  }, []);
  const columns = [
    // {
    //   title: "用户名",
    //   dataIndex: "accountId",
    // },
    {
      title: "真实姓名",
      dataIndex: "realName",
    },
    {
      title: "手机号",
      dataIndex: "phone",
    },
    {
      title: "角色",
      dataIndex: "roleName",
    },
    {
      title: "所属单位",
      dataIndex: "companyId",
      render: (e) => {
        let item = userCompany?.records?.filter((item) => item.id == e);
        return item && item[0]?.name;
      },
    },
    {
      title: "所属部门",
      dataIndex: "departmentId",
      render: (e) => {
        let item = userDepartment?.records?.filter((item) => item.id == e);
        return item && item[0]?.name;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createDate",
      width: "250px",
    },
    {
      title: "创建人",
      dataIndex: "createUser",
    },
  ];
  const formItem = [
    // {
    //   label: "用户名",
    //   name: "accountId",
    //   rules: [{ required: true }],
    //   ele: <Input></Input>,
    // },
    {
      label: "真实姓名",
      name: "realName",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "性别",
      name: "sex",
      rules: [{ required: true }],
      ele: (
        <Radio.Group>
          <Radio.Button value={"0"}>男</Radio.Button>
          <Radio.Button value={"1"}>女</Radio.Button>
        </Radio.Group>
      ),
    },
    {
      label: "手机号",
      name: "phone",
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
      label: "所属部门",
      name: "departmentId",
      rules: [{ required: true }],
      ele: (
        <Select>
          {userDepartment?.records?.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      label: "角色",
      name: "roleId",
      rules: [{ required: true }],
      ele: (
        <Select>
          {role?.records?.map((item) => (
            <Option key={item.id} value={item.id}>
              {item.name}
            </Option>
          ))}
        </Select>
      ),
    },
    {
      label: "邮箱",
      name: "email",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "通讯地址",
      name: "address",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    // {
    //   label: "状态",
    //   name: "status",
    //   rules: [{ required: true }],
    //   ele: (
    //     <Radio.Group>
    //       <Radio.Button value={"0"}>启用</Radio.Button>
    //       <Radio.Button value={"1"}>停用</Radio.Button>
    //     </Radio.Group>
    //   ),
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
      name: "用户管理",
    },
    {
      name: "用户管理",
    },
  ];
  return (
    <div>
      <BaseLayout
        get={getUser} // 分页查询接口
        add={addUser} // 添加数据接口
        upd={updUser} // 更新数据接口
        del={delUser} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"user"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["createDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
      ></BaseLayout>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    userCompany: state.currency.userCompany,
    userDepartment: state.currency.userDepartment,
    role: state.currency.role,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
