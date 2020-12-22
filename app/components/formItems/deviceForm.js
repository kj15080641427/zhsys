import React from "react";
import { Form, Input, Row, Col, DatePicker, Button, Card } from "antd";
// import DYForm from "./../home/form";
import FormSelect from "./select";
import { getLimsBasiccategory } from "../../request/index";
import { columnsToFormFlow } from "../../utils/common";
import DevicePart from "./devicePart";
import "./index.scss";

export default (props) => {
  const { onFinish, formRef, id = "id", deviceInfo, devicePart } = props;
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
      require: true,
    },
    {
      title: "单位",
      dataIndex: "unit",
      require: true,
    },

    {
      title: "品牌",
      dataIndex: "brand",
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
      // rules: [{ require: false }],
    },

    // {
    //   title: "出厂编号",
    //   dataIndex: "unit",
    // },
    {
      title: "价值",
      dataIndex: "price",
      ele: <Input suffix="元"></Input>,
    },
    {
      title: "生产日期",
      dataIndex: "produceDate",
      ele: <DatePicker></DatePicker>,
    },
    {
      title: "保养周期",
      dataIndex: "maintainCycle",
      ele: <Input suffix="月"></Input>,
    },
    {
      title: "使用寿命",
      dataIndex: "useLife",
      ele: <Input suffix="年"></Input>,
    },
    {
      title: "折旧率",
      dataIndex: "depreceRate",
      ele: <Input suffix="%"></Input>,
    },
    {
      title: "备注",
      dataIndex: "remark",
      col: 24,
    },
  ];
  return (
    <div>
      <Form
        name={"device"}
        onFinish={onFinish}
        ref={formRef}
        labelCol={{ span: 5 }}
      >
        <div className="form-info">
          <div className="line"></div>
          完善设备资料
        </div>
        <div className="device-form-box">
          <div className="device-form-item">
            <Row>
              {columnsToFormFlow(columns).map((item, index) => (
                <Col key={index} span={item.col || 12}>
                  <Form.Item
                    labelAlign="right"
                    label={item.label}
                    name={item.name}
                    rules={[{ required: item.require }]}
                    labelCol={{ span: item.col ? 2 : 6 }}
                  >
                    {item.ele}
                  </Form.Item>
                </Col>
              ))}
            </Row>
          </div>
          <div className="device-form-image">设备图片</div>
        </div>
        <div className="form-info">
          <div className="form-info">
            <div className="line"></div>
            部件明细
          </div>
        </div>
        <DevicePart
          deviceInfo={deviceInfo}
          devicePart={devicePart}
        ></DevicePart>

        <Form.Item name={id}></Form.Item>

        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};
