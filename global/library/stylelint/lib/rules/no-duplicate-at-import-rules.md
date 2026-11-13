---
title: "no-duplicate-at-import-rules"
tool: "stylelint"
version: "18.0"
source: "https://github.com/stylelint/stylelint/blob/7c49e1828311b9d413826cb47703ef1c6ccae4ef/lib/rules/no-duplicate-at-import-rules/README.md"
commit: "7c49e1828311b9d413826cb47703ef1c6ccae4ef"
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

Use this rule to avoid importing a stylesheet more than once. Browsers apply it at each position, so a later copy can override the imports between them.

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
