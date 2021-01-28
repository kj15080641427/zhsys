import React, { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
import "./index.scss";
import {
  // getLimsBasicDevice,
  getDeviceScrapWarning,
  getLimsBasiccategory,
} from "../../../request/index";
import BaseTable from "../../../components/home/baseTable";
import SearchTree from "../../../components/formItems/tree";

const DeviceStatus = (props) => {
  const { getBase } = props.actions;
  const { deposiDevice, scrapType } = props;

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
      dataIndex: "categoryName",
    },
    {
      title: "设备编号",
      dataIndex: "deviceNo",
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
    },
    {
      title: "规格型号",
      dataIndex: "model",
    },
    {
      title: "已使用年限",
      dataIndex: "useLife",
    },
    {
      title: "预计报废时间",
      dataIndex: "produceDate",
    },

    {
      title: "维修次数",
      dataIndex: "repairNumber",
    },
    {
      title: "预警状态",
      dataIndex: "warningStatus",
    },
    {
      title: "报废状态",
      dataIndex: "scrapStatus",
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
  // useEffect(() => {
  //   deposiDevice?.records && setRecords(deposiDevice?.records[0]);
  // }, [deposiDevice]);

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
              baseStoreKey="deposiDevice"
              columns={columns}
              get={getDeviceScrapWarning}
              showEdit={false}
              rowKey="id"
              update={(row) => {
                setShowForm(true);
                setRecords(row);
                // getBase({
                //   request: getDeviceScrapWarning,
                //   key: "deposiDevice",
                //   param: {
                //     current: 1,
                //     size: 1,
                //   },
                // });
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
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          设备基础数据:
        </div>
        <div className="device-detail-flex">
          <div>设备编号:{records?.deviceNo}</div>
          <div>设备类别:{records?.categoryName}</div>
          <div>设备名称:{records?.deviceName}</div>
          <div>预警状态:{records?.warningStatus}</div>

          <div>设备型号:{records?.model}</div>
          <div>供应商:{records?.supplierId}</div>
          <div>品牌:{records?.brandName}</div>
          <div>存放位置:{records?.address}</div>

          <div>入库日期:{records?.createDate}</div>
          <div>维修次数:{records?.repairNumber}</div>
        </div>
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          设备图片:
        </div>
        <img></img>
        {/* 使用情况 */}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    deposiDevice: state.currency.deposiDevice,
    scrapType: state.currency.scrapType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatus);
