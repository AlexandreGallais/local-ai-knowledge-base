---
title: "`<ident>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/ident/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<ident>` CSS type

The **`<ident>`** CSS data type denotes an arbitrary unquoted string of characters used as an identifier.

## Syntax

A CSS identifier consists of one or more characters, which can be any of the following:

- any ASCII character in the ranges `A-Z` and `a-z`
- any decimal digit (`0` to `9`)
- a hyphen (`-`)
- an underscore (`_`)
- any other Unicode character `U+00A0` and higher (that is, any other non-ASCII Unicode character)
- an escaped character

Additionally, an identifier must not start with an unescaped digit, and must not start with an unescaped hyphen followed by an unescaped digit.

Note that `id1`, `Id1`, `iD1` and `ID1` are all different identifiers because they are case-sensitive. On the other hand, since there are several ways to escape a character, `toto\?` and `toto\3F` are the same identifiers.

### Escaping characters

Escaping a character means representing it in a way that changes how it is interpreted by a software system. In CSS, you can escape a character by adding a backslash (`\`) in front of the character. Any character, except the hexadecimal digits `0-9`, `a-f`, and `A-F`, can be escaped in this way. For example, `&` can be escaped as `\&`.

You can also escape any character with a backslash followed by the character's Unicode code point represented by one to six hexadecimal digits. For example, `&` can be escaped as `\26`. In this usage, if the escaped character is followed by a hexadecimal digit, do one of the following:

- Place a space or other whitespace character after the Unicode code point.
- Provide the full six-digit Unicode code point of the character being escaped.

For example, the string `&123` can be escaped as `\26 123` (with a whitespace) or `\000026123` (with the six-digit Unicode code point for `&`) to ensure that `123` is not considered as part of the escape pattern.

## Examples

### Valid identifiers

```plain
nono79        /* A mix of alphanumeric characters and numbers */
ground-level  /* A mix of alphanumeric characters and a dash */
-test         /* A hyphen followed by alphanumeric characters */
--toto        /* A custom-property like identifier */
_internal     /* An underscore followed by alphanumeric characters */
\22 toto      /* An escaped character followed by alphanumeric characters */
\000022toto   /* Same as the previous example */
scooby\.doo   /* A correctly escaped period */
🔥123         /* A non-ASCII character followed by numbers */
```

### Invalid identifiers

```plain
34rem     /* Must not start with a decimal digit */
-12rad    /* Must not start with a dash followed by a decimal digit */
scooby.doo  /* ASCII characters apart from alphanumerics must be escaped */
'scoobyDoo' /* Treated as a string */
"scoobyDoo" /* Treated as a string */
```

## Browser compatibility

_As this type is not a real type but a convenience type used to simplify the definition of other CSS syntax, there is no browser compatibility information as such._

## See also

- <custom-ident>
- <dashed-ident>
