import React from 'react';
import { Link, useHistory, useRouteMatch } from 'react-router-dom';
import { userIsAuthorized } from '../../helper/storage';
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import HomeRounded from '@material-ui/icons/HomeRounded';
import SearchRounded from '@material-ui/icons/SearchRounded';
import PersonRounded from '@material-ui/icons/PersonRounded';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import IconButton from '@material-ui/core/IconButton';
import CloseRounded from '@material-ui/icons/CloseRounded';
import SignIn from '../User/SignIn';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import SignUp from '../User/SignUp';

const ButtonAction = ({
  exact,
  to,
  dialog,
  ...props
}) => {
  const history = useHistory();
  const matches = useRouteMatch({
    path: to, exact: exact
  });

  const handleRoute = e => {
    e.preventDefault();

    if (dialog && !userIsAuthorized()) {
      return dialog && dialog(true);
    }

    return !matches && history.push(to);
  }

  return (
    <BottomNavigationAction
      to={to} {...props}
      component={Link}
      className={(matches && 'Mui-selected')}
      onClick={handleRoute}
    />
  )
}

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />;
});

const StickyNavigation = () => {
  const [open, setOpen] = React.useState(false);
  const [signup, setSignup] = React.useState(false);

  const handleOpen = e => {
    if (!userIsAuthorized()) {
      e.preventDefault();
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSignUp = () => {
    setOpen(false);

    setTimeout(() => {
      openSignup(true)
    }, 175);
  }

  const openSignup = () => {
    setSignup(true);
  }

  const closeSignup = () => {
    setSignup(false);
  }

  const handleSignIn = () => {
    setSignup(false);

    setTimeout(() => {
      setOpen(true)
    }, 175);
  }

  const icon = {
    home: <HomeRounded style={{ fontSize: 30 }} />,
    search: <SearchRounded style={{ fontSize: 30 }} />,
    profile: <PersonRounded style={{ fontSize: 30 }} />
  }

  return (
    <nav id="CSXBottomNavigation" className="CSXBottomNavigation">
      <div className="CSXBottomNavigation-wrapper">
        <BottomNavigation showLabels>
          <ButtonAction exact to="/" label="Home" icon={ icon.home } />
          <ButtonAction to="/search" label="Cari" icon={ icon.search } />
          <ButtonAction
            to="/profile"
            label="Saya"
            dialog={setOpen}
            icon={ icon.profile }
            onClick={handleOpen}
          />
        </BottomNavigation>
        <Dialog
          fullScreen open={open}
          onClose={handleClose}
          transitionDuration={350}
          TransitionComponent={Transition}
          className="CSXAbsoluteToolbar"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseRounded />
            </IconButton>
            <Button
              variant="text"
              color="primary"
              style={{marginLeft: 'auto'}}
              onClick={handleSignUp}
            >
              Daftar
            </Button>
          </Toolbar>
          <SignIn dialog={setOpen} />
        </Dialog>
        <Dialog
          fullScreen open={signup}
          onClose={handleClose}
          transitionDuration={350}
          TransitionComponent={Transition}
          className="CSXAbsoluteToolbar"
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="primary"
              onClick={closeSignup}
              aria-label="close"
            >
              <CloseRounded />
            </IconButton>
            <Button
              variant="text"
              color="primary"
              style={{marginLeft: 'auto'}}
              onClick={handleSignIn}
            >
              Masuk
            </Button>
          </Toolbar>
          <SignUp dialog={setSignup} />
        </Dialog>
      </div>
    </nav>
  );
}

export default StickyNavigation;
