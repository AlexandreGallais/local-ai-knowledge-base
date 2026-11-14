---
title: "`:interest-target` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_interest-target/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:interest-target` CSS pseudo-class

The **`:interest-target`** CSS pseudo-class represents the target element associated with an interest invoker when interest is shown on that invoker.

## Syntax

```css
:interest-target {
  /* ... */
}
```

## Examples

### Selecting the target element associated with an interest invoker

In this example, we demonstrate how `:interest-target` can be used to apply styles to an interest invoker element's target element when interest is shown on the invoker.

#### HTML

The markup includes a `` and a ``. We specify the `` as an interest invoker by giving it the `interestfor` attribute whose value matches the `id` of the `` element, making the paragraph the target element.

```html
<button interestfor="mytarget">Button</button>
<p id="mytarget">A paragraph</p>
```

#### CSS

In the CSS, we specify a rule with an `:interest-target` selector, which will apply a specific set of styles to the `` element when interest is shown in the ``. We also apply some other styles to the ``, which we've hidden for brevity.

```css
body {
  margin: 10px;
}

button {
  padding: 5px 10px;
  border: 1px solid #dddddd;
  border-radius: 5px;
  background-color: #eeeeee;

  cursor: pointer;
}
```

```css
p:interest-target {
  font-size: 1.5em;
  font-family: sans-serif;
  padding: 10px;
  background-color: hotpink;
  color: purple;
}
```

#### Result

This renders as follows:

Try showing interest in the button (for example, by hovering or focusing it), and note how this results in the styles shown earlier being applied to the paragraph.

## See also

- `:interest-source`
- Popover API
- Using interest invokers
- CSS selectors module
