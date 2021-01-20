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
      name: "在库资产",
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
      name: "在库资产",
      click: () => setShowForm(false),
    },
    {
      name: "在库资产详情",
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
      title: "型号",
      dataIndex: "deviceNo",
    },
    {
      title: "价值",
      dataIndex: "deviceName",
    },
    {
      title: "累计折旧金额",
      dataIndex: "model",
    },

    {
      title: "净值",
      dataIndex: "produceDate",
    },
    {
      title: "领用单位",
      dataIndex: "useLife",
    },

    {
      title: "领用人",
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
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          生命周期:
        </div>
        <div className="device-status-step">
          <Steps current={2} progressDot={customDot}>
            <Step
              title={<div>购置</div>}
              description={
                <div className="device-status-card">
                  <div id="deviceTitle">最近购置</div>
                  <div>申请单号:S20200111</div>
                  <div>申请时间:{}</div>
                  <div>购置类型:{}</div>
                  <div>供货时间:{}</div>
                </div>
              }
            />
            <Step
              title="使用"
              description={
                <div className="device-status-card">
                  <div id="deviceTitle">最近使用</div>
                  <div>借出单号:S20200111</div>
                  <div>申请时间:{}</div>
                  <div>借出类型:{}</div>
                  <div>借出单位:{}</div>
                </div>
              }
            />
            <Step
              title="归还"
              description={
                <div className="device-status-card">
                  <div id="deviceTitle">最近归还</div>
                  <div>归还单号:S20200111</div>
                  <div>归还时间:{}</div>
                  <div>联系电话:{}</div>
                  <div>归还人:{}</div>
                </div>
              }
            />
            <Step
              title="维修"
              description={
                <div className="device-status-card">
                  <div id="deviceTitle">最近维修</div>
                  <div>维修单号:S20200111</div>
                  <div>申请时间:{}</div>
                  <div>维修类型:{}</div>
                  <div>联系电话:{}</div>
                </div>
              }
            />
            <Step
              title="保养"
              description={
                <div className="device-status-card">
                  <div id="deviceTitle">最近养护</div>
                  <div>养护单号:S20200111</div>
                  <div>申请时间:{}</div>
                  <div>养护类型:{}</div>
                  <div>联系电话:{}</div>
                </div>
              }
            />
          </Steps>
        </div>
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
