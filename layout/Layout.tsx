import React, { FC } from "react";
import classNames from "classnames/bind";

import { AppContextProvider, IAppContext } from "../context/app.context";
import { ILayout } from "./Layout.props";
import { Header } from "./Header/Header";
import { SideBar } from "./SideBar/SideBar";
import { Footer } from "./Footer/Footer";

import styles from "./Layout.module.css";

let cx = classNames.bind(styles);

export const Layout = ({ children }: ILayout): JSX.Element => {
	return (
		<div className={styles.wrapper}>
			<Header className={styles.header} />
			<SideBar className={styles.sidebar} />
			<main className={styles.body}>{children}</main>
			<Footer className={styles.footer} />
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
