import React, { useEffect } from "react";
import { Table } from "antd";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import { connect } from "react-redux";
let storeLabel = "jurisdiction";
const ReadOnlyTable = (props) => {
  const { columns, get, storeKey, param, rowSelection, rowKey } = props;
  storeLabel = storeKey;
  useEffect(() => {
    props.actions.getBase({
      request: get,
      key: storeKey,
      param: param,
    });
  }, []);
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={props[storeLabel]?.records}
        rowKey={rowKey}
      ></Table>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    [storeLabel]: state.currency[storeLabel],
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReadOnlyTable);
