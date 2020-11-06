import React, {useReducer, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import {CardContent, CardMedia, Divider, Typography} from "@material-ui/core";
import KanbanImage from "../../assets/kanban.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import ReactiveButton from "../reactive-button/reactive-button";
import {createUser} from "../../services/user-service";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import {useHistory} from "react-router-dom";

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  cardContainer: {
    display: "flex",
    justifyItems: "center",
    alignItems: "center",
  },
  image: {
    height: 200,
    [theme.breakpoints.down("xs")]: {
      height: 150,
    },
  },
  divider: {
    margin: theme.spacing(2),
  },
  formSubtitle: {
    textAlign: "center",
  },
  formControl: {
    marginTop: theme.spacing(2),
  },
}));

const initialFormValues = {
  email: "",
  firstName: "",
  middleName: "",
  lastName: "",
  username: "",
  password: "",
  phone: "",
  role: "ADMIN",
  tenant: {
    id: 0,
    name: "",
    type: "Corporate",
  },
};

function formReducer(state, action) {
  switch (action.type) {
    case "email":
      return { ...state, email: action.value };
    case "firstName":
      return { ...state, firstName: action.value };
    case "middleName":
      return { ...state, middleName: action.value };
    case "lastName":
      return { ...state, lastName: action.value };
    case "username":
      return { ...state, username: action.value };
    case "password":
      return { ...state, password: action.value };
    case "phone":
      return { ...state, phone: action.value };
    case "tenant":
      return { ...state, tenant: { ...state.tenant, ...action.value } };

    default:
      throw new Error();
  }
}

export default function SignUpComponent() {
  const [formState, formDispatch] = useReducer(
    formReducer,
    initialFormValues,
      null
  );

  const history = useHistory();
  const [authError, setAuthError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);

  const submitForm = () => {
    setLoading(true);
    createUser(formState)
      .then(() => {
        setAuthError(false);
        setToastOpen(true);
        history.push("/sign-in");
      })
      .catch((eRes) => {
        setErrorMessage(eRes.error.message);
        setAuthError(true);
        setToastOpen(true);
        setLoading(false);
      });
  };
  const classes = useStyles();

  return (
    <>
      <Card>
        <CardMedia
          className={classes.image}
          image={KanbanImage}
          style={{
            width: "110%",
          }}
        />
        <CardContent>
          <CssBaseline />
          <div className={classes.paper}>
            <form className={classes.form} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="firstName"
                onChange={(e) => {
                  formDispatch({ type: "firstName", value: e.target.value });
                }}
                label="First Name"
                name="firstName"
                autoComplete="firstName"
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="middleName"
                onChange={(e) => {
                  formDispatch({ type: "middleName", value: e.target.value });
                }}
                label="Middle Name"
                name="middleName"
                autoComplete="middleName"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="lastName"
                onChange={(e) => {
                  formDispatch({ type: "lastName", value: e.target.value });
                }}
                label="Last Name"
                name="lastName"
                autoComplete="lastName"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="username"
                onChange={(e) => {
                  formDispatch({ type: "username", value: e.target.value });
                }}
                label="Username"
                name="username"
                autoComplete="username"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                onChange={(e) => {
                  formDispatch({ type: "email", value: e.target.value });
                }}
                label="Email Address"
                name="email"
                autoComplete="email"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="phone"
                onChange={(e) => {
                  formDispatch({ type: "phone", value: e.target.value });
                }}
                label="Phone Number"
                name="phone"
                autoComplete="phone"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => {
                  formDispatch({ type: "password", value: e.target.value });
                }}
                autoComplete="current-password"
              />
              <Divider className={classes.divider} />
              <Typography
                variant="overline"
                display="block"
                className={classes.formSubtitle}
              >
                Company Info
              </Typography>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="companyName"
                onChange={(e) => {
                  formDispatch({
                    type: "tenant",
                    value: { name: e.target.value },
                  });
                }}
                label="Company Name"
                name="companyName"
                autoComplete="companyName"
              />

              <FormControl
                variant="outlined"
                fullWidth
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-filled-label">
                  Company Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  label="Company Type"
                  id="demo-simple-select-filled"
                  value={formState.tenant.type}
                  onChange={(e) => {
                    formDispatch({
                      type: "tenant",
                      value: { name: e.target.value },
                    });
                  }}
                >
                  <MenuItem value="Corporate">Corporate</MenuItem>
                  <MenuItem value="School">School</MenuItem>
                  <MenuItem value="Startup">Startup</MenuItem>
                </Select>
              </FormControl>
              {/*<FormControl variant="filled">*/}

              {/*    <InputLabel shrink id="companyTypeLabel">*/}
              {/*        Type*/}
              {/*    </InputLabel>*/}
              {/*    <Select*/}
              {/*        variant="outlined"*/}
              {/*        label="companyTypeLabel"*/}
              {/*        id="companyType"*/}
              {/*        value={type}*/}
              {/*        fullWidth*/}
              {/*    >*/}

              {/*    </Select>*/}
              {/*</FormControl>*/}
              <ReactiveButton
                className={classes.submit}
                loading={loading}
                onClick={submitForm}
                title="Sign Up"
              />

              {/*<Link href={`${loginLink}`} variant="body2" className={classes.centerLink}>*/}
              {/*    {"Don't have an account? Sign Up"}*/}
              {/*</Link>*/}
            </form>
          </div>
        </CardContent>
      </Card>
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
    </>
  );
}
