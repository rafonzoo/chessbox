import { Fragment } from "react";
import { EmptyContent } from "./Page/Empty";
import { SearchInputTranslucent } from "./Form/Search";
import { GlobalHeader, LargeTitle } from "./Comp/Header";

const Home = () => {
  return (
    <Fragment>
      <GlobalHeader>
        <LargeTitle label="Beranda" />
        <SearchInputTranslucent />
      </GlobalHeader>
      <EmptyContent manualHeight="70vh" />
    </Fragment>
  );
}

export default Home;