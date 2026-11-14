---
title: "HttpResiliencePipelineBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpResiliencePipelineBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpResiliencePipelineBuilderExtensions class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public static class HttpResiliencePipelineBuilderExtensions
```

Extensions for `IHttpResiliencePipelineBuilder`.

To be added.

## HttpResiliencePipelineBuilderExtensions.SelectPipelineBy(IHttpResiliencePipelineBuilder, String>>) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpResiliencePipelineBuilder SelectPipelineBy (this Microsoft.Extensions.Http.Resilience.IHttpResiliencePipelineBuilder builder, Func<IServiceProvider,Func<System.Net.Http.HttpRequestMessage,string>> selectorFactory);
```

Instructs the underlying builder to select the pipeline instance by custom selector.

Parameters:

- `builder`: The builder instance.
- `selectorFactory`: The factory that returns a key selector.

Returns: The value of `builder`.

The pipeline key is used in metrics and logs, so don't return any sensitive values.

## HttpResiliencePipelineBuilderExtensions.SelectPipelineByAuthority(IHttpResiliencePipelineBuilder) method

```csharp
public static Microsoft.Extensions.Http.Resilience.IHttpResiliencePipelineBuilder SelectPipelineByAuthority (this Microsoft.Extensions.Http.Resilience.IHttpResiliencePipelineBuilder builder);
```

Instructs the underlying builder to select the pipeline instance by redacted authority (scheme + host + port).

Parameters:

- `builder`: The builder instance.

Returns: The value of `builder`.

To be added.
