import React from "react";
import PropTypes from "prop-types";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import NavItem from "./NavItem/NavItem";
import styles from "./AppHeader.module.css";

const AppHeader = (props) => {
  return (
    <header className={styles.header}>
      <nav className={styles.container}>
        <section className={styles.section_left}>
          <NavItem>
            <BurgerIcon type="primary" />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavItem>
          <NavItem>
            <ListIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
              Лента заказов
            </p>
          </NavItem>
        </section>
        <section className={styles.section_center}>
          <Logo />
        </section>
        <section className={styles.section_right}>
          <NavItem>
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default text_color_inactive ml-2">
              Личный кабинет
            </p>
          </NavItem>
        </section>
      </nav>
    </header>
  );
};

export default AppHeader;
