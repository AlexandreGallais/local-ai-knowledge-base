---
title: "endpoint-metadata"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-9/includes/endpoint-metadata.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# endpoint-metadata

### Developer exception page improvements

The ASP.NET Core developer exception page is displayed when an app throws an unhandled exception during development. The developer exception page provides detailed information about the exception and request.

Preview 3 added endpoint metadata to the developer exception page. ASP.NET Core uses endpoint metadata to control endpoint behavior, such as routing, response caching, rate limiting, OpenAPI generation, and more. The following image shows the new metadata information in the `Routing` section of the developer exception page:

While testing the developer exception page, small quality of life improvements were identified. They shipped in Preview 4:

* Better text wrapping. Long cookies, query string values, and method names no longer add horizontal browser scroll bars.
* Bigger text which is found in modern designs.
* More consistent table sizes.

The following animated image shows the new developer exception page:
