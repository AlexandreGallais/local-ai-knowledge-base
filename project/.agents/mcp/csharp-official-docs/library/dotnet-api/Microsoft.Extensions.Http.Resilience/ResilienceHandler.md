---
title: "ResilienceHandler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/ResilienceHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResilienceHandler class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public class ResilienceHandler : System.Net.Http.DelegatingHandler
```

Base class for resilience handler, i.e. handlers that use resilience strategies to send the requests.

To be added.

## ResilienceHandler.ResilienceHandler(HttpResponseMessage>) constructor

```csharp
public ResilienceHandler (Polly.ResiliencePipeline<System.Net.Http.HttpResponseMessage> pipeline);
```

Initializes a new instance of the `ResilienceHandler` class.

Parameters:

- `pipeline`: The pipeline to use for the message.

Exceptions:

- `ArgumentNullException`: If `pipeline` is `null`.

To be added.

## ResilienceHandler.ResilienceHandler(HttpResponseMessage>>) constructor

```csharp
public ResilienceHandler (Func<System.Net.Http.HttpRequestMessage,Polly.ResiliencePipeline<System.Net.Http.HttpResponseMessage>> pipelineProvider);
```

Initializes a new instance of the `ResilienceHandler` class.

Parameters:

- `pipelineProvider`: The pipeline provider that supplies pipelines in response to an http message.

Exceptions:

- `ArgumentNullException`: If `pipelineProvider` is `null`.

To be added.

## ResilienceHandler.Send(HttpRequestMessage, CancellationToken) method

```csharp
protected override System.Net.Http.HttpResponseMessage Send (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request to the inner handler to send to the server as a synchronous operation.

Parameters:

- `request`: The HTTP request message to send to the server.
- `cancellationToken`: A cancellation token to cancel operation.

Returns: An HTTP response received from the server.

Exceptions:

- `ArgumentNullException`: If `request` is `null`.

To be added.

## ResilienceHandler.SendAsync(HttpRequestMessage, CancellationToken) method

```csharp
protected override System.Threading.Tasks.Task<System.Net.Http.HttpResponseMessage> SendAsync (System.Net.Http.HttpRequestMessage request, System.Threading.CancellationToken <example-value>);
```

Sends an HTTP request to the inner handler to send to the server as an asynchronous operation.

Parameters:

- `request`: The HTTP request message to send to the server.
- `cancellationToken`: A cancellation token to cancel operation.

Returns: The task object representing the asynchronous operation.

Exceptions:

- `ArgumentNullException`: If `request` is `null`.

To be added.
