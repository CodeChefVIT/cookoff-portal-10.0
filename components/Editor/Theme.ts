import { tags as t } from "@lezer/highlight";
import { EditorView } from "@codemirror/view";
import { HighlightStyle } from "@codemirror/language";

const everforest = {
  fg: "#f0e8d0",
  bg: "#404a50",
  gray: "#a5b0a5",
  red: "#ff5f70",
  orange: "#ff8c42",
  yellow: "#ffcc00",
  green: "#7dd87d",
  aqua: "#42d4a8",
  blue: "#5ba7ff",
  purple: "#d946ef",
};

export const everforestHighlightStyle = HighlightStyle.define([
  { tag: t.comment, color: everforest.gray, fontStyle: "italic" },
  { tag: t.docComment, color: everforest.gray, fontStyle: "italic" },

  { tag: t.name, color: everforest.fg },
  { tag: t.variableName, color: everforest.fg },
  { tag: t.definition(t.variableName), color: everforest.blue },
  { tag: t.constant(t.variableName), color: everforest.orange },
  { tag: t.local(t.variableName), color: everforest.aqua },

  { tag: t.typeName, color: everforest.yellow },
  { tag: t.className, color: everforest.yellow, fontWeight: "bold" },
  { tag: t.namespace, color: everforest.yellow },
  { tag: t.macroName, color: everforest.orange },

  { tag: t.propertyName, color: everforest.green },
  { tag: t.attributeName, color: everforest.aqua },

  { tag: t.literal, color: everforest.orange },
  { tag: t.string, color: everforest.green },
  { tag: t.character, color: everforest.green },
  { tag: t.attributeValue, color: everforest.green },
  { tag: t.number, color: everforest.orange },
  { tag: t.integer, color: everforest.orange },
  { tag: t.float, color: everforest.orange },
  { tag: t.bool, color: everforest.red, fontWeight: "bold" },
  { tag: t.null, color: everforest.red, fontStyle: "italic" },
  { tag: t.regexp, color: everforest.aqua },
  { tag: t.escape, color: everforest.purple },
  { tag: t.color, color: everforest.purple },
  { tag: t.url, color: everforest.blue, textDecoration: "underline" },

  { tag: t.keyword, color: everforest.red },
  { tag: t.definitionKeyword, color: everforest.red },
  { tag: t.controlKeyword, color: everforest.red },
  { tag: t.operatorKeyword, color: everforest.red },
  { tag: t.modifier, color: everforest.red },
  { tag: t.moduleKeyword, color: everforest.red },
  { tag: t.self, color: everforest.orange, fontStyle: "italic" },

  { tag: t.operator, color: everforest.purple },
  { tag: t.arithmeticOperator, color: everforest.purple },
  { tag: t.logicOperator, color: everforest.purple },
  { tag: t.compareOperator, color: everforest.purple },
  { tag: t.updateOperator, color: everforest.purple },
  { tag: t.definitionOperator, color: everforest.purple },
  { tag: t.typeOperator, color: everforest.purple },
  { tag: t.controlOperator, color: everforest.purple },

  { tag: t.punctuation, color: everforest.fg },
  { tag: t.separator, color: everforest.fg },
  { tag: t.bracket, color: everforest.fg },
  { tag: t.angleBracket, color: everforest.fg },
  { tag: t.squareBracket, color: everforest.fg },
  { tag: t.paren, color: everforest.fg },
  { tag: t.brace, color: everforest.fg },

  { tag: t.meta, color: everforest.gray },
  { tag: t.annotation, color: everforest.aqua },
  { tag: t.processingInstruction, color: everforest.gray },

  { tag: t.invalid, color: everforest.red, textDecoration: "underline wavy" },

  // Prose-like
  { tag: t.content, color: everforest.fg },
  { tag: t.heading1, color: everforest.red, fontWeight: "bold" },
  { tag: t.heading2, color: everforest.orange, fontWeight: "bold" },
  { tag: t.heading3, color: everforest.yellow, fontWeight: "bold" },
  { tag: t.heading4, color: everforest.green, fontWeight: "bold" },
  { tag: t.heading5, color: everforest.blue, fontWeight: "bold" },
  { tag: t.heading6, color: everforest.purple, fontWeight: "bold" },
  { tag: t.strong, color: everforest.orange, fontWeight: "bold" },
  { tag: t.emphasis, color: everforest.aqua, fontStyle: "italic" },
  { tag: t.link, color: everforest.blue, textDecoration: "underline" },
  {
    tag: t.strikethrough,
    color: everforest.gray,
    textDecoration: "line-through",
  },
  { tag: t.quote, color: everforest.gray, fontStyle: "italic" },
]);

export const everforestTheme = EditorView.theme(
  {
    ".cm-editor": {
      fontFamily: "'Maple Mono'",
    },
    "&": {
      color: everforest.fg,
      backgroundColor: "transparent !important",
    },
    ".cm-content": {
      caretColor: everforest.blue,
      fontFamily: "'Maple Mono'",
    },
    "&.cm-focused .cm-cursor": {
      borderLeftColor: everforest.blue,
    },
    "&.cm-focused .cm-selectionBackground, ::selection": {
      backgroundColor: "#ff8c4240",
    },
    ".cm-gutters": {
      backgroundColor: "transparent !important",
      color: everforest.gray,
      border: "none",
    },
    ".cm-activeLine": {
      backgroundColor: "transparent !important",
    },
    ".cm-activeLineGutter": {
      backgroundColor: "transparent !important",
    },
  },
  { dark: true },
);
