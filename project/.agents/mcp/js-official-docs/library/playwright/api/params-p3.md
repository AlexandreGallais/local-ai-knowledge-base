---
title: "Matches <span> (part 3 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/params.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Matches <span> (part 3 of 6)

## context-option-timezoneid
- `timezoneId` <[string]>

Changes the timezone of the context. See ICU's metaZones.txt
for a list of supported timezone IDs. Defaults to the system timezone.

## context-option-geolocation
- `geolocation` "Geolocation" <[Object]>
  - `latitude` <[float]> Latitude between -90 and 90.
  - `longitude` <[float]> Longitude between -180 and 180.
  - `accuracy` ?<[float]> Non-negative accuracy value. Defaults to `0`.

## context-option-locale
- `locale` <[string]>

Specify user locale, for example `en-GB`, `de-DE`, etc. Locale will affect `navigator.language` value, `Accept-Language` request header value as well as number and date formatting rules. Defaults to the system default locale. Learn more about emulation in our emulation guide.

## context-option-permissions
- `permissions` <[Array]<[string]>>

A list of permissions to grant to all pages in this context. See
[`method: BrowserContext.grantPermissions`] for more details. Defaults to none.

## context-option-extrahttpheaders
- `extraHTTPHeaders` <[Object]<[string], [string]>>

An object containing additional HTTP headers to be sent with every request. Defaults to none.

## context-option-offline
- `offline` <[boolean]>

Whether to emulate network being offline. Defaults to `false`. Learn more about network emulation.

## context-option-httpcredentials
- `httpCredentials` "HttpCredentials" <[Object]|[Array]<[Object]>>
  - `username` <[string]>
  - `password` <[string]>
  - `origin` ?<[string]> Restrain sending http credentials on specific origin (scheme://host:port).
  - `send` "HttpCredentialsSend" ?<"unauthorized"|"always"> This option only applies to the requests sent from corresponding [APIRequestContext] and does not affect requests sent from the browser. `'always'` - `Authorization` header with basic <example-value> credentials will be sent with the each API request. `'unauthorized` - the credentials are only sent when 401 (Unauthorized) response with `WWW-Authenticate` header is received. Defaults to `'unauthorized'`.

Credentials for HTTP authentication.
If no origin is specified, the username and password are sent to any servers upon unauthorized responses.

Pass an array to use different credentials for different origins. The first entry that matches the request origin is used, and entries with no origin match any request.

## context-option-colorscheme
* langs: js, java
- `colorScheme` "ColorScheme" <null|"light"|"dark"|"no-preference">

Emulates prefers-colors-scheme media feature, supported values are `'light'` and `'dark'`. See
[`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'light'`.

## context-option-colorscheme-csharp-python
* langs: csharp, python
- `colorScheme` "ColorScheme" <"light"|"dark"|"no-preference"|"null">

Emulates prefers-colors-scheme media feature, supported values are `'light'` and `'dark'`. See
[`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'light'`.

## context-option-reducedMotion
* langs: js, java
- `reducedMotion` "ReducedMotion" <null|"reduce"|"no-preference">

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-reducedMotion-csharp-python
* langs: csharp, python
- `reducedMotion` "ReducedMotion" <"reduce"|"no-preference"|"null">

Emulates `'prefers-reduced-motion'` media feature, supported values are `'reduce'`, `'no-preference'`. See [`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-forcedColors
* langs: js, java
- `forcedColors` "ForcedColors" <null|"active"|"none">

Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'none'`.

## context-option-forcedColors-csharp-python
* langs: csharp, python
- `forcedColors` "ForcedColors" <"active"|"none"|"null">

Emulates `'forced-colors'` media feature, supported values are `'active'`, `'none'`. See [`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'none'`.

## context-option-contrast
* langs: js, java
- `contrast` "Contrast" <null|"no-preference"|"more">

Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [`method: Page.emulateMedia`] for more details. Passing `null` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-contrast-csharp-python
* langs: csharp, python
- `contrast` "Contrast" <"no-preference"|"more"|"null">

Emulates `'prefers-contrast'` media feature, supported values are `'no-preference'`, `'more'`. See [`method: Page.emulateMedia`] for more details. Passing `'null'` resets emulation to system defaults. Defaults to `'no-preference'`.

## context-option-logger
* langs: js
* deprecated: The logs received by the logger are incomplete. Please use tracing instead.
- `logger` <[Logger]>

Logger sink for Playwright logging.

## context-option-recordhar
* langs: js
- `recordHar` <[Object]>
  - `omitContent` ?<[boolean]> Optional setting to control whether to omit request content from the HAR. Defaults to
    `false`. Deprecated, use `content` policy instead.
  - `content` "HarContentPolicy" ?<"omit"|"embed"|"attach"> Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files or entries in the ZIP archive. If `embed` is specified, content is stored inline the HAR file as per HAR specification. Defaults to `attach` for `.zip` output files and to `embed` for all other file extensions.
  - `path` <[path]> Path on the filesystem to write the HAR file to. If the file name ends with `.zip`, `content: 'attach'` is used by default.
  - `mode` "HarMode" ?<"full"|"minimal"> When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.
  - `urlFilter` ?<[string]|[RegExp]> A glob or regex pattern to filter requests that are stored in the HAR. When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path, it gets merged via the `new URL()` constructor. Defaults to none.

Enables HAR recording for all pages into `recordHar.path` file. If not
specified, the HAR is not recorded. Make sure to await [`method: BrowserContext.close`] for the HAR to be
saved.

## context-option-recordhar-path
* langs: csharp, java, python
  - alias-python: record_har_path
- `recordHarPath` <[path]>

Enables HAR recording for all pages into the
specified HAR file on the filesystem. If not specified, the HAR is not recorded. Make sure to
call [`method: BrowserContext.close`] for the HAR to be saved.

## context-option-recordhar-omit-content
* langs: csharp, java, python
  - alias-python: record_har_omit_content
- `recordHarOmitContent` ?<[boolean]>

Optional setting to control whether to omit request content from the HAR. Defaults to `false`.

## context-option-recordhar-content
* langs: csharp, java, python
  - alias-python: record_har_content
- `recordHarContent` "HarContentPolicy" ?<"omit"|"embed"|"attach">

Optional setting to control resource content management. If `omit` is specified, content is not persisted. If `attach` is specified, resources are persisted as separate files and all of these files are archived along with the HAR file. Defaults to `embed`, which stores content inline the HAR file as per HAR specification.

## context-option-recordhar-mode
* langs: csharp, java, python
  - alias-python: record_har_mode
- `recordHarMode` "HarMode" ?<"full"|"minimal">

When set to `minimal`, only record information necessary for routing from HAR. This omits sizes, timing, page, cookies, security and other types of HAR information that are not used when replaying from HAR. Defaults to `full`.

## context-option-recordhar-url-filter
* langs: csharp, java, python
  - alias-python: record_har_url_filter
- `recordHarUrlFilter` ?<[string]|[RegExp]>

## context-option-recordvideo
* langs: js
- `recordVideo` <[Object]>
  - `dir` ?<[path]> Path to the directory to put videos into. If not specified, the videos will be stored in `artifactsDir` (see [`method: BrowserType.launch`] options).
  - `size` ?<[Object]> Optional dimensions of the recorded videos. If not specified the size will be equal to `viewport`
    scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450.
    Actual picture of each page will be scaled down if necessary to fit the specified size.
    - `width` <[int]> Video frame width.
    - `height` <[int]> Video frame height.
  - `fps` ?<[int]> Frame rate of the recorded videos in frames per second. Defaults to `25`. Firefox and WebKit currently capture up to 25 frames per second.
  - `showActions` ?<[Object]> If specified, enables visual annotations on interacted elements during video recording.
    - `duration` ?<[float]> How long each annotation is displayed in milliseconds. Defaults to `500`.
    - `position` "AnnotatePosition" ?<"top-left"|"top"|"top-right"|"bottom-left"|"bottom"|"bottom-right"> Position of the action title overlay. Defaults to `"top-right"`.
    - `fontSize` ?<[int]> Font size of the action title in pixels. Defaults to `24`. Deprecated, use `style.title` instead.
    - `cursor` "ScreencastCursor" ?<"none"|"pointer"> Cursor decoration shown for pointer actions. `"pointer"` (the default) renders a mouse pointer that animates from the previous action point to the next one. `"none"` disables the cursor decoration.
    - `style` ?<[Object]> Styles of the action decorations.
      - `point` ?<[string]> CSS declarations for the zero-sized marker centered on the action point. Not shown when omitted.
      - `highlight` ?<[string]> CSS declarations for the box that covers the target element. Not shown when omitted.
      - `title` ?<[string]> CSS declarations for the action title.

Enables video recording for all pages into `recordVideo.dir` directory. If not specified videos are not recorded. Make
sure to await [`method: BrowserContext.close`] for videos to be saved.

## context-option-recordvideo-dir
* langs: csharp, java, python
  - alias-python: record_video_dir
- `recordVideoDir` <[path]>

Enables video recording for all pages into the specified directory. If not specified videos are
not recorded. Make sure to call [`method: BrowserContext.close`] for videos to be saved.

## context-option-recordvideo-size
* langs: csharp, java, python
  - alias-python: record_video_size
- `recordVideoSize` "RecordVideoSize" <[Object]>
  - `width` <[int]> Video frame width.
  - `height` <[int]> Video frame height.

Dimensions of the recorded videos. If not specified the size will be equal to `viewport`
scaled down to fit into 800x800. If `viewport` is not configured explicitly the video size defaults to 800x450.
Actual picture of each page will be scaled down if necessary to fit the specified size.

## context-option-recordvideo-fps
* langs: csharp, java, python
  - alias-python: record_video_fps
- `recordVideoFps` <[int]>

Frame rate of the recorded videos in frames per second. Defaults to `25`. Firefox and WebKit currently capture up to 25 frames per second.

## context-option-proxy
- `proxy` "Proxy" <[Object]>
  * alias-python: ProxySettings
  - `server` <[string]> Proxy to be used for all requests. HTTP and SOCKS proxies are supported, for example
    `http://myproxy.com:3128` or `socks5://myproxy.com:3128`. Short form `myproxy.com:3128` is considered an HTTP proxy.
  - `bypass` ?<[string]> Optional comma-separated domains to bypass proxy, for example `".com, chromium.org, .domain.com"`.
  - `username` ?<[string]> Optional username to use if HTTP proxy requires authentication.
  - `password` ?<[string]> Optional password to use if HTTP proxy requires authentication.

Network proxy settings to use with this context. Defaults to none.

## context-option-strict
- `strictSelectors` <[boolean]>

If set to true, enables strict selectors mode for this context. In the strict selectors mode all operations
on selectors that imply single target DOM element will throw when more than one element matches the selector.
This option does not affect any Locator APIs (Locators are always strict). Defaults to `false`.
See [Locator] to learn more about the strict mode.

## context-option-service-worker-policy
- `serviceWorkers` "ServiceWorkerPolicy" <"allow"|"block">

Whether to allow sites to register Service workers. Defaults to `'allow'`.
* `'allow'`: Service Workers can be registered.
* `'block'`: Playwright will block all registration of Service Workers.

## remove-all-listeners-options-behavior
* langs: js
* since: v1.47
- `behavior` "RemoveAllListenersBehavior" <"wait"|"ignoreErrors"|"default">

Specifies whether to wait for already running listeners and what to do if they throw errors:
* `'default'` - do not wait for current listener calls (if any) to finish, if the listener throws, it may result in unhandled error
* `'wait'` - wait for current listener calls (if any) to finish
* `'ignoreErrors'` - do not wait for current listener calls (if any) to finish, all errors thrown by the listeners after removal are silently caught

## unroute-all-options-behavior
* langs: js, csharp, python
* since: v1.41
- `behavior` "UnrouteBehavior" <"wait"|"ignoreErrors"|"default">

Specifies whether to wait for already running handlers and what to do if they throw errors:
* `'default'` - do not wait for current handler calls (if any) to finish, if unrouted handler throws, it may result in unhandled error
* `'wait'` - wait for current handler calls (if any) to finish
* `'ignoreErrors'` - do not wait for current handler calls (if any) to finish, all errors thrown by the handlers after unrouting are silently caught

## select-options-values
* langs: java, js, csharp
- `values` <[null]|[string]|[ElementHandle]|[Array]<[string]>|[Object]|[Array]<[ElementHandle]>|[Array]<[Object]>>
  * alias-java: SelectOption
  - `value` ?<[string]> Matches by `option.value`. Optional.
  - `label` ?<[string]> Matches by `option.label`. Optional.
  - `index` ?<[int]> Matches by the index. Optional.

Options to select. If the `<select>` has the `multiple` attribute, all matching options are selected, otherwise only the
first option matching one of the passed options is selected. String values are matching both values and labels. Option
is considered matching if all specified properties match.
