---
title: "HttpCompletionOption enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http/HttpCompletionOption.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpCompletionOption enum

Namespace: `System.Net.Http`

```csharp
public enum HttpCompletionOption
```

Indicates if `HttpClient` operations should be considered completed either as soon as a response is available, or after reading the entire response message including the content.

#### Remarks

> **Warning:**
> The `HttpCompletionOption` value affects the scope of the timeout specified in the `HttpClient` options when reading a response. The timeout on the `HttpClient` always applies on the relevant invoked methods up until the point where those methods complete/return. Crucially, when using the `ResponseHeadersRead` option, the timeout applies only up to where the headers end and the content starts. The content reading operation needs to be timed out separately in case the server promptly returns the status line and headers but takes too long to return the content.
> This consideration also applies to the `MaxResponseContentBufferSize` property. The limit is only enforced when using `ResponseContentRead`.
> Below is an example illustrating this point:

_Code sample not included: ~/snippets/csharp/System.Net.Http/HttpCompletionOption/HttpCompletionOptionSnippets.cs._
## HttpCompletionOption.ResponseContentRead field

```csharp
ResponseContentRead
```

The operation should complete after reading the entire response including the content.

## HttpCompletionOption.ResponseHeadersRead field

```csharp
ResponseHeadersRead
```

The operation should complete as soon as a response is available and headers are read. The content is not read yet.
