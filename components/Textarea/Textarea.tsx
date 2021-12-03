import React from "react";
import classNames from "classnames/bind";

import { TextAreaProps } from "./Textarea.props";

import styles from "./Textarea.module.css";

let cx = classNames.bind(styles);

export const Textarea = ({
	className,
	...props
}: TextAreaProps): JSX.Element => {
	return <textarea className={cx(className, styles.input)} {...props} />;
};
