import React, { useEffect, useState } from "react";
import { Card, Select, Pagination, Table } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
import "./index.scss";
import FormSelect from "../../../components/formItems/select";
import { getLimsBasiccategory } from "../../../request/index";
import { getLimsBasicDevice } from "../../../request/index";

const obj = {
  2: {
    text: "闲置",
    color: "#ffc001",
  },
  6: {
    text: "维修",
    color: "red",
  },
  4: {
    text: "出借",
    color: "#0176ff",
  },
  9: {
    text: "报废",
    color: "#df01ff",
  },
  8: {
    text: "保养",
    color: "#2d01ff",
  },
};

const DeviceStatus = (props) => {
  const { getBase } = props.actions;
  const { deviceStatus } = props;

  const [current, setCurrent] = useState(1);
  const [type, setType] = useState("");
  const [status, setStatus] = useState(null);
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
      click: () => setShowForm(false),
    },
    {
      name: records?.deviceName,
      color: "#40A0EA",
    },
  ];

  useEffect(() => {
    console.log(status, type);
    getBase({
      request: getLimsBasicDevice,
      key: "deviceStatus",
      param: { current: current, size: 24, status: status, type: type },
    });
  }, [current, type, status]);

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
            <span id="label">设备状态:</span>
            <Select
              defaultValue={null}
              id="select"
              onChange={(e) => setStatus(e)}
            >
              <Select value={null}>全部</Select>
              <Select value="4">出借</Select>
              <Select value="2">闲置</Select>
              <Select value="8">保养</Select>
              <Select value="9">报废</Select>
              <Select value="6">维修</Select>
            </Select>
          </div>
          <div className="device-statue-select">
            <span id="label">设备类别:</span>
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
          <div className="device-state-box">
            <div className="device-state-layout">
              <span>出借</span>
              <div
                className="device-state-color"
                style={{ background: "#0176ff" }}
              ></div>
            </div>
            <div className="device-state-layout">
              <span>闲置</span>
              <div
                className="device-state-color"
                style={{ background: "#ffc001 " }}
              ></div>
            </div>
            <div className="device-state-layout">
              <span>保养</span>
              <div
                className="device-state-color"
                style={{ background: "#2d01ff" }}
              ></div>
            </div>
            <div className="device-state-layout">
              <span>报废</span>
              <div
                className="device-state-color"
                style={{ background: "#df01ff" }}
              ></div>
            </div>
            <div className="device-state-layout">
              <span>维修</span>
              <div
                className="device-state-color"
                style={{ background: "red" }}
              ></div>
            </div>
          </div>
        </div>
        <div className="device-state-card-box">
          {deviceStatus?.records?.map((item) => {
            return (
              <Card
                key={item.id}
                className="device-state-card"
                onClick={() => {
                  setShowForm(true);
                  setRecords(item);
                }}
              >
                <div className="device-state-card-box">
                  <img></img>
                  <div id="nameBox">
                    <div id="name">{item.deviceName}</div>
                    <div>品牌:{item.brandName}</div>
                  </div>
                </div>
                <br />
                <br />
                <div className="device-state-card-box">
                  <div>
                    <div id="text">编号:{item.deviceNo}</div>
                    <div id="text">型号:{item.model}</div>
                  </div>
                  <div>
                    <div
                      className="device-state-color"
                      style={{ background: obj[item.status]?.color }}
                    ></div>
                    <div className="device-state-text">
                      {obj[item.status]?.text}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        <Pagination
          className="device-state-pagina"
          defaultPageSize={24}
          showSizeChanger={false}
          current={current}
          total={deviceStatus?.total}
          onChange={(current) => setCurrent(current)}
        ></Pagination>
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
          <div>设备编号:{records.deviceNo}</div>
          <div>设备类别:{records.categoryName}</div>
          <div>设备型号:{records.model}</div>
          <div>单位:{records.unitName}</div>
          <div>存放位置:{records.address}</div>
          <div>资产编号:{records.no}</div>
          <div>设备名称:{records.deviceName}</div>
          <div>品牌:{records.brandName}</div>
          <div>价值:{records.price}</div>
        </div>
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          设备状态:
        </div>
        <div className="device-detail-flex">
          <div>目前状态:{obj[records.status]?.text}</div>
          <div>归还时间:{records.createDate}</div>
        </div>
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          预计报废:
        </div>
        <div className="device-detail-flex">
          <div>预计报废时间:</div>
          <div>可使用时间:</div>
        </div>
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          部件明细:
        </div>
        <Table></Table>
        <div className="device-state-line"></div>
        <div className="form-info">
          <div className="line"></div>
          设备图片:
        </div>
        <img></img>
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    deviceStatus: state.currency.deviceStatus,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatus);
