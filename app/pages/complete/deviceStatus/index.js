import React from "react";
import { Card, Select } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
import "./index.scss";
import FormSelect from "../../../components/formItems/select";
import { getLimsBasiccategory } from "../../../request/index";
const DeviceStatus = (props) => {
  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "综合管理",
    },
    {
      name: "设备状态",
      color: "#40A0EA",
    },
  ];
  const editbreadcrumb = [
    {
      name: "首页",
    },
    {
      name: "综合管理",
    },
    {
      name: "设备状态",
    },
    {
      name: "",
      color: "#40A0EA",
    },
  ];
  const { showForm } = props;
  const {
    setShowForm,
    // getPurListInfo, //购置清单详情
  } = props.actions;
  return (
    <>
      <div className="view-query-left">
        <RenderBreadcrumb
          showForm={showForm}
          breadcrumb={breadcrumb}
          editbreadcrumb={editbreadcrumb}
        />
        <div className="device-statue-select">
          <span id='label'>设备状态:</span>
          <Select defaultValue="" id='select'>
            <Select value="">全部</Select>
            <Select value="0">出借</Select>
            <Select value="1">闲置</Select>
            <Select value="2">保养</Select>
            <Select value="3">报废</Select>
            <Select value="4">维修</Select>
          </Select>
        </div>
        <div className="device-statue-select">
          <span id='label'>设备类别:</span>
          <FormSelect
            style={{ width: "100%" }}
            request={getLimsBasiccategory}
            param={{ current: 1, size: -1 }}
            storeKey="sbfl"
            labelString="name"
            valueString="id"
          ></FormSelect>
        </div>
        <div>
            <div className='device-state-color'></div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    showForm: state.currency.showForm,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatus);
