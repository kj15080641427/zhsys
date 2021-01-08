import React from "react";
import { Button, Form, Row, Col, Input } from "antd";
import "./style.scss";
import moment from "moment";
import ChildTable from "./childTable";
import Flow from "../../../components/formItems/flow";

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
    approvalClick0, //审批
    approvalClick1, //审批
    approvalClick2, //审批
    taskInfo, //审批流程信息
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
        购置信息:
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
        <div className="line"></div>购置清单:
      </div>
      <Row>
        {/* 列表 */}
        <Col span={24}>
          <Form.Item
            labelAlign="right"
            label={""}
            name={"limsBasicdeviceDTOList"}
            rules={[{ required: true, message: "请输入购置清单" }]}
          >
            <ChildTable records={records} />
          </Form.Item>
        </Col>
      </Row>

      {records?.status && records?.status != 0 ? (
        <>
          {/* 审批流程 */}
          <div className="form-info">
            <div className="line"></div>
            购置审批流程:
          </div>
          <br />
          <Flow taskInfo={taskInfo}></Flow>
          {/* <Timeline>
            {taskInfo?.activitiDOList?.map((item) => {
              return (
                <Timeline.Item key={item.activityId} dot={""}>
                  {item.activityName == "StartEvent"
                    ? "开始"
                    : item.activityName == "EndEvent"
                    ? "结束"
                    : item.activityName}
                  <div className="flow-timeline">
                    <div>
                      {item.realName && (
                        <div>
                          {item.activityName}:{item.realName}
                        </div>
                      )}
                      <div>
                        {item.fullMessage && `审批意见:${item.fullMessage}`}
                      </div>
                    </div>
                    <div className="flow-timeline-date">
                      {item.activityName == "EndEvent"
                        ? "结束时间"
                        : item.activityName == "StartEvent"
                        ? "开始时间"
                        : "审核时间"}
                      :{item.time}
                    </div>
                  </div>
                </Timeline.Item>
              );
            })}
          </Timeline> */}
        </>
      ) : (
        ""
      )}
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
            <div>
              <Button
                className="flow-form-calcel1"
                value="0"
                onClick={approvalClick0}
              >
                审批
              </Button>
              <Button
                className="flow-form-calcel2"
                value="1"
                onClick={approvalClick1}
              >
                驳回
              </Button>
              <Button
                className="flow-form-calcel3"
                value="2"
                onClick={approvalClick2}
              >
                拒绝
              </Button>
              <Button className="flow-form-calcel">打印</Button>
              <Button className="flow-form-calcel" onClick={cancelClick}>
                关闭
              </Button>
            </div>
          )}
        </div>
      </Form.Item>
    </Form>
  );
};
export default FlowForm;
