import React from "react";
import { useForm, Controller } from "react-hook-form";
// import { DevTool } from "@hookform/devtools";

import classNames from "classnames/bind";

import { ReviewFormProps } from "./ReviewForm.props";
import { IReviewForm } from "./ReviewForm.interface";
import CloseIcon from "./close.svg";

import styles from "./ReviewForm.module.css";
import { Button, Input, Raiting, Textarea } from "..";

let cx = classNames.bind(styles);

export const ReviewForm = ({
	productId,
	className,
	...props
}: ReviewFormProps): JSX.Element => {
	const { register, control, handleSubmit } = useForm<IReviewForm>();

	const onSubmit = (data: IReviewForm) => {
		console.log("file: ReviewForm.tsx ~ line 23 ~ data", data);
	};

	return (
		<>
			{/* <DevTool control={control} placement="top-left" /> */}
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={cx(styles.reviewForm, className)} {...props}>
					<Input {...register("name")} placeholder={"Имя"} />
					<Input
						{...register("title")}
						className={styles.inputreview}
						placeholder={"Заголовок отзыва"}
					/>
					<div className={styles.rate}>
						<span>Оценка:</span>
						<Controller
							control={control}
							name="rate"
							render={({ field }) => (
								<Raiting
									isEditable
									rating={field.value}
									setRating={field.onChange}
								/>
							)}
						/>
					</div>
					<Textarea
						{...register("description")}
						className={styles.textarea}
						placeholder={"Текст отзыва"}
					/>
					<div className={styles.submit}>
						<Button
							appearance="primary"
							//  type="submit"
						>
							Отправить
						</Button>
						<span className={styles.info}>
							* Перед отправкой отзыв пройдет предварительную
							модерацию и проверку
						</span>
					</div>
				</div>
				<div className={styles.success}>
					<div className={styles.successtitle}>
						Ваш отзыв отправлен
					</div>
					<div className={styles.successdescription}>
						Спасибо, ваш отзыв будет опубликован после проверки.
					</div>
					<CloseIcon className={styles.close} />
				</div>
			</form>
		</>
	);
};
