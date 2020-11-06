import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import React, {useContext, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {boards, userId} from "../../services/constants";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import {createTask} from "../../services/task-service";
import ReactiveButton from "../reactive-button/reactive-button";
import {TaskChangedContext} from "../../pages/dashboard/dashboard";

export default function AddTaskComponent({
  dialogOpen,
  onDialogClose,
  currentTenantId,
}) {
  //STYLES
  const useStyle = makeStyles((theme) => ({
    addField: {
      margin: theme.spacing(1, 2, 1, 0),
    },
  }));
  const classes = useStyle();

  //STATE
  const [error, setError] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOpen, setToastOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  //STATE.FORM_VALUES
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [board, setBoard] = useState("");

  //CONTEXT
  const taskChangedHandler = useContext(TaskChangedContext);

  return (
    <>
      <Dialog open={dialogOpen} onClose={onDialogClose}>
        <DialogTitle id="form-dialog-title">Add Task</DialogTitle>
        <DialogContent>
          <TextField
            className={classes.addField}
            variant="outlined"
            autoFocus
            id="title"
            name="title"
            label="Title"
            fullWidth
            required
            onChange={(event) => setTitle(event.target.value)}
            disabled={loading}
          />
          <TextField
            className={classes.addField}
            variant="outlined"
            id="description"
            name="description"
            label="Description"
            fullWidth
            required
            onChange={(event) => setDescription(event.target.value)}
            disabled={loading}
          />
          <Autocomplete
            className={classes.addField}
            fullWidth
            id="boards-autoComplete"
            options={boards}
            onChange={(event, value) => {
              setBoard(value.name);
            }}
            getOptionSelected={(option, value) => option.name === value.name}
            getOptionLabel={(option) => option.name}
            disabled={loading}
            renderInput={(params) => (
              <TextField
                required
                {...params}
                fullWidth
                label="Add to..."
                variant="outlined"
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              onDialogClose();
            }}
            color="primary"
          >
            Cancel
          </Button>
          <ReactiveButton
            onClick={async () => {
              setLoading(true);
              await createTask({
                  title,
                  description,
                  group: board,
                  tenantId: currentTenantId,
                  userId: userId(),
              })
                .then((res) => {
                  setError(false);
                  setToastMessage(`Task successfully added to ${res.group}`);
                  setToastOpen(true);
                  setLoading(false);
                  onDialogClose();
                  taskChangedHandler(board, "");
                })
                .catch((error) => {
                  setError(true);
                  setToastMessage(error.message);
                  setToastOpen(true);
                  setLoading(false);
                });
            }}
            color="primary"
            loading={loading}
            title="Add"
          />
        </DialogActions>
      </Dialog>
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
