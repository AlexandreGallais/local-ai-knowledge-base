---
title: "NavigationPrecommitController: addHandler() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationprecommitcontroller/addhandler/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationPrecommitController: addHandler() method

The **`addHandler()`** method of the `NavigationPrecommitController` interface allows you to dynamically add a handler callback function in precommit code, which will then be run after the navigation has committed.

This is useful when the navigation workflow depends on information that is not know until precommit code has started running.
If the precommit and (post-commit) handler are independent, the handler can be specified in the in the `options.handler` argument passed to `NavigateEvent.intercept()`.

## Syntax

```js
addHandler(handler);
```

### Parameters

- `handler`
    A callback function that defines the post-commit navigation handling behavior should be; it returns a promise.

    The handler callback is invoked as though it was passed to the `NavigateEvent.intercept()` method, and will run after the `currentEntry` property has been updated.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if:
    - The originating `NavigateEvent` was not intercepted or has been canceled.
    - The `Document` is not fully active.
- `SecurityError` `DOMException`
    Thrown if the event `isTrusted` attribute is `false`.

## Examples

For more examples see `NavigationPrecommitController`.

### Basic usage

This example shows a `precommitHandler` implementation that fetches data for a page and uses `addHandler()` to add different handlers based on the page type (the implementations of the `fetchConfig`, `setupVideoPlayer()` and `setupArticleView()` are not given).

```js
navigation.addEventListener("navigate", (event) => {
  event.intercept({
    async precommitHandler(controller) {
      const pageData = await fetchConfig();
      if (pageData.type === "video") {
        controller.addHandler(() => setupVideoPlayer());
      } else {
        controller.addHandler(() => setupArticleView());
      }
    },
  });
});
```

## See also

- Modern client-side routing: the Navigation API
