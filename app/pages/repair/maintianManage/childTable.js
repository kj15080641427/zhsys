import React, { useState, useEffect } from "react";
import { Table, Radio } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";

const ChildTable = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const { records, maintianList } = props;
  useEffect(() => {
    props.onChange(maintianList);
    setDataSource(maintianList);
  }, [maintianList]);
  useEffect(() => {
    props.value && setDataSource(props.value);
    console.log(maintianList, "???");
  }, [props.value]);

  const columns = [
    {
      title: "设备编号",
      dataIndex: "deviceNo",
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
    },
    {
      title: "单位",
      dataIndex: "unitName",
      render: (_, row) => row.unitName,
    },
    {
      title: "规格型号",
      dataIndex: "model",
    },
    {
      title: "品 牌",
      dataIndex: "brandName",
      render: (_, row) => row.brandName,
    },
    {
      title: "维修工时",
      dataIndex: "remark",
    },
    {
      title: "维修费用",
      dataIndex: "fee",
    },
    {
      title: "备注说明",
      dataIndex: "remark",
    },
    {
      title: "状态",
      dataIndex: "status",
      hidden: true,
      render: (_, __, index) =>
        records?.status == "0" || records?.status ? (
          <Radio.Group
            defaultValue={dataSource[index]?.status}
            onChange={(W) => {
              let list = dataSource;
              list[index].status = W.target.value;
              setDataSource(list);
            }}
          >
            <Radio value="1">已修复</Radio>
            <Radio value="2">已报废</Radio>
          </Radio.Group>
        ) : (
          ""
        ),
    },
  ];

  return (
    <div value={props.value} onChange={() => props.onChange}>
      <Table
        value={dataSource}
        columns={columns}
        dataSource={dataSource}
        rowKey={"deviceNo"}
      ></Table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    maintianList: state.formItems.maintianList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildTable);
