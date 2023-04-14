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
import { resetPassword } from "../../services/User/action";
import styles from "./ResetPasswordPage.module.css";

const ResetPasswordPage = (props) => {
  const [valueCode, setValueCode] = React.useState("");
  const inputRef = React.useRef(null);

  const [valuePass, setValuePass] = React.useState("");
  const onChangePass = (e) => {
    setValuePass(e.target.value);
  };

  const dispatch = useDispatch();
  // const resetPasswordMessage = useSelector((store) => store.resetPasswordReducer.resetPasswordMessage, shallowEqual)
  const handleResetPassword = () => {
    if (valuePass && valueCode) {
      dispatch(resetPassword(valuePass, valueCode));
      console.log(valuePass, valueCode);
    } else {
      console.log("Не введен емаил");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.login_form}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <PasswordInput
            onChange={onChangePass}
            value={valuePass}
            name={"Введите новый пароль"}
          />
          <Input
            type={"text"}
            placeholder={"Введите код из письма"}
            onChange={(e) => setValueCode(e.target.value)}
            value={valueCode}
            name={"code"}
            error={false}
            ref={inputRef}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Button
            htmlType="button"
            type="primary"
            size="medium"
            onClick={handleResetPassword}
          >
            Сохранить
          </Button>
        </div>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

ResetPasswordPage.propTypes = {};

export default ResetPasswordPage;
