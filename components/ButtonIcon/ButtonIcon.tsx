import React from "react";
import classNames from "classnames/bind";

import { ButtonIconProps, icons } from "./ButtonIcon.props";

import styles from "./ButtonIcon.module.css";

let cx = classNames.bind(styles);

export const ButtonIcon = ({
	appearance,
	icon,
	className,
	...props
}: ButtonIconProps): JSX.Element => {
	const IconComp = icons[icon];

	return (
		<button
			className={cx(styles.button, className, {
				[styles.primary]: appearance === "primary",
				[styles.ghost]: appearance === "white",
			})}
			{...props}
		>
			<IconComp />
		</button>
	);
};
//
