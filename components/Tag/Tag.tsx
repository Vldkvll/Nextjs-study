import React from "react";
import classNames from "classnames/bind";

import { IP } from "./Tag.props";

import styles from "./Tag.module.css";

let cx = classNames.bind(styles);

export const Tag = ({
	size = "s",
	children,
	color = "ghost",
	href,
	className,
	...props
}: IP): JSX.Element => {
	return (
		<div
			className={cx(styles.tag, className, {
				[styles.s]: size === "s",
				[styles.m]: size === "m",
				[styles.ghost]: color === "ghost",
				[styles.green]: color === "green",
				[styles.gray]: color === "gray",
				[styles.red]: color === "red",
				[styles.primary]: color === "primary",
			})}
			{...props}
		>
			{href ? <a href={href}>{children}</a> : <>{children}</>}
		</div>
	);
};
