import React from "react";
import PropTypes from "prop-types";
import { useMatch, Route, NavLink, Outlet } from "react-router-dom";
import { logoutUser } from "../../services/User/action";
import UserProfile from "../../components/UserProfile/UserProfile";
import styles from "./ProfilePage.module.css";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useLocation } from "react-router";

const ProfilePage = (): JSX.Element => {
  const dispath = useAppDispatch();
  const logout = () => {
    dispath(logoutUser());
  };
  const location = useLocation();
  console.log();
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.nav_menu}>
          <NavLink
            to="/profile"
            className={
              location.pathname === "/profile"
                ? ""
                : "text_color_inactive"
            }
          >
            <p className="text text_type_main-medium">Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={ location.pathname === "/profile/orders"
            ? ""
            : "text_color_inactive"
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
                  В этом разделе вы можете<br></br>изменить свои персональные
                  данные
                </>
              ) : location.pathname === "/profile/orders" ? (
                <>
                  В этом разделе вы можете<br></br>посмотреть свою историю
                  заказов
                </>
              ) : (
                <></>
              )}
            </p>
          </div>
        </div>
        <div className={styles.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
