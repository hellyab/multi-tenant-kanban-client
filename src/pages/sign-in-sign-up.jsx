import React from "react";
import {Button, ButtonGroup, Container} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {Route, Switch, useHistory, useLocation, Router} from 'react-router-dom';
import SignUpComponent from "../components/signup/sign-up-component";
import SignInComponent from "../components/sign-in/sign-in-component";

const useStyle = makeStyles((theme) => (
    {
        container: {
            display: 'flex',
            justifyItems: 'center',
            alignItems: 'center',
            flexFlow: 'column',
            marginBottom: theme.spacing(5),
        },
        buttonGroup: {
            marginTop: theme.spacing(5),
            marginBottom: theme.spacing(5),
        },
        signUpCard: {
            marginTop: theme.spacing(5),
        }
    }
))

export default function SignInSignUp() {
    const location = useLocation();
    const history = useHistory();
    const classes = useStyle();
    const changePath = (path) => {
        history.push(path)
    }

    return (
        <Container maxWidth="xs" className={classes.container}>
            <ButtonGroup fullWidth color="primary" className={classes.buttonGroup}>
                <Button variant={location.pathname === "/sign-up" ? "outlined" : "contained"}
                        onClick={() => changePath("/sign-in")}>Sign In</Button>
                <Button variant={location.pathname !== "/sign-up" ? "outlined" : "contained"}
                        onClick={() => changePath("/sign-up")}>Sign Up</Button>
            </ButtonGroup>
            <Router history={history}>
                <Switch>

                    <Route path="/sign-up">
                        <SignUpComponent className={classes.signUpCard}/>
                    </Route>
                    <Route path="/sign-in">
                        <SignInComponent/>
                    </Route>
                </Switch>
            </Router>
        </Container>
    );
}