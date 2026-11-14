---
title: "Document: scrollend event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/scrollend_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: scrollend event

The **`scrollend`** event fires when the document view has completed scrolling.
Scrolling is considered completed when the scroll position has no more pending updates and the user has completed their gesture.

Scroll position updates include smooth or instant mouse wheel scrolling, keyboard scrolling, scroll-snap events, or other APIs and gestures which cause the scroll position to update.
User gestures like touch panning or trackpad scrolling aren't complete until pointers or keys have released.
If the scroll position did not change, then no scrollend event fires.

For detecting when scrolling inside an element is complete, see the `scrollend` event of `Element`.

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

## Examples

### Using Document `scrollend` with an event listener

The following example shows how to use the `scrollend` event with an event listener to detect when the user has stopped scrolling the document.
In the example, there is content in the embedded iframe that is taller and wider than the iframe itself, so scrolling within the iframe in both directions is possible.
When the user stops scrolling, the `scrollend` event fires:

```css
* {
  margin: 10px;
}

.box-wrapper {
  width: 900px;
  border: 4px dotted;
}

.box {
  height: 100px;
  width: 100px;
  display: block;
  border: 4px dotted;
  border-radius: 10px;
}

#output {
  text-align: center;
  font-size: 1.2em;
  position: sticky;
  bottom: 0;
}
```

```html
<div class="box-wrapper">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
<p id="output">Waiting on scroll events...</p>
```

```js
const output = document.querySelector("p#output");

document.addEventListener("scroll", (event) => {
  output.textContent = "Document scroll event fired!";
});

document.addEventListener("scrollend", (event) => {
  output.textContent = "Document scrollend event fired!";
});
```

### Using `onscrollend` event handler property

The following example shows how to use the `scrollend` event handler property to detect when the user has stopped scrolling the document.
In the example, there is content in the embedded iframe that is taller and wider than the iframe itself, so scrolling within the iframe in both directions is possible.
This builds on the first example, but uses `document.onscrollend` instead of an event listener (but note that this replaces other event listeners added using `onscroll` and `onscrollend`, if any):

```css
* {
  margin: 10px;
}

.box-wrapper {
  width: 900px;
  border: 4px dotted;
}

.box {
  height: 100px;
  width: 100px;
  display: block;
  border: 4px dotted;
  border-radius: 10px;
}

#output {
  text-align: center;
  font-size: 1.2em;
  position: sticky;
  bottom: 0;
}
```

```html
<div class="box-wrapper">
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
  <div class="box"></div>
</div>
<p id="output">Waiting on scroll events...</p>
```

```js
document.onscroll = (event) => {
  output.textContent = "Document scroll event fired!";
};

document.onscrollend = (event) => {
  output.textContent = "Document scrollend event fired!";
};
```

## See also

- Document `scroll` event
- Element `scrollend` event
- Element `scroll` event
