---
title: "HttpMessageHandler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpMessageHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpMessageHandler class

Namespace: `System.Net.Http`

```csharp
public abstract class HttpMessageHandler : IDisposable
```

A base type for HTTP message handlers.

#### Remarks
There are various HTTP message handlers that can be used. These include the following.

1.  `DelegatingHandler` - A class used to plug a handler into a handler chain.

2.  `HttpMessageHandler` - A simple class to derive from that supports the most common requirements for most applications.

3.  `HttpClientHandler` - A class that operates at the bottom of the handler chain that actually handles the HTTP transport operations.

4.  `WebRequestHandler` - A specialty class that operates at the bottom of the handler chain class that handles HTTP transport operations with options that are specific to the `HttpWebRequest` object.

If developers derive classes from `HttpMessageHandler` and override the `HttpMessageHandler.SendAsync` method, they must make sure that `HttpMessageHandler.SendAsync` can get called concurrently by different threads.

This is necessary since methods on `HttpClient` can be called concurrently and need a guarantee of thread safety. So if a handler is assigned to an `HttpClient` instance, the `HttpMessageHandler.SendAsync` method of the handler may get called concurrently by the `HttpClient` instance and needs to be thread safe.

## HttpMessageHandler.HttpMessageHandler() constructor

```csharp
protected HttpMessageHandler ();
```

Initializes a new instance of the `HttpMessageHandler` class.

To be added.

## HttpMessageHandler.Dispose() method

```csharp
public void Dispose ();
```

Releases the unmanaged resources and disposes of the managed resources used by the `HttpMessageHandler`.

To be added.

## HttpMessageHandler.Dispose(Boolean) method

```csharp
protected virtual void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `HttpMessageHandler` and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

#### Remarks
This method is called by the public `Dispose()` method and the `Finalize` method, if it has been overridden. `Dispose()` invokes this method with the `disposing` parameter set to `true`. `Finalize` invokes this method with `disposing` set to `false`.

When the `disposing` parameter is `true`, this method releases all resources held by any managed objects that this `HttpMessageHandler` references. This method invokes the `Dispose()` method of each referenced object.

## HttpMessageHandler.Send(HttpRequestMessage, CancellationToken) method

```csharp
protected internal virtual System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

When overridden in a derived class, sends an HTTP request with the specified request and cancellation token. Otherwise, throws a `NotSupportedException`.

Parameters:

- `request`: The HTTP request message to send.
- `cancellationToken`: The cancellation token to cancel operation.

Returns: The HTTP response message.

Exceptions:

- `NotSupportedException`: The method is not overridden in the derived class.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## HttpMessageHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected internal abstract System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
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

The `HttpMessageHandler.SendAsync` method is used primarily by the system. This method is called by the system when one of the  `HttpClient.SendAsync` methods is called. Most apps will never call this method.
