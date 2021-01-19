import React from "react";
import { Button, Form, Row, Col, Input } from "antd";
import "./index.scss";
import moment from "moment";
import ChildTable from "./childTable";

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
    formatList,
  } = props;
  const renderItem = (item) => {
    if (formatList.indexOf(item.name) !== -1) {
      return moment(records[item.name]).format("YYYY-MM-DD");
    } else {
      return records[item.labelName || item.name];
    }
  };
  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
      <div className="form-info">
        <div className="line"></div>
        出库信息:
      </div>
      <Row>
        {/* 渲染基础表单 */}
        {baseFormItem.map((item, index) => {
          return (
            <Col key={index} className="form-item-box" span={item.col || 8}>
              <Form.Item
                disabled={true}
                labelAlign="right"
                label={item.label}
                name={item.name}
                rules={
                  records?.status == "0" || !records?.status ? item.rules : []
                }
                width={"200px"}
                style={item.style}
                labelCol={{ span: item.labelCol || 8 }}
              >
                {records?.status == "0" || !records?.status ? (
                  item.ele
                ) : (
                  <div>{renderItem(item)}</div>
                )}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <div className="card-line"></div>
      <div className="form-info">
        <div className="line"></div>出库清单:
      </div>
      <Row>
        {/* 列表 */}
        <Col span={24}>
          <Form.Item
            labelAlign="right"
            label={""}
            name={"limsDepositinstockitemDOList"}
            rules={[{ required: true, message: "请输入购置清单" }]}
          >
            <ChildTable records={records} />
          </Form.Item>
        </Col>
      </Row>

      {/* 审批意见 */}
      {records?.status == "1" ? (
        <Col span={24}>
          <Form.Item
            name={"msg"}
            label="审批意见:"
            labelCol={{ span: 2 }}
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        </Col>
      ) : (
        ""
      )}
      {/* 编辑时提交id */}
      <Form.Item name={id}></Form.Item>
      <Form.Item>
        <div className="flow-form-bottom">
          {records?.status !== "1" &&
          records?.status !== "0" &&
          records?.status ? (
            <Button className="flow-form-calcel" onClick={cancelClick}>
              关闭
            </Button>
          ) : records?.status == "0" || !records?.status ? (
            <>
              <Button htmlType="submit" className="flow-form-submit">
                {buttonText}
              </Button>
              <Button className="flow-form-flow" onClick={submitFlow}>
                提交审批
              </Button>
              {/* </Popconfirm> */}
              <Button className="flow-form-calcel" onClick={cancelClick}>
                关闭
              </Button>
            </>
          ) : (
              <Button className="flow-form-calcel" onClick={cancelClick}>
                关闭
              </Button>
          )}
        </div>
      </Form.Item>
    </Form>
  );
};
export default FlowForm;
