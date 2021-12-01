import React from "react";
import classNames from "classnames/bind";

import { IParagraph } from "./Paragraph.props";

import styles from "./Paragraph.module.css";

let cx = classNames.bind(styles);

export const Paragraph = ({ size, children, className }: IParagraph) => {
	return (
		<p
			className={cx(styles.button, className, {
				[styles.lg]: size === "lg",
				[styles.md]: size === "md",
				[styles.sm]: size === "sm",
			})}
		>
			{children}
		</p>
	);
};
