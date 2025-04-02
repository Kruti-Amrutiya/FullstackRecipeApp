import React from "react";
import { useRouter } from "next/router";
import styles from "./recipeDetails.module.scss";
import IconArrowLeft from "@/assets/icons/icon";
import Header from "./components/header/header";
import Content from "./components/content/content";

const MealDetail = ({ meal }) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className={styles.container}>
      <div>
        <button className={styles.back} onClick={handleGoBack}>
          <IconArrowLeft />
          <span>Back to Recipes</span>
        </button>
        <Header meal={meal} />
        <Content meal={meal} />
      </div>
    </div>
  );
};

export default MealDetail;
