import React, { KeyboardEvent, useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { motion, useReducedMotion } from "framer-motion";

import styles from "./Menu.module.css";
import { AppContext, IAppContext } from "../../context/app.context";
import { firstLevelMenu } from "../../helpers/helpers";

let cx = classNames.bind(styles);

export const Menu = (): JSX.Element => {
	const { menu, firstCategory, setMenu } =
		useContext<IAppContext>(AppContext);
	const shouldReduceMotion = useReducedMotion();

	const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();

	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: shouldReduceMotion
				? {}
				: {
						when: "beforeChildren",
						staggerChildren: 0.1,
				  },
		},
		hidden: { marginBottom: 0 },
	};

	const variantsChildren = {
		visible: {
			opacity: 1,
			height: 31,
		},
		hidden: {
			opacity: 0,
			height: 0,
		},
	};

	const openSecondLevel = (secondCategory: string) => {
		setMenu &&
			setMenu(
				menu.map((m) => {
					if (m._id.secondCategory === secondCategory) {
						setAnnounce(m.isOpened ? "closed" : "opened");
						m.isOpened = !m.isOpened;
					}
					return m;
				})
			);
	};

	const openSecondLevelKey = (key: KeyboardEvent, secondCategory: string) => {
		if (key.code === "Space" || key.code === "Enter") {
			key.preventDefault();
			openSecondLevel(secondCategory);
		}
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map((m) => (
					<li aria-expanded={m.id === firstCategory} key={m.route}>
						<Link href={`/${m.route}`}>
							<a>
								<div
									className={cx(styles.firstLevel, {
										[styles.firstLevelActive]:
											m.id === firstCategory,
									})}
								>
									{m.icon}
									<span>{m.name}</span>
								</div>
							</a>
						</Link>
						{m.id === firstCategory && buildSecondLevel(m)}
					</li>
				))}
			</ul>
		);
	};

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<ul className={styles.secondBlock}>
				{menu.map((m) => {
					if (
						m.pages
							.map((p) => p.alias)
							.includes(router.asPath.split("/")[2])
					) {
						m.isOpened = true;
					}
					return (
						<li key={m._id.secondCategory}>
							<button
								onKeyDown={(key: KeyboardEvent) =>
									openSecondLevelKey(
										key,
										m._id.secondCategory
									)
								}
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevel(m._id.secondCategory)
								}
							>
								{m._id.secondCategory}
							</button>
							<motion.ul
								layout
								variants={variants}
								initial={m.isOpened ? "visible" : "hidden"}
								animate={m.isOpened ? "visible" : "hidden"}
								className={cx(styles.secondLevelBlock)}
							>
								{buildThirdLevel(
									m.pages,
									menuItem.route,
									m.isOpened ?? false
								)}
							</motion.ul>
						</li>
					);
				})}
			</ul>
		);
	};

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		isOpened: boolean
	) => {
		return pages.map((p) => (
			<motion.li
				key={`${route}+${p.alias}+${p._id}`}
				variants={variantsChildren}
			>
				<Link href={`/${route}/${p.alias}`}>
					<a
						aria-current={
							`/${route}/${p.alias}` === router.asPath
								? "page"
								: false
						}
						tabIndex={isOpened ? 0 : -1}
						className={cx(styles.thirdLevel, {
							[styles.thirdLevelActive]:
								`/${route}/${p.alias}` === router.asPath,
						})}
					>
						{p.category}
					</a>
				</Link>
			</motion.li>
		));
	};

	return (
		<nav role={"navigation"} className={styles.menu}>
			{announce && (
				<span role="log" className="visuallyHiden">
					{announce === "opened" ? "развернуто" : "свернуто"}
				</span>
			)}
			{buildFirstLevel()}
		</nav>
	);
};
