import React from "react";
import classNames from "classnames/bind";

import { TopPageComponentProps } from "./TopPageComponent.props";

import styles from "./TopPageComponent.module.css";
import { HhData, Htag, P, Tag } from "../../components";

let cx = classNames.bind(styles);

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
}: TopPageComponentProps): JSX.Element => {
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
					<span>Sorts</span>
				</div>
				<div>
					{products &&
						products.map((p) => <div key={p._id}>{p.title}</div>)}
				</div>
				<div className={cx(styles.hhTitle)}>
					<Htag tag="h2">Vacancy - {page.category}</Htag>
					{products && (
						<Tag color="red" size="m">
							hh.ru
						</Tag>
					)}
				</div>
				{page.hh && <HhData {...page.hh} />}
			</div>
		</>
	);
};
