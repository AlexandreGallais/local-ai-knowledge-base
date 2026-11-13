---
title: "Breaking change: System.Text.Json IAsyncEnumerable serialization"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/serialization/6.0/iasyncenumerable-serialization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.Text.Json IAsyncEnumerable serialization

`System.Text.Json` now supports serializing and deserializing of
`System.Collections.Generic.IAsyncEnumerable`1` instances.

## Previous behavior

In previous versions, `System.Text.Json` serialized `System.Collections.Generic.IAsyncEnumerable`1` instances as empty JSON objects (`{}`). Deserialization failed with a `System.Text.Json.JsonException`.

## New behavior

Asynchronous serialization methods now enumerate any `System.Collections.Generic.IAsyncEnumerable`1` instances in an object graph and then serialize them as JSON arrays. Synchronous serializations methods do not support `System.Collections.Generic.IAsyncEnumerable`1` serialization and throw a `System.NotSupportedException`.

## Version introduced

.NET 6

## Type of breaking change

This change can affect source compatibility. If you retarget to .NET 6, you won't get any compile-time errors, but you may encounter runtime serialization behavior differences.

## Reason for change

This change was introduced to add support for streaming `System.Collections.Generic.IAsyncEnumerable`1` responses in ASP.NET Core MVC.

## Recommended action

Check if your serialization models contain types that implement `System.Collections.Generic.IAsyncEnumerable`1` and determine if emitting the enumeration in the JSON output is desirable. You can disable `System.Collections.Generic.IAsyncEnumerable`1` serialization in one of the following ways:

- Attach a `System.Text.Json.Serialization.JsonIgnoreAttribute` to the property containing the `System.Collections.Generic.IAsyncEnumerable`1`.
- Define a custom converter factory that serializes `System.Collections.Generic.IAsyncEnumerable`1` instances as empty JSON objects.

## Affected APIs

- `System.Text.Json.JsonSerializer.SerializeAsync*`
- `System.Text.Json.JsonSerializer.Serialize*`

## See also

- System.Text.Json support for IAsyncEnumerable
