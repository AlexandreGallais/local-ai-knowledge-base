---
title: "Matches <span> (part 4 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/params.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Matches <span> (part 4 of 6)

## js-wait-for-navigation-url
* langs: js
- `url` <[string]|[RegExp]|[URLPattern]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, URL pattern, or predicate receiving [URL] to match while waiting for the navigation. Note that if
the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly
equal to the string.

## python-csharp-java-wait-for-navigation-url
* langs: python, csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, or predicate receiving [URL] to match while waiting for the navigation. Note that if
the parameter is a string without wildcard characters, the method will wait for navigation to URL that is exactly
equal to the string.

## wait-for-event-event
* langs: js, python, java
- `event` <[string]>

Event name, same one typically passed into `*.on(event)`.

## wait-for-load-state-state
- `state` "LoadState" ?<"load"|"domcontentloaded"|"networkidle">

Optional load state to wait for, defaults to `load`. If the state has been already reached while loading current document, the
method resolves immediately. Can be one of:
  * `'load'` - wait for the `load` event to be fired.
  * `'domcontentloaded'` - wait for the `DOMContentLoaded` event to be fired.
  * `'networkidle'` - **DISCOURAGED** wait until there are no network connections for at least `500` ms. Don't use this method for testing, rely on web assertions to assess readiness instead.

## java-wait-for-event-callback
* langs: java
- `callback` <[Runnable]>

Callback that performs the action triggering the event.

## csharp-wait-for-event-action
* langs: csharp
- `action` <[Func<Task>]>

Action that triggers the event.

## python-select-options-element
* langs: python
- `element` ?<[ElementHandle]|[Array]<[ElementHandle]>>

Option elements to select. Optional.

## python-select-options-index
* langs: python
- `index` ?<[int]|[Array]<[int]>>

Options to select by index. Optional.

## python-select-options-value
* langs: python
- `value` ?<[string]|[Array]<[string]>>

Options to select by value. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise
only the first option matching one of the passed options is selected. Optional.

## python-select-options-label
* langs: python
- `label` ?<[string]|[Array]<[string]>>

Options to select by label. If the `<select>` has the `multiple` attribute, all given options are selected, otherwise
only the first option matching one of the passed options is selected. Optional.

## wait-for-event-predicate
- `predicate` <[function]>

Receives the event data and resolves to truthy value when the waiting should resolve.

## wait-for-event-timeout
* langs: csharp, java, python
- `timeout` <[float]>

Maximum time to wait for in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.
The default value can be changed by using the [`method: BrowserContext.setDefaultTimeout`].

## wait-for-event-signal
* langs: js
* since: v1.62
- `signal` <[AbortSignal]>

Allows to cancel the waiting using an `AbortSignal`. If the signal is aborted, the waiting will be aborted and the operation will throw an error.
Note that providing a signal does not disable the default timeout, which can be changed using [`method: BrowserContext.setDefaultTimeout`]; pass `timeout: 0` to disable the timeout entirely.

## input-signal
* langs: js
* since: v1.62
- `signal` <[AbortSignal]>

Allows to cancel the operation using an `AbortSignal`. If the signal is aborted, the operation will be aborted and throw an error.
Note that providing a signal does not disable the default timeout, which can be changed using [`method: BrowserContext.setDefaultTimeout`] or [`method: Page.setDefaultTimeout`]; pass `timeout: 0` to disable the timeout entirely.

## android-timeout
* langs: js
- `timeout` <[float]>

Maximum time in milliseconds, defaults to 30 seconds, pass `0` to disable timeout. The default value can be changed by
using the [`method: AndroidDevice.setDefaultTimeout`] method.

## js-assertions-timeout
* langs: js
- `timeout` <[float]>

Time to retry the assertion for in milliseconds. Defaults to `timeout` in `TestConfig.expect`.

## js-assertions-signal
* langs: js
* since: v1.62
- `signal` <[AbortSignal]>

An optional `AbortSignal` that
can cancel the assertion. Aborting the signal fails the assertion like a timeout: if the signal
is aborted while the assertion is retrying, or is already aborted before the assertion starts,
the assertion fails without retrying further.

## csharp-java-python-assertions-timeout
* langs: java, python, csharp
- `timeout` <[float]>

Time to retry the assertion for in milliseconds. Defaults to `5000`.

## assertions-ignore-case
- `ignoreCase` <[boolean]>

Whether to perform case-insensitive match. [`option: ignoreCase`] option takes precedence over the corresponding regular expression flag if specified.

## assertions-max-diff-pixels
* langs: js
- `maxDiffPixels` <[int]>

An acceptable amount of pixels that could be different. Default is configurable with `TestConfig.expect`. Note that [`option: threshold`] defines which pixels are considered different.

## assertions-max-diff-pixel-ratio
* langs: js
- `maxDiffPixelRatio` <[float]>

An acceptable ratio of pixels that are different to the total amount of pixels, between `0` and `1`. Default is configurable with `TestConfig.expect`. Note that [`option: threshold`] defines which pixels are considered different.

## assertions-threshold
* langs: js
- `threshold` <[float]>

An acceptable perceived color difference in the YIQ color space
between the same pixel in compared images, between zero (strict) and one (lax), default is configurable with
`TestConfig.expect`. Defaults to `0.2`.

## shared-context-params-list-v1.8
- %%-context-option-acceptdownloads-%%
- %%-context-option-ignorehttpserrors-%%
- %%-context-option-bypasscsp-%%
- %%-context-option-baseURL-%%
- %%-context-option-viewport-%%
- %%-csharp-context-option-viewport-%%
- %%-python-context-option-viewport-%%
- %%-context-option-screen-%%
- %%-python-context-option-no-viewport-%%
- %%-context-option-useragent-%%
- %%-context-option-devicescalefactor-%%
- %%-context-option-ismobile-%%
- %%-context-option-hastouch-%%
- %%-context-option-javascriptenabled-%%
- %%-context-option-timezoneid-%%
- %%-context-option-geolocation-%%
- %%-context-option-locale-%%
- %%-context-option-permissions-%%
- %%-context-option-extrahttpheaders-%%
- %%-context-option-offline-%%
- %%-context-option-httpcredentials-%%
- %%-context-option-colorscheme-%%
- %%-context-option-colorscheme-csharp-python-%%
- %%-context-option-reducedMotion-%%
- %%-context-option-reducedMotion-csharp-python-%%
- %%-context-option-forcedColors-%%
- %%-context-option-forcedColors-csharp-python-%%
- %%-context-option-contrast-%%
- %%-context-option-contrast-csharp-python-%%
- %%-context-option-logger-%%
- %%-context-option-recordhar-%%
- %%-context-option-recordhar-path-%%
- %%-context-option-recordhar-omit-content-%%
- %%-context-option-recordhar-content-%%
- %%-context-option-recordhar-mode-%%
- %%-context-option-recordhar-url-filter-%%
- %%-context-option-recordvideo-%%
- %%-context-option-recordvideo-dir-%%
- %%-context-option-recordvideo-size-%%
- %%-context-option-strict-%%
- %%-context-option-service-worker-policy-%%

## browser-option-args
- `args` <[Array]<[string]>>

:::warning
Use custom browser args at your own risk, as some of them may break Playwright functionality.
:::

Additional arguments to pass to the browser instance. The list of Chromium flags can be found
here.

## browser-option-channel
- `channel` <[string]>

Browser distribution channel.

Use "chromium" to opt in to new headless mode.

Use "chrome", "chrome-beta", "chrome-dev", "chrome-canary", "msedge", "msedge-beta", "msedge-dev", or "msedge-canary" to use branded Google Chrome and Microsoft Edge.

## browser-option-chromiumsandbox
- `chromiumSandbox` <[boolean]>

Enable Chromium sandboxing. Defaults to `false`.

## browser-option-downloadspath
- `downloadsPath` <[path]>

If specified, accepted downloads are downloaded into this directory. Otherwise, temporary directory is created and is
deleted when browser is closed. In either case, the downloads are deleted when the browser context they were created in
is closed.

## browser-option-executablepath
- `executablePath` <[path]>

Path to a browser executable to run instead of the bundled one. If [`option: executablePath`] is a relative path, then
it is resolved relative to the current working directory. Note that Playwright only works with the bundled Chromium,
Firefox or WebKit, use at your own risk.

## browser-option-handlesigint
- `handleSIGINT` <[boolean]>

Close the browser process on Ctrl-C. Defaults to `true`.

## browser-option-handlesigterm
- `handleSIGTERM` <[boolean]>

Close the browser process on SIGTERM. Defaults to `true`.

## browser-option-handlesighup
- `handleSIGHUP` <[boolean]>

Close the browser process on SIGHUP. Defaults to `true`.

## browser-option-headless
- `headless` <[boolean]>

Whether to run browser in headless mode. More details for
Chromium and
Firefox. Defaults to `true`.

## js-python-browser-option-firefoxuserprefs
* langs: js, python
- `firefoxUserPrefs` <[Object]<[string], [string]|[float]|[boolean]>>

Firefox user preferences. Learn more about the Firefox user preferences at
`about:config`.

You can also provide a path to a custom `policies.json` file via `PLAYWRIGHT_FIREFOX_POLICIES_JSON` environment variable.

## csharp-java-browser-option-firefoxuserprefs
* langs: csharp, java
- `firefoxUserPrefs` <[Object]<[string], [any]>>

Firefox user preferences. Learn more about the Firefox user preferences at
`about:config`.

You can also provide a path to a custom `policies.json` file via `PLAYWRIGHT_FIREFOX_POLICIES_JSON` environment variable.

## browser-option-logger
* langs: js
* deprecated: The logs received by the logger are incomplete. Please use tracing instead.
- `logger` <[Logger]>

Logger sink for Playwright logging.

## browser-option-timeout
- `timeout` <[float]>

Maximum time in milliseconds to wait for the browser instance to start. Defaults to `180000` (3 minutes). Pass `0` to
disable timeout.

## browser-option-artifactsdir
- `artifactsDir` <[path]>

If specified, artifacts (traces, videos, downloads, HAR files, etc.) are saved into this directory. The directory is not cleaned up when the browser closes. If not specified, a temporary directory is used and cleaned up when the browser closes.

## browser-option-tracesdir
- `tracesDir` <[path]>

If specified, traces are saved into this directory.

## browser-option-slowmo
- `slowMo` <[float]>

Slows down Playwright operations by the specified amount of milliseconds. Useful so that you can see what is going on.

## shared-browser-options-list-v1.8
- %%-browser-option-args-%%
- %%-browser-option-artifactsdir-%%
- %%-browser-option-channel-%%
- %%-browser-option-chromiumsandbox-%%
- %%-browser-option-downloadspath-%%
- %%-csharp-java-browser-option-env-%%
- %%-js-browser-option-env-%%
- %%-python-browser-option-env-%%
- %%-browser-option-executablepath-%%
- %%-browser-option-handlesigint-%%
- %%-browser-option-handlesigterm-%%
- %%-browser-option-handlesighup-%%
- %%-browser-option-headless-%%
- %%-browser-option-ignoredefaultargs-%%
- %%-browser-option-proxy-%%
- %%-browser-option-timeout-%%
- %%-browser-option-tracesdir-%%

## locator-option-has-text
- `hasText` <[string]|[RegExp]>

Matches elements containing specified text somewhere inside, possibly in a child or a descendant element. When passed a [string], matching is case-insensitive and searches for a substring.
For example, `"Playwright"` matches `Playwright`.

## locator-option-has
- `has` <[Locator]>

Narrows down the results of the method to those which contain elements matching this relative locator.
For example, `article` that has `text=Playwright` matches `Playwright`.

Inner locator **must be relative** to the outer locator and is queried starting with the outer locator match, not the document root. For example, you can find `content` that has `div` in `<content>Playwright</content>`. However, looking for `content` that has `article div` will fail, because the inner locator must be relative and should not use any elements outside the `content`.

Note that outer and inner locators must belong to the same frame. Inner locator must not contain [FrameLocator]s.

## locator-option-has-not
- `hasNot` <[Locator]>

Matches elements that do not contain an element that matches an inner locator. Inner locator is queried against the outer one.
For example, `article` that does not have `div` matches `Playwright`.

Note that outer and inner locators must belong to the same frame. Inner locator must not contain [FrameLocator]s.

## locator-option-has-not-text
- `hasNotText` <[string]|[RegExp]>

Matches elements that do not contain specified text somewhere inside, possibly in a child or a descendant element. When passed a [string], matching is case-insensitive and searches for a substring.

## locator-option-visible
- `visible` <[boolean]>

Only matches visible or invisible elements. Prefer the [`method: Locator.visible`] shortcut when matching only visible elements.

## locator-options-list-v1.14
- %%-locator-option-has-text-%%
- %%-locator-option-has-%%

## screenshot-option-animations
- `animations` "ScreenshotAnimations" <"disabled"|"allow">

When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
* finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
* infinite animations are canceled to initial state, and then played over after the screenshot.

Defaults to `"allow"` that leaves animations untouched.

## screenshot-option-animations-default-disabled
- `animations` "ScreenshotAnimations" <"disabled"|"allow">

When set to `"disabled"`, stops CSS animations, CSS transitions and Web Animations. Animations get different treatment depending on their duration:
* finite animations are fast-forwarded to completion, so they'll fire `transitionend` event.
* infinite animations are canceled to initial state, and then played over after the screenshot.

Defaults to `"disabled"` that disables animations.

## screenshot-option-omit-background
- `omitBackground` <[boolean]>

Hides default white background and allows capturing screenshots with transparency. Not applicable to `jpeg` images.
Defaults to `false`.

## screenshot-option-quality
- `quality` <[int]>

The quality of the image, between 0-100. Not applicable to `png` images. For `jpeg` the default is `80`.
For `webp`, a quality of `100` (the default) produces a lossless image, while lower values use lossy compression.
