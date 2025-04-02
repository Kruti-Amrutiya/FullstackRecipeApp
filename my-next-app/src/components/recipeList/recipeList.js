import React, { useEffect, useState } from "react";
import RecipeCard from "../recipeCard/recipeCard";
import styles from "./recipeList.module.scss";
import RecipeForm from "../recipeForm/recipeForm";
import { Button } from "../common";
import { getMealSearch } from "../../api/meal";

const RecipeList = ({ recipes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [meals, setMeals] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      try {
        if (searchTerm) {
          const { data } = await getMealSearch({ searchTerm });
          setMeals(data || []);
        } else {
          setMeals([]);
        }
      } catch (error) {
        console.error(error);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm]);

  return (
    <div className={styles.container}>
      <div className={styles.searchContainer}>
        <input
          className={styles.input}
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          placeholder="Search meals..."
        />
        <Button
          htmlType="primary"
          type="button"
          buttonText="Add Recipe"
          size="large"
          className={styles.button}
          onClick={() => {
            setIsFormOpen(true);
          }}
        />
      </div>
      {isFormOpen && (
        <RecipeForm
          onClose={() => {
            setIsFormOpen(false);
          }}
          isFormOpen={isFormOpen}
        />
      )}
      <div className={styles.cards}>
        {!meals?.length > 0 && searchTerm ? (
          <div className={styles.noResults}>
            <h2>No recipes found for "{searchTerm}"</h2>
            <p>Try searching for another dish or add a new recipe!</p>
          </div>
        ) : (
          recipes?.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        )}
      </div>
    </div>
  );
};

export default RecipeList;
