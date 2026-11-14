---
title: "Matches <span> (part 1 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/params.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## navigation-wait-until
- `waitUntil` "WaitUntilState" <"load"|"domcontentloaded"|"networkidle"|"commit">

When to consider operation succeeded, defaults to `load`. Events can be either:
* `'domcontentloaded'` - consider operation to be finished when the `DOMContentLoaded` event is fired.
* `'load'` - consider operation to be finished when the `load` event is fired.
* `'networkidle'` - **DISCOURAGED** consider operation to be finished when there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.
* `'commit'` - consider operation to be finished when network response is received and the document started loading.

## content-option-include-shadow
- `includeShadow` <[boolean]>

When true, contents of open shadow roots are included as declarative shadow DOM,
i.e. `<template shadowrootmode="open">` elements nested inside their host elements. Closed shadow roots are never included. Defaults to `false`.

## navigation-timeout
* langs: python, java, csharp
- `timeout` <[float]>

Maximum operation time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout.
The default value can be changed by using the
[`method: BrowserContext.setDefaultNavigationTimeout`],
[`method: BrowserContext.setDefaultTimeout`],
[`method: Page.setDefaultNavigationTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## navigation-timeout-js
* langs: js
- `timeout` <[float]>

Maximum operation time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `navigationTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultNavigationTimeout`],
[`method: BrowserContext.setDefaultTimeout`],
[`method: Page.setDefaultNavigationTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## wait-for-function-timeout
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default
value can be changed by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

## wait-for-function-timeout-js
* langs: js
- `timeout` <[float]>

Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`] methods.

## input-strict
- `strict` <[boolean]>

When true, the call requires selector to resolve to a single element. If given selector resolves to more
than one element, the call throws an exception.

## input-timeout
* langs: python, java, csharp
- `timeout` <[float]>

Maximum time in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout. The default value can be changed by
using the [`method: BrowserContext.setDefaultTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## input-timeout-js
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] or
[`method: Page.setDefaultTimeout`] methods.

## input-no-wait-after
* deprecated: This option will default to `true` in the future.
- `noWaitAfter` <[boolean]>

Actions that initiate navigations are waiting for these navigations to happen and for pages to start loading. You can
opt out of waiting via setting this flag. You would only need this option in the exceptional cases such as navigating
to inaccessible pages. Defaults to `false`.

## input-no-wait-after-removed
* deprecated: This option has no effect.
- `noWaitAfter` <[boolean]>

This option has no effect.

## input-force
- `force` <[boolean]>

Whether to bypass the actionability checks. Defaults to `false`.

## input-scroll
- `scroll` "ScrollMode" <"auto"|"none">

Controls whether Playwright scrolls the element into view before performing the action. Defaults to `"auto"`,
which scrolls the element into view when necessary, including scrolling nested scrollable containers. When set to
`"none"`, Playwright does not scroll the element and the action fails if the element is not already in the viewport.
This is useful to assert that an element is reachable by the user without additional scrolling.

## input-selector
- `selector` <[string]>

A selector to search for an element. If there are multiple elements satisfying the selector, the first will be used.

## input-source
- `source` <[string]>

A selector to search for an element to drag. If there are multiple elements satisfying the selector, the first will be used.

## input-target
- `target` <[string]>

A selector to search for an element to drop onto. If there are multiple elements satisfying the selector, the first will be used.

## input-position
- `position` "Position" <[Object]>
  - `x` <[float]>
  - `y` <[float]>

A point to use relative to the top-left corner of element padding box. If not specified, uses some visible point of the
element.

## input-mousemove-steps
- `steps` <[int]>

Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between Playwright's current cursor position and the provided destination. When set to 1, emits a single `mousemove` event at the destination location.

## input-drag-steps
- `steps` <[int]>

Defaults to 1. Sends `n` interpolated `mousemove` events to represent travel between the `mousedown` and `mouseup` of the drag. When set to 1, emits a single `mousemove` event at the destination location.

## input-modifiers
- `modifiers` "KeyboardModifier" <[Array]<"Alt"|"Control"|"ControlOrMeta"|"Meta"|"Shift">>

Modifier keys to press. Ensures that only these modifiers are pressed during the operation, and then restores current
modifiers back. If not specified, currently pressed modifiers are used. "ControlOrMeta" resolves to "Control" on Windows
and Linux and to "Meta" on macOS.

## input-button
- `button` "MouseButton" <"left"|"right"|"middle">

Defaults to `left`.

## input-files
- `files` "FilePayload" <[path]|[Array]<[path]>|[Object]|[Array]<[Object]>>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

## drop-payload
- `payload` "DropPayload" <[Object]>
  - `files` "FilePayload" ?<[path]|[Array]<[path]>|[Object]|[Array]<[Object]>>
    - `name` <[string]> File name
    - `mimeType` <[string]> File type
    - `buffer` <[Buffer]> File content
  - `data` ?<[Object]<[string], [string]>>

Data to drop onto the target. Provide `files` (file paths or in-memory buffers), `data`
(a mime-type → string map for clipboard-like content such as `text/plain`, `text/html`,
`text/uri-list`), or both.

## input-down-up-delay
- `delay` <[float]>

Time to wait between `mousedown` and `mouseup` in milliseconds. Defaults to 0.

## input-click-count
- `clickCount` <[int]>

defaults to 1. See [UIEvent.detail].

## input-trial
- `trial` <[boolean]>

When set, this method only performs the actionability checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it.

## input-trial-with-modifiers
- `trial` <[boolean]>

When set, this method only performs the actionability checks and skips the action. Defaults to `false`. Useful to wait until the element is ready for the action without performing it. Note that keyboard `modifiers` will be pressed regardless of `trial` to allow testing elements which are only visible when those keys are pressed.

## input-source-position
- `sourcePosition` "Position" <[Object]>
  * alias-csharp: SourcePosition
  - `x` <[float]>
  - `y` <[float]>

Clicks on the source element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.

## input-target-position
- `targetPosition` "Position" <[Object]>
  * alias-csharp: TargetPosition
  - `x` <[float]>
  - `y` <[float]>

Drops on the target element at this point relative to the top-left corner of the element's padding box. If not specified, some visible point of the element is used.

## input-checked
* langs:
  - alias-csharp: checkedState
- `checked` <[boolean]>

Whether to check or uncheck the checkbox.

## query-selector
- `selector` <[string]>

A selector to query for.

## find-selector
- `selector` <[string]>

A selector to use when resolving DOM element.

## find-selector-or-locator
- `selectorOrLocator` <[string]|[Locator]>

A selector or locator to use when resolving DOM element.

## wait-for-selector-state
- `state` "WaitForSelectorState" <"attached"|"detached"|"visible"|"hidden">

Defaults to `'visible'`. Can be either:
* `'attached'` - wait for element to be present in DOM.
* `'detached'` - wait for element to not be present in DOM.
* `'visible'` - wait for element to have non-empty bounding box and no `visibility:hidden`. Note that element without
  any content or with `display:none` has an empty bounding box and is not considered visible.
* `'hidden'` - wait for element to be either detached from DOM, or have an empty bounding box or `visibility:hidden`.
  This is opposite to the `'visible'` option.

## js-python-wait-for-function-polling
* langs: js, python
- `polling` <[float]|"raf">

If [`option: polling`] is `'raf'`, then [`param: expression`] is constantly executed in `requestAnimationFrame`
callback. If [`option: polling`] is a number, then it is treated as an interval in milliseconds at which the function
would be executed. Defaults to `raf`.

## csharp-java-wait-for-function-polling
* langs: csharp, java
- `pollingInterval` <[float]>

If specified, then it is treated as an interval in milliseconds at which the function would be executed. By default if the option is not specified [`param: expression`] is executed in `requestAnimationFrame` callback.

## browser-option-ignoredefaultargs
* langs: js, python
- `ignoreDefaultArgs` <[boolean]|[Array]<[string]>>

If `true`, Playwright does not pass its own configurations args and only uses the ones from [`option: args`]. If an
array is given, then filters out the given default arguments. Dangerous option; use with care. Defaults to `false`.

## csharp-java-browser-option-ignoredefaultargs
* langs: csharp, java
- `ignoreDefaultArgs` <[Array]<[string]>>

If `true`, Playwright does not pass its own configurations args and only uses the ones from [`option: args`].
Dangerous option; use with care.

## csharp-java-browser-option-ignorealldefaultargs
* langs: csharp, java
- `ignoreAllDefaultArgs` <[boolean]>

If `true`, Playwright does not pass its own configurations args and only uses the ones from [`option: args`].
Dangerous option; use with care. Defaults to `false`.

## browser-option-proxy
- `proxy` "Proxy" <[Object]>
  * alias-python: ProxySettings
  - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example
    `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP
    proxy.
  - `bypass` ?<[string]> Optional comma-separated domains to bypass proxy, for example `".com, chromium.org,
    .domain.com"`.
  - `username` ?<[string]> Optional username to use if HTTP proxy requires authentication.
  - `password` ?<[string]> Optional password to use if HTTP proxy requires authentication.

Network proxy settings.

## js-browser-option-env
* langs: js
- `env` <[Object]<[string], [string]|[undefined]>>

## csharp-java-browser-option-env
* langs: csharp, java
- `env` <[Object]<[string], [string]>>

Specify environment variables that will be visible to the browser. Defaults to `process.env`.

## python-browser-option-env
* langs: python
- `env` <[Object]<[string], [string]|[float]|[boolean]>>

Specify environment variables that will be visible to the browser. Defaults to `process.env`.

## js-python-context-option-storage-state
* langs: js, python
- `storageState` "StorageState" <[path]|[Object]>
  - `cookies` "StorageStateCookie" <[Array]<[Object]>> Cookies to set for context
    - `name` <[string]>
    - `value` <[string]>
    - `domain` <[string]> Domain and path are required. For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com"
    - `path` <[string]> Domain and path are required
    - `expires` <[float]> Unix time in seconds.
    - `httpOnly` <[boolean]>
    - `secure` <[boolean]>
    - `sameSite` "SameSiteAttribute" <"Strict"|"Lax"|"None"> sameSite flag
  - `origins` "OriginState" <[Array]<[Object]>>
    - `origin` <[string]>
    - `localStorage` "LocalStorageEntry" <[Array]<[Object]>> localStorage to set for context
      - `name` <[string]>
      - `value` <[string]>

Learn more about storage state and auth.

Populates context with given storage state. This option can be used to initialize context with logged-in information obtained via [`method: BrowserContext.storageState`].

## csharp-java-context-option-storage-state
* langs: csharp, java
- `storageState` <[string]>

Populates context with given storage state. This option can be used to initialize context with logged-in information
obtained via [`method: BrowserContext.storageState`].

## csharp-java-context-option-storage-state-path
* langs: csharp, java
- `storageStatePath` <[path]>

Populates context with given storage state. This option can be used to initialize context with logged-in information
obtained via [`method: BrowserContext.storageState`]. Path to the file with saved storage state.

## add-cookies-param
- `cookies` "Cookie" <[Array]<[Object]>>
  * alias-python: SetCookieParam
  - `name` <[string]>
  - `value` <[string]>
  - `url` ?<[string]> Either `url` or both `domain` and `path` are required. Optional.
  - `domain` ?<[string]> For the cookie to apply to all subdomains as well, prefix domain with a dot, like this: ".example.com". Either `url` or both `domain` and `path` are required. Optional.
  - `path` ?<[string]> Either `url` or both `domain` and `path` are required. Optional.
  - `expires` ?<[float]> Unix time in seconds. Optional.
  - `httpOnly` ?<[boolean]> Optional.
  - `secure` ?<[boolean]> Optional.
  - `sameSite` "SameSiteAttribute" ?<"Strict"|"Lax"|"None"> Optional.
  - `partitionKey` ?<[string]> For partitioned third-party cookies (aka CHIPS), the partition key. Optional.

## clear-cookies-option-name
- `name` <[string]|[RegExp]>

Only removes cookies with the given name.

## clear-cookies-option-domain
- `domain` <[string]|[RegExp]>

Only removes cookies with the given domain.

## clear-cookies-option-path
- `path` <[string]|[RegExp]>

Only removes cookies with the given path.

## cookies-param-urls
- `urls` ?<[string]|[Array]<[string]>>

Optional list of URLs.
