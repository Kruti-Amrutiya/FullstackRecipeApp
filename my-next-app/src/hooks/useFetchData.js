import { showError, showSuccess } from "@/utils/method";
import API_STATUS from "../setup/apiStatus";
import { useEffect, useState } from "react";

const useFetchData = ({
  apiFunction,
  apiParams,
  showErrorMessage,
  errorMessage,
  showSuccessMessage,
  successMessage,
  dependencyArray,
  apiCallCondition,
  successCallback,
  errorCallback,
}) => {
  const [state, setState] = useState({
    isLoading: false,
    isError: false,
    data: [],
  });

  const { isLoading, isError, data } = state;
  useEffect(() => {
    if (apiCallCondition) {
      setState({
        ...state,
        isLoading: true,
      });
      apiFunction(apiParams)
        .then((res) => {
          if (
            res?.ok ||
            res?.status === API_STATUS.SUCCESS ||
            res?.data?.status === API_STATUS.SUCCESS ||
            res?.data?.status_code === API_STATUS.SUCCESS
          ) {
            setState({
              ...state,
              isLoading: false,
              isError: false,
              data: res?.data?.payload || res?.data || {},
            });
            successCallback && successCallback(res?.data?.payload || res?.data || {}, res?.data);
            showSuccessMessage && showSuccess(successMessage || res?.data?.message);
          } else {
            setState({
              ...state,
              isLoading: false,
              isError: true,
              data: [],
            });
            showErrorMessage && showError(errorMessage || res?.data?.message || "");
          }
        })
        .catch((error) => {
          setState({
            ...state,
            isLoading: false,
            isError: true,
            data: [],
          });
          showErrorMessage &&
            showError(
              errorMessage ||
                error?.response?.data?.error?.details?.detail ||
                error?.response?.data?.error?.message ||
                error?.response?.data?.message ||
                error?.message,
            );
          errorCallback && errorCallback(error?.response?.data);
        });
    }
  }, dependencyArray);

  return [{ isLoading, isError, data }];
};

export { useFetchData };
