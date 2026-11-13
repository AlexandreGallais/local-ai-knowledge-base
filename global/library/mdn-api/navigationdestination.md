---
title: "NavigationDestination"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationdestination/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationDestination

The **`NavigationDestination`** interface of the `Navigation API` represents the destination being navigated to in the current navigation.

It is accessed via the `NavigateEvent.destination` property.

## Instance properties

- `id` (read-only)
    Returns the `id` value of the destination `NavigationHistoryEntry` if the `NavigateEvent.navigationType` is `traverse`, or an empty string otherwise.
- `index` (read-only)
    Returns the `index` value of the destination `NavigationHistoryEntry` if the `NavigateEvent.navigationType` is `traverse`, or `-1` otherwise.
- `key` (read-only)
    Returns the `key` value of the destination `NavigationHistoryEntry` if the `NavigateEvent.navigationType` is `traverse`, or an empty string otherwise.
- `sameDocument` (read-only)
    Returns `true` if the navigation is to the same `document` as the current `Document` value, or `false` otherwise.
- `url` (read-only)
    Returns the URL being navigated to.

## Instance methods

- `getState()`
    Returns a clone of the available state associated with the destination `NavigationHistoryEntry`, or navigation operation (e.g., `navigate()`) as appropriate.

## Examples

```js
navigation.addEventListener("navigate", (event) => {
  // Exit early if this navigation shouldn't be intercepted,
  // e.g. if the navigation is cross-origin, or a download request
  if (shouldNotIntercept(event)) {
    return;
  }

  // Returns a URL() object constructed from the
  // NavigationDestination.url value
  const url = new URL(event.destination.url);

  if (url.pathname.startsWith("/articles/")) {
    event.intercept({
      async handler() {
        // The URL has already changed, so show a placeholder while
        // fetching the new content, such as a spinner or loading page
        renderArticlePagePlaceholder();

        // Fetch the new content and display when ready
        const articleContent = await getArticleContent(url.pathname);
        renderArticlePage(articleContent);
      },
    });
  }
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
- Navigation API live demo (view demo source)
