---
title: "`interest-delay-end` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/interest-delay-end/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `interest-delay-end` CSS property

The **`interest-delay-end`** CSS property specifies the delay between the user losing interest in an interest invoker element and the `loseinterest` event firing.

The `interest-delay-end` and `interest-delay-start` properties can both be set using the `interest-delay` shorthand.

## Syntax

```css
/* Keyword or custom delay */
interest-delay-end: normal;
interest-delay-end: 2s;
interest-delay-end: 250ms;

/* Global values */
interest-delay-end: inherit;
interest-delay-end: initial;
interest-delay-end: revert;
interest-delay-end: revert-layer;
interest-delay-end: unset;
```

### Values

This property is specified as one `<time>` value or the keyword `normal`:

- `normal`
    Sets the delay to the browser's default delay. This is the initial value.
- `<time>`
    Sets the delay to a specific duration. The value must be positive, otherwise the property becomes invalid.

## Examples

### Creating a basic `interest-delay-end` effect

In this example, we demonstrate how `interest-delay-end` affects interest invoker behavior.

#### HTML

The markup includes a ``, a ``, and an `` of type `checkbox`. We specify the `` as an interest invoker by giving it the `interestfor` attribute, whose value matches the `id` of the `` element. This makes the paragraph the target element. The paragraph is turned into a popover by giving it the `popover` attribute, which hides it initially.

```html
<button interestfor="mypopover">Button</button>
<p id="mypopover" popover>Hover tooltip</p>
<form>
  <input type="checkbox" id="apply-delay" />
  <label for="apply-delay">
    Apply an <code>interest-delay-end</code> of <code>2s</code>
  </label>
</form>
```

#### CSS

In the CSS, we specify a rule with a `.delay` selector that applies an `interest-delay-end` value of `2s` to any interest invoker the `delay` class is set on. We will set this on the `` when the checkbox is checked using JavaScript.

```css
.delay {
  interest-delay-end: 2s;
}
```

#### JavaScript

In our script, we get references to the `` and the checkbox, then create an event listener that toggles the `delay` class on the `` whenever the checkbox value changes (when it is checked or unchecked).

```js
const btn = document.querySelector("button");
const checkbox = document.querySelector("input");
checkbox.addEventListener("change", () => {
  btn.classList.toggle("delay");
});
```

#### Result

This renders as follows:

Try showing interest in the button (for example, by hovering or focusing it) and then losing interest to observe the popover showing and hiding. By default, the popover shows and hides after a very short delay.

Now check the checkbox and try the same actions again. This time, the delay between showing interest and the popover appearing is unaffected, but the delay between losing interest and the popover disappearing should be increased to `2s`.

## See also

- `interest-delay-start`, `interest-delay`
- Popover API
- Using interest invokers
- CSS basic user interface module
