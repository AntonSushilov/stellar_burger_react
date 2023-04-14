import React from "react";
import { Link } from "react-router-dom";

import styles from "./FeedPage.module.css";

export const FeedPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className="text text_type_main-large">
          В разработке
        </p>
        <br />

        <Link to="/">
          <p className="text text_type_main-default text_color_inactive">
            Перейти на главную
          </p>
        </Link>
      </div>
    </div>
  );
};

export default FeedPage;
