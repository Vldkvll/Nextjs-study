import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { motion } from "framer-motion";

import styles from "./Menu.module.css";
import { AppContext, IAppContext } from "../../context/app.context";
import { firstLevelMenu } from "../../helpers/helpers";

let cx = classNames.bind(styles);

export const Menu = (): JSX.Element => {
	const { menu, firstCategory, setMenu } =
		useContext<IAppContext>(AppContext);

	const router = useRouter();

	const variants = {
		visible: {
			marginBottom: 20,
			transition: {
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
						m.isOpened = !m.isOpened;
					}
					return m;
				})
			);
	};

	const buildFirstLevel = (): JSX.Element => {
		return (
			<>
				{firstLevelMenu.map((m) => (
					<div key={m.route}>
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
					</div>
				))}
			</>
		);
	};

	const buildSecondLevel = (menuItem: IFirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{menu.map((m) => {
					if (
						m.pages
							.map((p) => p.alias)
							.includes(router.asPath.split("/")[2])
					) {
						m.isOpened = true;
					}
					return (
						<div key={m._id.secondCategory}>
							<div
								className={styles.secondLevel}
								onClick={() =>
									openSecondLevel(m._id.secondCategory)
								}
							>
								{m._id.secondCategory}
							</div>
							<motion.div
								layout
								variants={variants}
								initial={m.isOpened ? "visible" : "hidden"}
								animate={m.isOpened ? "visible" : "hidden"}
								className={cx(styles.secondLevelBlock)}
							>
								{buildThirdLevel(m.pages, menuItem.route)}
							</motion.div>
						</div>
					);
				})}
			</div>
		);
	};

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map((p) => (
			<motion.div
				key={`${route}+${p.alias}+${p._id}`}
				variants={variantsChildren}
				// initial={"hidden"}
				// animate={"visible"}
			>
				<Link href={`/${route}/${p.alias}`}>
					<a
						className={cx(styles.thirdLevel, {
							[styles.thirdLevelActive]:
								`/${route}/${p.alias}` === router.asPath,
						})}
					>
						{p.category}
					</a>
				</Link>
			</motion.div>
		));
	};

	return <div className={styles.menu}>{buildFirstLevel()}</div>;
};
