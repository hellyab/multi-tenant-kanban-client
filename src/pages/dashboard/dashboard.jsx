import React, {useEffect, useState} from "react";
import {
  Container,
  GridList,
  GridListTile,
  IconButton,
  isWidthUp,
} from "@material-ui/core";
import BoardComponent from "../../components/board/board-component";
import {makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PeopleRoundedIcon from "@material-ui/icons/PeopleRounded";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddTaskIcon from "@material-ui/icons/PlaylistAddRounded";
import {getUserTenants} from "../../services/user-tenant-service";
import {boards, usePrevious, userId} from "../../services/constants";
import LinearProgress from "@material-ui/core/LinearProgress";
import {getUserInfoFromToken} from "../../services/user-detail-service";
import {getTasks} from "../../services/task-service";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import AddTaskComponent from "../../components/add-task/add-task-component";
import _ from "lodash";

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
      keys.reduce((output, key) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const matches = useMediaQuery(theme.breakpoints.up(key));
        return !output && matches ? key : output;
      }, null) || "xs"
  );
}

const drawerWidth = 250;
const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);

//CONTEXT
export const TaskMovedContext = React.createContext({});

export default function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    rootContainer: {
      padding: 0,
      overflowX: "hidden",
    },
    boardsContainer: {
      flexWrap: "nowrap",
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: "translateZ(0)",
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
      width: drawerWidth,
    },
    drawerItem: {
      width: drawerWidth,
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    appBarToolbar: {
      display: "flex",
      justifyContent: "space-between",
    },
  }));
  const classes = useStyles();

  const width = useWidth();

  const taskMovedHandler = (source, destination) => {
    console.log(source, destination);
    if (source === boards[0].name || destination === boards[0].name) {
      setBacklogChanged((prevState) => prevState + 1);
    }

    if (source === boards[1].name || destination === boards[1].name) {
      setTodoChanged((prevState) => prevState + 1);
    }
  };

  //STATE
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [loadingTenants, setLoadingTenants] = useState(false);
  const [currentTenant, setCurrentTenant] = useState({});
  const [todoTasks, setTodoTasks] = useState([]);
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [userTenants, setUserTenants] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [error, setError] = useState(false);

  const [backlogChanged, setBacklogChanged] = useState(0);
  const [todoChanged, setTodoChanged] = useState(0);

  const onDialogClose = (board) => {
    setDialogOpen(false);
    if (board === boards[0].name) {
      setBacklogChanged((prevBacklogChanged) => prevBacklogChanged + 1);
    } else if (board === boards[1].name) {
      setTodoChanged((prevTodoChanged) => prevTodoChanged + 1);
    }
  };

  const prevTenant = usePrevious(currentTenant);

  useEffect(() => {
    if (!_.isEqual(prevTenant, currentTenant)) {
      setLoadingTenants(true);
      getUserTenants(userId)
          .then((res) => {
            setUserTenants(() => res);
            const user = getUserInfoFromToken();
            setCurrentTenant(() =>
                res.find((tenant) => tenant.id === user.defaultTenant)
            );
          })
          //TODO: add alert
          .catch(() => setUserTenants([]))
          .finally(() => setLoadingTenants(false));
    }
  }, [currentTenant, prevTenant]);

  useEffect(() => {
    getTasks(currentTenant.id, boards[0].name)
        .then((res) => {
          console.log(res);
          setBacklogTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setBacklogTasks([]);
        });
  }, [currentTenant, backlogChanged]);

  useEffect(() => {
    getTasks(currentTenant.id, boards[1].name)
        .then((res) => {
          console.log(res);
          setTodoTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setTodoTasks([]);
        });
  }, [currentTenant, todoChanged]);

  const _tasksMock = [
    {
      id: "a",
      title: "Finish this kanban",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate placerat nunc vel pretium. In varius pretium nunc, sed porta turpis vestibulum eget. Fusce tempor commodo quam id consequat. Phasellus sed dui pellentesque, mollis mauris quis, tincidunt augue. Phasellus quis eros quis tellus hendrerit efficitur eget sit amet quam. Donec quis eros neque. Suspendisse rhoncus erat eget nulla posuere, sed mollis ante volutpat. Aliquam non nisi tellus. Proin tincidunt a sem nec dapibus. Nullam risus massa, tempus at justo fermentum, sollicitudin aliquet urna. Aliquam tristique leo id lectus faucibus pharetra.",
    },
    {
      id: "b",
      title: "Deploy this kanban",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate placerat nunc vel pretium. In varius pretium nunc, sed porta turpis vestibulum eget. Fusce tempor commodo quam id consequat. Phasellus sed dui pellentesque, mollis mauris quis, tincidunt augue. Phasellus quis eros quis tellus hendrerit efficitur eget sit amet quam. Donec quis eros neque. Suspendisse rhoncus erat eget nulla posuere, sed mollis ante volutpat. Aliquam non nisi tellus. Proin tincidunt a sem nec dapibus. Nullam risus massa, tempus at justo fermentum, sollicitudin aliquet urna. Aliquam tristique leo id lectus faucibus pharetra.",
    },
    {
      id: "c",
      title: "Connect this kanban to the API",
      description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate placerat nunc vel pretium. In varius pretium nunc, sed porta turpis vestibulum eget. Fusce tempor commodo quam id consequat. Phasellus sed dui pellentesque, mollis mauris quis, tincidunt augue. Phasellus quis eros quis tellus hendrerit efficitur eget sit amet quam. Donec quis eros neque. Suspendisse rhoncus erat eget nulla posuere, sed mollis ante volutpat. Aliquam non nisi tellus. Proin tincidunt a sem nec dapibus. Nullam risus massa, tempus at justo fermentum, sollicitudin aliquet urna. Aliquam tristique leo id lectus faucibus pharetra.",
    },
  ];

  const getGridListCols = () => {
    if (isWidthUp("xl", width)) {
      return 5;
    } else if (isWidthUp("lg", width)) {
      return 4;
    } else if (isWidthUp("md", width)) {
      return 3;
    } else if (isWidthUp("sm", width)) {
      return 2;
    }

    return 1;
  };
  return (
      <Container className={classes.rootContainer}>
        <AppBar
            position="static"
            className={drawerVisibility ? classes.appBar : ""}
        >
          <Toolbar className={classes.appBarToolbar}>
            <IconButton onClick={() => setDrawerVisibility(!drawerVisibility)}>
              <MenuRoundedIcon style={{color: "white"}}/>
            </IconButton>
            <IconButton onClick={() => setDialogOpen(true)}>
              <AddTaskIcon style={{color: "white"}}/>
            </IconButton>
          </Toolbar>
        </AppBar>
        <SwipeableDrawer
            anchor="left"
            open={drawerVisibility}
            onClose={() => setDrawerVisibility(false)}
            onOpen={() => setDrawerVisibility(true)}
            disableDiscovery={iOS}
            className={classes.drawer}
        >
          <div className={classes.toolbar}/>
          {loadingTenants ? (
              <LinearProgress className={classes.drawerItem}/>
          ) : (
              <List className={classes.drawerItem}>
                {userTenants.map((tenant) => (
                    <ListItem
                        button
                        key={tenant.id}
                        selected={tenant.id === currentTenant.id}
                        onClick={() => setCurrentTenant(tenant)}
                    >
                      <ListItemIcon>
                        <PeopleRoundedIcon/>
                      </ListItemIcon>
                      <ListItemText>{tenant.name}</ListItemText>
                    </ListItem>
                ))}
              </List>
          )}
        </SwipeableDrawer>
        <TaskMovedContext.Provider value={taskMovedHandler}>
          <GridList
              className={classes.boardsContainer}
              cellHeight="auto"
              cols={getGridListCols()}
          >
            <GridListTile key={boards[0].name}>
              <BoardComponent tasks={backlogTasks} title="Backlog"/>
            </GridListTile>
            <GridListTile key={boards[1].name}>
              <BoardComponent tasks={todoTasks} title="To do"/>
            </GridListTile>
            <GridListTile key={boards[2].name}>
              <BoardComponent tasks={_tasksMock} title="In progress"/>
            </GridListTile>
            <GridListTile key={boards[3].name}>
              <BoardComponent tasks={_tasksMock} title="Under review"/>
            </GridListTile>
            <GridListTile key={boards[4].name}>
              <BoardComponent tasks={_tasksMock} title="Done"/>
            </GridListTile>
            <GridListTile key={boards[5].name}>
              <BoardComponent tasks={_tasksMock} title="Archive"/>
            </GridListTile>
          </GridList>
        </TaskMovedContext.Provider>

        <AddTaskComponent
            onDialogClose={onDialogClose}
            dialogOpen={dialogOpen}
            currentTenantId={currentTenant.id}
        />
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
            {error && errorMessage}
          </MuiAlert>
        </Snackbar>
      </Container>
  );
}
