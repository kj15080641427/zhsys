import React, { useState } from "react";
import { Card, Row, Col, Form, Button, Modal } from "antd";
import { columnsToFormFlow } from "../../utils/common";

export default (props) => {
  const { devicePart } = props;
  const [list, setList] = useState([]);
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setList([...list, 1]);
          setVisible(true);
        }}
      >
        添加部件
      </Button>
      {/* <Modal visible={visible} onCancel={()=>setVisible(false)}></Modal> */}
      {list.map((step, index) => {
        return (
          <Card key={index}>
            <Row>
              {columnsToFormFlow(devicePart).map((item) => {
                return (
                  <Col key={item.label} span={8}>
                    {/* <Form.Item
                      labelAlign="right"
                      label={item.label}
                      name={item.name}
                      rules={item.rules}
                      labelCol={{ span: 6 }}
                    > */}
                    {item.label}
                    {index}: {item.ele}
                    {/* </Form.Item> */}
                  </Col>
                );
              })}
            </Row>
            <Button
              onClick={() => {
                console.log(
                  list.filter((_, idx) => idx != index),
                  "===="
                );

                setList(list.filter((_, idx) => idx != index));
              }}
            >
              删除部件
            </Button>
          </Card>
        );
      })}
    </div>
  );
};
