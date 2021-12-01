import React from "react";
import classNames from "classnames/bind";

import { IhhData } from "./HhData.props";
import { Card } from "../Card/Card";
import RateIcon from "./rate.svg";
import styles from "./HhData.module.css";

let cx = classNames.bind(styles);

export const HhData = ({ count }: IhhData): JSX.Element => {
	return (
		<div className={cx(styles.hh)}>
			<Card className={styles.count}>
				<div className={styles.title}>All vacancy</div>
				<div className={styles.countCalue}>{count}</div>
			</Card>
			<Card className={styles.count}>
				<div className={styles.title}>All vacancy</div>
				<div className={styles.salaryValue}>{count}</div>
				<div className={styles.rate}>
					<RateIcon />
					<RateIcon />
					<RateIcon />
				</div>
			</Card>
		</div>
	);
};
