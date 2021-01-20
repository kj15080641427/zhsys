import React, { useEffect, useState } from "react";
import { Popover, Steps } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
import "./index.scss";
import FormSelect from "../../../components/formItems/select";
import {
  getLimsBasicDevice,
  getDepositstock,
  getLimsBasiccategory,
} from "../../../request/index";
import BaseTable from "../../../components/home/baseTable";

const { Step } = Steps;
const DeviceStatus = (props) => {
  const { getBase } = props.actions;
  const { deposiDevice } = props;

  const [type, setType] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState({});
  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "综合管理",
    },
    {
      name: "设备报废预警",
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
      name: "设备报废预警",
      click: () => setShowForm(false),
    },
    {
      name: "详情",
      color: "#40A0EA",
    },
  ];
  const columns = [
    {
      title: "类别",
      dataIndex: "code",
    },
    {
      title: "设备编号",
      dataIndex: "createDate",
    },
    {
      title: "设备名称",
      dataIndex: "bussineId",
    },
    {
      title: "规格型号",
      dataIndex: "deviceNo",
    },
    {
      title: "已使用年限",
      dataIndex: "deviceName",
    },
    {
      title: "预计报废时间",
      dataIndex: "model",
    },

    {
      title: "维修次数",
      dataIndex: "produceDate",
    },
    {
      title: "预警状态",
      dataIndex: "useLife",
    },
    {
      title: "报废状态",
      dataIndex: "actualUseLife",
    },
    {
      title: "入库日期",
      dataIndex: "actualUseLife",
    },
  ];
  useEffect(() => {
    deposiDevice?.records && setRecords(deposiDevice?.records[0]);
  }, [deposiDevice]);
  const customDot = (dot, { status, index }) => (
    <Popover
      content={
        <span>
          step {index} status: {status}
        </span>
      }
    >
      {dot}
    </Popover>
  );
  return (
    <>
      <div className="device-state-body" hidden={showForm}>
        <div className="view-query-left">
          <RenderBreadcrumb
            showForm={showForm}
            breadcrumb={breadcrumb}
            editbreadcrumb={[]}
          />
          <div className="device-statue-select">
            <span id="label">设备类型:</span>
            <FormSelect
              onChange={(e) => setType(e)}
              style={{ width: "100%" }}
              request={getLimsBasiccategory}
              param={{ current: 1, size: -1 }}
              storeKey="sbfl"
              labelString="name"
              valueString="id"
            ></FormSelect>
          </div>
        </div>
        <BaseTable
          param={{ type: type }}
          columns={columns}
          get={getDepositstock}
          showEdit={false}
          rowKey="id"
          update={(row) => {
            setShowForm(true);
            getBase({
              request: getLimsBasicDevice,
              key: "deposiDevice",
              param: {
                current: 1,
                size: -1,
                id: row.deviceId,
              },
            });
            // getLimsBasicDevice;
          }}
        ></BaseTable>
      </div>
      <div hidden={!showForm}>
        <div className="view-query-left">
          <RenderBreadcrumb
            showForm={showForm}
            breadcrumb={[]}
            editbreadcrumb={editbreadcrumb}
          />
        </div>
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          设备信息:
        </div>
        <div className="device-detail-flex">
          <div>设备类别:{records?.categoryName}</div>
          <div>设备名称:{records?.deviceName}</div>
          <div>价值:{records?.price}</div>
          <div>净值:{records?.price}</div>
          <div>领用人:{records?.price}</div>

          <div>设备编号:{records?.deviceNo}</div>
          <div>设备型号:{records?.model}</div>
          <div>累计折旧金额:{records?.price}</div>
          <div>领用单位:{records?.unitName}</div>
          <div>存放地:{records?.address}</div>

          <div>出场号:{records?.address}</div>
          <div>现状:{records?.no}</div>
          <div>已使用年限:{records?.no}</div>
          <div>最低使用年限:{records?.no}</div>
          <div>入库日期:{records?.no}</div>

          <div>单位管理员:{records?.no}</div>
          <div>品牌:{records?.brandName}</div>
        </div>
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          设备图片:
        </div>
        <img></img>
        {/* 使用情况 */}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    deposiDevice: state.currency.deposiDevice,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatus);
