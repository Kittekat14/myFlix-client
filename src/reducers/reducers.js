//reducers
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state; //returns initial state = ''
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;  //returns initial state = []
  }
}

// function user(state = '', action) {

//   switch (action.type) {
//     case SET_USER:
//       console.log('setUser reducer reached');
//       return action.value;   
//     default:
//       return state;  // return { user: true } is when there is a user / returns initial state = '' by default
//   }

// }

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  //user
});

export default moviesApp;