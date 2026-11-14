---
title: "`@charset` CSS at-rule"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@charset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `@charset` CSS at-rule

The **`@charset`** CSS rule specifies the character encoding used in the style sheet. This syntax is useful when using non-ASCII characters in some CSS properties, like `content`. Although the first character in `@charset` is the `@` symbol, it is not an at-rule. It is a specific byte sequence that can only be placed at the very beginning of a stylesheet. No other characters, except the Unicode byte-order mark, are allowed before it. It also does not follow normal CSS syntax rules such as use of quotes or whitespace.

If a `@charset` is not recognized as the charset declaration, it is parsed as a normal at-rule. The CSS syntax module deprecates this fallback behavior, defining it as an unrecognized legacy rule to be dropped when a stylesheet is grammar-checked.

As there are several ways to define the character encoding of a style sheet, the browser will try the following methods in the following order (and stop as soon as one yields a result):

1. The value of the Unicode byte-order character placed at the beginning of the file.
2. The value given by the `charset` attribute of the `Content-Type:` HTTP header or the equivalent in the protocol used to serve the style sheet.
3. The `@charset` CSS declaration.
4. Use the character encoding defined by the referring document: the `charset` attribute of the `<link>` element. This method is obsolete and should not be used.
5. Assume that the document is UTF-8.

## Syntax

```css
@charset "UTF-8";
@charset "iso-8859-15";
```

### Parameters

- _charset_
    A `<string>` denoting the character encoding to be used. It must be the name of a web-safe character encoding defined in the IANA-registry, and must be double-quoted, following exactly one space character (U+0020), and immediately terminated with a semicolon. If several names are associated with an encoding, only the one marked with _preferred_ must be used.

## Formal syntax

Note that the `@charset` rule is not parsed via syntax, but via a specific byte sequence of the following form:

```plain
@charset "<charset>";
```

## Examples

### Valid and invalid charset declarations

```css
@charset "UTF-8"; /* Set the encoding of the style sheet to Unicode UTF-8 */
```

```css
@charset 'iso-8859-15'; /* Invalid, wrong quotes used */
@charset  "UTF-8"; /* Invalid, more than one space */
 @charset "UTF-8"; /* Invalid, there is a character (a space) before the declarations */
@charset UTF-8; /* Invalid, the charset is a CSS <string> and requires double-quotes */
```

## See also

- Character set glossary entry
- Unicode glossary entry
