import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Upload, message, Timeline, Input } from "antd";
import ChildTable from "./childTable";
// import FormSelect from "../../../components/formItems/select";
import { addAttachment } from "../../../request/index";
import "./style.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import { filterFileList } from "../../../utils/common";

//工作流表单
const FlowForm = (props) => {
  const [imageList, setImageList] = useState([]);
  const [fileList, setFileList] = useState([]);
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
    taskInfo, //审批流程信息
  } = props;
  const { setTotalPrice } = props.actions;

  const uploadFile = () => {
    let allList = [...fileList, ...imageList];
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
  };

  useEffect(() => {
    let price = 0;
    formRef?.current?.getFieldValue().limsUselendapplyitemList?.map((item) => {
      price = price + item.price;
    });
    setTotalPrice(price);
  }, [formRef?.current?.getFieldValue().limsUselendapplyitemList]);
  useEffect(() => {
    let { file, image } = filterFileList(defaultFileList);
    setFileList(file);
    setImageList(image);
    return () => {
      setFileList([]);
      setImageList([]);
    };
  }, [defaultFileList]);
  // const setDevice = (e) => {
  //   setTotalPrice(e);
  // };
  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
      <div className="form-info">
        <div className="line"></div>
        借出信息:
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
                {item.ele}
              </Form.Item>
            </Col>
          );
        })}
      </Row>
      <div className="card-line"></div>
      <div className="form-info">
        <div className="line"></div>借出清单:
      </div>
      <Row>
        {/* 列表 */}
        <Col span={24}>
          <Form.Item labelAlign="right" label={""} name={"deviceIdList"}>
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
            name={"file"}
            rules={[{ require: false }]}
          >
            <div className="purplist-upload-box">
              <div className="purplist-upload-left">
                <Upload
                  accept=".word,.xlsx,.docx,.pdf"
                  action="http://47.115.10.75:9011/api/file/all/upload"
                  multiple
                  fileList={fileList}
                  onRemove={(file) => {
                    setFileList(fileList.filter((v) => v.url !== file.url));
                  }}
                  onChange={(fileInfo) => {
                    setFileList(fileInfo.fileList);
                  }}
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
                  action="http://47.115.10.75:9011/api/file/all/upload"
                  multiple
                  listType="picture"
                  fileList={imageList}
                  onRemove={(file) => {
                    setImageList(imageList.filter((v) => v.url !== file.url));
                  }}
                  onChange={(fileInfo) => {
                    setImageList(fileInfo.fileList);
                  }}
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
          {/* <Button
            onClick={() => console.log(formRef.current.getFieldValue(), "VVV")}
          >
            上传测试
          </Button> */}
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
                onClick={uploadFile}
              >
                保存
              </Button>
              <Button
                className="flow-form-flow"
                onClick={() => {
                  submitFlow();
                  uploadFile();
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
                onClick={approvalClick0}
              >
                审批
              </Button>
              <Button
                className="flow-form-calcel"
                value="1"
                onClick={approvalClick1}
              >
                驳回
              </Button>
              <Button
                className="flow-form-calcel"
                value="2"
                onClick={approvalClick2}
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
