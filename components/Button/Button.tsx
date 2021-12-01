import React from "react";
import classNames from "classnames/bind";

import { IButton } from "./Button.props";
import ArrowIcon from "./arr.svg";

import styles from "./Button.module.css";

let cx = classNames.bind(styles);

export const Button = ({
	appearance,
	children,
	className,
	arrow = "none",
	...props
}: IButton): JSX.Element => {
	return (
		<button
			className={cx(styles.button, className, {
				[styles.primary]: appearance === "primary",
				[styles.ghost]: appearance === "ghost",
			})}
			{...props}
		>
			{children}
			{arrow !== "none" && (
				<span
					className={cx(styles.arrow, {
						[styles.down]: arrow === "down",
						[styles.right]: arrow === "right",
					})}
				>
					<ArrowIcon />
				</span>
			)}
		</button>
	);
};
//
