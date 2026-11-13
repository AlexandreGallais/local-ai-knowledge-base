---
title: "Document: scrollsnapchange event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/document/scrollsnapchange_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Document: scrollsnapchange event

The **`scrollsnapchange`** event of the `Document` interface is fired on the document scroll container at the end of a scrolling operation when a new scroll snap target is selected.

This event works in much the same way as the `Element` interface's `scrollsnapchange` event, except that the overall HTML document has to be set as the scroll snap container (i.e., `scroll-snap-type` is set on the `<html>` element).

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

The `` element can be turned into a scroll container using a combination of CSS properties, for example:

```css
main {
  width: 250px;
  height: 450px;
  overflow: scroll;
}
```

We can then implement scroll snapping behavior on the scrolling content by specifying the `scroll-snap-type` property on the `<html>` element:

```css
html {
  scroll-snap-type: block mandatory;
}
```

The following JavaScript snippet would cause the `scrollsnapchange` event to fire on the HTML document when a child of the `` element becomes a newly-selected snap target. In the handler function, we set a `selected` class on the child referenced by the `SnapEvent.snapTargetBlock`, which could be used to style it to look like it has been selected (for example, with an animation) when the event fires.

```js
document.addEventListener("scrollsnapchange", (event) => {
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
