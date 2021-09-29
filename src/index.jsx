import React from 'react';
import ReactDOM from 'react-dom';
import MainView from './components/main-view/main-view';
import { Container } from 'react-bootstrap';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//creating my "store" = "globalized state"

const store = createStore(moviesApp, devToolsEnhancer());

//console.log(store.getState());

// store.dispatch({
//     type: 'SET_MOVIES',
//     payload
//   });
// store.dispatch({
//     type: 'SET_USER',
//     payload
//   });
// store.dispatch({
//     type: 'SET_FILTER',
//     payload 
//   });


// Main component (will eventually use all the others)
class myFlixApplication extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container>
          <MainView />    
        </Container>
      </Provider>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// store.subscribe(() => {
//   console.log('store updated!', store.getState())
// });
// store.dispatch({
//   type: 'SET_USER',
//   payload: 
// });
// store.dispatch({
//   type: 'SET_FILTER',
//   payload: 
// });

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);