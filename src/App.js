import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignInSignUp from "./pages/sign-in-sing-up/sign-in-sign-up";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
    const FourOhFour = () => <div>404: Page not found</div>;
    return (
            <Router>
                <Switch>
                    <Route path="/sign-up" exact={true} component={SignInSignUp}/>
                    <Route path="/sign-in" exact={true} component={SignInSignUp}/>
                    <Route path="/dashboard" exact={true} component={Dashboard}/>
                    <Route path='*' component={FourOhFour}/>
                </Switch>
            </Router>

    );
}

export default App;
