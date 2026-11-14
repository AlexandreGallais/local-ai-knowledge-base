---
title: "class: Page (part 8 of 14)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-page.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Page (part 8 of 14)

## async method: Page.addLocatorHandler
* since: v1.42

When testing a web page, sometimes unexpected overlays like a "Sign up" dialog appear and block actions you want to automate, e.g. clicking a button. These overlays don't always show up in the same way or at the same time, making them tricky to handle in automated tests.

This method lets you set up a special function, called a handler, that activates when it detects that overlay is visible. The handler's job is to remove the overlay, allowing your test to continue as if the overlay wasn't there.

Things to keep in mind:
* When an overlay is shown predictably, we recommend explicitly waiting for it in your test and dismissing it as a part of your normal test flow, instead of using [`method: Page.addLocatorHandler`].
* Playwright checks for the overlay every time before executing or retrying an action that requires an actionability check, or before performing an auto-waiting assertion check. When overlay is visible, Playwright calls the handler first, and then proceeds with the action/assertion. Note that the handler is only called when you perform an action/assertion - if the overlay becomes visible but you don't perform any actions, the handler will not be triggered.
* After executing the handler, Playwright will ensure that overlay that triggered the handler is not visible anymore. You can opt-out of this behavior with [`option: noWaitAfter`].
* The execution time of the handler counts towards the timeout of the action/assertion that executed the handler. If your handler takes too long, it might cause timeouts.
* You can register multiple handlers. However, only a single handler will be running at a time. Make sure the actions within a handler don't depend on another handler.

:::warning
Running the handler will alter your page state mid-test. For example it will change the currently focused element and move the mouse. Make sure that actions that run after the handler are self-contained and do not rely on the focus and mouse state being unchanged.

For example, consider a test that calls [`method: Locator.focus`] followed by [`method: Keyboard.press`]. If your handler clicks a button between these two actions, the focused element most likely will be wrong, and key press will happen on the unexpected element. Use [`method: Locator.press`] instead to avoid this problem.

Another example is a series of mouse actions, where [`method: Mouse.move`] is followed by [`method: Mouse.down`]. Again, when the handler runs between these two actions, the mouse position will be wrong during the mouse down. Prefer self-contained actions like [`method: Locator.click`] that do not rely on the state being unchanged by a handler.
:::

**Usage**

An example that closes a "Sign up to the newsletter" dialog when it appears:

```js
// Setup the handler.
await page.addLocatorHandler(page.getByText('Sign up to the newsletter'), async () => {
  await page.getByRole('button', { name: 'No thanks' }).click();
});

// Write the test as usual.
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Start here' }).click();
```

```java
// Setup the handler.
page.addLocatorHandler(page.getByText("Sign up to the newsletter"), () -> {
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("No thanks")).click();
});

// Write the test as usual.
page.navigate("https://example.com");
page.getByRole("button", Page.GetByRoleOptions().setName("Start here")).click();
```

```python
# Setup the handler.
def handler():
  page.get_by_role("button", name="No thanks").click()
page.add_locator_handler(page.get_by_text("Sign up to the newsletter"), handler)

# Write the test as usual.
page.goto("https://example.com")
page.get_by_role("button", name="Start here").click()
```

```python
# Setup the handler.
async def handler():
  await page.get_by_role("button", name="No thanks").click()
await page.add_locator_handler(page.get_by_text("Sign up to the newsletter"), handler)

# Write the test as usual.
await page.goto("https://example.com")
await page.get_by_role("button", name="Start here").click()
```

```csharp
// Setup the handler.
await page.AddLocatorHandlerAsync(page.GetByText("Sign up to the newsletter"), async () => {
  await page.GetByRole(AriaRole.Button, new() { Name = "No thanks" }).ClickAsync();
});

// Write the test as usual.
await page.GotoAsync("https://example.com");
await page.GetByRole("button", new() { Name = "Start here" }).ClickAsync();
```

An example that skips the "Confirm your security details" page when it is shown:

```js
// Setup the handler.
await page.addLocatorHandler(page.getByText('Confirm your security details'), async () => {
  await page.getByRole('button', { name: 'Remind me later' }).click();
});

// Write the test as usual.
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Start here' }).click();
```

```java
// Setup the handler.
page.addLocatorHandler(page.getByText("Confirm your security details"), () -> {
  page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Remind me later")).click();
});

// Write the test as usual.
page.navigate("https://example.com");
page.getByRole("button", Page.GetByRoleOptions().setName("Start here")).click();
```

```python
# Setup the handler.
def handler():
  page.get_by_role("button", name="Remind me later").click()
page.add_locator_handler(page.get_by_text("Confirm your security details"), handler)

# Write the test as usual.
page.goto("https://example.com")
page.get_by_role("button", name="Start here").click()
```

```python
# Setup the handler.
async def handler():
  await page.get_by_role("button", name="Remind me later").click()
await page.add_locator_handler(page.get_by_text("Confirm your security details"), handler)

# Write the test as usual.
await page.goto("https://example.com")
await page.get_by_role("button", name="Start here").click()
```

```csharp
// Setup the handler.
await page.AddLocatorHandlerAsync(page.GetByText("Confirm your security details"), async () => {
  await page.GetByRole(AriaRole.Button, new() { Name = "Remind me later" }).ClickAsync();
});

// Write the test as usual.
await page.GotoAsync("https://example.com");
await page.GetByRole("button", new() { Name = "Start here" }).ClickAsync();
```

An example with a custom callback on every actionability check. It uses a `<body>` locator that is always visible, so the handler is called before every actionability check. It is important to specify [`option: noWaitAfter`], because the handler does not hide the `<body>` element.

```js
// Setup the handler.
await page.addLocatorHandler(page.locator('body'), async () => {
  await page.evaluate(() => window.removeObstructionsForTestIfNeeded());
}, { noWaitAfter: true });

// Write the test as usual.
await page.goto('https://example.com');
await page.getByRole('button', { name: 'Start here' }).click();
```

```java
// Setup the handler.
page.addLocatorHandler(page.locator("body"), () -> {
  page.evaluate("window.removeObstructionsForTestIfNeeded()");
}, new Page.AddLocatorHandlerOptions().setNoWaitAfter(true));

// Write the test as usual.
page.navigate("https://example.com");
page.getByRole("button", Page.GetByRoleOptions().setName("Start here")).click();
```

```python
# Setup the handler.
def handler():
  page.evaluate("window.removeObstructionsForTestIfNeeded()")
page.add_locator_handler(page.locator("body"), handler, no_wait_after=True)

# Write the test as usual.
page.goto("https://example.com")
page.get_by_role("button", name="Start here").click()
```

```python
# Setup the handler.
async def handler():
  await page.evaluate("window.removeObstructionsForTestIfNeeded()")
await page.add_locator_handler(page.locator("body"), handler, no_wait_after=True)

# Write the test as usual.
await page.goto("https://example.com")
await page.get_by_role("button", name="Start here").click()
```

```csharp
// Setup the handler.
await page.AddLocatorHandlerAsync(page.Locator("body"), async () => {
  await page.EvaluateAsync("window.removeObstructionsForTestIfNeeded()");
}, new() { NoWaitAfter = true });

// Write the test as usual.
await page.GotoAsync("https://example.com");
await page.GetByRole("button", new() { Name = "Start here" }).ClickAsync();
```

Handler takes the original locator as an argument. You can also automatically remove the handler after a number of invocations by setting [`option: times`]:

```js
await page.addLocatorHandler(page.getByLabel('Close'), async locator => {
  await locator.click();
}, { times: 1 });
```

```java
page.addLocatorHandler(page.getByLabel("Close"), locator -> {
  locator.click();
}, new Page.AddLocatorHandlerOptions().setTimes(1));
```

```python
def handler(locator):
  locator.click()
page.add_locator_handler(page.get_by_label("Close"), handler, times=1)
```

```python
async def handler(locator):
  await locator.click()
await page.add_locator_handler(page.get_by_label("Close"), handler, times=1)
```

```csharp
await page.AddLocatorHandlerAsync(page.GetByText("Sign up to the newsletter"), async locator => {
  await locator.ClickAsync();
}, new() { Times = 1 });
```

### param: Page.addLocatorHandler.locator
* since: v1.42
- `locator` <[Locator]>

Locator that triggers the handler.

### param: Page.addLocatorHandler.handler
* langs: js
* since: v1.42
- `handler` <[function]\([Locator]\): [Promise<any>]>

Function that should be run once [`param: locator`] appears. This function should get rid of the element that blocks actions like click.

### param: Page.addLocatorHandler.handler
* langs: python
* since: v1.42
- `handler` <[function]\([Locator]\)|[function]\(\): [Promise<any>]>

Function that should be run once [`param: locator`] appears. This function should get rid of the element that blocks actions like click.

### param: Page.addLocatorHandler.handler
* langs: csharp
* since: v1.42
- `handler` <[function]\([Locator]\): [Promise<any>]>

Function that should be run once [`param: locator`] appears. This function should get rid of the element that blocks actions like click.

### param: Page.addLocatorHandler.handler
* langs: java
* since: v1.42
- `handler` <[function]\([Locator]\)>

Function that should be run once [`param: locator`] appears. This function should get rid of the element that blocks actions like click.

### option: Page.addLocatorHandler.times
* since: v1.44
- `times` <[int]>

Specifies the maximum number of times this handler should be called. Unlimited by default.

### option: Page.addLocatorHandler.noWaitAfter
* since: v1.44
- `noWaitAfter` <[boolean]>

By default, after calling the handler Playwright will wait until the overlay becomes hidden, and only then Playwright will continue with the action/assertion that triggered the handler. This option allows to opt-out of this behavior, so that overlay can stay visible after the handler has run.

## async method: Page.removeAllListeners
* since: v1.47
* langs: js

Removes all the listeners of the given type (or all registered listeners if no type given).
Allows to wait for async listeners to complete or to ignore subsequent errors from these listeners.

**Usage**

```js
page.on('request', async request => {
  const response = await request.response();
  const body = await response.body();
  console.log(body.byteLength);
});
await page.goto('https://playwright.dev', { waitUntil: 'domcontentloaded' });
// Waits for all the reported 'request' events to resolve.
await page.removeAllListeners('request', { behavior: 'wait' });
```

### param: Page.removeAllListeners.type
* since: v1.47
- `type` ?<[string]>

### option: Page.removeAllListeners.behavior = %%-remove-all-listeners-options-behavior-%%
* since: v1.47

## async method: Page.removeLocatorHandler
* since: v1.44

Removes all locator handlers added by [`method: Page.addLocatorHandler`] for a specific locator.

### param: Page.removeLocatorHandler.locator
* since: v1.44
- `locator` <[Locator]>

Locator passed to [`method: Page.addLocatorHandler`].

## async method: Page.reload
* since: v1.8
- returns: <[null]|[Response]>

This method reloads the current page, in the same way as if the user had triggered a browser refresh.
Returns the main resource response. In case of multiple redirects, the navigation will resolve with the response of the
last redirect.

### option: Page.reload.waitUntil = %%-navigation-wait-until-%%
* since: v1.8

### option: Page.reload.timeout = %%-navigation-timeout-%%
* since: v1.8

### option: Page.reload.timeout = %%-navigation-timeout-js-%%
* since: v1.8

## property: Page.request
* since: v1.16
* langs:
  - alias-csharp: APIRequest
- type: <[APIRequestContext]>

API testing helper associated with this page. This method returns the same instance as
[`property: BrowserContext.request`] on the page's context. See [`property: BrowserContext.request`] for more details.
