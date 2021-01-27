import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main id="main" className="main-home">
      <div className="main-head">
        <input className="head-input form-control" type="search" placeholder="Search some work..." />
        <div className="head-account">
          <figure className="account-icon">
            <Link className="account-link" to="/signin" />
          </figure>
        </div>
      </div>
    </main>
  )
}

export default Home;