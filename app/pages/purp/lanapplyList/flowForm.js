import React from "react";
import { Button, Form, Row, Col, Upload } from "antd";
import ChildTable from "./childTable";
import "./style.scss";

//工作流表单
const FlowForm = (props) => {
  const {
    onFinish, //提交按钮回调
    baseFormItem = [], //基础信息
    name, //表单dataindex
    formRef, //ref
    id, //数据唯一id
    cancelClick, //关闭按钮回调
    buttonText = "保存", //submit按钮文字
    submitFlow, //提交审批回调
    records, //表单数据
    // approvalClick0, //审批
    // approvalClick1, //审批
    // approvalClick2, //审批
    // taskInfo, //审批流程信息
  } = props;

  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
      <div className="form-info">
        <div className="line"></div>
        购置信息:
      </div>
      <Row>
        {/* 渲染基础表单 */}
        {baseFormItem.map((item, index) => {
          // const newElement = React.cloneElement(item.ele, {
          //   disabled: records?.status == "0" || !records?.status ? false : true,
          // });
          return (
            <Col key={index} className="form-item-box" span={item.col || 8}>
              <Form.Item
                disabled={true}
                labelAlign="right"
                label={item.label}
                name={item.name}
                rules={item.rules}
                width={"200px"}
                style={item.style}
                labelCol={{ span: item.labelCol || 4 }}
              >
                {item.ele}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <div className="card-line"></div>
      <div className="form-info">
        <div className="line"></div>购置清单:
      </div>
      <Row>
        {/* 列表 */}
        <Col span={24}>
          <Form.Item labelAlign="right" label={""} name={"limsBasicdevice"}>
            <ChildTable records={records}></ChildTable>
          </Form.Item>
        </Col>
      </Row>
      <div className="form-info">
        <div className="line"></div>
        附件相关:
      </div>
      <Row>
        <Col span={24}>
          <Form.Item
            labelAlign="right"
            label={""}
            name={"name"}
            rules={[{ require: false }]}
          >
            <div className="purplist-upload-box">
              <div className="purplist-upload-left">
                <Upload
                  accept=".word,.xlsx,.docx,.pdf"
                  action="http://47.115.10.75:9011/swagger-ui.html"
                  multiple
                >
                  <div className="purplist-flex">
                    <Button className="pruplist-upload-excel">
                      上传购置资料
                    </Button>
                    <div>.word .xlsx .docx .pdf</div>
                  </div>
                </Upload>
              </div>
              <div className="purplist-upload-right">
                <Upload
                  accept=".jpg,.png"
                  action="http://47.115.10.75:9011/swagger-ui.html"
                  multiple
                  listType="picture"
                >
                  <div className="purplist-flex">
                    <Button className="purplist-upload-image">
                      上传购置凭证
                    </Button>
                    <div> .jpg .png</div>
                  </div>
                </Upload>
              </div>
            </div>
          </Form.Item>
        </Col>
      </Row>
      {/* 编辑时提交id */}
      <Form.Item name={id}></Form.Item>
      <Form.Item>
        <div className="flow-form-bottom">
          <>
            <Button htmlType="submit" className="flow-form-submit">
              {buttonText}
            </Button>
            <Button className="flow-form-flow" onClick={submitFlow}>
              到货验收
            </Button>
            <Button className="flow-form-calcel" onClick={cancelClick}>
              关闭
            </Button>
          </>
        </div>
      </Form.Item>
    </Form>
  );
};
export default FlowForm;
