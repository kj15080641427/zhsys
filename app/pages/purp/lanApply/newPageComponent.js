import React from "react";
import { Button, Form, message } from "antd";
import DYTable from "@app/components/home/table";
import FlowForm from "./flowForm";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import "./style.scss";
import { connect } from "react-redux";
import moment from "moment";
import SearchInput from "../../../components/formItems/searchInput";
import {
  getLimsUselanapplyById,
  exportLimsUselanapply,
  approvalLimsUselanapply,
} from "../../../request/index";
import { downloadFile } from "./downFile";
import RenderBreadcrumb from "../../../components/formItems/breadcrumb";
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
      taskInfo: {}, //事件详情
    };
    this.breadcrumb = [
      {
        name: "首页",
      },
      {
        name: "购置管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "购置申请管理",
        click: () => this.props.actions.setShowForm(false),
        color: "#40A0EA",
      },
    ];
    this.editbreadcrumb = [
      {
        name: "首页",
      },
      {
        name: "购置管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "购置申请管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "购置申请",
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
      stringList = [],
      showChild, //是否加载子表
      buttonText, //提交按钮文字
      showForm, //显示表单
      searchInput, //搜索框值
    } = this.props;
    storeLabel = storeKey;
    const {
      getBase,
      delBase,
      addOrUpdateBase,
      hideModal,
      setShowForm,
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
      getLimsUselanapplyById({ id: row.id }).then((res) => {
        if (res.code == 200) {
          this.setState({
            taskInfo: res.data,
          });
          row = {
            ...row,
            limsBasicdeviceDTOList: res.data.limsPurplanapplyitemDOList,
          };
          formatList.map((item) => {
            row = { ...row, [item]: moment(row[item]) };
          });
          this.setState({
            records: row,
          });
          this.formRef.current.setFieldsValue(row);
          setShowForm(true);
        } else {
          message.error(res.msg);
        }
      });
    };
    //提交工作流
    const submitFlow = () => {
      let formData = this.formRef.current.getFieldValue();
      formatList.forEach((item) => {
        formData = {
          ...formData,
          [item]: moment(formData[item]).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      stringList.forEach((item) => {
        formData = {
          ...formData,
          [item]: String(formData[item]),
        };
      });

      let updvalue = {
        ...formData,
        submitType: 1,
        limsBasicdeviceUpdateDTOList: formData.limsBasicdeviceDTOList,
      };
      delete updvalue.limsBasicdeviceDTOList;
      let addvalue = {
        ...formData,
        submitType: 1,
      };
      delete formData.limsBasicdeviceDTOList;

      formData[keyId]
        ? addOrUpdateBase({
            request: upd,
            key: storeKey,
            query: get,
            param: updvalue,
          })
        : addOrUpdateBase({
            request: add,
            key: storeKey,
            query: get,
            param: addvalue,
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
        submitType: 0,
        limsBasicdeviceUpdateDTOList: values.limsBasicdeviceDTOList,
      };
      delete updvalue.limsBasicdeviceDTOList;
      let addvalue = {
        ...values,
        submitType: 0,
      };
      delete values.limsBasicdeviceDTOList;
      values[keyId]
        ? addOrUpdateBase({
            request: upd,
            key: storeKey,
            query: get,
            param: updvalue,
          })
        : addOrUpdateBase({
            request: add,
            key: storeKey,
            query: get,
            param: addvalue,
          });
    };
    //审批
    const approvalClick = (e) => {
      let formData = this.formRef?.current?.getFieldValue();
      if (formData.msg) {
        approvalLimsUselanapply({
          limsPurplanapplyId: formData?.id,
          msg: formData?.msg,
          type: e,
        }).then((res) => {
          if (res.code == 200) {
            message.success(res.msg);
            getBase({
              request: get,
              key: storeKey,
              param: { current: 1, size: 10 },
            });
            setShowForm(false);
          } else {
            message.error(res.msg);
          }
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
                <DownLoad
                  req={exportLimsUselanapply}
                  fileName="购置申请"
                ></DownLoad>
              </div>
              <div className={"view-query-right"}>
                <Form layout="inline" ref={this.rwoFormRef}>
                  <Form.Item label={""} name={"title"}>
                    <SearchInput
                      placeholder="支持模糊查找申请标题"
                      searchClick={() =>
                        rowFinish({
                          title: searchInput,
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
                  新增
                </Button>
              </div>
            </div>
            <DYTable
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
            {this.props.children}
          </div>
        }
        {
          <div hidden={!showForm}>
            <div className="view-query-left">
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
    searchInput: state.formItems.searchInput, //搜索框值
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseNewPageLayout);
