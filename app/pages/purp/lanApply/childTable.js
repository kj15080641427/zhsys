import React, { useState, useEffect } from "react";
import { Table, Button, Modal, DatePicker } from "antd";
import { columnsToForm } from "../../../utils/common";
import DYForm from "@app/components/home/form";
import moment from "moment";
import FormSelect from "../../../components/formItems/select";
import { getLimsBasiccategory, getUserCompany } from "../../../request/index";
export default (props) => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    props.value && setDataSource(props.value);
  }, [props.value]);
  const delDataSource = (index) => {
    let list = dataSource;
    list.splice(index, 1);
    setDataSource([...list]);
  };
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
      dataIndex: "unit",
      ele: (
        <FormSelect
          request={getUserCompany}
          storeKey="userCompany"
          labelString="name"
          valueString="id"
        ></FormSelect>
      ),
    },
    {
      title: "规格型号",
      dataIndex: "model",
    },
    {
      title: "品牌",
      dataIndex: "brand",
      rules: [{ require: false }],
    },
    {
      title: "备注",
      dataIndex: "remark",
      rules: [{ require: false }],
    },
    {
      title: "设备类别",
      dataIndex: "categoryId",
      ele: (
        <FormSelect
          request={getLimsBasiccategory}
          storeKey="deviceType"
          labelString="name"
          valueString="id"
        ></FormSelect>
      ),
      rules: [{ require: false }],
    },
    {
      title: "生产日期",
      dataIndex: "produceDate",
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
      rules: [{ require: false }],
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

  const onFinish = (data) => {
    data = {
      ...data,
      produceDate: moment(data.produceDate).format("YYYY-MM-DD HH:mm:ss"),
    };
    props.onChange([...dataSource, data]);
    setDataSource([...dataSource, data]);
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
        新增设备
      </Button>
      <Table
        value={dataSource}
        columns={columns}
        dataSource={dataSource}
        rowKey={"deviceNo"}
      ></Table>
      <Modal visible={visible} footer={null} onCancel={() => setVisible(false)}>
        <DYForm
          formItem={columnsToForm(columns)}
          buttonText={"保存"}
          onFinish={onFinish}
        ></DYForm>
      </Modal>
    </div>
  );
};
