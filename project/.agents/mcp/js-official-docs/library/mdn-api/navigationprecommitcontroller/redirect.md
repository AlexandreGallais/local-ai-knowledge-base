---
title: "NavigationPrecommitController: redirect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigationprecommitcontroller/redirect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigationPrecommitController: redirect() method

The **`redirect()`** method of the
`NavigationPrecommitController` interface redirects the browser to a specified URL and specifies history behavior and any desired state information.

## Syntax

```js
redirect(url, options)
```

### Parameters

- `url`
    The URL to redirect to.
- `options` (optional)
    An options object, the properties of which can include:
    - `state` (optional)
        Contains any state information you want to pass along with the navigation; for example, for logging or tracking purposes. This can be represented by any value type. The state for the navigation can subsequently be retrieved via the `NavigationHistoryEntry.getState()` method of the resulting history entry.
    - `history` (optional)
        An enumerated value that specifies how this redirect should be added to the navigation history. It can take one of the following values:
        - `auto`
            The default value, which lets the browser decide how to handle it:
            - If the original navigation occurred as a result of a `Navigation.navigate()` call, the value will be whatever was specified in the `navigate()` call's `history` option.
            - Otherwise, the value used is usually `push`, but it will become `replace` if the redirect points to the same URL as the pre-navigation URL.
        - `push`
            Adds a new `NavigationHistoryEntry` to the navigation history, and clears any available forward navigation (that is, if the user previously navigated to other locations, then used the back button to return through the history before initiating the navigation that caused the redirect).
        - `replace`
            Replaces the `Navigation.currentEntry` with the resulting new `NavigationHistoryEntry`.

> **Note:**
> The `redirect()` method can convert the history behavior between `auto`, `push`, and `replace`, but it cannot turn a `traverse` navigation into a `push`/`replace` navigation and vice versa.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if:
    - The originating `NavigateEvent` was not intercepted.
    - The `NavigateEvent.navigationType` is not `push` or `replace`.
- `SyntaxError` `DOMException`
    Thrown if the specified `url` is invalid.
- `SecurityError` `DOMException`
    Thrown if the current document is unable to have its URL rewritten to the provided redirect `url`.

## Examples

See the main `NavigationPrecommitController` page for an example.

## See also

- Modern client-side routing: the Navigation API
