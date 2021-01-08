import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aFormItems";
import { connect } from "react-redux";
import { Timeline } from "antd";

const Flow = (props) => {
  const { code = 10001, taskInfo, flowNode } = props;
  const { getFlow } = props.actions;

  useEffect(() => {
    getFlow({
      code: code,
      size: 1,
      current: 1,
    });
  }, [taskInfo]);

  return (
    <div>
      <Timeline>
        {flowNode?.limsActivitiexamineList?.map((item, index) => {
          let step = taskInfo?.activitiDOList&&taskInfo?.activitiDOList[index];
          return (
            <Timeline.Item key={item.id} color={step?'blue':'#A29FA3'}>
              <div>
                {item.remark} {step?.realName}
              </div>
              <div>{step?.fullMessage && `审批意见:${step?.fullMessage}`}</div>
              <div>
                {step?.activityName == "EndEvent"
                  ? "结束时间:"
                  : step?.activityName == "StartEvent"
                  ? "开始时间:"
                  : step
                  ? "审核时间:"
                  : ""}
                {step && step?.time}
              </div>
            </Timeline.Item>
          );
        })}
        {/* {taskInfo?.activitiDOList?.map((item) => {
          return (
            <Timeline.Item key={item.activityId} dot={""}>
              <div className="flow-timeline">
                <div>
                  {item.realName && (
                    <div>
                      {item.activityName}:{item.realName}
                    </div>
                  )}
                  <div>
                    {item.fullMessage && `审批意见:${item.fullMessage}`}
                  </div>
                </div>
                <div className="flow-timeline-date">
                  {item.activityName == "EndEvent"
                    ? "结束时间"
                    : item.activityName == "StartEvent"
                    ? "开始时间"
                    : "审核时间"}
                  :{item.time}
                </div>
              </div>
            </Timeline.Item>
          );
        })} */}
      </Timeline>
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    flowNode: state.formItems.flowNode,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Flow);
