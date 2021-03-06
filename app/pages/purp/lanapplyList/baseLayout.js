import React from "react";
import { Button } from "antd";
import DYTable from "@app/components/home/table";
import FlowForm from "./flowForm";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import * as formActions from "../../../redux/actions/aFormItems";
import "./style.scss";
import { connect } from "react-redux";
import moment from "moment";
import {
  getLanapplyPurByList,
  exportLimsUselanapplyListPurItem,
} from "../../../request/index";
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
      records: {},
    };
    this.breadcrumb = [
      {
        name: "首页",
      },
      {
        name: "购置管理",
      },
      {
        name: "购置单管理",
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
        name: "购置单管理",
        click: () => this.props.actions.setShowForm(false),
      },
      {
        name: "查看购置单",
        click: () => this.props.actions.setShowForm(false),
        color: "#40A0EA",
      },
    ];
  }

  componentWillUnmount() {
    //关闭表单
    this.props.actions.setShowForm(false);
  }
  componentDidMount() {
    //获取数据
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
    const { setPurpList } = this.props.formActions;
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
        code: searchInput,
      });
    };
    //
    const onShowSizeChange = (current, pageSize) => {
      getBaseHoc({
        current: current,
        size: pageSize,
        code: searchInput,
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
      getLanapplyPurByList({ id: row.id }).then((res) => {
        let list = res.data.limsPuritemDOList.map((item) => {
          return { ...item, ...item.limsBasicdeviceItemDO };
        });
        setPurpList(list);
        formatList.map((item) => {
          if (row[item]) {
            row = { ...row, [item]: moment(row[item]) };
          }
        });
        this.setState({
          // approvalRecords: res.data.limsPurplanapply,
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
        let list = values.limsPurplanapplyitemDOList.map((item) => {
          return this.state.records.id
            ? {
                deviceId: item.id,
              }
            : {
                deviceId: item.id,
                id: this.state.records.id,
              };
        });
        let updvalue = {
          ...values,
          submitType: 1,
          limsPuritemUpdateDTOList: list,
          limsAttachmentSaveDTOS: formatAttachment([...fileList, ...imageList]),
        };

        addOrUpdateBase({
          request: upd,
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
      let list = values.limsPurplanapplyitemDOList.map((item) => {
        return this.state.records.id
          ? {
              deviceId: item.id,
            }
          : {
              deviceId: item.id,
              id: this.state.records.id,
            };
      });
      let updvalue = {
        ...values,
        totalPrice: totalPrice,
        submitType: 0,
        limsPuritemUpdateDTOList: list,
        limsAttachmentSaveDTOS: formatAttachment([...fileList, ...imageList]),
      };

      addOrUpdateBase({
        request: values[keyId] ? upd : add,
        key: storeKey,
        query: get,
        param: updvalue,
      });
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
                  req={exportLimsUselanapplyListPurItem}
                  fileName="购置单"
                ></DownLoad>
              </div>
              <div className={"view-query-right"}>
                <SearchInput
                  placeholder="支持模糊查找申请单号"
                  searchClick={() =>
                    getBaseHoc({ current: 1, size: 10, code: searchInput })
                  }
                />
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
                  购置单号:{this.state.records.code}
                </div>
              )}
            </div>
            <div className="head-line"></div>
            <FlowForm
              formatList={formatList}
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
    totalPrice: state.currency.totalPrice,
    searchInput: state.formItems.searchInput,

    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
    // dict: state.currency.dict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  formActions: bindActionCreators(formActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseNewPageLayout);
