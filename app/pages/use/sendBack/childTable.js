import React, { useState, useEffect, useRef } from "react";
import { Table, Modal, DatePicker } from "antd";
import { columnsToForm } from "../../../utils/common";
import moment from "moment";
import FormSelect from "../../../components/formItems/select";
import {
  getLimsBasiccategory, //查询设备类别
  updLimsBasicDevice, //修改设备
  getLimsUselanapplyListPurItem,
  getLimsBasicDevicePart, //查询设备部件列表
} from "../../../request/index";
import DeviceForm from "../../../components/formItems/deviceForm";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";

const ChildTable = (props) => {
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [deviceInfo, setDeviceInfo] = useState({});
  const [devicePart, setDevicePart] = useState([]);
  const { records } = props;
  const { setTotalPrice } = props.actions;
  const formRef = useRef();
  useEffect(() => {
    props.value && setDataSource(props.value);
  }, [props.value]);

  // 查询设备信息
  const getDeviceInfo = (row) => {
    setDeviceInfo(row);
    //查询设备部件
    getLimsBasicDevicePart({
      current: 1,
      deviceId: row.id,
      size: -1,
    }).then((res) => {
      setDevicePart(res.data.records);
    });
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
        let price = 0;
        let list = result.data.map((item) => {
          price = price + item.limsBasicdevice.price;
          return { ...item, ...item.limsBasicdevice };
        });
        setDataSource(list); //设置购置清单列表
        setTotalPrice(price);
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
          devicePart={devicePart}
          deviceInfo={deviceInfo}
          onFinish={onFinish}
          formRef={formRef}
          formItem={columnsToForm(columns)}
        ></DeviceForm>
      </Modal>
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
