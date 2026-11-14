---
title: "NavigationHistoryEntry: url property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationhistoryentry/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationHistoryEntry: url property

The **`url`** read-only property of the `NavigationHistoryEntry` interface returns the absolute URL of this history entry. If the entry corresponds to a different Document than the current one (like `sameDocument` property is `false`), and that Document was fetched with a `Referrer-Policy` header set to `no-referrer` or `origin`, the property returns `null`. If current document is not fully active, it returns an empty string.

## Value

A string representing the URL or `null`.

## Examples

```js
const current = navigation.currentEntry;
console.log(current.url);
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
