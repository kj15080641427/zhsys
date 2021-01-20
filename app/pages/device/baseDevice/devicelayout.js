import React from "react";
import { Button, Form, Input, Breadcrumb, Drawer } from "antd";
import DYTable from "@app/components/home/table";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import "../../../components/baseLayout/style.scss";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";
import { SearchOutlined } from "@ant-design/icons";
import DeviceForm from "./deviceForm";
import { getLimsBasicDevicePart } from "../../../request/index";

let storeLabel = "base";
class BaseLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.formRef = React.createRef();
    this.rwoFormRef = React.createRef();
    this.state = {
      filterName: {},
      disabled: false, //表单防重复点击
      drawerTitileType: "", //添加 | 修改
      devicePart: [],
      showPart: {},
    };
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
      columns,
      rowSelect = [],
      columnsProps = [],
      rowSelection,
      showEdit = true,
      handleQuery,
      formatList = [],
      stringList = [],
      breadcrumb = [],
      formWidth = 450,
      formTitle = "",
    } = this.props;
    storeLabel = storeKey;
    const {
      getBase,
      delBase,
      addOrUpdateBase,
      showModal,
      hideModal,
      getAttachmentById,
    } = this.props.actions;
    const { loading, visible } = this.props;
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
    // 查询设备部件
    const getDeviceInfo = (row) => {
      //获取附件
      getAttachmentById({
        businessId: row?.id,
        businessType: "1",
        current: 1,
        size: -1,
      });
      //查询设备部件
      getLimsBasicDevicePart({
        current: 1,
        deviceId: row.id,
        size: -1,
      }).then((res) => {
        this.setState({ devicePart: res.data.records, deviceInfo: row });
      });
      row = { ...row, produceDate: moment(row.produceDate) };
      this.formRef.current.setFieldsValue(row);
      this.setState({ showPart: true });
    };
    // 修改
    const update = (row) => {
      getDeviceInfo(row);
      this.setState({
        drawerTitileType: "修改",
      });
      formatList.map((item) => {
        row = { ...row, [item]: moment(row[item]) };
      });
      this.formRef.current.setFieldsValue(row);
      showModal();
    };

    // 提交
    const onFinish = (values) => {
      console.log(values);
      // this.setState({
      //   disabled: true,
      // });
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
      values[keyId]
        ? addOrUpdateBase({
            request: upd,
            key: storeKey,
            query: get,
            param: values,
          })
        : addOrUpdateBase({
            request: add,
            key: storeKey,
            query: get,
            param: values,
          });
    };
    // 查询
    const rowFinish = (values) => {
      // console.log(values, "values");
      this.setState({
        filterName: values,
      });
      handleQuery
        ? handleQuery({ ...values, current: 1, size: 10 })
        : getBaseHoc({ current: 1, size: 10, ...values });
    };
    return (
      <>
        <div className="view-query">
          <div className="view-query-left">
            <Breadcrumb
              separator=">"
              className="view-query-breacrumd"
              style={{ width: "230px" }}
            >
              {breadcrumb.map((item) => (
                <Breadcrumb.Item key={item.name}>{item.name}</Breadcrumb.Item>
              ))}
            </Breadcrumb>
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
          <div className="view-query-right">
            <Form onFinish={rowFinish} layout="inline" ref={this.rwoFormRef}>
              {rowSelect.map((item) => (
                <Form.Item label={item.label} name={item.name} key={item.name}>
                  <div className="base-rowSelect-flex">
                    <Input
                      onChange={(e) =>
                        this.setState({
                          rowSelectData: e.target.value,
                        })
                      }
                      className="base-rowSelect"
                      // addonAfter={<SearchOutlined />}
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
            <Button
              className="base-add-button"
              onClick={() => {
                // this.formRef.current.resetFields;
                // showModal();
              }}
            >
              高级
            </Button>
            {showEdit ? (
              <Button
                className="base-add-button"
                onClick={() => {
                  this.setState({
                    drawerTitileType: "添加",
                  });
                  this.formRef.current.resetFields;
                  showModal();
                }}
              >
                添加
              </Button>
            ) : null}
          </div>
        </div>
        <DYTable
          showEdit={showEdit}
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
        <Drawer
          title={`${this.state.drawerTitileType}${formTitle}`}
          visible={visible}
          onClose={() => {
            hideModal();
            this.formRef.current.resetFields();
          }}
          // destroyOnClose
          forceRender
          width={formWidth}
        >
          <DeviceForm
            formRef={this.formRef}
            onFinish={onFinish}
            devicePart={this.state.devicePart}
            deviceInfo={this.state.deviceInfo}
          />
          {/* <DYForm
            buttonText={buttonText}
            showChild={showChild}
            disabled={this.state.disabled}
            showCancel
            cancelClick={() => {
              hideModal();
              this.setState({
                disabled: false,
              });
            }}
            id={keyId}
            formRef={this.formRef}
            name={storeKey}
            formItem={formItem}
            onFinish={onFinish}
          ></DYForm> */}
        </Drawer>
        {/* <Modal
          title=" "
          visible={visible}
          forceRender={true}
          onCancel={() => hideModal()}
          footer={null}
          maskClosable={false}
          afterClose={() => this.formRef.current.resetFields()}
          className="base-layout-modal"
        >
          <DYForm
            disabled={this.state.disabled}
            showCancel
            cancelClick={() => {
              hideModal();
              this.setState({
                disabled: false,
              });
            }}
            id={keyId}
            formRef={this.formRef}
            name={storeKey}
            formItem={formItem}
            onFinish={onFinish}
          ></DYForm>
        </Modal> */}
        {this.props.children}
      </>
    );
  }
}
BaseLayout.propTypes = {
  children: PropTypes.any,
  actions: PropTypes.any,
  get: PropTypes.func,
  storeKey: PropTypes.string,
  add: PropTypes.func,
  upd: PropTypes.func,
  del: PropTypes.func,
  keyId: PropTypes.string,
  formItem: PropTypes.array,
  columns: PropTypes.array,
  rowSelect: PropTypes.array,
  columnsProps: PropTypes.array,
  rowSelection: PropTypes.object,
  showEdit: PropTypes.bool,
  handleQuery: PropTypes.func,
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  formatList: PropTypes.array,
  stringList: PropTypes.array,
};
const mapStateToProps = (state) => {
  return {
    [storeLabel]: state.currency[storeLabel],
    loading: state.currency.loading,
    visible: state.currency.visible,
    imageList: state.currency.imageList,
    // dict: state.currency.dict,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseLayout);
