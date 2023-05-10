import React, { ChangeEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../services/User/action";
import styles from "./RegisterPage.module.css";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { useAppDispatch } from "../../hooks/UseAppDispatch";

const RegisterPage = (): JSX.Element => {
  const [valueName, setValueName] = React.useState("");
  const inputRef = React.useRef(null);

  const [valuePass, setValuePass] = React.useState("");
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePass(e.target.value);
  };

  const [valueEmail, setValueEmail] = React.useState("");
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setValueEmail(e.target.value);
  };
  const navigate = useNavigate()
  const userRegisterSuccess = useRootSelector((store) => store.userReducer.userRegisterSuccess);
  useEffect(()=>{
    if(userRegisterSuccess){
      navigate("/")
    }
  }, [userRegisterSuccess])

  const dispatch = useAppDispatch();
  // const registerUserMessage = useSelector(
  //   (store) => store.userRegisterReducer.registerUserMessage,
  //   shallowEqual
  // );
  const handleRegisterUser = () => {
    if (valueEmail && valuePass && valueName) {
      dispatch(registerUser(valueEmail, valuePass, valueName));
    } else {
      console.log("Не введен емаил");
    }
  };
  // console.log(registerUserMessage);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <form className={styles.login_form} onSubmit={handleRegisterUser}>
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
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Зарегистрироваться
          </Button>
        </form>
        <div className={styles.links}>
          <p className="text text_type_main-default text_color_inactive">
            Уже зарегистрированы? <Link to="/login">Войти</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
