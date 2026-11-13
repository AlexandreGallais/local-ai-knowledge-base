---
title: "selector-attribute-operator-space-before"
tool: "stylelint-stylistic"
version: "6.0"
source: "https://github.com/stylelint-stylistic/stylelint-stylistic/blob/3cd01e1c32e87a7d92b99c3a35e869bc36c019bb/lib/rules/selector-attribute-operator-space-before/README.md"
commit: "3cd01e1c32e87a7d92b99c3a35e869bc36c019bb"
license: "MIT"
---

# selector-attribute-operator-space-before

Require a single space or disallow whitespace before operators within attribute selectors.

```css
[target =_blank]
/**     ↑
 * The space before operator */
```

The `fix` option can automatically fix all of the problems reported by this rule.

## Options

`string`: `"always"|"never"`

### `"always"`

There _must always_ be a single space before the operator.

The following patterns are considered problems:

```css
[target=_blank] {}
```

```css
[target= _blank] {}
```

```css
[target='_blank'] {}
```

```css
[target="_blank"] {}
```

```css
[target= '_blank'] {}
```

```css
[target= "_blank"] {}
```

The following patterns are _not_ considered problems:

```css
[target] {}
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

There _must never_ be a single space before the operator.

The following patterns are considered problems:

```css
[target =_blank] {}
```

```css
[target = _blank] {}
```

```css
[target ='_blank'] {}
```

```css
[target ="_blank"] {}
```

```css
[target = '_blank'] {}
```

```css
[target = "_blank"] {}
```

The following patterns are _not_ considered problems:

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
[target= _blank] {}
```

```css
[target= '_blank'] {}
```

```css
[target= "_blank"] {}
```
