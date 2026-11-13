---
title: "Element: ariaBusy property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/element/ariabusy/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Element: ariaBusy property

The **`ariaBusy`** property of the `Element` interface reflects the value of the `aria-busy` attribute, which indicates whether an element is being modified, as assistive technologies may want to wait until the modifications are complete before exposing them to the user.

## Value

A string with one of the following values:

- `"true"`
    The element is being updated.
- `"false"`
    There are no expected updates for the element.

## Examples

In this example the `aria-busy` attribute on the element with an ID of `clock` is set to "false". Using `ariaBusy` we update the value to "true".

```html
<div
  id="clock"
  role="timer"
  aria-live="polite"
  aria-atomic="true"
  aria-busy="false"></div>
```

```js
let el = document.getElementById("clock");
console.log(el.ariaBusy); // false
el.ariaBusy = "true";
console.log(el.ariaBusy); // true
```
