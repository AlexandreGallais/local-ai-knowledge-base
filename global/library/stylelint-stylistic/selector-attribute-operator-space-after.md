---
title: "selector-attribute-operator-space-after"
tool: "stylelint-stylistic"
version: "5.3"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/d61d92538fce80f9e25ad9fee7b8018bf7f33e92/lib/rules/selector-attribute-operator-space-after/README.md"
commit: "d61d92538fce80f9e25ad9fee7b8018bf7f33e92"
license: "MIT"
---

# selector-attribute-operator-space-after

Require a single space or disallow whitespace after operators within attribute selectors.

```css
[target= _blank]
/**    ↑
 * The space after operator */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space after the operator.

The following patterns are considered problems:

```css
[target=_blank] {}
```

```css
[target =_blank] {}
```

```css
[target='_blank'] {}
```

```css
[target="_blank"] {}
```

```css
[target ='_blank'] {}
```

```css
[target ="_blank"] {}
```

The following patterns are _not_ considered problems:

```css
[target] {}
```

```css
[target= _blank] {}
```

```css
[target= '_blank'] {}
```

```css
[target= "_blank"] {}
```

```css
[target = _blank] {}
```

```css
[target = '_blank'] {}
```

```css
[target = "_blank"] {}
```

### `"never"`

There _must never_ be a single space after the operator.

The following patterns are considered problems:

```css
[target= _blank] {}
```

```css
[target = _blank] {}
```

```css
[target= '_blank'] {}
```

```css
[target= "_blank"] {}
```

```css
[target = '_blank'] {}
```

```css
[target = "_blank"] {}
```

The following patterns are _not_ considered problems:

```css
[target] {}
```

```css
[target=_blank] {}
```

```css
[target='_blank'] {}
```

```css
[target="_blank"] {}
```

```css
[target =_blank] {}
```

```css
[target ='_blank'] {}
```

```css
[target ="_blank"] {}
```
