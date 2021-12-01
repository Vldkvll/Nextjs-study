import React, { createContext, PropsWithChildren, useState } from "react";
import { TopLevelCategory } from "../interfaces/enum";

export interface IAppContext {
	menu: MenuItem[];
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: MenuItem[]) => void;
}

export const AppContext = createContext<IAppContext>({
	menu: [],
	firstCategory: TopLevelCategory.Courses,
});

export const AppContextProvider = ({
	menu,
	firstCategory,
	children,
}: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setmenuState] = useState<MenuItem[]>(menu);
	const setMenu = (newMenu: MenuItem[]) => setmenuState(newMenu);

	return (
		<AppContext.Provider
			value={{ menu: menuState, firstCategory, setMenu }}
		>
			{children}
		</AppContext.Provider>
	);
};
