// import { userStorage } from "../../helper/storage";

const globalStates = {
  account: {}
};

export const reducerUser = (state = globalStates, action) => {
  switch(action.type) {
    case 'USER_DATA':
      return { ...state, account: action.payload };

    case 'USER_LOGGED_IN':
      return { ...state, user: action.payload };

    case 'UPDATE_USER_ENTRY':
      state.user.entries.push(action.payload);

      return { ...state };
      
    default:
      return state;
  }
}

export default reducerUser;