import React from "react";
import classNames from "classnames/bind";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { ReviewProps } from "./Review.props";
import UserIcon from "./user.svg";

import styles from "./Review.module.css";
import { Raiting } from "..";

let cx = classNames.bind(styles);

export const Review = ({
	review,
	className,
	...props
}: ReviewProps): JSX.Element => {
	const { name, title, description, createdAt, rating } = review;

	return (
		<div className={cx(styles.review, className)} {...props}>
			<UserIcon className={styles.user} />
			<div className={styles.title}>
				<span className={styles.name}>{name}:</span>&nbsp;&nbsp;
				<span>{title}</span>
			</div>
			<div className={styles.date}>
				{createdAt &&
					format(new Date(createdAt), "dd MMMM yyyy", { locale: ru })}
			</div>
			<div className={styles.rate}>
				<Raiting rating={rating} />
			</div>
			<div className={styles.description}>{description}</div>
		</div>
	);
};
