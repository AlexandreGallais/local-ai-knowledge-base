---
title: "NavigationCurrentEntryChangeEvent: NavigationCurrentEntryChangeEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationcurrententrychangeevent/navigationcurrententrychangeevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationCurrentEntryChangeEvent: NavigationCurrentEntryChangeEvent() constructor

The **`NavigationCurrentEntryChangeEvent()`** constructor creates a new `NavigationCurrentEntryChangeEvent` object.

## Syntax

```js
new NavigationCurrentEntryChangeEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event.
- `init`
    An object that, _in addition to the properties defined in `Event()`_, has the following properties:
    - `from`
        A `NavigationHistoryEntry` object representing the location being navigated to.
    - `navigationType` (optional)
        The type of the navigation that resulted in the change. Possible values are `push`, `reload`, `replace`, and `traverse`. Defaults to `null`.

### Return value

A new `NavigationCurrentEntryChangeEvent` object.

## Examples

A developer would not use this constructor manually. A new `NavigationCurrentEntryChangeEvent` object is constructed when a handler is invoked as a result of the `currententrychange` event firing.

```js
navigation.addEventListener("currententrychange", (event) => {
  console.log(event.navigationType);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
