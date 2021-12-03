import React from "react";
import classNames from "classnames/bind";

import { IAdvantages } from "./Advantages.props";
import CheckIcon from "./check.svg";
import styles from "./Advantages.module.css";

let cx = classNames.bind(styles);

export const Advantages = ({ advantages }: IAdvantages): JSX.Element => {
	return (
		<>
			{advantages.map((a) => (
				<div key={a._id} className={cx(styles.advantage)}>
					<CheckIcon />
					<div className={cx(styles.title)}>{a.title}</div>
					<hr className={cx(styles.vline)} />
					<div className={cx(styles.description)}>
						{a.description}
					</div>
				</div>
			))}
		</>
	);
};
