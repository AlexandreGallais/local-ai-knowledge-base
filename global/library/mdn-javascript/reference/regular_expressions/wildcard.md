---
title: "Wildcard: ."
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/regular_expressions/wildcard/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

A **wildcard** matches all characters except line terminators. It also matches line terminators if the `s` flag is set.

## Syntax

```regex
.
```

## Description

`.` matches any character except line terminators. If the `s` flag is set, `.` also matches line terminators.

The exact character set matched by `.` depends on whether the regex is Unicode-aware. If it is Unicode-aware, `.` matches any Unicode code point; otherwise, it matches any UTF-16 code unit. For example:

```js
/../.test("😄"); // true; matches two UTF-16 code units as a surrogate pair
/../u.test("😄"); // false; input only has one Unicode character
```

## Examples

### Usage with quantifiers

Wildcards are often used with quantifiers to match any character sequence, until the next character of interest is found. For example, the following example extracts the title of a Markdown page in the form `# Title`:

```js
function parseTitle(entry) {
  // Use multiline mode because the title may not be at the start of
  // the file. Note that the m flag does not make . match line
  // terminators, so the title must be on a single line
  // Return text matched by the first capturing group.
  return /^#[ \t]+(.+)$/m.exec(entry)?.[1];
}

parseTitle("# Hello world"); // "Hello world"
parseTitle("## Subsection"); // undefined
parseTitle(`
---
slug: Web/JavaScript/Reference/Regular_expressions/Wildcard
---

# Wildcard: .

A **wildcard** matches all characters except line terminators.
`); // "Wildcard: ."
```

### Matching code block content

The following example matches the content of a code block enclosed by three backticks in Markdown. It uses the `s` flag to make `.` match line terminators, because the content of a code block may span multiple lines:

````js
function parseCodeBlock(entry) {
  return /^```.*?^(.+?)\n```/ms.exec(entry)?.[1];
}

parseCodeBlock(`
\`\`\`js
console.log("Hello world");
\`\`\`
`); // "console.log("Hello world");"

parseCodeBlock(`
A \`try...catch\` statement must have the blocks enclosed in curly braces.

\`\`\`js example-bad
try
  doSomething();
catch (e)
  console.log(e);
\`\`\`
`); // "try\n  doSomething();\ncatch (e)\n  console.log(e);"
````

> **Warning:**
> These examples are for demonstration only. If you want to parse Markdown, use a dedicated Markdown parser because there are many edge cases to consider.

## See also

- Character classes guide
- Regular expressions
- Character class: `[...]`, `[^...]`
- Character class escape: `\d`, `\D`, `\w`, `\W`, `\s`, `\S`
