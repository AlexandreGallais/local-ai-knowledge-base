---
title: "no-invalid-double-slash-comments"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-invalid-double-slash-comments/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# no-invalid-double-slash-comments

Disallow invalid double-slash comments.

```css
a {
  //color: pink;
}
/** ↑
 *  This comment */
```

Use this rule to avoid declarations that browsers ignore. CSS doesn't support `//` comments, so a comment becomes part of the next declaration or selector and invalidates it.

If you are using a preprocessor that allows `//` single-line comments (e.g. Sass, Less, Stylus), this rule will not complain about those. They are compiled into standard CSS comments by your preprocessor, so Stylelint will consider them valid. This rule only complains about the lesser-known method of using `//` to "comment out" a single-line of code in regular CSS. (If you didn't know this was possible, have a look at "Single Line Comments (//) in CSS").

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "no-invalid-double-slash-comments": true
}
```

The following patterns are considered problems:

```css
a {
  //color: pink;
}
```

```css
//a { color: pink; }
```

```css
// Comment {}
a {
  color: pink;
}
```

The following patterns are _not_ considered problems:

```css
a {
  /* color: pink; */
}
```

```css
/* a { color: pink;  } */
```
