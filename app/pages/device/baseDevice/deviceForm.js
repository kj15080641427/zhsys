import React from "react";
import { Form, Input, Row, Col, DatePicker, Button } from "antd";
// import DYForm from "./../home/form";
import FormSelect from "../../../components/formItems/select";
import { getLimsBasiccategory, getLimsBasicDict } from "../../../request/index";
import { columnsToFormFlow, formatAttachment } from "../../../utils/common";
// import DevicePart from "./devicePart";
import AttachmentList from "../../../components/formItems/attachment";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";

const BaseDevice = (props) => {
  const { onFinish, formRef, id = "id", imageList } = props;
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
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "5" }}
          storeKey="dw"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
    },

    {
      title: "品牌",
      dataIndex: "brand",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "1" }}
          storeKey="pp"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
    },
    {
      title: "设备类别",
      dataIndex: "categoryId",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasiccategory}
          param={{ current: 1, size: -1 }}
          storeKey="sbfl"
          labelString="name"
          valueString="id"
        ></FormSelect>
      ),
    },
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
      // col: 24,
      // labelCol: 8,
    },
  ];
  return (
    <div>
      <Form
        name={"device"}
        onFinish={(values) => {
          values = {
            ...values,
            limsAttachmentSaveDTOS: formatAttachment(imageList, "1"),
          };
          onFinish(values);
        }}
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
        </div>
        <Form.Item
          labelAlign="right"
          label={"设备图片"}
          name={"limsAttachmentSaveDTOS"}
          labelCol={{ span: 2 }}
        >
          <AttachmentList
            imageLabel="上传设备图片"
            showFile={false}
          ></AttachmentList>
        </Form.Item>
        {/* <div className="form-info">
          <div className="form-info">
            <div className="line"></div>
            部件明细
          </div>
        </div>
        <Form.Item
          name={"limsBasicdevicepartsSaveDTOS"}
          label="设备部件"
          labelCol={{ span: 2 }}
        ></Form.Item> */}

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
const mapStateToProps = (state) => {
  return {
    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
    attachmentList: state.currency.attachmentList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseDevice);
