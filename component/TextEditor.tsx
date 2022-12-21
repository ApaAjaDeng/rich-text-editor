import React, { useState, useCallback, useContext, useEffect } from "react";

import { useRouter } from "next/router";
import Link from "next/link";

import { createEditor, BaseEditor } from "slate";
import { Slate, Editable, withReact, ReactEditor } from "slate-react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";

import { CustomEditor } from "../helper/formating";
import { MaterialUISwitch } from "./MaterialUISwotch";
import { ColorModeContext } from "../pages/_app";
import styles from "../styles/TextEditor.module.css";
import Toolbar from "./Toolbar";
import { INITIAL_EDITOR_VALUE } from "../constant";
import Leaf from "../helper/renderLeaf";
import DialogAndPopNotif from "./DialogAndPopNotif";

type CustomElement = {
  type: "heading-one" | "heading-two" | "paragraph" | "bullet-list";
  children: CustomText[];
  code: boolean;
};
type CustomText = {
  text: string;
  bold: boolean;
  italic: boolean;
  undeline: boolean;
  paragraph: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

export default function TextEditor() {
  const router = useRouter();
  const { id = "not found" } = router.query;
  const colorMode = useContext(ColorModeContext);
  const [editor] = useState(() => withReact(createEditor()));

  const [openModal, setOpenModal] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");
  const [slateContent, setSlateContent] = useState("");
  const [editorInitialValue, setEditorInitialValue] = useState(null);

  const isDarkMode = colorMode.themeMode === "light" ? false : true;

  useEffect(() => {
    const listNotes = JSON.parse(localStorage.getItem("listNotes") || "[]");
    const filterNotesDetailBaseOnId = listNotes.filter(
      (item: { id: string }) => item.id === id
    );

    if (filterNotesDetailBaseOnId.length > 0) {
      const noteContent = JSON.parse(
        filterNotesDetailBaseOnId[0]?.content || "[]"
      );
      setEditorInitialValue(noteContent);
      setNoteTitle(filterNotesDetailBaseOnId[0]?.title);
    } else {
      const isNewNote = id?.includes("new");
      if (isNewNote) {
        setEditorInitialValue(INITIAL_EDITOR_VALUE);
      }
    }
  }, [id]);

  // Define a rendering function based on the element passed to `props`. We use
  // `useCallback` here to memoize the function for subsequent renders.
  const renderElement = useCallback((props: any) => {
    switch (props.element.type) {
      case "code":
        return <CodeElement {...props} />;
      case "heading-one":
        return <h1 {...props.attributes}>{props.children}</h1>;
      case "heading-two":
        return <h2 {...props.attributes}>{props.children}</h2>;
      case "bullet-list":
        return <li {...props.attributes}>{props.children}</li>;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  // Define a leaf rendering function that is memoized with `useCallback`.
  const renderLeaf = useCallback((props: any) => {
    return <Leaf {...props} />;
  }, []);

  // Render the Slate context.
  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <Link href="/" passHref legacyBehavior>
          <ArrowBackIcon style={{ cursor: "pointer" }} />
        </Link>
        <div>
          <Button
            variant="text"
            onClick={() => {
              if (!slateContent) {
                setOpenSnackbar(true);
                return;
              }

              setOpenModal(true);
            }}
          >
            Save
          </Button>
          <MaterialUISwitch sx={{ m: 1 }} onClick={colorMode.toggleColorMode} />
        </div>
      </div>

      {editorInitialValue && (
        <>
          <Slate
            editor={editor}
            value={editorInitialValue}
            onChange={(value) => {
              const isAstChange = editor.operations.some(
                (op) => "set_selection" !== op.type
              );
              if (isAstChange) {
                const content = JSON.stringify(value);
                setSlateContent(content);
              }
            }}
          >
            <Editable
              style={{ color: isDarkMode ? "white" : "black" }}
              className={styles.cssEditable}
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={(event) => {
                if (!event.metaKey) {
                  return;
                }

                // Replace the `onKeyDown` logic with our new commands.
                switch (event.key) {
                  case ";": {
                    event.preventDefault();
                    CustomEditor.toggleCodeBlock(editor);
                    break;
                  }

                  case "b": {
                    event.preventDefault();
                    CustomEditor.toggleBoldMark(editor);
                    break;
                  }

                  case "i": {
                    event.preventDefault();
                    CustomEditor.toggleItalicMark(editor);
                    break;
                  }

                  case "u": {
                    event.preventDefault();
                    CustomEditor.toggleUnderlineMark(editor);
                    break;
                  }
                }
              }}
            />
          </Slate>

          <Toolbar editor={editor} />
        </>
      )}
      <DialogAndPopNotif
        openModal={openModal}
        openSnackbar={openSnackbar}
        noteTitle={noteTitle}
        setOpenModal={setOpenModal}
        setNoteTitle={setNoteTitle}
        slateContent={slateContent}
        setOpenSuccessSnackbar={setOpenSuccessSnackbar}
        setOpenSnackbar={setOpenSnackbar}
        openSuccessSnackbar={openSuccessSnackbar}
      />
    </div>
  );
}

// Define a React component renderer for our code blocks.
const CodeElement = (props: any) => {
  return (
    <kbd {...props.attributes}>
      <code>{props.children}</code>
    </kbd>
  );
};

const DefaultElement = (props: any) => {
  return <p {...props.attributes}>{props.children}</p>;
};
