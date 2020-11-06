import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import SignInSignUp from "./pages/sign-in-sing-up/sign-in-sign-up";
import Dashboard from "./pages/dashboard/dashboard";
import PrivateRouteComponent from "./components/private-route/private-route-component";
import { setAuthHeader } from "./services/auth-service";

function App() {
  const FourOhFour = () => <div>404: Page not found</div>;
  setAuthHeader(localStorage.getItem("token"));
  return (
    <Router>
      <Switch>
        <Route
          path="/"
          exact={true}
          render={() => <Redirect to="/sign-in" />}
        />
        <Route
          path="/sign-up"
          exact={true}
          render={(props) => <SignInSignUp {...props} />}
        />
        <Route
          path="/sign-in"
          exact={true}
          render={(props) => <SignInSignUp {...props} />}
        />
        <PrivateRouteComponent
          path="/dashboard"
          exact={true}
          render={(props) => <Dashboard {...props} />}
        />
        <Route path="*" component={FourOhFour} />
      </Switch>
    </Router>
  );
}

export default App;
