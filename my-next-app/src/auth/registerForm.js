import React, { useState } from "react";
import styles from "./auth.module.scss";
import { Button, Input } from "@/components/common";
import { Formik } from "formik";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";

const RegisterForm = ({ onClose, authRef, handleRegisterUser }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const getInitialState = () => {
    const data = {
      username: "",
      email: "",
      password: "",
    };
    return {
      ...data,
    };
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.authModal}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <h2 className={styles.authTitle}>Register</h2>
        <Formik
          initialValues={getInitialState()}
          enableReinitialize
          innerRef={authRef}
          onSubmit={(values) => {
            handleRegisterUser(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            setFieldValue,
            setFieldTouched,
            handleSubmit,
            setFieldError,
            handleChange,
          }) => (
            <div>
              <form onSubmit={handleSubmit}>
              <Input
                  type={"text"}
                  size="large"
                  value={values?.username}
                  name="username"
                  placeholder="Username"
                  onChange={(e) => {
                    setFieldValue("username", e?.target?.value).then(() => {
                      setFieldTouched("username");
                    });
                  }}
                  showError={errors?.username && touched?.username}
                  error={errors?.username}
                  className={styles.input}
                  prefix={<UserOutlined />}
                />
                <Input
                  type={"text"}
                  size="large"
                  value={values?.email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => {
                    setFieldValue("email", e?.target?.value).then(() => {
                      setFieldTouched("email");
                    });
                  }}
                  showError={errors?.email && touched?.email}
                  error={errors?.email}
                  className={styles.input}
                  prefix={<MailOutlined />}
                />
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  size="large"
                  value={values?.password}
                  name="password"
                  placeholder="password"
                  onChange={(e) => {
                    setFieldValue("password", e?.target?.value).then(() => {
                      setFieldTouched("password");
                    });
                  }}
                  showError={errors?.password && touched?.password}
                  error={errors?.password}
                  className={styles.input}
                  prefix={<LockOutlined />}
                  onPaste={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  onCopy={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                  suffix={
                    isPasswordVisible ? (
                      <EyeInvisibleOutlined
                        className={styles.eyeIcon}
                        onClick={() => setIsPasswordVisible(false)}
                      />
                    ) : (
                      <EyeOutlined
                        className={styles.eyeIcon}
                        onClick={() => setIsPasswordVisible(true)}
                      />
                    )
                  }
                />
                <Button
                  className={`${styles.primaryButton} ${styles.registerButton}`}
                  buttonText="Register"
                  htmlType="submit"
                  type="submit"
                />
                <Button
                  className={styles.cancelButton}
                  onClick={onClose}
                  buttonText="Cancel"
                />
              </form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default RegisterForm;
