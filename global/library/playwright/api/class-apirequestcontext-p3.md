---
title: "class: APIRequestContext (part 3 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/api/class-apirequestcontext.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: APIRequestContext (part 3 of 3)

## async method: APIRequestContext.post
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) POST request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

**Usage**

JSON objects can be passed directly to the request:

```js
await request.post('https://example.com/api/createBook', {
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
request.post("https://example.com/api/createBook", RequestOptions.create().setData(data));
```

```python
data = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.post("https://example.com/api/createBook", data=data)
```

```csharp
var data = new Dictionary<string, object>() {
  { "firstName", "John" },
  { "lastName", "Doe" }
};
await request.PostAsync("https://example.com/api/createBook", new() { DataObject = data });
```

To send form data to the server use `form` option. Its value will be encoded into the request body with `application/x-www-form-urlencoded` encoding (see below how to use `multipart/form-data` form encoding to send files):

```js
await request.post('https://example.com/api/findBook', {
  form: {
    title: 'Book Title',
    author: 'John Doe',
  }
});
```

```java
request.post("https://example.com/api/findBook", RequestOptions.create().setForm(
    FormData.create().set("title", "Book Title").set("body", "John Doe")
));
```

```python
formData = {
    "title": "Book Title",
    "body": "John Doe",
}
api_request_context.post("https://example.com/api/findBook", form=formData)
```

```csharp
var formData = Context.APIRequest.CreateFormData();
formData.Set("title", "Book Title");
formData.Set("body", "John Doe");
await request.PostAsync("https://example.com/api/findBook", new() { Form = formData });
```

The common way to send file(s) in the body of a request is to upload them as form fields with `multipart/form-data` encoding. Use [FormData] to construct request body and pass it to the request as `multipart` parameter:

```js
const form = new FormData();
form.set('name', 'John');
form.append('name', 'Doe');
// Send two file fields with the same name.
form.append('file', new File(['console.log(2024);'], 'f1.js', { type: 'text/javascript' }));
form.append('file', new File(['hello'], 'f2.txt', { type: 'text/plain' }));
await request.post('https://example.com/api/uploadForm', {
  multipart: form
});
```

```java
// Pass file path to the form data constructor:
Path file = Paths.get("team.csv");
APIResponse response = request.post("https://example.com/api/uploadTeamList",
  RequestOptions.create().setMultipart(
    FormData.create().set("fileField", file)));

// Or you can pass the file content directly as FilePayload object:
FilePayload filePayload1 = new FilePayload("f1.js", "text/javascript",
      "console.log(2022);".getBytes(StandardCharsets.UTF_8));
APIResponse response = request.post("https://example.com/api/uploadScript",
  RequestOptions.create().setMultipart(
    FormData.create().set("fileField", filePayload)));
```

```python
api_request_context.post(
  "https://example.com/api/uploadScript'",
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
await request.PostAsync("https://example.com/api/uploadScript", new() { Multipart = multipart });
```

### param: APIRequestContext.post.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.post.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.post.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.post.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.post.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.post.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.post.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.post.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.post.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.post.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.post.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.post.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.post.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.post.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.post.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.post.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.post.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.post.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.post.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.put
* since: v1.16
- returns: <[APIResponse]>

Sends HTTP(S) PUT request and returns its response.
The method will populate request cookies from the context and update
context cookies from the response. The method will automatically follow redirects.

### param: APIRequestContext.put.url = %%-fetch-param-url-%%
* since: v1.16

### option: APIRequestContext.put.params = %%-js-fetch-option-params-%%
* since: v1.16

### param: APIRequestContext.put.params = %%-java-fetch-params-%%
* since: v1.18

### option: APIRequestContext.put.params = %%-python-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.put.params = %%-csharp-fetch-option-params-%%
* since: v1.16

### option: APIRequestContext.put.paramsString = %%-csharp-fetch-option-paramsString-%%
* since: v1.47

### option: APIRequestContext.put.headers = %%-js-python-csharp-fetch-option-headers-%%
* since: v1.16

### option: APIRequestContext.put.data = %%-js-python-csharp-fetch-option-data-%%
* since: v1.16

### option: APIRequestContext.put.form = %%-python-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.put.form = %%-js-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.put.form = %%-csharp-fetch-option-form-%%
* since: v1.16

### option: APIRequestContext.put.multipart = %%-js-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.put.multipart = %%-python-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.put.multipart = %%-csharp-fetch-option-multipart-%%
* since: v1.16

### option: APIRequestContext.put.timeout = %%-js-python-csharp-fetch-option-timeout-%%
* since: v1.16

### option: APIRequestContext.put.failOnStatusCode = %%-js-python-csharp-fetch-option-failonstatuscode-%%
* since: v1.16

### option: APIRequestContext.put.ignoreHTTPSErrors = %%-js-python-csharp-fetch-option-ignorehttpserrors-%%
* since: v1.16

### option: APIRequestContext.put.maxRedirects = %%-js-python-csharp-fetch-option-maxredirects-%%
* since: v1.26

### option: APIRequestContext.put.maxRetries = %%-js-python-csharp-fetch-option-maxretries-%%
* since: v1.46

## async method: APIRequestContext.storageState
* since: v1.16
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

Returns storage state for this request context, contains current cookies and local storage snapshot if it was passed to the constructor.

## async method: APIRequestContext.storageState
* since: v1.16
* langs: java, csharp
- returns: <[string]>

### option: APIRequestContext.storageState.path = %%-storagestate-option-path-%%
* since: v1.16

### option: APIRequestContext.storageState.indexedDB
* since: v1.51
- `indexedDB` ?<boolean>

Set to `true` to include IndexedDB in the storage state snapshot.

### option: APIRequestContext.storageState.opfs
* since: v1.63
- `opfs` ?<boolean>

Set to `true` to include the origin private file system in the storage state snapshot.

## property: APIRequestContext.tracing
* since: v1.60
- type: <[Tracing]>

Tracing recorder for requests made through this API request context.
