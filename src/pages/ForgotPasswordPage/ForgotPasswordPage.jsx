import React from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { Link } from "react-router-dom";
import {
  EmailInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { forgotPassword } from "../../services/User/action";
import styles from "./ForgotPasswordPage.module.css";

const ForgotPasswordPage = () => {
  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e) => {
    setValueEmail(e.target.value);
  };

  const dispatch = useDispatch();
  // const forgotPasswordMessage = useSelector(
  //   (store) => store.forgotPasswordReducer.forgotPasswordMessage,
  //   shallowEqual
  // );
  const handleForgotPassword = () => {
    if (valueEmail) {
      dispatch(forgotPassword(valueEmail));
      console.log(valueEmail);
    } else {
      console.log("Не введен емаил");
    }
  };
  // console.log(forgotPasswordMessage);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.login_form} onSubmit={handleForgotPassword}>
          <p className="text text_type_main-medium">Восстановление пароля</p>
          <EmailInput
            onChange={onChangeEmail}
            value={valueEmail}
            name={"email"}
            placeholder="укажите E-mail"
            isIcon={false}
          />
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Восстановить
          </Button>
        </form>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Вспомнили пароль? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
