import {
  INCREASE,
  DECREASE,
  REMOVE,
  CLEAR_CART,
  GET_AMOUNT,
  GET_TOTALS,
} from './actions';

//items
import cartItems from './cart-items';

//reducer

const initialStore = {
  cart: cartItems,
  total: 1500,
  amount: 10,
};

export default function reducer(state = initialStore, action) {
  switch (action.type) {
    case CLEAR_CART:
      return { ...state, cart: [] };

    case DECREASE:
      let temporaryCart = [];
      if (action.payload.amount === 1) {
        temporaryCart = state.cart.filter(
          (item) => item.id !== action.payload.id
        );
      } else {
        temporaryCart = state.cart.map((cartItem) => {
          if (cartItem.id === action.payload.id) {
            cartItem = { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        });
      }
      return { ...state, cart: temporaryCart };

    // eslint-disable-next-line no-fallthrough
    case INCREASE:
      let tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload.id) {
          cartItem = { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: tempCart };

    case REMOVE:
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };

    case GET_TOTALS:
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;

          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        { total: 0, amount: 0 }
      );
      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };

    default:
      return state;
  }
}
