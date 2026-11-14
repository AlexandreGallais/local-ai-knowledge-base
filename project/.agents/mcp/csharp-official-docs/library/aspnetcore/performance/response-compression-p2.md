---
title: "Response compression in ASP.NET Core (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/performance/response-compression.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Response compression in ASP.NET Core (part 2 of 2)

## Review the MIME types

The response compression middleware specifies a default set of MIME types for compression. Review the source code for a complete list of supported MIME types.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

Replace or append MIME types with the ResponseCompressionOptions.MimeTypes property. Wildcard MIME types such as `text/*` aren't supported. The sample app adds a MIME type for `image/svg+xml` and compresses and serves the ASP.NET Core banner image _banner.svg_.

```csharp
using Microsoft.AspNetCore.ResponseCompression;
using ResponseCompressionSample;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    options.Providers.Add<CustomCompressionProvider>();
    options.MimeTypes =
    ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "image/svg+xml" });
});

var app = builder.Build();

app.UseResponseCompression();
```

## Add the Vary header

When responses are compressed based on the Accept-Encoding request header, there can be uncompressed and multiple compressed versions of the response. To instruct client and proxy caches that multiple versions exist and should be stored, the `Vary` header is added with an `Accept-Encoding` value. The response middleware adds the 'Vary' header in the _ResponseCompressionBody.cs_ file automatically when the response is compressed.

> **Note:**
> Documentation links to .NET reference source usually load the repository's default branch, which represents the current development for the next release of .NET. To select a tag for a specific release, use the **Switch branches or tags** dropdown list.

The response compression middleware adds `Vary: Accept-Encoding` even to responses whose body it doesn't compress—for example, when the content type isn't configured for compression or the client didn't request a supported encoding. The broader behavior gives shared caches and CDNs a correct cache key so a stored compressed response isn't served to a client that didn't request that encoding. If the response already lists `Accept-Encoding` in its `Vary` header, the middleware doesn't add a duplicate. For details and mitigation, see Response compression always emits Vary: Accept-Encoding.

## Issues with Nginx reverse proxy

When Nginx proxies the request, the `Accept-Encoding` header is removed. Removal of the `Accept-Encoding` header prevents the response compression middleware from compressing the response. For more information, see Nginx: Compression and decompression. This issue is tracked in GitHub dotnet/aspnetcore issue #5989 - _Figure out pass-through compression for Nginx_.

## Disable IIS dynamic compression

To disable IIS Dynamic Compression Module configured at the server level, see Disabling IIS modules.

## Troubleshoot response compression

Use a tool like Firefox Browser - Developer edition that lets you set the `Accept-Encoding` request header and study the response headers, size, and body. By default, response compression middleware compresses responses that meet the following conditions:

* The `Accept-Encoding` header is present with a value of `br`, `gzip`, `zstd`, `*` (asterisk), or custom encoding that matches a custom compression provider. The value must not be `identity` (no encoding) or have a quality value (qvalue, `q`) setting of 0 (zero).

* The MIME type (`Content-Type`) must be set and must match a MIME type configured on the `Microsoft.AspNetCore.ResponseCompression.ResponseCompressionOptions` class.

* The request must not include the Content-Range header.

* The request must use the insecure hypertext protocol (http), unless the secure hypertext protocol (https) is configured in the response compression middleware options.

   > **Important:**
   > Review the risks associated with enabling secure content compression, as described in Compression with HTTPS earlier in this article.

## Review the Azure deployed sample

The sample app deployed to Azure has the following _Program.cs_ file:

```csharp
using Microsoft.AspNetCore.ResponseCompression;
using ResponseCompressionSample;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddResponseCompression(options =>
{
    options.EnableForHttps = true;
    options.Providers.Add<BrotliCompressionProvider>();
    options.Providers.Add<GzipCompressionProvider>();
    options.Providers.Add<CustomCompressionProvider>();
    options.MimeTypes =
    ResponseCompressionDefaults.MimeTypes.Concat(
        new[] { "image/svg+xml" });
});

var app = builder.Build();

app.UseResponseCompression();
```

## Related content

* View or download sample code (how to download)
* Response compression middleware source
* RFC 9110: HTTP Semantics (Section 8.4.1 Content Codings)
* RFC 9110: HTTP Semantics (Section 8.4.1.3 Gzip Coding)
* RFC 1952: GZIP file format specification version 4.3
* RFC 8878: Zstandard Compression for HTTP
