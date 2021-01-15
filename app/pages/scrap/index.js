import BaseLayout from "../../components/baseComponent/connectComponents";
import React from "react";
import {
  getDeviceScrap,
  addDeviceScrap,
  getLimsBasicDevice,
  // updComplexfound,
  // delComplexfound,
} from "../../request/index";
import { Input, DatePicker } from "antd";
// import { columnsToFormFlow } from "../../utils/common";
// import BaseTable from "../../components/home/baseTable";
// import BaseForm from "../../components/home/baseForm";
import FormSelect from "../../components/formItems/select";
const DeviceScrap = (props) => {
  const columns = [
    {
      title: "报废单号",
      dataIndex: "code",
    },
    {
      title: "报废时间",
      dataIndex: "createDate",
    },
    {
      title: "业务单号",
      dataIndex: "bussineId",
    },
    {
      title: "设备编号",
      dataIndex: "deviceNo",
    },
    {
      title: "设备名称",
      dataIndex: "deviceName",
    },
    {
      title: "设备型号",
      dataIndex: "model",
    },

    {
      title: "生产日期",
      dataIndex: "produceDate",
      ele: (
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%" }}
        ></DatePicker>
      ),
    },
    {
      title: "使用寿命",
      dataIndex: "useLife",
    },

    {
      title: "实际使用寿命",
      dataIndex: "actualUseLife",
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
  const formItem = [
    {
      label: "选择设备",
      name: "deviceId",
      ele: (
        <FormSelect
          style={{ width: "100%" }}
          request={getLimsBasicDevice}
          param={{ current: 1, size: -1, status: "2" }}
          storeKey="sb"
          labelString="deviceName"
          valueString="id"
        ></FormSelect>
      ),
    },
    {
      label: "报废时间",
      name: "createDate",
      ele: (
        <DatePicker
          showTime
          format="YYYY-MM-DD HH:mm:ss"
          style={{ width: "100%" }}
        ></DatePicker>
      ),
    },
    {
      label: "业务单号",
      name: "bussineId",
      ele: <Input></Input>,
    },
    {
      label: "备注说明",
      name: "remark",
      ele: <Input></Input>,
    },
  ];
  return (
    <>
      {/* <BaseTable
        columns={columns}
        get={getDeviceScrap}
        storeKey="deviceScrap"
        rowKey="id"
      ></BaseTable>
      <BaseForm
        formItem={formItem}
        cancelClick={() => {
          console.log(1);
        }}
      /> */}
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
        formatList={["createDate", "produceDate"]} //需要转换时间格式的表单字段
        breadcrumb={breadcrumb} //面包屑
      ></BaseLayout>
    </>
  );
};
export default DeviceScrap;
