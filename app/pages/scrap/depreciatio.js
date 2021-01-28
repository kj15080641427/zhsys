import React, { useEffect, useState } from "react";
import { Steps } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import { connect } from "react-redux";
import RenderBreadcrumb from "../../components/formItems/breadcrumb";
import "./index.scss";
import { getLimsBasicDevice } from "../../request/index";
import BaseTable from "../../components/home/baseTable";
import { statusObj } from "../../utils/common";

// const { Step } = Steps;
const DeviceStatus = (props) => {
  const { getBase } = props.actions;
  const { deposiDevice } = props;

  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState({});

  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "设备处理",
    },
    {
      name: "设备折旧",
      color: "#40A0EA",
    },
  ];
  const editbreadcrumb = [
    {
      name: "首页",
    },
    {
      name: "设备处理",
    },
    {
      name: "设备折旧",
      click: () => setShowForm(false),
    },
    {
      name: "详情",
      color: "#40A0EA",
    },
  ];
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
      title: "型号",
      dataIndex: "model",
    },
    {
      title: "价值",
      dataIndex: "price",
    },
    {
      title: "累计折旧金额",
      dataIndex: "depreciationMoney",
    },

    {
      title: "净值",
      dataIndex: "amountMoney",
    },
    {
      title: "现状",
      dataIndex: "status",
      render: (i) => {
        return statusObj[i]?.text;
      },
    },
  ];
  useEffect(() => {
    deposiDevice?.records && setRecords(deposiDevice?.records[0]);
  }, [deposiDevice]);
  return (
    <>
      <div className="device-state-body" hidden={showForm}>
        <div className="view-query-left">
          <RenderBreadcrumb
            showForm={showForm}
            breadcrumb={breadcrumb}
            editbreadcrumb={[]}
          />
        </div>
        <BaseTable
          columns={columns}
          get={getLimsBasicDevice}
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
          <div>设备名称:{records?.deviceName}</div>
          <div>价值:{records?.price}</div>
          <div>净值:{records?.amountMoney}</div>
          {/* <div>领用人:{records?.price}</div> */}

          <div>设备编号:{records?.deviceNo}</div>
          <div>设备型号:{records?.model}</div>
          <div>累计折旧金额:{records?.depreciationMoney}</div>
          <div>单位:{records?.unitName}</div>
          <div>存放地:{records?.address}</div>
          {console.log(statusObj[records?.status], "??")}
          {records?.status && (
            <div>现状:{statusObj[records?.status]?.text}</div>
          )}
          {/* <div>出场号:{records?.address}</div>
          <div>现状:{records?.status}</div>
          <div>已使用年限:{records?.no}</div>
          <div>最低使用年限:{records?.no}</div>
          <div>入库日期:{records?.no}</div> */}

          <div>使用寿命:{records?.useLife}</div>
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
