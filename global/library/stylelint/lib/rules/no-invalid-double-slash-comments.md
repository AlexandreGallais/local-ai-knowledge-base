---
title: "no-invalid-double-slash-comments"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-invalid-double-slash-comments/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
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

Disallow double-slash comments (`//...`) are not supported by CSS and could lead to unexpected results.

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
