import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "antd";
import { columnsToForm } from "../../../utils/common";
import DYForm from "@app/components/home/form";
import moment from "moment";
import FormSelect from "../../../components/formItems/select";
import {
  getLimsBasicDict,
  delLimsUselanapplyList,
  // getLimsUselanapplyList,
} from "../../../request/index";
import { bindActionCreators } from "redux";
import * as actions from "../../../redux/actions/aCurrency";
import { connect } from "react-redux";

const ChildTable = (props) => {
  const { dictpp, records } = props;
  const [visible, setVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [type, setType] = useState({});
  const [brabd, setBrand] = useState({});
  useEffect(() => {
    getLimsBasicDict({ current: 1, size: -1, businessType: "5" }).then(
      (res) => {
        let obj = {};
        res.data.records.map((item) => {
          obj[item.basicDictId] = item.name;
        });
        setType(obj);
      }
    );
    getLimsBasicDict({ current: 1, size: -1, businessType: "1" }).then(
      (res) => {
        let obj1 = {};
        res.data.records.map((item) => {
          obj1[item.basicDictId] = item.name;
        });
        setBrand(obj1);
      }
    );
    // console.log("./???", obj, dictpp);
  }, []);

  useEffect(() => {
    // getLimsUselanapplyList({ size: -1, current: 1 }).then((res) => {
    //   setDataSource(res.data.records);
    // });
    props.value && setDataSource(props.value);

    return () => setDataSource([]);
  }, [props.value]);
  const delDataSource = (index) => {
    let list = dataSource;
    list.splice(index, 1);
    setDataSource([...list]);
  };
  const columns = [
    {
      title: "设备编号",
      dataIndex: "deviceNo",
      col: 12,
      sort: 1,
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
      col: 12,
      sort: 2,
    },
    {
      title: "单位",
      dataIndex: "unit",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "5" }}
          storeKey="dw"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
      render: (key) => {
        return type[key];
      },
      col: 12,
      sort: 6,
    },
    {
      title: "规格型号",
      dataIndex: "model",
      col: 12,
      sort: 3,
    },
    {
      title: "品牌",
      dataIndex: "brand",
      // dataIndex: "dictName",
      col: 12,
      sort: 4,
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "1" }}
          storeKey="pp"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
      render: (key) => {
        return brabd[key];
      },
    },
    {
      title: "备注",
      dataIndex: "remark",
      rules: [{ require: false }],
      sort: 7,
      col: 12,
    },
    {
      title: "操作",
      dataIndex: "",
      hidden: true,
      render: (_, row, index) => (
        <a
          onClick={() => {
            delLimsUselanapplyList({ id: row.itemId }).then((res) =>
              delDataSource(index)
            );
          }}
        >
          删除
        </a>
      ),
    },
  ];

  const onFinish = (data) => {
    data = {
      ...data,
      produceDate: moment(data.produceDate).format("YYYY-MM-DD HH:mm:ss"),
    };
    props.onChange([...dataSource, data]);
    setDataSource([...dataSource, data]);
    setVisible(false);
  };

  const formList = [
    ...columns,
    {
      title: "设备分类",
      dataIndex: "categoryId",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDict}
          param={{ current: 1, size: -1, businessType: "4" }}
          storeKey="sbfl"
          labelString="name"
          valueString="basicDictId"
        ></FormSelect>
      ),
      col: 12,
      sort: 5,
    },
  ].sort((a, b) => a.sort - b.sort);

  return (
    <div value={props.value} onChange={() => props.onChange}>
      <Button
        className="child-form-add-button"
        onClick={() => {
          setVisible(true);
        }}
      >
        新增设备
      </Button>
      <Table
        value={dataSource}
        columns={columns}
        dataSource={dataSource}
        rowKey={"id"}
      ></Table>
      <Modal
        visible={visible}
        footer={null}
        onCancel={() => setVisible(false)}
        width="800px"
      >
        <DYForm
          showCancel
          cancelClick={() => setVisible(false)}
          formItem={columnsToForm(formList)}
          buttonText={"保存"}
          onFinish={onFinish}
        ></DYForm>
      </Modal>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    dictpp: state.currency.dictpp,
    dictsbfl: state.currency.dictsbfl,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ChildTable);
