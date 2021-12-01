import React from "react";
import axios from "axios";

import { withLayout } from "../../layout/Layout";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { API } from "../../helpers/api";
import { ParsedUrlQuery } from "querystring";
import { TopPageModel } from "../../interfaces/page.interface";
import { firstLevelMenu } from "../../helpers/helpers";
import { TopLevelCategory } from "../../interfaces/enum";
import { TopPageComponent } from "../../page-components";

function TopPage({ firstCategory, page, products }: TopPageProps): JSX.Element {
	if (!page || !products) {
		return <></>;
	}
	return (
		<>
			<TopPageComponent
				products={products}
				page={page}
				firstCategory={firstCategory}
			/>
		</>
	);
}

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
	let paths: string[] = [];
	for (const m of firstLevelMenu) {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: m.id,
		});
		paths = paths.concat(
			menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}/`))
		);
	}

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
	params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
	if (!params) {
		return {
			notFound: true,
		};
	}

	const firstCategoryItem = firstLevelMenu.find(
		(m) => m.route === params.type
	);

	if (!firstCategoryItem) {
		return {
			notFound: true,
		};
	}

	try {
		const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
			firstCategory: firstCategoryItem.id,
		});

		if (menu.length === 0) {
			return {
				notFound: true,
			};
		}

		const { data: page } = await axios.get<TopPageModel>(
			API.topPage.byAlias + params.alias
		);

		const { data: products } = await axios.post<ProductModel[]>(
			API.product.find,
			{
				category: page.category,
				limit: 10,
			}
		);

		return {
			props: {
				menu,
				firstCategory: firstCategoryItem.id,
				page,
				products,
			},
		};
	} catch (error) {
		return {
			notFound: true,
		};
	}
};

interface TopPageProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}
