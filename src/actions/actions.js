//actions ~ action types
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const SET_FAVORITE = "SET_FAVORITE";


//action creators
export function setMovies(value) {
  console.log('SET_MOVIES action is triggered');
  return {
    type: SET_MOVIES,
    value
  }
}

export function setFilter(value) {
  console.log('SET_FILTER action is triggered');
  return {
    type: SET_FILTER,
    value
  }
}

export function setUser(value) {
  console.log('SET_USER action is triggered');
  return {
    type: SET_USER,
    value  
  }
}

export function setFavorite(value) {
  console.log('SET_FAVORITE action is triggered');
  return {
    type: SET_FAVORITE,
    value
  }
}
