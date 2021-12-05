import React, { forwardRef, ForwardedRef } from "react";
import classNames from "classnames/bind";

import { TextAreaProps } from "./Textarea.props";

import styles from "./Textarea.module.css";

let cx = classNames.bind(styles);

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef(
	(
		{ className, ...props }: TextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	): JSX.Element => {
		return (
			<textarea
				ref={ref}
				className={cx(className, styles.input)}
				{...props}
			/>
		);
	}
);
