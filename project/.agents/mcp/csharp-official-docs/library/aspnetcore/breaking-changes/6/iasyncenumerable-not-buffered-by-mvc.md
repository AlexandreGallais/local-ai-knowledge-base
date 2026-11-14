---
title: "Breaking change: MVC no longer buffers IAsyncEnumerable types when using System.Text.Json"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/iasyncenumerable-not-buffered-by-mvc.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# MVC doesn't buffer IAsyncEnumerable types when using System.Text.Json

In ASP.NET Core 5, MVC added support for output formatting `System.Collections.Generic.IAsyncEnumerable`1` types by buffering the sequence in memory and formatting the buffered collection. In ASP.NET Core 6, when formatting using `System.Text.Json`, MVC no longer buffers `System.Collections.Generic.IAsyncEnumerable`1` instances. Instead, MVC relies on the support that `System.Text.Json` added for these types.

In most cases, the absence of buffering would not be observable by the application. However, some scenarios may have inadvertently relied on the buffering semantics to correctly serialize. For example, returning an `System.Collections.Generic.IAsyncEnumerable`1` that's backed by an Entity Framework query on a type with lazy-loaded properties can result in concurrent query execution, which might not be supported by the provider.

This change does not affect output formatting using Newtonsoft.Json or with XML-based formatters.

## Version introduced

ASP.NET Core 6.0

## Old behavior

`System.Collections.Generic.IAsyncEnumerable`1` instances returned from an MVC action as a value to be formatted using `System.Data.Objects.ObjectResult` or a `System.Web.Mvc.JsonResult` are buffered before being serialized as a synchronous collection.

## New behavior

When formatting using `System.Text.Json`, MVC no longer buffers `System.Collections.Generic.IAsyncEnumerable`1` instances.

## Reason for change

`System.Text.Json` added support for streaming `System.Collections.Generic.IAsyncEnumerable`1` types. This allows for a smaller memory footprint during serialization.

## Recommended action

If your application requires buffering, consider manually buffering the `System.Collections.Generic.IAsyncEnumerable`1` object:

```csharp
// Before
public IActionResult Get()
{
    return Ok(dbContext.Blogs);
}

// After
public async Task<IActionResult> Get()
{
    return Ok(await dbContext.Blogs.ToListAsync());
}
```
