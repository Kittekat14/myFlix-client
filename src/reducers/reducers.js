//reducers
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      console.log('SET_FILTER reducer reached');
      return action.value;
    default:
      return state; //returns initial state = ''
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      console.log('SET_MOVIES reducer reached');
      return action.value;
    default:
      return state;  //returns initial state = []
  }
}

<<<<<<< HEAD

// function user(state = '', action) {
//   switch (action.type) {
//     case SET_USER:
//       console.log('SET_USER reducer reached');
//       return action.value;
//     default:
//       return state;
//   }
//   }
=======
function user(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER reducer reached');
      return action.value;
    default:
      return state;  //returns initial state = ''
  }
}

function favorite(state = [], action) {
  switch (action.type) {
    case SET_FAVORITE: // I have to create that action still
      console.log('SET_FAVORITE reducer reached');
      return action.value;
    default:
      return state;  //returns initial state = ''
  }
}

>>>>>>> parent of bad0323 (creating new user reducer and setUser action)

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
<<<<<<< HEAD
  //user
=======
  user,
  favorite
>>>>>>> parent of bad0323 (creating new user reducer and setUser action)
});

export default moviesApp;