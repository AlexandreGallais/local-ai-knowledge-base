---
title: "Element: scrollsnapchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/scrollsnapchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: scrollsnapchange event

The **`scrollsnapchange`** event of the `Element` interface is fired on the scroll container at the end of a scrolling operation when a new scroll snap target has been selected, just before the corresponding `scrollend` event fires.

A scrolling operation ends when the user finishes scrolling within a scroll container — for example using a touch gesture or by dragging the mouse pointer on a scroll bar — and releases the gesture.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("scrollsnapchange", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onscrollsnapchange = (event) => { }
```

## Event type

A `SnapEvent`, which inherits from the generic `Event` type.

## Examples

### Basic usage

Let's say we have a `` element containing significant content that causes it to scroll:

```html
<main>
  <!-- Significant content -->
</main>
```

The `` element can be turned into a scroll container that snaps to its children when scrolled using a combination of the CSS `scroll-snap-type` property and other properties. For example:

```css
main {
  width: 250px;
  height: 450px;
  overflow: scroll;
  scroll-snap-type: block mandatory;
}
```

The following JavaScript snippet would cause the `scrollsnapchange` event to fire on the `` element when one of its children becomes a newly-selected snap target. In the handler function, we set a `selected` class on the child referenced by the `SnapEvent.snapTargetBlock` property, which could be used to style it to look like it has been selected (for example, with an animation) when the event fires.

```js
const scrollingElem = document.querySelector("main");

scrollingElem.addEventListener("scrollsnapchange", (event) => {
  event.snapTargetBlock.classList.add("selected");
});
```

## See also

- `scrollsnapchanging` event
- `scrollend` event
- `SnapEvent`
- CSS `scroll-snap-type` property
- CSS scroll snap module
- Using scroll snap events
- Scroll Snap Events on developer.chrome.com (2024)
