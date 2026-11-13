---
title: "function-url-no-scheme-relative"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/function-url-no-scheme-relative/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
license: "MIT"
---

# function-url-no-scheme-relative

Disallow scheme-relative urls.

```css
a { background-image: url('//www.example.org/file.jpg'); }
/**                        ↑
 *  This scheme-relative url */
```

Use this rule to enforce a convention, as a scheme-relative URL takes its scheme from the page and so fails when the page is opened from disk.

This rule ignores url arguments that are variables (`$sass`, `@less`, `--custom-property`).

This rule doesn't have any message arguments.

## Options

### `true`

```json
{
  "function-url-no-scheme-relative": true
}
```

The following patterns are considered problems:

```css
a {
  background: url("//www.example.org/file.jpg");
}
```

```css
@import url("//www.example.org/foo.css");
```

The following patterns are _not_ considered problems:

```css
a {
  background: url("../file.jpg");
}
```

```css
a {
  background: url("http://www.example.org/file.jpg");
}
```

```css
a {
  background: url("/path/to/file.jpg");
}
```

```css
@import url("http://www.example.org/foo.css");
```

```css
@import url("/path/to/foo.css");
```
