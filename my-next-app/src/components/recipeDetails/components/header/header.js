import React from "react";
import Image from "next/image";
import styles from "./header.module.scss";
import ListItem from "../listItem/listItem";

const Header = ({ meal }) => {
  const { title, description, area, category, imageUrl } = meal;

  return (
    <div className={styles.container}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{title}</h1>
        <div>
          <ListItem detail={category} label="Category" />
          <ListItem detail={area} label="Area" />
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <Image
          layout="fill"
          objectFit="cover"
          src={imageUrl}
          alt={imageUrl}
        />
      </div>
    </div>
  );
};

export default Header;
