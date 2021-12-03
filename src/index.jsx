import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import MainView from './components/main-view/main-view';
import moviesApp from './reducers/reducers';

import Container from 'react-bootstrap/Container';

// Import statement to indicate that you need to bundle `./index.scss`
import './index.scss';

//create the Redux store:
const store = createStore(moviesApp);

// Main component (will eventually use all the others)
class myFlixApplication extends React.Component {
  render() {
    return (
        <Container>
             
              <MainView />
            
        </Container>
    );
  }
}

// Finds the root of your app
const container = document.getElementsByClassName('app-container')[0];

// Tells React to render your app in the root DOM element
ReactDOM.render(React.createElement(myFlixApplication), container);