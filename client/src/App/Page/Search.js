import { Fragment } from "react";
import { GlobalHeader, LargeTitle } from "../Comp/Header";
import { CSXTextFieldTranslucent } from "../Comp/TextField";

const Search = () => {

  return (
    <Fragment>
      <GlobalHeader>
        <LargeTitle noImage={true} label="Pencarian" />
        <CSXTextFieldTranslucent classname="CSXSafearea" />
      </GlobalHeader>
    </Fragment>
  )
}

export default Search;