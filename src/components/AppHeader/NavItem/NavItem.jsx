import React from "react";
import PropTypes from "prop-types";
import styles from "./NavItem.module.css";

const NavItem = (props) => {
  return (
    <div className={[styles.nav_item, "pl-5 pr-5"].join(" ")}>
      {props.children}
    </div>
  );
};

NavItem.propTypes = {
  children: PropTypes.node.isRequired,
};

export default NavItem;
