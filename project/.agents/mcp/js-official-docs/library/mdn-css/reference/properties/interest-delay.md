---
title: "`interest-delay` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/interest-delay/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `interest-delay` CSS property

The **`interest-delay`** CSS property specifies the delay between the user showing interest in an interest invoker element and the `interest` event firing, and the delay between the user losing interest and the `loseinterest` event firing.

## Constituent properties

This property is a shorthand for the following properties:

- `interest-delay-start`
- `interest-delay-end`

## Syntax

```css
/* Single value */
interest-delay: normal;
interest-delay: 2s;
interest-delay: 250ms;

/* Two values */
interest-delay: 1s normal;
interest-delay: 0s 500ms;

/* Global values */
interest-delay: inherit;
interest-delay: initial;
interest-delay: revert;
interest-delay: revert-layer;
interest-delay: unset;
```

### Values

The `interest-delay` property accepts one or two values. The first value sets the delay before interest is shown (`interest-delay-start`); the second value, if provided, sets the delay before interest is lost (`interest-delay-end`). Each value can be either the keyword `normal` or a `<time>` value:

- `normal`
    Sets the delay to the browser's default delay. This is the initial value.
- `<time>`
    Sets the delay to a specific duration. The value must be positive, otherwise the property becomes invalid.

## Description

A control element such as an `` or `` can be set as an interest invoker by giving it the `interestfor` attribute. Its value should be the `id` of a target element. When this relationship is established, the target element is affected when the user "shows interest" in the invoker (for example, by hovering or focusing it). A common use case is to display a popover on hover or focus. When the user "loses interest", the effect stops.

When the user shows or loses interest, the associated effect doesn't start or stop immediately — the browser adds a short delay (which may vary by browser). This prevents preview popovers, for example, from appearing immediately when the user hovers a link, which could be annoying and distracting on a link-heavy page.

The `interest-delay` property allows you to customize these delays. You can use `interest-delay` to specify the delay before the interest effect starts (specified by the `interest-delay-start` property) and the delay before the interest effect ends (specified by the `interest-delay-end` property) in a single declaration.

The `interest-delay` property can take one or two values. These values can be the keyword `normal`, which sets the default browser delay, or a `<time>` value, which sets a custom delay.
If a single value is specified, it applies to both `interest-delay-start` and `interest-delay-end`. If two values are specified, the first value sets `interest-delay-start`, and the second value sets `interest-delay-end`.

## Examples

### Creating a basic `interest-delay` effect

In this example, we demonstrate how `interest-delay` affects interest invoker behavior.

#### HTML

The markup includes a ``, a ``, and an `` of type `checkbox`. We specify the `` as an interest invoker by giving it the `interestfor` attribute whose value matches the `id` of the `` element. This makes the paragraph the target element. The paragraph is turned into a popover by giving it the `popover` attribute, which hides it initially.

```html
<button interestfor="mypopover">Button</button>
<p id="mypopover" popover>Hover tooltip</p>
<form>
  <input type="checkbox" id="apply-delay" />
  <label for="apply-delay">
    Apply an <code>interest-delay</code> of <code>1s 2s</code>
  </label>
</form>
```

#### CSS

In the CSS, we define a `.delay` rule that applies an `interest-delay` value of `1s 2s` to any interest invoker the `delay` class is set on. We will set this class on the `` when the checkbox is checked using JavaScript.

```css
.delay {
  interest-delay: 1s 2s;
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

Now check the checkbox and try the same actions again. This time, the popover should appear after a delay of `1s` when interest is shown, and hide after a delay of `2s` when interest is lost.

## See also

- `interest-delay-start`, `interest-delay-end`
- Popover API
- Using interest invokers
- CSS basic user interface module
