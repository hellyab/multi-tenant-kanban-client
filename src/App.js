import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from "@material-ui/styles";
import SignInSignUp from "./pages/sign-in-sign-up";

function App() {
    const theme = createMuiTheme();
    const FourOhFour = () => <div>404: Page not found</div>;
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/" render={() => <SignInSignUp/>}/>
                    <Route path='*' component={FourOhFour}/>
                </Switch>
            </Router>
        </ThemeProvider>

    );
}

export default App;
