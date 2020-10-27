import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from "@material-ui/styles";
import SignInSignUp from "./pages/sign-in-sing-up/sign-in-sign-up";
import Dashboard from "./pages/dashboard/dashboard";

function App() {
    const theme = createMuiTheme();
    const FourOhFour = () => <div>404: Page not found</div>;
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/sign-up" exact={true} component={SignInSignUp}/>
                    <Route path="/sign-in" exact={true} component={SignInSignUp}/>
                    <Route path="/home" component={Dashboard}/>
                    <Route path='*' component={FourOhFour}/>
                </Switch>
            </Router>
        </ThemeProvider>

    );
}

export default App;
