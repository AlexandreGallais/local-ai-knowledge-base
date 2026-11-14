---
title: "performance-improvements"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/release-notes/aspnetcore-11/includes/performance-improvements.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# performance-improvements

### Performance improvements

Kestrel's HTTP/1.1 request parser now uses a non-throwing code path for handling malformed requests. Instead of throwing `Microsoft.AspNetCore.Http.BadHttpRequestException` on every parse failure, the parser returns a result struct indicating success, incomplete, or error states. In scenarios with many malformed requests — such as port scanning, malicious traffic, or misconfigured clients — this eliminates expensive exception handling overhead and improves throughput by up to 20-40%. There's no impact on valid request processing.

The HTTP logging middleware now pools its `ResponseBufferingStream` instances, reducing per-request allocations when response body logging or interceptors are enabled.
