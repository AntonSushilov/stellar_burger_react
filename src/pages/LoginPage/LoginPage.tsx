import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { loginUser } from "../../services/User/action";
import styles from "./LoginPage.module.css";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { useAppDispatch } from "../../hooks/UseAppDispatch";

const LoginPage = (): JSX.Element => {
  const [valuePass, setValuePass] = React.useState("");
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePass(e.target.value);
  };

  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const isAuthChecked = useRootSelector((store) => store.userReducer.isAuthChecked);
  const userFailed = useRootSelector((store) => store.userReducer.userFailed);
  const userLoginSuccess = useRootSelector((store) => store.userReducer.userLoginSuccess);
  useEffect(()=>{
    if(userLoginSuccess){
      navigate("/")
    }
  }, [userLoginSuccess])


  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  const handleLoginUser = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (valueEmail && valuePass) {
      dispatch(loginUser(valueEmail, valuePass));
    } else {
      console.log("Не введен емаил");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.login_form} onSubmit={handleLoginUser}>
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
          <Button htmlType="submit" type="primary" size="medium">
            Войти
          </Button>
        </form>
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

export default LoginPage;
