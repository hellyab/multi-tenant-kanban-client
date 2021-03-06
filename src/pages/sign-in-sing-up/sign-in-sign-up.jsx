import React from "react";
import {
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Toolbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import {
  Route,
  Router,
  Switch,
  useHistory,
  useLocation,
} from "react-router-dom";
import SignUpComponent from "../../components/sign-up/sign-up-component";
import SignInComponent from "../../components/sign-in/sign-in-component";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { CopyrightComponent } from "../../components/copyright/copyright-component";
import AssignmentTurnedInRoundedIcon from "@material-ui/icons/AssignmentTurnedInRounded";

const useStyle = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: 0,
    padding: 0,
    paddingBottom: theme.spacing(2),
    width: "100%",
    maxWidth: "100%",
  },
  container: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
    flexFlow: "column",
    marginBottom: theme.spacing(5),
  },
  buttonGroup: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
  signUpCard: {
    marginTop: theme.spacing(5),
  },
}));

export default function SignInSignUp() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyle();
  const changePath = (path) => {
    history.push(path);
  };

  return (
    <Container className={classes.root}>
      <AppBar position="static" style={{ width: "100%" }}>
        <Toolbar>
          <IconButton>
            <AssignmentTurnedInRoundedIcon style={{ color: "white" }} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            MTKB
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="xs" className={classes.container}>
        <ButtonGroup fullWidth color="primary" className={classes.buttonGroup}>
          <Button
            variant={
              location.pathname === "/sign-up" ? "outlined" : "contained"
            }
            onClick={() => changePath("/sign-in")}
          >
            Sign In
          </Button>
          <Button
            variant={
              location.pathname !== "/sign-up" ? "outlined" : "contained"
            }
            onClick={() => changePath("/sign-up")}
          >
            Sign Up
          </Button>
        </ButtonGroup>
        <Router history={history}>
          <Switch>
            <Route path="/sign-up">
              <SignUpComponent className={classes.signUpCard} />
            </Route>
            <Route path="/sign-in">
              <SignInComponent />
            </Route>
          </Switch>
        </Router>
      </Container>
      <CopyrightComponent />
    </Container>
  );
}
