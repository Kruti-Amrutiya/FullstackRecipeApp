import { loginUser, registerUser } from "@/api/auth";
import { useFetchData } from "@/hooks/useFetchData";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const useAuthentication = ({ onClose, setUser }) => {
  const [submitData, setSubmitData] = useState({});
  const [loginData, setLoginData] = useState({});
  const router = useRouter();

  const handleRegisterUser = (values) => {
    setSubmitData(values);
  };

  const handleLoginUser = (values) => {
    setLoginData(values);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.replace(router.asPath);
  };

  const successCallback = (data, type) => {
    switch (type) {
      case "register":
        data && onClose();
        data && router.replace(router.asPath);
        break;
      case "login":
        if (data?.token) {
          toast.success("Login successful!");
          setUser(data);
          localStorage.setItem(
            "user",
            JSON.stringify({ token: data.token, username: data.username })
          );
          onClose();
        }
        break;
      default:
        break;
    }
  };

  const errorCallback = (error, type) => {
    switch (type) {
      case "register":
        toast(error?.[0]?.description);
        break;
      default:
        break;
    }
  };

  useFetchData({
    apiFunction: registerUser,
    defaultResponseValue: [],
    dependencyArray: [submitData],
    apiParams: submitData,
    apiCallCondition: Object.keys(submitData)?.length > 0,
    showSuccessMessage: true,
    showErrorMessage: true,
    successCallback: (data) => successCallback(data, "register"),
    errorCallback: (error) => errorCallback(error, "register"),
  });

  useFetchData({
    apiFunction: loginUser,
    defaultResponseValue: [],
    dependencyArray: [loginData],
    apiParams: loginData,
    apiCallCondition: Object.keys(loginData)?.length > 0,
    showSuccessMessage: true,
    showErrorMessage: true,
    successCallback: (data) => successCallback(data, "login"),
    errorCallback: (error) => errorCallback(error, "login"),
  });

  return [{}, { handleRegisterUser, handleLoginUser, handleLogout }];
};

export default useAuthentication;
