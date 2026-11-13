---
title: "Matches <span> (part 2 of 6)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/params.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Matches <span> (part 2 of 6)

## storagestate-option-path
- `path` <[path]>

The file path to save the storage state to. If [`option: path`] is a relative path, then it is resolved relative to
current working directory. If no path is provided, storage
state is still returned, but won't be saved to the disk.

## context-option-acceptdownloads
- `acceptDownloads` <[boolean]>

Whether to automatically download all the attachments. Defaults to `true` where all the downloads are accepted.

## context-option-ignorehttpserrors
- `ignoreHTTPSErrors` <[boolean]>

Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.

## context-option-bypasscsp
- `bypassCSP` <[boolean]>

Toggles bypassing page's Content-Security-Policy. Defaults to `false`.

## context-option-baseURL
- `baseURL` <[string]>

When using [`method: Page.goto`], [`method: Page.route`], [`method: Page.waitForURL`], [`method: Page.waitForRequest`], or [`method: Page.waitForResponse`] it takes the base URL in consideration by using the `URL()` constructor for building the corresponding URL. Unset by default. Examples:
* baseURL: `http://localhost:3000` and navigating to `/bar.html` results in `http://localhost:3000/bar.html`
* baseURL: `http://localhost:3000/foo/` and navigating to `./bar.html` results in `http://localhost:3000/foo/bar.html`
* baseURL: `http://localhost:3000/foo` (without trailing slash) and navigating to `./bar.html` results in `http://localhost:3000/bar.html`

## context-option-viewport
* langs: js, java
  - alias-java: viewportSize
- `viewport` "ViewportSize" <[null]|[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Emulates consistent viewport for each page. Defaults to an 1280x720 viewport.
Use `null` to disable the consistent viewport emulation. Learn more about viewport emulation.

:::note
The `null` value opts out from the default presets, makes viewport depend on the
host window size defined by the operating system. It makes the execution of the
tests non-deterministic.
:::

## csharp-context-option-viewport
* langs: csharp
  - alias-csharp: viewportSize
- `viewport` <[null]|[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Emulates consistent viewport for each page. Defaults to an 1280x720 viewport.
Use `ViewportSize.NoViewport` to disable the consistent viewport emulation. Learn more about viewport emulation.

:::note
The `ViewportSize.NoViewport` value opts out from the default presets,
makes viewport depend on the host window size defined by the operating system.
It makes the execution of the tests non-deterministic.
:::

## context-option-screen
* langs:
  - alias-java: screenSize
  - alias-csharp: screenSize
- `screen` "ScreenSize" <[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the
[`option: viewport`] is set.

## page-agent-cache-key
* since: v1.58
- `cacheKey` <[string]>

All the agentic actions are converted to the Playwright calls and are cached.
By default, they are cached globally with the `task` as a key. This option allows controlling the cache key explicitly.

## page-agent-max-tokens
* since: v1.58
- `maxTokens` <[int]>

Maximum number of tokens to consume. The agentic loop will stop after input + output tokens exceed this value.
Defaults to context-wide value specified in `agent` property.

## page-agent-max-actions
* since: v1.58
- `maxActions` <[int]>

Maximum number of agentic actions to generate, defaults to context-wide value specified in `agent` property.

## page-agent-max-action-retries
* since: v1.58
- `maxActionRetries` <[int]>

Maximum number of retries when generating each action, defaults to context-wide value specified in `agent` property.

## page-agent-call-options-v1.58
- %%-page-agent-cache-key-%%
- %%-page-agent-max-tokens-%%
- %%-page-agent-max-actions-%%
- %%-page-agent-max-action-retries-%%

## fetch-param-url
- `url` <[string]>

Target URL.

## js-fetch-option-params
* langs: js
- `params` <[Object]<[string], [string]|[float]|[boolean]>|[URLSearchParams]|[string]>

Query parameters to be sent with the URL.

## python-fetch-option-params
* langs: python
- `params` <[Object]<[string], [string]|[float]|[boolean]>|[string]>

Query parameters to be sent with the URL.

## csharp-fetch-option-params
* langs: csharp
- `params` <[Object]<[string], [Serializable]>>

Query parameters to be sent with the URL.

## csharp-fetch-option-paramsString
* langs: csharp
- `paramsString` <[string]>

Query parameters to be sent with the URL.

## java-fetch-params
* langs: java
- `options` ?<[RequestOptions]>

Optional request parameters.

## js-python-csharp-fetch-option-headers
* langs: js, python, csharp
- `headers` <[Object]<[string], [string]>>

Allows to set HTTP headers. These headers will apply to the fetched request as well as any redirects initiated by it.

## js-python-csharp-fetch-option-timeout
* langs: js, python, csharp
- `timeout` <[float]>

Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

## js-python-csharp-fetch-option-failonstatuscode
* langs: js, python, csharp
- `failOnStatusCode` <[boolean]>

Whether to throw on response codes other than 2xx and 3xx. By default response object is returned
for all status codes.

## js-fetch-option-form
* langs: js
- `form` <[Object]<[string], [string]|[float]|[boolean]>|[FormData]>

Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded`
unless explicitly provided.

## python-fetch-option-form
* langs: python
- `form` <[Object]<[string], [string]|[float]|[boolean]>|[FormData]>

Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded`
unless explicitly provided. Use [FormData] to send multiple values for the same field.

## csharp-fetch-option-form
* langs: csharp
- `form` <[FormData]>

Provides an object that will be serialized as html form using `application/x-www-form-urlencoded` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `application/x-www-form-urlencoded`
unless explicitly provided.

An instance of [FormData] can be created via [`method: APIRequestContext.createFormData`].

## js-fetch-option-multipart
* langs: js
- `multipart` <[FormData]|[Object]<[string], [string]|[float]|[boolean]|[ReadStream]|[Object]>>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data`
unless explicitly provided. File values can be passed either as `fs.ReadStream`
or as file-like object containing file name, mime-type and its content.

## python-fetch-option-multipart
* langs: python
- `multipart` "FilePayload" <[Object]<[string], [string]|[float]|[boolean]|[ReadStream]|[Object]>|[FormData]>
  - `name` <[string]> File name
  - `mimeType` <[string]> File type
  - `buffer` <[Buffer]> File content

Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data`
unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content.
Use [FormData] to send multiple files in the same field.

## csharp-fetch-option-multipart
* langs: csharp
- `multipart` <[FormData]>

Provides an object that will be serialized as html form using `multipart/form-data` encoding and sent as
this request body. If this parameter is specified `content-type` header will be set to `multipart/form-data`
unless explicitly provided. File values can be passed as file-like object containing file name, mime-type and its content.

An instance of [FormData] can be created via [`method: APIRequestContext.createFormData`].

## js-python-csharp-fetch-option-data
* langs: js, python, csharp
- `data` <[string]|[Buffer]|[Serializable]>

Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be
set to `application/octet-stream` if not explicitly set.

## js-python-csharp-fetch-option-ignorehttpserrors
* langs: js, python, csharp
- `ignoreHTTPSErrors` <[boolean]>

Whether to ignore HTTPS errors when sending network requests. Defaults to `false`.

## js-python-csharp-fetch-option-maxredirects
* langs: js, python, csharp
- `maxRedirects` <[int]>

Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded.
Defaults to `20`. Pass `0` to not follow redirects.

## js-python-csharp-fetch-option-maxretries
* langs: js, python, csharp
- `maxRetries` <[int]>

Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.

## evaluate-expression
- `expression` <[string]>

JavaScript expression to be evaluated in the browser context. If the expression evaluates
to a function, the function is automatically invoked.

## js-evaluate-pagefunction
* langs: js
- `pageFunction` <[function]|[string]>

Function to be evaluated in the page context.

## js-evaluate-expose-functions
* langs: js
- `exposeFunctions` <[boolean]>

When set to `true`, functions passed inside [`param: arg`] are exposed in the page and can be called from the page function. Calling one returns a [Promise] of its result. Under the hood, each function is exposed via [`method: Page.exposeFunction`], so it is technically accessible from all frames of the page. Exposed functions are cleared upon the top-level navigation. Defaults to `false`, in which case functions are not serializable and passing one throws an error.

## js-init-script-expose-functions
* langs: js
- `exposeFunctions` <[boolean]>

When set to `true`, functions passed inside [`param: arg`] are exposed in the page and can be called from the init script. Calling one returns a [Promise] of its result. Under the hood, each function is exposed via [`method: Page.exposeFunction`], so it is technically accessible from all frames of the page. Unlike functions passed to [`method: Page.evaluate`], functions passed to an init script are exposed in every new document, so they survive navigations. Defaults to `false`, in which case functions are not serializable and are silently dropped.

## js-evalonselector-pagefunction
* langs: js
- `pageFunction` <[function]\([Element]\)|[string]>

Function to be evaluated in the page context.

## js-evalonselectorall-pagefunction
* langs: js
- `pageFunction` <[function]\([Array]<[Element]>\)|[string]>

Function to be evaluated in the page context.

## js-worker-evaluate-workerfunction
* langs: js
- `pageFunction` <[function]|[string]>

Function to be evaluated in the worker context.

## js-electron-evaluate-workerfunction
* langs: js
- `pageFunction` <[function]|[Electron]>

Function to be evaluated in the main Electron process.

## python-context-option-viewport
* langs: python
- `viewport` "ViewportSize" <[null]|[Object]>
  - `width` <[int]> page width in pixels.
  - `height` <[int]> page height in pixels.

Sets a consistent viewport for each page. Defaults to an 1280x720 viewport. `no_viewport` disables the fixed viewport. Learn more about viewport emulation.

## python-context-option-no-viewport
* langs: python
- `noViewport` <[boolean]>

Does not enforce fixed viewport, allows resizing window in the headed mode.

## context-option-clientCertificates
- `clientCertificates` "ClientCertificate" <[Array]<[Object]>>
  - `origin` <[string]> Exact origin that the certificate is valid for. Origin includes `https` protocol, a hostname and optionally a port.
  - `certPath` ?<[path]> Path to the file with the certificate in PEM format.
  - `cert` ?<[Buffer]> Direct value of the certificate in PEM format.
  - `keyPath` ?<[path]> Path to the file with the private key in PEM format.
  - `key` ?<[Buffer]> Direct value of the private key in PEM format.
  - `pfxPath` ?<[path]> Path to the PFX or PKCS12 encoded private key and certificate chain.
  - `pfx` ?<[Buffer]> Direct value of the PFX or PKCS12 encoded private key and certificate chain.
  - `passphrase` ?<[string]> Passphrase for the private key (PEM or PFX).

TLS Client Authentication allows the server to request a client certificate and verify it.

**Details**

An array of client certificates to be used. Each certificate object must have either both `certPath` and `keyPath`, a single `pfxPath`, or their corresponding direct value equivalents (`cert` and `key`, or `pfx`). Optionally, `passphrase` property should be provided if the certificate is encrypted. The `origin` property should be provided with an exact match to the request origin that the certificate is valid for.

Client certificate authentication is only active when at least one client certificate is provided. If you want to reject all client certificates sent by the server, you need to provide a client certificate with an `origin` that does not match any of the domains you plan to visit.

:::note
When using WebKit on macOS, accessing `localhost` will not pick up client certificates. You can make it work by replacing `localhost` with `local.playwright`.
:::

## context-option-useragent
- `userAgent` <[string]>

Specific user agent to use in this context.

## context-option-devicescalefactor
- `deviceScaleFactor` <[float]>

Specify device scale factor (can be thought of as dpr). Defaults to `1`. Learn more about emulating devices with device scale factor.

## context-option-ismobile
- `isMobile` <[boolean]>

Whether the `meta viewport` tag is taken into account and touch events are enabled. isMobile is a part of device, so you don't actually need to set it manually. Defaults to `false`. Learn more about mobile emulation.

## context-option-hastouch
- `hasTouch` <[boolean]>

Specifies if viewport supports touch events. Defaults to false. Learn more about mobile emulation.

## context-option-javascriptenabled
- `javaScriptEnabled` <[boolean]>

Whether or not to enable JavaScript in the context. Defaults to `true`. Learn more about disabling JavaScript.
