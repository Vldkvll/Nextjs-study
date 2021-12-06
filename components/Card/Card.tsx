import React, { ForwardedRef, forwardRef } from "react";
import classNames from "classnames/bind";

import { ICard } from "./Card.props";

import styles from "./Card.module.css";

let cx = classNames.bind(styles);

export const Card = forwardRef(
	(
		{ color = "white", children, className, ...props }: ICard,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		return (
			<div
				className={cx(styles.card, className, {
					[styles.blue]: color === "blue",
				})}
				{...props}
				ref={ref}
			>
				{children}
			</div>
		);
	}
);

Card.displayName = "Card";
