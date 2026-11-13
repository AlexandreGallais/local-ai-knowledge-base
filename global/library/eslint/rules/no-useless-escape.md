---
title: "no-useless-escape"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-useless-escape.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-useless-escape

Escaping non-special characters in strings, template literals, and regular expressions doesn't have any effect, as demonstrated in the following example:

```js
let foo = "hol\a"; // > foo = "hola"
let bar = `${foo}\!`; // > bar = "hola!"
let baz = /\:/ // same functionality with /:/
```

## Rule Details

This rule flags escapes that can be safely removed without changing behavior.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-useless-escape: "error"*/

"\'";
'\"';
"\#";
"\e";
`\"`;
`\"${foo}\"`;
`\#{foo}`;
/\!/;
/\@/;
/[\[]/;
/[a-z\-]/;
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-useless-escape: "error"*/

"\"";
'\'';
"\x12";
"\u00a9";
"\371";
"xs\u2111";
`\``;
`\${${foo}}`;
`$\{${foo}}`;
/\\/g;
/\t/g;
/\w\$\*\^\./;
/[[]/;
/[\]]/;
/[a-z-]/;
```

## Options

This rule has an object option:

* `allowRegexCharacters` - An array of characters that should be allowed to have unnecessary escapes in regular expressions. This is useful for characters like `-` where escaping can prevent accidental character ranges. For example, in `/[0\-]/`, the escape is technically unnecessary but helps prevent the pattern from becoming a range if another character is added later (e.g., `/[0\-9]/` vs `/[0-9]/`).

### allowRegexCharacters

Examples of **incorrect** code for the `{ "allowRegexCharacters": ["-"] }` option:

**Incorrect:**

```js
/*eslint no-useless-escape: ["error", { "allowRegexCharacters": ["-"] }]*/

/\!/;
/\@/;
/[a-z\^]/;
```

Examples of **correct** code for the `{ "allowRegexCharacters": ["-"] }` option:

**Correct:**

```js
/*eslint no-useless-escape: ["error", { "allowRegexCharacters": ["-"] }]*/

/[0\-]/;
/[\-9]/;
/a\-b/;
```

## When Not To Use It

If you don't want to be notified about unnecessary escapes, you can safely disable this rule.
