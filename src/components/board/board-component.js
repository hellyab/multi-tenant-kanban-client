import React, {useState} from "react";
import {
    Button,
    CardContent,
    Container,
    Divider,
    IconButton,
    List,
    Typography
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import MoreVertRoundedIcon from '@material-ui/icons/MoreVertRounded';
import ScrollBars from 'react-custom-scrollbars';
import Popover from "@material-ui/core/Popover";
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from "@material-ui/core/TextField";

const useStyle = makeStyles((theme) => ({
    rootContainer: {
        margin: theme.spacing(3, 0, 3, 0),
    },
    boardCard: {
        height: '68vh',
        padding: theme.spacing(0.75, 0.75, 0.75, 1.5),
    },
    boardDivider: {
        margin: theme.spacing(1.5, 0, 0, 0),

    },
    boardTitleCard: {
        marginBottom: theme.spacing(2)
    },
    boardTitle: {
        textAlign: 'center',
        fontSize: 20
    },
    taskCard: {
        margin: theme.spacing(1),
    },
    moreOptionsButton: {
        marginLeft: 'auto',
    },
    taskTitle: {
        width: '90%',
        fontWeight: 'light'
    },
    taskCardActions: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    taskCardDivider: {
        margin: theme.spacing(0, 2, 2, 2),
    },
    taskCardContent: {
        margin: theme.spacing(0, 1, 0, 1),
    },
    moveButton: {
        margin: theme.spacing(2, 0, 1, 0),

    }

}))

export default function BoardComponent({tasks, title,}) {
    const [currentlyOpenPopoverId, setCurrentlyOpenPopoverId] = useState('');
    const [targetBoard, setTargetBoard] = useState('')
    const classes = useStyle();

    const boards = [
        {name: 'Backlog'},
        {name: 'To do'},
        {name: 'In progress'},
        {name: 'Under review'},
        {name: 'Done'},
        {name: 'Archive'},
    ]

    const showPopover = (taskId) => {
        setCurrentlyOpenPopoverId(taskId);
    }

    const moveTask = (task, boardName) => {
        //TODO: add moving logic here
        hidePopover();
    }

    const hidePopover = () => {
        setCurrentlyOpenPopoverId('');
    }

    const buildItems = (tasks) => {
        return tasks.map(
            task => (
                <Card key={task.id} className={classes.taskCard}>
                    <CardContent>
                        <CardActions className={classes.taskCardActions}>

                            <Typography variant="h6" component="h6">
                                {task.title}
                            </Typography>
                            <IconButton id={task.id} className={classes.moreOptionsButton}
                                        onClick={() => showPopover(task.id)}>
                                <MoreVertRoundedIcon/>
                            </IconButton>
                            <Popover
                                open={currentlyOpenPopoverId === task.id}
                                anchorEl={document.getElementById(task.id)}
                                onClose={hidePopover}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <Card>
                                    <CardContent>

                                        <Autocomplete
                                            id="boards-autoComplete"
                                            options={boards}
                                            onChange={(event, value) => {
                                                if (value !== null) {
                                                    setTargetBoard(value.name)
                                                }

                                            }}
                                            getOptionSelected={(option, value) => option.name === value.name}
                                            getOptionLabel={(option) => option.name}
                                            style={{width: 300}}
                                            renderInput={(params) => <TextField {...params} label="Move to..."
                                                                                variant="outlined"/>}
                                        />
                                        <Button fullWidth color='primary' variant='contained'
                                                className={classes.moveButton}
                                                onClick={() => moveTask(task, targetBoard)}>Move</Button>
                                    </CardContent>
                                </Card>
                            </Popover>
                        </CardActions>

                        <Divider className={classes.taskCardDivider}/>
                        <Typography className={classes.taskCardContent} variant="body1" component="p">
                            {task.description}
                        </Typography>
                    </CardContent>
                </Card>

            )
        )
    }
    return (
        <Container maxWidth="xs" className={classes.rootContainer}>
            <Card className={classes.boardTitleCard}>
                <Typography variant='overline' component='p' className={classes.boardTitle}>{title}</Typography>
            </Card>
            <Card className={classes.boardCard}>
                <ScrollBars autoHide={true}>
                    <List>
                        {buildItems(tasks)}
                    </List>
                </ScrollBars>
            </Card>
        </Container>
    )
}