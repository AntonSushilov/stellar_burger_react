import React from 'react'
import PropTypes from 'prop-types'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./UserProfile.module.css";

const UserProfile = props => {
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
  return (
    <div className={styles.login_form}>
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
              icon="EditIcon"
              // disabled={true}
            />
            <EmailInput
              onChange={onChangeEmail}
              value={valueEmail}
              name={"email"}
              placeholder="E-mail"
              isIcon={true}
            />
            <PasswordInput
              onChange={onChangePass}
              value={valuePass}
              name={"Пароль"}
              icon="EditIcon"
            />
          </div>
  )
}

UserProfile.propTypes = {}

export default UserProfile