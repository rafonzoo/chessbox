import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

const StickyBar = () => {
  const StickyItem = ({ label, to, exact }) => {
    const active = useRouteMatch({
      path: to, exact: exact
    });

    const itemIsActive = active ?
      "sticky-item active" :
      "sticky-item";
    
    return (
      <div className={itemIsActive}>
        <div className="content">
          <div className="icon"></div>
          <p className="text">{label}</p>
          <Link className="link" to={to} />
        </div>
      </div>
    );
  }

  return (
    <nav id="stickynav" className="stickynav">
      <div className="stickynav-wrapper">
        <StickyItem exact={ true } to="/" label="Home" />
        <StickyItem to="/explore" label="Explore" />
        <StickyItem to="/chat" label="Chats" />
        <StickyItem to="/signout" label="Logout" />
        {/* <StickyItem to="/signup" label="Signup" />
        <StickyItem to="/profile" label="Profile" /> */}

        {/* { !userIsLoggedIn ? <StickyItem to="/signin" label="Signin" /> : <StickyItem to="/profile" label="Profile" /> }
        { !userIsLoggedIn ? <StickyItem to="/signup" label="Signup" /> : <StickyItem to="/signout" label="Signout" /> } */}
      </div>
    </nav>
  )
};

export default StickyBar;