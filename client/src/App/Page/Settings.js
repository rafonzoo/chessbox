import React, { Fragment } from "react";
import { GlobalHeader, LargeTitle } from "../Comp/Header";
import { EmptyContent } from "./Empty";

const Setting = () => {

  return (
    <Fragment>
      <GlobalHeader>
        <LargeTitle label="Setelan" />
      </GlobalHeader>
      <EmptyContent />
    </Fragment>
  )
}

export default Setting;