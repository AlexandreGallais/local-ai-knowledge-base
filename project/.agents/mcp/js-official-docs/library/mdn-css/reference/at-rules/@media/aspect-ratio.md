---
title: "`aspect-ratio` CSS media feature"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@media/aspect-ratio/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `aspect-ratio` CSS media feature

The **`aspect-ratio`** CSS media feature can be used to test the aspect ratio of the viewport.

## Syntax

The `aspect-ratio` feature is specified as a `<ratio>` value representing the width-to-height aspect ratio of the viewport. It is a range feature, meaning you can also use the prefixed **`min-aspect-ratio`** and **`max-aspect-ratio`** variants to query minimum and maximum values, respectively.

## Examples

In the example below, a `` element is contained in an ``. The iframe creates its own viewport. Resize the `` to see `aspect-ratio` in action.

Note that, when none of the media query conditions are true, the background will turn white because none of the below rules will be applied to the `` inside the ``. See if you can find which width and height values trigger this!

### HTML

```html
<iframe
  id="outer"
  srcdoc="<div id='inner'>Watch this element as you resize iframe viewport's width and height.</div>">
</iframe>
```

### CSS

```css
/* Minimum allowed aspect ratio */
/* Select aspect ratios 8/5 = 1.6 and above */
@media (min-aspect-ratio: 8/5) {
  div {
    background: #9999ff; /* blue */
  }
}

/* Maximum allowed aspect ratio */
/* Select aspect ratios 3/2 = 1.5 and below */
@media (max-aspect-ratio: 3/2) {
  div {
    background: #99ff99; /* green */
  }
}

/* Exact aspect ratio, put it at the bottom to avoid override */
@media (aspect-ratio: 1/1) {
  div {
    background: #ff9999; /* red */
  }
}
```

### Result

```html
<label id="wf" for="w">width:165</label>
<input id="w" name="w" type="range" min="100" max="250" step="5" value="165" />
<label id="hf" for="w">height:165</label>
<input id="h" name="h" type="range" min="100" max="250" step="5" value="165" />
<label id="ratio">aspect-ratio: 165/165 = 1</label>

<iframe
  id="outer"
  srcdoc="<style> @media (min-aspect-ratio: 8/5) { div { background: #9999ff; } } @media (max-aspect-ratio: 3/2) { div { background: #99ff99; } } @media (aspect-ratio: 1/1) { div { background: #ff9999; } }</style><div id='inner'> Watch this element as you resize iframe viewport's width and height.</div>">
</iframe>
```

```css
iframe {
  display: block;
  border: 1px dashed black;
}
```

```js
outer.style.width = outer.style.height = "165px";

const updateRatio = () => {
  ratio.textContent = `aspect-ratio: ${w.value}/${h.value} = ${(w.value / h.value).toFixed(2)}`;
};

w.onchange = w.oninput = () => {
  outer.style.width = `${w.value}px`;
  wf.textContent = `width: ${w.value}`;
  updateRatio();
};

h.onchange = h.oninput = () => {
  outer.style.height = `${h.value}px`;
  hf.textContent = `height: ${h.value}`;
  updateRatio();
};
```

Note the `min-aspect-ratio: 8/5` sets the _lower_ bound to 1.6, so this media query selects elements with aspect ratios 1.6 and above. The `max-aspect-ratio: 3/2` sets the _upper_ bound, so this media query selects elements with aspect ratios 1.5 and below. The `aspect-ratio: 1/1` overrides the max aspect ratio rule because it has been declared after and selects elements with aspect ratios exactly `1`.

From the initial state, as you reduce height, the aspect ratio starts increasing from one. So the div's background color goes from red(1) < green(1.5) < white < blue(1.6).

## See also

- Understanding `aspect-ratio`
- Using Media Queries
- @media
