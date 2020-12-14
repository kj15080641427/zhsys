import React, { useState, useEffect } from "react";
import { Input, Radio, Button, Modal } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import { getRole, addRole, updRole, delRole } from "../../request/index";
import BaseLayout from "../../components/baseComponent/connectComponents";
import { UserSwitchOutlined } from "@ant-design/icons";
import { ReadonlyPermission } from "./jurisdiction";
const Role = (props) => {
  const [records, setRecords] = useState({});
  const {
    getPermissionDataById,
    setRolePermission,
    hideRPModal,
    setSelectList,
  } = props.actions;

  const { permissionList, modalVisible } = props;

  const rolePermission = (row) => {
    setRecords(row);
    getPermissionDataById(row.id);
  };
  const columns = [
    {
      title: "角色名称",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "角色备注",
      dataIndex: "remark",
      key: "address",
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
    {
      title: "授权",
      dataIndex: "",
      render: (e) => (
        <Button onClick={() => rolePermission(e)} icon={<UserSwitchOutlined />}>
          授权
        </Button>
      ),
    },
  ];
  const formItem = [
    {
      label: "角色名称",
      name: "name",
      rules: [{ required: true }],
      ele: <Input></Input>,
    },
    {
      label: "角色备注",
      name: "remark",
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
      element: <Input placeholder="角色名称" className=""></Input>,
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
        get={getRole} // 分页查询接口
        add={addRole} // 添加数据接口
        upd={updRole} // 更新数据接口
        del={delRole} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"Role"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["createDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
      ></BaseLayout>
      <Modal
        width={"80%"}
        title={`${records.name}授权`}
        visible={modalVisible}
        maskClosable={false}
        destroyOnClose
        okText="授权"
        onOk={() => {
          setRolePermission({
            roleId: records.id,
            permissionsId: permissionList,
          });
        }}
        onCancel={() => {
          hideRPModal();
        }}
      >
        <ReadonlyPermission
          rowSelection={{
            fixed: true,
            type: "checkbox",
            selectedRowKeys: permissionList,
            onChange: (keys) => {
              setSelectList(keys);
            },
          }}
        />
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state, "STATE");
  return {
    jurisdiction: state.currency.jurisdiction,
    permissionList: state.currency.permissionList,
    modalVisible: state.currency.modalVisible,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Role);
