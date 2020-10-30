import React, {useState} from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {CardContent, CardMedia} from "@material-ui/core";
import KanbanImage from '../../assets/kanban-board.jpg';
import {useHistory} from 'react-router-dom'
import {signInProvider} from "../../providers/auth-provider";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert'
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    centerLink: {
        display: 'block',
        textAlign: 'center'
    },
    image: {
        height: 200,
        [theme.breakpoints.down('xs')]: {
            height: 150,
        },
    },
    buttonProgress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -9,
        marginLeft: -12,
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
}));

export default function SignInComponent() {
    const classes = useStyles();
    const history = useHistory();

    const [authError, setAuthError] = useState(false)
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [toastOpen, setToastOpen] = useState(false)

    const signIn = (credentials) => {
        setLoading(true);
        signInProvider(credentials).then(
            () => {
                setAuthError(false);
                setToastOpen(true);
                history.push('/dashboard');
            }
        ).catch((eRes) => {
                setErrorMessage(eRes.error.message)
                setAuthError(true)
                setToastOpen(true)
            }
        ).finally(() => {
            if (authError) {
                setLoading(false)
            }
        })
    }

    return (

        <Card>
            <CardMedia
                className={classes.image}
                image={KanbanImage}
            />
            <CardContent>
                <CssBaseline/>
                <div className={classes.paper}>
                    <div className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            onChange={(e) => {
                                setEmail(e.target.value)
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
                        <div className={classes.wrapper}>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled={loading}
                                onClick={() => signIn({username: email, password})}
                                size="large"
                            >
                                Sign In
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                        </div>

                        {/*<Link href={`${loginLink}`} variant="body2" className={classes.centerLink}>*/}
                        {/*    {"Don't have an account? Sign Up"}*/}
                        {/*</Link>*/}

                    </div>
                    <Snackbar open={toastOpen} autoHideDuration={authError ? 6000 : 2000}
                              onClose={() => setToastOpen(false)}>
                        <MuiAlert elevation={6} variant="filled" severity={authError ? 'error' : 'success'}>
                            {authError ? errorMessage : 'Sign in successful.'}
                        </MuiAlert>
                    </Snackbar>
                </div>
            </CardContent>
        </Card>)
}