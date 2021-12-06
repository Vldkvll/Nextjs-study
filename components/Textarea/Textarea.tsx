import React, { forwardRef, ForwardedRef } from "react";
import classNames from "classnames/bind";

import { TextAreaProps } from "./Textarea.props";

import styles from "./Textarea.module.css";

let cx = classNames.bind(styles);

export const Textarea = forwardRef(
	(
		{ className, error, ...props }: TextAreaProps,
		ref: ForwardedRef<HTMLTextAreaElement>
	): JSX.Element => {
		return (
			<div className={cx(className, styles.textareaWrapper)}>
				<textarea
					ref={ref}
					className={cx(styles.textarea, {
						[styles.error]: error,
					})}
					{...props}
				/>
				{error && (
					<span className={styles.errorMessage}>
						<i>{error.message}</i>
					</span>
				)}
			</div>
		);
	}
);

Textarea.displayName = "Textarea";
