import React, { useContext, useEffect, useState } from "react";

import uuid from "react-uuid";

import Link from "next/link";

import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { MaterialUISwitch } from "../component/MaterialUISwotch";
import { ColorModeContext } from "./_app";
import styles from "../styles/Home.module.css";

export default function Home() {
  const colorMode = useContext(ColorModeContext);
  const isDarkMode = colorMode.themeMode === "light" ? false : true;

  const [tempListNotes, setTempListNotes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedId, setSelectedId] = useState("");
  const [triggerGetNotesList, setTriggerGetNotesList] = useState(0);

  useEffect(() => {
    const listNotes = JSON.parse(localStorage.getItem("listNotes") || "[]");
    setTempListNotes(listNotes);
  }, [triggerGetNotesList]);

  function renderContent() {
    if (tempListNotes.length === 0) {
      return (
        <div
          style={{
            padding: "40px 12px 0 12px",
            textAlign: "center",
            paddingTop: "40px",
            marginTop: "68px",
          }}
        >
          <Typography variant="subtitle2">
            You haven`t create any note yet <br />
            start creating your first note just by clicking button below
          </Typography>
          <Link href={`/new-${uuid()}`} passHref legacyBehavior>
            <Button variant="contained" style={{ marginTop: "12px" }}>
              Create your first Note
            </Button>
          </Link>
        </div>
      );
    }

    return (
      <>
        <Typography variant="h6" gutterBottom sx={{ padding: "16px" }}>
          Notes List
        </Typography>
        <div style={{ overflowY: "auto", maxHeight: "50vh" }}>
          {tempListNotes.map(({ title, id }, idx) => (
            <div className={styles.listNotesContaienr} key={id}>
              <Typography>{idx + 1}.</Typography>
              <Typography
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  marginLeft: "4px",
                  paddingRight: "8px",
                }}
              >
                {title}
              </Typography>
              <div className={styles.actionList}>
                <Link href={`/${id}`} passHref legacyBehavior>
                  <EditIcon style={{ cursor: "pointer" }} />
                </Link>
                <DeleteIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setSelectedId(id);
                    setOpenModal(true);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Link href={`/new-${uuid()}`} passHref legacyBehavior>
            <Button variant="contained" style={{ marginTop: "12px" }}>
              Create Note
            </Button>
          </Link>
        </div>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "60%",
              maxWidth: "312px",
              bgcolor: "background.paper",
              boxShadow: "0 3px 8px rgb(0 0 0 / 24%)",
              p: 4,
              color: isDarkMode ? "white" : "black",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Delete?
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Are you sure you want to delete this note?
            </Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Button
                onClick={() => {
                  setOpenModal(false);
                  setSelectedId("");
                }}
              >
                No
              </Button>
              <Button
                onClick={() => {
                  const tempTempListNotes = [...tempListNotes];
                  const listNotesId = tempListNotes.map(
                    (item: { id: string }) => item.id
                  );
                  const indexOfSelectedId = listNotesId.indexOf(selectedId);

                  tempTempListNotes.splice(indexOfSelectedId, 1);
                  localStorage.setItem(
                    "listNotes",
                    JSON.stringify(tempTempListNotes)
                  );

                  setOpenModal(false);
                  setSelectedId("");
                  setTriggerGetNotesList(triggerGetNotesList + 1);
                }}
              >
                Yes
              </Button>
            </div>
          </Box>
        </Modal>
      </>
    );
  }

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: "100%",
          bgcolor: "background.default",
          color: "text.primary",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ paddingLeft: "8px" }}>
          TypeHype
        </Typography>
        <MaterialUISwitch sx={{ m: 1 }} onClick={colorMode.toggleColorMode} />
      </Box>

      <div className={styles.container}>
        <Card sx={{ minHeight: 360 }}>
          <CardContent sx={{ padding: 0 }}>{renderContent()}</CardContent>
        </Card>
      </div>
    </div>
  );
}
