---
id: dotnet-aspnetcore-changes
title: ASP.NET Core 6 to 11, what changed
topic: dotnet
summary: Hosting, minimal APIs, typed results, OpenAPI, validation and what a model still writes the old way. ASP.NET Core 11.
tool: ASP.NET Core
version: "11"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5]
license: CC BY 4.0, adapted from the ASP.NET Core documentation; written for this base (MIT)
variant: files
---

# ASP.NET Core 6 to 11, what changed

Contents: 1. Old and new patterns · 2. Example · 3. Authentication and SignalR · 4. Obsolete in .NET 10 · Sources

## 1. Old and new patterns (ASP.NET Core 6 to 11)

Use a new pattern only when the target framework is equal to or higher than the "Since" column. `Startup.cs` still works: keep it in a project that has it.

| Old | New | Since |
| --- | --- | --- |
| `Startup.cs` and `Program.CreateHostBuilder` | One `Program.cs`: `WebApplication.CreateBuilder(args)`, `builder.Services…`, `app.Map…`, `app.Run()` | 6 |
| `app.UseRouting()` then `app.UseEndpoints(…)` | `app.MapControllers()`, `app.MapGet(…)` directly | 6 |
| `Results.Ok(x)` | `TypedResults.Ok(x)` and `Results<Ok<T>, NotFound>` | 7 |
| Route prefix repeated on each endpoint | `app.MapGroup("/orders")` | 7 |
| Exception middleware written by hand | `IExceptionHandler`, `AddExceptionHandler<T>()`, Problem Details | 8 |
| `AddSwaggerGen()`, `UseSwagger()` | `AddOpenApi()`, `MapOpenApi()`; a visual UI comes from a separate package | 9 |
| `.WithOpenApi()` | Operation transformers | 10 |
| Validation by hand in a minimal API | `builder.Services.AddValidation()` | 10 |
| Event stream written by hand | `TypedResults.ServerSentEvents` | 10 |
| Redirect to a login page for an API call | 401 or 403 for known API endpoints | 10 |

[S1] [S2] [S3] [S4]

## 2. Example of a minimal API (ASP.NET Core 10)

Wrong, in a new `net10.0` project:

```csharp
builder.Services.AddSwaggerGen();
app.MapGet("/valves/{id}", (int id, ValveStore store) =>
{
    var valve = store.Find(id);
    return valve is null ? Results.NotFound() : Results.Ok(valve);
});
```

Right:

```csharp
builder.Services.AddOpenApi();
builder.Services.AddValidation();
app.MapOpenApi();
app.MapGet("/valves/{id}", Results<Ok<Valve>, NotFound> (int id, ValveStore store) =>
    store.Find(id) is { } valve ? TypedResults.Ok(valve) : TypedResults.NotFound());
```

## 3. Authentication and SignalR (ASP.NET Core 7 to 11)

- Authentication: a single registered scheme is the default (7); Identity API endpoints with `MapIdentityApi<TUser>()` (8); passkeys in Identity (10). [S2] [S3]
- SignalR: stateful reconnect with `WithStatefulReconnect` (8); polymorphic types in hubs, native AOT with the JSON protocol only (9). [S2] [S3]

## 4. Obsolete in .NET 10 (ASP.NET Core 10)

`WebHostBuilder`, `IWebHost` and `WebHost`; `IActionContextAccessor`; Razor runtime compilation; `IPNetwork` and `ForwardedHeadersOptions.KnownNetworks`. The build shows them as warnings, so `dotnet build` fails on them in this base. [S5]

## Sources

- [S1] Microsoft, "Migrate from ASP.NET Core 5.0 to 6.0", <https://learn.microsoft.com/en-us/aspnet/core/migration/50-to-60>, read 2026-11-12, CC BY 4.0, summarized.
- [S2] Microsoft, "What's new in ASP.NET Core 7.0" and "8.0", <https://learn.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-7.0>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "What's new in ASP.NET Core 9.0", <https://learn.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-9.0>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, "What's new in ASP.NET Core in .NET 10", <https://learn.microsoft.com/en-us/aspnet/core/release-notes/aspnetcore-10.0>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] Microsoft, "Breaking changes in ASP.NET Core 10", <https://learn.microsoft.com/en-us/aspnet/core/breaking-changes/10/overview>, read 2026-11-12, CC BY 4.0, summarized.
