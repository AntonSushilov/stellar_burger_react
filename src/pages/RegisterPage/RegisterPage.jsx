import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
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
import { registerUser } from "../../services/User/action";
import styles from "./RegisterPage.module.css";

const RegisterPage = (props) => {
  const [valueName, setValueName] = React.useState("");
  const inputRef = React.useRef(null);

  const [valuePass, setValuePass] = React.useState("");
  const onChangePass = (e) => {
    setValuePass(e.target.value);
  };

  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const dispatch = useDispatch();
  // const registerUserMessage = useSelector(
  //   (store) => store.userRegisterReducer.registerUserMessage,
  //   shallowEqual
  // );
  const handleRegisterUser = () => {
    if (valueEmail && valuePass && valueName) {
      dispatch(registerUser(valueEmail, valuePass, valueName));
      console.log(valueEmail, valuePass, valueName);
    } else {
      console.log("Не введен емаил");
    }
  };
  // console.log(registerUserMessage);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.login_form}>
          <p className="text text_type_main-medium">Регистрация</p>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={(e) => setValueName(e.target.value)}
            value={valueName}
            name={"name"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
          />
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
            onClick={handleRegisterUser}
          >
            Зарегистрироваться
          </Button>
        </div>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

RegisterPage.propTypes = {};

export default RegisterPage;
