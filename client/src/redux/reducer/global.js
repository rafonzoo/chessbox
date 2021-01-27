// import { userStorage } from "../../helper/storage";

const globalStates = {
  user: {}
};

export const globalReducer = (state = globalStates, action) => {
  switch(action.type) {
    case 'USER_LOGGED_IN':
      return { ...state, user: action.payload };

    case 'UPDATE_USER_ENTRY':
      state.user.entries.push(action.payload);

      return { ...state };
      
    default:
      return state;
  }
}

export default globalReducer;