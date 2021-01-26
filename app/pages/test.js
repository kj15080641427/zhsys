import React from "react";
// import BaseTable from "../components/home/baseTable";
import SearchTree from "../components/formItems/tree";
import { getLimsBasicDict } from "../request/index";

export default () => {
  return (
    <>
      <SearchTree></SearchTree>
      {/* <BaseTable
        get={getLimsBasicDict}
        storeKey="test"
        columns={[{ title: "名称", dataIndex: "businessName" }]}
      ></BaseTable> */}
    </>
  );
};
