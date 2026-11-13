---
title: "NavigateEvent: NavigateEvent() constructor"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigateevent/navigateevent/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigateEvent: NavigateEvent() constructor

The **`NavigateEvent()`** constructor creates a new `NavigateEvent` object instance.

## Syntax

```js
new NavigateEvent(type, init)
```

### Parameters

- `type`
    A string representing the type of event.
- `init`
    An object that, _in addition to the properties defined in `Event()`_, has the following properties:
    - `canIntercept` (optional)
        A boolean defining whether the navigation can be intercepted or not (e.g., you can't intercept a cross-origin navigation). Defaults to `false`.
    - `destination`
        A `NavigationDestination` object representing the location being navigated to.
    - `downloadRequest` (optional)
        The filename of the file requested for download, in the case of a download navigation (e.g., an `` or `<area>` element with a `download` attribute). Defaults to `null`.
    - `formData` (optional)
        The `FormData` object representing the submitted data in the case of a `POST` form submission. Defaults to `null`.
    - `hashChange` (optional)
        A boolean defining if the navigation is a fragment navigation (i.e., to a fragment identifier in the same document). Defaults to `false`.
    - `hasUAVisualTransition` (optional)
        A boolean defining whether the user agent has performed a visual transition for this navigation before dispatching this event. Defaults to `false`.
    - `info` (optional)
        The `info` data value passed by the initiating navigation operation (e.g., `Navigation.back()`, or `Navigation.navigate()`).
    - `navigationType` (optional)
        The type of the navigation. Possible values — `push`, `reload`, `replace`, and `traverse`. Defaults to `push`.
    - `signal`
        An `AbortSignal`, which will become aborted if the navigation is canceled (e.g., by the user pressing the browser's "Stop" button, or another navigation starting and thus canceling the ongoing one).
    - `sourceElement` (optional)
        An `Element` object representing the initiating element in cases where the navigation was initiated by an element, or `null` if the navigation was not initiated by an element. Defaults to `null`.
    - `userInitiated` (optional)
        A boolean defining whether the navigation was initiated by the user (e.g., by clicking a link, submitting a form, or pressing the browser's "Back"/"Forward" buttons). Defaults to `false`.

### Return value

A new `NavigateEvent` object.

## Examples

A developer would not use this constructor manually. A new `NavigateEvent` object is constructed when a handler is invoked as a result of the `navigate` event firing.

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

## See also

- Modern client-side routing: the Navigation API
- Navigation API explainer
