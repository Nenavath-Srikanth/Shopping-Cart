import React from 'react';
import { Provider } from 'react-redux';
// components
import Navbar from './components/Navbar';
import CartContainer from './components/CartContainer';
// redux stuff
import { createStore } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';

// const composeEnhancers  = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// In react-redux we need Provider which will wrap our application and connect to access the info relayed by Provider

// second parameter ie the state is optional or pass it in the reducer
const store = createStore(reducer, composeWithDevTools());

console.log('Store.getstate', store.getState());

function App() {
  // cart setup

  return (
    <Provider store={store}>
      <Navbar />
      <CartContainer />
    </Provider>
  );
}

export default App;
