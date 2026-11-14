---
title: "HttpClient class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClient class (part 5 of 7)

## HttpClient.GetStringAsync(Uri) method

```csharp
public System.Threading.Tasks.Task<string> GetStringAsync (Uri? requestUri);
```

Sends a GET request to the specified URI and return the response body as a string in an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`

-or-

The response status code was outside of the range of 200-299 (which indicate success according to the standard).
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response body is read.
Internally, this operation uses `HttpResponseMessage.EnsureSuccessStatusCode` to ensure the response status code is in the success range (200-299) and throws an `HttpRequestException` if it is not.
In some scenarios, you might need more control over which status codes are considered to be successful; for example, an API might be expected to always return `200 OK`. In such cases, we recommend to manually check if `StatusCode` matches the expected value.

> **Note:**
> In case of a timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetStringAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<string> GetStringAsync (string? requestUri, System.Threading.CancellationToken <example-value>);
```

Sends a GET request to the specified URI and return the response body as a string in an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `requestUri` is `null`.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`

-or-

The response status code was outside of the range of 200-299 (which indicate success according to the standard).
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response body is read.
Internally, this operation uses `HttpResponseMessage.EnsureSuccessStatusCode` to ensure the response status code is in the success range (200-299) and throws an `HttpRequestException` if it is not.
In some scenarios, you might need more control over which status codes are considered to be successful; for example, an API might be expected to always return `200 OK`. In such cases, we recommend to manually check if `StatusCode` matches the expected value.

> **Note:**
> In case of a timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetStringAsync(Uri, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<string> GetStringAsync (Uri? requestUri, System.Threading.CancellationToken <example-value>);
```

Sends a GET request to the specified URI and return the response body as a string in an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `cancellationToken`: The cancellation token to cancel the operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `requestUri` is `null`.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`

-or-

The response status code was outside of the range of 200-299 (which indicate success according to the standard).
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response body is read.
Internally, this operation uses `HttpResponseMessage.EnsureSuccessStatusCode` to ensure the response status code is in the success range (200-299) and throws an `HttpRequestException` if it is not.
In some scenarios, you might need more control over which status codes are considered to be successful; for example, an API might be expected to always return `200 OK`. In such cases, we recommend to manually check if `StatusCode` matches the expected value.

> **Note:**
> In case of a timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.PatchAsync(String, HttpContent) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsync (string? requestUri, System.Net.Http.HttpContent? content);
```

Sends a PATCH request to a URI designated as a string as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`.
- `OperationCanceledException`: The request failed due to timeout.
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

## HttpClient.PatchAsync(Uri, HttpContent) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsync (Uri? requestUri, System.Net.Http.HttpContent? content);
```

Sends a PATCH request as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

## HttpClient.PatchAsync(String, HttpContent, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsync (string? requestUri, System.Net.Http.HttpContent? content, System.Threading.CancellationToken <example-value>);
```

Sends a PATCH request with a cancellation token to a URI represented as a string as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled or the request failed due to timeout.
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

## HttpClient.PatchAsync(Uri, HttpContent, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PatchAsync (Uri? requestUri, System.Net.Http.HttpContent? content, System.Threading.CancellationToken <example-value>);
```

Sends a PATCH request with a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled or the request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

## HttpClient.PostAsync(String, HttpContent) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsync (string? requestUri, System.Net.Http.HttpContent? content);
```

Sends a POST request to the specified URI as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.PostAsync(Uri, HttpContent) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsync (Uri? requestUri, System.Net.Http.HttpContent? content);
```

Sends a POST request to the specified URI as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.PostAsync(String, HttpContent, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsync (string? requestUri, System.Net.Http.HttpContent? content, System.Threading.CancellationToken <example-value>);
```

Sends a POST request with a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.
