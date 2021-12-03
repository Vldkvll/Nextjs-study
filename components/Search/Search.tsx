import React, { useState } from "react";
import classNames from "classnames/bind";

import { SearchProps } from "./Search.props";
import SearchIcon from "./glass.svg";

import styles from "./Search.module.css";
import { Button, Input } from "..";
import { useRouter } from "next/router";

let cx = classNames.bind(styles);

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>("");
	const router = useRouter();

	const goToSearch = () => {
		router.push({
			pathname: "/search",
			query: {
				q: search,
			},
		});
	};

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Enter") {
			goToSearch();
		}
	};

	return (
		<div className={cx(styles.search, className)} {...props}>
			<Input
				className={styles.input}
				placeholder="Search..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance={"primary"}
				className={styles.button}
				onClick={goToSearch}
			>
				<SearchIcon />
			</Button>
		</div>
	);
};
