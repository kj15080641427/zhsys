import React from "react";
import { Table, Popover, Popconfirm } from "antd";
import editImg from "./../../resource/edit.svg";
import deleteImg from "./../../resource/delete.svg";
import { EyeOutlined } from "@ant-design/icons";

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
                width="18px"
                height="18px"
                src={editImg}
                onClick={() => update(row)}
              ></img>
            </Popover>
          ) : (
            <Popover content={"查看"}>
              <EyeOutlined
                style={{ fontSize: "18px" }}
                onClick={() => update(row)}
              />
            </Popover>
          )}
          <Popconfirm
            title="确定永久删除该数据吗?"
            onConfirm={() => confirm(row)}
            okText="确定"
            cancelText="取消"
          >
            <Popover content={"删除"}>
              <img
                src={deleteImg}
                width="20px"
                height="20px"
                style={{ marginLeft: "10px", cursor: "pointer" }}
              ></img>
            </Popover>
          </Popconfirm>
        </div>
      ),
    },
  ];
  let pagination = {
    total: total,
    size: "default",
    current: current,
    showQuickJumper: true,
    showSizeChanger: true,
    onChange: (current) => changePage(current),
    pageSize: size,
    onShowSizeChange: (current, pageSize) => {
      // 设置每页显示数据条数，current表示当前页码，pageSize表示每页展示数据条数
      onShowSizeChange(current, pageSize);
    },
    showTotal: () => `共${total}条`,
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
                width: "50px",
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
