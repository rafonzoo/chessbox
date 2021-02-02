import React, { Fragment } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { MuiButton } from '../../helper/mui';
import { removeTokenStorage, userIsAuthorized } from '../../helper/storage';
import { GlobalHeader, LargeTitle } from '../Comp/Header';

const Profile = () => {
  const history = useHistory();

  const handleLogout = () => {
    removeTokenStorage();
    history.push('/');
  }

  if (!userIsAuthorized())
    return <Redirect to="/" />
  else
    return (
      <Fragment>
        <GlobalHeader>
          <LargeTitle label="rafonzoo" />
        </GlobalHeader>
        <MuiButton
          variant="contained"
          size="large"
          color="primary"
          disableElevation
          onClick={handleLogout}
        >
          Logout
        </MuiButton>
      </Fragment>
    );
}

export default Profile;