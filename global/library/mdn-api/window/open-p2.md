---
title: "Window: open() method (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/open/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: open() method (part 2 of 2)

## Accessibility concerns

### Avoid resorting to window.open()

It is preferable to avoid resorting to `window.open()`, for several reasons:

- Modern browsers offer a popup-blocking feature.
- Modern browsers offer tab-browsing, and tab-capable browser users prefer opening new tabs to opening new windows in most situations.
- Users may use browser built-in features or extensions to choose whether to open a link in a new window, in the same window, in a new tab, the same tab, or in the background. Forcing the opening to happen in a specific way, using `window.open()`, will confuse them and disregard their habits.
- Popups don't have a menu toolbar, whereas new tabs use the user interface of the browser window; therefore, many users prefer tab-browsing because the interface remains stable.

### Never use window.open() inline in HTML

Avoid `` or ``.

These bogus `href` values cause unexpected behavior when copying/dragging links, opening links in a new tab/window, bookmarking, or when JavaScript is loading, errors, or is disabled. They also convey incorrect semantics to assistive technologies, like screen readers.

If necessary, use a `` element instead. In general, _you should only use a link for navigation to a real URL_.

### Always identify links leading to a secondary window

Identify links that will open new windows in a way that helps navigation for users.

```html
<a target="WikipediaWindow" href="https://www.wikipedia.org">
  Wikipedia (opens in new tab)
</a>
```

The purpose is to warn users of context changes to minimize confusion on the user's part: changing the current window or popping up new windows can be very disorienting to users (in the case of a popup, no toolbar provides a "Previous" button to get back to the previous window).

When extreme changes in context are explicitly identified before they occur, then the users can determine if they wish to proceed or so they can be prepared for the change: not only they will not be confused or feel disoriented, but more experienced users can better decide how to open such links (in a new window or not, in the same window, in a new tab or not, in "background" or not).

- WebAIM: Links and Hypertext - Hypertext Links
- MDN / Understanding WCAG, Guideline 3.2
- G200: Opening new windows and tabs from a link only when necessary
- G201: Giving users advanced warning when opening a new window

## See also

- `target` attribute documentation:
  - ``
  - `<form>`
- `window.close()`
- `window.closed`
- `window.focus()`
- `window.opener`
- `rel="opener"` and `rel="noopener"`
- Same-origin policy
