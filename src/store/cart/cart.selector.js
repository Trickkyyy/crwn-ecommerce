import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cartSlice) => cartSlice.cartItems
)

export const selectIsOpen = createSelector(
    [selectCartReducer],
    (cartSlice)=> cartSlice.isOpen
)

// Cart count
export const selectCartCount = createSelector(
    [selectCartItems],
    (cartItems)=> cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    )
)

// Cart total
export const selectCartTotal = createSelector(
    [selectCartItems],
    (cartItems) => cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    )
)
