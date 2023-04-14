import React from "react";
import PropTypes from "prop-types";
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
  ShowIcon,
  HideIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./HistoryFeed.module.css";

const HistoryFeed = (props) => {
  return (
    <div>
      <p className="text text_type_main-large">История заказов</p>
      <p className="text text_type_main-medium">В разработке</p>
    </div>
  );
};

HistoryFeed.propTypes = {};

export default HistoryFeed;
