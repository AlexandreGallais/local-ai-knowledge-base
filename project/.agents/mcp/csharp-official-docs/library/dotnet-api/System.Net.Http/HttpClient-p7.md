---
title: "HttpClient class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpClient.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClient class (part 7 of 7)

## HttpClient.SendAsync(HttpRequestMessage, HttpCompletionOption) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Net.Http.HttpCompletionOption completionOption);
```

Sends an HTTP request as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send.
- `completionOption`: When the operation should complete (as soon as a response is available or after reading the whole response content).

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The request failed due to timeout.

#### Remarks
This operation doesn't block. Depending on the value of the `completionOption` parameter, the returned `Task<T>` object will complete as soon as a response is available or the entire response including content is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Send`.

## HttpClient.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The cancellation token to cancel operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. The returned `Task<T>` object will complete once the entire response including content is read. The behavior is the same as if `ResponseContentRead` has been explicitly specified.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Send`.

## HttpClient.SendAsync(HttpRequestMessage, HttpCompletionOption, CancellationToken) method

```csharp
public System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Net.Http.HttpCompletionOption completionOption, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send.
- `completionOption`: When the operation should complete (as soon as a response is available or after reading the whole response content).
- `cancellationToken`: The cancellation token to cancel operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` is `null`.
- `InvalidOperationException`: The request message was already sent by the `HttpClient` instance.
- `HttpRequestException`: The request failed due to an issue getting a valid HTTP response, such as network connectivity failure, DNS failure, server certificate validation error, or invalid server response. On .NET 8 and later versions, the reason is indicated by `HttpRequestException.HttpRequestError`
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

-or-

The request failed due to timeout.

#### Remarks
This operation doesn't block. Depending on the value of the `completionOption` parameter, the returned `Task<T>` object will complete as soon as a response is available or the entire response including content is read.

> **Note:**
> In case of timeout, an `OperationCanceledException` that nests a `TimeoutException` is thrown.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `Send`.
