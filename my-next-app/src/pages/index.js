import React from "react";
import Head from "next/head";

import RecipeList from "../components/recipeList/recipeList";
import { getMealListing } from "../api/meal";
import Navbar from "@/components/common/navbar";

const Home = ({ recipes }) => {  

  return (
    <>
      <Head>
        <title>Next Recipe App</title>
        <meta name="description" content="Next Recipe App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <div>
        <RecipeList recipes={recipes} />
      </div>
    </>
  );
};

export const getServerSideProps = async () => {
  const { data } = await getMealListing();
  const recipes = data?.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.imageUrl,
    ingredients: item.ingredients,
    instructions: item.instructions,
    category: item.category,
    area: item.area,
    source: item.source,
    link: item.link
  }));

  return {
    props: { recipes },
  };
};

export default Home;
