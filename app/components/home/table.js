import React from "react";
import { Table, Popover, Popconfirm } from "antd";
import editImg from "./../../resource/编辑.svg";
import deleteImg from "./../../resource/作废.svg";
import view from "./../../resource/查看.svg";
import "./index.scss";

export default (props) => {
  const {
    confirm, //删除
    update, //修改
    loading, //loading
    dataSource, //table数据源
    rowkey, //key
    total, //总数
    current, //页数
    size, //表格每页展示数量
    changePage, //翻页
    onShowSizeChange, //设置table每页显示数量
    rowSelection, //查询配置
    columns = [], //表格配置
    showEdit = true, //是否可以编辑
    showDel = true,
  } = props;
  const columnsBase = [
    {
      title: "操作",
      dataIndex: "isShow",
      className: "column-money",
      width: 80,
      fixed: "right",
      render: (_, row) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          {row?.status == "0" ? (
            <Popover content={"修改"}>
              <img
                style={{ cursor: "pointer" }}
                width="20px"
                height="20px"
                src={editImg}
                onClick={() => update(row)}
              ></img>
            </Popover>
          ) : (
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
          <Popconfirm
            title="确定永久删除该数据吗?"
            onConfirm={() => confirm(row)}
            okText="确定"
            cancelText="取消"
          >
            {showDel && (
              <Popover content={"删除"}>
                <img
                  src={deleteImg}
                  width="16px"
                  height="16px"
                  style={{ marginLeft: "10px", cursor: "pointer" }}
                ></img>
              </Popover>
            )}
          </Popconfirm>
        </div>
      ),
    },
  ];
  const itemRender = (current, type, originalElement) => {
    if (type === "prev") {
      return (
        <a className="table-pagination-novi" onClick={() => changePage(1)}>
          首页
        </a>
      );
    }
    if (type === "next") {
      return (
        <a
          className="table-pagination-novi"
          onClick={() => {
            if (total / 10 == 0) {
              changePage(total / 10);
            } else {
              changePage(Math.floor(total / 10 + 1)); //返回值为大于等于其数字参数的最小整数。
            }
          }}
        >
          尾页
        </a>
      );
    }
    return originalElement;
  };
  let pagination = {
    itemRender: itemRender,
    total: total,
    size: "default",
    current: current,
    // showQuickJumper: true,
    // showSizeChanger: true,
    onChange: (current) => changePage(current),
    pageSize: size,
    // pageSize: 5,
    onShowSizeChange: (current, pageSize) => {
      // 设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      onShowSizeChange(current, pageSize);
    },
    showTotal: () => (
      <span>
        共有<span style={{ color: "#0081E4" }}>{total}</span>条记录
      </span>
    ),
  };
  return (
    <Table
      size="small"
      columns={
        showEdit
          ? [
              {
                title: "序号",
                dataIndex: "",
                key: "",
                width: "60px",
                render: (_, __, index) => index + 1,
              },
              ...columns,
              ...columnsBase,
            ]
          : columns
      }
      loading={loading}
      dataSource={dataSource}
      scroll={{ y: 700 }}
      rowKey={(row) => rowkey(row)}
      pagination={pagination}
      rowSelection={rowSelection}
      // {...props}
    />
  );
};
