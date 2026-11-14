---
title: "`revert-rule` CSS keyword"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/revert-rule/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `revert-rule` CSS keyword

The **`revert-rule`** CSS-wide keyword rolls back the cascaded value of a property to the value it would have had if the current style rule had not been present. The cascade then determines the value from the remaining declarations — this could be another rule in the same cascade layer, a rule in a different layer, a different style origin, or a default value (`inherited` or `initial`).

When used inside a CSS animation (the animation origin), the `revert-rule` keyword behaves like `revert-layer`.

This keyword can be applied to any CSS property, including the CSS shorthand property `all`.

## Revert-rule vs. revert-layer vs. revert

The `revert-rule`, `revert-layer`, and `revert` keywords each roll back the cascade, but at different levels of granularity:

- `revert` removes all declarations from the current style origin, rolling back to the previous origin (for example, from author styles to user-agent styles).
- `revert-layer` removes all declarations from the current cascade layer, rolling back to the previous layer within the same origin.
- `revert-rule` removes only the declarations from the current style rule. Other rules in the same cascade layer still apply.

This makes `revert-rule` useful for conditionally ignoring specific declarations within a rule while still respecting declarations from other rules in the same layer.

## Examples

### Rolling back to the previous rule

In this example, two rules target the same element. The second rule uses `revert-rule` on the `color` property, which causes the cascade to determine the value as if the `p.special` rule were not present, falling back to the value established by the first rule.

#### HTML

```html
<p class="special">This paragraph has special styling.</p>
```

#### CSS

```css
body {
  font-family: system-ui;
}

@supports not (color: revert-rule) {
  body::before {
    content: "Your browser doesn't support the revert-rule keyword yet.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1em;
  }
}
```

```css
p {
  color: blue;
  font-weight: bold;
}

p.special {
  color: revert-rule;
  border: 1px solid currentColor;
}
```

#### Result

The paragraph text is blue from the `p` rule because `color: revert-rule` causes the `color` declaration in `p.special` to be ignored. The `font-weight` and `border` declarations are unaffected.

### Reverting from a style attribute

When `revert-rule` is used in a style attribute, it causes the cascade to act as if the style attribute were not present. This works because the style attribute is treated as its own style rule.

#### HTML

```html
<p style="color: revert-rule">This text uses the stylesheet color.</p>
```

#### CSS

```css
body {
  font-family: system-ui;
}

@supports not (color: revert-rule) {
  body::before {
    content: "Your browser doesn't support the revert-rule keyword yet.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1em;
  }
}
```

```css
p {
  color: green;
}
```

#### Result

The paragraph text is green because `revert-rule` causes the cascade to ignore the style attribute's declaration, and the `p` rule takes effect.

### Chaining multiple `revert-rule` values

If multiple rules use `revert-rule` for the same property, the cascade ignores each of them in turn, continuing back through earlier rules until it finds a concrete value.

#### HTML

```html
<p class="a b">This text is styled by a chain of revert-rule values.</p>
```

#### CSS

```css
body {
  font-family: system-ui;
}

@supports not (color: revert-rule) {
  body::before {
    content: "Your browser doesn't support the revert-rule keyword yet.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1em;
  }
}
```

```css
p {
  color: red;
}
p.a {
  color: revert-rule;
}
p.b {
  color: revert-rule;
}
```

#### Result

Both the `p.b` and `p.a` rules are ignored by `revert-rule`. The cascade falls through to the `p` rule, so the text is red.

## See also

- `initial`
- `inherit`
- `revert`
- `revert-layer`
- `unset`
- `all`
- CSS cascading and inheritance module
