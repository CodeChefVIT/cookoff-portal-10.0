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
#include <algorithm>
#include <map>
#include <set>
#include <queue>
#include <stack>
#include <climits>
using namespace std;

int main() {
	ios_base::sync_with_stdio(false);
	cin.tie(NULL);
	
	// Your code here
	
	return 0;
}`,
    cursorPosition: { line: 15, ch: 1 },
  },
  C: {
    id: 50,
    name: "C",
    extension: new LanguageSupport(StreamLanguage.define(c)),
    commentSymbol: "//",
    template: `#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <math.h>
#include <limits.h>

int main() {
	// Your code here
	
	return 0;
}`,
    cursorPosition: { line: 8, ch: 1 },
  },
  "C#": {
    id: 51,
    name: "C#",
    extension: new LanguageSupport(StreamLanguage.define(csharp)),
    commentSymbol: "//",
    template: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

class Program
{
  static void Main(string[] args)
	{
    // Your code here
		
	}
}`,
    cursorPosition: { line: 10, ch: 2 },
  },
  Java: {
    id: 62,
    name: "Java",
    extension: java(),
    commentSymbol: "//",
    template: `import java.util.*;
import java.io.*;
import java.math.*;

public class Solution {
	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);
		
		// Your code here
		
		sc.close();
	}
}`,
    cursorPosition: { line: 9, ch: 2 },
  },
  Python: {
    id: 71,
    name: "Python",
    extension: python(),
    commentSymbol: "#",
    template: `import sys
from collections import defaultdict, deque
from math import *

def main():
	# Your code here
	pass

if __name__ == "__main__":
	main()`,
    cursorPosition: { line: 6, ch: 1 },
  },
  JavaScript: {
    id: 63,
    name: "JavaScript",
    extension: javascript(),
    commentSymbol: "//",
    template: `const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function main() {
	// Your code here
	
}

// For competitive programming input handling
rl.on('line', (input) => {
	// Process input here
	main();
	rl.close();
});`,
    cursorPosition: { line: 9, ch: 1 },
  },
  Go: {
    id: 60,
    name: "Go",
    extension: go(),
    commentSymbol: "//",
    template: `package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func main() {
	scanner := bufio.NewScanner(os.Stdin)
	
	// Your code here
	
}`,
    cursorPosition: { line: 13, ch: 1 },
  },
  Rust: {
    id: 73,
    name: "Rust",
    extension: rust(),
    commentSymbol: "//",
    template: `use std::io;
use std::collections::HashMap;

fn main() {
	let mut input = String::new();
	
	// Your code here
	
}`,
    cursorPosition: { line: 7, ch: 1 },
  },
  PHP: {
    id: 68,
    name: "PHP",
    extension: php(),
    commentSymbol: "//",
    template: `<?php

function main() {
	$input = trim(fgets(STDIN));
	
	// Your code here
	
}

main();
?>`,
    cursorPosition: { line: 6, ch: 1 },
  },
};

export const getLanguageByName = (name: string): Language | undefined => {
  return Object.values(LANGUAGES).find((lang) => lang.name === name);
};
