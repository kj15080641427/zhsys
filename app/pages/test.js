import React from "react";
import BaseTable from "../components/home/baseTable";
import { getLimsBasicDict } from "../request/index";

export default () => {
  return (
    <>
      <BaseTable
        get={getLimsBasicDict}
        storeKey="test"
        columns={[{ title: "名称", dataIndex: "businessName" }]}
      ></BaseTable>
    </>
  );
};
