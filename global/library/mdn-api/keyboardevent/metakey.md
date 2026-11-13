---
title: "KeyboardEvent: metaKey property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/keyboardevent/metakey/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# KeyboardEvent: metaKey property

The **`KeyboardEvent.metaKey`** read-only property returning a
boolean value that indicates if the `Meta` key was pressed
(`true`) or not (`false`) when the event occurred. Some operating
systems may intercept the key so it is never detected.

> **Note:**
> On Macintosh keyboards, this is the `⌘ Command` key.

> **Note:**
> Before Firefox 118, the `⊞ Windows` key was handled
> as an "OS" key <example-value> than the "Meta" key. `KeyboardEvent.metaKey` was
> `false` when the `⊞ Windows` key was pressed.

When the `Meta` key <example-value> is pressed or released, this property is `true` for its `keydown` event and `false` for its `keyup` event, because both events fire _after_ the state change.

## Value

A boolean value.

## Examples

```html
<button>Click me with the meta key</button>

<p id="output"></p>
```

```js
document.querySelector("button").addEventListener("click", (e) => {
  document.querySelector("#output").textContent =
    `metaKey <example-value>? ${e.metaKey}`;
});
```

## See also

- `KeyboardEvent`
