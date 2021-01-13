import React, { useState, useEffect, useRef } from "react";
import { Table, Modal } from "antd";
import moment from "moment";
import {
  updLimsBasicDevice,
  getLimsBasicDevicePart, //查询设备部件列表
  getLimsUselanapplyById,
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
  const { records, purpList } = props;
  const { setTotalPrice } = props.actions;
  const formRef = useRef();
  // useEffect(() => {
  //   props.value && setDataSource(props.value);
  // }, [props.value]);

  useEffect(() => {
    props.onChange(purpList);
    setDataSource(purpList);
  }, [purpList]);
  useEffect(() => {
    return () => {
      setDataSource([]);
    };
  }, []);
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
      getLimsUselanapplyById({
        id: records.id,
      }).then((result) => {
        let price = 0;
        let list = result.data.limsPurplanapplyitemDOList.map((item) => {
          price = price + item.price;
          return item;
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
      dataIndex: "brand",
      render: (_, row) => row.dictName || row.brandName,
    },
    // {
    //   title: "备注",
    //   dataIndex: "remark",
    // },
    {
      title: "设备类别",
      dataIndex: "categoryName",
    },
    {
      title: "生产日期",
      dataIndex: "produceDate",
    },
    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (row) => (
        // records?.status == "1" || !records?.status ? (
        <a onClick={() => getDeviceInfo(row)}>完善资料</a>
      ),
      // ) : (
      //   ""
      // ),
    },
  ];

  return (
    <div value={props.value} onChange={() => props.onChange}>
      {/* {console.log(dataSource, "???")} */}
      <Table
        value={dataSource}
        columns={columns}
        dataSource={dataSource}
        rowKey={"id"}
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
        ></DeviceForm>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    purpList: state.formItems.purpList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildTable);
