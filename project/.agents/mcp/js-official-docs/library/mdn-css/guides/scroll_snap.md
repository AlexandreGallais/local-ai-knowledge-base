---
title: "CSS scroll snap"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/scroll_snap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS scroll snap

The **CSS scroll snap** module provides properties that let you control the panning and scrolling behavior by defining snap positions. Content can be snapped into position as the user scrolls overflowing content within a scroll container, providing paging and scroll positioning.

This module includes the scroll container scroll-padding properties to adjust the optimal viewing region of paging during scroll-into-view operations. It also includes scroll-margin and scroll-alignment, set on the scroll container's children, to adjust the children's visual area when that child is scrolled into view, as well as a property to force scrolling to stop on individual children.

## Scroll snap in action

To view scroll snapping in the box below, scroll up-and-down and left-and-right through the grid of 45 numbered boxes in the scrollable viewport.
Click "Play" in the example below to view or edit the source in the MDN Playground:

```js
const positions = ["start", "center", "end"];
const inlineDirection = document.getElementById("inline");
const blockDirection = document.getElementById("block");
const stop = document.getElementById("stop");
const snap = document.getElementById("snap");
const all = document.querySelector("article");
const rules = document.getElementById("css-output").sheet.cssRules;

setSST();
setSSA();

inlineDirection.addEventListener("change", () => {
  setSSA();
});
blockDirection.addEventListener("change", () => {
  setSSA();
});
stop.addEventListener("change", () => {
  setSST();
});
snap.addEventListener("change", () => {
  all.classList.toggle("snapDisabled");
});

function setSSA() {
  rules[0].style.scrollSnapAlign = `${positions[blockDirection.value]} ${
    positions[inlineDirection.value]
  }`;
}

function setSST() {
  if (stop.checked) {
    rules[0].style.scrollSnapStop = "always";
  } else {
    rules[0].style.scrollSnapStop = "normal";
  }
}
```

```html
<article>
  <ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
  </ul>
  <div>
    <fieldset>
      <legend>Change the options</legend>
      <p>
        <label
          ><input
            type="range"
            min="0"
            max="2"
            value="1"
            list="places"
            id="block" />
          block position</label
        >
      </p>
      <p>
        <label>
          <input
            type="range"
            min="0"
            max="2"
            value="1"
            list="places"
            id="inline" />
          inline position
        </label>
      </p>
      <p>
        <label>
          <input type="checkbox" id="stop" />
          Prevent scrolling past boxes
        </label>
      </p>
    </fieldset>

    <p>
      <label><input type="checkbox" id="snap" /> disable snapping</label>
    </p>

    <datalist id="places">
      <option value="0">start</option>
      <option value="1">center</option>
      <option value="2">end</option>
    </datalist>
  </div>
</article>
```

```css
li {
  /*
  starts with:
      scroll-snap-align: center center;
      scroll-snap-stop: normal (defaults);

  CSS gets changed with JavaScript when you change the controls.
  the following can be set:
      scroll-snap-stop: always | normal;
      scroll-snap-align: start | center | end {2}
        */
}
ul {
  overflow: auto;
  scroll-snap-type: both mandatory;
  overscroll-behavior-x: contain;
}
article.snapDisabled fieldset {
  opacity: 20%;
  pointer-events: none;
}
article.snapDisabled ul {
  scroll-snap-type: initial;
  overscroll-behavior-x: initial;
}

@layer page-setup {
  article {
    display: flex;
    gap: 2vw;
  }
  div {
    flex: 1;
  }
  ul {
    display: grid;
    gap: 6.25vw;
    padding: 12.5vw;
    box-sizing: border-box;
    border: 1px solid;
    grid-template-columns: repeat(5, 1fr);
    background: conic-gradient(
      at bottom left,
      red 0deg,
      yellow 15deg,
      green 30deg,
      blue 45deg,
      purple 60deg,
      magenta 75deg
    );
    background-attachment: local;
    margin: auto;
    width: 20vw;
    height: 20vw;
  }
  li {
    scroll-snap-align: center;
    height: 12.5vw;
    width: 12.5vw;
    outline: 3px inset;
    list-style-type: none;
    background: white;
    font-family: monospace;
    font-size: 3rem;
    line-height: 12vw;
    text-align: center;
    counter-increment: items 1;
  }
  li::after {
    content: counter(items);
  }
  input {
    vertical-align: bottom;
  }
  p {
    font-family: monospace;
  }
}
```

With scroll snap, one of the numbered boxes that you scroll to will snap into place. The initial CSS makes the numbered box snap into the center of the viewport. Use the sliders to change the block and inline snap positions.

Using snap properties, you can allow or block the scrolling past an element, a numbered box in this case. Select the "Prevent scrolling past boxes" checkbox to force all scrolling actions to be limited to scrolling to an adjacent box.

To compare scroll snapping to regular scrolling, check the "disable snapping" checkbox and try scrolling again.

## Reference

### Properties on containers

- `scroll-snap-type`
- `scroll-padding`
  - `scroll-padding-top`
  - `scroll-padding-right`
  - `scroll-padding-bottom`
  - `scroll-padding-left`
  - `scroll-padding-inline`
  - `scroll-padding-inline-start`
  - `scroll-padding-inline-end`
  - `scroll-padding-block`
  - `scroll-padding-block-start`
  - `scroll-padding-block-end`

### Properties on children

- `scroll-initial-target`
- `scroll-margin`
  - `scroll-margin-top`
  - `scroll-margin-right`
  - `scroll-margin-bottom`
  - `scroll-margin-left`
  - `scroll-margin-inline`
  - `scroll-margin-inline-start`
  - `scroll-margin-inline-end`
  - `scroll-margin-block`
  - `scroll-margin-block-start`
  - `scroll-margin-block-end`
- `scroll-snap-align`
- `scroll-snap-stop`

### Events

- `scrollsnapchange` (experimental)
- `scrollsnapchanging` (experimental)

### Interfaces

- `SnapEvent` (experimental)
  - `SnapEvent.snapTargetBlock` (experimental)
  - `SnapEvent.snapTargetInline` (experimental)

## Guides

- Basic <example-value> of CSS scroll snap
    An overview and examples of CSS scroll snap features.
- Using scroll snap events
    A guide to using the `scrollsnapchanging` and `scrollsnapchange` scroll snap events that are fired when the browser determines a new snap target is pending or selected.

## Related concepts

- `:target` pseudo-class
- `overflow` CSS property
- Element `scroll()` method
- Element `scrollBy()` method
- Element `scrollIntoView()` method
- Element `scrollTo()` method
- Element `scroll` event
- Element `scrollend` event
- `scrollbar` ARIA role
- Scroll container glossary term

## See also

- CSS overflow module
- CSS scrollbars styling module
- CSS scroll anchoring module
- Keyboard-only scrolling areas on adrianroselli.com (2022)
- Scroll snap examples on CodePen (2022)
- Practical CSS scroll snapping/ on CSS-Tricks (2020)
- CSS scroll snap on 12 Days of Web (2019)
- Well-controlled scrolling with CSS scroll snap on web.dev (2018)
