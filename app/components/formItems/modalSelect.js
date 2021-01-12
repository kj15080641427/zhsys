import React, { useState, useEffect } from "react";
import { Modal, Button, Table } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aFormItems";
import { connect } from "react-redux";

const ModalSelect = (props) => {
  const {
    buttonText,
    columns,
    modelWidth = "1000px",
    req,
    storeKey,
    dataSource,
    rowKey = "id",
    code,

    value,
    onChange,
  } = props;
  const { modelRecords } = props;
  const {
    getModalSelect,
    setModalRecords,
    getPurpList,
    setPurpList,
  } = props.actions;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();

  useEffect(() => {
    //获取列表
    getModalSelect({
      request: req,
      key: storeKey,
    });
    return () => {
      setPurpList([]);
    };
  }, []);

  // useEffect(() => {
  //   modelRecords && getPurpList({ id: modelRecords.id });
  //   // getBase({
  //   //   request: getLimsUselanapplyById,
  //   //   key: "purpDetail",
  //   //   param: {
  //   //     id: modelRecords.id,
  //   //   },
  //   // });
  // }, [modelRecords]);

  useEffect(() => {
    return () => {
      setModalRecords(null);
    };
  }, []);

  useEffect(() => {
    if (props.value) {
      let list = dataSource.filter((item) => item.id == value);
      setModalRecords(list[0]);
    }
  }, [props.value]);

  return (
    <div value={value} onChange={() => onChange}>
      {modelRecords ? (
        <Button onClick={() => setVisible(true)}>{modelRecords[code]}</Button>
      ) : (
        <Button onClick={() => setVisible(true)}>{buttonText}</Button>
      )}
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        width={modelWidth}
        onOk={() => {
          setVisible(false);
          setModalRecords(selected);
          onChange(selected?.id);
          getPurpList({ id: selected.id });
        }}
      >
        <Table
          columns={columns}
          rowSelection={{
            type: "radio",
            onChange: (_, row) => setSelected(row[0]),
          }}
          rowKey={rowKey}
          dataSource={dataSource}
        />
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modelRecords: state.formItems.modelRecords,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelect);
