import React, {useState} from "react";
import {Container, GridList, GridListTile, IconButton, isWidthUp} from "@material-ui/core";
import BoardComponent from "../../components/board/board-component";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import ListItemIcon from "@material-ui/core/ListItemIcon";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddTaskIcon from '@material-ui/icons/PlaylistAddRounded';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Autocomplete from "@material-ui/lab/Autocomplete";

const drawerWidth = 250;
const useStyles = makeStyles((theme) => ({
    rootContainer: {
        padding: 0,
        overflowX: 'hidden'
    },
    boardsContainer: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
        [theme.breakpoints.up('sm')]: {
            width: drawerWidth,
            flexShrink: 0,
        },
        width: drawerWidth,
    },
    drawerItem: {
        width: drawerWidth
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },

    },
    appBarToolbar: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    addField: {
        margin: theme.spacing(1, 2, 1, 0)
    }

}))

function useWidth() {
    const theme = useTheme();
    const keys = [...theme.breakpoints.keys].reverse();
    return (
        keys.reduce((output, key) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const matches = useMediaQuery(theme.breakpoints.up(key));
            return !output && matches ? key : output;
        }, null) || 'xs'
    );
}

const boards = [
    {name: 'Backlog'},
    {name: 'To do'},
    {name: 'In progress'},
    {name: 'Under review'},
    {name: 'Done'},
    {name: 'Archive'},
]

export default function Dashboard() {
    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const classes = useStyles();
    const width = useWidth();
    const [drawerVisibility, setDrawerVisibility] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userTenants, setUserTenants] = useState([
        {name: 'Injera', id: 1},
        {name: 'Hult', id: 2},
        {name: 'Inspire', id: 3},
    ])
    const _tasksMock = [
        {
            id: "a",
            title: "Finish this kanban",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate placerat nunc vel pretium. In varius pretium nunc, sed porta turpis vestibulum eget. Fusce tempor commodo quam id consequat. Phasellus sed dui pellentesque, mollis mauris quis, tincidunt augue. Phasellus quis eros quis tellus hendrerit efficitur eget sit amet quam. Donec quis eros neque. Suspendisse rhoncus erat eget nulla posuere, sed mollis ante volutpat. Aliquam non nisi tellus. Proin tincidunt a sem nec dapibus. Nullam risus massa, tempus at justo fermentum, sollicitudin aliquet urna. Aliquam tristique leo id lectus faucibus pharetra."
        }, {
            id: "b",
            title: "Deploy this kanban",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate placerat nunc vel pretium. In varius pretium nunc, sed porta turpis vestibulum eget. Fusce tempor commodo quam id consequat. Phasellus sed dui pellentesque, mollis mauris quis, tincidunt augue. Phasellus quis eros quis tellus hendrerit efficitur eget sit amet quam. Donec quis eros neque. Suspendisse rhoncus erat eget nulla posuere, sed mollis ante volutpat. Aliquam non nisi tellus. Proin tincidunt a sem nec dapibus. Nullam risus massa, tempus at justo fermentum, sollicitudin aliquet urna. Aliquam tristique leo id lectus faucibus pharetra."
        }, {
            id: "c",
            title: "Connect this kanban to the API",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate placerat nunc vel pretium. In varius pretium nunc, sed porta turpis vestibulum eget. Fusce tempor commodo quam id consequat. Phasellus sed dui pellentesque, mollis mauris quis, tincidunt augue. Phasellus quis eros quis tellus hendrerit efficitur eget sit amet quam. Donec quis eros neque. Suspendisse rhoncus erat eget nulla posuere, sed mollis ante volutpat. Aliquam non nisi tellus. Proin tincidunt a sem nec dapibus. Nullam risus massa, tempus at justo fermentum, sollicitudin aliquet urna. Aliquam tristique leo id lectus faucibus pharetra."
        },
    ]

    const getGridListCols = () => {
        console.log(window.width)
        if (isWidthUp('xl', width)) {
            return 5;
        } else if (isWidthUp('lg', width)) {
            return 4;
        } else if (isWidthUp('md', width)) {
            return 3;
        } else if (isWidthUp('sm', width)) {
            return 2;
        }

        return 1;
    }
    return <Container className={classes.rootContainer}>

        <AppBar position='static' className={drawerVisibility ? classes.appBar : ""}>
            <Toolbar className={classes.appBarToolbar}>
                <IconButton onClick={() => setDrawerVisibility(!drawerVisibility)}>
                    <MenuRoundedIcon style={{color: 'white'}}/>
                </IconButton>
                <IconButton onClick={() => setDialogOpen(true)}>
                    <AddTaskIcon style={{color: 'white'}}/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <SwipeableDrawer
            anchor='left'
            open={drawerVisibility}
            onClose={() => setDrawerVisibility(false)}
            onOpen={() => setDrawerVisibility(true)}
            disableDiscovery={iOS}
            className={classes.drawer}
        >
            <div className={classes.toolbar}/>
            <List className={classes.drawerItem}>
                {userTenants.map((tenant) => <ListItem button key={tenant.id}>
                    <ListItemIcon>
                        <PeopleRoundedIcon/>
                    </ListItemIcon>
                    <ListItemText>
                        {tenant.name}
                    </ListItemText>
                </ListItem>)}
            </List>
        </SwipeableDrawer>
        <GridList className={classes.boardsContainer} cellHeight="auto" cols={getGridListCols()}>
            <GridListTile>

                <BoardComponent tasks={_tasksMock} title='Backlog'/>
            </GridListTile>
            <GridListTile>

                <BoardComponent tasks={_tasksMock} title='To do'/>
            </GridListTile>
            <GridListTile>

                <BoardComponent tasks={_tasksMock} title='In progress'/>
            </GridListTile>
            <GridListTile>

                <BoardComponent tasks={_tasksMock} title='Under review'/>
            </GridListTile>
            <GridListTile>

                <BoardComponent tasks={_tasksMock} title='Done'/>
            </GridListTile>
            <GridListTile>

                <BoardComponent tasks={_tasksMock} title='Archive'/>
            </GridListTile>

        </GridList>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
            <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
            <DialogContent>
                <TextField
                    className={classes.addField}
                    variant='outlined'
                    autoFocus
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                />
                <TextField
                    className={classes.addField}
                    variant='outlined'
                    autoFocus
                    id="description"
                    name="description"
                    label="Description"
                    fullWidth
                />
                <Autocomplete
                    className={classes.addField}
                    fullWidth
                    id="boards-autoComplete"
                    options={boards}
                    onChange={(event, value) => {

                        console.log(event, value)
                    }}
                    getOptionSelected={(option, value) => option.name === value.name}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} fullWidth label="Add to..."
                                                        variant="outlined"/>}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setDialogOpen(false)
                }} color="primary">
                    Cancel
                </Button>
                <Button onClick={() => {
                    setDialogOpen(false)
                    //TODO: add submit logic
                }} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    </Container>
}