import React, { useState } from "react";
import axios from "axios";

import { Button, Htag, P, Paragraph, Raiting, Tag } from "../components";
import { withLayout } from "../layout/Layout";
import { GetStaticProps } from "next";
import { API } from "../helpers/api";

function Home({ menu }: HomeProps): JSX.Element {
	const [rating, setRating] = useState<number>(5);
	return (
		<>
			<Htag tag="h1">Text</Htag>

			<Button appearance={"primary"} arrow={"right"}>
				Primary Button
			</Button>
			<Button appearance={"ghost"} arrow={"down"}>
				Ghost Button
			</Button>
			<Paragraph size="lg">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
				ut.
			</Paragraph>
			<Paragraph size="md">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
				autem alias doloribus consequuntur impedit debitis!
			</Paragraph>
			<Paragraph size="sm">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
				blanditiis iure ipsam minima! Suscipit itaque delectus fugiat
				tenetur nemo soluta?
			</Paragraph>
			<P size="l">
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
				ut.
			</P>
			<P size="m">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
				autem alias doloribus consequuntur impedit debitis!
			</P>
			<P size="s">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores
				blanditiis iure ipsam minima! Suscipit itaque delectus fugiat
				tenetur nemo soluta?
			</P>
			<Tag size="s" color="gray">
				Tag
			</Tag>
			<Tag size="s" color="ghost">
				Tag
			</Tag>
			<Tag size="s" color="green">
				Tag
			</Tag>
			<Tag href="#" size="s" color="red">
				Tag
			</Tag>
			<Tag href="#" size="m" color="primary">
				Tag
			</Tag>
			<Raiting rating={4} isEditable />
			<Raiting rating={rating} isEditable setRating={setRating} />
			<ul>
				{menu.map((m) => (
					<li key={m._id.secondCategory}>{m._id.secondCategory}</li>
				))}
			</ul>
		</>
	);
}

export default withLayout(Home);

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
	const firstCategory = 0;
	const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
		firstCategory,
	});
	return {
		props: {
			menu,
			firstCategory,
		},
	};
};

interface HomeProps extends Record<string, unknown> {
	menu: MenuItem[];
	firstCategory: number;
}
