import React, {
	useEffect,
	useState,
	KeyboardEvent,
	ForwardedRef,
	forwardRef,
} from "react";
import classNames from "classnames/bind";

import { RatingProps } from "./Raiting.props";

import StarIcon from "./star.svg";
import styles from "./Raiting.module.css";

let cx = classNames.bind(styles);

export const Raiting = forwardRef(
	(
		{ isEditable = false, rating, setRating, error, ...props }: RatingProps,
		ref: ForwardedRef<HTMLDivElement>
	): JSX.Element => {
		const [ratingArray, setratingArray] = useState<JSX.Element[]>(
			new Array(5).fill(<></>)
		);

		useEffect(() => {
			constructRating(rating);
		}, [rating]); // ignore hook-lint cause reusable constructRating() on the hover

		const constructRating = (currentRating: number) => {
			const updatedArray = ratingArray.map(
				(r: JSX.Element, i: number) => {
					return (
						<span key={i}>
							<StarIcon
								role={isEditable ? "slider" : ""}
								aria-invalid={error ? true : false}
								aria-valuenow={rating}
								aria-valuemax={5}
								aria-valuemin={1}
								aria-label={
									isEditable
										? "Укажите рейтинг пробелом или клавишей ввода, перемещение стрелками вверх или вниз"
										: { rating }
								}
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
				}
			);
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
			// <div
			// className={cx(styles.ratingWrapper, {
			// 	[styles.error]: error,
			// })}

			// >
			<div
				className={cx(styles.ratingWrapper, {
					[styles.error]: error,
				})}
				{...props}
				ref={ref}
			>
				{ratingArray.map((r: JSX.Element, i: number) => {
					return <span key={i}>{r}</span>;
				})}
				{error && (
					<span role="alert" className={styles.errorMessage}>
						<i>{error.message}</i>
					</span>
				)}
			</div>
			// </div>
		);
	}
);

Raiting.displayName = "Raiting";
