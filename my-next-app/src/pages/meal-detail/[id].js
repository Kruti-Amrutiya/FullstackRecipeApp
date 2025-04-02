import React from "react";
import MealDetail from "@/components/recipeDetails/recipeDetails";
import { getMealDetail } from "@/api/meal";
import { Loder } from "@/components/common";

const MealDetailPage = ({ meal }) => {
  return meal ? <MealDetail meal={meal} /> : <Loder />;
};

export default MealDetailPage;

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const { data } = await getMealDetail({ id });
    return {
      props: { meal: data },
    };
  } catch (error) {
    return {
      props: { meal: null },
    };
  }
}
