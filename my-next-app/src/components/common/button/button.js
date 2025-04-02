import { Button } from "antd";

const customButton = ({
  type,
  htmlType,
  buttonText,
  className,
  shape,
  icon,
  href,
  size,
  disabled,
  ghost,
  danger,
  loading,
  onClick,
  block,
  onKeyDown,
}) => {
  return (
    <Button
      type={type || "primary"}
      shape={shape}
      icon={icon}
      href={href}
      ghost={ghost}
      danger={danger}
      htmlType={htmlType}
      loading={loading || false}
      onClick={onClick}
      block={block}
      size={size}
      disabled={disabled}
      className={className}
      onKeyDown={onKeyDown}
    >
      {buttonText}
    </Button>
  );
};

export default customButton;
