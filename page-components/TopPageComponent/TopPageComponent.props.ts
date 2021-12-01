import { TopLevelCategory } from '../../interfaces/enum';
import { TopPageModel } from '../../interfaces/page.interface';

export interface TopPageComponentProps{
	firstCategory: TopLevelCategory;
	page: TopPageModel;
	products: ProductModel[];
}
