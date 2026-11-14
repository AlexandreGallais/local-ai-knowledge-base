---
title: "class: APIRequestContext (part 2 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-apirequestcontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: APIRequestContext (part 2 of 3)

## async method: APIRequestContext.fetch
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) request and returns its response. The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```js
await request.fetch('https://example.com/api/createBook', {
  method: 'post',
  data: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

```java
Map<String, Object> data = new HashMap();
data.put("title", "Book Title");
data.put("body", "John Doe");
request.fetch("https://example.com/api/createBook", RequestOptions.create().setMethod("post").setData(data));
```

```python
data = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.fetch("https://example.com/api/createBook", method="post", data=data)
```

```csharp
var data = new Dictionary<string, object>() {
  { "title", "Book Title" },
  { "body", "John Doe" }
};
await Request.FetchAsync("https://example.com/api/createBook", new() { Method = "post", DataObject = data });
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding, by specifiying the `multipart` parameter:

```js
const form = new FormData();
form.set('name', 'John');
form.append('name', 'Doe');
// Send two file fields with the same name.
form.append('file', new File(['console.log(2024);'], 'f1.js', { type: 'text/javascript' }));
form.append('file', new File(['hello'], 'f2.txt', { type: 'text/plain' }));
await request.fetch('https://example.com/api/uploadForm', {
  multipart: form
});
```

```java
// Pass file path to the form data constructor:
Path file = Paths.get("team.csv");
APIResponse response = request.fetch("https://example.com/api/uploadTeamList",
  RequestOptions.create().setMethod("post").setMultipart(
    FormData.create().set("fileField", file)));

// Or you can pass the file content directly as FilePayload object:
FilePayload filePayload = new FilePayload("f.js", "text/javascript",
      "console.log(2022);".getBytes(StandardCharsets.UTF_8));
APIResponse response = request.fetch("https://example.com/api/uploadScript",
  RequestOptions.create().setMethod("post").setMultipart(
    FormData.create().set("fileField", filePayload)));
```

```python
api_request_context.fetch(
  "https://example.com/api/uploadScript",  method="post",
  multipart={
    "fileField": {
      "name": "f.js",
      "mimeType": "text/javascript",
      "buffer": b"console.log(2022);",
    },
  })
```

```csharp
var file = new FilePayload()
{
    Name = "f.js",
    MimeType = "text/javascript",
    Buffer = System.Text.Encoding.UTF8.GetBytes("console.log(2022);")
};
var multipart = Context.APIRequest.CreateFormData();
multipart.Set("fileField", file);
await Request.FetchAsync("https://example.com/api/uploadScript", new() { Method = "post", Multipart = multipart });
```

### param: APIRequestContext.fetch.urlOrRequest
* since: v1.16
- `urlOrRequest` <[string]|[Request]>

Target URL or Request to get all parameters from.

### option: APIRequestContext.fetch.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.fetch.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.fetch.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.fetch.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.fetch.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.fetch.method
* since: v1.16
* langs: js, python, csharp
- `method` <[string]>

If set changes the fetch method (e.g. PUT or
POST). If not specified, GET method is used.

### option: APIRequestContext.fetch.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.fetch.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.fetch.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.fetch.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.fetch.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.fetch.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.fetch.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.fetch.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.fetch.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.fetch.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.fetch.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.fetch.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.fetch.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.get
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) GET request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

**Usage**

Request parameters can be configured with `params` option, they will be serialized into the URL search parameters:

```js
// Passing params as object
await request.get('https://example.com/api/getText', {
  params: {
    'isbn': '1234',
    'page': 23,
  }
});

// Passing params as URLSearchParams
const searchParams = new URLSearchParams();
searchParams.set('isbn', '1234');
searchParams.append('page', 23);
searchParams.append('page', 24);
await request.get('https://example.com/api/getText', { params: searchParams });

// Passing params as string
const queryString = 'isbn=1234&page=23&page=24';
await request.get('https://example.com/api/getText', { params: queryString });
```

```java
request.get("https://example.com/api/getText", RequestOptions.create()
  .setQueryParam("isbn", "1234")
  .setQueryParam("page", 23));
```

```python
query_params = {
  "isbn": "1234",
  "page": "23"
}
api_request_context.get("https://example.com/api/getText", params=query_params)
```

```csharp
var queryParams = new Dictionary<string, object>()
{
  { "isbn", "1234" },
  { "page", 23 },
};
await request.GetAsync("https://example.com/api/getText", new() { Params = queryParams });
```

### param: APIRequestContext.get.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.get.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.get.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.get.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.get.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.get.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.get.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.get.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.26

### option: APIRequestContext.get.form = %%-js-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.get.form = %%-python-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.get.form = %%-csharp-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.get.multipart = %%-js-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.get.multipart = %%-python-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.get.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.get.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.get.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.get.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.get.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.get.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.head
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) HEAD request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.head.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.head.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.head.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.head.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.head.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.head.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.head.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.head.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.26

### option: APIRequestContext.head.form = %%-python-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.head.form = %%-js-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.head.form = %%-csharp-fetch-option-form-%%
* since: v1.26

### option: APIRequestContext.head.multipart = %%-js-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.head.multipart = %%-python-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.head.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.26

### option: APIRequestContext.head.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.head.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.head.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.head.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.head.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.patch
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) PATCH request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.patch.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.patch.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.patch.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.patch.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.patch.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.patch.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.patch.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.patch.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.patch.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.patch.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.patch.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.patch.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.patch.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.patch.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.patch.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.patch.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.patch.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.patch.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.patch.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46
