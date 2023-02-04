import { UPDATE_CART } from "./constants"

export const cartReducer = (state, action) => {
    const {type, payload} = action 

    switch(type) {
        case UPDATE_CART:
            return{
                ...state,
                cart: payload,
            };
        default:
            return state;
    }
}