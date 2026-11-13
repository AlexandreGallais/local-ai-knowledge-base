---
title: "status500"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-9/includes/status500.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# status500

### Added `InternalServerError` and `InternalServerError<TValue>` to `TypedResults`

The `Microsoft.AspNetCore.Http.TypedResults` class is a helpful vehicle for returning strongly-typed HTTP status code-based responses from a Minimal API.  `TypedResults` now includes factory methods and types for returning "500 Internal Server Error" responses from endpoints. Here's an example that returns a 500 response:

```csharp
var app = WebApplication.Create();

app.MapGet("/", () => TypedResults.InternalServerError("Something went wrong!"));

app.Run();
```
