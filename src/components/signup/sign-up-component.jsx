import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import {CardContent, CardMedia, Divider, Typography} from "@material-ui/core";
import KanbanImage from "../../assets/kanban.jpg";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";

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
    cardContainer: {
        display: 'flex',
        justifyItems: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        [theme.breakpoints.down('xs')]: {
            height: 150,
        },
    },
    divider: {
        margin: theme.spacing(2),
    },
    formSubtitle: {
        textAlign: 'center',
    },
    formControl: {
        marginTop: theme.spacing(2)
    }
}));

export default function SignUpComponent() {
    const [type, setType] = useState('Corporate');
    const classes = useStyles();
    const handleChange = (event) => {
        setType(event.target.value);
    };
    return (
            <Card>
                <CardMedia
                    className={classes.image}
                    image={KanbanImage}
                    style={{
                        width: "110%",
                    }}
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
                                id="firstName"
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
                                autoComplete="current-password"
                            />
                            <Divider className={classes.divider}/>
                            <Typography variant="overline" display="block" className={classes.formSubtitle}>Company
                                Info</Typography>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="companyName"
                                label="Company Name"
                                name="companyName"
                                autoComplete="companyName"
                            />

                            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                <InputLabel id="demo-simple-select-filled-label">Company Type</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    label="Company Type"
                                    id="demo-simple-select-filled"
                                    value={type}
                                    onChange={handleChange}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up
                            </Button>


                            {/*<Link href={`${loginLink}`} variant="body2" className={classes.centerLink}>*/}
                            {/*    {"Don't have an account? Sign Up"}*/}
                            {/*</Link>*/}

                        </form>
                    </div>
                </CardContent>
            </Card>)
}