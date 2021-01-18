// import BaseLayout from "../../../components/baseComponent/connectComponents";
// import React from "react";
// import {
//   getDepositstock,
//   addDepositstock,
//   delDepositstock,
//   updDepositstock,
//   getLimsBasicDevice,
//   // updComplexfound,
//   // delComplexfound,
// } from "../../../request/index";
// import { Input, DatePicker } from "antd";
// // import { columnsToFormFlow } from "../../utils/common";
// // import BaseTable from "../../components/home/baseTable";
// // import BaseForm from "../../components/home/baseForm";
// import FormSelect from "../../../components/formItems/select";
// const Despositstock = (props) => {
//   const columns = [
//     {
//       title: "类别",
//       dataIndex: "code",
//     },
//     {
//       title: "设备编号",
//       dataIndex: "createDate",
//     },
//     {
//       title: "设备名称",
//       dataIndex: "bussineId",
//     },
//     {
//       title: "型号",
//       dataIndex: "deviceNo",
//     },
//     {
//       title: "价值",
//       dataIndex: "deviceName",
//     },
//     {
//       title: "累计折旧金额",
//       dataIndex: "model",
//     },

//     {
//       title: "净值",
//       dataIndex: "produceDate",
//     },
//     {
//       title: "领用单位",
//       dataIndex: "useLife",
//     },

//     {
//       title: "领用人",
//       dataIndex: "actualUseLife",
//     },
//   ];
//   const rowSelect = [
//     {
//       label: "",
//       name: "name",
//       element: <Input placeholder="" className=""></Input>,
//     },
//   ];
//   const breadcrumb = [
//     {
//       name: "首页",
//     },
//     {
//       name: "耗材管理",
//     },
//     {
//       name: "在库资产",
//     },
//   ];
//   const formItem = [
//     {
//       label: "选择设备",
//       name: "deviceId",
//       ele: (
//         <FormSelect
//           style={{ width: "100%" }}
//           request={getLimsBasicDevice}
//           param={{ current: 1, size: -1, status: "2" }}
//           storeKey="sb"
//           labelString="deviceName"
//           valueString="id"
//         ></FormSelect>
//       ),
//     },
//     {
//       label: "报废时间",
//       name: "createDate",
//       ele: (
//         <DatePicker
//           showTime
//           format="YYYY-MM-DD HH:mm:ss"
//           style={{ width: "100%" }}
//         ></DatePicker>
//       ),
//     },
//     {
//       label: "业务单号",
//       name: "bussineId",
//       ele: <Input></Input>,
//     },
//     {
//       label: "备注说明",
//       name: "remark",
//       ele: <Input></Input>,
//     },
//   ];
//   return (
//     <>
//       <BaseLayout
//         get={getDepositstock} // 分页查询接口
//         add={addDepositstock} // 添加数据接口
//         upd={updDepositstock} // 更新数据接口
//         del={delDepositstock} // 删除数据接口
//         columns={columns} // 表格配置项
//         formItem={formItem} // 表单配置项
//         rowSelect={rowSelect} // 查询配置项
//         keyId={"id"} // 数据的唯一ID
//         storeKey={"deviceType"} // store中的key值. 要与 mapStatetoProps 中的key相同
//         formatList={["createDate", "produceDate"]} //需要转换时间格式的表单字段
//         breadcrumb={breadcrumb} //面包屑
//       ></BaseLayout>
//     </>
//   );
// };
// export default Despositstock;
import React, { useEffect, useState } from "react";
import { Card, Select, Pagination, Table } from "antd";
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
  const { deposiDevice } = props;

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
    console.log(records, "000");
    // getBase({
    //   request: getLimsBasicDevice,
    //   key: "deviceStatus",
    //   param: { current: current, size: 24, status: status, type: type },
    // });
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
          <div>设备类别:{records.categoryName}</div>
          <div>设备名称:{records.deviceName}</div>
          <div>价值:{records.price}</div>
          <div>净值:{records.price}</div>
          <div>领用人:{records.price}</div>

          <div>设备编号:{records.deviceNo}</div>
          <div>设备型号:{records.model}</div>
          <div>累计折旧金额:{records.price}</div>
          <div>领用单位:{records.unitName}</div>
          <div>存放地:{records.address}</div>

          <div>出场号:{records.address}</div>
          <div>现状:{records.no}</div>
          <div>已使用年限:{records.no}</div>
          <div>最低使用年限:{records.no}</div>
          <div>入库日期:{records.no}</div>

          <div>单位管理员:{records.no}</div>
          <div>品牌:{records.brandName}</div>
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
    deposiDevice: state.currency.deposiDevice,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeviceStatus);
