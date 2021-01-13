import React from "react";
import { Button } from "antd";

const downloadFile = (url, params, filename) => {
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

export default (props) => {
  const { req, fileName } = props;
  return (
    <Button
      className="base-export-button"
      onClick={() => {
        downloadFile(
          req(),
          {
            current: 1,
            size: 999,
          },
          `${fileName}.xlsx`
        );
      }}
    >
      导出
    </Button>
  );
};
