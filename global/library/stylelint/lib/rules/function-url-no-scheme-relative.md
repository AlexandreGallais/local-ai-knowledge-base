---
title: "function-url-no-scheme-relative"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/function-url-no-scheme-relative/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# function-url-no-scheme-relative

Disallow scheme-relative urls.

```css
a { background-image: url('//www.example.org/file.jpg'); }
/**                        ↑
 *  This scheme-relative url */
```

A scheme-relative url is a url that begins with `//` followed by a host.

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
