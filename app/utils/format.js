//格式化附件上传格式
export const formatAttachment = (data, id) => {
  return data.map((item) => ({
    // businessId: id,
    businessType: "1",
    fileName: item.name,
    filePath: item?.response?.data || item.url,
    fileType: item.type,
    smallFilePath: item?.response?.data || item.url,
    title: item.name.split(".")[0],
  }));
};
