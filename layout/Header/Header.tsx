import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames/bind";
import { motion, useReducedMotion } from "framer-motion";

import { IHeader } from "./Header.props";
import Logo from "../logo.svg";

import styles from "./Header.module.css";
import { ButtonIcon } from "../../components/ButtonIcon/ButtonIcon";
import { SideBar } from "../SideBar/SideBar";

let cx = classNames.bind(styles);

export const Header = ({ className, ...props }: IHeader): JSX.Element => {
	const [isOpened, setisOpened] = useState<boolean>(false);

	const shouldReduceMotion = useReducedMotion();

	const router = useRouter();

	useEffect(() => {
		setisOpened(false);
	}, [router]);

	const variants = {
		opened: {
			opacity: 1,
			x: 0,
			transition: shouldReduceMotion
				? {}
				: {
						stiffness: 20,
				  },
		},
		closed: { opacity: shouldReduceMotion ? 1 : 0, x: "100%" },
	};

	return (
		<header className={cx(styles.header, className)} {...props}>
			<Logo className={cx(styles.logo)} />
			<ButtonIcon
				appearance={"white"}
				icon="menu"
				onClick={() => setisOpened(true)}
				className={styles.menuOpened}
			/>
			<motion.div
				variants={variants}
				initial={"closed"}
				animate={isOpened ? "opened" : "closed"}
				className={styles.mobileMenu}
			>
				<SideBar />
				<ButtonIcon
					className={styles.menuClosed}
					appearance={"white"}
					icon="close"
					onClick={() => setisOpened(false)}
				/>
			</motion.div>
		</header>
	);
};
