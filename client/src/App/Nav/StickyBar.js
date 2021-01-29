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
        <StickyItem to="/chat" label="Chats" />
        <StickyItem to="/setting" label="Setelan" />
      </div>
    </nav>
  )
};

export default StickyBar;