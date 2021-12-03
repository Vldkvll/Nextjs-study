import React from "react";
import classNames from "classnames/bind";

import { DividerProps } from "./Divider.props";

import styles from "./Divider.module.css";
let cx = classNames.bind(styles);

export const Divider = ({ className, ...props }: DividerProps): JSX.Element => {
	return <hr className={cx(styles.hr, className)} {...props} />;
};
