import { saveRecipeDetails } from "@/api/meal";
import { useFetchData } from "@/hooks/useFetchData";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useRecipeAdd = ({ onClose, recipeFormRef }) => {
  const router = useRouter();
  const [submitData, setSubmitData] = useState(new FormData());
  const [fileList, setFileList] = useState([]);

  // this is used to handle the upload of file
  const handleUploadDocument = (_name, file) => {
    recipeFormRef?.current.setFieldValue("imageUrl", file?.fileList ?? []);
    recipeFormRef?.current.setFieldTouched("imageUrl");
    setFileList(file?.fileList);
    !file?.fileList?.length &&
      (recipeFormRef?.current.setFieldTouched("imageUrl"),
      recipeFormRef?.current?.setFieldValue("imageUrl", []));
  };

  const handleSubmitRecipeForm = (values) => {
    let formData = new FormData();
    console.log("Kruti", formData, values);

    formData.append("title", values?.title);
    formData.append("description", values?.description);
    formData.append("ingredients", values?.ingredients);
    formData.append("instructions", values?.instructions);
    formData.append("category", values?.category?.value);
    formData.append("area", values?.area);
    formData.append("source", values?.source);
    formData.append("link", values?.link);
    if (values?.imageUrl?.[0]?.originFileObj) {
      formData.append("imageFile", values.imageUrl[0].originFileObj);
    } 
    setSubmitData(formData);
    //save(formData);
    };

    for (let [key, value] of submitData?.entries()) {
        console.log(key, value, "LLLLL");
    }

  //const save = async (formData) => {
  //  try {
  //    const response = await fetch(saveRecipeDetails({ formData}), );
  //    if (!response.ok) {
  //      throw new Error("Failed to fetch categories");
  //    }
  //    const data = await response.json();
  //    return data;
  //  } catch (error) {
  //    console.error("Error fetching categories:", error);
  //  }
  //};

  const successCallback = (data, type) => {
    switch (type) {
      case "recipeDetails":
        data && onClose();
        data && router.replace(router.asPath);
        break;
      default:
        break;
    }
  };

  // error callback function
  const errorCallback = (error, type) => {
    switch (type) {
      case "recipeDetails":
        break;
      default:
        break;
    }
    };

  // submit recipe details api
   const [{ _data, isLoading }] = useFetchData({
     apiFunction: saveRecipeDetails,
     defaultResponseValue: [],
     dependencyArray: [submitData],
     apiParams: submitData,
     apiCallCondition: submitData instanceof FormData && submitData.has("imageFile"),
     showSuccessMessage: true,
     showErrorMessage: true,
     successCallback: (data) => successCallback(data, "recipeDetails"),
     errorCallback: (error) => errorCallback(error, "recipeDetails"),
   });

  return [{ fileList }, { handleSubmitRecipeForm, handleUploadDocument }];
};

export default useRecipeAdd;
