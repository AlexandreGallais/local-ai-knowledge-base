---
title: "HttpResilienceHttpRequestMessageExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpResilienceHttpRequestMessageExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpResilienceHttpRequestMessageExtensions class

Namespace: `System.Net.Http`

```csharp
public static class HttpResilienceHttpRequestMessageExtensions
```

The resilience extensions for `HttpRequestMessage`.

To be added.

## HttpResilienceHttpRequestMessageExtensions.GetResilienceContext(HttpRequestMessage) method

```csharp
public static Polly.ResilienceContext? GetResilienceContext (this System.Net.Http.HttpRequestMessage requestMessage);
```

Gets the `ResilienceContext` from the request message.

Parameters:

- `requestMessage`: The request.

Returns: An instance of `ResilienceContext` or `null`.

To be added.

## HttpResilienceHttpRequestMessageExtensions.SetResilienceContext(HttpRequestMessage, ResilienceContext) method

```csharp
public static void SetResilienceContext (this System.Net.Http.HttpRequestMessage requestMessage, Polly.ResilienceContext? resilienceContext);
```

Sets the `ResilienceContext` on the request message.

Parameters:

- `requestMessage`: The request.
- `resilienceContext`: An instance of `ResilienceContext`.

To be added.
