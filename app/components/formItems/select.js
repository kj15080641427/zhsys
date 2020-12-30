import React, { useEffect } from "react";
import { Select } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";
import { getUserCompany, getLimsBasiccategory } from "../../request/index";

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
  const { getBase } = props?.actions;

  useEffect(() => {
    key = `dict${storeKey}`;
    // if (!props[`dict${storeKey}`]) {
    getBase({
      request: request,
      key: `dict${storeKey}`,
      param: param,
    });
    // }
  }, []);
  return (
    <Select
      disabled={props.disabled}
      style={{ width: "200px" }}
      onChange={(e) => onChange(e)}
      value={value}
    >
      {props[`dict${storeKey}`]?.records?.map((item) => {
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
    dictuser: state.currency.dictuser,
    dictuserCompany: state.currency.dictuserCompany,
    dictdeviceType: state.currency.dictdeviceType,
    dictsupplier: state.currency.dictsupplier,
    dictuseLend: state.currency.dictuseLend,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSelect);
// export const Company = () => (
//   <FormSelect
//     request={getUserCompany}
//     storeKey="userCompany"
//     labelString="name"
//     valueString="id"
//   ></FormSelect>
// );
// export const Category = () => (
//   <FormSelect
//     request={getLimsBasiccategory}
//     storeKey="deviceType"
//     labelString="name"
//     valueString="id"
//   ></FormSelect>
// );
