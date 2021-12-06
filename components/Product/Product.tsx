import React, { useRef, useState } from "react";
import Image from "next/image";
import classNames from "classnames/bind";

import { ProductProps } from "./Product.props";

import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Button, Divider, Raiting, Review, ReviewForm, Tag } from "..";
import { declOfnum, priceRu } from "../../helpers/helpers";

let cx = classNames.bind(styles);

export const Product = ({
	product,
	className,
	...props
}: ProductProps): JSX.Element => {
	const [isReviewOpened, setIsReviewOpened] = useState<boolean>(false);
	const reviewRef = useRef<HTMLDivElement>(null);

	const scrollToReview = () => {
		setIsReviewOpened(true);
		reviewRef.current?.scrollIntoView({
			behavior: "smooth",
			block: "start",
		});
	};

	return (
		<div className={className} {...props}>
			<Card className={styles.product}>
				<div className={styles.logo}>
					<Image
						src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
						alt={product.title}
						width={70}
						height={70}
					/>
				</div>
				<div className={styles.title}>{product.title}</div>
				<div className={styles.price}>
					{priceRu(product.price)}
					{product.oldPrice && (
						<Tag className={styles.oldPriceTag} color="green">
							{priceRu(product.price - product.oldPrice)}
						</Tag>
					)}
				</div>
				<div className={styles.credit}>
					{priceRu(product.credit)}/
					<span className={styles.month}>month</span>
				</div>
				<div className={styles.rate}>
					<Raiting
						rating={product.reviewAvg ?? product.initialRating}
					/>
				</div>
				<div className={styles.tags}>
					{product.categories.map((c) => (
						<Tag key={c} className={styles.category} color="ghost">
							{c}
						</Tag>
					))}
				</div>
				<div className={styles.priceTitle}>Price</div>
				<div className={styles.creditTitle}>Credit</div>
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
				<div className={styles.description}>{product.description}</div>
				<div className={styles.features}>
					{product.characteristics.map((c) => (
						<div key={c.name} className={styles.characteristics}>
							<span className={styles.characteristicName}>
								{c.name}
							</span>
							<span className={styles.characteristicDots}></span>
							<span className={styles.characteristicValue}>
								{c.value}
							</span>
						</div>
					))}
				</div>
				<div className={styles.advBlock}>
					{product.advantages && (
						<div className={styles.advantages}>
							<div className={styles.advTitle}>Преимущества</div>
							{product.advantages}
						</div>
					)}
					{product.disadvantages && (
						<div className={styles.disadvantages}>
							<div className={styles.disadvTitle}>Недостатки</div>
							{product.disadvantages}
						</div>
					)}
				</div>
				<Divider className={cx(styles.hr, styles.hr)} />
				<div className={styles.actions}>
					<Button appearance="primary"> Узнать подробнее</Button>
					<Button
						className={styles.reviewBtn}
						appearance="ghost"
						arrow={isReviewOpened ? "down" : "right"}
						onClick={() => setIsReviewOpened(!isReviewOpened)}
					>
						{" "}
						Читать отзывы
					</Button>
				</div>
			</Card>
			<Card
				className={cx(styles.review, {
					[styles.opened]: isReviewOpened,
					[styles.closed]: !isReviewOpened,
				})}
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
		</div>
	);
};
