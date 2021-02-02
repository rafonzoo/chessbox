import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Route, Switch } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import Store from "./redux";
import Home from "./App/Home";
// import Navbar from "./App/Navbar";
import SignUp from "./App/User/SignUp";
import SignIn from "./App/User/SignIn";
import Profile from "./App/User/Profile";
import SignOut from "./App/User/SignOut";
import StickyNavigation from "./App/Nav/StickyBar";
import Explore from "./App/Page/Explore";
import Setting from "./App/Page/Settings";
import Notification from "./App/Page/Notification";
import Chats from "./App/User/Chats";
import MuiTheme from "./helper/mui";
import Search from "./App/Page/Search";



function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        {/* <Navbar /> */}
        <ThemeProvider theme={MuiTheme}>
          <Switch>
            <Route exact path="/" children={ <Home /> } />
            <Route path="/signin" children={ <SignIn /> } />
            <Route path="/signup" children={ <SignUp /> } />
            <Route path="/signout" children={ <SignOut /> } />
            <Route path="/profile" children={ <Profile /> } />

            <Route path="/explore" children={ <Explore /> } />
            <Route path="/search" children={ <Search /> } />
            <Route path="/setting" children={ <Setting /> } />
            <Route path="/chat"    children={ <Chats /> } />
            <Route path="/notification" children={ <Notification /> } />
          </Switch>
          <StickyNavigation />
        </ThemeProvider>
      </BrowserRouter>
    </Provider>
  )
}

export default App;
