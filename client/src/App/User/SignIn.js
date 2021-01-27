import React, { useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { useForceUpdate } from "../../helper/hook";
import { userStorage } from "../../helper/storage";

const SignIn = () => {
  const [signin, setSignin] = useState({
    email: '', password: '', message: '',
  });

  const forceUpdate = useForceUpdate();

  let isRendered       = useRef(false);
  let errorMessage     = '';

  const onChangeEmail    = (e) => setSignin(
    {...signin, email: e.target.value} );

  const onChangePassword = (e) => setSignin(
    {...signin, password: e.target.value} );

  const onSubmit = async (e) => {

    e.preventDefault();
    
    isRendered = true;

    try {
      const url = 'http://localhost:4000/api/auth';
      const res = await axios.post(url, {
        email    : signin.email,
        password : signin.password
      });

      if (isRendered) {
        const auth = userStorage.auth();
        const uid  = userStorage.UID();

        auth.set(res.data.auth);
        uid.set(res.data.uid);
      }

      forceUpdate();
      
      return null;

    } catch (error) {
      errorMessage = ( error.response &&
                       error.response.data );
    }
    
    setSignin(
      {
        email     : '',
        password  : '',
        message   : errorMessage
      }
    );
  
    e.target.classList.add('was-validated');

    return () => (isRendered = false);
  }

  const hasLogin = userStorage.auth().get();

  if (hasLogin)
    return <Redirect to="/profile" />
  else
    return (
      <div className="container">
        <div className="mt-4 pt-3">
          <h2 className="text-center">Sign in</h2>
          <form onSubmit={onSubmit} className="needs-validation mt-4" noValidate>
            <div className="mb-2">
              <input required value={signin.email || ''} onChange={onChangeEmail} name="name" type="email" className="form-control" placeholder="Enter your email"/>
            </div>
            <div className="mb-3">
              <input required value={signin.password || ''} onChange={onChangePassword} name="password" type="password" className="form-control" placeholder="Enter your password"/>
              <div className={hasLogin ? "valid-feedback" : "invalid-feedback" }>{signin.message}</div>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Login</button>
              <p className="text-center mt-1">
                <small className="text-muted">
                  Doesn't have an account? <Link to="/signup">Sign up</Link>
                </small>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
}

export default SignIn;