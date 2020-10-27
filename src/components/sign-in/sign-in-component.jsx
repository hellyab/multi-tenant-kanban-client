import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {CardContent, CardMedia} from "@material-ui/core";
import KanbanImage from '../../assets/kanban-board.jpg';

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
    }
}));

export default function SignInComponent() {
    const classes = useStyles();
    return (

            <Card >
                <CardMedia
                    className={classes.image}
                    image={KanbanImage}
                />
                <CardContent>
                    <CssBaseline/>
                    <div className={classes.paper}>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
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
                                autoComplete="current-password"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>

                            {/*<Link href={`${loginLink}`} variant="body2" className={classes.centerLink}>*/}
                            {/*    {"Don't have an account? Sign Up"}*/}
                            {/*</Link>*/}

                        </form>
                    </div>
                </CardContent>
            </Card>)
}