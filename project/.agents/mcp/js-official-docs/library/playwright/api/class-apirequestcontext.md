---
title: "class: APIRequestContext (part 1 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-apirequestcontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: APIRequestContext
* since: v1.16

This API is used for the Web API testing. You can use it to trigger API endpoints, configure micro-services, prepare
environment or the service to your e2e test.

Each Playwright browser context has an associated [APIRequestContext], accessible via
[`property: BrowserContext.request`] or [`property: Page.request`] (these return the
**same instance** — `page.request` is a shortcut for `page.context().request`).
You can also create a standalone, isolated instance with [`method: APIRequest.newContext`].

**Cookie management**

The [APIRequestContext] returned by [`property: BrowserContext.request`] and
[`property: Page.request`] uses the same cookie jar as its [BrowserContext]:

- Every outgoing API request **automatically includes** the context's cookies in the
  `Cookie` header — you do not need to read cookies from the context and attach them manually.
- Any `Set-Cookie` headers in API responses are written back to the [BrowserContext],
  so subsequent page navigations and API calls pick them up.
- Logging in via the API logs in the browser, and vice versa.

If you want API requests that do **not** share cookies with the browser, create an
isolated context via [`method: APIRequest.newContext`]. Such `APIRequestContext`
object will have its own isolated cookie storage.

```python
import os
import asyncio
from playwright.async_api import async_playwright, Playwright

REPO = "test-repo-1"
USER = "github-username"
API_TOKEN = os.getenv("GITHUB_API_TOKEN")

async def run(playwright: Playwright):
    # This will launch a new browser, create a context and page. When making HTTP
    # requests with the internal APIRequestContext (e.g. `context.request` or `page.request`)
    # it will automatically set the cookies to the browser page and vice versa.
    browser = await playwright.chromium.launch()
    context = await browser.new_context(base_url="https://api.github.com")
    api_request_context = context.request
    page = await context.new_page()

    # Alternatively you can create a APIRequestContext manually without having a browser context attached:
    # api_request_context = await playwright.request.new_context(base_url="https://api.github.com")

    # Create a repository.
    response = await api_request_context.post(
        "/user/repos",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"<example-value>",
        },
        data={"name": REPO},
    )
    assert response.ok
    assert response.json()["name"] == REPO

    # Delete a repository.
    response = await api_request_context.delete(
        f"/repos/{USER}/{REPO}",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"<example-value>",
        },
    )
    assert response.ok
    assert await response.body() == '{"status": "ok"}'

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

asyncio.run(main())
```

```python
import os
from playwright.sync_api import sync_playwright

REPO = "test-repo-1"
USER = "github-username"
API_TOKEN = os.getenv("GITHUB_API_TOKEN")

with sync_playwright() as p:
    # This will launch a new browser, create a context and page. When making HTTP
    # requests with the internal APIRequestContext (e.g. `context.request` or `page.request`)
    # it will automatically set the cookies to the browser page and vice versa.
    browser = p.chromium.launch()
    context = browser.new_context(base_url="https://api.github.com")
    api_request_context = context.request
    page = context.new_page()

    # Alternatively you can create a APIRequestContext manually without having a browser context attached:
    # api_request_context = p.request.new_context(base_url="https://api.github.com")

    # Create a repository.
    response = api_request_context.post(
        "/user/repos",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"<example-value>",
        },
        data={"name": REPO},
    )
    assert response.ok
    assert response.json()["name"] == REPO

    # Delete a repository.
    response = api_request_context.delete(
        f"/repos/{USER}/{REPO}",
        headers={
            "Accept": "application/vnd.github.v3+json",
            # Add GitHub personal access token.
            "Authorization": f"<example-value>",
        },
    )
    assert response.ok
    assert await response.body() == '{"status": "ok"}'
```

## async method: APIRequestContext.addCookies
* since: v1.64

Adds cookies into this request context. They will be sent with matching subsequent requests. For [`property: BrowserContext.request`]
and [`property: Page.request`], this is equivalent to calling [`method: BrowserContext.addCookies`] on the corresponding browser context.

**Usage**

```js
await request.addCookies([cookieObject1, cookieObject2]);
```

```java
request.addCookies(Arrays.asList(cookieObject1, cookieObject2));
```

```python
await request.add_cookies([cookie_object1, cookie_object2])
```

```python
request.add_cookies([cookie_object1, cookie_object2])
```

```csharp
await request.AddCookiesAsync(new[] { cookie1, cookie2 });
```

### param: APIRequestContext.addCookies.cookies = %%-add-cookies-param-%%
* since: v1.64

## async method: APIRequestContext.clearCookies
* since: v1.64

Removes cookies from this request context. Accepts optional filter. For [`property: BrowserContext.request`]
and [`property: Page.request`], this is equivalent to calling [`method: BrowserContext.clearCookies`] on the corresponding browser context.

**Usage**

```js
await request.clearCookies();
await request.clearCookies({ name: 'session-id' });
await request.clearCookies({ domain: 'my-origin.com' });
await request.clearCookies({ domain: /.*my-origin\.com/ });
await request.clearCookies({ path: '/api/v1' });
await request.clearCookies({ name: 'session-id', domain: 'my-origin.com' });
```

```java
request.clearCookies();
request.clearCookies(new APIRequestContext.ClearCookiesOptions().setName("session-id"));
request.clearCookies(new APIRequestContext.ClearCookiesOptions().setDomain("my-origin.com"));
request.clearCookies(new APIRequestContext.ClearCookiesOptions().setPath("/api/v1"));
request.clearCookies(new APIRequestContext.ClearCookiesOptions()
                         .setName("session-id")
                         .setDomain("my-origin.com"));
```

```python
await request.clear_cookies()
await request.clear_cookies(name="session-id")
await request.clear_cookies(domain="my-origin.com")
await request.clear_cookies(path="/api/v1")
await request.clear_cookies(name="session-id", domain="my-origin.com")
```

```python
request.clear_cookies()
request.clear_cookies(name="session-id")
request.clear_cookies(domain="my-origin.com")
request.clear_cookies(path="/api/v1")
request.clear_cookies(name="session-id", domain="my-origin.com")
```

```csharp
await request.ClearCookiesAsync();
await request.ClearCookiesAsync(new() { Name = "session-id" });
await request.ClearCookiesAsync(new() { Domain = "my-origin.com" });
await request.ClearCookiesAsync(new() { Path = "/api/v1" });
await request.ClearCookiesAsync(new() { Name = "session-id", Domain = "my-origin.com" });
```

### option: APIRequestContext.clearCookies.name = %%-clear-cookies-option-name-%%
* since: v1.64

### option: APIRequestContext.clearCookies.domain = %%-clear-cookies-option-domain-%%
* since: v1.64

### option: APIRequestContext.clearCookies.path = %%-clear-cookies-option-path-%%
* since: v1.64

## async method: APIRequestContext.cookies
* since: v1.64
- returns: "Cookie" <[Array]<[Object]>>
  * alias-csharp: BrowserContextCookiesResult
  - `name` <[string]>
  - `value` <[string]>
  - `domain` <[string]>
  - `path` <[string]>
  - `expires` <[float]> Unix time in seconds.
  - `httpOnly` <[boolean]>
  - `secure` <[boolean]>
  - `sameSite` "SameSiteAttribute" <"Strict"|"Lax"|"None">
  - `partitionKey` ?<[string]>

If no URLs are specified, this method returns all cookies. If URLs are specified, only cookies that affect those URLs
are returned. For [`property: BrowserContext.request`] and [`property: Page.request`], this is equivalent to calling
[`method: BrowserContext.cookies`] on the corresponding browser context.

### param: APIRequestContext.cookies.urls = %%-cookies-param-urls-%%
* since: v1.64

## method: APIRequestContext.createFormData
* since: v1.23
* langs: csharp
- returns: <[FormData]>

Creates a new [FormData] instance which is used for providing form and multipart data when making HTTP requests.

## async method: APIRequestContext.delete
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) DELETE request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.delete.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.delete.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.delete.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.delete.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.delete.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.delete.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.delete.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.delete.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.17

### option: APIRequestContext.delete.form = %%-js-fetch-option-form-%%
* since: v1.17

### option: APIRequestContext.delete.form = %%-python-fetch-option-form-%%
* since: v1.17

### option: APIRequestContext.delete.form = %%-csharp-fetch-option-form-%%
* since: v1.17

### option: APIRequestContext.delete.multipart = %%-js-fetch-option-multipart-%%
* since: v1.17

### option: APIRequestContext.delete.multipart = %%-python-fetch-option-multipart-%%
* since: v1.17

### option: APIRequestContext.delete.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.17

### option: APIRequestContext.delete.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.delete.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.delete.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.delete.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.delete.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.dispose
* since: v1.16

All responses returned by [`method: APIRequestContext.get`] and similar methods are stored in the memory, so that you can later call [`method: APIResponse.body`].This method discards all its resources, calling any method on disposed [APIRequestContext] will throw an exception.

### option: APIRequestContext.dispose.reason
* since: v1.45
- `reason` <[string]>

The reason to be reported to the operations interrupted by the context disposal.
