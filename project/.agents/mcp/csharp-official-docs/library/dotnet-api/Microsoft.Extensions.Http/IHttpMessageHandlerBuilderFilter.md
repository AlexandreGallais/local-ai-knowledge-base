---
title: "IHttpMessageHandlerBuilderFilter interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http/IHttpMessageHandlerBuilderFilter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IHttpMessageHandlerBuilderFilter interface

Namespace: `Microsoft.Extensions.Http`

```csharp
public interface IHttpMessageHandlerBuilderFilter
```

Used by the `DefaultHttpClientFactory` to apply additional initialization to the configure the
`HttpMessageHandlerBuilder` immediately before `HttpMessageHandlerBuilder.Build`
is called.

To be added.

## IHttpMessageHandlerBuilderFilter.Configure(HttpMessageHandlerBuilder>) method

```csharp
public Action<Microsoft.Extensions.Http.HttpMessageHandlerBuilder> Configure (Action<Microsoft.Extensions.Http.HttpMessageHandlerBuilder> next);
```

Applies additional initialization to the `HttpMessageHandlerBuilder`

Parameters:

- `next`: A delegate that will run the next `IHttpMessageHandlerBuilderFilter`.

Returns: The configured `HttpMessageHandlerBuilder`.

To be added.
