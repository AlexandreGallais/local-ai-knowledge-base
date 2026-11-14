---
title: "CookieStore: change event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cookiestore/change_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CookieStore: change event

A `change` event is fired at a `CookieStore` object when a change is made to any cookie.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("change", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onchange = (event) => { }
```

## Event type

A `CookieChangeEvent`. Inherits from `Event`.

## Examples

To be informed when a cookie has changed, you can add a handler to the `cookieStore` instance using `addEventListener()`, like this:

```js
cookieStore.addEventListener("change", (event) => {
  console.log("1 change event");
});
```

Alternatively, you can use the `onchange` event handler property to establish a handler for the `change` event (but note that this replaces other event listeners added using `onchange`, if any):

```js
cookieStore.onchange = (event) => {
  console.log("1 change event");
};
```
