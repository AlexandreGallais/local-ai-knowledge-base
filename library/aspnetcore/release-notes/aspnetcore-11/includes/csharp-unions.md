---
title: "csharp-unions"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/release-notes/aspnetcore-11/includes/csharp-unions.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# csharp-unions

### C# union types

ASP.NET Core supports C# union types (C# language reference), which are new in .NET 11, anywhere `System.Text.Json` is used: JSON request and response bodies in Minimal APIs and MVC, SignalR's `JsonHubProtocol`, Blazor JavaScript interop, persistent component state, and prerendered component parameters.

```csharp
public union UnionIntString(int, string);

app.MapGet("/value", () => new UnionIntString(42));
```

Union types aren't supported for non-body binding sources such as route values, query strings, headers, and form fields.

For OpenAPI, an endpoint that returns a union is described with an `anyOf` schema listing each case type. Unlike polymorphic types, union cases don't carry a `$type` discriminator, so each case reuses its standalone component (for example, `#/components/schemas/Dog`) instead of a duplicated, prefixed one. ApiExplorer detects a union through `JsonTypeInfoKind.Union`, so the schema also flows through to Swashbuckle and NSwag. When multiple cases serialize to the same JSON shape, disambiguate them with a `[JsonUnion]` classifier. SignalR unions require the JSON hub protocol; the MessagePack and `Newtonsoft.Json` protocols don't support unions.

For examples and additional information that apply to Blazor apps, see the Component parameters section in the Components overview article and the Pass parameters section of the Dynamically-rendered ASP.NET Core Razor components article.
