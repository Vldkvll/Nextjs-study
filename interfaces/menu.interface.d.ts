interface Id {
    secondCategory: string
}

interface PageItem {
    alias: string
    title: string
    _id: string
    category: string
}

interface MenuItem {
    _id: Id
    pages: PageItem[]
	isOpened?: boolean
}


interface FirstLevelMenuItem {
	route: string;
	name: string;
	icon: JSX.Element;
	id: TopLevelCategory;
}


interface IFirstLevelMenuItem {
	route: string;
	name: string;
	icon: JSX.Element;
	id: TopLevelCategory;
}
