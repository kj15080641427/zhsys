import React, { useState, useEffect, useRef } from "react";
import { Table, Popover, Popconfirm, Form } from "antd";
import editImg from "./../../resource/编辑.svg";
import deleteImg from "./../../resource/作废.svg";
import view from "./../../resource/查看.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import SearchInput from "../../components/formItems/searchInput";
import "./styles.scss";

let baseStoreKey = "test";
const BaseTable = (props) => {
  const {
    columns = [], //表格列名
    loading,
    get, //请求
    storeKey, //store中的值的key
    rowKey = "basicDictId",
    pageSize = "10",
    showEdit = true,
    showView = true,
    showDelete = true,
    deleteRow,
    update,
    param,
    showSearch = false,
    searchInput,
    searchName,
  } = props;
  const { getBase } = props.actions;
  const [current, setCurrent] = useState(1);
  const formRef = useRef();
  const getData = () => {
    return getBase({
      request: get,
      key: storeKey,
      param: {
        current: current,
        size: pageSize,
        ...param,
      },
    });
  };

  useEffect(() => {
    baseStoreKey = storeKey;
  }, []);
  useEffect(() => {
    getData();
  }, [current]);

  useEffect(() => {
    param &&
      getBase({
        request: get,
        key: storeKey,
        param: {
          current: 1,
          size: pageSize,
          ...param,
        },
      });
  }, [param]);
  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <a
          className="table-pagination-novi"
          onClick={() => {
            setCurrent(1);
          }}
        >
          首页
        </a>
      );
    }
    if (type === "next") {
      return (
        <a
          className="table-pagination-novi"
          onClick={() => {
            if (props[baseStoreKey]?.total / 10 == 0) {
              setCurrent(props[baseStoreKey]?.total / 10);
            } else {
              setCurrent(Math.floor(props[baseStoreKey]?.total / 10 + 1)); //返回值为大于等于其数字参数的最小整数。
            }
          }}
        >
          尾页
        </a>
      );
    }
    return originalElement;
  };
  const pagination = {
    itemRender: itemRender,
    total: props[baseStoreKey]?.total,
    size: "default",
    current: current,
    onChange: (cur) => {
      setCurrent(cur);
    },
    pageSize: pageSize,
    showTotal: () => (
      <span>
        共有
        <span style={{ color: "#0081E4" }}>{props[baseStoreKey]?.total}</span>
        条记录
      </span>
    ),
  };
  return (
    <div className="base-table-layout">
      {showSearch && (
        <div className="base-table-search">
          <Form layout="inline" ref={formRef}>
            <Form.Item label={""} name={"searchName"}>
              <SearchInput
                placeholder="支持模糊查找申请标题"
                searchClick={() =>
                  getBase({
                    request: get,
                    key: storeKey,
                    param: {
                      current: 1,
                      size: pageSize,
                      [searchName]: searchInput,
                      ...param,
                    },
                  })
                }
              />
            </Form.Item>
          </Form>
        </div>
      )}
      <Table
        size="small"
        columns={[
          {
            title: "序号",
            width: "60px",
            render: (_, __, index) => index + 1,
          },
          ...columns,
          {
            title: "操作",
            width: "80px",
            fixed: "right",
            render: (_, row) => (
              <div className="new-base-columns">
                {showEdit && (
                  <Popover content={"编辑"}>
                    <img src={editImg} onClick={() => update(row)}></img>
                  </Popover>
                )}
                {showView && (
                  <Popover content={"查看"}>
                    <img
                      style={{ cursor: "pointer" }}
                      width="20px"
                      height="20px"
                      src={view}
                      onClick={() => update(row)}
                    ></img>
                  </Popover>
                )}
                {showDelete && (
                  <Popconfirm
                    title="确定永久删除该数据吗?"
                    onConfirm={() => deleteRow(row)}
                    okText="确定"
                    cancelText="取消"
                  >
                    <Popover content={"删除"}>
                      <img
                        src={deleteImg}
                        width="16px"
                        height="16px"
                        style={{ marginLeft: "10px", cursor: "pointer" }}
                      ></img>
                    </Popover>
                  </Popconfirm>
                )}
              </div>
            ),
          },
        ]}
        loading={loading}
        dataSource={props[baseStoreKey]?.records}
        rowKey={(row) => row[rowKey]}
        pagination={pagination}
        // rowSelection={rowSelection}
        // {...props}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    searchInput: state.formItems.searchInput,
    [baseStoreKey]: state.currency[baseStoreKey],
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseTable);
