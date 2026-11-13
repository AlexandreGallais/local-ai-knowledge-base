---
title: "selector-max-compound-selectors"
tool: "stylelint"
version: "17.16"
source: "https://github.com/stylelint/stylelint/blob/bc06c7cdb1413de3d8dc939b33af138ab7e59df1/lib/rules/selector-max-compound-selectors/README.md"
commit: "bc06c7cdb1413de3d8dc939b33af138ab7e59df1"
license: "MIT"
---

# selector-max-compound-selectors

Limit the number of compound selectors in a selector.

```css
   div .bar[data-val] > a.baz + .boom > #lorem {}
/* ↑   ↑                ↑       ↑       ↑
   ↑   ↑                ↑       ↑       ↑
  Lv1 Lv2              Lv3     Lv4     Lv5  -- these are compound selectors */
```

A compound selector is a chain of one or more simple (tag, class, ID, universal, attribute) selectors. If there is more than one compound selector in a complete selector, they will be separated by combinators (e.g. ` `, `+`, `>`). One reason why you might want to limit the number of compound selectors is described in the SMACSS book.

Each selector in a selector list is evaluated separately.

> **Note:**
> In versions prior to `17.0.0`, this rule would evaluate functional pseudo-classes separately, such as `:not()` and `:is()`, and resolve nested selectors (in a nonstandard way) before counting.

This rule supports 2 message arguments: the selector and the configured maximum.

## Options

### `number`

Specify a maximum compound selectors allowed.

Given:

```json
{
  "selector-max-compound-selectors": 3
}
```

The following pattern is considered a problem:

```css
.foo .bar .baz .lorem {}
````

The following patterns are _not_ considered problems:

```css
div {}
```

```css
.foo div {}
```

```css
#foo #bar > #baz {}
```

## Optional secondary options

### `ignoreSelectors`

```json
{ "ignoreSelectors": ["array", "of", "selectors", "/regex/"] }
```

Ignore some compound selectors. This may be useful for deep selectors like Vue's `::v-deep` or Angular's `::ng-deep` that behave more like combinators than compound selectors.

Given:

```json
{
  "selector-max-compound-selectors": [
    2,
    { "ignoreSelectors": ["::v-deep", "/ignored/"] }
  ]
}
```

The following patterns are considered problems:

```css
.foo .bar ::v-deep .baz {}
```

```css
.foo .bar > .baz.ignored {}
```

```css
.foo .bar > .ignored.baz {}
```

The following patterns are _not_ considered problems:

```css
.foo::v-deep .bar {}
```

```css
.foo ::v-deep .baz {}
```

```css
.foo .bar > .ignored.ignored {}
```

```css
.foo .bar > .ignored .ignored {}
```
