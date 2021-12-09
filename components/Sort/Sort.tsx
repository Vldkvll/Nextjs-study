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
		<div className={cx(styles.sort, className)} {...props}>
			<div id="sort" className={cx(styles.ariaSortDiv)}>
				Сортировка
			</div>
			<button
				id="rating"
				onClick={() => setSort(SortEnum.Rating)}
				className={cx({
					[styles.active]: sort === SortEnum.Rating,
				})}
				// aria-role={"checkbox"}
				aria-labelledby="sort rating"
				aria-selected={sort === SortEnum.Rating}
			>
				<SortIcon className={styles.icon} />
				По&nbsp;Рейтингу
			</button>
			<button
				id="price"
				aria-labelledby="sort price"
				aria-selected={sort === SortEnum.Price}
				onClick={() => setSort(SortEnum.Price)}
				className={cx({
					[styles.active]: sort === SortEnum.Price,
				})}
			>
				<SortIcon className={styles.icon} />
				По&nbsp;Цене
			</button>
		</div>
	);
};
