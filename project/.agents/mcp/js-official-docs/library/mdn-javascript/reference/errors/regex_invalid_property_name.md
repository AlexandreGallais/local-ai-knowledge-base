---
title: "SyntaxError: invalid property name in regular expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/regex_invalid_property_name/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: invalid property name in regular expression

The JavaScript exception "invalid property name in regular expression" or "invalid class property name in regular expression" occurs when the `\p` and `\P` Unicode character class escapes are not followed by a valid Unicode property name and/or value.

## Message

```plain
SyntaxError: Invalid regular expression: /\p{x}/u: Invalid property name (V8-based)
SyntaxError: Invalid regular expression: /[\p{x}]/u: Invalid property name in character class (V8-based)
SyntaxError: invalid property name in regular expression (Firefox)
SyntaxError: invalid class property name in regular expression (Firefox)
SyntaxError: Invalid regular expression: invalid property expression (Safari)
```

## Error type

`SyntaxError`

## What went wrong?

In Unicode-aware mode, the `\p` and `\P` escape sequences are used to match characters or character sequences based on their Unicode properties. The `\p` escape sequence matches characters with the specified Unicode property, while the `\P` escape sequence matches characters without the specified Unicode property. The syntax is:

```regex
\p{loneProperty}
\P{loneProperty}

\p{property=value}
\P{property=value}
```

If it's not followed by `{`, then a recognizable property name/value, then `}`, this syntax error is thrown. For more information on what lone properties and property names are allowed, see the Unicode character class escape reference.

## Examples

### Invalid cases

```js
/\p{x}/u; // "x" is not a valid Unicode property name
/\p{Script=x}/u; // "x" is not a valid value for Script
/\property/u; // "\p" is not followed by the right syntax
/\p{RGI_Emoji_Flag_Sequence}/u;
// "RGI_Emoji_Flag_Sequence" is a property of strings, so the "v" flag must be used
/\P{RGI_Emoji_Flag_Sequence}/v; // \P cannot match properties of strings
```

### Valid cases

```js
/\p{Script=Latin}/u; // "Script=Latin" is a valid Unicode property
/\p{Letter}/u; // "Letter" is valid value for General_Category
/\p{RGI_Emoji_Flag_Sequence}/v; // Property of strings can only be used in "v" mode
```

## See also

- Regular expressions
- Unicode character class escape: `\p{...}`, `\P{...}`
