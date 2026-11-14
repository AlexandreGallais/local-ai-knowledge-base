---
title: "response-caching-mid"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/includes/response-caching-mid.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# response-caching-mid

The response caching middleware enables the caching of server responses based on HTTP Cache-Control headers.

* Caching behavior implements standard HTTP caching semantics.

* Caching is based on HTTP cache headers similar to the method used by proxies.

* This form of caching is useful for public GET or HEAD API requests from clients where the conditions for caching are satisfied.

* For UI apps like Razor Pages, response caching isn't typically beneficial. Browsers commonly set request headers that prevent caching.

  Output caching (available in .NET 7 and later) is a better approach for UI apps. In this scenario, the configuration determines what to cache independent of HTTP headers.

To test response caching, use Fiddler or another tool that can explicitly set request headers. Setting headers explicitly is preferred for testing caching. For more information, see Response caching middleware > Troubleshooting.
