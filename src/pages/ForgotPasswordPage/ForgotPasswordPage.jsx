import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = (props) => {
  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.login_form}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            name={"email"}
            placeholder="укажите E-mail"
            isIcon={false}
          />
          <Button htmlType="button" type="primary" size="medium">
            Восстановить
          </Button>
        </div>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль?{" "}
            <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

ForgotPasswordPage.propTypes = {};

export default ForgotPasswordPage;
