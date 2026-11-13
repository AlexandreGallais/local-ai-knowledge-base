---
title: "`unset` CSS keyword"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/unset/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `unset` CSS keyword

The **`unset`** CSS keyword resets a property to its inherited value if the property naturally inherits from its parent, and to its initial value if not. In other words, it behaves like the `inherit` keyword in the first case, when the property is an inherited property, and like the `initial` keyword in the second case, when the property is a non-inherited property.

**`unset`** can be applied to any CSS property, including the CSS shorthand property `all`.

## Examples

### Color

`color` is an inherited property.

#### HTML

```html
<p>This text is red.</p>
<div class="foo">
  <p>This text is also red.</p>
</div>
<div class="bar">
  <p>This text is green (default inherited value).</p>
</div>
```

#### CSS

```css
.foo {
  color: blue;
}

.bar {
  color: green;
}

p {
  color: red;
}

.bar p {
  color: unset;
}
```

#### Result

### Border

`border` is a non-inherited property.

#### HTML

```html
<p>This text has a red border.</p>
<div>
  <p>This text has a red border.</p>
</div>
<div class="bar">
  <p>This text has a black border (initial default, not inherited).</p>
</div>
```

#### CSS

```css
div {
  border: 1px solid green;
}

p {
  border: 1px solid red;
}

.bar p {
  border-color: unset;
}
```

#### Result

## See also

- Use the `initial` keyword to set a property to its initial value.
- Use the `inherit` keyword to make an element's property the same as its parent.
- Use the `revert` keyword to reset a property to the value established by the user-agent stylesheet (or by user styles, if any exist).
- Use the `revert-layer` keyword to reset a property to the value established in a previous cascade layer.
- Use the `revert-rule` keyword to reset a property to the value of an earlier matching style rule.
- The `all` property lets you reset all properties to their initial, inherited, reverted, or unset state at once.
