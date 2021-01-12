import React, { useEffect, useState } from "react";
import { Button, Form, Row, Col, Input } from "antd";
import ChildTable from "./childTable";
import {
  addAttachment,
  getRepairList, //查询维修管理
} from "../../../request/index";
import "./style.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";
import AttachmentList from "../../../components/formItems/attachment";
import moment from "moment";
import FormSelect from "../../../components/formItems/select";
import { columnsToFormFlow } from "../../../utils/common";

//工作流表单
const FlowForm = (props) => {
  const {
    onFinish, //提交按钮回调
    name, //表单dataindex
    formRef, //ref
    id, //数据唯一id
    cancelClick, //关闭按钮回调
    submitFlow, //提交审批回调
    records, //表单数据
    formatList,
    // defaultFileList, //已上传文件列表
    imageList,
    fileList,
    supplier, //供应商
    dictuseLend, //维修信息
  } = props;

  const [repairInfo, setRepairInfo] = useState({});

  const changeCode = (id) => {
    let a = dictuseLend?.records.filter((item) => item.id == id)[0];
    setRepairInfo(a);
    console.log(repairInfo);
  };

  useEffect(() => {
    changeCode(props?.records?.lendId);
  }, [props?.records]);

  const baseFormItem = columnsToFormFlow([
    {
      title: "申请单号",
      dataIndex: "applyCode",
      ele: (
        <FormSelect
          disabled={records?.status != "0" && records?.status}
          onChange={changeCode}
          request={getRepairList}
          storeKey="useLend"
          labelString="code"
          valueString="id"
        ></FormSelect>
      ),
      require: true,
    },
    {
      title: "维修技师",
      dataIndex: "repairUserName",
      require: true,
    },
    {
      title: "电话",
      dataIndex: "repairUserPhone",
      require: true,
    },
    {
      title: "申请内容",
      dataIndex: "",
      ele: (
        <div>
          {`姓名:${records.userRealName}, 申请时间:${moment(
            records?.applyDate
          ).format("YYYY-MM-DD")}, 描述:${records?.applyRemark}`}
          {records && (
            <a
            // onClick={() => {
            //   setShowDetail(true);
            // }}
            >
              查看申请资料
            </a>
          )}
        </div>
      ),
      col: 16,
      labelCol: 2,
    },
    {
      title: "维修内容",
      dataIndex: "remark",
      ele: <Input style={{ width: "100%" }} />,
      col: 16,
      labelCol: 2,
      require: true,
    },
  ]);

  const renderItem = (item) => {
    if (item.name == "supplierId") {
      let supp = supplier?.records?.filter((i) => {
        return i.id == records[item.name];
      });
      if (supp && supp[0]) {
        return supp[0].name;
      }
    }
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
        维修信息:
      </div>

      {/* 借出信息 */}
      <Row>
        {/* {info.map((item) => (
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
        ))} */}
        {/* 审核详情 */}
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
                {/* {newItem} */}
                {records?.status == "0" ? (
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
            name={"limsRepairitemUpdateDTOS"}
            require={true}
          >
            <ChildTable records={records}></ChildTable>
          </Form.Item>
        </Col>
      </Row>
      <div className="form-info">
        <div className="line"></div>
        维修资料:
      </div>
      <Row>
        <Col span={24}>
          <Form.Item
            labelAlign="right"
            label={""}
            name={"file"}
            rules={[{ require: false }]}
          >
            <AttachmentList
              records={records}
              disabled={records?.status == "1"}
            ></AttachmentList>
          </Form.Item>
        </Col>
      </Row>
      {/* 编辑时提交id */}
      <Form.Item name={id}></Form.Item>
      <Form.Item>
        <div className="flow-form-bottom">
          <>
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
                    // message.warning("附件上传失败");
                  } else {
                    // message.success("附件上传成功");
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
    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
    supplier: state.currency.supplier,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowForm);
