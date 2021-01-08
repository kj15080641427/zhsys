import React, { useEffect } from "react";
import { Button, Form, Row, Col, message } from "antd";
import ChildTable from "./childTable";
import FormSelect from "../../../components/formItems/select";
import { getUser, getUserCompany, addAttachment } from "../../../request/index";
import "./style.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import moment from "moment";
import AttachmentList from "../../../components/formItems/attachment";

//工作流表单
const FlowForm = (props) => {
  const {
    onFinish, //提交按钮回调
    baseFormItem = [], //基础信息
    name, //表单dataindex
    formRef, //ref
    id, //数据唯一id
    cancelClick, //关闭按钮回调
    submitFlow, //提交审批回调
    records, //表单数据
    approvalRecords, //购置申请信息
    // defaultFileList, //已上传文件列表
    totalPrice, //总金额
    formatList,
    imageList,
    fileList,
  } = props;
  const { setTotalPrice } = props.actions;
  useEffect(() => {
    let price = 0;
    formRef?.current?.getFieldValue().limsBasicdevice?.map((item) => {
      price = price + item.price;
    });
    setTotalPrice(price);
  }, [formRef?.current?.getFieldValue().limsBasicdevice]);
  const info = [
    {
      label: "申请单号",
      element: <div>{approvalRecords.code}</div>,
    },
    {
      label: "申请人",
      element: (
        <div>
          <FormSelect
            disabled
            value={approvalRecords.applyUser}
            request={getUser}
            storeKey="user"
            labelString="roleName"
            valueString="id"
          ></FormSelect>
        </div>
      ),
    },
    {
      label: "申请单位",
      element: (
        <div>
          <FormSelect
            disabled
            value={approvalRecords.applyCompany}
            request={getUserCompany}
            storeKey="userCompany"
            labelString="name"
            valueString="id"
          ></FormSelect>
        </div>
      ),
    },
    {
      label: "申请标题",
      element: <div> {approvalRecords.title}</div>,
    },
    {
      label: "申请时间",
      element: <div> {approvalRecords.applyDate}</div>,
    },
    {
      label: "购货时间",
      element: <div> {approvalRecords.expectedDate}</div>,
    },
  ];
  const setDevice = (e) => {
    setTotalPrice(e);
  };
  // const renderItem = (item) => {
  //   if (formatList.indexOf(item.name) !== -1) {
  //     return moment(records[item.name]).format("YYYY-MM-DD");
  //   } else {
  //     return records[item.labelName || item.name];
  //   }
  // };
  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
      <div className="form-info">
        <div className="line"></div>
        购置信息:
      </div>

      {/* 渲染基础表单 */}
      <Row>
        {info.map((item) => (
          <Col span={8} className="form-item-box" key={item.label}>
            <Form.Item
              disabled={true}
              labelAlign="right"
              label={item.label}
              name={item.label}
              // rules={[{ required: true }]}
              width={"200px"}
              labelCol={{ span: 4 }}
            >
              {item.element}
            </Form.Item>
          </Col>
        ))}

        {baseFormItem.map((item, index) => {
          const newItem = React.cloneElement(item.ele, {
            disabled: records?.status != "1",
          });
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
                {newItem}
                {/* {records?.status == "1" ? (
                  item.ele
                ) : (
                  <div>{renderItem(item)}</div>
                )} */}
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
            <ChildTable records={records} setDevice={setDevice}></ChildTable>
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
            name={"file"}
            rules={[{ require: false }]}
          >
            <AttachmentList records={records}></AttachmentList>
          </Form.Item>
        </Col>
      </Row>
      {/* 编辑时提交id */}
      <Form.Item name={id}></Form.Item>
      <Form.Item>
        <div className="flow-form-bottom">
          <>
            <div>
              合计金额:
              <span style={{ color: "red" }}>{totalPrice}</span>元
            </div>
            <Button
              htmlType="submit"
              className="flow-form-submit"
              onClick={() => {
                let allList = [...fileList, ...imageList];
                console.log(allList, "allList");

                let list = allList.map((item) => ({
                  businessId: records.id,
                  businessType: "1",
                  fileName: item.name,
                  filePath: item?.response?.data || item.url,
                  fileType: item.type,
                  smallFilePath: item?.response?.data || item.url,
                  title: item.name.split(".")[0],
                }));
                addAttachment(list).then((res) => {
                  if (res.code != 200) {
                    message.warning("附件上传失败");
                  } else {
                    message.success("附件上传成功");
                  }
                });
              }}
            >
              保存
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
const mapStateToProps = (state) => {
  return {
    totalPrice: state.currency.totalPrice,
    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowForm);
