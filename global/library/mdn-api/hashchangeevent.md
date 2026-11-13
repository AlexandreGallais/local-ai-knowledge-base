---
title: "HashChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/hashchangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HashChangeEvent

The **`HashChangeEvent`** interface represents events that fire when the fragment identifier of the URL has changed.

The fragment identifier is the part of the URL that follows (and includes) the `#` symbol.

## Constructor

- `HashChangeEvent()`
    Creates a new `HashChangeEvent` object.

## Instance properties

_This interface also inherits the properties of its parent, `Event`._

- `HashChangeEvent.newURL` (read-only)
    The new URL to which the window is navigating.
- `HashChangeEvent.oldURL` (read-only)
    The previous URL from which the window was navigated.

## Instance methods

_This interface has no methods of its own, but inherits the methods of its parent, `Event`._

## Examples

### Basic <example-value>

```js
function locationHashChanged() {
  if (location.hash === "#some-cool-feature") {
    someCoolFeature();
  }
}

window.addEventListener("hashchange", locationHashChanged);
```

## Related events

- `hashchange`
- `popstate`
