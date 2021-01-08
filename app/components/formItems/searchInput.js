import React from "react";
import { Input } from "antd";
import search from "../../resource/搜索.svg";
import "./index.scss";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aFormItems";
import { connect } from "react-redux";

const SearchInput = (props) => {
  const { searchClick, placeholder } = props;
  const { changeSearchInput } = props.actions;
  return (
    <div className="base-rowSelect-flex">
      <Input
        placeholder={placeholder}
        onChange={(e) => {
          changeSearchInput(e.target.value);
        }}
        onPressEnter={searchClick}
        className="base-rowSelect"
      ></Input>
      <div className="base-rowSelect-icon">
        <img src={search} onClick={searchClick}></img>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchInput);
