---
title: "NavigationHistoryEntry: getState() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationhistoryentry/getstate/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationHistoryEntry: getState() method

The **`getState()`** method of the `NavigationHistoryEntry` interface returns a clone of the developer-supplied state associated with this history entry.

## Syntax

```js
getState()
```

### Parameters

None.

### Return value

A value representing the state. This can be any structured-cloneable data type.

If no state is defined or if current document is not fully active, it returns `undefined`.

### Exceptions

None.

## Examples

```js
async function handleReload() {
  // Update existing state via reload()
  await navigation.reload({
    state: { ...navigation.currentEntry.getState(), newState: 3 },
  });

  // Print current state to the console
  const current = navigation.currentEntry;
  console.log(current.getState());
}
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
- Methods that allow state to be updated — `Navigation.navigate()`, `Navigation.reload()`, and `Navigation.updateCurrentEntry()`
