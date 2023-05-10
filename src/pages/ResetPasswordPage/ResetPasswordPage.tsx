import React, { ChangeEvent, FormEvent, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import {
  Input,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { resetPassword } from "../../services/User/action";
import styles from "./ResetPasswordPage.module.css";
import { useRootSelector } from "../../hooks/UseRootSelector";
import { useAppDispatch } from "../../hooks/UseAppDispatch";

const ResetPasswordPage = (): JSX.Element => {
  const [valueCode, setValueCode] = React.useState("");
  const inputRef = React.useRef(null);

  const [valuePass, setValuePass] = React.useState("");
  const onChangePass = (e: ChangeEvent<HTMLInputElement>) => {
    setValuePass(e.target.value);
  };
  const resetPasswordSuccess = useRootSelector((store) => store.userReducer.resetPasswordSuccess);
  const navigate = useNavigate()
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(resetPasswordSuccess){
      navigate("/login")
    }
  }, [resetPasswordSuccess])
  // const resetPasswordMessage = useSelector((store) => store.resetPasswordReducer.resetPasswordMessage, shallowEqual)
  const handleResetPassword = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(resetPasswordSuccess)
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
        <form className={styles.login_form} onSubmit={handleResetPassword}>
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
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
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

export default ResetPasswordPage;
