import React, { useEffect, useState, KeyboardEvent } from "react";
import classNames from "classnames/bind";

import { IRaiting } from "./Raiting.props";

import StarIcon from "./star.svg";
import styles from "./Raiting.module.css";

let cx = classNames.bind(styles);

export const Raiting = ({
	isEditable = false,
	rating,
	setRating,

	...props
}: IRaiting): JSX.Element => {
	const [ratingArray, setratingArray] = useState<JSX.Element[]>(
		new Array(5).fill(<></>)
	);

	useEffect(() => {
		constructRating(rating);
	}, [rating]); // ignore hook-lint cause reusable constructRating() on the hover

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span key={i}>
					<StarIcon
						className={cx(styles.star, {
							[styles.filled]: i < currentRating,
							[styles.editable]: isEditable,
						})}
						onMouseEnter={() => changeDisplay(i + 1)}
						onMouseLeave={() => changeDisplay(rating)}
						onClick={() => onclick(i + 1)}
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGAElement>) =>
							isEditable && handleSpace(i + 1, e)
						}
					/>
				</span>
			);
		});
		setratingArray(updatedArray);
	};

	const changeDisplay = (i: number) => {
		if (!isEditable) {
			return;
		}
		constructRating(i);
	};

	const onclick = (i: number) => {
		if (!isEditable || !setRating) {
			return;
		}

		setRating(i);
	};

	const handleSpace = (i: number, e: KeyboardEvent<SVGAElement>) => {
		// if (!isEditable || !setRating) {
		// 	return;
		// }

		if (e.code !== "Space" || !setRating) {
			return;
		}

		setRating(i);
	};

	return (
		<div {...props}>
			{ratingArray.map((r: JSX.Element, i: number) => {
				return <span key={i}>{r}</span>;
			})}
		</div>
	);
};
