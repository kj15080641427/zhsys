import React from "react";
import { Button, Form } from "antd";
import DYTable from "@app/components/home/table";
import FlowForm from "./flowForm";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import "./style.scss";
import { connect } from "react-redux";
import moment from "moment";
import { getRepairItem, exportRepairList } from "../../../request/index";
import SearchInput from "../../../components/formItems/searchInput";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
import { formatAttachment } from "../../../utils/format";
import DownLoad from "../../../components/formItems/downLoad";

let storeLabel = "base";
class BaseNewPageLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.formRef = React.createRef();
    this.rwoFormRef = React.createRef();
    this.state = {
      filterName: {},
      disabled: false, //表单防重复点击
      records: {},

      // approvalRecords: {}, //购置申请信息
      defaultFileList: [], //已上传文件列表
    };
    this.breadcrumb = [
      {
        name: "首页",
      },
      {
        name: "设备维护",
      },
      {
        name: "维修管理",
        color: "#40A0EA",
      },
    ];
    this.editbreadcrumb = [
      {
        name: "首页",
      },
      {
        name: "设备维护",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "维修管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "设备维修",
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
      upd,
      add,
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
      stringList = [],
      showChild, //是否加载子表
      buttonText, //提交按钮文字
      showForm, //显示表单
      totalPrice,
      searchInput,
      imageList,
      fileList,
    } = this.props;
    storeLabel = storeKey;
    const {
      getBase,
      delBase,
      addOrUpdateBase,
      hideModal,
      setShowForm,
      // getPurListInfo, //购置清单详情
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
    // 修改
    const update = (row) => {
      //根据id获取附件
      getAttachmentById({
        businessId: row?.id,
        businessType: "1",
        current: 1,
        size: -1,
      });
      //查询清单
      getRepairItem({ mainId: row.id, size: 10, current: 1 }).then((res) => {
        row = { ...row, limsRepairitemUpdateDTOS: res.data.records };
        formatList.map((item) => {
          if (row[item]) {
            row = { ...row, [item]: moment(row[item]) };
          }
        });
        this.setState({
          records: row,
        });
        this.formRef.current.setFieldsValue(row);
        setShowForm(true);
      });
    };
    //到货验收
    const submitFlow = () => {
      this.formRef.current.validateFields().then(() => {
        let values = this.formRef.current.getFieldValue();
        console.log(values, "VV");
        formatList.forEach((item) => {
          values = {
            ...values,
            [item]: moment(values[item]).format("YYYY-MM-DD HH:mm:ss"),
          };
        });
        stringList.forEach((item) => {
          values = {
            ...values,
            [item]: String(values[item]),
          };
        });
        let updvalue = {
          ...values,
          submitType: 1,
          // limsRepairitemUpdateDTOS: values.limsBasicdeviceItemDO,
          limsAttachmentSaveDTOS: formatAttachment([...fileList, ...imageList]),
        };

        addOrUpdateBase({
          request: this.state.records?.id ? upd : add,
          key: storeKey,
          query: get,
          param: updvalue,
        });
      });
    };
    // 提交
    const onFinish = (values) => {
      formatList.forEach((item) => {
        values = {
          ...values,
          [item]: moment(values[item]).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      stringList.forEach((item) => {
        values = {
          ...values,
          [item]: String(values[item]),
        };
      });
      let updvalue = {
        ...values,
        totalPrice: totalPrice,
        submitType: 0,
        limsAttachmentSaveDTOS: formatAttachment([...fileList, ...imageList]),
      };

      addOrUpdateBase({
        request: this.state.records?.id ? upd : add,
        key: storeKey,
        query: get,
        param: updvalue,
      });
    };

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
                <DownLoad req={exportRepairList} fileName="维修申请"></DownLoad>
              </div>
              <div className={"view-query-right"}>
                <Form layout="inline" ref={this.rwoFormRef}>
                  <Form.Item>
                    <SearchInput
                      placeholder="支持模糊查找申请单号"
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
              showDel={false}
              rowSelection={rowSelection}
              columnsProps={columnsProps}
              columns={columns}
              loading={loading}
              total={this.props[storeKey]?.total}
              dataSource={this.props[storeKey]?.records || []}
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
            {/* {this.props.children} */}
          </div>
        }
        {
          <div
            hidden={!showForm}
            // style={{ display: showForm ? "block" : "none" }}
          >
            <div className="view-query-left">
              <RenderBreadcrumb
                showForm={showForm}
                breadcrumb={this.breadcrumb}
                editbreadcrumb={this.editbreadcrumb}
              />
              {this.state.records.applyCode && (
                <div className="purp-apply-code">
                  维修单号：{this.state.records.applyCode}
                </div>
              )}
            </div>
            <div className="head-line"></div>
            <FlowForm
              formatList={formatList}
              // approvalRecords={this.state.approvalRecords}
              records={this.state.records}
              defaultFileList={this.state.defaultFileList}
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
    totalPrice: state.currency.totalPrice,
    searchInput: state.formItems.searchInput,

    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
    // dict: state.currency.dict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseNewPageLayout);
