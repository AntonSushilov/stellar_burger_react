import { useEffect } from "react";
import PropTypes from "prop-types";
import { useMatch, Route, NavLink, Outlet } from "react-router-dom";
import { logoutUser } from "../../services/User/action";
import UserProfile from "../../components/ProfileUser/ProfileUser";
import styles from "./ProfilePage.module.css";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "../../hooks/UseAppDispatch";
import { useLocation } from "react-router";
import ProfileNav from "../../components/ProfileNav/ProfileNav";
import { wsCloseAction, wsConnectAction } from "../../services/ws/action";

const ProfilePage = (): JSX.Element => {
  const accessToken = localStorage.getItem("accessToken")?.split(" ")[1];
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(
      wsConnectAction(`wss://norma.nomoreparties.space/orders?token=${accessToken}`)
    );
    return () => {
      dispatch(wsCloseAction());
    };
  }, [dispatch, accessToken]);
  return (
    <div className={styles.container}>
      <ProfileNav />

      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default ProfilePage;
