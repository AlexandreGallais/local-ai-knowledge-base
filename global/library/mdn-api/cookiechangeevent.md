---
title: "CookieChangeEvent"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cookiechangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CookieChangeEvent

The **`CookieChangeEvent`** interface of the `Cookie Store API` is the event type of the `change` event fired at a `CookieStore` when any cookies are created or deleted.

> **Note:**
> A cookie that is replaced due to the insertion of another cookie with the same name, domain, and path, is ignored and does not trigger a change event.

## Constructor

- `CookieChangeEvent()`
    Creates a new `CookieChangeEvent`.

## Instance properties

_This interface also inherits properties from `Event`._

- `CookieChangeEvent.changed` (read-only)
    An array listing all newly-created cookies. Note that this will exclude cookies which were created with an expiry date in the past, as these cookies are immediately deleted.
- `CookieChangeEvent.deleted` (read-only)
    An array listing all cookies which were removed, either because they expired or because they were explicitly deleted. Note that this will include cookies which were created with an expiry date in the past.

## Instance methods

_This interface also inherits methods from `Event`._

## Examples

In this example when the cookie is set, the event listener logs the event to the console. This is a `CookieChangeEvent` object with the `changed` property containing an object representing the cookie that has just been set.

```js
cookieStore.addEventListener("change", (event) => {
  console.log(event);
});

const oneDay = 24 * 60 * 60 * 1000;
cookieStore.set({
  name: "cookie1",
  value: "cookie1-value",
  expires: Date.now() + oneDay,
  domain: "example.com",
});
```
