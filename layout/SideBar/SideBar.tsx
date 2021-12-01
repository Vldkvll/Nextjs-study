import React from "react";
import classNames from "classnames/bind";

import { Menu } from "../Menu/Menu";
import { ISideBar } from "./SideBar.props";
import Logo from "../logo.svg";

import styles from "./SideBar.module.css";

let cx = classNames.bind(styles);

export const SideBar = ({ className, ...props }: ISideBar): JSX.Element => {
	return (
		<div className={cx(className, styles.sidebBBar)} {...props}>
			<Logo className={cx(styles.logo)} />
			<div>Search</div>
			<Menu />
		</div>
	);
};
