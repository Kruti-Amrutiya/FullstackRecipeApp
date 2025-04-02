import Select from "react-select";
import styles from "./dropdown.module.scss";

// const style = {
//   control: (base) => ({
//     ...base,
//     // This line disable the blue border
//     boxShadow: "none",
//     cursor: "pointer",
//   }),
//   menu: (provided) => ({ ...provided, zIndex: 3 }),
//   container: (base) => ({
//     ...base,
//     flex: 1,
//   }),
// };

const style = {
  control: (base, state) => ({
    ...base,
    boxShadow: "none",
    cursor: "pointer",
    height: "46px",
    border: state.selectProps.showError
      ? "2px solid red"
      : state.isFocused
      ? "2px solid #105e9f"
      : "1px solid #d9d9d9",
    transition: "border 0.3s ease",
    "&:hover": {
      border: state.selectProps.showError
        ? "2px solid red"
        : "1px solid #105e9f",
    },
  }),
  menu: (provided) => ({ ...provided, zIndex: 3 }),
  container: (base) => ({
    ...base,
    flex: 1,
  }),
};

const CustomDropdown = ({
  className,
  isDisabled,
  label,
  isRequired,
  isLoading,
  isClearable,
  isSearchable,
  options,
  placeholder,
  defaultValue,
  isMulti,
  name,
  onChange,
  showError,
  error,
  value,
  getOptionLabel,
  getOptionValue,
  onBlur,
  onMenuOpen,
  closeMenuOnSelect,
  menuPlacement,
  menuPortalTarget,
}) => {
  return (
    <>
      <div
        className={`${styles["custom-dropdown custom-select-box"]} ${
          showError && error ? styles["error-border"] : ""
        }`}
      >
        {label && (
          <label>
            {isRequired && <span className={styles.required}>*</span>}
            {label}
          </label>
        )}
        <Select
          className={className}
          isDisabled={isDisabled}
          isLoading={isLoading}
          value={value}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
          placeholder={placeholder}
          isClearable={isClearable}
          isSearchable={isSearchable}
          isMulti={isMulti}
          options={options}
          defaultValue={defaultValue}
          closeMenuOnSelect={closeMenuOnSelect}
          name={name}
          menuPlacement={menuPlacement}
          menuPortalTarget={menuPortalTarget}
          onMenuOpen={onMenuOpen}
          onChange={onChange}
          onBlur={onBlur}
          styles={style}
          showError={showError && error} // Pass showError to styles
          theme={(theme) => ({
            ...theme,
            colors: {
              ...theme.colors,
              primary25: "#f2f4f8",
              primary: "#105E9F",
            },
          })}
        />
        {showError && error && (
          <span className={styles["error-text"]}>{error}</span>
        )}
      </div>
    </>
  );
};

export default CustomDropdown;
