import {
    CardContent,
    Divider,
    IconButton,
    Typography,
} from "@material-ui/core";
import CardActions from "@material-ui/core/CardActions";
import MoreVertRoundedIcon from "@material-ui/icons/MoreVertRounded";
import Popover from "@material-ui/core/Popover";
import Card from "@material-ui/core/Card";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {boards} from "../../services/constants";
import TextField from "@material-ui/core/TextField";
import React, {useContext, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import {TaskMovedContext} from "../../pages/dashboard/dashboard";
import {updateTask} from "../../services/task-service";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ReactiveButton from "../reactive-button/reactive-button";

export default function TaskComponent({task}) {
    const useStyles = makeStyles((theme) => ({
        taskCard: {
            margin: theme.spacing(1),
        },
        moreOptionsButton: {
            marginLeft: "auto",
        },
        taskTitle: {
            width: "90%",
            fontWeight: "light",
        },
        taskCardActions: {
            display: "flex",
            justifyContent: "space-between",
        },
        taskCardDivider: {
            margin: theme.spacing(0, 2, 2, 2),
        },
        taskCardContent: {
            margin: theme.spacing(0, 1, 0, 1),
        },
        moveButton: {
            margin: theme.spacing(2, 0, 1, 0),
        },
    }));

    const classes = useStyles();

    //STATE
    const [error, setError] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastOpen, setToastOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const [currentlyOpenPopoverId, setCurrentlyOpenPopoverId] = useState("");
    const [targetBoard, setTargetBoard] = useState("");

    //CONTEXT
    const taskMovedHandler = useContext(TaskMovedContext);

    const showPopover = (taskId) => {
        setCurrentlyOpenPopoverId(taskId);
    };

    const moveTask = (task, destinationBoard) => {
        setLoading(true);
        const source = task.group;
        task.group = destinationBoard;
        updateTask(task)
            .then(() => {
                setError(false);
                setToastMessage(`Task successfully moved to ${destinationBoard}`);
                setToastOpen(true);
                setLoading(false);
                hidePopover();
            })
            .catch((error) => {
                setError(true);
                setToastMessage(error.message);
                setToastOpen(true);
                setLoading(false);
            });
        taskMovedHandler(source, destinationBoard);
    };

    const hidePopover = () => {
        setCurrentlyOpenPopoverId("");
    };
    return (
        <>
            <Card className={classes.taskCard}>
                <CardContent>
                    <CardActions className={classes.taskCardActions}>
                        <Typography variant="h6" component="h6">
                            {task.title}
                        </Typography>
                        <IconButton
                            id={task.id}
                            className={classes.moreOptionsButton}
                            onClick={() => showPopover(task.id)}
                        >
                            <MoreVertRoundedIcon/>
                        </IconButton>
                        <Popover
                            open={currentlyOpenPopoverId === task.id}
                            anchorEl={document.getElementById(task.id)}
                            onClose={hidePopover}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                        >
                            <Card>
                                <CardContent>
                                    <Autocomplete
                                        id="boards-autoComplete"
                                        options={boards}
                                        onChange={(event, value) => {
                                            if (value !== null) {
                                                setTargetBoard(value.name);
                                            }
                                        }}
                                        disabled={loading}
                                        getOptionSelected={(option, value) =>
                                            option.name === value.name
                                        }
                                        getOptionLabel={(option) => option.name}
                                        style={{width: 300}}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Move to..."
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                    <ReactiveButton
                                        className={classes.moveButton}
                                        onClick={() => moveTask(task, targetBoard)}
                                        title="Move"
                                        loading={loading}
                                    />
                                </CardContent>
                            </Card>
                        </Popover>
                    </CardActions>

                    <Divider className={classes.taskCardDivider}/>
                    <Typography
                        className={classes.taskCardContent}
                        variant="body1"
                        component="p"
                    >
                        {task.description}
                    </Typography>
                </CardContent>
            </Card>
            <Snackbar
                open={toastOpen}
                autoHideDuration={error ? 6000 : 2000}
                onClose={() => setToastOpen(false)}
            >
                <MuiAlert
                    elevation={6}
                    variant="filled"
                    severity={error ? "error" : "success"}
                >
                    {toastMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
}
