import { ADD_TO_CART, REMOVE_FROM_CART, SAVE_SHIPPING_INFO } from "../constants/cartConstants";

export const cartReducer = (state={cartItems:[],shippingInfo:{}},action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existingItem = state.cartItems.find((cartItem)=>cartItem.product === item.product);
            if(existingItem){
                return {
                    ...state,
                    cartItems:state.cartItems.map((i)=> i.product === existingItem.product ? item : i)
                }
            }else{
                return {
                    ...state,
                    cartItems:[...state.cartItems,item]
                }
            }
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:action.payload
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cartItems:state.cartItems.filter((item)=>item.product !== action.payload)
            }

        default:
           return state;
    }
}