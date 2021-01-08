import React from "react";
import { Breadcrumb } from "antd";

const RenderBreadcrumb = (props) => {
  const { showForm, breadcrumb, editbreadcrumb } = props;
  return (
    <div className="view-query-breacrumd">
      <Breadcrumb separator=">">
        {!showForm
          ? breadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                onClick={item.click}
                style={{ cursor: item.click ? "pointer" : "" }}
              >
                <span style={{ color: item.color }}>{item.name}</span>
              </Breadcrumb.Item>
            ))
          : editbreadcrumb.map((item) => (
              <Breadcrumb.Item
                key={item.name}
                onClick={item.click}
                style={{ cursor: item.click ? "pointer" : "" }}
              >
                <span style={{ color: item.color }}>{item.name}</span>
              </Breadcrumb.Item>
            ))}
      </Breadcrumb>
    </div>
  );
};
export default RenderBreadcrumb;
