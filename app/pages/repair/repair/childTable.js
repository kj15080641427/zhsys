import React, { useState, useEffect } from "react";
import { Table, Radio } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";

const ChildTable = (props) => {
  const { deviceList } = props;
  const { setReturnbackList } = props.actions;

  const [dataSource, setDataSource] = useState([]);
  const [radioValue, setRadioValue] = useState("1");

  useEffect(() => {
    let obj = deviceList?.map((item) => {
      return { ...item.limsBasicdevice, ...item };
    });
    setDataSource(obj);
    setReturnbackList(obj);
  }, [deviceList]);
  useEffect(() => {
    return setRadioValue("0");
  }, []);
  useEffect(() => {
    return setDataSource([]);
  }, []);
  const columns = [
    {
      title: "设备编号",
      dataIndex: "deviceNo",
      require: true,
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
      require: true,
    },
    {
      title: "规格型号",
      dataIndex: "model",
      require: false,
    },
    {
      title: "生产日期",
      dataIndex: "produceDate",
    },
    {
      title: "已使用年限",
      dataIndex: "usedTime",
    },
    {
      title: "价值",
      dataIndex: "price",
    },
    {
      title: "使用天数",
      dataIndex: "usePeriod",
    },
    {
      title: "应用项目",
      dataIndex: "",
    },
    {
      title: "归还结果",
      dataIndex: "status",
      render: (e) => (
        <Radio.Group
          onChange={(e) => setRadioValue(String(e.target.value))}
          // value={e || radioValue}
          defaultValue={e || radioValue}
        >
          <Radio value={"0"}>正常</Radio>
          <Radio value={"1"}>损坏</Radio>
        </Radio.Group>
      ),
    },

    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (row) => (
        <a
          onClick={() => {
            setDataSource(dataSource.filter((item) => item.id != row.id));
            console.log(row);
          }}
        >
          删除
        </a>
      ),
    },
  ];

  return (
    <div value={props.value} onChange={() => props.onChange}>
      <Table
        // value={dataSource}
        columns={columns}
        dataSource={dataSource}
        rowKey={"deviceNo"}
      ></Table>
    </div>
  );
};
const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildTable);
