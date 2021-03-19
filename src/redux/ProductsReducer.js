const initialState = {
    products: [],
    loading: true,
    cart: [],
    page: 1,
    searchText: '',
    changeMode: (window.location.href.search('/cart') > -1),
}

const ProductsReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SET_PRODUCTS': return {
            ...state,
            loading: false,
            products: action.data,
        }
        case 'ADD_TO_CART': 
        case 'UPDATE_CART': 
        return {
            ...state,
            cart: action.item,
            products: action.product,
        }
        
        case 'CHANGE_MODE':
            return {
                ...state,
                changeMode: action.mode
            }
        case 'SET_PAGE':
            return {
                ...state,
                page: action.page,
            }
        case 'SEARCH_PRODUCT':
            return {
                ...state,
                searchText: action.searchText,
                page: action.page
            }
        default : return state
    }
}
export default ProductsReducer