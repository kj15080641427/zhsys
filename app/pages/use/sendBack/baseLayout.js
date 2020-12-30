import React from "react";
import { Button, Form, Input, Breadcrumb, message } from "antd";
import DYTable from "@app/components/home/table";
import FlowForm from "./flowForm";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import "./style.scss";
import { connect } from "react-redux";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import { getReturnById } from "../../../request/index";

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

      approvalRecords: {}, //购置申请信息
      defaultFileList: [], //已上传文件列表
    };
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
      rowSelect = [],
      columnsProps = [],
      rowSelection,
      handleQuery,
      formatList = [],
      stringList = [],
      breadcrumb = [],
      showChild, //是否加载子表
      buttonText, //提交按钮文字
      showForm, //显示表单
      returnBackList,
    } = this.props;
    storeLabel = storeKey;
    const {
      getBase,
      delBase,
      addOrUpdateBase,
      hideModal,
      setShowForm,
      // getPurListInfo, //购置清单详情
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
      getReturnById({
        current: 1,
        id: row.id,
        size: -1,
      }).then((res) => {
        if (res.code == 200) {
          // let list = res?.data?.limsUsereturnapplyitemList.map((item) => {
          //   return { ...item, ...item.limsBasicdevice };
          // });
          row = {
            ...row,
            limsBasicdevice: res?.data?.limsUsereturnapplyitemList,
            taskInfo: res?.data?.activitiDOList,
          };

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
        } else {
          message.error(res.msg);
        }
      });
    };
    //提交审批
    const submitFlow = () => {
      let values = this.formRef.current.getFieldValue();
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
        limsUsereturnapplyitemDTOList: returnBackList,
        submitType: 1,
        remark: "归还申请",
      };

      addOrUpdateBase({
        request: upd,
        key: storeKey,
        query: get,
        param: updvalue,
      });
    };
    // 保存
    const onFinish = (values) => {
      formatList.forEach((item) => {
        values = {
          ...values,
          [item]: moment(values[item]).format("YYYY-MM-DD HH:mm:ss"),
        };
      });
      let updvalue = {
        ...values,
        submitType: 0,
        limsUsereturnapplyitemDTOList: returnBackList,
        remark: "归还申请",
      };
      addOrUpdateBase({
        request: values[keyId] ? upd : add,
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
    //面包屑
    const renderBreadcrumb = () => {
      return (
        <div className="view-query-breacrumd" style={{ width: "230px" }}>
          <Breadcrumb separator=">">
            {breadcrumb.map((item) => (
              <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      );
    };
    return (
      <>
        {
          <div hidden={showForm}>
            <div className="view-query">
              <div className="view-query-left">
                {renderBreadcrumb()}
                <Button
                  className="base-add-button"
                  onClick={() => {
                    // this.formRef.current.resetFields;
                    // showModal();
                  }}
                >
                  导出
                </Button>
              </div>
              <div className={"view-query-right"}>
                <Form
                  onFinish={rowFinish}
                  layout="inline"
                  ref={this.rwoFormRef}
                >
                  {rowSelect.map((item) => (
                    <Form.Item
                      label={item.label}
                      name={item.name}
                      key={item.name}
                    >
                      <div className="base-rowSelect-flex">
                        <Input
                          onChange={(e) =>
                            this.setState({
                              rowSelectData: e.target.value,
                            })
                          }
                          className="base-rowSelect"
                        ></Input>
                        <div className="base-rowSelect-icon">
                          <SearchOutlined
                            onClick={() =>
                              rowFinish({ name: this.state.rowSelectData })
                            }
                          />
                        </div>
                      </div>
                    </Form.Item>
                  ))}
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
            <div className="view-query-left">{renderBreadcrumb()}</div>
            <div className="head-line"></div>
            <FlowForm
              approvalRecords={this.state.approvalRecords}
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
    returnBackList: state.currency.returnBackList,
    // dict: state.currency.dict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseNewPageLayout);
