import React, { useState, useEffect } from "react";
import { Table, Button, Modal, DatePicker, Input } from "antd";
// import { columnsToForm } from "../../../utils/common";
// import DYForm from "../sendBack/node_modules/@app/components/home/form";
// import moment from "moment";
// import FormSelect from "../../../components/formItems/select";
import { getLimsBasicDevice, getComplexfound } from "../../../request/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";

const ChildTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [selected, setSelected] = useState([]);

  const [day, setDay] = useState(0); //工时
  const [momeny, setMoneny] = useState(0); //费用
  const [remark, setRemark] = useState(0); //说明
  const { getBase, setTotalPrice } = props.actions;
  const { baseDevice } = props;

  useEffect(() => {
    props.value && setDataSource(props.value);
    console.log(props.value, "========");
    return () => setDataSource([]);
  }, [props.value]);

  useEffect(() => {
    // setTotalPrice(0);
    //计算所有设备的总金额
    let total = 0;
    dataSource?.map((item) => {
      total = Number(total) + Number(item.planFee);
    });
    setTotalPrice(total);
  }, [momeny]);

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
    //获取年度经费
    getBase({
      request: getComplexfound,
      key: "complexfund",
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
      title: "单位",
      dataIndex: "unitName",
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
      title: "品牌",
      dataIndex: "brandName",
    },
    {
      title: "上次保养日期",
      dataIndex: "",
    },
    {
      title: "保养周期",
      dataIndex: "",
    },
    {
      title: "距离保养到期",
      dataIndex: "",
    },
    {
      title: "是否过免保期",
      dataIndex: "",
    },
    {
      title: "预估工时",
      dataIndex: "planTime",
      render: (e, row, index) => (
        <Input
          defaultValue={props.value[index]?.planTime}
          onChange={(W) => {
            setDay(W.target.value);
            let list = dataSource;
            list[index].planTime = W.target.value;
            setDataSource(list);
          }}
        ></Input>
      ),
    },
    {
      title: "预估费用",
      dataIndex: "planFee",
      render: (e, row, index) => (
        <Input
          defaultValue={props.value[index]?.planFee}
          onChange={(W) => {
            setMoneny(W.target.value);
            let list = dataSource;
            list[index].planFee = W.target.value;
            setDataSource(list);
          }}
        ></Input>
      ),
    },
    {
      title: "养护说明",
      dataIndex: "remark",
      render: (e, row, index) => (
        <Input
          defaultValue={props.value[index]?.remark}
          onChange={(W) => {
            setRemark(W.target.value);
            let list = dataSource;
            list[index].remark = W.target.value;
            setDataSource(list);
          }}
        ></Input>
      ),
    },
    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (_, __, index) => (
        <a onClick={() => delDataSource(index)}>删除</a>
      ),
    },
  ];

  const onFinish = () => {
    // data = {
    //   ...data,
    //   produceDate: moment(data.produceDate).format("YYYY-MM-DD HH:mm:ss"),
    // };
    setDay("");
    setMoneny("");
    setRemark("");
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
        rowKey={"id"}
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
