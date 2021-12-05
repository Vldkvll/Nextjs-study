import React, { ForwardedRef, forwardRef } from "react";
import classNames from "classnames/bind";

import { InputProps } from "./Input.props";

import styles from "./Input.module.css";

let cx = classNames.bind(styles);

// eslint-disable-next-line react/display-name
export const Input = forwardRef(
	(
		{ className, error, ...props }: InputProps,
		ref: ForwardedRef<HTMLInputElement>
	): JSX.Element => {
		return (
			<div className={cx(className, styles.inputWrapper)}>
				<input
					className={cx(styles.input, {
						[styles.error]: error,
					})}
					ref={ref}
					{...props}
				/>
				{error && (
					<span role="alert" className={styles.errorMessage}>
						{error.message}
					</span>
				)}
			</div>
		);
	}
);
