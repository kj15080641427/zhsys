import React from "react";
import { Button, Form, Popconfirm, Row, Col } from "antd";

const DYForm = (props) => {
  const {
    onFinish,
    formItem = [],
    name,
    formRef,
    id,
    showCancel = false,
    cancelClick,
    showDelete = false,
    deleteClick,
    disabled = false,
    buttonText = "提交",
  } = props;

  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
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
      {/* {showChild && <ChildTable></ChildTable>} */}
      <Form.Item>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button type="primary" htmlType="submit" disabled={disabled}>
            {buttonText}
          </Button>
          {showDelete ? (
            <Popconfirm
              title="事件相关调度信息也将删除,是否确认删除?"
              onConfirm={deleteClick}
            >
              <Button style={{ marginLeft: "50px" }}>删除事件</Button>
            </Popconfirm>
          ) : (
            ""
          )}
          {showCancel ? (
            <Button style={{ marginLeft: "50px" }} onClick={cancelClick}>
              关闭
            </Button>
          ) : (
            ""
          )}
        </div>
      </Form.Item>
    </Form>
  );
};
export default DYForm;
