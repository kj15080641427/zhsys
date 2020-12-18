import React, { useEffect } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
const { Option } = Select;

let key = "";
const FormSelect = (props) => {
  const {
    request,
    storeKey,
    param = { current: 1, size: -1 },
    valueString,
    labelString,

    value,
    onChange,
  } = props;
  const { getBase } = props.actions;

  useEffect(() => {
    key = storeKey;
    getBase({
      request: request,
      key: storeKey,
      param: param,
    });
  }, []);
  return (
    <Select
      disabled={props.disabled}
      style={{ width: "200px" }}
      onChange={(e) => onChange(e)}
      value={value}
    >
      {props[storeKey]?.records?.map((item) => {
        return (
          <Option key={item[valueString]} value={item[valueString]}>
            {item[labelString]}
          </Option>
        );
      })}
    </Select>
  );
};
const mapStateToProps = (state) => {
  return {
    [key]: state.currency[key],
    user: state.currency.user,
    userCompany: state.currency.userCompany,
    deviceType: state.currency.deviceType,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSelect);
