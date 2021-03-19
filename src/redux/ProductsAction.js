import swal from 'sweetalert';
import algoliasearch from 'algoliasearch/lite';

const client = algoliasearch('NY87YKT8V0', 'c876b56496c530946cd1bcf8d6f31c10');
const index = client.initIndex('dev_PRODUCT');

window.index = index;
export const setProducts = (result) => {
    return {
        type: "SET_PRODUCTS",
        data: result,
    };
};
export const changePage = (page, searchText) => {
    return {
        type: "SET_PAGE",
        page: page,
        searchText: searchText
    };
};


export const addInCart = (item, product) => {
    return {
        type: "ADD_TO_CART",
        item: item,
        product: product
    };
};

export const searchProduct = (searchText) => {
    return {
        type: "SEARCH_PRODUCT",
        searchText: searchText,
        page: 1
    };
};

export const changeMode = (mode) => {
    return {
        type: "CHANGE_MODE",
        mode: mode,
    };
};

export const updateCart = (item, product) => {
    return {
        type: "UPDATE_CART",
        item: item,
        product: product
    };
};

export const fetch_products = () => {
    return function(dispatch, getState) {
        let {page, cart, searchText} = getState();
        index.search(searchText, {
            page: page,
        }).then(({ hits }) => {
            for (let index in cart) {
                for (let subindex in hits) {
                    if (cart[index].objectID === hits[subindex].objectID) {
                        hits[subindex]['in_cart'] = 1;
                        break;
                    }
                }
            }
            dispatch(setProducts(hits))
        }).catch(()=> {
            dispatch(setProducts([]))
        });
        
    };
};


export const add_to_cart = (objectID) => {
    return function(dispatch, getState) {
        let {products, cart} = getState();
        let item = [];
        for (let index in products) {
            if (products[index].objectID === objectID) {
                item = products[index];
                products[index]['in_cart'] = 1;
                break;
            }
        }
        
        if (cart.length > 0) {
            for (let index in cart) {
                if (cart[index].objectID === objectID) {
                    item['quantity'] = cart[index]['quantity'];
                    break;
                } else {
                    item['quantity'] = 1;
                }
            }
        } else {
            item['quantity'] = 1;
        }

        cart[cart.length] = item;
        dispatch(addInCart(cart, products));
    };
};

export const remove_from_cart = (objectID, add = false, remove_all = false) => {
    return function(dispatch, getState) {
        let {products, cart} = getState();
        for (let subindex in products) {
            products[subindex]['in_cart'] = 0;
        }
        let item = [];
        for (let index in cart) {
            if (cart[index].objectID === objectID) {
                item['quantity'] = (add) ? (cart[index]['quantity'] + 1) : (cart[index]['quantity'] - 1);
                cart[index]['quantity'] = item['quantity'];
                break;
            }
        }

        if (!add && remove_all && item['quantity'] > 0) {
                swal({
                    title: "Do you want to remove all?",
                    text: 'There is more than one quantity added in the cart. To remove the single quantity, Go to the cart!',
                    icon: "warning",
                    buttons: ["Close", "Remove All"],
                    dangerMode: true,
                }).then(willDelete => {
                    if (willDelete) {
                        cart = cart.filter(data => !(data.objectID === objectID));
                        for (let index in cart) {
                            for (let subindex in products) {
                                if (cart[index].objectID === products[subindex].objectID) {
                                    products[subindex]['in_cart'] = 1;
                                    break;
                                }
                            }
                        }
                        dispatch(updateCart(cart, products));
                    }
                });
        } else {
            if (item['quantity'] === 0) {
                cart = cart.filter(data => !(data.objectID === objectID));
            }
            for (let index in cart) {
                for (let subindex in products) {
                    if (cart[index].objectID === products[subindex].objectID) {
                        products[subindex]['in_cart'] = 1;
                        break;
                    }
                }
            }
            dispatch(updateCart(cart, products));
        }
    };
};

