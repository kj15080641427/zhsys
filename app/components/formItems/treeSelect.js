import React, { useState } from "react";
import { TreeSelect } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
let key = "";

const FormTreeSelect = (props) => {
  const [value, setValue] = useState();
  const {
    placeholderInfo,
    treeDefaultExpandAll = true,
    onChange,
    treeData,

    storeKey,
  } = props;
  key = storeKey;
  const myOnchange = (value) => {
    setValue(value);
  };
  return (
    <TreeSelect
      treeCheckable
      showSearch
      style={{ width: "100%" }}
      value={value}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder={placeholderInfo}
      allowClear
      multiple
      treeDefaultExpandAll={treeDefaultExpandAll}
      onChange={onChange || myOnchange}
      treeData={treeData}
    ></TreeSelect>
  );
};

const mapStateToProps = (state) => {
  return {
    [key]: state.currency[key],
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormTreeSelect);
