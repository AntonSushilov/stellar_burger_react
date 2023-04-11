import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import AppHeader from "../../components/AppHeader/AppHeader";

import styles from "./LoginPage.module.css";

const LoginPage = (props) => {
  const [valuePass, setValuePass] = React.useState("")
  const onChangePass = e => {
    setValuePass(e.target.value)
  }

  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
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
          <Button htmlType="button" type="primary" size="medium">
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
