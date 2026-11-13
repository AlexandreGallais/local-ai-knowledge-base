---
title: "Element: scroll event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/scroll_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: scroll event

The **`scroll`** event fires when an element has been scrolled.
To detect when scrolling has completed, see the `scrollend` event of `Element`.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("scroll", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onscroll = (event) => { }
```

## Event type

A generic `Event`.

## Examples

The following examples show how to use the `scroll` event with an event listener and with the `onscroll` event handler property.
The `setTimeout()` method is used to throttle the event handler because `scroll` events can fire at a high rate.
For additional examples that use `requestAnimationFrame()`, see the `Document` `scroll` event page.

### Using `scroll` with an event listener

The following example shows how to use the `scroll` event to detect when the user is scrolling inside an element:

```html
<div id="scroll-box">
  <p>Scroll me!</p>
</div>
<p id="output">Waiting on scroll events...</p>
```

```css
#scroll-box {
  overflow: scroll;
  height: 100px;
  width: 100px;
  float: left;
}

#scroll-box p {
  height: 200px;
  width: 200px;
}

#output {
  text-align: center;
}
```

```js
const element = document.querySelector("div#scroll-box");
const output = document.querySelector("p#output");

element.addEventListener("scroll", (event) => {
  output.textContent = "Scroll event fired!";
  setTimeout(() => {
    output.textContent = "Waiting on scroll events...";
  }, 1000);
});
```

### Using `onscroll` event handler property

The following example shows how to use the `onscroll` event handler property to detect when the user is scrolling (but note that this replaces other event listeners added using `onscroll`, if any):

```html
<div id="scroll-box">
  <p>Scroll me!</p>
</div>
<p id="output">Waiting on scroll events...</p>
```

```css
#scroll-box {
  overflow: scroll;
  height: 100px;
  width: 100px;
  float: left;
}

#scroll-box p {
  height: 200px;
  width: 200px;
}

#output {
  text-align: center;
}
```

```js
const element = document.querySelector("div#scroll-box");
const output = document.querySelector("p#output");

element.onscroll = (event) => {
  output.textContent = "Element scroll event fired!";
  setTimeout(() => {
    output.textContent = "Waiting on scroll events...";
  }, 1000);
};
```

## See also

- Element `scrollend` event
- Document `scroll` event
- Document `scrollend` event
