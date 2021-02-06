import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
import "./index.scss";
import {
  getDevicePartScrapWarningDetail,
  getDevicePartScrapWarning,
  getLimsBasiccategory,
} from "../../../request/index";
import { Card } from "antd";
import BaseTable from "../../../components/home/baseTable";
import SearchTree from "../../../components/formItems/tree";

const DeviceStatus = (props) => {
  const { getBase } = props.actions;
  const { devicePartDetail, scrapType } = props;

  const [showForm, setShowForm] = useState(false);
  const [records, setRecords] = useState({});
  const [treeData, setTreeData] = useState([]);
  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "综合管理",
    },
    {
      name: "关键部件报废预警",
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
      name: "关键部件报废预警",
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
      dataIndex: "deviceName",
    },
    {
      title: "设备组件",
      dataIndex: "deviceNo",
    },
    {
      title: "预警状态",
      dataIndex: "warningStatus",
    },
    {
      title: "报废状态",
      dataIndex: "status",
      render: (i) => (i == "0" ? "已报废" : "未报废"),
    },
    {
      title: "入库日期",
      dataIndex: "createDate",
    },
  ];

  useEffect(() => {
    getBase({
      request: getLimsBasiccategory,
      key: "scrapType",
      param: {
        size: -1,
        current: 1,
      },
    });
  }, []);
  useEffect(() => {
    let child = scrapType?.records?.map((item) => {
      return {
        title: item.name,
        key: item.id,
      };
    });
    setTreeData([
      {
        title: "所有类别",
        key: "1",
        children: child,
      },
    ]);
  }, [scrapType]);
  useEffect(() => {
    devicePartDetail?.records && setRecords(devicePartDetail?.records[0]);
  }, [devicePartDetail]);

  return (
    <div>
      <div className="device-state-body" hidden={showForm}>
        <div className="view-query-left">
          <RenderBreadcrumb
            showForm={showForm}
            breadcrumb={breadcrumb}
            editbreadcrumb={[]}
          />
        </div>
        <div className="scrap-early-flex ">
          <div className="scrap-early-tree">
            <SearchTree treeData={treeData}></SearchTree>
          </div>
          <div className="device-state-body">
            <BaseTable
              searchName="name"
              showSearch={true}
              baseStoreKey="devicePartWarning"
              columns={columns}
              get={getDevicePartScrapWarning}
              showEdit={false}
              showDelete={false}
              rowKey="id"
              update={(row) => {
                setShowForm(true);
                getBase({
                  request: getDevicePartScrapWarningDetail,
                  key: "devicePartDetail",
                  param: {
                    id: row.id,
                  },
                });
              }}
            ></BaseTable>
          </div>
        </div>
      </div>
      <div hidden={!showForm}>
        <div className="view-query-left">
          <RenderBreadcrumb
            showForm={showForm}
            breadcrumb={[]}
            editbreadcrumb={editbreadcrumb}
          />
        </div>
        <div className="form-info">
          <div className="line"></div>
          设备信息:
        </div>
        <Card>
          <div className="device-detail-flex">
            <div>设备类别:{records?.categoryName}</div>
            <div>设备名称:{records?.deviceName}</div>
          </div>
        </Card>
        <div className="form-info">
          <div className="line"></div>
          设备组件:
        </div>
        <Card></Card>
        {/* 使用情况 */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    devicePartDetail: state.currency.devicePartDetail,
    devicePartWarning: state.currency.devicePartWarning,
    scrapType: state.currency.scrapType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});
// const fn = (data: () => void) => {};
export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatus);
