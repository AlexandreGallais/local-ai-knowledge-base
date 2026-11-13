---
title: "class: Page (part 12 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 12 of 14)

## async method: Page.waitForLoadState
* since: v1.8

Returns when the required load state has been reached.

This resolves when the page reaches a required load state, `load` by default. The navigation must have been committed
when this method is called. If current document has already reached the required state, resolves immediately.

:::note
Most of the time, this method is not needed because Playwright auto-waits before every action.
:::

**Usage**

```js
await page.getByRole('button').click(); // Click triggers navigation.
await page.waitForLoadState(); // The promise resolves after 'load' event.
```

```java
page.getByRole(AriaRole.BUTTON).click(); // Click triggers navigation.
page.waitForLoadState(); // The promise resolves after "load" event.
```

```python
await page.get_by_role("button").click() # click triggers navigation.
await page.wait_for_load_state() # the promise resolves after "load" event.
```

```python
page.get_by_role("button").click() # click triggers navigation.
page.wait_for_load_state() # the promise resolves after "load" event.
```

```csharp
await page.GetByRole(AriaRole.Button).ClickAsync(); // Click triggers navigation.
await page.WaitForLoadStateAsync(); // The promise resolves after 'load' event.
```

```js
const popupPromise = page.waitForEvent('popup');
await page.getByRole('button').click(); // Click triggers a popup.
const popup = await popupPromise;
await popup.waitForLoadState('domcontentloaded'); // Wait for the 'DOMContentLoaded' event.
console.log(await popup.title()); // Popup is ready to use.
```

```java
Page popup = page.waitForPopup(() -> {
  page.getByRole(AriaRole.BUTTON).click(); // Click triggers a popup.
});
// Wait for the "DOMContentLoaded" event
popup.waitForLoadState(LoadState.DOMCONTENTLOADED);
System.out.println(popup.title()); // Popup is ready to use.
```

```python
async with page.expect_popup() as page_info:
    await page.get_by_role("button").click() # click triggers a popup.
popup = await page_info.value
# Wait for the "DOMContentLoaded" event.
await popup.wait_for_load_state("domcontentloaded")
print(await popup.title()) # popup is ready to use.
```

```python
with page.expect_popup() as page_info:
    page.get_by_role("button").click() # click triggers a popup.
popup = page_info.value
# Wait for the "DOMContentLoaded" event.
popup.wait_for_load_state("domcontentloaded")
print(popup.title()) # popup is ready to use.
```

```csharp
var popup = await page.RunAndWaitForPopupAsync(async () =>
{
    await page.GetByRole(AriaRole.Button).ClickAsync(); // click triggers the popup
});
// Wait for the "DOMContentLoaded" event.
await popup.WaitForLoadStateAsync(LoadState.DOMContentLoaded);
Console.WriteLine(await popup.TitleAsync()); // popup is ready to use.
```

### param: Page.waitForLoadState.state = %%-wait-for-load-state-state-%%
* since: v1.8

### option: Page.waitForLoadState.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.waitForLoadState.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## async method: Page.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Page.waitForURL`] instead.
* langs:
  * alias-python: expect_navigation
  * alias-csharp: RunAndWaitForNavigation
- returns: <[null]|[Response]>

Waits for the main frame navigation and returns the main resource response. In case of multiple redirects, the navigation
will resolve with the response of the last redirect. In case of navigation to a different anchor or navigation due to
History API usage, the navigation will resolve with `null`.

**Usage**

This resolves when the page navigates to a new URL or reloads. It is useful for when you run code which will indirectly
cause the page to navigate. e.g. The click target has an `onclick` handler that triggers navigation from a `setTimeout`.
Consider this example:

```js
// Start waiting for navigation before clicking. Note no await.
const navigationPromise = page.waitForNavigation();
await page.getByText('Navigate after timeout').click();
await navigationPromise;
```

```java
// The method returns after navigation has finished
Response response = page.waitForNavigation(() -> {
  // This action triggers the navigation after a timeout.
  page.getByText("Navigate after timeout").click();
});
```

```python
async with page.expect_navigation():
    # This action triggers the navigation after a timeout.
    await page.get_by_text("Navigate after timeout").click()
# Resolves after navigation has finished
```

```python
with page.expect_navigation():
    # This action triggers the navigation after a timeout.
    page.get_by_text("Navigate after timeout").click()
# Resolves after navigation has finished
```

```csharp
await page.RunAndWaitForNavigationAsync(async () =>
{
    // This action triggers the navigation after a timeout.
    await page.GetByText("Navigate after timeout").ClickAsync();
});

// The method continues after navigation has finished
```

:::note
Usage of the History API to change the URL is considered
a navigation.
:::

## async method: Page.waitForNavigation
* since: v1.8
* deprecated: This method is inherently racy, please use [`method: Page.waitForURL`] instead.
* langs: python
- returns: <[EventContextManager]<[Response]>>

### param: Page.waitForNavigation.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForNavigation.url = %%-js-wait-for-navigation-url-%%
* since: v1.8

### option: Page.waitForNavigation.url = %%-python-csharp-java-wait-for-navigation-url-%%
* since: v1.8

### option: Page.waitForNavigation.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.waitForNavigation.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.waitForNavigation.timeout = %%-navigation-timeout-js-%%
* since: v1.8

### param: Page.waitForNavigation.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForPopup
* since: v1.9
* langs: java, python, csharp
  - alias-python: expect_popup
  - alias-csharp: RunAndWaitForPopup
- returns: <[Page]>

Performs action and waits for a popup [Page]. If predicate is provided, it passes
[Popup] value into the `predicate` function and waits for `predicate(page)` to return a truthy value.
Will throw an error if the page is closed before the popup event is fired.

## async method: Page.waitForPopup
* since: v1.9
* langs: python
- returns: <[EventContextManager]<[Page]>>

**Usage**

```python
async with page.expect_popup() as popup_info:
    await page.get_by_text("Open popup").click()

popup = await popup_info.value
print(await popup.title())
```

```python
with page.expect_popup() as popup_info:
    page.get_by_text("Open popup").click()

popup = popup_info.value
print(popup.title())
```

### param: Page.waitForPopup.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForPopup.predicate
* since: v1.9
- `predicate` <[function]\([Page]\):[boolean]>

Receives the [Page] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForPopup.timeout = %%-wait-for-event-timeout-%%
* since: v1.9

### param: Page.waitForPopup.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForRequest
* since: v1.8
* langs:
  * alias-python: expect_request
  * alias-csharp: RunAndWaitForRequest
- returns: <[Request]>

Waits for the matching request and returns it. See waiting for event for more details about events.

**Usage**

```js
// Start waiting for request before clicking. Note no await.
const requestPromise = page.waitForRequest('https://example.com/resource');
await page.getByText('trigger request').click();
const request = await requestPromise;

// Alternative way with a predicate. Note no await.
const requestPromise = page.waitForRequest(request =>
  request.url() === 'https://example.com' && request.method() === 'GET',
);
await page.getByText('trigger request').click();
const request = await requestPromise;
```

```java
// Waits for the next request with the specified url
Request request = page.waitForRequest("https://example.com/resource", () -> {
  // Triggers the request
  page.getByText("trigger request").click();
});

// Waits for the next request matching some conditions
Request request = page.waitForRequest(request -> "https://example.com".equals(request.url()) && "GET".equals(request.method()), () -> {
  // Triggers the request
  page.getByText("trigger request").click();
});
```

```python
async with page.expect_request("http://example.com/resource") as first:
    await page.get_by_text("trigger request").click()
first_request = await first.value

# or with a lambda
async with page.expect_request(lambda request: request.url == "http://example.com" and request.method == "get") as second:
    await page.get_by_text("trigger request").click()
second_request = await second.value
```

```python
with page.expect_request("http://example.com/resource") as first:
    page.get_by_text("trigger request").click()
first_request = first.value

# or with a lambda
with page.expect_request(lambda request: request.url == "http://example.com" and request.method == "get") as second:
    page.get_by_text("trigger request").click()
second_request = second.value
```

```csharp
// Waits for the next request with the specified url.
await page.RunAndWaitForRequestAsync(async () =>
{
    await page.GetByText("trigger request").ClickAsync();
}, "http://example.com/resource");

// Alternative way with a predicate.
await page.RunAndWaitForRequestAsync(async () =>
{
    await page.GetByText("trigger request").ClickAsync();
}, request => request.Url == "https://example.com" && request.Method == "GET");
```

## async method: Page.waitForRequest
* since: v1.8
* langs: python
- returns: <[EventContextManager]<[Request]>>

### param: Page.waitForRequest.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### param: Page.waitForRequest.urlOrPredicate
* since: v1.8
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Request]\):[boolean]>

Request URL string, regex or predicate receiving [Request] object.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the `new URL()` constructor.

### param: Page.waitForRequest.urlOrPredicate
* since: v1.8
* langs: js, python
- `urlOrPredicate` <[string]|[RegExp]|[function]\([Request]\):[boolean]|[Promise]<[boolean]>>

Request URL string, regex or predicate receiving [Request] object.
When a [`option: Browser.newContext.baseURL`] via the context options was provided and the passed URL is a path,
it gets merged via the `new URL()` constructor.

### option: Page.waitForRequest.timeout
* since: v1.8
- `timeout` <[float]>

Maximum wait time in milliseconds, defaults to 30 seconds, pass `0` to disable the timeout. The default value can be
changed by using the [`method: Page.setDefaultTimeout`] method.

### param: Page.waitForRequest.callback = %%-java-wait-for-event-callback-%%
* since: v1.9

## async method: Page.waitForRequestFinished
* since: v1.12
* langs: java, python, csharp
  - alias-python: expect_request_finished
  - alias-csharp: RunAndWaitForRequestFinished
- returns: <[Request]>

Performs action and waits for a [Request] to finish loading. If predicate is provided, it passes
[Request] value into the `predicate` function and waits for `predicate(request)` to return a truthy value.
Will throw an error if the page is closed before the [`event: Page.requestFinished`] event is fired.

## async method: Page.waitForRequestFinished
* since: v1.12
* langs: python
- returns: <[EventContextManager]<[Request]>>

**Usage**

```python
async with page.expect_request_finished() as request_info:
    await page.get_by_text("Trigger request").click()

request = await request_info.value
print(request.url)
```

```python
with page.expect_request_finished() as request_info:
    page.get_by_text("Trigger request").click()

request = request_info.value
print(request.url)
```

### param: Page.waitForRequestFinished.action = %%-csharp-wait-for-event-action-%%
* since: v1.12

### option: Page.waitForRequestFinished.predicate
* since: v1.12
- `predicate` <[function]\([Request]\):[boolean]>

Receives the [Request] object and resolves to truthy value when the waiting should resolve.

### option: Page.waitForRequestFinished.timeout = %%-wait-for-event-timeout-%%
* since: v1.12

### param: Page.waitForRequestFinished.callback = %%-java-wait-for-event-callback-%%
* since: v1.12
