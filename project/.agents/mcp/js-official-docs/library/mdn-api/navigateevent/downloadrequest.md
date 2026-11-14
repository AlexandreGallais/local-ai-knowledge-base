---
title: "NavigateEvent: downloadRequest property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigateevent/downloadrequest/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigateEvent: downloadRequest property

The **`downloadRequest`** read-only property of the
`NavigateEvent` interface returns the filename of the file requested for download, in the case of a download navigation (e.g., an `` or `<area>` element with a `download` attribute), or `null` otherwise.

## Value

A string containing the filename of the file requested for download, or `null`.

## Examples

```js
navigation.addEventListener("navigate", (event) => {
  // Some navigations, e.g. cross-origin navigations, we
  // cannot intercept. Let the browser handle those normally.
  if (!event.canIntercept) {
    return;
  }

  // Don't intercept fragment navigations or downloads.
  if (event.hashChange || event.downloadRequest !== null) {
    return;
  }

  event.intercept({
    handler() {
      if (event.formData) {
        processFormDataAndUpdateUI(event.formData, event.signal);
      } else {
        doSinglePageAppNav(event.destination, event.signal);
      }
    },
  });
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
