import { useContext } from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CodeIcon from "@mui/icons-material/Code";

import { CustomEditor } from "../helper/formating";
import { ColorModeContext } from "../pages/_app";

import type { BaseEditor } from "slate";
import type { ReactEditor } from "slate-react";

export default function ToolBar({
  editor,
}: {
  editor: BaseEditor & ReactEditor;
}) {
  const colorMode = useContext(ColorModeContext);
  const isDarkMode = colorMode.themeMode === "light" ? false : true;

  const listToolbarAction = [
    {
      title: "Bold",
      icon: <FormatBoldIcon />,
      action: () => CustomEditor.toggleBoldMark(editor),
    },
    {
      title: "Italic",
      icon: <FormatItalicIcon />,
      action: () => CustomEditor.toggleItalicMark(editor),
    },
    {
      title: "Underline",
      icon: <FormatUnderlinedIcon />,
      action: () => CustomEditor.toggleUnderlineMark(editor),
    },
    {
      title: "Title",
      icon: "Title",
      action: () => CustomEditor.toggleHeadingOneMark(editor),
    },
    {
      title: "SubTItle",
      icon: "SubTitle",
      action: () => CustomEditor.toggleHeadingTwoMark(editor),
    },
    {
      title: "Paragraph",
      icon: "Paragraph",
      action: () => CustomEditor.toggleParagraphMark(editor),
    },
    {
      title: "Code",
      icon: <CodeIcon />,
      action: () => CustomEditor.toggleCodeBlock(editor),
    },
    {
      title: "List Bullet",
      icon: <FormatListBulletedIcon />,
      action: () => CustomEditor.toggleBulletListBlock(editor),
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        backgroundColor: isDarkMode ? "darkslategray" : "white",
        justifyContent: "center",
        borderRadius: "20px",
        padding: "12px 0",
        position: "fixed",
        transform: "translate(-50%,-50%)",
        bottom: "8px",
        left: "50%",
        width: "80%",
        maxWidth: "440px",
        boxShadow: "0 3px 8px rgb(0 0 0 / 24%)",
      }}
    >
      {listToolbarAction.map((item) => (
        <IconButton
          sx={{ fontSize: "16px" }}
          key={item.title}
          onMouseDown={(event) => {
            event.preventDefault();
            item.action();
          }}
        >
          {item.icon}
        </IconButton>
      ))}
    </Box>
  );
}
