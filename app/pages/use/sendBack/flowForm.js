import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Timeline, Input, Modal } from "antd";
import ChildTable from "./childTable";
import FormSelect from "../../../components/formItems/select";
import {
  getLimsUselendapply,
  getLimsUselendById,
  approvaReturn,
} from "../../../request/index";
import "./style.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";

//工作流表单
const FlowForm = (props) => {
  const [lendInfo, setLendInfo] = useState(null); //借出信息
  const [showDetail, setShowDetail] = useState(false); //查看借出资料

  const {
    onFinish, //提交按钮回调
    baseFormItem = [], //基础信息
    name, //表单dataindex
    formRef, //ref
    id, //数据唯一id
    cancelClick, //关闭按钮回调
    submitFlow, //提交审批回调
    records, //表单数据
    dictuseLend, //借出信息
    sendBacklendDetail,
  } = props;
  const { getBase, approvalFlow } = props.actions;

  const changeCode = (id) => {
    let a = dictuseLend?.records.filter((item) => item.id == id)[0];
    setLendInfo(a);
  };

  useEffect(() => {
    changeCode(props?.records?.lendId);
  }, [props?.records]);

  useEffect(() => {
    lendInfo &&
      getBase({
        request: getLimsUselendById,
        key: "sendBacklendDetail",
        param: {
          id: lendInfo.id,
        },
      });
  }, [lendInfo]);

  const type = {
    1: "内部借出",
  };
  const info = [
    {
      label: "借出单号",
      element: (
        <FormSelect
          onChange={changeCode}
          request={getLimsUselendapply}
          storeKey="useLend"
          labelString="code"
          valueString="id"
        ></FormSelect>
      ),
      name: "lendId",
    },
    {
      label: "借出类型",
      element: <div>{type[lendInfo?.lendType]}</div>,
    },
    {
      label: "借出时间",
      element: <div> {lendInfo?.lendDate}</div>,
    },
    {
      label: "借出人信息",
      element: (
        <div>
          {lendInfo &&
            `姓名:${lendInfo.realName}, 证件号:${lendInfo?.cardNo}, 单位:${lendInfo?.lendCompanyName}   `}
          {lendInfo && (
            <a
              onClick={() => {
                setShowDetail(true);
              }}
            >
              查看借出提供资料
            </a>
          )}
        </div>
      ),
      col: 24,
      labelCol: 2,
    },
  ];

  return (
    <>
      <Modal visible={showDetail} onCancel={() => setShowDetail(false)}>
        {console.log(lendInfo)}
        <Row>
          <Col span={12}>借出人：{lendInfo?.realName}</Col>
          <Col span={12}>单位：{lendInfo?.lendCompanyName}</Col>
        </Row>
        <Row>
          <Col span={12}>借出人证件号：{lendInfo?.cardNo}</Col>
          <Col span={12}>联系方式{lendInfo?.phone}</Col>
        </Row>
        <Row>
          <Col span={12}>借出日期：{lendInfo?.lendDate}</Col>
          <Col span={12}>总金额：{lendInfo?.totalFee}</Col>
        </Row>
      </Modal>
      <Form
        name={name}
        onFinish={onFinish}
        ref={formRef}
        labelCol={{ span: 5 }}
      >
        <div className="form-info">
          <div className="line"></div>
          归还信息:
        </div>
        <Row>
          {/* 借出信息 */}
          {info.map((item) => (
            <Col
              span={item.col || 8}
              className="form-item-box"
              key={item.label}
            >
              <Form.Item
                disabled={true}
                labelAlign="right"
                label={item.label}
                name={item.name}
                width={"200px"}
                labelCol={{ span: item.labelCol || 6 }}
              >
                {item.element}
              </Form.Item>
            </Col>
          ))}
          {/* 渲染基础表单 */}
          {baseFormItem.map((item, index) => {
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
                  labelCol={{ span: item.labelCol || 6 }}
                >
                  {item.ele}
                </Form.Item>
              </Col>
            );
          })}
        </Row>
        <div className="card-line"></div>
        <div className="form-info">
          <div className="line"></div>归还清单:
        </div>
        <Row>
          {/* 列表 */}
          <Col span={24}>
            <Form.Item
              labelAlign="right"
              label={""}
              name={"limsUsereturnapplyitemDTOList"}
            >
              <ChildTable
                records={records}
                deviceList={sendBacklendDetail?.limsUselendapplyitemList}
              ></ChildTable>
            </Form.Item>
          </Col>
        </Row>
        {/* 编辑时提交id */}
        <Form.Item name={id}></Form.Item>

        {records?.status && (
          <Timeline>
            {records.taskInfo?.map((item) => {
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
                  onClick={() => {
                    approvalFlow({
                      req: approvaReturn,
                      param: {
                        id: records.id,
                        msg: formRef.current.getFieldValue().msg,
                        type: 0,
                      },
                      msg: "审批成功",
                    });
                  }}
                >
                  审批
                </Button>
                <Button
                  className="flow-form-calcel"
                  onClick={() => {
                    approvalFlow({
                      req: approvaReturn,
                      param: {
                        id: records.id,
                        msg: formRef.current.getFieldValue().msg,
                        type: 1,
                      },
                      msg: "审批成功",
                    });
                  }}
                  // onClick={approvalClick1}
                >
                  驳回
                </Button>
                <Button
                  className="flow-form-calcel"
                  onClick={() => {
                    approvalFlow({
                      req: approvaReturn,
                      param: {
                        id: records.id,
                        msg: formRef.current.getFieldValue().msg,
                        type: 2,
                      },
                      msg: "审批成功",
                    });
                  }}
                  // onClick={approvalClick2}
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

        {/* <div className="flow-form-bottom">
          <Button htmlType="submit" className="flow-form-submit">
            保存
          </Button>
          <Button className="flow-form-flow" onClick={submitFlow}>
            提交审批
          </Button>
          <Button className="flow-form-calcel" onClick={cancelClick}>
            关闭
          </Button>
        </div> */}
      </Form>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    totalPrice: state.currency.totalPrice,
    dictuseLend: state.currency.dictuseLend,
    sendBacklendDetail: state.currency.sendBacklendDetail,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowForm);
