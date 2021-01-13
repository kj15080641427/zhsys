import BaseLayout from "../../components/baseComponent/connectComponents";
import React from "react";
import {
  getDeviceScrap,
  addDeviceScrap,
  // updComplexfound,
  // delComplexfound,
} from "../../request/index";
import { Input } from "antd";
import columnsToFormFlow from "../../utils/common";

const DeviceScrap = (props) => {
  const columns = [
    {
      title: "报废单号",
      dataIndex: "projectName",
    },
    {
      title: "报废时间",
      dataIndex: "projectName",
    },
    {
      title: "业务单号",
      dataIndex: "projectName",
    },
    {
      title: "设备编号",
      dataIndex: "projectName",
    },
    {
      title: "设备名称",
      dataIndex: "projectName",
    },
    {
      title: "设备型号",
      dataIndex: "projectName",
    },

    {
      title: "生产日期",
      dataIndex: "projectName",
    },
    {
      title: "使用寿命",
      dataIndex: "projectName",
    },

    {
      title: "实际使用寿命",
      dataIndex: "projectName",
    },
  ];
  const rowSelect = [
    {
      label: "",
      name: "name",
      element: <Input placeholder="" className=""></Input>,
    },
  ];
  const breadcrumb = [
    {
      name: "首页",
    },
    {
      name: "设备处置",
    },
    {
      name: "设备报废",
    },
  ];
  const formItem = columnsToFormFlow(columns);
  return (
    <>
      <BaseLayout
        get={getDeviceScrap} // 分页查询接口
        add={addDeviceScrap} // 添加数据接口
        // upd={updComplexfound} // 更新数据接口
        // del={delComplexfound} // 删除数据接口
        columns={columns} // 表格配置项
        formItem={formItem} // 表单配置项
        rowSelect={rowSelect} // 查询配置项
        keyId={"id"} // 数据的唯一ID
        storeKey={"deviceType"} // store中的key值. 要与 mapStatetoProps 中的key相同
        formatList={["createDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
      ></BaseLayout>
    </>
  );
};
export default DeviceScrap;
