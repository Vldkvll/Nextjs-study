import React, { useEffect, useReducer } from "react";
import classNames from "classnames/bind";

import { TopPageComponentProps } from "./TopPageComponent.props";

import styles from "./TopPageComponent.module.css";
import {
	Advantages,
	HhData,
	Htag,
	P,
	Product,
	Sort,
	Tag,
} from "../../components";
import { TopLevelCategory } from "../../interfaces/enum";
import { SortEnum } from "../../components/Sort/Sort.props";
import { SortReducer } from "./sort.reducer";

let cx = classNames.bind(styles);

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
}: TopPageComponentProps): JSX.Element => {
	const [{ products: sortedProducts, sort }, dispatchSort] = useReducer(
		SortReducer,
		{ products, sort: SortEnum.Rating }
	);

	const setSort = (sort: SortEnum) => {
		dispatchSort({ type: sort });
	};

	useEffect(() => {
		dispatchSort({ type: "reset", initialState: products });
	}, [products]);

	return (
		<>
			<div className={cx(styles.wrapper)}>
				<div className={cx(styles.title)}>
					<Htag tag="h1">{page.title}</Htag>
					{products && (
						<Tag color="gray" size="m">
							{products.length}
						</Tag>
					)}
					<Sort sort={sort} setSort={setSort} />
				</div>
				<div>
					{sortedProducts &&
						sortedProducts.map((p) => (
							<Product key={p._id} product={p} />
						))}
				</div>
				<div className={cx(styles.hhTitle)}>
					<Htag tag="h2">Vacancy - {page.category}</Htag>
					{products && (
						<Tag color="red" size="m">
							hh.ru
						</Tag>
					)}
				</div>
				{firstCategory === TopLevelCategory.Courses && page.hh && (
					<HhData {...page.hh} />
				)}
				{page.advantages && page.advantages.length > 0 && (
					<>
						<Htag tag="h2">Advantages</Htag>
						<Advantages advantages={page.advantages} />
					</>
				)}
				{page.seoText && (
					<div
						className={styles.seo}
						dangerouslySetInnerHTML={{ __html: page.seoText }}
					/>
				)}
				<Htag tag="h2">Skills</Htag>
				{page.tags.map((t) => (
					<Tag key={t} color="primary">
						{t}
					</Tag>
				))}
			</div>
		</>
	);
};
