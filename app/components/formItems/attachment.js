/**上传附件 */
import React, { useEffect } from "react";
import { Upload, Button } from "antd";
import { filterFileList } from "../../utils/common";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "../../redux/actions/aCurrency";

const AttachmentList = (props) => {
  const {
    fileList,
    imageList,
    attachmentList,
    fileLabel = "上传资料",
    imageLabel = "上传凭证",
    disabled,
  } = props;
  const { steUselendFile, steUselendImage } = props.actions;

  useEffect(() => {
    let { file, image } = filterFileList(attachmentList);
    steUselendFile(file);
    steUselendImage(image);
  }, [attachmentList]);
  useEffect(() => {
    return () => {
      steUselendFile([]);
      steUselendImage([]);
    };
  }, []);

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
          {!disabled && (
            <div className="purplist-flex">
              <Button>{fileLabel}</Button>
              <div>.word .xlsx .docx .pdf .doc</div>
            </div>
          )}
        </Upload>
      </div>
      <div>
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
          {!disabled && (
            <div className="purplist-flex">
              <Button>{imageLabel}</Button>
              <div> .jpg .png</div>
            </div>
          )}
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
