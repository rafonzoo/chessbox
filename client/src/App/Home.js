import { Fragment } from "react";
import { GlobalHeader, LargeTitle } from "./Comp/Header";

const Home = () => {
  return (
    <Fragment>
      <GlobalHeader>
        <LargeTitle noImage label="Beranda" />
      </GlobalHeader>
    </Fragment>
  );
}

export default Home;