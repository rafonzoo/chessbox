import { Fragment } from "react";
import { GlobalHeader, LargeTitle } from "../Comp/Header";
import { EmptyContent } from "../Page/Empty";

const Chats = () => {

  return (
    <Fragment>
      <GlobalHeader>
        <LargeTitle label="Chats" />
      </GlobalHeader>
      <EmptyContent />
    </Fragment>
  )
}

export default Chats;