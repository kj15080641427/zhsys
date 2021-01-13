import React, { useState, useEffect } from "react";
import { Table, Popover, Popconfirm } from "antd";
import editImg from "./../../resource/编辑.svg";
import deleteImg from "./../../resource/作废.svg";
import view from "./../../resource/查看.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import "./styles.scss";

let baseStoreKey = "test";
const BaseTable = (props) => {
  const {
    columns = [], //表格列名
    loading,
    get, //请求
    storeKey, //store中的值的key
    rowkey = "basicDictId",
  } = props;
  const { getBase } = props.actions;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    baseStoreKey = storeKey;
    getBase({
      request: get,
      key: storeKey,
      param: {
        current: current,
        size: pageSize,
      },
    });
  }, []);

  const pagination = {
    // itemRender: itemRender,
    total: props[baseStoreKey]?.total,
    size: "default",
    current: current,
    // showQuickJumper: true,
    // showSizeChanger: true,
    onChange: (cur) => {
      setCurrent(cur);
      getBase({
        request: get,
        key: storeKey,
        param: {
          current: cur,
          size: pageSize,
        },
      });
      //   changePage(current);
    },
    pageSize: pageSize,
    // pageSize: 5,
    showTotal: () => (
      <span>
        共有
        <span style={{ color: "#0081E4" }}>{props[baseStoreKey]?.total}</span>
        条记录
      </span>
    ),
  };
  return (
    <>
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
                <Popover content={"编辑"}>
                  <img
                    src={editImg}
                    // onClick={() => update(row)}
                  ></img>
                </Popover>
                <Popover content={"查看"}>
                  <img
                    style={{ cursor: "pointer" }}
                    width="20px"
                    height="20px"
                    src={view}
                    // onClick={() => update(row)}
                  ></img>
                </Popover>
                {/* // )} */}
                <Popconfirm
                  title="确定永久删除该数据吗?"
                  onConfirm={() => confirm(row)}
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
              </div>
            ),
          },
        ]}
        loading={loading}
        dataSource={props[baseStoreKey]?.records}
        // scroll={{ y: 700 }}
        rowKey={(row) => row[rowkey]}
        pagination={pagination}
        // rowSelection={rowSelection}
        // {...props}
      />
    </>
  );
};
const mapStateToProps = (state) => {
  console.log(state.currency[baseStoreKey]);
  return {
    [baseStoreKey]: state.currency[baseStoreKey],
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BaseTable);
