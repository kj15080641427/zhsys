import React from "react";
import { message, Input } from "antd";
import { createHashHistory } from "history";

const hashHistory = createHashHistory();

const isV2 = 0;
export const URL = isV2 ? "/api" : "/api";

export function fetchJSONData(method, url, data) {
  // url = URL + url;
  return fetch(url, {
    method: method,
    credentials: "include",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    // 注意 post 时候参数的形式
    body: data ? JSON.stringify(data) : null,
  }).then((res) => {
    if (res.status == 500) {
      message.error("网络请求失败,500");
    }
    if (res.status == 400) {
      hashHistory.push("/login");
    }
    if (res.status == "404") {
      message.error("网络请求失败,404");
    }
    if (res.status == 504) {
      message.error("网络请求失败");
    }
    if (url === "/api/users/login") {
      return res.ok ? res : Promise.reject("接口出错");
    } else {
      return res.ok ? res.json() : Promise.reject("接口出错");
    }
  });
}
export const columnsToForm = (columns) => {
  const filterColumns = columns.filter((item) => !item.hidden);
  const formItem = filterColumns.map((item) => {
    return {
      label: item.title,
      name: item.formDataIndex || item.dataIndex,
      rules: item.rules || [{ required: true }],
      ele: item.ele || <Input></Input>,
      width: item.formWidth,
      col: item.col,
      labelCol: item.labelCol,
      labelName: item.labelName,
    };
  });
  return formItem;
};

export const columnsToFormFlow = (columns) => {
  const filterColumns = columns.filter((item) => !item.hidden);
  const formItem = filterColumns.map((item) => {
    return {
      label: item.title,
      name: item.formDataIndex || item.dataIndex,
      require: item.require,
      ele: item.ele || <Input style={{ width: "100%" }}></Input>,
      width: item.formWidth,
      col: item.col,
      labelCol: item.labelCol,
    };
  });
  return formItem;
};
export const filterFileList = (data) => {
  let file = [];
  let image = [];
  data?.map((item, index) => {
    let type = item.fileName.split(".");
    if (type[1] == "jpg" || type[1] == "png") {
      item.filePath &&
        image.push({
          uid: index,
          name: item.fileName,
          status: "done",
          url: item.filePath,
        });
    } else {
      item.filePath &&
        file.push({
          uid: index,
          name: item.fileName,
          status: "done",
          url: item.filePath,
        });
    }
  });
  return { file: file, image: image };
};

export const downloadFile = (url, params, filename) => {
  fetch(url, {
    method: "post",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(params),
  })
    .then((response) => {
      return response.blob();
    })
    .then((blob) => {
      const link = document.createElement("a");
      link.style.display = "none";
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    });
};
