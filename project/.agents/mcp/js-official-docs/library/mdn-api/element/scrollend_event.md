---
title: "Element: scrollend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/scrollend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: scrollend event

The **`scrollend`** event fires when element scrolling has completed.
Scrolling is considered completed when the scroll position has no more pending updates and the user has completed their gesture.

Scroll position updates include smooth or instant mouse wheel scrolling, keyboard scrolling, scroll-snap events, or other APIs and gestures which cause the scroll position to update.
User gestures like touch panning or trackpad scrolling aren't complete until pointers or keys have released.
If the scroll position did not change, then no scrollend event fires.

For detecting when scrolling inside a Document is complete, see the `scrollend` event of `Document`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("scrollend", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onscrollend = (event) => { }
```

## Event type

A generic `Event`.

## Example

### Using `scrollend` with an event listener

The following example shows how to use the `scrollend` event to detect when the user has stopped scrolling:

```css
#scroll-box {
  height: 100px;
  width: 100px;
  float: left;
  overflow: scroll;
  outline: 4px dotted;
  margin: 4px;
}

#scroll-box-title {
  position: fixed;
  top: 5px;
  left: 5px;
  transform: translateX(0);
}

#large-element {
  height: 200px;
  width: 200px;
}

#output {
  text-align: center;
}
```

```html
<div id="scroll-box">
  <p id="scroll-box-title">Scroll me!</p>
  <p id="large-element"></p>
</div>
<p id="output">Waiting on scroll events...</p>
```

```js
const element = document.querySelector("div#scroll-box");
const output = document.querySelector("p#output");

element.addEventListener("scroll", (event) => {
  output.textContent = "scroll event fired, waiting for scrollend...";
});

element.addEventListener("scrollend", (event) => {
  output.textContent = "scrollend event fired!";
});
```

### Using `onscrollend` event handler property

The following example shows how to use the `onscrollend` event handler property to detect when the user has stopped scrolling (but note that this replaces other event listeners added using `onscroll` and `onscrollend`, if any):

```css
#scroll-box {
  height: 100px;
  width: 100px;
  float: left;
  overflow: scroll;
  outline: 4px dotted;
  margin: 4px;
}

#scroll-box-title {
  position: fixed;
  top: 5px;
  left: 5px;
  transform: translateX(0);
}

#large-element {
  height: 200px;
  width: 200px;
}

#output {
  text-align: center;
}
```

```html
<div id="scroll-box">
  <p id="scroll-box-title">Scroll me!</p>
  <p id="large-element"></p>
</div>
<p id="output">Waiting on scroll events...</p>
```

```js
const element = document.querySelector("div#scroll-box");
const output = document.querySelector("p#output");

element.onscroll = (event) => {
  output.textContent = "Element scroll event fired, waiting for scrollend...";
};

element.onscrollend = (event) => {
  output.textContent = "Element scrollend event fired!";
};
```

## See also

- Element `scroll` event
- Document `scrollend` event
- Document `scroll` event
