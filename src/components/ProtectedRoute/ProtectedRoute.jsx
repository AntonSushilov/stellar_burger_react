import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import React from "react";

const ProtectedRoute = ({ onlyUnAuth = false, component }) => {
  const isAuthChecked = useSelector((store) => store.userReducer.isAuthChecked);
  const user = useSelector((store) => store.userReducer.user);
  const location = useLocation();
 
  console.log(isAuthChecked)
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
  console.log(onlyUnAuth, user)
  if (!onlyUnAuth && !user) {
    // Сервер не ответил
    console.log("tyt")
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // !onlyUnAuth && user

  return component;
};

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }) => (
  <ProtectedRoute onlyUnAuth={true} component={component} />
);
