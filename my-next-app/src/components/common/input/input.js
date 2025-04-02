import { Input } from "antd";
import styles from "./input.module.scss";

const CustomControlledInput = ({
  type,
  size,
  label,
  scroll,
  value,
  onBlur = () => {},
  onPressEnter = () => {},
  onChange,
  name,
  placeholder,
  disabled,
  showError,
  error,
  isRequired = false,
  allowClear,
  prefix,
  className,
  status,
  readOnly,
  onCopy = () => {},
  onPaste = () => {},
  suffix
}) => {
  return (
    <div
      className={`${styles["custom-select-box"]} ${
        showError ? styles["error-border"] : ""
      }`}
    >
      {label && (
        <label>
          {isRequired && <span className={styles.required}>* </span>}
          {label}
        </label>
      )}
      <Input
        placeholder={placeholder}
        type={type}
        size={size}
        label={label}
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        readOnly={readOnly}
        onBlur={onBlur}
        allowClear={allowClear}
        prefix={prefix}
        autoComplete={"off"}
        onPressEnter={onPressEnter}
        className={className}
        onCopy={onCopy}
        onPaste={onPaste}
        suffix={suffix}
      />
      {showError && error && (
        <span className={styles["error-text"]}>{error}</span>
      )}
      {!error && status && (
        <span className={styles["error-text"]}>{status}</span>
      )}
    </div>
  );
};

export default CustomControlledInput;
