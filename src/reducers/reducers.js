//reducers
import { combineReducers } from 'redux';

import { SET_FILTER, SET_MOVIES, SET_USER, ADD_FAVORITE, LOGIN } from '../actions/actions';

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

// function login(state = '', action) {
//   switch (action.type) {
//     case LOGIN:
//     return action.value;
//   default:
//     return state;    
//   }
// }

const userData = {
    username: '',
    password:'',
    email: '',
    birthdate: '',
    favorites: []
  }

function user(state = userData, action) {
  switch (action.type) {
    case SET_USER:
      console.log('SET_USER reducer reached');
      return action.value;
    case ADD_FAVORITE:
      return {
        ...state,
        favorites: action.id
      }
    default:
      return state;  //returns initial state = ''
  }
}



const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  login
});

export default moviesApp;