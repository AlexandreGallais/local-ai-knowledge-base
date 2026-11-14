---
title: "properties-alphabetical-order"
tool: "stylelint-order"
version: "8.1"
source: "https://github.com/hudochenkov/stylelint-order/blob/039bd9458a98b7c869347fd5fbd85d517d09bc3b/rules/properties-alphabetical-order/README.md"
commit: "039bd9458a98b7c869347fd5fbd85d517d09bc3b"
license: "MIT"
---

# properties-alphabetical-order

Specify the alphabetical order of properties within declaration blocks.

```css
a {
	color: pink;
	top: 0;
}
/** ↑
 * These properties */
```

Shorthand properties *must always* precede their longhand counterparts, even if that means they are not alphabetized.
(See also `declaration-block-no-shorthand-property-overrides`.)

Prefixed properties *must always* precede the unprefixed version.

This rule ignores variables (`$sass`, `@less`, `--custom-property`).

## Options

### Primary option

Value type: `boolean`.
Default value: none.

```json
{ "order/properties-alphabetical-order": true }
```

The following patterns are considered warnings:

```css
a {
	top: 0;
	color: pink;
}
```

```css
a {
	border-bottom-color: pink;
	border-color: transparent;
}
```

```css
a {
	-moz-transform: scale(1);
	transform: scale(1);
	-webkit-transform: scale(1);
}
```

The following patterns are *not* considered warnings:

```css
a {
	color: pink;
	top: 0;
}
```

```css
a {
	border-color: transparent;
	border-bottom-color: pink;
}
```

```css
a {
	-webkit-transform: scale(1);
	-moz-transform: scale(1);
	transform: scale(1);
}
```

```css
a {
	-moz-transform: scale(1);
	-webkit-transform: scale(1);
	transform: scale(1);
}
```
