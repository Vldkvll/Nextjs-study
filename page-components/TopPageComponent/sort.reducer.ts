import { SortEnum } from '../../components/Sort/Sort.props';

export type SortAction = { type: SortEnum.Price} | { type: SortEnum.Rating}


export interface SortReducerState {
    sort: SortEnum
    products:  ProductModel[]
}

export const SortReducer = (state: SortReducerState, action: SortAction):SortReducerState => {

    switch (action.type) {
        case SortEnum.Rating:
            
            return {
                sort: SortEnum.Rating,
                products: state.products.sort((a,b) => a.initialRating-b.initialRating)
            }
        case SortEnum.Price:
            
            return {
                sort: SortEnum.Price,
                products: state.products.sort((a,b) => a.price-b.price)
            }
    
        default:
            throw new Error('Wrong sort type')
    }
}