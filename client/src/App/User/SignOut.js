import { userStorage } from "../../helper/storage";

const SignOut = () => {
  userStorage.auth().set(false);
  userStorage.UID().set('');

  return (
    <div>Your account has been logged out.</div>
  );
}

export default SignOut;