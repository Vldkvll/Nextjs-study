import React, { ForwardedRef, forwardRef, useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";
import { motion } from "framer-motion";

import { ProductProps } from "./Product.props";

import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Button, Divider, Raiting, Review, ReviewForm, Tag } from "..";
import { declOfnum, priceRu } from "../../helpers/helpers";

let cx = classNames.bind(styles);

export const Product = motion(
	// eslint-disable-next-line react/display-name
	forwardRef(
		(
			{ product, className, ...props }: ProductProps,
			ref: ForwardedRef<HTMLDivElement>
		): JSX.Element => {
			const [isReviewOpened, setIsReviewOpened] =
				useState<boolean>(false);
			const reviewRef = useRef<HTMLDivElement>(null);

			const variants = {
				visible: {
					opacity: 1,
					height: "auto",
				},
				hidden: { opacity: 0, height: 0 },
			};

			const scrollToReview = () => {
				setIsReviewOpened(true);
				reviewRef.current?.scrollIntoView({
					behavior: "smooth",
					block: "start",
				});
				reviewRef.current?.focus();
			};

			return (
				<div ref={ref} className={className} {...props}>
					<Card className={styles.product}>
						<div className={styles.logo}>
							<Image
								src={
									process.env.NEXT_PUBLIC_DOMAIN +
									product.image
								}
								alt={product.title}
								width={70}
								height={70}
							/>
						</div>
						<div className={styles.title}>{product.title}</div>
						<div className={styles.price}>
							<span>
								<span className="visuallyHiden">Цена</span>
								{priceRu(product.price)}
							</span>
							{product.oldPrice && (
								<Tag
									className={styles.oldPriceTag}
									color="green"
								>
									<span className="visuallyHiden">
										Скидка
									</span>
									{priceRu(product.price - product.oldPrice)}
								</Tag>
							)}
						</div>
						<div className={styles.credit}>
							<span>
								<span className="visuallyHiden">Кредит</span>
								{priceRu(product.credit)}
							</span>
							<span className={styles.month}> /мес.</span>
						</div>
						<div className={styles.rate}>
							<span className="visuallyHiden">
								`Рейтинг $
								{product.reviewAvg ?? product.initialRating}`
							</span>
							<Raiting
								rating={
									product.reviewAvg ?? product.initialRating
								}
							/>
						</div>
						<div className={styles.tags}>
							{product.categories.map((c) => (
								<Tag
									key={c}
									className={styles.category}
									color="ghost"
								>
									{c}
								</Tag>
							))}
						</div>
						<div aria-hidden={true} className={styles.priceTitle}>
							Цена
						</div>
						<div aria-hidden={true} className={styles.creditTitle}>
							Кредит
						</div>
						<div className={styles.rateTitle}>
							<a href="#ref" onClick={scrollToReview}>
								{product.reviewCount}{" "}
								{declOfnum(product.reviewCount, [
									"отзыв",
									"отзыва",
									"отзывов",
								])}
							</a>
						</div>
						<Divider className={styles.hr} />
						<div className={styles.description}>
							{product.description}
						</div>
						<div className={styles.features}>
							{product.characteristics.map((c) => (
								<div
									key={c.name}
									className={styles.characteristics}
								>
									<span className={styles.characteristicName}>
										{c.name}
									</span>
									<span
										className={styles.characteristicDots}
									></span>
									<span
										className={styles.characteristicValue}
									>
										{c.value}
									</span>
								</div>
							))}
						</div>
						<div className={styles.advBlock}>
							{product.advantages && (
								<div className={styles.advantages}>
									<div className={styles.advTitle}>
										Преимущества
									</div>
									{product.advantages}
								</div>
							)}
							{product.disadvantages && (
								<div className={styles.disadvantages}>
									<div className={styles.disadvTitle}>
										Недостатки
									</div>
									{product.disadvantages}
								</div>
							)}
						</div>
						<Divider className={cx(styles.hr, styles.hr)} />
						<div className={styles.actions}>
							<Button appearance="primary">
								{" "}
								Узнать подробнее
							</Button>
							<Button
								aria-expanded={isReviewOpened}
								className={styles.reviewBtn}
								appearance="ghost"
								arrow={isReviewOpened ? "down" : "right"}
								onClick={() =>
									setIsReviewOpened(!isReviewOpened)
								}
							>
								{" "}
								Читать отзывы
							</Button>
						</div>
					</Card>

					<motion.div
						animate={isReviewOpened ? "visible" : "hidden"}
						initial="hidden"
						variants={variants}
					>
						<Card
							tabIndex={1}
							className={cx(styles.review)}
							color="blue"
							ref={reviewRef}
						>
							{product.reviews.map((r) => (
								<div key={r._id}>
									<Review review={r} />
									<Divider />
								</div>
							))}
							<ReviewForm productId={product._id} />
						</Card>
					</motion.div>
				</div>
			);
		}
	)
);
Product.displayName = "Product";
