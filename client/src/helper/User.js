import { useSelector } from 'react-redux';

export const useLoggedInStatus = () => {
  const userStatus = useSelector(state => {
    return state.globalReducer.user;
  })

  return userStatus.success;
}