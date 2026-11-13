---
title: "Creating vertical form controls"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/writing_modes/vertical_controls/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Creating vertical form controls

The guide explains how to use the CSS `writing-mode` and `direction` properties to create and configure vertical form controls. This includes:

- `` sliders, `<progress>` bars, and `<meter>` elements.
- `<select>` elements.
- `` elements and button input types such as ``, ``, and ``.
- `<textarea>` elements and text-based input types such as ``, ``, and ``.

## General technique

In modern browsers, the `writing-mode` property can be set to a vertical value to vertically display form controls with text characters that are normally horizontal (for example in Latin languages), with text displayed at a 90-degree angle from the default. Normally vertical text characters, for example in Chinese or Japanese, are unaffected in this regard.

This is useful when creating vertical language forms.

Specifically:

- `writing-mode: vertical-lr` will create vertical form controls with a left-to-right block flow direction, meaning that in controls with wrapping or multiple lines of text, subsequent lines will appear to the right of previous lines.
- `writing-mode: vertical-rl` will create vertical form controls with a right-to-left block flow direction, meaning that in controls with wrapping or multiple lines of text, subsequent lines will appear to the left of previous lines.

You could use a transform to rotate the controls by 90 degrees, but that would place the controls in their own layer and cause unintended layout side effects such as other content being overlapped. Using `writing-mode` offers a more reliable solution.

> **Note:**
> While the `writing-mode` property is well supported, creating vertically-oriented form controls with `writing-mode` only gained full browser support in 2024.

> **Note:**
> The experimental `sideways-lr` and `sideways-rl` values have a similar effect as `vertical-lr` and `vertical-rl` respectively, except that normally vertical text characters (for example in Chinese or Japanese) are rotated 90 degrees to display on their sides, while horizontal text characters (for example in Latin languages) are unaffected by these values.

In addition, the `direction` property can be used to control the direction of the content inside the controls:

- `direction: ltr` will cause the content to start at the top and flow towards the bottom.
- `direction: rtl` will cause the content to start at the bottom and flow towards the top.

The `direction` property can be used to set the **inline base direction** — the primary direction in which content is ordered on a line, which defines on which sides the "start" and "end" of a line are. For text-based form controls the difference is obvious — the flow of text starts at the top or bottom. In non-text-based controls such as range sliders, `direction` sets the direction in which the control is drawn. For example, including `direction: ltr` on a vertical slider sets the lowest value at the top of the slider and the highest value at the bottom of the slider.

The sections below show how to create different types of vertical form control, along with examples of each. Consult the browser compatibility information on each of the linked reference pages to find out the exact support information for each type.

## Range sliders, meters, and progress bars

Let's have a look at creating vertical range sliders, meters, and progress bars.

### Basic <example-value>

A typical set of visual `` slider, `<progress>`, and `<meter>` controls is created like this:

```html
<input type="range" min="0" max="11" value="9" step="1" />
<meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="20">
  at 50/100
</meter>
<progress id="file" max="100" value="70">70%</progress>
```

> **Note:**
> Best practice is to include a `` element for each form control, to associate a meaningful text description with each field for accessibility purposes (see Use meaningful text labels for more information). We haven't done that here, as this article focuses purely on aspects of the form controls' visual rendering, but you should make sure you do so in production code.

To display the controls vertically, we can use CSS like this:

```css
input[type="range"],
meter,
progress {
  margin-block-end: 20px;
  writing-mode: vertical-lr;
}
```

`writing-mode: vertical-lr` (and `vertical-rl`) causes the controls to be displayed vertically in modern browsers.

The result of this looks like so:

### Drawing the control from bottom to top

By default, the controls have a `direction` value of `ltr`. This causes your sliders, meters, and progress bars to be drawn from top to bottom, as seen above.

You can change this by setting `direction: rtl` — this causes them to be drawn from bottom to top instead:

```html
<input type="range" min="0" max="11" value="9" step="1" />
<meter id="fuel" min="0" max="100" low="33" high="66" optimum="80" value="20">
  at 50/100
</meter>
<progress id="file" max="100" value="70">70%</progress>
```

```css
input[type="range"],
meter,
progress {
  margin-block-end: 20px;
  writing-mode: vertical-lr;
  direction: rtl;
}
```

The result of this looks like so:

### Creating vertical range sliders in older browsers

In older browsers that do not support the creation of vertical form controls with `writing-mode` and `direction`, there are limited alternatives available. The following only work on ``, causing the text to flow from bottom to top — they have no effect on `<meter>` and `<progress>` elements:

- The non-standard `appearance: slider-vertical` property can be used in older versions of Safari and Chrome.
- The non-standard `orient="vertical"` attribute can be added to the `` element itself in older versions of Firefox.

The HTML for this example includes an `` slider only, with `orient="vertical"` added to make it display vertically in older Firefox versions:

```html
<input type="range" min="0" max="11" value="9" step="1" orient="vertical" />
```

To cause the controls to also display vertically in older versions of Chrome and Safari, we can use `appearance: slider-vertical`:

```css
input[type="range"] {
  margin-block-end: 20px;
  appearance: slider-vertical;
}
```

The result looks like so:

## Select elements

This section shows how to handle vertical `<select>` elements.

### Select basic <example-value>

The below HTML creates two `<select>` elements, one where a single selection can be made and one with multiple selections:

```html
<select multiple>
  <option>First</option>
  <option>Second</option>
  <option>Third</option>
  <option>Fourth</option>
  <option>Fifth</option>
</select>
<select>
  <option>First</option>
  <option>Second</option>
  <option>Third</option>
  <option>Fourth</option>
  <option>Fifth</option>
</select>
```

To display the controls vertically, we can use CSS like this:

```css
select {
  inline-size: 100px;
  margin-block-end: 20px;
  writing-mode: vertical-rl;
}
```

The result of this looks like so:

### Adjusting text direction and option order

Again, it is possible to use a `direction` property value of `rtl` to set the text direction to go from bottom to top, instead of the default direction of top to bottom.

It is also worth noting that in the above example, the inline direction for the select options goes from right to left because we used `writing-mode: vertical-rl`. If we use `writing-mode: vertical-lr` instead, the `<option>` text will appear from left to right.

We'll explore these two use cases using three listbox (`multiple`) `<select>` elements, to enable comparing the effects side-by-side.

```html
<div class="controls">
  <div>
    <h2>writing-mode: vertical-lr</h2>
    <select multiple>
      <option>First</option>
      <option>Second</option>
      <option>Third</option>
      <option>Fourth</option>
      <option>Fifth</option>
    </select>
  </div>
  <div class="direction">
    <h2>direction: rtl & writing-mode: vertical-lr</h2>
    <select multiple>
      <option>First</option>
      <option>Second</option>
      <option>Third</option>
      <option>Fourth</option>
      <option>Fifth</option>
    </select>
  </div>
  <div class="reverse-option-order">
    <h2>writing-mode: vertical-rl</h2>
    <select multiple>
      <option>First</option>
      <option>Second</option>
      <option>Third</option>
      <option>Fourth</option>
      <option>Fifth</option>
    </select>
  </div>
</div>
```

In the CSS for this example, we set the following properties on the three listboxes:

1. `writing-mode: vertical-rl`, displaying just like in the previous example — text flowing top-to-bottom, and options displaying right-to-left.
2. `writing-mode: vertical-rl` and `direction: rtl`, with the options going from right-to-left but reversing the text flow from bottom-to-top.
3. `writing-mode: vertical-lr`, with the text going from top-to-bottom while reversing the option order from left-to-right.

```css
.controls {
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  font-family: sans-serif;
}

h2 {
  margin-top: 0;
  font-size: 1rem;
  text-align: center;
  flex: 1 0 100%;
}

.controls > div {
  margin-bottom: 20px;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-flow: row wrap;
}
```

```css
select {
  inline-size: 100px;
  margin-block-end: 20px;
  writing-mode: vertical-rl;
}

.direction select {
  direction: rtl;
}

.reverse-option-order select {
  writing-mode: vertical-lr;
}
```

The result looks like so:

## Buttons

This section shows how to handle vertical `` elements. Note that while we have only used a `` element in the examples below, the behavior is the same for other elements that create buttons, such as `` types of `button`, `reset`, and `submit`.

### Basic <example-value> example

The below HTML creates two `` elements, one with a single line of text, and one with three:

```html
<button>Press me</button> <button>Press me<br />Please?<br />Thanks</button>
```

To display the buttons vertically, we can use CSS like this:

```css
button {
  inline-size: 100px;
  margin-block-end: 20px;
  writing-mode: vertical-rl;
}
```

The result looks like so:

### Adjusting button text line order

When you swap the `writing-mode` value of `vertical-rl` to `vertical-lr`, subsequent lines of text will appear to the right of previous lines, rather than the left.

This example uses two copies of the three-text-line button we saw in the previous example, so you can easily see the effects of changing the writing mode:

```html
<div>
  <h2>writing-mode: vertical-lr</h2>
  <button>Press me<br />Please?<br />Thanks</button>
</div>
<div class="reverse-line-order">
  <h2>writing-mode: vertical-rl</h2>
  <button>Press me<br />Please?<br />Thanks</button>
</div>
```

In the CSS, we set `writing-mode: vertical-rl` on the first button to lay out the line order from right to left. On the second button, we set `writing-mode: vertical-lr` to reverse the line order — left to right:

```css
body {
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  font-family: sans-serif;
}

h2 {
  margin-top: 0;
  font-size: 1rem;
  text-align: center;
  flex: 1 0 100%;
}

div {
  margin-bottom: 20px;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-flow: row wrap;
}
```

```css
button {
  inline-size: 100px;
  margin-block-end: 20px;
  writing-mode: vertical-rl;
}

.reverse-line-order button {
  writing-mode: vertical-lr;
}
```

The result looks like so:

## Text-based form controls

Last but not least, we'll look at handling vertical `<textarea>`s and textual `` types. Note that, while the only `` type we are including is an `` element in the examples below, the behavior is the same for other textual `` types: `password`, `number`, `url`, etc.

### Basic text input and textarea example

The below HTML creates a `<textarea>` and an ``:

```html
<textarea>This is my textarea</textarea>
<input type="text" value="Input text" />
```

To display the input and textarea vertically, we can use CSS like this:

```css
textarea,
input[type="text"] {
  inline-size: 100px;
  margin-block-end: 20px;
  writing-mode: vertical-rl;
}
```

The result looks like so:

### Adjusting text direction and line layout order

You can use a `direction` property value of `rtl` to change the text direction from the default top-to-bottom to bottom-to-top. You can also set `writing-mode` to `vertical-lr` instead of `vertical-rl`, to cause multiple lines of text in `<textarea>`s to appear from left-to-right rather than the default right-to-left.

This example uses three copies of the same text controls we saw in the previous example, so you can easily see the effects of changing `direction` and `writing-mode` as discussed above:

```html
<div class="controls">
  <div>
    <h2>writing-mode: vertical-lr</h2>
    <textarea>This is my textarea</textarea>
    <input type="text" value="Input text" />
  </div>
  <div class="direction">
    <h2>direction: rtl & writing-mode: vertical-lr</h2>
    <textarea>This is my textarea</textarea>
    <input type="text" value="Input text" />
  </div>
  <div class="reverse-line-order">
    <h2>writing-mode: vertical-rl</h2>
    <textarea>This is my textarea</textarea>
    <input type="text" value="Input text" />
  </div>
</div>
```

In the CSS, we set the following properties on the three sets of text controls:

1. `writing-mode: vertical-rl` to make it display just like in the previous example — text flowing top-to-bottom, and lines flowing right-to-left.
2. `writing-mode: vertical-rl` and `direction: rtl` to flow the lines from right-to-left but reverse the text flow from bottom-to-top.
3. `writing-mode: vertical-lr` to flow the text top-to-bottom but reverse the flow of lines — left-to-right. Note that this has no effect on `` elements, as they are always single lines.

```css
.controls {
  box-sizing: border-box;
  display: flex;
  gap: 20px;
  font-family: sans-serif;
}

h2 {
  margin-top: 0;
  font-size: 1rem;
  text-align: center;
  flex: 1 0 100%;
}

.controls > div {
  margin-bottom: 20px;
  flex: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  flex-flow: row wrap;
}
```

```css
textarea,
input[type="text"] {
  inline-size: 100px;
  margin-block-end: 20px;
  writing-mode: vertical-rl;
}

.direction textarea,
.direction input[type="text"] {
  writing-mode: vertical-rl;
  direction: rtl;
}

.reverse-line-order textarea,
.reverse-line-order input[type="text"] {
  writing-mode: vertical-lr;
}
```

The result looks like so:

## See also

- The `` element.
- Other relevant elements: ``, `<meter>`, `<progress>`, and `<select>`.
- Learn: Handling different text directions
- Styling web forms
