import React from "react";
import classNames from "classnames/bind";

import { IHeader } from "./Header.props";

import styles from "./Header.module.css";

let cx = classNames.bind(styles);

export const Header = ({ ...props }: IHeader): JSX.Element => {
	return <div {...props}>Header</div>;
};
