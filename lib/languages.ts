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
  template: string;
  cursorPosition?: { line: number; ch: number };
}

export const LANGUAGES: Record<string, Language> = {
  "C++": {
    id: 54,
    name: "C++",
    extension: cpp(),
    commentSymbol: "//",
    template: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

int main() {
    // Your code here
    
    return 0;
}`,
    cursorPosition: { line: 7, ch: 4 },
  },
  C: {
    id: 50,
    name: "C",
    extension: new LanguageSupport(StreamLanguage.define(c)),
    commentSymbol: "//",
    template: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    // Your code here
    
    return 0;
}`,
    cursorPosition: { line: 6, ch: 4 },
  },
  "C#": {
    id: 51,
    name: "C#",
    extension: new LanguageSupport(StreamLanguage.define(csharp)),
    commentSymbol: "//",
    template: `using System;
using System.Collections.Generic;
using System.Linq;

class Program
{
    static void Main()
    {
        // Your code here
        
    }
}`,
    cursorPosition: { line: 9, ch: 8 },
  },
  Java: {
    id: 62,
    name: "Java",
    extension: java(),
    commentSymbol: "//",
    template: `import java.util.*;
import java.io.*;

public class Solution {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        // Your code here
        
        sc.close();
    }
}`,
    cursorPosition: { line: 7, ch: 8 },
  },
  Python: {
    id: 71,
    name: "Python",
    extension: python(),
    commentSymbol: "#",
    template: `def main():
  # Your code here
  pass
if __name__ == "__main__":
  main()`,
    cursorPosition: { line: 2, ch: 2 },
  },
  JavaScript: {
    id: 63,
    name: "JavaScript",
    extension: javascript(),
    commentSymbol: "//",
    template: `function main() {
    // Your code here
    
}

main();`,
    cursorPosition: { line: 2, ch: 4 },
  },
  Go: {
    id: 60,
    name: "Go",
    extension: go(),
    commentSymbol: "//",
    template: `package main

import (
    "fmt"
)

func main() {
    // Your code here
    
}`,
    cursorPosition: { line: 8, ch: 4 },
  },
  Rust: {
    id: 73,
    name: "Rust",
    extension: rust(),
    commentSymbol: "//",
    template: `use std::io;

fn main() {
    // Your code here
    
}`,
    cursorPosition: { line: 4, ch: 4 },
  },
  PHP: {
    id: 68,
    name: "PHP",
    extension: php(),
    commentSymbol: "//",
    template: `<?php

function main() {
    // Your code here
    
}

main();
?>`,
    cursorPosition: { line: 4, ch: 4 },
  },
};

export const getLanguageByName = (name: string): Language | undefined => {
  return Object.values(LANGUAGES).find((lang) => lang.name === name);
};
