import React from "react";
import classNames from "classnames/bind";

import { ISort, SortEnum } from "./Sort.props";
import SortIcon from "./sort.svg";

import styles from "./Sort.module.css";

let cx = classNames.bind(styles);

export const Sort = ({
	sort,
	setSort,
	className,
	...props
}: ISort): JSX.Element => {
	return (
		<div className={cx(styles.sort, className)}>
			<span
				onClick={() => setSort(SortEnum.Rating)}
				className={cx({
					[styles.active]: sort === SortEnum.Rating,
				})}
			>
				<SortIcon className={styles.icon} />
				On Rate
			</span>
			<span
				onClick={() => setSort(SortEnum.Price)}
				className={cx({
					[styles.active]: sort === SortEnum.Price,
				})}
			>
				<SortIcon className={styles.icon} />
				On Price
			</span>
		</div>
	);
};
