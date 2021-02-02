import { Fragment } from "react";
import { Redirect } from "react-router-dom";
import { userIsAuthorized } from "../../helper/storage";
import { GlobalHeader, LargeTitle } from "../Comp/Header";

const Chats = () => {
  if (!userIsAuthorized()) {
    return <Redirect to="/signin" />
  }
  return (
    <Fragment>
      <GlobalHeader>
        <LargeTitle label="Chats" />
      </GlobalHeader>
    </Fragment>
  )
}

export default Chats;