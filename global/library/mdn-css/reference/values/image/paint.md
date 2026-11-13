---
title: "`paint()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/image/paint/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `paint()` CSS function

The **`paint()`** CSS function defines an `image` value generated with a PaintWorklet.

## Syntax

```css
paint(workletName, ...parameters)
```

where:

- _workletName_
    The name of the registered worklet.
- _parameters_ (optional)
    Optional additional parameters to pass to the paintWorklet

## Examples

### Basic CSS paint() usage

Given the following HTML:

```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
  <li>item 6</li>
  <li>item 7</li>
  <li>item 8</li>
  <li>item 9</li>
  <li>item 10</li>
  <li>item N</li>
</ul>
```

In JavaScript, we register the paint worklet:

```js
CSS.paintWorklet.addModule(
  "https://mdn.github.io/houdini-examples/cssPaint/intro/worklets/boxbg.js",
);
```

In the CSS, we define the `background-image` as a `paint()` type with the worklet name, `boxbg`, along with any variables (ex. `--box-color` and `--width-subtractor`) the worklet will use:

```css
body {
  font: 1.2em / 1.2 sans-serif;
}
li {
  background-image: paint(boxbg);
  --box-color: hsl(55 90% 60%);
}

li:nth-of-type(3n) {
  --box-color: hsl(155 90% 60%);
  --width-subtractor: 20;
}

li:nth-of-type(3n + 1) {
  --box-color: hsl(255 90% 60%);
  --width-subtractor: 40;
}
```

### CSS paint() with parameters

You can pass <example-value> arguments in the CSS `paint()` function. In this example, we passed two arguments that control whether the `background-image` on a group of list items is `filled` or has a `stroke` outline, and the `width` of that outline:

```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
  <li>item 6</li>
  <li>item 7</li>
  <li>item 8</li>
  <li>item 9</li>
  <li>item 10</li>
  <li>item N</li>
</ul>
```

```js
CSS.paintWorklet.addModule(
  "https://mdn.github.io/houdini-examples/cssPaint/intro/worklets/hilite.js",
);
```

```css
body {
  font: 1.2em / 1.2 sans-serif;
}

li {
  --box-color: hsl(55 90% 60% / 100%);
  background-image: paint(hollow-highlights, stroke, 2px);
}

li:nth-of-type(3n) {
  --box-color: hsl(155 90% 60% / 100%);
  background-image: paint(hollow-highlights, filled, 3px);
}

li:nth-of-type(3n + 1) {
  --box-color: hsl(255 90% 60% / 100%);
  background-image: paint(hollow-highlights, stroke, 1px);
}
```

We've included a custom property in the selector block defining a boxColor. Custom properties are accessible to the PaintWorklet.

## See also

- `PaintWorkletGlobalScope`
- CSS Painting API
- Using the CSS Painting API
- `image`
- Canvas API
