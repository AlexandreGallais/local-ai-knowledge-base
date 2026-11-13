---
title: "ExtendableCookieChangeEvent: deleted property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/extendablecookiechangeevent/deleted/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ExtendableCookieChangeEvent: deleted property

The **`deleted`** read-only property of the `ExtendableCookieChangeEvent` interface returns any cookies that have been deleted by the given `ExtendableCookieChangeEvent` instance.

## Value

An array of objects containing the deleted cookie(s). Each object contains the following properties:

- `name`
    A string containing the name of the cookie.
- `value`
    A string containing the value of the cookie.
- `domain`
    A string containing the domain of the cookie.
- `path`
    A string containing the path of the cookie.
- `expires`
    A timestamp, given as Unix time in milliseconds, containing the expiration date of the cookie.
- `secure`
    A `Boolean` indicating whether the cookie is used only in a secure context (HTTPS rather than HTTP).
- `sameSite`
    One of the following `SameSite` values:
    - `"strict"`
        Cookies will only be sent in a first-party context and not be sent with requests initiated by third-party websites.
    - `"lax"`
        Cookies are not sent on normal cross-site subrequests (for example to load images or frames into a third-party site), but are sent when a user is navigating within the origin site (i.e., when following a link).
    - `"none"`
        Cookies will be sent in all contexts.

- `partitioned`
    A boolean indicating whether the cookie is a partitioned cookie (`true`) or not (`false`). See Cookies Having Independent Partitioned State (CHIPS) for more information.

## Examples

In this example when the cookie is deleted the event listener logs the first item in the `deleted` property to the console. It contains an object representing the cookie that has just been deleted.

```js
self.addEventListener("cookiechange", (event) => {
  console.log(event.deleted[0]);
});
```
