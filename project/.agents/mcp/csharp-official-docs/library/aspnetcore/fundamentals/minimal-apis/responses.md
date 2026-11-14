---
title: "Create responses in Minimal API applications (part 1 of 5)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/fundamentals/minimal-apis/responses.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# How to create responses in Minimal API apps

This article explains how to create responses for Minimal API endpoints in ASP.NET Core. Minimal APIs provide several ways to return data and HTTP status codes.

Minimal endpoints support the following types of return values:

1. `string` - This includes `Task<string>`, `ValueTask<string>`, and F# `Async<string>`.
1. `T` (Any other type) - This includes `Task<T>`, `ValueTask<T>`, and F# `Async<'T>`.
1. `IResult` based - This includes `Task<IResult>`, `ValueTask<IResult>`, and F# `Async<IResult>`.

> **Note:**
> F# `Async<'T>` is supported as an awaitable return type in minimal API endpoints. When `unit` is the generic type argument of a generic awaitable type (`Task<unit>`, `ValueTask<unit>`, or `Async<unit>`), the framework coerces it to `void`, returning an empty response body instead of the JSON `null` token.

> **Important:**
> Starting with ASP.NET Core 10, known API endpoints no longer redirect to login pages when using cookie authentication. Instead, they return 401/403 status codes. For details, see API endpoint authentication behavior in ASP.NET Core.

## `string` return values

|Behavior|Content-Type|
|--|--|
| The framework writes the string directly to the response. | `text/plain`

Consider the following route handler, which returns a `Hello world` text.

```csharp
app.MapGet("/hello", () => "Hello World");
```
The `200` status code is returned with `text/plain` Content-Type header and the following content.

```text
Hello World
```

## `T` (Any other type) return values

|Behavior|Content-Type|
|--|--|
| The framework JSON-serializes the response.| `application/json`

Consider the following route handler, which returns an anonymous type containing a `Message` string property.

```csharp
app.MapGet("/hello", () => new { Message = "Hello World" });
```
The `200` status code is returned with `application/json` Content-Type header and the following content.

```json
{"message":"Hello World"}
```
