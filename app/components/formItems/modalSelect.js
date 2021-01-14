import React, { useState, useEffect } from "react";
import { Modal, Button, Table, Radio } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aFormItems";
import { connect } from "react-redux";
import SearchInput from "./searchInput";

const ModalSelect = (props) => {
  const {
    buttonText,
    columns,
    modelWidth = "1200px",
    req,
    storeKey,
    dataSource,
    list = [],
    dislist = [],
    rowKey = "id",
    code,
    param,
    value,
    onChange,
    getActions,
    setActions,
  } = props;
  const { modelRecords, searchInput } = props;
  const { getModalSelect, setModalRecords } = props.actions;
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState();
  const [radio, setRadio] = useState("0");

  useEffect(() => {
    //获取列表
    getModalSelect({
      request: req,
      key: storeKey,
      param: param,
    });
    return () => {
      setActions([]);
    };
  }, []);

  useEffect(() => {
    return () => {
      setModalRecords(null);
    };
  }, []);

  useEffect(() => {
    if (props.value) {
      let list = dataSource?.filter((item) => item.id == value);
      list && setModalRecords(list[0]);
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
          getActions({ id: selected.id });
          // getPurpList({ id: selected.id });
        }}
      >
        <div className="modal-select-flex">
          <Radio.Group
            onChange={(e) => {
              setRadio(e.target.value);
            }}
            value={radio}
          >
            <Radio.Button value="0">待购置</Radio.Button>
            <Radio.Button value="1">已购置</Radio.Button>
          </Radio.Group>
          <div className="modal-select-margin">
            <SearchInput
              placeholder="查询单号"
              searchClick={() => {
                getModalSelect({
                  request: req,
                  key: storeKey,
                  param: { ...param, code: searchInput },
                });
              }}
            />
          </div>
        </div>
        {radio == "0" ? (
          <Table
            columns={columns}
            rowSelection={{
              type: "radio",
              onChange: (_, row) => setSelected(row[0]),
            }}
            rowKey={rowKey}
            dataSource={dislist}
          />
        ) : (
          <Table columns={columns} rowKey={rowKey} dataSource={list} />
        )}
      </Modal>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modelRecords: state.formItems.modelRecords,
    searchInput: state.formItems.searchInput,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalSelect);
