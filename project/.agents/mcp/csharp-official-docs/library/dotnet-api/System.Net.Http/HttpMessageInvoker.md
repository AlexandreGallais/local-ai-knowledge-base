---
title: "HttpMessageInvoker class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpMessageInvoker.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpMessageInvoker class

Namespace: `System.Net.Http`

```csharp
public class HttpMessageInvoker : IDisposable
```

A specialty class that allows applications to call the `HttpMessageInvoker.SendAsync` method on an HTTP handler chain.

#### Remarks
This class is the base type for `HttpClient` and other message originators.

Most applications that are connecting to a web site will use one of the `HttpClient.SendAsync` methods on the `HttpClient` class.

## HttpMessageInvoker.HttpMessageInvoker(HttpMessageHandler) constructor

```csharp
public HttpMessageInvoker (System.Net.Http.HttpMessageHandler handler);
```

Initializes an instance of a `HttpMessageInvoker` class with a specific `HttpMessageHandler`.

Parameters:

- `handler`: The `HttpMessageHandler` responsible for processing the HTTP response messages.

To be added.

## HttpMessageInvoker.HttpMessageInvoker(HttpMessageHandler, Boolean) constructor

```csharp
public HttpMessageInvoker (System.Net.Http.HttpMessageHandler handler, bool disposeHandler);
```

Initializes an instance of a `HttpMessageInvoker` class with a specific `HttpMessageHandler`.

Parameters:

- `handler`: The `HttpMessageHandler` responsible for processing the HTTP response messages.
- `disposeHandler`: `true` if the inner handler should be disposed of by Dispose(), `false` if you intend to reuse the inner handler.

To be added.

## HttpMessageInvoker.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources and disposes of the managed resources used by the `HttpMessageInvoker`.

To be added.

## HttpMessageInvoker.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpMessageInvoker` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

To be added.

## HttpMessageInvoker.Send(HttpRequestMessage, CancellationToken) method

```csharp
public virtual System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request with the specified request and cancellation token.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The cancellation token to cancel operation.

Returns: The HTTP response message.

Exceptions:

- `ArgumentNullException`: The `request` was `null`.
- `NotSupportedException`: For HTTP/2 and higher or when requesting version upgrade is enabled by `HttpVersionPolicy.RequestVersionOrHigher`.

-or-

If using custom class derived from `HttpContent` not overriding `HttpContent.SerializeToStream` method.

-or-

If using custom `HttpMessageHandler` not overriding `HttpMessageHandler.Send` method.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpMessageInvoker.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
public virtual System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The cancellation token to cancel operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` was `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation will not block. The returned `Task<T>` object will complete once the entire response including content is read.

Most applications that are connecting to a web site will use one of the `HttpClient.SendAsync` methods on the `HttpClient` class.
