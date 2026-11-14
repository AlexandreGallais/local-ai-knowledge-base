---
title: "`:interest-source` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_interest-source/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:interest-source` CSS pseudo-class

The **`:interest-source`** CSS pseudo-class represents an interest invoker element when interest is shown on it.

## Syntax

```css
:interest-source {
  /* ... */
}
```

## Examples

### Selecting an interest invoker element

In this example, we demonstrate how `:interest-source` can be used to apply styles to an interest invoker element when interest is shown on it.

#### HTML

The markup includes a `` and a ``. We specify the `` as an interest invoker by giving it the `interestfor` attribute whose value matches the `id` of the `` element, making the paragraph the target element. The paragraph is turned into a popover by giving it the `popover` attribute, which hides it initially.

```html
<button interestfor="mypopover">Button</button>
<p id="mypopover" popover>A hover tooltip</p>
```

#### CSS

In the CSS, we specify a rule with an `:interest-source` selector to apply a specific combination of `background-color` and `color` to the `` when interest is shown on it. We also apply some other styles to the ``, which are hidden for brevity.

```css
button {
  margin: 10px;
  padding: 5px 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  font-size: 1.5em;
  background-color: #eeeeee;

  cursor: pointer;
}
```

```css
button:interest-source {
  background-color: hotpink;
  color: purple;
}
```

#### Result

This renders as follows:

Try showing interest in the button (for example, by hovering or focusing it), and note how the `hotpink` and `purple` color combination is applied only when interest is shown.

## See also

- `:interest-target`
- Popover API
- Using interest invokers
- CSS selectors module
