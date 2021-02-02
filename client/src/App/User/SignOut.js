import { removeTokenStorage } from "../../helper/storage";

const SignOut = () => {
  removeTokenStorage();
  
  return (
    <div>SignOut page</div>
  );
}

export default SignOut;