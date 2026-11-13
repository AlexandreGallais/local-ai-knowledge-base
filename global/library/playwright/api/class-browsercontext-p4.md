---
title: "class: BrowserContext (part 4 of 5)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-browsercontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: BrowserContext (part 4 of 5)

## async method: BrowserContext.setExtraHTTPHeaders
* since: v1.8

The extra HTTP headers will be sent with every request initiated by any page in the context. These headers are merged
with page-specific extra HTTP headers set with [`method: Page.setExtraHTTPHeaders`]. If page overrides a particular
header, page-specific header value will be used instead of the browser context header value.

:::note
[`method: BrowserContext.setExtraHTTPHeaders`] does not guarantee the order of headers in the outgoing requests.
:::

### param: BrowserContext.setExtraHTTPHeaders.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

An object containing additional HTTP headers to be sent with every request. All header values must be strings.

## async method: BrowserContext.setGeolocation
* since: v1.8

Sets the context's geolocation. Passing `null` or `undefined` emulates position unavailable.

**Usage**

```js
await browserContext.setGeolocation({ latitude: 59.95, longitude: 30.31667 });
```

```java
browserContext.setGeolocation(new Geolocation(59.95, 30.31667));
```

```python
await browser_context.set_geolocation({"latitude": 59.95, "longitude": 30.31667})
```

```python
browser_context.set_geolocation({"latitude": 59.95, "longitude": 30.31667})
```

```csharp
await context.SetGeolocationAsync(new Geolocation()
{
    Latitude = 59.95f,
    Longitude = 30.31667f
});
```

:::note
Consider using [`method: BrowserContext.grantPermissions`] to grant permissions for the browser context pages to read
its geolocation.
:::

### param: BrowserContext.setGeolocation.geolocation
* since: v1.8
- `geolocation` "Geolocation" <[null]|[Object]>
  - `latitude` <[float]> Latitude between -90 and 90.
  - `longitude` <[float]> Longitude between -180 and 180.
  - `accuracy` ?<[float]> Non-negative accuracy value. Defaults to `0`.

## async method: BrowserContext.setHTTPCredentials
* since: v1.8
* langs: js

Sets the credentials for HTTP authentication for this browser context.

:::note
Browsers may cache credentials per origin after a successful authentication, so changing credentials for an origin that has already been authenticated may have no effect.
:::

### param: BrowserContext.setHTTPCredentials.httpCredentials
* since: v1.8
- `httpCredentials` <[null]|[Object]|[Array]<[Object]>>
  - `username` <[string]>
  - `password` <[string]>
  - `origin` ?<[string]> Restrain sending http credentials on specific origin (scheme://host:port).

Pass an array to use different credentials for different origins. The first entry that matches the request origin is used, and entries with no origin match any request.

## async method: BrowserContext.setOffline
* since: v1.8

### param: BrowserContext.setOffline.offline
* since: v1.8
- `offline` <[boolean]>

Whether to emulate network being offline for the browser context.

:::note
Offline emulation only affects requests that go through the browser's regular network stack, such as page navigations, `fetch()`, `XMLHttpRequest` and WebSockets. It does not affect WebRTC traffic: established `RTCPeerConnection`s keep sending and receiving media over UDP. To test WebRTC connection loss, interrupt the connection outside the browser, for example by stopping the TURN server or using an OS-level firewall.
:::

## async method: BrowserContext.storageState
* since: v1.8
- returns: "StorageState" <[Object]>
  - `cookies` "StorageStateCookie" <[Array]<[Object]>>
    - `name` <[string]>
    - `value` <[string]>
    - `domain` <[string]>
    - `path` <[string]>
    - `expires` <[float]> Unix time in seconds.
    - `httpOnly` <[boolean]>
    - `secure` <[boolean]>
    - `sameSite` "SameSiteAttribute" <"Strict"|"Lax"|"None">
  - `origins` "OriginState" <[Array]<[Object]>>
    - `origin` <[string]>
    - `localStorage` "LocalStorageEntry" <[Array]<[Object]>>
      - `name` <[string]>
      - `value` <[string]>

Returns storage state for this browser context, contains current cookies, local storage snapshot, IndexedDB snapshot, origin private file system snapshot and virtual WebAuthn credentials.

## async method: BrowserContext.storageState
* since: v1.8
* langs: csharp, java
- returns: <[string]>

### option: BrowserContext.storageState.path = %%-storagestate-option-path-%%
* since: v1.8

### option: BrowserContext.storageState.indexedDB
* since: v1.51
- `indexedDB` ?<boolean>

Set to `true` to include IndexedDB in the storage state snapshot.
If your application uses IndexedDB to store authentication tokens, like Firebase Authentication, enable this.

### option: BrowserContext.storageState.opfs
* since: v1.63
- `opfs` ?<boolean>

Set to `true` to include the origin private file system
in the storage state snapshot.

:::note
OPFS is currently not supported in ephemeral WebKit contexts.
:::

### option: BrowserContext.storageState.credentials
* since: v1.62
- `credentials` ?<boolean>

Set to `true` to include the context's virtual WebAuthn [`property: BrowserContext.credentials`] (passkeys) in the storage
state snapshot. The captured credentials carry their private keys and signature counters, so they can be re-seeded into a later context via the
[`option: Browser.newContext.storageState`] option or [`method: BrowserContext.setStorageState`].
Note that restoring the storage state that contains credentials will automatically install the virtual WebAuthn authenticator (see [`method: Credentials.install`]), and prevent all real authenticators from working in this context.

## async method: BrowserContext.setStorageState
* since: v1.59

Clears the existing cookies, local storage, IndexedDB entries, origin private file system entries and virtual WebAuthn credentials, and sets the new storage
state. When the storage state contains credentials, the virtual WebAuthn authenticator is installed (equivalent to
[`method: Credentials.install`]), preventing all real authenticators from working in this context.

**Usage**

```js
// Load storage state from a file and apply it to the context.
await context.setStorageState('state.json');
```

```java
// Load storage state from a file and apply it to the context.
context.setStorageState(Paths.get("state.json"));
```

```python
# Load storage state from a file and apply it to the context.
await context.set_storage_state("state.json")
```

```python
# Load storage state from a file and apply it to the context.
context.set_storage_state("state.json")
```

```csharp
// Load storage state from a file and apply it to the context.
await context.SetStorageStateAsync("state.json");
```

### param: BrowserContext.setStorageState.storageState = %%-js-python-context-option-storage-state-%%
* since: v1.59
* langs: js, python

### param: BrowserContext.setStorageState.storageState = %%-csharp-java-context-option-storage-state-path-%%
* since: v1.59
* langs: csharp, java

## property: BrowserContext.tracing
* since: v1.12
- type: <[Tracing]>

## async method: BrowserContext.unrouteAll
* since: v1.41

Removes all routes created with [`method: BrowserContext.route`] and [`method: BrowserContext.routeFromHAR`].

### option: BrowserContext.unrouteAll.behavior = %%-unroute-all-options-behavior-%%
* since: v1.41

## async method: BrowserContext.unroute
* since: v1.8

Removes a route created with [`method: BrowserContext.route`]. When [`param: handler`] is not specified, removes all
routes for the [`param: url`].

### param: BrowserContext.unroute.url
* since: v1.8
* langs: js
- `url` <[string]|[RegExp]|[URLPattern]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, URL pattern, or predicate receiving [URL] used to register a routing with
[`method: BrowserContext.route`].

### param: BrowserContext.unroute.url
* since: v1.8
* langs: python, csharp, java
- `url` <[string]|[RegExp]|[function]\([URL]\):[boolean]>

A glob pattern, regex pattern, or predicate receiving [URL] used to register a routing with
[`method: BrowserContext.route`].

### param: BrowserContext.unroute.handler
* since: v1.8
* langs: js
- `handler` ?<[function]\([Route], [Request]\): [Promise<any>|any]>

Optional handler function used to register a routing with [`method: BrowserContext.route`].

### param: BrowserContext.unroute.handler
* since: v1.8
* langs: python
- `handler` ?<[function]\([Route]\)|[function]\([Route], [Request]\)>

Optional handler function used to register a routing with [`method: BrowserContext.route`].

### param: BrowserContext.unroute.handler
* since: v1.8
* langs: csharp, java
- `handler` ?<[function]\([Route]\)>

Optional handler function used to register a routing with [`method: BrowserContext.route`].

## async method: BrowserContext.waitForCondition
* since: v1.32
* langs: java

The method will block until the condition returns true. All Playwright events will
be dispatched while the method is waiting for the condition.

**Usage**

Use the method to wait for a condition that depends on page events:

```java
List<String> failedUrls = new ArrayList<>();
context.onResponse(response -> {
  if (!response.ok()) {
    failedUrls.add(response.url());
  }
});
page1.getByText("Create user").click();
page2.getByText("Submit button").click();
context.waitForCondition(() -> failedUrls.size() > 3);
```

### param: BrowserContext.waitForCondition.condition
* since: v1.32
- `condition` <[BooleanSupplier]>

Condition to wait for.

### option: BrowserContext.waitForCondition.timeout = %%-wait-for-function-timeout-%%
* since: v1.32

## async method: BrowserContext.waitForConsoleMessage
* since: v1.34
* langs: java, python, csharp
  - alias-python: expect_console_message
  - alias-csharp: RunAndWaitForConsoleMessage
- returns: <[ConsoleMessage]>

Performs action and waits for a [ConsoleMessage] to be logged by in the pages in the context. If predicate is provided, it passes
[ConsoleMessage] value into the `predicate` function and waits for `predicate(message)` to return a truthy value.
Will throw an error if the page is closed before the [`event: BrowserContext.console`] event is fired.

## async method: BrowserContext.waitForConsoleMessage
* since: v1.34
* langs: python
- returns: <[EventContextManager]<[ConsoleMessage]>>

**Usage**

```python
async with context.expect_console_message() as message_info:
    await page.get_by_role("button").click()

message = await message_info.value
print(message.text)
```

```python
with context.expect_console_message() as message_info:
    page.get_by_role("button").click()

message = message_info.value
print(message.text)
```

### param: BrowserContext.waitForConsoleMessage.action = %%-csharp-wait-for-event-action-%%
* since: v1.34

### option: BrowserContext.waitForConsoleMessage.predicate
* since: v1.34
- `predicate` <[function]\([ConsoleMessage]\):[boolean]>

Receives the [ConsoleMessage] object and resolves to truthy value when the waiting should resolve.

### option: BrowserContext.waitForConsoleMessage.timeout = %%-wait-for-event-timeout-%%
* since: v1.34

### param: BrowserContext.waitForConsoleMessage.callback = %%-java-wait-for-event-callback-%%
* since: v1.34

## async method: BrowserContext.waitForEvent
* since: v1.8
* langs: js, python
  - alias-python: expect_event
- returns: <[any]>

Waits for event to fire and passes its value into the predicate function. Returns when the predicate returns truthy
value. Will throw an error if the context closes before the event is fired. Returns the event data value.

**Usage**

```js
const pagePromise = context.waitForEvent('page');
await page.getByRole('button').click();
const page = await pagePromise;
```

```java
Page newPage = context.waitForPage(() -> page.getByRole(AriaRole.BUTTON).click());
```

```python
async with context.expect_event("page") as event_info:
    await page.get_by_role("button").click()
page = await event_info.value
```

```python
with context.expect_event("page") as event_info:
    page.get_by_role("button").click()
page = event_info.value
```

```csharp
var page = await context.RunAndWaitForPageAsync(async () =>
{
    await page.GetByRole(AriaRole.Button).ClickAsync();
});
```

## async method: BrowserContext.waitForEvent
* since: v1.8
* langs: python
- returns: <[EventContextManager]>

### param: BrowserContext.waitForEvent.event
* since: v1.8
- `event` <[string]>

Event name, same one would pass into `browserContext.on(event)`.

### param: BrowserContext.waitForEvent.optionsOrPredicate
* since: v1.8
* langs: js
- `optionsOrPredicate` ?<[function]|[Object]>
  - `predicate` <[function]> Receives the event data and resolves to truthy value when the waiting should resolve.
  - `timeout` ?<[float]> Maximum time to wait for in milliseconds. Defaults to `0` - no timeout. The default value can be changed via `actionTimeout` option in the config, or by using the [`method: BrowserContext.setDefaultTimeout`] method.

Either a predicate that receives an event or an options object. Optional.

### option: BrowserContext.waitForEvent.predicate = %%-wait-for-event-predicate-%%
* since: v1.8

### option: BrowserContext.waitForEvent.timeout = %%-wait-for-event-timeout-%%
* since: v1.8

## async method: BrowserContext.waitForPage
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_page
  - alias-csharp: RunAndWaitForPage
- returns: <[Page]>

Performs action and waits for a new [Page] to be created in the context. If predicate is provided, it passes
[Page] value into the `predicate` function and waits for `predicate(event)` to return a truthy value.
Will throw an error if the context closes before new [Page] is created.

## async method: BrowserContext.waitForPage
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Page]>>

**Usage**

```python
async with context.expect_page() as page_info:
    await page.get_by_text("Open new tab").click()

new_page = await page_info.value
print(await new_page.title())
```

```python
with context.expect_page() as page_info:
    page.get_by_text("Open new tab").click()

new_page = page_info.value
print(new_page.title())
```

### param: BrowserContext.waitForPage.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: BrowserContext.waitForPage.predicate
* since: v1.9
* langs: csharp, java, python
- `predicate` <[function]\([Page]\):[boolean]>

Receives the [Page] object and resolves to truthy value when the waiting should resolve.

### option: BrowserContext.waitForPage.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: BrowserContext.waitForPage.callback = %%-java-wait-for-event-callback-%%
* since: v1.9
