import React, { useState, useRef, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../redux/actions/global';
import { Redirect, useHistory } from 'react-router-dom';
import { MuiButton } from '../../helper/mui';
import { parseTokenPayload, removeTokenStorage, userIsAuthorized } from '../../helper/storage';
import { GlobalHeader, LargeTitle } from '../Comp/Header';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const SignOut = () => {
  const [logoutDialog, setLogoutDialog] = useState(false);
  const [backdrop, setBackdrop] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleClickOpen = () => {
    setLogoutDialog(true);
  };

  const handleClose = () => {
    setLogoutDialog(false);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    setLogoutDialog(false);
    setBackdrop(true);

    setTimeout(() => {
      removeTokenStorage();
      setBackdrop(false);

      history.push('/');
    }, 700);

    setTimeout(() => dispatch(userData({})), 800);
  }

  return (
    <Fragment>
      <MuiButton
        variant="contained"
        size="large"
        color="primary"
        disableElevation
        onClick={handleClickOpen}
      >
        Keluar
      </MuiButton>
      <Dialog
        open={logoutDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          Anda yakin untuk keluar?
        </DialogTitle>
        <DialogActions>
          <MuiButton
            onClick={handleLogout}
            variant="contained"
            color="primary"
            disableElevation
            autoFocus
          > 
            Ya
          </MuiButton>
          <MuiButton
            onClick={handleClose}
            variant="outlined"
            color="primary"
            disableElevation
          > 
            Tidak
          </MuiButton>
        </DialogActions>
      </Dialog>
      <Backdrop
        open={backdrop}
        style={{
          zIndex: '1',
          backgroundColor: 'rgba(255,255,255, .5)'
        }}
      >
        <CircularProgress color="primary" />
      </Backdrop>
    </Fragment>
  );
}

const Profile = () => {
  const rendering = useRef(false);
  const dispatcher = useDispatch();
  const user = useSelector(state => {
    return state.reducerUser.account;
  });

  useEffect(() => {
    rendering.current = true;
    
    if (!user.id) axios
      .get('/api/user/' + parseTokenPayload().id)
      .then(
        (response) => {
          if (rendering.current) {
            const userProfile = {...response.data.body};
            delete userProfile.confirmPassword;
            delete userProfile.password;

            dispatcher(userData(userProfile));
          }
        },
        (error) => (rendering.current = false),
    );

    return () => (rendering.current = false);

  }, [dispatcher, user.id]);

  if (!userIsAuthorized())
    return <Redirect to="/" />;
  else
    return (
      <Fragment>
        <GlobalHeader>
          <LargeTitle label={user.username || "Profile"} />
        </GlobalHeader>
        <SignOut />
      </Fragment>
    );
}

export default Profile;