import React from "react";
import { Button, Form, message } from "antd";
import DYTable from "@app/components/home/table";
import FlowForm from "./flowForm";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import "./style.scss";
import { connect } from "react-redux";
import moment from "moment";
import {
  getRepairById,
  approvalLimsUseLendapply,
} from "../../../request/index";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
import SearchInput from "../../../components/formItems/searchInput";

let storeLabel = "base";

class LendLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.formRef = React.createRef();
    this.rwoFormRef = React.createRef();
    this.state = {
      filterName: {},
      disabled: false, //表单防重复点击
      records: {},
      taskInfo: {}, //事件详情
    };
    this.breadcrumb = [
      {
        name: "首页",
      },
      {
        name: "维护管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "维修申请",
        click: () => this.props.actions.setShowForm(false),
        color: "#40A0EA",
      },
    ];
    this.editbreadcrumb = [
      {
        name: "首页",
      },
      {
        name: "维护管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "维修申请管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "维修申请",
        click: () => this.props.actions.setShowForm(false),
        color: "#40A0EA",
      },
    ];
  }
  componentWillUnmount() {
    this.props.actions.setShowForm(false);
  }
  componentDidMount() {
    this.props.actions.getBase({
      request: this.props.get,
      key: this.props.storeKey,
    });
  }

  render() {
    const {
      get,
      add,
      upd,
      del,
      keyId,
      storeKey,
      baseFormItem,
      listFormItem,
      columns,
      columnsProps = [],
      rowSelection,
      handleQuery,
      formatList = [],
      // stringList = [],
      showChild, //是否加载子表
      buttonText, //提交按钮文字
      showForm, //显示表单
      fileList,
      imageList,
      searchInput,
    } = this.props;

    storeLabel = storeKey;
    const {
      getBase,
      delBase,
      addOrUpdateBase,
      hideModal,
      setShowForm,
      getAttachmentById, //根据id获取附件
    } = this.props.actions;
    const { loading } = this.props;
    const getBaseHoc = (
      param = {
        current: 1,
        size: 10,
      }
    ) =>
      getBase({
        request: get,
        key: storeKey,
        param: param,
      });

    // 翻页
    const changePage = (current) => {
      getBaseHoc({
        current: current,
        size: 10,
        ...this.state.filterName,
      });
    };
    //
    const onShowSizeChange = (current, pageSize) => {
      getBaseHoc({
        current: current,
        size: pageSize,
        ...this.state.filterName,
      });
    };
    // 删除
    const confirm = (row) => {
      delBase({
        request: del,
        key: storeKey,
        query: get,
        param: {
          id: { [keyId]: row[keyId] },
          current: this.props[storeKey]?.current,
          size: this.props[storeKey]?.size,
          recordLength: this.props[storeKey].records?.length,
        },
      });
    };
    //格式化附件上传格式
    const formatAttachment = (data) => {
      return data.map((item) => ({
        businessId: this.state.records.id,
        businessType: "1",
        fileName: item.name,
        filePath: item?.response?.data || item.url,
        fileType: item.type,
        smallFilePath: item?.response?.data || item.url,
        title: item.name.split(".")[0],
      }));
    };
    // 修改
    const update = (row) => {
      getAttachmentById({
        businessId: row?.id,
        businessType: "1",
        current: 1,
        size: -1,
      });
      getRepairById({ id: row.id }).then((res) => {
        this.setState({
          taskInfo: res.data,
          records: row,
        });
        let lsit = res.data.limsRepairapplyitemDOList?.map((item) => ({
          ...item,
          ...item.limsRepairapply,
        }));

        row = {
          ...res.data.limsRepairapply,
          limsRepairapplyitemSaveDTOS: lsit,
        };
        formatList.map((item) => {
          row = { ...row, [item]: moment(row[item]) };
        });
        this.formRef.current.setFieldsValue(row);
        setShowForm(true);
      });
    };
    //提交审批
    const submitFlow = () => {
      let formData = this.formRef.current.getFieldValue();

      formatList.forEach((item) => {
        formData = {
          ...formData,
          [item]: moment(formData[item]).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      let totalFee = 0;

      let deviceList = formData.limsRepairapplyitemSaveDTOS.map((item) => {
        totalFee = totalFee + Number(item.planFee);
        return {
          deviceId: item.id, //设备ID
          complexFundId: "791606316736065536", //经费ID
          foundId: "791606316736065536", //经费ID
          foundFee: 11000, //经费余额
          // totalPrice: item.totalPrice, //x小计金额
          planTime: item.planTime, //使用天数
          planFee: item.planFee, //单价
        };
      });

      let submitValue = {
        ...formData,
        submitType: 1,
        limsRepairapplyitemSaveDTOS: deviceList,
        totalFee: totalFee,
        limsAttachmentSaveDTOS: formatAttachment([...fileList, ...imageList]),
      };

      addOrUpdateBase({
        request: formData[keyId] ? upd : add,
        key: storeKey,
        query: get,
        param: submitValue,
      });
    };
    // 保存
    const onFinish = (values) => {
      //格式化时间 YYYY-MM-DD HH:mm:ss
      formatList.forEach((item) => {
        values = {
          ...values,
          [item]: moment(values[item]).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      let totalvalue = 0;

      let deviceList = values.limsRepairapplyitemSaveDTOS.map((item) => {
        totalvalue = totalvalue + Number(item.planFee);
        return {
          deviceId: item.id, //设备ID
          complexFundId: "791606316736065536", //经费ID
          foundId: "791606316736065536", //经费ID
          foundFee: 11000, //经费余额
          // totalPrice: item.totalPrice, //x小计金额
          planTime: item.planTime, //使用天数
          planFee: item.planFee, //单价
          remark: item.remark,
        };
      });

      let submitValue = {
        ...values,
        submitType: 0,
        limsRepairapplyitemSaveDTOS: deviceList,
        totalFee: totalvalue,
        limsAttachmentSaveDTOS: formatAttachment([...fileList, ...imageList]),
      };

      addOrUpdateBase({
        request: values[keyId] ? upd : add,
        key: storeKey,
        query: get,
        param: submitValue,
      });
    };
    //审批
    const approvalClick = (e) => {
      let formData = this.formRef?.current?.getFieldValue();

      if (formData.msg) {
        approvalLimsUseLendapply({
          id: formData?.id,
          msg: formData?.msg,
          type: e,
        }).then(() => {
          getBase({
            request: get,
            key: storeKey,
            param: { current: 1, size: 10 },
          });
          setShowForm(false);
        });
      } else {
        message.error("请输入审批意见");
      }
    };
    const approvalClick0 = () => approvalClick(0);
    const approvalClick1 = () => approvalClick(1);
    const approvalClick2 = () => approvalClick(2);
    // 查询
    const rowFinish = (values) => {
      this.setState({
        filterName: values,
      });
      handleQuery
        ? handleQuery({ ...values, current: 1, size: 10 })
        : getBaseHoc({ current: 1, size: 10, ...values });
    };

    return (
      <>
        {
          <div hidden={showForm}>
            <div className="view-query">
              <div className="view-query-left">
                <RenderBreadcrumb
                  showForm={showForm}
                  breadcrumb={this.breadcrumb}
                  editbreadcrumb={this.editbreadcrumb}
                />
                <Button className="base-export-button">导出</Button>
              </div>
              <div className={"view-query-right"}>
                <Form layout="inline" ref={this.rwoFormRef}>
                  <Form.Item label={""} name={"code"}>
                    <SearchInput
                      placeholder="支持模糊查找归还单号"
                      searchClick={() =>
                        rowFinish({
                          code: searchInput,
                          // code: this.state.rowSelectData,
                        })
                      }
                    />
                  </Form.Item>
                </Form>
                <Button className="base-add-button">高级</Button>
                <Button
                  className="base-add-button"
                  onClick={() => {
                    this.setState({
                      records: {},
                    });
                    setShowForm(true);
                    this.formRef.current.resetFields();
                  }}
                >
                  添加
                </Button>
              </div>
            </div>
            <DYTable
              // records={this.state.records}
              rowSelection={rowSelection}
              columnsProps={columnsProps}
              columns={columns}
              loading={loading}
              total={this.props[storeKey]?.total}
              dataSource={this.props[storeKey]?.records}
              current={this.props[storeKey]?.current}
              size={this.props[storeKey]?.size}
              rowkey={(row) => row[keyId]}
              changePage={(cur) => changePage(cur)}
              onShowSizeChange={(cur, size) => {
                onShowSizeChange(cur, size);
              }}
              confirm={confirm}
              update={update}
            ></DYTable>
            {this.props.children}
          </div>
        }
        {
          <div hidden={!showForm}>
            <div className="view-query-left">
              {" "}
              <RenderBreadcrumb
                showForm={showForm}
                breadcrumb={this.breadcrumb}
                editbreadcrumb={this.editbreadcrumb}
              />
              {this.state.records.code && (
                <div className="purp-apply-code">
                  申请单号:{this.state.records.code}
                </div>
              )}
            </div>
            <div className="head-line"></div>
            <FlowForm
              formatList={formatList}
              defaultFileList={this.state.defaultFileList}
              taskInfo={this.state.taskInfo}
              approvalClick0={approvalClick0}
              approvalClick1={approvalClick1}
              approvalClick2={approvalClick2}
              records={this.state.records}
              submitFlow={submitFlow}
              buttonText={buttonText}
              showChild={showChild}
              showCancel
              cancelClick={() => {
                hideModal();
                setShowForm(false);
              }}
              id={keyId}
              formRef={this.formRef}
              name={storeKey}
              baseFormItem={baseFormItem}
              listFormItem={listFormItem}
              onFinish={onFinish}
            ></FlowForm>
          </div>
        }
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    [storeLabel]: state.currency[storeLabel],
    loading: state.currency.loading,
    visible: state.currency.visible,
    showForm: state.currency.showForm,
    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
    searchInput: state.formItems.searchInput, //搜索框值
    // dict: state.currency.dict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LendLayout);
