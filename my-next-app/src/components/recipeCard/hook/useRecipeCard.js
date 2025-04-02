import { deleteRecipeDetails } from "@/api/meal";
import { useFetchData } from "@/hooks/useFetchData";
import { useRouter } from "next/router";

const { useState } = require("react");

const useRecipeCard = () => {
  const router = useRouter();

  const [submitData, setSubmitData] = useState(null);

  const handleDelete = (id) => {
    console.log("delete", id);
    setSubmitData(id);
  };

  const successCallback = (data, type) => {
    switch (type) {
      case "deleteRecipeDetails":
        data && router.replace(router.asPath);
        break;
      default:
        break;
    }
  };

  // error callback function
  const errorCallback = (error, type) => {
    switch (type) {
      case "deleteRecipeDetails":
        break;
      default:
        break;
    }
  };

  // delete recipe details api
  const [{ _data, isLoading }] = useFetchData({
    apiFunction: deleteRecipeDetails,
    defaultResponseValue: [],
    dependencyArray: [submitData],
    apiParams: submitData,
    apiCallCondition: submitData,
    showSuccessMessage: true,
    showErrorMessage: true,
    successCallback: (data) => successCallback(data, "deleteRecipeDetails"),
    errorCallback: (error) => errorCallback(error, "deleteRecipeDetails"),
  });

  return [{ isLoading }, { handleDelete }];
};

export default useRecipeCard;
