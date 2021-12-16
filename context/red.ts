const  defaultState = {
    movies: [],
    loading: false,
    error: null,
    list: false
}

const popMovies = (state= defaultState, action ) => {
    switch (action.type) {
        case 'FETCH_MOVIES': 
            return {loading: true, error: null, users: [], list: false }
            
        case 'FETCH_MOVIE_SUCCESS': 
            return {loading: false, error: null, users: action.payload, list: false }
            
        case 'FETCH_MOVIES_ERROR': 
            return {loading: false, error: action.payload, users: [], list: false }
            
    
        case 'SWITCH_VIEW_LIST': 
            return {...state, list: true }
            
    
        case 'SWITCH_VIEW_GRID': 
            return {...state, list: false }
            
    
        default:
            return state;
    }
}

// index.js

import {combineReducers} from 'redux'

export const rootReducer = combineReducers({
    popMovies,
})

// popular.jsx

const { movies,
    loading,
    error,
    list} = useSelector( state => state.popMovies)
    const dispatch = useDispatch(function)
    useEffect(() => {
        dispatch(fetchMovies())
        }
    }, [])

    if (loading) {
        return <h1>loading...</h1>
    }

    if (error) {
        return <h1>{error}</h1>
    }


    // action-creator
    // action-creator.js

    const fetchMoviesAC = () => {
        return {type: 'FETCH_MOVIES'}
    }
    const fetchMoviesSuccessAC = (p) => {
        return {type: 'FETCH_MOVIES', payload:p}
    }
    const fetchMoviesErrorAC = () => {
        return {type: 'FETCH_MOVIES', payload: 'Error'}
    }
    
    export const fetchMovies = () => {
        return async (dispatch) => {
            try {
                dispatch(fetchMoviesAC())
                const response = await UserApi.get()
                dispatch(fetchMoviesSuccessAC(response.data))
            } catch (error) {
                
            }
        }
    }