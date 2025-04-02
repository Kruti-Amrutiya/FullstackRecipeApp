import React from "react";
import styles from "./content.module.scss";
import ListItem from "../listItem/listItem";

const Content = ({ meal }) => {
  const { instructions, ingredients, source, link } = meal;

  return (
    <>
      <p className={styles.description}>{instructions}</p>
      <ul className={styles.list}>
        <ListItem detail={ingredients} label="Ingredients" />
        <ListItem detail={source} label="Source" link={source}/>
        <ListItem detail={link} label="Youtube" link={link} />
      </ul>
    </>
  );
};

export default Content;
