import React from "react";
import classNames from "classnames/bind";

import { ProductProps } from "./Product.props";

import styles from "./Product.module.css";
import { Card } from "../Card/Card";
import { Button, Divider, Raiting, Tag } from "..";
import { priceRu } from "../../helpers/helpers";

let cx = classNames.bind(styles);

export const Product = ({
	product,
	className,
	...props
}: ProductProps): JSX.Element => {
	return (
		<Card className={styles.product}>
			<div className={styles.logo}>
				<img
					src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
					alt={product.title}
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
				<Raiting rating={product.reviewAvg ?? product.initialRating} />
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
				{product.reviewCount} отзывов
			</div>
			<Divider className={styles.hr} />
			<div className={styles.description}>{product.description}</div>
			<div className={styles.features}>features</div>
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
			<Divider className={styles.hr} />
			<div className={styles.actions}>
				<Button appearance="primary"> Узнать подробнее</Button>
				<Button
					className={styles.reviewBtn}
					appearance="ghost"
					arrow="right"
				>
					{" "}
					Читать отзывы
				</Button>
			</div>
		</Card>
	);
};
