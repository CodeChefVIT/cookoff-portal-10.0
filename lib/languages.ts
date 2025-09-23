import { cpp } from "@codemirror/lang-cpp";
import { python } from "@codemirror/lang-python";
import { java } from "@codemirror/lang-java";
import { php } from "@codemirror/lang-php";
import { rust } from "@codemirror/lang-rust";
import { go } from "@codemirror/lang-go";
import { javascript } from "@codemirror/lang-javascript";
import { StreamLanguage } from "@codemirror/language";
import { c, csharp } from "@codemirror/legacy-modes/mode/clike";
import { LanguageSupport } from "@codemirror/language";

export interface Language {
  id: number;
  name: string;
  extension: LanguageSupport;
  commentSymbol: string;
}

export const LANGUAGES: Record<string, Language> = {
  "C++": {
    id: 54,
    name: "C++",
    extension: cpp(),
    commentSymbol: "//",
  },
  C: {
    id: 50,
    name: "C",
    extension: new LanguageSupport(StreamLanguage.define(c)),
    commentSymbol: "//",
  },
  "C#": {
    id: 51,
    name: "C#",
    extension: new LanguageSupport(StreamLanguage.define(csharp)),
    commentSymbol: "//",
  },
  Java: {
    id: 62,
    name: "Java",
    extension: java(),
    commentSymbol: "//",
  },
  Python: {
    id: 71,
    name: "Python",
    extension: python(),
    commentSymbol: "#",
  },
  JavaScript: {
    id: 63,
    name: "JavaScript",
    extension: javascript(),
    commentSymbol: "//",
  },
  Go: {
    id: 60,
    name: "Go",
    extension: go(),
    commentSymbol: "//",
  },
  Rust: {
    id: 73,
    name: "Rust",
    extension: rust(),
    commentSymbol: "//",
  },
  PHP: {
    id: 68,
    name: "PHP",
    extension: php(),
    commentSymbol: "//",
  },
};

export const getLanguageByName = (name: string): Language | undefined => {
  return Object.values(LANGUAGES).find((lang) => lang.name === name);
};
