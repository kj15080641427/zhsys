import React from "react";
import { Button, Form, Row, Col } from "antd";
const BaseForm = (props) => {
  const {
    id, //编辑提交时的id
    formRef, //表单ref
    formItem = [], //表单项
    onFinish, //提交表单的回调事件
    cancelClick, //关闭表单的回调事件
    submitText = "提交", //提交表单按钮文字
    closeText = "关闭", //关闭表单按钮文字
  } = props;
  return (
    <>
      <Form onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
        <Row>
          {formItem.map((item, index) => (
            <Col key={index} span={item.col || 24}>
              <Form.Item
                labelAlign="right"
                label={item.label}
                name={item.name}
                rules={item.rules}
                width={item.width}
                style={item.style}
              >
                {item.ele}
              </Form.Item>
            </Col>
          ))}
        </Row>

        <Form.Item name={id}></Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button type="primary" htmlType="submit">
              {submitText}
            </Button>
            {cancelClick && (
              <Button className="base-form-close" onClick={cancelClick}>
                {closeText}
              </Button>
            )}
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
export default BaseForm;
