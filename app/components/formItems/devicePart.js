import React, { useState, useEffect } from "react";
import { Table, Button, Modal, message, Input } from "antd";
import { columnsToForm } from "../../utils/common";
import DYForm from "@app/components/home/form";
import moment from "moment";
import FormSelect from "../formItems/select";
import {
  delLimsBasicDevicePart,
  getLimsBasicDevicePart,
  addLimsBasicDevicePart,
} from "../../request/index";
export default (props) => {
  const { deviceInfo, devicePart } = props;
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    devicePart && setDataSource(devicePart);
  }, [devicePart]);
  const delDataSource = (row) => {
    delLimsBasicDevicePart({ id: row?.id }).then(() => {
      message.info("删除成功");
      getLimsBasicDevicePart({
        current: 1,
        deviceId: deviceInfo.id,
        size: -1,
      }).then((res) => {
        setDataSource(res.data.records);
      });
    });
    // setDataSource([...list]);
  };
  const columns = [
    {
      title: "部件编号",
      dataIndex: "code",
    },
    {
      title: "部件名称",
      dataIndex: "name",
    },
    // {
    //   title: "型号",
    //   dataIndex: "s",
    // },
    {
      title: "使用寿命",
      dataIndex: "useLife",
      ele: <Input suffix="年"></Input>,
    },
    {
      title: "保养周期",
      dataIndex: "maintainCycle",
    },
    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (row) => <a onClick={() => delDataSource(row)}>删除部件</a>,
    },
  ];

  const onFinish = (data) => {
    data = {
      ...data,
      deviceId: deviceInfo.id,
    };
    addLimsBasicDevicePart(data).then(() => {
      getLimsBasicDevicePart({
        current: 1,
        deviceId: deviceInfo.id,
        size: -1,
      }).then((res) => {
        console.log(res.data, "RRRR");
        setDataSource(res.data.records);
        setVisible(false);
      });
    });
  };

  return (
    <div>
      <Button
        onClick={() => {
          setVisible(true);
        }}
      >
        新增部件
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
