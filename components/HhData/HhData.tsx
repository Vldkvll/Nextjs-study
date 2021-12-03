import React from "react";
import classNames from "classnames/bind";

import { IhhData } from "./HhData.props";
import { Card } from "../Card/Card";
import RateIcon from "./rate.svg";
import styles from "./HhData.module.css";
import { priceRu } from "../../helpers/helpers";

let cx = classNames.bind(styles);

export const HhData = ({
	count,
	juniorSalary,
	middleSalary,
	seniorSalary,
}: IhhData): JSX.Element => {
	return (
		<div className={cx(styles.hh)}>
			<Card className={styles.count}>
				<div className={styles.title}>All vacancy</div>
				<div className={styles.countValue}>{count}</div>
			</Card>
			<Card className={styles.salary}>
				<div className={styles.w}>
					<div className={styles.title}>Beginer</div>
					<div className={styles.salaryValue}>
						{priceRu(juniorSalary)}
					</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon />
						<RateIcon />
					</div>
				</div>
				<div className={styles.w}>
					<div className={styles.title}>Middle</div>
					<div className={styles.salaryValue}>
						{priceRu(middleSalary)}
					</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon />
					</div>
				</div>
				<div className={styles.w}>
					<div className={styles.title}>Senior</div>
					<div className={styles.salaryValue}>
						{priceRu(seniorSalary)}
					</div>
					<div className={styles.rate}>
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
						<RateIcon className={styles.filled} />
					</div>
				</div>
			</Card>
		</div>
	);
};
