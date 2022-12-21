import { Editor, Text, Transforms } from "slate";

export const CustomEditor = {
  isBoldMarkActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    });

    return !!match;
  },

  isItalicMarkActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.italic === true,
      universal: true,
    });

    return !!match;
  },

  isUnderlineMarkActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.underline === true,
      universal: true,
    });

    return !!match;
  },

  isHeadingOneMarkActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "heading-one",
    });

    return !!match;
  },

  isParagraphMarkActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "paragraph",
    });

    return !!match;
  },

  isHeadingTwoMarkActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "heading-two",
    });

    return !!match;
  },

  isCodeBlockActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "code",
    });

    return !!match;
  },

  isBulletListBlockActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "bullet-list",
    });

    return !!match;
  },

  isNumberListBlockActive(editor: any) {
    const [match]: any = Editor.nodes(editor, {
      match: (n: any) => n.type === "number-list",
    });

    return !!match;
  },

  toggleBoldMark(editor: any) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleItalicMark(editor: any) {
    const isActive = CustomEditor.isItalicMarkActive(editor);
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleUnderlineMark(editor: any) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor);
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: (n) => Text.isText(n), split: true }
    );
  },

  toggleHeadingOneMark(editor: any) {
    const isActive = CustomEditor.isHeadingOneMarkActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "heading-one" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleHeadingTwoMark(editor: any) {
    const isActive = CustomEditor.isHeadingTwoMarkActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "heading-two" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleParagraphMark(editor: any) {
    const isActive = CustomEditor.isParagraphMarkActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "paragraph" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleCodeBlock(editor: any) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },

  toggleBulletListBlock(editor: any) {
    const isActive = CustomEditor.isBulletListBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "bullet-list" },
      { match: (n) => Editor.isBlock(editor, n) }
    );
  },
};
