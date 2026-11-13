---
title: "Breaking change - Streaming HTTP responses enabled by default in browser HTTP clients"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/networking/10.0/default-http-streaming.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Streaming HTTP responses enabled by default in browser HTTP clients

Browser HTTP clients now enable streaming HTTP responses by default. Consequently, the `System.Net.Http.HttpContent.ReadAsStreamAsync*` method now returns a `BrowserHttpReadStream` instead of a `System.IO.MemoryStream`, which does not support synchronous operations. This may require updates to existing code that relies on synchronous stream operations.

## Version introduced

.NET 10

## Previous behavior

Previously, in browser environments such as WebAssembly (WASM) and Blazor, the HTTP client buffered the entire response by default. The `System.Net.Http.HttpContent` object contained a `System.IO.MemoryStream` unless you explicitly opted in to streaming responses using the `WebAssemblyEnableStreamingResponse` option.

```csharp
var response = await httpClient.GetAsync("https://example.com");
var contentStream = await response.Content.ReadAsStreamAsync(); // Returns MemoryStream
```

## New behavior

Starting in .NET 10, streaming HTTP responses are enabled by default. The `System.Net.Http.HttpContent` no longer contains a `System.IO.MemoryStream`. Instead, `System.Net.Http.HttpContent.ReadAsStreamAsync*` returns a `BrowserHttpReadStream`, which does not support synchronous operations.

```csharp
var response = await httpClient.GetAsync("https://example.com");
var contentStream = await response.Content.ReadAsStreamAsync(); // Returns BrowserHttpReadStream
```

## Type of breaking change

This is a behavioral change.

## Reason for change

This change supports use-cases around streaming `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable*`.

## Recommended action

If your application relies on synchronous stream operations, update the code to use asynchronous alternatives. To disable streaming globally or for specific requests, use the provided configuration options.

To disable streaming for individual requests, use the following:

```csharp
request.Options.Set(new HttpRequestOptionsKey<bool>("WebAssemblyEnableStreamingResponse"), false);
// or
request.SetBrowserResponseStreamingEnabled(false);
```

To disable streaming globally, set the environment variable `DOTNET_WASM_ENABLE_STREAMING_RESPONSE` or add the following to your project file:

```xml
<WasmEnableStreamingResponse>false</WasmEnableStreamingResponse>
```

> **Note:**
> As of .NET 10 Preview 3 the `<WasmEnableStreamingResponse>` property is not yet available. It will be available in a future release. For more details, see the GitHub issue.

## Affected APIs

- `System.Net.Http.HttpContent`
- `System.Net.Http.HttpContent.ReadAsStreamAsync*`
