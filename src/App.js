import React from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import SignInComponent from "./components/sign-in/sign-in-component";
import {createMuiTheme} from '@material-ui/core/styles'
import {ThemeProvider} from "@material-ui/styles";

function App() {
    const theme = createMuiTheme();
    const FourOhFour = () => <div>404: Page not found</div>;
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route path="/" exact={true} render={() => <SignInComponent loginLink={'/login'}/>}/>
                    <Route path='*' component={FourOhFour}/>
                </Switch>
            </Router>
        </ThemeProvider>

    );
}

export default App;
