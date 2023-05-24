import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Footer from "components/Footer";
import contactPage, {
  routecontact as routecontactPage,
} from "../pages/contactPage";
import listPostsPage, {
  routelistPosts as routelistPostsPage,
} from "../pages/listpostsPage";
import Header from "components/Header";
import React from "react";
import "./styles.css";

const AppConnect = () => {
  return (
    <Router>
      <div className="content">
        <Header />
        <Switch>
          <Route exact path={routelistPostsPage()} component={listPostsPage} />
          <Route exact path={routecontactPage()} component={contactPage} />
          <Redirect
            to={{
              pathname: routelistPostsPage(),
            }}
          />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default AppConnect;
