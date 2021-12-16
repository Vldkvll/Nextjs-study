import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

import classNames from "classnames/bind";

import { ReviewFormProps } from "./ReviewForm.props";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import CloseIcon from "./close.svg";

import styles from "./ReviewForm.module.css";
import { Button, Input, Raiting, Textarea } from "..";
import axios from "axios";
import { API } from "../../helpers/api";

let cx = classNames.bind(styles);

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const [isSuccess, setIsSuccess] = useState<boolean>(false);
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
		reset,
		clearErrors,
	} = useForm<IReviewForm>();

	const [error, setError] = useState<string>();

	const onSubmit = async (formData: IReviewForm) => {
		try {
			const { data } = await axios.post<IReviewSentResponse>(
				API.review.createDemo,
				{ ...formData, productId }
			);
			if (data.message) {
				setIsSuccess(true);
				reset();
			} else {
				setError("Что-то пошло не так");
			}
		} catch (e) {
			setError("something wrong");
		}
	};

	return (
		<>
			{/* <DevTool control={control} placement="top-left" /> */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={cx(styles.reviewForm, className)} {...props}>
					<Input
						aria-invalid={errors.name ? true : false}
						{...register("name", {
							required: { value: true, message: "Заполните Имя" },
						})}
						placeholder={"Имя"}
						error={errors.name}
					/>
					<Input
						aria-invalid={errors.title ? true : false}
						{...register("title", {
							required: {
								value: true,
								message: "Заполните заголовок",
							},
						})}
						className={styles.inputreview}
						placeholder={"Заголовок отзыва"}
						error={errors.title}
					/>
					<div className={styles.rate}>
						<span>Оценка:</span>
						<Controller
							control={control}
							name="rate"
							rules={{
								required: {
									value: true,
									message: "Укажите рейтинг",
								},
							}}
							render={({ field }) => (
								<Raiting
									ref={field.ref}
									isEditable
									rating={field.value}
									setRating={field.onChange}
									error={errors.rate}
								/>
							)}
						/>
					</div>
					<Textarea
						aria-label="текст отзыва"
						aria-invalid={errors.description ? true : false}
						{...register("description", {
							required: { value: true, message: "Заполните Имя" },
						})}
						className={styles.description}
						placeholder={"Текст отзыва"}
						error={errors.description}
					/>
					<div className={styles.submit}>
						<Button
							appearance="primary"
							onClick={() => clearErrors()}
						>
							Отправить
						</Button>
						<span className={styles.info}>
							* Перед отправкой отзыв пройдет предварительную
							модерацию и проверку
						</span>
					</div>
				</div>
				{isSuccess && (
					<div
						role="alert"
						className={cx(styles.success, styles.panel)}
					>
						<div className={styles.successtitle}>
							Ваш отзыв отправлен
						</div>
						<div className={styles.successdescription}>
							Спасибо, ваш отзыв будет опубликован после проверки.
						</div>
						<button
							aria-label="закрыть оповещение"
							className={styles.close}
							onClick={() => setIsSuccess(false)}
						>
							<CloseIcon />
						</button>
					</div>
				)}
				{error && (
					<div className={cx(styles.error, styles.panel)}>
						{error}
						<button
							aria-label="закрыть оповещение"
							className={styles.close}
							onClick={() => setError("")}
						>
							<CloseIcon />
						</button>
					</div>
				)}
			</form>
		</>
	);
};
