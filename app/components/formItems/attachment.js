import React, { useEffect } from "react";
import { Upload, Button } from "antd";
import { filterFileList } from "../../utils/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";

const AttachmentList = (props) => {
  const { fileList, imageList, attachmentList } = props;
  const { steUselendFile, steUselendImage } = props.actions;

  useEffect(() => {
    let { file, image } = filterFileList(attachmentList);
    steUselendFile(file);
    steUselendImage(image);
    return () => {
      steUselendFile([]);
      steUselendImage([]);
    };
  }, [attachmentList]);

  return (
    <div className="purplist-upload-box">
      <div className="purplist-upload-left">
        <Upload
          accept=".word,.xlsx,.docx,.pdf,.doc"
          action="http://47.115.10.75:9011/api/file/all/upload"
          multiple
          fileList={fileList}
          onRemove={(file) => {
            steUselendFile(fileList.filter((v) => v.url !== file.url));
          }}
          onChange={(fileInfo) => {
            steUselendFile(fileInfo.fileList);
          }}
        >
          <div className="purplist-flex">
            <Button className="pruplist-upload-excel">上传购置资料</Button>
            <div>.word .xlsx .docx .pdf .doc</div>
          </div>
        </Upload>
      </div>
      <div className="purplist-upload-right">
        <Upload
          accept=".jpg,.png"
          action="http://47.115.10.75:9011/api/file/all/upload"
          multiple
          listType="picture"
          fileList={imageList}
          onRemove={(file) => {
            steUselendImage(imageList.filter((v) => v.url !== file.url));
          }}
          onChange={(fileInfo) => {
            steUselendImage(fileInfo.fileList);
          }}
        >
          <div className="purplist-flex">
            <Button className="purplist-upload-image">上传购置凭证</Button>
            <div> .jpg .png</div>
          </div>
        </Upload>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    imageList: state.currency.imageList,
    fileList: state.currency.fileList,
    attachmentList: state.currency.attachmentList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AttachmentList);
