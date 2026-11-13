---
title: "no-duplicate-at-import-rules"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/no-duplicate-at-import-rules/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# no-duplicate-at-import-rules

Disallow duplicate `@import` rules.

```css
    @import "a.css";
    @import "a.css";
/** ↑
 * These are duplicates */
```

This rule supports 1 message argument: the duplicate URL.

## Options

### `true`

```json
{
  "no-duplicate-at-import-rules": true
}
```

The following patterns are considered problems:

```css
@import 'a.css';
@import 'a.css';
```

```css
@import url("a.css");
@import url("a.css");
```

```css
@import "a.css";
@import 'a.css';
```

```css
@import "a.css";
@import 'b.css';
@import url(a.css);
```

The following patterns are _not_ considered problems:

```css
@import "a.css";
@import "b.css";
```

```css
@import url('a.css') projection;
@import url('a.css') tv;
```
