---
title: "HttpClient class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClient class (part 6 of 7)

## HttpClient.PostAsync(Uri, HttpContent, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PostAsync (Uri? requestUri, System.Net.Http.HttpContent? content, System.Threading.CancellationToken <example-value>);
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
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.PutAsync(String, HttpContent) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsync (string? requestUri, System.Net.Http.HttpContent? content);
```

Sends a PUT request to the specified URI as an asynchronous operation.

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

## HttpClient.PutAsync(Uri, HttpContent) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsync (Uri? requestUri, System.Net.Http.HttpContent? content);
```

Sends a PUT request to the specified URI as an asynchronous operation.

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

## HttpClient.PutAsync(String, HttpContent, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsync (string? requestUri, System.Net.Http.HttpContent? content, System.Threading.CancellationToken <example-value>);
```

Sends a PUT request with a cancellation token as an asynchronous operation.

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

## HttpClient.PutAsync(Uri, HttpContent, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> PutAsync (Uri? requestUri, System.Net.Http.HttpContent? content, System.Threading.CancellationToken <example-value>);
```

Sends a PUT request with a cancellation token as an asynchronous operation.

Parameters:

- `requestUri`: The URI the request is sent to.
- `content`: The HTTP request content sent to the server.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `InvalidOperationException`: The `requestUri` is not an absolute URI and `HttpClient.BaseAddress` isn't set.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete after the whole response (including content) is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

## HttpClient.Send(HttpRequestMessage) method

```csharp
public System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request);
```

Sends an HTTP request with the specified request.

Parameters:

- `request`: The HTTP request message to send.

Returns: An HTTP response message.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `NotSupportedException`: The HTTP version is 2.0 or higher or the version policy is set to `HttpVersionPolicy.RequestVersionOrHigher`.

-or-

The custom class derived from `HttpContent` does not override the `HttpContent.SerializeToStream` method.

-or-

The custom `HttpMessageHandler` does not override the `HttpMessageHandler.Send` method.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`.
- `OperationCanceledException`: If the `OperationCanceledException` exception nests the `TimeoutException`:
The request failed due to timeout.

To be added.

## HttpClient.Send(HttpRequestMessage, HttpCompletionOption) method

```csharp
public System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Net.Http.HttpCompletionOption completionOption);
```

Sends an HTTP request.

Parameters:

- `request`: The HTTP request message to send.
- `completionOption`: One of the enumeration values that specifies when the operation should complete (as soon as a response is available or after reading the response content).

Returns: The HTTP response message.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `NotSupportedException`: The HTTP version is 2.0 or higher or the version policy is set to `HttpVersionPolicy.RequestVersionOrHigher`.

-or-

The custom class derived from `HttpContent` does not override the `HttpContent.SerializeToStream` method.

-or-

The custom `HttpMessageHandler` does not override the `HttpMessageHandler.Send` method.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`.
- `OperationCanceledException`: If the `OperationCanceledException` exception nests the `TimeoutException`:
The request failed due to timeout.

To be added.

## HttpClient.Send(HttpRequestMessage, CancellationToken) method

```csharp
public override System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request with the specified request and cancellation token.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The token to cancel the operation.

Returns: The HTTP response message.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `NotSupportedException`: The HTTP version is 2.0 or higher or the version policy is set to `HttpVersionPolicy.RequestVersionOrHigher`.

-or-

The custom class derived from `HttpContent` does not override the `HttpContent.SerializeToStream` method.

-or-

The custom `HttpMessageHandler` does not override the `HttpMessageHandler.Send` method.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

To be added.

## HttpClient.Send(HttpRequestMessage, HttpCompletionOption, CancellationToken) method

```csharp
public System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Net.Http.HttpCompletionOption completionOption, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request with the specified request, completion option and cancellation token.

Parameters:

- `request`: The HTTP request message to send.
- `completionOption`: One of the enumeration values that specifies when the operation should complete (as soon as a response is available or after reading the response content).
- `cancellationToken`: The token to cancel the operation.

Returns: The HTTP response message.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `NotSupportedException`: The HTTP version is 2.0 or higher or the version policy is set to `HttpVersionPolicy.RequestVersionOrHigher`.

-or-

The custom class derived from `HttpContent` does not override the `HttpContent.SerializeToStream` method.

-or-

The custom `HttpMessageHandler` does not override the `HttpMessageHandler.Send` method.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

To be added.

## HttpClient.SendAsync(HttpRequestMessage) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request);
```

Sends an HTTP request as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete once the entire response including content is read. The behavior is the same as if `ResponseContentRead` has been explicitly specified.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Send`.
