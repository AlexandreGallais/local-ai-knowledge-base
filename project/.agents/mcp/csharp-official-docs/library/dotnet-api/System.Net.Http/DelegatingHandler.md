---
title: "DelegatingHandler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/DelegatingHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DelegatingHandler class

Namespace: `System.Net.Http`

```csharp
public abstract class DelegatingHandler : System.Net.Http.HttpMessageHandler
```

A type for HTTP handlers that delegate the processing of HTTP response messages to another handler, called the inner handler.

#### Remarks
An application should provide an inner handler either in the constructor or through the `InnerHandler` property before calling `DelegatingHandler.SendAsync`; otherwise, an `InvalidOperationException` will be thrown.

Note that `InnerHandler` property may be a delegating handler as well. This approach allows the creation of handler stacks to process the HTTP response messages.

## DelegatingHandler.DelegatingHandler() constructor

```csharp
protected DelegatingHandler ();
```

Creates a new instance of the `DelegatingHandler` class.

#### Remarks
The inner handle can be set using the `DelegatingHandler.InnerHandler`.

## DelegatingHandler.DelegatingHandler(HttpMessageHandler) constructor

```csharp
protected DelegatingHandler (System.Net.Http.HttpMessageHandler innerHandler);
```

Creates a new instance of the `DelegatingHandler` class with a specific inner handler.

Parameters:

- `innerHandler`: The inner handler which is responsible for processing the HTTP response messages.

To be added.

## DelegatingHandler.InnerHandler property

```csharp
public System.Net.Http.HttpMessageHandler? InnerHandler { get; set; }
```

Gets or sets the inner handler which processes the HTTP response messages.

Returns: The inner handler for HTTP response messages.

#### Remarks
This `InnerHandler` property can only be set before the class is used (the `DelegatingHandler.SendAsync` method is called).

Note that `InnerHandler` property may be a delegating handler too, although this is uncommon. This approach allows the creation of handler stacks for the HTTP response messages.

## DelegatingHandler.Dispose(Boolean) method

```csharp
protected override void Dispose (bool disposing);
```

Releases the unmanaged resources used by the `DelegatingHandler`, and optionally disposes of the managed resources.

Parameters:

- `disposing`: `true` to release both managed and unmanaged resources; `false` to releases only unmanaged resources.

To be added.

## DelegatingHandler.Send(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request to the inner handler to send to the server.

Parameters:

- `request`: The HTTP request message to send to the server.
- `cancellationToken`: A cancellation token to cancel operation.

Returns: An HTTP response message.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks

The `DelegatingHandler.Send` method is mainly used by the system and not by applications. When this method is called, it calls the `DelegatingHandler.Send` method on the inner handler.

## DelegatingHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request to the inner handler to send to the server as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send to the server.
- `cancellationToken`: A cancellation token to cancel operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` was `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation does not block. This overridable implementation of `HttpClientHandler.SendAsync` method forwards the HTTP request to the inner handler to send to the server as an asynchronous operation.

The `DelegatingHandler.SendAsync` method is mainly used by the system and not by applications. When this method is called, it calls the `DelegatingHandler.SendAsync` method on the inner handler.
