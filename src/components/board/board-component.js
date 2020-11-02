import React from "react";
import {
    Container,
    List,
    Typography
} from "@material-ui/core";
import Card from "@material-ui/core/Card";
import {makeStyles} from "@material-ui/core/styles";
import ScrollBars from 'react-custom-scrollbars';
import TaskComponent from "../task/task-component";


export default function BoardComponent({tasks, title,}) {
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

    }))
    const classes = useStyle();

    const buildItems = (tasks) => {
        return tasks.map(
            task => (
                <TaskComponent key={task.id} task={task}/>
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