export const USER_LOGGED_IN    = 'USER_LOGGED_IN';
export const UPDATE_USER_ENTRY = 'UPDATE_USER_ENTRY';

export const userProfile = payload => (
  { type: USER_LOGGED_IN, payload }
);

export const updateProfile = payload => (
  { type: UPDATE_USER_ENTRY, payload }
);
