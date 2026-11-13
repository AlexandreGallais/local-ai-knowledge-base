---
title: "CSS overflow"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/overflow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS overflow

The **CSS overflow** module properties enable you to handle scrollable overflow in visual media.

Overflow happens when the content in an element box extends past one or more of the box's edges. **Scrollable overflow** is the content that appears outside the element box for which you might want to add a scrolling mechanism. CSS overflow properties let you control what happens when content overflows an element box, including creating carousels without JavaScript.

Painting effects that overflow the content but do not participate in the CSS box model do not affect layout. This type of overflow is also known as ink overflow. Examples of ink overflows include box shadows, border images, text decoration, overhanging glyphs, and outlines. Ink overflows do not extend the scrollable overflow region.

## Overflow in action

Try the following example to see the effects of various `overflow` property values on the content overflow and scrollbars in the adjacent fixed-size box.

The example includes options to change the values for the `overflow-clip-margin` and `width` properties, as well as to programmatically scroll the content if the overflow property creates a scroll container. Select `overflow: clip` and see the effect of different `overflow-clip-margin` values. Select `overflow: hidden` or `overflow: scroll` to check out the various `ScrollLeft` and `ScrollTop` slider settings.

```html
<article>
  <fieldset>
    <legend>Select options:</legend>
    <label
      ><code>overflow</code>:
      <select id="overflowValue">
        <option>hidden</option>
        <option>clip</option>
        <option>scroll</option>
        <option>auto</option>
        <option selected>visible</option>
        <option>overlay</option>
      </select>
    </label>
    <label>
      <code>overflow-clip-margin</code>:
      <input type="number" id="ocm" value="1" min="0" max="10" />
      <code>em</code>
    </label>
    <label
      ><input type="checkbox" id="wide" /> <code>width</code>:
      <code>20em</code> or <code>40em</code></label
    >
    <fieldset>
      <legend>Scroll programmatically:</legend>
      <label
        >ScrollLeft:
        <input type="range" min="0" max="100" value="0" id="scrollL"
      /></label>
      <label
        >ScrollTop:
        <input type="range" min="0" max="100" value="0" id="scrollT"
      /></label>
    </fieldset>
  </fieldset>
  <pre class="visible">&nbsp;
    Oh, Rubber Duckie, you're the one
    You make bath time lots of fun
    Rubber Duckie, I'm awfully fond of you

    Rubber Duckie, joy of joys
    When I squeeze you, you make noise
    Rubber Duckie, you're my very best friend, it's true

    Oh, every day when I make my way to the tubby
    I find a little fella who's cute and yellow and chubby
    Rub-a-dub-dubby

    <a href="#">Rubber Duckie</a>, you're so fine
    And I'm lucky that you're mine
    Rubber Duckie, I'm awfully fond of you
      </pre>
</article>
```

```css
article {
  display: flex;
  gap: 1em;
}

label {
  display: block;
  white-space: nowrap;
}

pre {
  border: 2px dashed crimson;
  height: 150px;
  width: 20em;
  margin-bottom: 3em;
  overflow-clip-margin: 1em;
  text-align: center;
}

.wide {
  width: 40em;
}

::before {
  font-weight: bold;
  color: white;
  background: crimson;
  display: inline-block;
  min-width: 50%;
  padding: 3px 5px;
  box-sizing: border-box;
}

.hidden {
  overflow: hidden;
}
.hidden::before {
  content: "hidden: ";
}

.clip {
  overflow: clip;
}
.clip::before {
  content: "clip: ";
}

.scroll {
  overflow: scroll;
}
.scroll::before {
  content: "scroll: ";
}

.auto {
  overflow: auto;
}
.auto::before {
  content: "auto: ";
}

.overlay {
  overflow: clip;
  overflow: overlay;
}
.overlay::before {
  content: "overlay (or clip if not supported): ";
}

.visible {
  overflow: visible;
}
.visible::before {
  content: "visible: ";
}

article:not(:has(pre.clip)) > fieldset > label:nth-of-type(2),
article:not(:has(pre.hidden, pre.scroll, pre.auto, pre.overlay))
  fieldset
  fieldset {
  opacity: 20%;
  pointer-events: none;
}
```

```js
const pre = document.querySelector("pre");
const val = document.getElementById("overflowValue");
const check = document.getElementById("wide");
const ocm = document.getElementById("ocm");
const scrollL = document.getElementById("scrollL");
const scrollT = document.getElementById("scrollT");

val.addEventListener("change", () => {
  if (pre.classList.contains("wide")) {
    pre.className = `wide ${val.value}`;
  } else {
    pre.className = `${val.value}`;
  }
  scrollExample();
  clipMargin();
});

check.addEventListener("change", () => {
  pre.classList.toggle("wide");
  scrollExample();
});

ocm.addEventListener("change", () => {
  clipMargin();
});

scrollL.addEventListener("change", () => {
  scrollExample();
});
scrollT.addEventListener("change", () => {
  scrollExample();
});

function scrollExample() {
  pre.scrollTo({
    top: scrollT.value,
    left: scrollL.value * 2,
    behavior: "smooth",
  });
}

function clipMargin() {
  pre.style.overflowClipMargin = `${ocm.value}em`;
}
```

A link is included in the content box above to demonstrate the effects of keyboard focus on overflow and scroll behaviors. Try tabbing to the link or programmatically scrolling the content: the content will scroll only if the enumerated `<overflow>` value creates a scroll container.

## Reference

### Properties

- `line-clamp`
- `overflow` shorthand
- `overflow-block`
- `overflow-clip-margin`
- `overflow-inline`
- `overflow-x`
- `overflow-y`
- `scroll-behavior`
- `scroll-marker-group`
- `scroll-target-group`
- `scrollbar-gutter`
- `text-overflow`

The CSS overflow level 4 module also introduces the `block-ellipsis`, `continue`, `max-lines`, `overflow-clip-margin-block`, `overflow-clip-margin-block-end`, `overflow-clip-margin-block-start`, `overflow-clip-margin-bottom`, `overflow-clip-margin-inline`, `overflow-clip-margin-inline-end`, `overflow-clip-margin-inline-start`, `overflow-clip-margin-left`, `overflow-clip-margin-right`, and `overflow-clip-margin-top` properties. Currently, no browsers support these features.

### Selectors

- `::scroll-button()`
- `::scroll-marker`
- `::scroll-marker-group`
- `:target-after`
- `:target-before`
- `:target-current`

### Data types

- `<overflow>` enumerated values

### Glossary terms and definitions

- Scroll container
- Scrollport

## Guides

- Learn: Overflowing content
    Learn what overflow is and how to manage it.
- Creating CSS carousels
    Create pure-CSS carousel UI features using scroll buttons, scroll markers, and generated columns.
- Creating a named scroll progress timeline animation
    The CSS scroll timeline `scroll-timeline-name` and `scroll-timeline-axis` properties, along with the `scroll-timeline` shorthand, create animations tied to the scroll offset of a scroll container.

## Related concepts

- `::column`
- `scrollbar-width` CSS property
- `scrollbar-color` CSS property
- `scrollbar-gutter` CSS property
- `scroll-behavior` CSS property
- `scroll-margin` CSS shorthand property
- `scroll-padding` CSS shorthand property
- `scroll-snap-align` CSS property
- `scroll-snap-stop` CSS property
- `scroll-snap-type` CSS property
- `text-overflow` CSS property
- `::-webkit-scrollbar` pseudo-element
- `scrollbar` ARIA role
- Element `scroll()` method
- Element `scrollBy()` method
- Element `scrollIntoView()` method
- Element `scrollTo()` method
- Element `scrollTop` property
- Element `scrollLeft` property
- Element `scrollWidth` property
- Element `scrollHeight` property
- Document `scroll` event
- Scroll container glossary term
- Ink overflow glossary term

## See also

- CSS scrollbars styling module
- CSS scroll snap module
- CSSOM view module
- How to debug scrollable overflow
