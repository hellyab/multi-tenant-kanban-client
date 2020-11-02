import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function PrivateRouteComponent({
  render,
  component: Component,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }, props) => {
        if (localStorage.getItem("token") !== null) {
          if (Component) {
            return <Component {...props} />;
          } else {
            return render();
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: "/sign-in",
                state: { from: location },
              }}
            />
          );
        }
      }}
    />
  );
}
