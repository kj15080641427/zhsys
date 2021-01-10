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
      style={{ width: "100%" }}
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
    [`dict${key}`]: state.currency[`dict${key}`],
    dictuser: state.currency.dictuser,
    dictuserCompany: state.currency.dictuserCompany,
    dictdeviceType: state.currency.dictdeviceType,
    dictsupplier: state.currency.dictsupplier,
    dictuseLend: state.currency.dictuseLend,
    dictsglx: state.currency.dictsglx, //申购类型
    dictpp: state.currency.dictpp, //品牌
    dictdw: state.currency.dictdw, //单位（个，台）
    dictsbfl: state.currency.dictsbfl, //设备分类
    dictcomplexfund: state.currency.dictcomplexfund,//年度经费
    dictjclx: state.currency.dictjclx,//借出类型
    dictghsh: state.currency.dictghsh,//业务类型 : 归还损坏
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FormSelect);
