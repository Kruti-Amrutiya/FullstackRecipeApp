import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "./recipeCard.module.scss";
import { Button } from "../common";
import useRecipeCard from "./hook/useRecipeCard";

const RecipeCard = ({ recipe }) => {
  const shortInstructions =
    recipe.description?.length > 50
      ? `${recipe.description?.substring(0, 50)}...`
      : recipe.description;

  const [loading, setLoading] = useState(true);

  const [{ isDeleting }, { handleDelete }] = useRecipeCard();

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={recipe.imageUrl}
          alt={recipe.imageUrl}
          width={700}
          height={700}
          onLoad={() => setLoading(false)}
          style={{
            opacity: loading ? 0 : 1,
            transition: "opacity 0.3s ease-in-out",
          }}
          unoptimized
        />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{recipe.title}</div>
        <div className={styles.description}>{shortInstructions}</div>
        <div className={styles.category}>
          {recipe.category}-{recipe.area}
        </div>
        <Link
          className={`${styles.button} ${styles.smallButton} ${styles.viewButton}`}
          href={`/meal-detail/${recipe.id}`}
        >
          View Details
        </Link>
        <br></br>
        <Button
          className={`${styles.button} ${styles.smallButton} ${styles.deleteButton}`}
          onClick={() => handleDelete(recipe.id)}
          disabled={isDeleting}
          loading={isDeleting}
          buttonText="Delete Recipe"
        />
      </div>
    </div>
  );
};

export default RecipeCard;
