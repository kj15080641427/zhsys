import React, { useState, useEffect } from "react";
import { Table, Button, Modal, DatePicker } from "antd";
import { columnsToForm } from "../../../utils/common";
// import DYForm from "../sendBack/node_modules/@app/components/home/form";
import moment from "moment";
import FormSelect from "../../../components/formItems/select";
import {
  getLimsBasiccategory,
  getUserCompany,
  getLimsBasicDevice,
} from "../../../request/index";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";

const ChildTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const [selected, setSelected] = useState([]);
  const { getBase } = props.actions;
  const { baseDevice } = props;

  useEffect(() => {
    props.value && setDataSource(props.value);
  }, [props.value]);

  useEffect(() => {
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
    // {
    //   title: "生产日期",
    //   dataIndex: "produceDate",
    //   ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    //   rules: [{ require: false }],
    // },
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
      title: "已使用年限",
      dataIndex: "",
    },
    {
      title: "价值",
      dataIndex: "price",
      rules: [{ require: false }],
    },
    {
      title: "使用天数",
      dataIndex: "",
    },
    {
      title: "使用单价",
      dataIndex: "",
    },
    {
      title: "小计",
      dataIndex: "",
    },
    {
      title: "应用项目",
      dataIndex: "",
    },
    // {
    //   title: "单位",
    //   dataIndex: "unit",
    //   ele: (
    //     <FormSelect
    //       request={getUserCompany}
    //       storeKey="userCompany"
    //       labelString="name"
    //       valueString="id"
    //     ></FormSelect>
    //   ),
    // },

    // {
    //   title: "品牌",
    //   dataIndex: "brand",
    //   rules: [{ require: false }],
    // },
    // {
    //   title: "备注",
    //   dataIndex: "remark",
    //   rules: [{ require: false }],
    // },
    // {
    //   title: "设备类别",
    //   dataIndex: "categoryId",
    //   ele: (
    //     <FormSelect
    //       request={getLimsBasiccategory}
    //       storeKey="deviceType"
    //       labelString="name"
    //       valueString="id"
    //     ></FormSelect>
    //   ),
    //   rules: [{ require: false }],
    // },

    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (_, __, index) => (
        <a onClick={() => delDataSource(index)}>删除</a>
      ),
    },
  ];

  const onFinish = (data) => {
    // data = {
    //   ...data,
    //   produceDate: moment(data.produceDate).format("YYYY-MM-DD HH:mm:ss"),
    // };
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
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildTable);
