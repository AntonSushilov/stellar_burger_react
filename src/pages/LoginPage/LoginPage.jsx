import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../services/User/action";
import AppHeader from "../../components/AppHeader/AppHeader";

import styles from "./LoginPage.module.css";

const LoginPage = (props) => {
  const [valuePass, setValuePass] = React.useState("");
  const onChangePass = (e) => {
    setValuePass(e.target.value);
  };

  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const dispatch = useDispatch();
  const handleLoginUser = () => {
    if (valueEmail && valuePass) {
      dispatch(loginUser(valueEmail, valuePass));
    } else {
      console.log("Не введен емаил");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.login_form}>
          <p className="text text_type_main-medium">Вход</p>
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            name={"email"}
            placeholder="E-mail"
            isIcon={false}
          />
          <PasswordInput
            onChange={onChangePass}
            value={valuePass}
            name={"Пароль"}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleLoginUser}
          >
            Войти
          </Button>
        </div>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вы - новый пользователь?{" "}
            <Link to="/register">Зарегистрироваться</Link>
          </p>
          <p className="text text_type_main-default text_color_inactive">
            Забыли пароль?{" "}
            <Link to="/forgot-password">Восстановить пароль</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

LoginPage.propTypes = {};

export default LoginPage;
