---
title: "HttpClient class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClient class (part 3 of 7)

## HttpClient.GetAsync(String) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (string? requestUri);
```

Sends a GET request to the specified URI as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read. The behavior is the same as if `ResponseContentRead` has been explicitly specified.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetAsync(Uri) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (Uri? requestUri);
```

Sends a GET request to the specified URI as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read. The behavior is the same as if `ResponseContentRead` has been explicitly specified.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetAsync(String, HttpCompletionOption) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (string? requestUri, System.Net.Http.HttpCompletionOption completionOption);
```

Sends a GET request to the specified URI with an HTTP completion option as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `completionOption`: An HTTP completion option value that indicates when the operation should be considered completed.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an underlying issue such as network connectivity, DNS failure, server certificate validation or timeout.
- `OperationCanceledException`: The request failed due to timeout.
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete based on the `completionOption` parameter after the part or all of the response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetAsync(String, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (string? requestUri, System.Threading.CancellationToken <example-value>);
```

Sends a GET request to the specified URI with a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
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
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read. The behavior is the same as if `ResponseContentRead` has been explicitly specified.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetAsync(Uri, HttpCompletionOption) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (Uri? requestUri, System.Net.Http.HttpCompletionOption completionOption);
```

Sends a GET request to the specified URI with an HTTP completion option as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `completionOption`: An HTTP completion option value that indicates when the operation should be considered completed.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete based on the `completionOption` parameter after the part or all of the response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetAsync(Uri, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (Uri? requestUri, System.Threading.CancellationToken <example-value>);
```

Sends a GET request to the specified URI with a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: TThe request failed due to an issue getting an HTTP response such as network connectivity, DNS failure or server certificate validation. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read. The behavior is the same as if `ResponseContentRead` has been explicitly specified.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetAsync(String, HttpCompletionOption, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (string? requestUri, System.Net.Http.HttpCompletionOption completionOption, System.Threading.CancellationToken <example-value>);
```

Sends a GET request to the specified URI with an HTTP completion option and a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `completionOption`: An HTTP completion option value that indicates when the operation should be considered completed.
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
This operation doesn't block. The returned `Task<T>` object will complete based on the `completionOption` parameter after the part or all of the response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetAsync(Uri, HttpCompletionOption, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> GetAsync (Uri? requestUri, System.Net.Http.HttpCompletionOption completionOption, System.Threading.CancellationToken <example-value>);
```

Sends a GET request to the specified URI with an HTTP completion option and a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `completionOption`: An HTTP  completion option value that indicates when the operation should be considered completed.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete based on the `completionOption` parameter after the part or all of the response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.GetByteArrayAsync(String) method

```csharp
public System.Threading.Tasks.Task<byte[]> GetByteArrayAsync (string? requestUri);
```

Sends a GET request to the specified URI and return the response body as a byte array in an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`

-or-

The response status code was outside of the range of 200-299 (which indicate success according to the standard).
- `OperationCanceledException`: The request failed due to timeout.
- `UriFormatException`: The provided request URI is not valid relative or absolute URI.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response body is read.
Internally, this operation uses `HttpResponseMessage.EnsureSuccessStatusCode` to ensure the response status code is in the success range (200-299) and throws an `HttpRequestException` if it is not.
In some scenarios, you might need more control over which status codes are considered to be successful; for example, an API might be expected to always return `200 OK`. In such cases, we recommend to manually check if `StatusCode` matches the expected value.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.
