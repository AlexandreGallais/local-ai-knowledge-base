---
title: "Navigation: navigate event"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigation/navigate_event/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigation: navigate event

The **`navigate`** event of the `Navigation` interface is fired when any type of navigation is initiated, allowing you to intercept as required.

## Syntax

Use the event name in `addEventListener()`:

```js
addEventListener("navigate", (event) => { })
```

Alternatively, assign to the event handler property of the interface:

```js
onnavigate = (event) => { }
```

## Event type

A `NavigateEvent`. Inherits from `Event`.

## Examples

### Handling a navigation using `intercept()`

```js
navigation.addEventListener("navigate", (event) => {
  // Exit early if this navigation shouldn't be intercepted,
  // e.g. if the navigation is cross-origin, or a download request
  if (shouldNotIntercept(event)) {
    return;
  }

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

> **Note:**
> Before the Navigation API was available, to do something similar you'd have to listen for all click events on links, run `event.preventDefault()`, perform the appropriate `History.pushState()` call, then set up the page view based on the new URL. And this wouldn't handle all navigations — only user-initiated link clicks.

### Handling scrolling using `scroll()`

In this example of intercepting a navigation, the `handler()` function starts by fetching and rendering some article content, but then fetches and renders some secondary content afterwards. It makes sense to scroll the page to the main article content as soon as it is available so the user can interact with it, rather than waiting until the secondary content is also rendered. To achieve this, we have added a `scroll()` call between the two.

```js
navigation.addEventListener("navigate", (event) => {
  if (shouldNotIntercept(navigateEvent)) {
    return;
  }
  const url = new URL(event.destination.url);

  if (url.pathname.startsWith("/articles/")) {
    event.intercept({
      async handler() {
        const articleContent = await getArticleContent(url.pathname);
        renderArticlePage(articleContent);

        event.scroll();

        const secondaryContent = await getSecondaryContent(url.pathname);
        addSecondaryContent(secondaryContent);
      },
    });
  }
});
```

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
