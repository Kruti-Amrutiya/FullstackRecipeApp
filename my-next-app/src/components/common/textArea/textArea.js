import { Input } from "antd";
import styles from "../input/input.module.scss";

const CustomControlledTextArea = ({
  name,
  label,
  className,
  allowClear,
  autoSize,
  bordered,
  defaultValue,
  maxLength,
  showCount,
  value,
  onPressEnter,
  onResize,
  showError,
  error,
  status,
  isRequired,
  placeholder,
  disabled,
  onChange,
  onBlur,
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
      <Input.TextArea
        className={className}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        autoSize={autoSize}
        bordered={bordered}
        defaultValue={defaultValue}
        maxLength={maxLength}
        showCount={showCount}
        onResize={onResize}
        disabled={disabled}
        onBlur={onBlur}
        allowClear={allowClear}
        onPressEnter={onPressEnter}
      />
      {showError && error && (
        <span className={styles["error-text"]}>{error}</span>
      )}
      {!error && status && (
        <span className={styles["error-text"]}>{error}</span>
      )}
    </div>
  );
};

export default CustomControlledTextArea;
