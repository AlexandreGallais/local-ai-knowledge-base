---
title: "MessageProcessingHandler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/MessageProcessingHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MessageProcessingHandler class

Namespace: `System.Net.Http`

```csharp
public abstract class MessageProcessingHandler : System.Net.Http.DelegatingHandler
```

A base type for handlers which only do some small processing of request and/or response messages.

#### Remarks
The actual creation of response messages is delegated to an inner handler. The `MessageProcessingHandler` is useful if the handler doesn't require asynchronous operations, because operations on request and response messages are fast.

The most common usage is to derive from this class and override the `MessageProcessingHandler.ProcessRequest` and  `MessageProcessingHandler.ProcessResponse` methods.

## MessageProcessingHandler.MessageProcessingHandler() constructor

```csharp
protected MessageProcessingHandler ();
```

Creates an instance of a `MessageProcessingHandler` class.

To be added.

## MessageProcessingHandler.MessageProcessingHandler(HttpMessageHandler) constructor

```csharp
protected MessageProcessingHandler (System.Net.Http.HttpMessageHandler innerHandler);
```

Creates an instance of a `MessageProcessingHandler` class with a specific inner handler.

Parameters:

- `innerHandler`: The inner handler which is responsible for processing the HTTP response messages.

To be added.

## MessageProcessingHandler.ProcessRequest(HttpRequestMessage, CancellationToken) method

```csharp
protected abstract System.Net.Http.HttpRequestMessage ProcessRequest (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Performs processing on each request sent to the server.

Parameters:

- `request`: The HTTP request message to process.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The HTTP request message that was processed.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
An application would override this method to implement custom processing of the HTTP request message before it is sent to the server.

## MessageProcessingHandler.ProcessResponse(HttpResponseMessage, CancellationToken) method

```csharp
protected abstract System.Net.Http.HttpResponseMessage ProcessResponse (System.Net.Http.HttpResponseMessage response, System.Threading.CancellationToken <example-value>);
```

Performs processing on each response from the server.

Parameters:

- `response`: The HTTP response message to process.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The HTTP response message that was processed.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
An application would override this method to implement custom processing of the HTTP response message after it is received from the server.

## MessageProcessingHandler.Send(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override sealed System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request to the inner handler to send to the server.

Parameters:

- `request`: The HTTP request message to send to the server.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The HTTP response message.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

To be added.

## MessageProcessingHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected internal override sealed System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request to the inner handler to send to the server as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send to the server.
- `cancellationToken`: A cancellation token that can be used by other objects or threads to receive notice of cancellation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: The `request` was `null`.
- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

#### Remarks
This operation does not block. This overridable implementation of `MessageProcessingHandler.SendAsync` method forwards the HTTP request to the inner handler to send to the server as an asynchronous operation.
