import React, { useState, useEffect, useRef } from "react";
import { Table, Modal, DatePicker } from "antd";
import { columnsToForm } from "../../../utils/common";
import moment from "moment";
import FormSelect from "../../../components/formItems/select";
import {
  getLimsBasiccategory,
  updLimsBasicDevice,
  getLimsUselanapplyListPurItem,
} from "../../../request/index";
import DeviceForm from "../../../components/formItems/deviceForm";

export default (props) => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const { records } = props;
  const formRef = useRef();
  useEffect(() => {
    props.value && setDataSource(props.value);
  }, [props.value]);

  // 查询设备信息
  const getDeviceInfo = (row) => {
    row = { ...row, produceDate: moment(row.produceDate) };
    formRef.current.setFieldsValue(row);
    setVisible(true);
  };
  //提交设备信息
  const onFinish = (data) => {
    // 格式化日期
    data = {
      ...data,
      produceDate: moment(data.produceDate).format("YYYY-MM-DD HH:mm:ss"),
    };
    //更新设备数据
    updLimsBasicDevice(data).then(() => {
      //根据购置单id查询购置清单,也就是设备
      getLimsUselanapplyListPurItem({
        current: 1,
        mainId: records.id,
        size: -1,
      }).then((result) => {
        let list = result.data.map((item) => {
          return { ...item, ...item.limsBasicdevice };
        });
        setDataSource(list); //设置购置清单列表
      });
      setVisible(false); //关闭modal
    });
  };
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
      title: "单位",
      dataIndex: "unit",
      require: true,
    },
    {
      title: "规格型号",
      dataIndex: "model",
      require: false,
    },
    {
      title: "品牌",
      dataIndex: "brand",
    },
    {
      title: "备注",
      dataIndex: "remark",
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
      render: (e) => (
        <FormSelect
          disabled
          value={e}
          request={getLimsBasiccategory}
          storeKey="deviceType"
          labelString="name"
          valueString="id"
        ></FormSelect>
      ),
    },
    {
      title: "生产日期",
      dataIndex: "produceDate",
      ele: <DatePicker showTime format="YYYY-MM-DD HH:mm:ss"></DatePicker>,
    },
    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (row) => <a onClick={() => getDeviceInfo(row)}>完善资料</a>,
    },
  ];

  return (
    <div value={props.value} onChange={() => props.onChange}>
      <Table
        value={dataSource}
        columns={columns}
        dataSource={dataSource}
        rowKey={"deviceNo"}
      ></Table>
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        forceRender
        width="1000px"
        height="800px"
      >
        <DeviceForm
          onFinish={onFinish}
          formRef={formRef}
          formItem={columnsToForm(columns)}
        ></DeviceForm>
      </Modal>
    </div>
  );
};
