//actions ~ action types
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
//export const SET_USER = "SET_USER";


//action creators
export function setMovies(value) {
  console.log('SET_MOVIES action is triggered');
  return {
    type: SET_MOVIES,
    value // this is what has to change
  }
}

export function setFilter(value) {
  console.log('SET_FILTER action is triggered');
  return {
    type: SET_FILTER,
    value // this is what has to change
  }
}

// export function setUser(value) {
//   console.log('SET_USER action is triggered');
//   return {
//     type: SET_USER,
//     value 
//   }
// }


