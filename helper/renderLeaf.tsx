import type { ReactNode } from "react";

const Leaf = ({
  attributes,
  children,
  leaf,
}: {
  attributes: {
    "data-slate-leaf": true;
  };
  children: ReactNode;
  leaf: {
    text: string;
    bold?: boolean;
    italic?: boolean;
    underline?: boolean;
  };
}) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

export default Leaf;
