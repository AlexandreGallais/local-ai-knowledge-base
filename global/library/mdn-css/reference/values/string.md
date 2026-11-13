---
title: "`<string>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/string/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<string>` CSS type

The **`<string>`** CSS data type represents a sequence of characters. Strings are used in numerous CSS properties, such as `content`, `font-family`, and `quotes`.

## Syntax

The `<string>` data type is composed of any number of Unicode characters surrounded by either double (`"`) or single (`'`) quotes.

Most characters can be represented literally. All characters can also be represented with their respective Unicode code points in hexadecimal, in which case they are preceded by a backslash (`\`). For example, `\22` represents a double quote, `\27` a single quote (`'`), and `\A9` the copyright symbol (`©`).

Importantly, certain characters which would otherwise be invalid can be escaped with a backslash. These include double quotes when used inside a double-quoted string, single quotes when used inside a single-quoted string, and the backslash itself. For example, `\\` will create a single backslash.

To output new lines, you must escape them with a line feed character such as `\A` or `\00000A`. In your code, however, strings can span multiple lines, in which case each new line must be escaped with a `\` as the last character of the line.

However, to get new lines, you must also set the `white-space` property to appropriate value.

> **Note:**
> Character references (such as ` ` or `&#8212;`) cannot be used in a CSS `<string>`.

## Examples

### Examples of valid strings

```css
/* Basic <example-value> */
"This string is demarcated by double quotes."
'This string is demarcated by single quotes.'

/* Character escaping */
"This is a string with \" an escaped double quote."
"This string also has \22 an escaped double quote."
'This is a string with \' an escaped single quote.'
'This string also has \27 an escaped single quote.'
"This is a string with \\ an escaped backslash."

/* New line in a string */
"This string has a \Aline break in it."

/* String spanning two lines of code (these two strings will have identical output) */
"A really long \
awesome string"
"A really long awesome string"
```

## See also

- CSS values and units module
- CSS basic data types
- Introduction to CSS: Values and units
