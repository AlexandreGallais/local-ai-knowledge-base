---
title: "at-charset-rule-no-invalid"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/at-charset-rule-no-invalid/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# at-charset-rule-no-invalid

Disallow invalid `@charset` rules.

```css
    @charset "utf-8";
/** ↑
 * This @charset rule */
```

Use this rule to avoid falling back to another encoding. Browsers ignore an invalid `@charset` and decode the stylesheet with the referring document's encoding or UTF-8.

The `@charset` rule is not an at-rule. It's a byte sequence that browsers look for at the very start of a stylesheet, as defined in the CSS Syntax Level 3 specification.

It must be written as `@charset`, followed by a single space, followed by the encoding label in double quotes, followed by a semicolon.

It must also be the first thing in the stylesheet, and it has no effect when the file starts with a byte order mark, as the mark takes precedence over it.

> **Warning:**
> This rule is only appropriate for CSS files. You should not turn it on for CSS-like languages, such as SCSS or Less, or for CSS embedded in another language, such as HTML.

This rule supports 1 message argument: the reason the `@charset` rule is invalid.

## Options

### `true`

```json
{
  "at-charset-rule-no-invalid": true
}
```

The following patterns are considered problems:

```css
@charset 'utf-8';
```

```css
@CHARSET "utf-8";
```

```css
@charset  "utf-8";
```

```css
@charset "utf-8" ;
```

```css
/* foo */
@charset "utf-8";
```

The following patterns are _not_ considered problems:

```css
@charset "utf-8";
```

```css
@charset "utf-8";
/* foo */
```
