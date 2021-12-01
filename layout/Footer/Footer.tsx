import React from "react";
import classNames from "classnames/bind";
import { format } from "date-fns";

import { IFooter } from "./Footer.props";

import styles from "./Footer.module.css";

let cx = classNames.bind(styles);

export const Footer = ({ className, ...props }: IFooter): JSX.Element => {
	return (
		<footer className={cx(className, styles.footer)} {...props}>
			<div>
				OwlTop {`\u00A9`} 2020-{format(new Date(), "yyyy")} Все права
				защищены
			</div>
			<a href={"#"} target="_blank">
				Пользовательское соглашение
			</a>
			<a href={"#"} target="_blank">
				Политика конфиденциальности
			</a>
		</footer>
	);
};
