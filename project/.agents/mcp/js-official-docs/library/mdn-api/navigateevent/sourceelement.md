---
title: "NavigateEvent: sourceElement property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigateevent/sourceelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigateEvent: sourceElement property

The **`sourceElement`** read-only property of the
`NavigateEvent` interface returns an `Element` object representing the initiating element, in cases where the navigation was initiated by an element.

The initiating element can be:

- An HTML `` element (or SVG `` element).
- An `<area>` element.
- A submit button (`` or ``).
- A submitted `<form>` element.

## Value

An `Element` object representing the element that initiated the navigation, or `null` if the navigation was not initiated by an element.

## Examples

### Getting the `sourceElement` for an event

```js
navigation.addEventListener("navigate", (event) => {
  console.log(event.sourceElement);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
