---
title: "NavigateEvent: userInitiated property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigateevent/userinitiated/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigateEvent: userInitiated property

The **`userInitiated`** read-only property of the
`NavigateEvent` interface returns `true` if the navigation was initiated by the user (e.g., by clicking a link, submitting a form, or pressing the browser's "Back"/"Forward" buttons), or `false` otherwise.

> **Note:**
> The table found at Appendix: types of navigations shows which navigation types are user-initiated.

## Value

A boolean value—`true` if the navigation is user-initiated, `false` if not.

## Examples

### Getting `userInitiated` for an event

```js
navigation.addEventListener("navigate", (event) => {
  console.log(event.userInitiated);
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
