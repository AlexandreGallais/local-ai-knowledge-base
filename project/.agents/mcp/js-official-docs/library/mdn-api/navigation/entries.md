---
title: "Navigation: entries() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/entries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: entries() method

The **`entries()`** method of the
`Navigation` interface returns an array of `NavigationHistoryEntry` objects representing all existing history entries.

## Syntax

```js
entries()
```

### Parameters

None.

### Return value

An array of `NavigationHistoryEntry` objects.

### Exceptions

None.

## Examples

### Return the number of entries in the history

```js
let numOfEntries = navigation.entries().length - 1;
```

### A smart back button

A page-supplied "back" button can take you back, even after reload, by inspecting the previous history entries:

```js
backButtonEl.addEventListener("click", () => {
  if (
    navigation.entries()[navigation.currentEntry.index - 1]?.url ===
    "/product-listing"
  ) {
    navigation.back();
  } else {
    // If the user arrived here in some other way
    // e.g. by typing the URL directly:
    navigation.navigate("/product-listing", { history: "replace" });
  }
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
