import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import { CardContent, CardMedia } from "@material-ui/core";
import KanbanImage from "../../assets/kanban-board.jpg";
import { useHistory } from "react-router-dom";
import { signIn } from "../../services/auth-service";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ReactiveButton from "../reactive-button/reactive-button";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  centerLink: {
    display: "block",
    textAlign: "center",
  },
  image: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      height: 150,
    },
  },
}));

export default function SignInComponent() {
  const classes = useStyles();
  const history = useHistory();

  const [authError, setAuthError] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  const _signIn = (credentials) => {
    setLoading(true);
    signIn(credentials)
      .then(() => {
        setAuthError(false);
        setToastOpen(true);
        history.push("/dashboard");
      })
      .catch((eRes) => {
        setErrorMessage(eRes.error.message);
        setAuthError(true);
        setToastOpen(true);
        setLoading(false);
      });
  };

  return (
    <Card>
      <CardMedia className={classes.image} image={KanbanImage} />
      <CardContent>
        <CssBaseline />
        <div className={classes.paper}>
          <div className={classes.form}>
            <TextField
              variant="outlined"
              margin="normal"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              disabled={loading}
            />
            <TextField
              variant="outlined"
              margin="normal"
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              disabled={loading}
            />
            <ReactiveButton
              title="Sign in"
              onClick={() => _signIn({ username: email, password })}
              loading={loading}
            />

            {/*<Link href={`${loginLink}`} variant="body2" className={classes.centerLink}>*/}
            {/*    {"Don't have an account? Sign Up"}*/}
            {/*</Link>*/}
          </div>
          <Snackbar
            open={toastOpen}
            autoHideDuration={authError ? 6000 : 2000}
            onClose={() => setToastOpen(false)}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              severity={authError ? "error" : "success"}
            >
              {authError ? errorMessage : "Sign in successful."}
            </MuiAlert>
          </Snackbar>
        </div>
      </CardContent>
    </Card>
  );
}
