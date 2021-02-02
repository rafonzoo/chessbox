import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { setTokenStorage } from "../../helper/storage";
import { MuiButton } from '../../helper/mui';
import TextField from '@material-ui/core/TextField';
import AuthSegment from '../Page/AuthSegment';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const SignIn = ({ dialog }) => {
  // Define initial states
  const [user, setUser] = useState({
    username        : '',
    password        : '',
  });

  const [message, setMessage] = useState('');
  const [backdrop, setBackdrop] = useState(false);
  const [status, setStatus] = useState('Masuk');
  const history = useHistory();

  const showError = {
    email: {
      label: message.includes('email') ? true : false,
      text: message.includes('email') ? message : '',
    },
    password: {
      label: message.includes('password') ? true : false,
      text: message.includes('password') ? message : '',
    }
  }

  const changedEmail = e => setUser({
    ...user, email: e.target.value
  });
  const changedPassword = e => setUser({
    ...user, password: e.target.value
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    setStatus('Memeriksa...');
    setBackdrop(true);

    // Going to validating the form
    axios.post('/api/auth', {
      email           : user.email,
      password        : user.password,
    })

    .then(
      (response) => {
        setTokenStorage(response.data.body);
        setMessage(response.data.message);
        setStatus('Berhasil!');

        history.push('/profile');
        setBackdrop(false);
        dialog(false);
      },
      (error) => {
        setMessage(error.response.data.message);
        setStatus('Masuk');
        setBackdrop(false);
      }
    );

    setMessage('');
  }

  return (
    <AuthSegment id="SignIn" title="Masuk ke akun anda:">
      <form
        noValidate
        onSubmit={onSubmit}
      >
        <TextField
          required
          label="Alamat email"
          variant="outlined"
          type="email"
          autoComplete="email"
          value={user.email || ''}
          error={showError.email.label}
          helperText={showError.email.text}
          onChange={changedEmail}
        />
        <TextField
          required
          label="Kata sandi"
          variant="outlined"
          type="password"
          value={user.password || ''}
          error={showError.password.label}
          helperText={showError.password.text}
          onChange={changedPassword}
        />
        <MuiButton
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          className="action"
          disableElevation
        >
          { status }
        </MuiButton>
      </form>
      <Backdrop
        open={backdrop}
        style={{
          zIndex: '1',
          backgroundColor: 'rgba(255,255,255, .5)'
        }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </AuthSegment>
  );
}

export default SignIn;