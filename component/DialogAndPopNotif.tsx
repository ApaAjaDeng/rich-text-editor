import { useRouter } from "next/router";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";

interface DialogAndPopNotifProps {
  openModal: boolean;
  openSnackbar: boolean;
  noteTitle: string;
  slateContent: string;
  openSuccessSnackbar: boolean;
  setNoteTitle: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenSuccessSnackbar: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DialogAndPopNotif({
  openModal,
  noteTitle,
  setOpenModal,
  setNoteTitle,
  openSnackbar,
  slateContent,
  setOpenSuccessSnackbar,
  setOpenSnackbar,
  openSuccessSnackbar,
}: DialogAndPopNotifProps) {
  const router = useRouter();
  const { id = "not found" } = router.query;
  const isNewNote = id?.includes("new");

  function handelCloseModal() {
    setOpenModal(false);
    setNoteTitle("");
  }

  function handleSave() {
    const listNotes = JSON.parse(localStorage.getItem("listNotes") || "[]");

    const tempListNotes = listNotes || [];

    const noteData = {
      id: id || "",
      title: noteTitle || "",
      content: slateContent || "",
    };

    let savedListNotes = [];

    if (isNewNote) {
      noteData.id = noteData.id.slice(4);
      if (tempListNotes.length === 0) savedListNotes = [{ ...noteData }];
      else savedListNotes = [...tempListNotes, { ...noteData }];
      localStorage.setItem("listNotes", JSON.stringify(savedListNotes));
    } else {
      const listNotesId = listNotes.map((item: { id: string }) => item.id);
      const indexOfNotesDetailBaseOnId = listNotesId.indexOf(id);

      const tempUpdatedNotesDetail = {
        id: id || "",
        title: noteTitle || "",
        content: slateContent || "",
      };

      tempListNotes[indexOfNotesDetailBaseOnId] = {
        ...tempUpdatedNotesDetail,
      };
      localStorage.setItem("listNotes", JSON.stringify(tempListNotes));
    }

    setOpenModal(false);
    setOpenSuccessSnackbar(true);
    router.back();
  }

  return (
    <>
      <Dialog open={openModal} onClose={handelCloseModal}>
        <DialogTitle>Save Note?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please input your Note Title to save your note
          </DialogContentText>
          <TextField
            autoFocus
            fullWidth
            margin="dense"
            id="note_title"
            label="Note Title"
            variant="standard"
            value={noteTitle}
            onChange={(e) => setNoteTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handelCloseModal}>Cancel</Button>
          <Button onClick={handleSave} disabled={!noteTitle}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please make a changes first
        </Alert>
      </Snackbar>
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSuccessSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Note successfully saved!
        </Alert>
      </Snackbar>
    </>
  );
}
