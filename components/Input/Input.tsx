import React from "react";
import classNames from "classnames/bind";

import { InputProps } from "./Input.props";

import styles from "./Input.module.css";

let cx = classNames.bind(styles);

export const Input = ({ className, ...props }: InputProps): JSX.Element => {
	return <input className={cx(className, styles.input)} {...props} />;
};
