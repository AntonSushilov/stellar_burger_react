import React from "react";
import PropTypes from "prop-types";
import { useMatch, Route, NavLink, Outlet } from "react-router-dom";
import { logoutUser } from "../../services/User/action";
import UserProfile from "../../components/UserProfile/UserProfile";
import styles from "./ProfilePage.module.css";
import { useDispatch } from "react-redux";

const ProfilePage = (props) => {
  const dispath = useDispatch()
  const logout = () => {
    dispath(logoutUser())
  }
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.nav_menu}>
          <NavLink
            to="/profile/"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <p className="text text_type_main-large">Профиль</p>
          </NavLink>
          <NavLink
            to="/profile/orders"
            className={({ isActive }) =>
              isActive ? "" : "text_color_inactive"
            }
          >
            <p className="text text_type_main-large">История заказов</p>
          </NavLink>

          <p className={`${"text text_type_main-large text_color_inactive"} ${styles.logout}`} onClick={logout}>Выход</p>
          <div className={styles.info}>
            <p className="text text_type_main-default text_color_inactive">
              В этом разделе вы можете<br></br> изменить свои персональные
              данные
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

ProfilePage.propTypes = {};

export default ProfilePage;
