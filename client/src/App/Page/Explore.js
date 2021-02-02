import { Fragment } from "react";
import { GlobalHeader, LargeTitle } from "../Comp/Header";

const Explore = () => {

  return (
    <Fragment>
      <GlobalHeader>
        <LargeTitle noImage={true} label="Jelajah" />
      </GlobalHeader>
    </Fragment>
  )
}

export default Explore;