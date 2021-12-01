import React from "react";
import classNames from "classnames/bind";

import { ICard } from "./Card.props";

import styles from "./Card.module.css";

let cx = classNames.bind(styles);

export const Card = ({
	color = "white",
	children,
	className,
	...props
}: ICard): JSX.Element => {
	return (
		<div
			className={cx(styles.card, className, {
				[styles.blue]: color === "blue",
			})}
			{...props}
		>
			{children}
		</div>
	);
};
