import React, { useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useLoggedInStatus } from "../../helper/User";
import axios from "axios";

const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '', email: '', password: '', message: '',
  });

  const userIsLoggedIn = useLoggedInStatus();

  const onChangeName = (e) => setFormState({...formState, username: e.target.value});
  const onChangeEmail = (e) => setFormState({...formState, email: e.target.value});
  const onChangePassword = (e) => setFormState({...formState, password: e.target.value});

  let responseMessage     = '';
  let userHasRegister     = useRef(false);

  const onSubmit = async (e) => {

    e.preventDefault();

    userHasRegister = true;
    
    try { // eslint-disable-next-line
      await axios.post('http://localhost:4000/api/user', {
        username : formState.username,
        email    : formState.email,
        password : formState.password
      });

      if (userHasRegister) {
        setFormState({ ...formState, message : 'Success!' });
      }

      return null;
    
    } catch (error) {
      userHasRegister = false;
      responseMessage = ( error.response &&
                          error.response.data );
    }
    
    setFormState(
      {
        username  : '',
        email     : '',
        password  : '',
        message   : responseMessage
      }
    );

    e.target.classList.add('was-validated');

    return () => (userHasRegister = false);
  }

  const isValid = formState.message.includes('Success!');

  if (isValid)
    return <Redirect to="/signin" />

  else if (userIsLoggedIn)
    return <Redirect to="/profile" />

  else
    return (
      <div className="container">
        <div className="mt-4 pt-3">
          <h2 className="text-center">Register Account</h2>
          <form onSubmit={onSubmit} className="needs-validation mt-4" noValidate>
            <div className="mb-2">
              <input required value={formState.username || ''} onChange={onChangeName} name="username" type="text" className="form-control" id="exampleInputName1" placeholder="Enter username"/>
            </div>
            <div className="mb-2">
              <input required value={formState.email || ''} onChange={onChangeEmail} name="email" type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter email"/>
            </div>
            <div className="mb-3">
              <input required value={formState.password || ''} onChange={onChangePassword} name="password" type="password" className="form-control" id="exampleInputPassword1" placeholder="Enter password"/>
              <div className={`${isValid ? 'valid' : 'invalid'}-feedback`}>{isValid ? 'Register success!' : formState.message}</div>
            </div>
            <div className="d-grid">
              <button className="btn btn-primary" type="submit">Register</button>
              <p className="text-center mt-1">
                <small className="text-muted">
                  Already have an account? <Link to="/signin">Sign in</Link>
                </small>
              </p>
            </div>
          </form>
        </div>
      </div>
  );
}

export default SignUp;