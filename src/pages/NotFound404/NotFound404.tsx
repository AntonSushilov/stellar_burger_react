import React from "react";
import { Link } from "react-router-dom";

import styles from "./NotFound404.module.css";

export const NotFound404 = ():JSX.Element => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className="text text_type_main-large">
          Ошибка 404. Страница не найдена
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

export default NotFound404;
