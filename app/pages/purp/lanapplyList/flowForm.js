import React, { useEffect } from "react";
import { Button, Form, Row, Col, message } from "antd";
import ChildTable from "./childTable";
import {
  addAttachment,
  getLimsSupplier,
  // getLimsUselanapplyById,
  getLimsUselanapply,
} from "../../../request/index";
import "./style.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import * as formActions from "../../../redux/actions/aFormItems";
import { connect } from "react-redux";
import AttachmentList from "../../../components/formItems/attachment";
import moment from "moment";
// import FormSelect from "../../../components/formItems/select";
import ModalSelect from "../../../components/formItems/modalSelect";

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
    formatList,
    // defaultFileList, //已上传文件列表
    totalPrice, //总金额
    imageList,
    fileList,
    supplier, //供应商
    // dictpurp,
    purpList,
    modelPurp,
    modelRecords,
  } = props;
  const { setTotalPrice, getBase } = props.actions;
  const { getPurpList, setPurpList } = props.formActions;

  useEffect(() => {
    //计算金额
    let price = 0;
    purpList.map((item) => {
      price = price + item.price;
    });
    setTotalPrice(price);
  }, [purpList]);

  useEffect(() => {
    records?.status != "1" &&
      getBase({
        request: getLimsSupplier,
        key: "supplier",
        param: {
          size: -1,
          current: 1,
        },
      });
  }, []);

  const info = [
    {
      label: "申请单号",
      name: "applyId",
      require: true,
      element: (
        <ModalSelect
          buttonText="选择购置申请"
          columns={[
            {
              title: "申请单号",
              dataIndex: "code",
            },
            {
              title: "申请时间",
              dataIndex: "applyDate",
              render: (e) => e && e.slice(0, -9),
            },
            {
              title: "申请人",
              dataIndex: "userRealName",
            },
            {
              title: "申请单位",
              dataIndex: "compayName",
            },
            {
              title: "申请标题",
              dataIndex: "title",
              width: "250px",
            },
            {
              title: "申购类型",
              dataIndex: "dictName",
            },
            {
              title: "购置情况",
              dataIndex: "purId",
              render: (e) => (e ? "已购置" : "待购置"),
            },
          ]}
          req={getLimsUselanapply}
          storeKey="modelPurp"
          dataSource={modelPurp?.records}
          list={modelPurp?.records?.filter((item) => !!item.purId)}
          dislist={modelPurp?.records?.filter((item) => !item.purId)}
          // disabledList={modelPurp?.records.filter((item) => !!item.purId)}
          code="code"
          param={{ size: -1, current: 1, status: "4" }}
          getActions={getPurpList}
          setActions={setPurpList}
        ></ModalSelect>
        // <Button onClick={() => setVisible(true)}>选择购置申请</Button>
        // <FormSelect
        //   // disabled={records?.status != "0" && records?.status}
        //   onChange={changeCode}
        //   request={getLimsUselanapply}
        //   storeKey="purp"
        //   labelString="code"
        //   valueString="id"
        // ></FormSelect>
      ),
    },
    // {
    //   label: "申请单号",
    //   element: <div>{modelRecords?.applyCode}</div>,
    // },
    {
      label: "申请人",
      element: <div>{modelRecords?.userRealName}</div>,
    },
    {
      label: "申请单位",
      element: <div>{modelRecords?.compayName}</div>,
    },
    {
      label: "申请标题",
      element: <div> {modelRecords?.title}</div>,
    },
    {
      label: "申请时间",
      element: <div> {modelRecords?.applyDate}</div>,
    },
    {
      label: "购货时间",
      element: <div> {modelRecords?.expectedDate}</div>,
    },
  ];
  // const setDevice = (e) => {
  //   setTotalPrice(e);
  // };
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
    <>
      <Form
        name={name}
        onFinish={onFinish}
        ref={formRef}
        labelCol={{ span: 5 }}
      >
        <div className="form-info">
          <div className="line"></div>
          购置信息:
        </div>

        {/* 借出信息 */}
        <Row style={{ marginRight: "50px" }}>
          {info.map((item) => (
            <Col span={8} className="form-item-box" key={item.label}>
              <Form.Item
                disabled={true}
                labelAlign="right"
                label={item.label}
                name={item.name}
                rules={[{ required: item.require }]}
                width={"200px"}
                labelCol={{ span: 4 }}
              >
                {item.element}
              </Form.Item>
            </Col>
          ))}
          {/* 审核详情 */}
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
                  labelCol={{ span: item.labelCol || 4 }}
                >
                  {/* {newItem} */}
                  {records?.status == "1" ||
                  records?.status == "0" ||
                  !records?.status ? (
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
              name={"limsPurplanapplyitemDOList"}
              // rules={[{ required: true }]}
            >
              <ChildTable
                records={modelRecords}
                data={purpList}
                //  setDevice={setDevice}
              ></ChildTable>
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
              <AttachmentList
                records={records}
                disabled={
                  (records?.status != "1" && records?.status != "0") ||
                  !records?.status
                }
              ></AttachmentList>
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
                    // if (res.code != 200) {
                    //   message.warning("附件上传失败");
                    // } else {
                    //   message.success("附件上传成功");
                    // }
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
    </>
  );
};
const mapStateToProps = (state) => {
  // console.log(state.formItems.purpList, "OOOOOooo");
  return {
    totalPrice: state.currency.totalPrice,
    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
    supplier: state.currency.supplier,
    dictpurp: state.currency.dictpurp,
    purpList: state.formItems.purpList,
    modelPurp: state.formItems.modelPurp,
    modelRecords: state.formItems.modelRecords,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  formActions: bindActionCreators(formActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FlowForm);
