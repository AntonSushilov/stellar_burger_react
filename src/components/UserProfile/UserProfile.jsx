import React, { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./UserProfile.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../services/User/action";

const UserProfile = () => {
  const { user } = useSelector(
    (store) => ({
      user: store.userReducer.user,
    }),
    shallowEqual
  );

  const [valueName, setValueName] = useState(user.name);
  const [valuePass, setValuePass] = useState("");

  const [valueEmail, setValueEmail] = useState(user.email);

  const [editCheck, setEditCheck] = useState(false);

  useEffect(() => {
    if (
      valueName != user.name ||
      valuePass != '' ||
      valueEmail != user.email
    ) {
      setEditCheck(true);
    } else {
      setEditCheck(false);
    }
  }, [user, valueName, valuePass, valueEmail, editCheck]);

  const resetForm = () => {
    setValueName(user.name);
    setValuePass("");
    setValueEmail(user.email);
  };

  const dispatch = useDispatch()
  const handlerUpdateUser = () =>{
    dispatch(updateUser(valueName, valueEmail, valuePass!="" ? valuePass : null))
    setValuePass("");
    // resetForm()
  }

  return (
    <form className={styles.login_form} onSubmit={handlerUpdateUser}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={(e) => setValueName(e.target.value)}
        value={valueName}
        name={"name"}
        icon="EditIcon"
        extraClass="text_color_inactive"
        // isIcon={true}
        // disabled={true}
      />
      <EmailInput
        onChange={(e) => setValueEmail(e.target.value)}
        value={valueEmail}
        name={"email"}
        placeholder="E-mail"
        isIcon={true}
      />
      <PasswordInput
        onChange={(e) => setValuePass(e.target.value)}
        value={valuePass}
        name={"Пароль"}
        icon="EditIcon"
      />
      {editCheck && (
        <div className={styles.buttons}>
          <p className="text text_type_main-default" onClick={resetForm}>
            Отменить
          </p>
          <Button
            htmlType="submit"
            type="primary"
            size="medium"
          >
            Сохранить
          </Button>
        </div>
      )}
    </form>
  );
};

export default UserProfile;
