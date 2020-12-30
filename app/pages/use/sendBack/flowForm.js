import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col, Upload, message, Select } from "antd";
import ChildTable from "./childTable";
import FormSelect from "../../../components/formItems/select";
import { addAttachment, getLimsUselendapply } from "../../../request/index";
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
    submitFlow, //提交审批回调
    records, //表单数据
    approvalRecords, //购置申请信息
    defaultFileList, //已上传文件列表
    totalPrice, //总金额
    // approvalClick0, //审批
    // approvalClick1, //审批
    // approvalClick2, //审批
    // taskInfo, //审批流程信息
    dictuselend, //借出信息
  } = props;
  useEffect(() => {
    let { file, image } = filterFileList(defaultFileList);
    setFileList(file);
    setImageList(image);
    return () => {
      setFileList([]);
      setImageList([]);
    };
  }, [defaultFileList]);

  const changeCode = (e) => {
    console.log(e);
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
    },
    {
      label: "借出类型",
      element: (
        <div>
          <Select defaultValue={"1"} disabled>
            <Select.Option value={"1"}>内部借出</Select.Option>
          </Select>
        </div>
      ),
    },
    {
      label: "借出时间",
      element: <div> {approvalRecords?.title}</div>,
    },
    {
      label: "借出人信息",
      element: <div> 姓名:a,证件号:a,单位:d</div>,
      col: 24,
      labelCol: 2,
    },
    // {
    //   label: "购货时间",
    //   element: <div> {approvalRecords.expectedDate}</div>,
    // },
  ];

  return (
    <Form name={name} onFinish={onFinish} ref={formRef} labelCol={{ span: 5 }}>
      <div className="form-info">
        <div className="line"></div>
        购置信息:
      </div>
      <Row>
        {info.map((item) => (
          <Col span={item.col || 8} className="form-item-box" key={item.label}>
            <Form.Item
              disabled={true}
              labelAlign="right"
              label={item.label}
              name={item.label}
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
        <div className="line"></div>购置清单:
      </div>
      <Row>
        {/* 列表 */}
        <Col span={24}>
          <Form.Item
            labelAlign="right"
            label={""}
            name={"limsUsereturnapplyitemDTOList"}
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
            name={"file"}
            rules={[{ require: false }]}
          >
            {console.log(fileList, "???")}
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
    dictuselend: state.currency.dictuselend,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowForm);
