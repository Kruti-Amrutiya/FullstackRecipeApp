import { DeleteOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import "./fileUpload.module.scss";
import { showError } from "@/utils/method";

const CustomControlledFileUpload = ({
  onChange,
  acceptFileData,
  size = "small",
  icon,
  label,
  onRemove,
  disabled,
  name,
  maxCount,
  onBlur = () => {},
  error,
  multiple = false,
  showUploadList = true,
  isLoading = false,
  className,
  fileUploadClass,
  fileList,
  onDownload,
  showRemoveIcon = false,
  showDownloadIcon = false,
  acceptFileType,
  isRequired = false,
  showErrorMessage = false,
  placeholder = "Upload",
  directory,
  previewFile,
  defaultFileList,
  showFieldError,
  listType,
}) => {
  const beforeUpload = (file) => {
    const isValid = acceptFileType.includes(file?.type);
    if (!isValid) {
      showError(`${file.name} is not a valid file`);
      return Upload.LIST_IGNORE;
    }
    return false;
  };
  return (
    <div
      className={`custom-select-box ${
        showFieldError && error ? "error-border-range" : ""
      }`}
    >
      {label && (
        <span>
          {isRequired && <span className="required">* </span>}
          {label}
        </span>
      )}
      <Upload
        accept={acceptFileData}
        className={fileUploadClass}
        name={name}
        size={size}
        onRemove={onRemove}
        defaultFileList={defaultFileList}
        onChange={(file) => {
          let fieldName = name;
          onChange(name, file, fieldName);
          onBlur();
        }}
        progress={{
          strokeColor: {
            "0%": "#108ee9",
            "100%": "#87d068",
          },
          strokeWidth: 3,
          format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        }}
        directory={directory}
        beforeUpload={beforeUpload}
        onDownload={onDownload}
        fileList={fileList}
        maxCount={maxCount}
        listType={listType}
        multiple={multiple}
        previewFile={previewFile}
        disableRemove
        showUploadList={
          showUploadList && {
            showDownloadIcon: showDownloadIcon,
            downloadIcon: <DownloadOutlined />,
            showRemoveIcon: showRemoveIcon,
            removeIcon: <DeleteOutlined className="cursor-not-allowed" />,
          }
        }
      >
        <Button
          loading={isLoading}
          icon={icon}
          size={size}
          disabled={disabled}
          className={className}
        >
          {placeholder}
        </Button>
      </Upload>
      {showFieldError && error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default CustomControlledFileUpload;
