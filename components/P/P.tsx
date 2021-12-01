import React from "react";
import classNames from "classnames/bind";

import { IP } from "./P.props";

import styles from "./P.module.css";

let cx = classNames.bind(styles);

export const P = ({
	size = "m",
	children,
	className,
	...props
}: IP): JSX.Element => {
	return (
		<p
			className={cx(styles.p, className, {
				[styles.l]: size === "l",
				[styles.m]: size === "m",
				[styles.s]: size === "s",
			})}
			{...props}
		>
			{children}
		</p>
	);
};
