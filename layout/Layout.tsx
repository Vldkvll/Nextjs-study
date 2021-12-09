import React, { FC, useRef, useState, KeyboardEvent } from "react";
import classNames from "classnames/bind";

import { AppContextProvider, IAppContext } from "../context/app.context";
import { ILayout } from "./Layout.props";
import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/SideBar";
import { Footer } from "./Footer/Footer";

import styles from "./Layout.module.css";
import { Up } from "../components";

let cx = classNames.bind(styles);

export const Layout = ({ children }: ILayout): JSX.Element => {
	const [isSkipling, setIsSkipling] = useState<Boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipling(false);
	};

	return (
		<div className={styles.wrapper}>
			<a
				onKeyDown={skipContentAction}
				onFocus={() => setIsSkipling(true)}
				tabIndex={1}
				className={cx(styles.skipling, {
					[styles.display]: isSkipling,
				})}
			>
				Сразу к содержанию
			</a>
			<Header className={styles.header} />
			<SideBar className={styles.sidebar} />
			<main
				role="main"
				ref={bodyRef}
				tabIndex={0}
				className={styles.body}
			>
				{children}
			</main>
			<Footer className={styles.footer} />
			<Up />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown> & IAppContext>(
	Component: FC<T>
) => {
	return function withLayoutComponent(props: T): JSX.Element {
		return (
			<AppContextProvider
				menu={props.menu}
				firstCategory={props.firstCategory}
			>
				<Layout>
					<Component {...props} />
				</Layout>
			</AppContextProvider>
		);
	};
};
