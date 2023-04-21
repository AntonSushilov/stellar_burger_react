import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import React from "react";

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.userReducer.isAuthChecked);
  const user = useSelector((store) => store.userReducer.user);
  const location = useLocation();
 
  if (!isAuthChecked) {
    // Запрос еще выполняется
    return null; // или прелоадер
  }
  if (onlyUnAuth && user) {
    // Пользователь авторизован, но запрос предназначен только для неавторизованных пользователей
    // Нужно сделать редирект на главную страницу или на тот адрес, что записан в location.state.from
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }
  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user

  return component;
};

ProtectedRoute.propTypes = {
  component: PropTypes.node,
  onlyUnAuth: PropTypes.bool
};


export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);


OnlyUnAuth.propTypes = {
  component: PropTypes.node
};
