---
title: "NavigateEvent: info property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigateevent/info/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigateEvent: info property

The **`info`** read-only property of the
`NavigateEvent` interface returns the `info` data value passed by the initiating navigation operation (e.g., `Navigation.back()`, or `Navigation.navigate()`), or `undefined` if no `info` data was passed.

## Value

The `info` value passed by the initiating navigation operation, or `undefined` if none was passed.

## Examples

One example of how `info` might be used is to trigger different single-page navigation renderings depending on how a certain route was reached. For example, consider a photo gallery app, where you can reach the same photo URL and state via various routes. You might want to use a different animation to show the photo for each route.

```js
navigation.addEventListener("navigate", (event) => {
  if (isPhotoNavigation(event)) {
    event.intercept({
      async handler() {
        switch (event.info?.via) {
          case "go-left": {
            await animateLeft();
            break;
          }
          case "go-right": {
            await animateRight();
            break;
          }
          case "gallery": {
            await animateZoomFromThumbnail(event.info.thumbnail);
            break;
          }
        }

        // TODO: actually load the photo.
      },
    });
  }
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
- Methods that allow info to be passed — `Navigation.back()`, `Navigation.forward()`, `Navigation.navigate()`, `Navigation.reload()`, and `Navigation.traverseTo()`
