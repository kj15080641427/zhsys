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
import {
  getRepairById,
  approvaRepair,
  getAttachment,
} from "../../../request/index";
import { Route, Switch } from "react-router-dom";
import { createHashHistory } from "history";
const hashHistory = createHashHistory();

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
      getAttachment({
        businessId: row.id,
        businessType: "1",
        current: 1,
        size: -1,
      }).then((res) => {
        this.setState({
          defaultFileList: res.data.records,
        });
      });
      getRepairById({ id: row.id }).then((res) => {
        this.setState({
          taskInfo: res.data,
          records: row,
        });
        let list = res.data.limsRepairapplyitemDOList?.map((item) => ({
          ...item,
          ...item.limsRepairapply,
        }));
        row = {
          ...row,
          ...res.data.limsUselendapply,
          limsRepairapplyitemSaveDTOS: list,
        };
        formatList.map((item) => {
          row = { ...row, [item]: moment(row[item]) };
        });
        this.formRef.current.setFieldsValue(row);
        setShowForm(true);
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
      let totalFee = 0;
      let updvalue = {
        ...formData,
        submitType: 1,
        limsRepairapplyitemSaveDTOS: formData.limsRepairapplyitemSaveDTOS.map(
          (item) => {
            totalFee = totalFee + item.totalPrice;
            return {
              deviceId: item.id, //
              complexFundId: "791606316736065536", //
              foundId: "791606316736065536", //
              foundFee: 11000, //
              usePeriod: item.usePeriod, //
              usePrice: item.usePrice, //
            };
          }
        ),
        totalFee: totalFee,
      };
      // delete updvalue.limsBasicdeviceDTOList;
      let addvalue = {
        ...formData,
        submitType: 1,
        limsRepairapplyitemSaveDTOS: formData.limsRepairapplyitemSaveDTOS.map(
          (item) => {
            totalFee = totalFee + item.totalPrice;
            return {
              deviceId: item.id, //设备ID
              complexFundId: "791606316736065536", //经费ID
              foundId: "791606316736065536", //经费ID
              foundFee: 11000, //经费余额
              totalPrice: item.totalPrice, //x小计金额
              usePeriod: item.usePeriod, //使用天数
              usePrice: item.usePrice, //单价
            };
          }
        ),
        totalFee: totalFee,
      };

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
    // 保存
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
      let totalFee = 0;
      let updvalue = {
        ...values,
        submitType: 0,
        limsRepairapplyitemSaveDTOS: values.limsRepairapplyitemSaveDTOS.map(
          (item) => {
            totalFee = totalFee + item.totalPrice;
            return {
              deviceId: item.id, //设备ID
              complexFundId: "791606316736065536", //经费ID
              foundId: "791606316736065536", //经费ID
              foundFee: 11000, //经费余额
              totalPrice: item.totalPrice, //x小计金额
              usePeriod: item.usePeriod, //使用天数
              usePrice: item.usePrice, //单价
            };
          }
        ),
        totalFee: totalFee,
      };
      // delete updvalue.limsBasicdeviceDTOList;
      let addvalue = {
        ...values,
        submitType: 0,
        limsRepairapplyitemSaveDTOS: values.limsRepairapplyitemSaveDTOS.map(
          (item) => {
            totalFee = totalFee + item.totalPrice;
            return {
              deviceId: item.id, //设备ID
              planTime: item.planTime,
              planFee: item.planFee,
              remark: item.remark,
              // foundFee: 11000, //经费余额
              // totalPrice: item.totalPrice, //x小计金额
              // usePeriod: item.usePeriod, //使用天数
              // usePrice: item.usePrice, //单价
            };
          }
        ),
        totalFee: totalFee,
      };
      // delete values.limsBasicdeviceDTOList;
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
        approvaRepair({
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
    //添加
    const addData = () => {
      console.log(`${this.props.pathname}/edit`, "----------");
      this.setState({
        records: {},
      });
      hashHistory.push(`${this.props.pathname}/edit`);
      // setShowForm(true);
      this.formRef.current.resetFields();
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
    const TableLayout = () => {
      return (
        <div>
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
              <Form onFinish={rowFinish} layout="inline" ref={this.rwoFormRef}>
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
              <Button className="base-add-button" onClick={addData}>
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
      );
    };
    const FormLayout = () => {
      return (
        <div>
          <div className="view-query-left">{renderBreadcrumb()}</div>
          <div className="head-line"></div>
          <FlowForm
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
      );
    };
    return (
      <>
        {console.log(this.props, "PROPS")}
        <Switch>
          <Route path={this.props.pathname} component={TableLayout}></Route>
          <Route
            path={`${this.props.pathname}/edit`}
            component={FormLayout}
          ></Route>
        </Switch>
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
    // dict: state.currency.dict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(LendLayout);
