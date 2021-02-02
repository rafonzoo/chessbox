import React, { useState } from 'react';
import { MuiButton } from '../../helper/mui';
import { setTokenStorage } from '../../helper/storage';
import TextField from '@material-ui/core/TextField';
import AuthSegment from '../Page/AuthSegment';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from "axios";

const SignUp = () => {
  // Define initial states
  const [user, setUser] = useState({
    email           : '',
    username        : '',
    password        : '',
    confirmPassword : '',
  });

  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);

  const showError = {
    email: {
      label: message.includes('email') ? true : false,
      text: message.includes('email') ? message : '',
    },
    username: {
      label: message.includes('username') ? true : false,
      text: message.includes('username') ? message : '',
    },
    password: {
      label: message.includes('password') ? true : false,
      text: message.includes('password') ? message : '',
    },
    confirmPassword: {
      label: message.includes('match') ? true : false,
      text: message.includes('match') ? message : '',
    },
  }

  const changedEmail = e => setUser({
    ...user, email: e.target.value
  });
  const changedUsername = e => setUser({
    ...user, username: e.target.value
  });
  const changedPassword = e => setUser({
    ...user, password: e.target.value
  });
  const changedConfirmPassword = e => setUser({
    ...user, confirmPassword: e.target.value
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    axios.post('/api/user', {
      username        : user.username,
      email           : user.email,
      password        : user.password,
      confirmPassword : user.confirmPassword
    })

    .then(
      (response) => {
        setTokenStorage(response.data.body);
        setMessage(response.data.message);
        setOpen(true);
      },
      (error) => {
        setMessage(error.response.data.message);
        setOpen(false)
      }
    );

    setMessage('');
  }

  if (message !== '' && message.includes('success')) {
    setTimeout(() => (window.location.href = '/profile'), 1400);
  }

  return (
    <AuthSegment id="SignUp" title="Daftar akun anda">
      <form
        onSubmit={onSubmit}
        autoComplete="off"
      >
        <TextField
          required
          autoComplete="email"
          label="Alamat email"
          variant="outlined"
          type="email"
          value={user.email}
          error={showError.email.label}
          helperText={showError.email.text}
          onChange={changedEmail}
        />
        <TextField
          required
          autoComplete="username"
          label="Nama user"
          variant="outlined"
          type="text"
          value={user.username}
          error={showError.username.label}
          helperText={showError.username.text}
          onChange={changedUsername}
        />
        <TextField
          required
          label="Kata sandi"
          variant="outlined"
          type="password"
          value={user.password}
          error={showError.password.label}
          helperText={showError.password.text}
          onChange={changedPassword}
        />
        <TextField
          required
          label="Konfirm sandi"
          variant="outlined"
          type="password"
          value={user.confirmPassword}
          error={showError.confirmPassword.label}
          helperText={showError.confirmPassword.text}
          onChange={changedConfirmPassword}
        />
        <MuiButton
          type="submit"
          size="large"
          variant="contained"
          color="primary"
          className="action"
          disableElevation
        >
          { message.includes('success') ? 'Berhasil!' : 'Daftar' }
        </MuiButton>
      </form>
      <Backdrop
        open={open}
        onClick={() => setOpen(false)}
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

export default SignUp;