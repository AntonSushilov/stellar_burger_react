import React, { useEffect, useState, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { logoutUser } from "../../services/User/action";
import styles from "./ProfileNav.module.css";


const ProfileNav = () => {
  const location = useLocation();
  const dispath = useAppDispatch();
  const logout = () => {
    dispath(logoutUser());
  };
  return (
    <div className={styles.nav_menu}>
      <NavLink
        to="/profile"
        className={
          location.pathname === "/profile" ? "" : "text_color_inactive"
        }
      >
        <p className="text text_type_main-medium">Профиль</p>
      </NavLink>
      <NavLink
        to="/profile/orders"
        className={
          location.pathname === "/profile/orders" ? "" : "text_color_inactive"
        }
      >
        <p className="text text_type_main-medium">История заказов</p>
      </NavLink>

      <p
        className={`${"text text_type_main-medium text_color_inactive"} ${
          styles.logout
        }`}
        onClick={logout}
      >
        Выход
      </p>
      <div className={styles.info}>
        <p className="text text_type_main-default text_color_inactive">
          {location.pathname === "/profile" ? (
            <>
              В этом разделе вы можете<br></br>изменить свои персональные данные
            </>
          ) : location.pathname === "/profile/orders" ? (
            <>
              В этом разделе вы можете<br></br>посмотреть свою историю заказов
            </>
          ) : (
            <></>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProfileNav;
