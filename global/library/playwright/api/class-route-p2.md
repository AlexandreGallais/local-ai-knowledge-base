---
title: "class: Route (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-route.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Route (part 2 of 2)

## async method: Route.fetch
* since: v1.29
- returns: <[APIResponse]>

Performs the request and fetches result without fulfilling it, so that the response
could be modified and then fulfilled.

**Usage**

```js
await page.route('https://dog.ceo/api/breeds/list/all', async route => {
  const response = await route.fetch();
  const json = await response.json();
  json.message['big_red_dog'] = [];
  await route.fulfill({ response, json });
});
```

```java
page.route("https://dog.ceo/api/breeds/list/all", route -> {
  APIResponse response = route.fetch();
  JsonObject json = new Gson().fromJson(response.text(), JsonObject.class);
  JsonObject message = itemObj.get("json").getAsJsonObject();
  message.set("big_red_dog", new JsonArray());
  route.fulfill(new Route.FulfillOptions()
    .setResponse(response)
    .setBody(json.toString()));
});
```

```python
async def handle(route):
    response = await route.fetch()
    json = await response.json()
    json["message"]["big_red_dog"] = []
    await route.fulfill(response=response, json=json)

await page.route("https://dog.ceo/api/breeds/list/all", handle)
```

```python
def handle(route):
    response = route.fetch()
    json = response.json()
    json["message"]["big_red_dog"] = []
    route.fulfill(response=response, json=json)

page.route("https://dog.ceo/api/breeds/list/all", handle)
```

```csharp
await page.RouteAsync("https://dog.ceo/api/breeds/list/all", async route =>
{
    var response = await route.FetchAsync();
    dynamic json = await response.JsonAsync();
    json.message.big_red_dog = new string[] {};
    await route.FulfillAsync(new() { Response = response, Json = json });
});
```

**Details**

Note that [`option: headers`] option will apply to the fetched request as well as any redirects initiated by it. If you want to only apply [`option: headers`] to the original request, but not to redirects, look into [`method: Route.continue`] instead.

### option: Route.fetch.url
* since: v1.29
- `url` <[string]>

If set changes the request URL. New URL must have same protocol as original one.

### option: Route.fetch.maxRedirects
* since: v1.31
- `maxRedirects` <[int]>

Maximum number of request redirects that will be followed automatically. An error will be thrown if the number is exceeded.
Defaults to `20`. Pass `0` to not follow redirects.

### option: Route.fetch.maxRetries
* since: v1.46
- `maxRetries` <[int]>

Maximum number of times network errors should be retried. Currently only `ECONNRESET` error is retried. Does not retry based on HTTP response codes. An error will be thrown if the limit is exceeded. Defaults to `0` - no retries.

### option: Route.fetch.timeout
* since: v1.33
- `timeout` <[float]>

Request timeout in milliseconds. Defaults to `30000` (30 seconds). Pass `0` to disable timeout.

### option: Route.fetch.method
* since: v1.29
- `method` <[string]>

If set changes the request method (e.g. GET or POST).

### option: Route.fetch.postData
* langs: js, python
* since: v1.29
- `postData` <[string]|[Buffer]|[Serializable]>

Allows to set post data of the request. If the data parameter is an object, it will be serialized to json string
and `content-type` header will be set to `application/json` if not explicitly set. Otherwise the `content-type` header will be
set to `application/octet-stream` if not explicitly set.

### option: Route.fetch.postData
* langs: java
* since: v1.29
- `postData` <[string]|[Buffer]>

If set changes the post data of request.

### option: Route.fetch.postData
* since: v1.29
* langs: csharp
- `postData` <[Buffer]>

If set changes the post data of request.

### option: Route.fetch.headers
* since: v1.29
- `headers` <[Object]<[string], [string]>>

If set changes the request HTTP headers. Header values will be converted to a string.

## async method: Route.fulfill
* since: v1.8

Fulfills route's request with given response.

**Usage**

An example of fulfilling all requests with 404 responses:

```js
await page.route('**/*', async route => {
  await route.fulfill({
    status: 404,
    contentType: 'text/plain',
    body: 'Not Found!'
  });
});
```

```java
page.route("**/*", route -> {
  route.fulfill(new Route.FulfillOptions()
    .setStatus(404)
    .setContentType("text/plain")
    .setBody("Not Found!"));
});
```

```python
await page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

```python
page.route("**/*", lambda route: route.fulfill(
    status=404,
    content_type="text/plain",
    body="not found!"))
```

```csharp
await page.RouteAsync("**/*", route => route.FulfillAsync(new ()
{
    Status = 404,
    ContentType = "text/plain",
    Body = "Not Found!"
}));
```

An example of serving static file:

```js
await page.route('**/xhr_endpoint', route => route.fulfill({ path: 'mock_data.json' }));
```

```java
page.route("**/xhr_endpoint", route -> route.fulfill(
  new Route.FulfillOptions().setPath(Paths.get("mock_data.json"))));
```

```python
await page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

```python
page.route("**/xhr_endpoint", lambda route: route.fulfill(path="mock_data.json"))
```

```csharp
await page.RouteAsync("**/xhr_endpoint", route => route.FulfillAsync(new() { Path = "mock_data.json" }));
```

### option: Route.fulfill.status
* since: v1.8
- `status` <[int]>

Response status code, defaults to `200`.

### option: Route.fulfill.headers
* since: v1.8
- `headers` <[Object]<[string], [string]>>

Response headers. Header values will be converted to a string.

### option: Route.fulfill.contentType
* since: v1.8
- `contentType` <[string]>

If set, equals to setting `Content-Type` response header.

### option: Route.fulfill.body
* since: v1.8
* langs: js, python
- `body` <[string]|[Buffer]>

Response body.

### option: Route.fulfill.body
* since: v1.8
* langs: csharp, java
- `body` <[string]>

Optional response body as text.

### option: Route.fulfill.bodyBytes
* since: v1.9
* langs: csharp, java
- `bodyBytes` <[Buffer]>

Optional response body as raw bytes.

### option: Route.fulfill.json
* since: v1.29
* langs: js, python, csharp
- `json` <[Serializable]>

JSON response. This method will set the content type to `application/json` if not set.

### option: Route.fulfill.path
* since: v1.8
- `path` <[path]>

File path to respond with. The content type will be inferred from file extension. If `path` is a relative path, then it
is resolved relative to the current working directory.

### option: Route.fulfill.response
* since: v1.15
- `response` <[APIResponse]>

[APIResponse] to fulfill route's request with. Individual fields of the response (such as headers) can be overridden using fulfill options.

## method: Route.request
* since: v1.8
- returns: <[Request]>

A request to be routed.
