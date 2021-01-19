import React, { useState, useEffect } from "react";
import { Table, Button, Modal, DatePicker } from "antd";
import { getLimsBasicDevice } from "../../../request/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";

const ChildTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selected, setSelected] = useState([]);

  const [day, setDay] = useState(0); //使用天数
  const [momeny, setMoneny] = useState(0);
  const { getBase, setTotalPrice } = props.actions;
  const { baseDevice, isDisible } = props;

  useEffect(() => {
    props.value && setDataSource(props.value);
  }, [props.value]);

  useEffect(() => {
    //计算所有设备的总金额
    let total = 0;
    dataSource?.map((item) => {
      total = total + item.totalPrice;
    });
    setTotalPrice(total);
  }, [dataSource, day, momeny]);

  useEffect(() => {
    //获取设备信息
    getBase({
      request: getLimsBasicDevice,
      key: "baseDevice",
      param: {
        current: 1,
        size: -1,
      },
    });
  }, []);

  const delDataSource = (index) => {
    let list = dataSource;
    list.splice(index, 1);
    setDataSource([...list]);
  };
  const modalColumns = [
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
      title: "价值",
      dataIndex: "price",
      rules: [{ require: false }],
    },
  ];
  const columns = [
    {
      title: "设备编号",
      dataIndex: "deviceNo",
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
    },
    {
      title: "单位",
      dataIndex: "unitName",
    },
    {
      title: "规格型号",
      dataIndex: "model",
    },
    {
      title: "生产日期",
      dataIndex: "produceDate",
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
      rules: [{ require: false }],
    },
    {
      title: "价值",
      dataIndex: "price",
      rules: [{ require: false }],
    },
    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (_, __, index) =>
        isDisible ? "" : <a onClick={() => delDataSource(index)}>删除</a>,
    },
  ];

  const onFinish = () => {
    // data = {
    //   ...data,
    //   produceDate: moment(data.produceDate).format("YYYY-MM-DD HH:mm:ss"),
    // };
    setDay("");
    setMoneny("");
    props.onChange(selected);
    setDataSource(selected);
    setVisible(false);
  };

  return (
    <div value={props.value} onChange={() => props.onChange}>
      <Button
        className="child-form-add-button"
        onClick={() => {
          setVisible(true);
        }}
      >
        选择设备
      </Button>
      <Table
        value={dataSource}
        columns={columns}
        dataSource={dataSource}
        rowKey={"deviceNo"}
      ></Table>
      <Modal
        visible={visible}
        onOk={onFinish}
        onCancel={() => setVisible(false)}
        width="1000px"
        destroyOnClose
      >
        <Table
          rowSelection={{
            onChange: (key, rows) => {
              console.log(rows, "RRR");
              setSelected(rows);
            },
          }}
          columns={modalColumns}
          dataSource={baseDevice?.records}
          rowKey={"id"}
        ></Table>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    baseDevice: state.currency.baseDevice,
    complexfund: state.currency.complexfund,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildTable);
