import { ADD_CART, DELETE_CART, INCREASE_CART, REDUCTION_CART } from "../types/cartType"

var stateDefault = {
    cart:[]
}

var cartReducer = (state = stateDefault,action) => {
    switch (action.type) {
        case ADD_CART:{
            var cartUpdate = [...state.cart]
            var index = cartUpdate.findIndex(item => item.id === action.product.id);
            if(index===-1) {
                var newItem = {...action.product,quantity:1};
                cartUpdate.push(newItem);
            }
            else {
                cartUpdate[index].quantity++;
            }
            state.cart = cartUpdate;
            return {...state}
        }

        case DELETE_CART:{
            var cartUpdate2 = [...state.cart];
            var index2 = cartUpdate2.findIndex(item => item.id === action.id);
            if(index2!==-1) {
                cartUpdate2.splice(index2, 1);
            }
            state.cart = cartUpdate2;
            return {...state}
        }

        case REDUCTION_CART:{
            var cartUpdate3 = [...state.cart];
            var index3 = cartUpdate3.findIndex(item => item.id === action.id);
            if(index3!==-1) {
                if(cartUpdate3[index3].quantity===1) {
                    cartUpdate3.splice(index3,1);
                }
                else{
                    cartUpdate3[index3].quantity--;
                }
            }
            state.cart = cartUpdate3;
            return {...state}
        }

        case INCREASE_CART:{
            var cartUpdate4 = [...state.cart];
            var index4 = cartUpdate4.findIndex(item => item.id === action.id);
            if(index4!==-1) {
                cartUpdate4[index4].quantity++;
            }
            state.cart = cartUpdate4;
            return {...state}
        }
        default: return {...state}
    }
}

export default cartReducer