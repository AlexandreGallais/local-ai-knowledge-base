---
title: "NavigationDestination: getState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationdestination/getstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationDestination: getState() method

The **`getState()`** method of the
`NavigationDestination` interface returns a clone of the developer-supplied state associated with the destination `NavigationHistoryEntry`, or navigation operation (e.g., `navigate()`) as appropriate.

## Syntax

```js
getState()
```

### Parameters

None.

### Return value

A value representing the state. This can be any type.

If no state is defined, it returns `undefined`.

### Exceptions

None.

## Examples

```js
navigation.addEventListener("navigate", (event) => {
  console.log(event.destination.getState());
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
- Methods that allow state to be updated — `Navigation.navigate()`, `Navigation.reload()`, and `Navigation.updateCurrentEntry()`
