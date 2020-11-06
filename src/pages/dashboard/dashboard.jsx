import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Container, GridList, GridListTile, IconButton, isWidthUp,} from "@material-ui/core";
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
import {getUserInfoFromToken} from "../../services/user-service";
import {getTasks} from "../../services/task-service";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import AddTaskComponent from "../../components/add-task/add-task-component";
import _ from "lodash";
import {PowerSettingsNewRounded} from "@material-ui/icons";

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
export const TaskChangedContext = React.createContext({});

export default function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    rootContainer: {
      padding: 0,
      overflowX: "hidden",
      maxWidth: "100%",
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

  const history = useHistory();

  //STATE
  const [currentTenant, setCurrentTenant] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerVisibility, setDrawerVisibility] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingTenants, setLoadingTenants] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [userTenants, setUserTenants] = useState([]);

  //STATE.Tasks
  const [backlogTasks, setBacklogTasks] = useState([]);
  const [todoTasks, setTodoTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [underReviewTasks, setUnderReviewTasks] = useState([]);
  const [doneTasks, setDoneTasks] = useState([]);
  const [archiveTasks, setArchiveTasks] = useState([]);

    //STATE.TaskChangeTrackers

    const [backlogChanged, setBacklogChanged] = useState(0);
    const [todoChanged, setTodoChanged] = useState(0);
    const [inProgressChanged, setInProgressChanged] = useState([]);
    const [underReviewChanged, setUnderReviewChanged] = useState([]);
    const [doneChanged, setDoneChanged] = useState([]);
    const [archiveChanged, setArchiveChanged] = useState([]);

    const taskChangedHandler = (source, destination) => {
        if (source === boards[0].name || destination === boards[0].name) {
            setBacklogChanged((prevState) => prevState + 1);
        }

        if (source === boards[1].name || destination === boards[1].name) {
            setTodoChanged((prevState) => prevState + 1);
        }

        if (source === boards[2].name || destination === boards[2].name) {
            setInProgressChanged((prevState) => prevState + 1);
        }

        if (source === boards[3].name || destination === boards[3].name) {
            setUnderReviewChanged((prevState) => prevState + 1);
        }

        if (source === boards[4].name || destination === boards[4].name) {
            setDoneChanged((prevState) => prevState + 1);
        }

        if (source === boards[5].name || destination === boards[5].name) {
            setArchiveChanged((prevState) => prevState + 1);
        }
    };

    const prevTenant = usePrevious(currentTenant);
    const prevTenants = usePrevious(userTenants);

    //UserTenant effect
    useEffect(() => {
        if (
            !_.isEqual(prevTenants, userTenants) &&
            !_.isEqual(prevTenant, currentTenant)
        ) {
      setLoadingTenants(true);
      getUserTenants(userId())
        .then((res) => {
          setUserTenants(() => res);
          const user = getUserInfoFromToken();
          setCurrentTenant(() =>
            res.find((tenant) => tenant.id === user.defaultTenant)
          );
        })
        .catch((error) => {
          setUserTenants([]);
          setCurrentTenant({});
          setErrorMessage(error);
          setError(true);
          setToastOpen(true);
        })
        .finally(() => setLoadingTenants(false));
    }
  }, [prevTenants, userTenants, currentTenant, prevTenant]);

  //Backlog effect
  useEffect(() => {
    if (!_.isEmpty(currentTenant)) {
      getTasks(currentTenant.id, boards[0].name)
        .then((res) => {
          setBacklogTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setBacklogTasks([]);
        });
    }
  }, [currentTenant, backlogChanged]);

  //Todos effect
  useEffect(() => {
    if (!_.isEmpty(currentTenant)) {
      getTasks(currentTenant.id, boards[1].name)
        .then((res) => {
          setTodoTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setTodoTasks([]);
        });
    }
  }, [currentTenant, todoChanged]);

  //In-Progress effect
  useEffect(() => {
    if (!_.isEmpty(currentTenant)) {
      getTasks(currentTenant.id, boards[2].name)
        .then((res) => {
          setInProgressTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setInProgressTasks([]);
        });
    }
  }, [currentTenant, inProgressChanged]);

  //Under Review effect
  useEffect(() => {
    if (!_.isEmpty(currentTenant)) {
      getTasks(currentTenant.id, boards[3].name)
        .then((res) => {
          setUnderReviewTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setUnderReviewTasks([]);
        });
    }
  }, [currentTenant, underReviewChanged]);

  //Done effect
  useEffect(() => {
    if (!_.isEmpty(currentTenant)) {
      getTasks(currentTenant.id, boards[4].name)
        .then((res) => {
          setDoneTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setDoneTasks([]);
        });
    }
  }, [currentTenant, doneChanged]);

  //Archive effect
  useEffect(() => {
    if (!_.isEmpty(currentTenant)) {
      getTasks(currentTenant.id, boards[5].name)
        .then((res) => {
          setArchiveTasks(res);
        })
        .catch((e) => {
          setErrorMessage(e.toString());
          setError(true);
          setToastOpen(true);
          setArchiveTasks([]);
        });
    }
  }, [currentTenant, archiveChanged]);

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
            <MenuRoundedIcon style={{ color: "white" }} />
          </IconButton>
          <Toolbar style={{ padding: 0 }}>
            <IconButton onClick={() => setDialogOpen(true)}>
              <AddTaskIcon style={{ color: "white" }} />
            </IconButton>
            <IconButton
              onClick={() => {
                localStorage.clear();
                history.push("/");
              }}
            >
              <PowerSettingsNewRounded style={{ color: "white" }} />
            </IconButton>
          </Toolbar>
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
        <div className={classes.toolbar} />
        {loadingTenants ? (
          <LinearProgress className={classes.drawerItem} />
        ) : (
          <List className={classes.drawerItem}>
            {userTenants.map((tenant) => (
              <ListItem
                button
                key={tenant.id}
                selected={tenant.id === currentTenant.id || false}
                onClick={() => setCurrentTenant(tenant)}
              >
                <ListItemIcon>
                  <PeopleRoundedIcon />
                </ListItemIcon>
                <ListItemText>{tenant.name}</ListItemText>
              </ListItem>
            ))}
          </List>
        )}
      </SwipeableDrawer>
      <TaskChangedContext.Provider value={taskChangedHandler}>
        <GridList
          className={classes.boardsContainer}
          cellHeight="auto"
          cols={getGridListCols()}
        >
          <GridListTile key={boards[0].name}>
            <BoardComponent tasks={backlogTasks} title={boards[0].name} />
          </GridListTile>
          <GridListTile key={boards[1].name}>
            <BoardComponent tasks={todoTasks} title={boards[1].name} />
          </GridListTile>
          <GridListTile key={boards[2].name}>
            <BoardComponent tasks={inProgressTasks} title={boards[2].name} />
          </GridListTile>
          <GridListTile key={boards[3].name}>
            <BoardComponent tasks={underReviewTasks} title={boards[3].name} />
          </GridListTile>
          <GridListTile key={boards[4].name}>
            <BoardComponent tasks={doneTasks} title={boards[4].name} />
          </GridListTile>
          <GridListTile key={boards[5].name}>
            <BoardComponent tasks={archiveTasks} title={boards[5].name} />
          </GridListTile>
        </GridList>

        <AddTaskComponent
          onDialogClose={() => setDialogOpen(false)}
          dialogOpen={dialogOpen}
          currentTenantId={currentTenant.id || ""}
        />
      </TaskChangedContext.Provider>

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
