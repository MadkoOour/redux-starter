//console.log(Redux);
//console.log(ReduxThunk);

////////////// Constants //////////////

const WITHDRAW_MONEY = "WITHDRAW_MONEY";
const DEPOSITE_MONEY = "DEPOSITE_MONEY";
const ADD_PRODUCT = "ADD_PRODUCT";
const GET_PRODUCTS = "GET_PRODUCTS";

////////////// Action Creators //////////////

const withdraw = (amount) => {
  return {
    type: WITHDRAW_MONEY,
    payload: amount,
  };
};

const deposite = (amount) => {
  return {
    type: DEPOSITE_MONEY,
    payload: amount,
  };
};

const addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    payload: product,
  };
};

const getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    payload: products,
  };
};

const fetchProducts = () => {
  return async (dispatch) => {
    const res = await fetch("https://fakestoreapi.com/products");
    const data = await res.json();
    //console.log( data );
    dispatch(getProducts(data));
  };
};
////////////// Reducers //////////////

const bankReducer = (state = 1000, action) => {
  switch (action.type) {
    case WITHDRAW_MONEY:
      return state - action.payload;

    case DEPOSITE_MONEY:
      return state + action.payload;

    default:
      return state;
  }
};

const productsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return [...state, ...action.payload];
    case ADD_PRODUCT:
      return [...state, action.payload];
    default:
      return state;
  }
};

const appReducer = Redux.combineReducers({
  bank: bankReducer,
  product: productsReducer,
});

const store = Redux.createStore(appReducer, Redux.applyMiddleware(ReduxThunk));

//store.dispatch(addProduct({ id: 1, title: "product-1" }));
store.dispatch(fetchProducts());
//store.dispatch(addProduct({ id: 21, title: "product-2" }));
//console.log(store.getState());

//console.log("Before Dispatch : " , store.getState());
//store.dispatch(withdraw(100));
//store.dispatch(withdraw(200));
//store.dispatch(deposite(1000));
//console.log("After Dispatch : " , store.getState());

store.subscribe(() => {
  console.log("Current State :", store.getState());
});
