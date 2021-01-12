import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Upload, message, Timeline, Input } from "antd";
import ChildTable from "./childTable";
import "./style.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import { filterFileList } from "../../../utils/common";
import AttachmentList from "../../../components/formItems/attachment";
import { approvaRepair, getRepair } from "../../../request";
import moment from "moment";

//工作流表单
const FlowForm = (props) => {
  // const [imageList, setImageList] = useState([]);
  // const [fileList, setFileList] = useState([]);
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
    defaultFileList, //已上传文件列表
    totalPrice, //总金额
    approvalClick0, //审批
    approvalClick1, //审批
    approvalClick2, //审批
    formatList,
    taskInfo, //审批流程信息
  } = props;
  const { setTotalPrice, approvalFlow, getBase, setShowForm } = props.actions;

  useEffect(() => {
    let price = 0;
    formRef?.current
      ?.getFieldValue()
      .limsRepairmaintainapplyitemSaveDTOS?.map((item) => {
        price = price + item.planFee;
      });
    setTotalPrice(price);
  }, [formRef?.current?.getFieldValue().limsRepairmaintainapplyitemSaveDTOS]);

  const renderItem = (item) => {
    if (formatList.indexOf(item.name) !== -1) {
      return moment(records[item.name]).format("YYYY-MM-DD");
    } else {
      return records[item.labelName || item.name];
    }
  };

  const approval = (type) => {
    approvalFlow({
      req: approvaRepair,
      param: {
        id: records.id,
        msg: formRef.current.getFieldValue().msg,
        type: type,
      },
      msg: "操作成功",
    });
    setShowForm(false);
    getBase({
      request: getRepair,
      key: "repairApply",
      param: {
        current: 1,
        size: 10,
      },
    });
  };

  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
      <div className="form-info">
        <div className="line"></div>
        维修申请:
      </div>

      {/* 渲染基础表单 */}
      <Row>
        {baseFormItem.map((item, index) => {
          return (
            <Col key={index} className="form-item-box" span={item.col || 8}>
              <Form.Item
                disabled={true}
                labelAlign="right"
                label={item.label}
                name={item.name}
                rules={[{ required: item.require }]}
                width={"200px"}
                style={item.style}
                labelCol={{ span: item.labelCol || 4 }}
              >
                {/* {item.ele} */}
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
        <div className="line"></div>维修清单:
      </div>
      <Row>
        {/* 列表 */}
        <Col span={24}>
          <Form.Item
            labelAlign="right"
            label={""}
            name={"limsRepairmaintainapplyitemSaveDTOS"}
          >
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
            name={"limsAttachmentSaveDTOS"}
            rules={[{ require: false }]}
          >
            <AttachmentList
              disabled={records?.status && records?.status != "0"}
            ></AttachmentList>
          </Form.Item>
        </Col>
      </Row>
      {/* 编辑时提交id */}
      <Form.Item name={id}></Form.Item>

      {records?.status && (
        <Timeline>
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
                    {item.fullMessage && `审批意见:${item.fullMessage}`}
                  </div>
                  <div>审核时间:{item.time}</div>
                </div>
              </Timeline.Item>
            );
          })}
        </Timeline>
      )}
      {/* 审批意见 */}
      {records?.status == "1" ? (
        <Col span={24}>
          <Form.Item
            name={"msg"}
            label="审批意见"
            labelCol={{ span: 2 }}
            rules={[{ required: true }]}
          >
            <Input></Input>
          </Form.Item>
        </Col>
      ) : (
        ""
      )}

      <Form.Item>
        <div className="flow-form-bottom">
          <div>
            合计金额:
            <span style={{ color: "red" }}>{totalPrice}</span>元
          </div>
          {records?.status !== "1" &&
          records?.status !== "0" &&
          records?.status ? (
            <Button className="flow-form-calcel" onClick={cancelClick}>
              关闭
            </Button>
          ) : records?.status == "0" || !records?.status ? (
            <>
              <Button
                htmlType="submit"
                className="flow-form-submit"
                // onClick={uploadFile}
              >
                保存
              </Button>
              <Button
                className="flow-form-flow"
                onClick={() => {
                  submitFlow();
                  // uploadFile();
                }}
                // onClick={uploadFile}
              >
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
                className="flow-form-calcel"
                value="0"
                onClick={() => approval(0)}
              >
                审批
              </Button>
              <Button
                className="flow-form-calcel"
                value="1"
                onClick={() => approval(1)}
              >
                驳回
              </Button>
              <Button
                className="flow-form-calcel"
                value="2"
                onClick={() => approval(2)}
              >
                拒绝
              </Button>
              <Button className="flow-form-calcel" onClick={() => {}}>
                打印
              </Button>
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
const mapStateToProps = (state) => {
  return {
    totalPrice: state.currency.totalPrice,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowForm);
