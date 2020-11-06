import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

export default function ReactiveButton({loading, onClick, title}) {
  const useStyles = makeStyles((theme) => ({
    wrapper: {
      margin: theme.spacing(1),
      position: "relative",
    },
    buttonProgress: {
      position: "absolute",
      top: "50%",
      left: "50%",
      marginTop: -9,
      marginLeft: -12,
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
      <div className={classes.wrapper}>
        <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
            onClick={onClick}
            size="large"
        >
          {title}
        </Button>
        {loading && (
            <CircularProgress size={24} className={classes.buttonProgress}/>
        )}
      </div>
  );
}
