---
title: "Migrate from Newtonsoft.Json to System.Text.Json - .NET (part 4 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/migrate-from-newtonsoft.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Migrate from Newtonsoft.Json to System.Text.Json - .NET (part 4 of 4)

## JsonDocument and JsonElement compared to JToken (like JObject, JArray)

`System.Text.Json.JsonDocument` provides the ability to parse and build a **read-only** Document Object Model (DOM) from existing JSON payloads. The DOM provides random access to data in a JSON payload. The JSON elements that compose the payload can be accessed via the `System.Text.Json.JsonElement` type. The `JsonElement` type provides APIs to convert JSON text to common .NET types. `JsonDocument` exposes a `System.Text.Json.JsonDocument.RootElement` property.

Starting in .NET 6, you can parse and build a **mutable** DOM from existing JSON payloads by using the `System.Text.Json.Nodes.JsonNode` type and other types in the `System.Text.Json.Nodes` namespace. For more information, see Use `JsonNode`.

### JsonDocument is IDisposable

`JsonDocument` builds an in-memory view of the data into a pooled buffer. Therefore, unlike `JObject` or `JArray` from `Newtonsoft.Json`, the `JsonDocument` type implements `IDisposable` and needs to be used inside a using block. For more information, see JsonDocument is IDisposable.

### JsonDocument is read-only

The `System.Text.Json` DOM can't add, remove, or modify JSON elements. It's designed this way for performance and to reduce allocations for parsing common JSON payload sizes (that is, < 1 MB).

### JsonElement is a union struct

`JsonDocument` exposes the `RootElement` as a property of type `System.Text.Json.JsonElement`, which is a union struct type that encompasses any JSON element. `Newtonsoft.Json` uses dedicated hierarchical types like `JObject`, `JArray`, `JToken`, and so forth. `JsonElement` is what you can search and enumerate over, and you can use `JsonElement` to materialize JSON elements into .NET types.

Starting in .NET 6, you can use `System.Text.Json.Nodes.JsonNode` type and types in the `System.Text.Json.Nodes` namespace that correspond to `JObject`, `JArray`, and `JToken`. For more information, see Use `JsonNode`.

### How to search a JsonDocument and JsonElement for sub-elements

Searches for JSON tokens using `JObject` or `JArray` from `Newtonsoft.Json` tend to be relatively fast because they're lookups in some dictionary. By comparison, searches on `JsonElement` require a sequential search of the properties and hence are relatively slow (for example when using `TryGetProperty`). `System.Text.Json` is designed to minimize initial parse time rather than lookup time. For more information, see How to search a JsonDocument and JsonElement for sub-elements.

## Utf8JsonReader vs. JsonTextReader

`System.Text.Json.Utf8JsonReader` is a high-performance, low allocation, forward-only reader for UTF-8 encoded JSON text, read from a ReadOnlySpan\<byte> or ReadOnlySequence\<byte>. The `Utf8JsonReader` is a low-level type that can be used to build custom parsers and deserializers.

### Utf8JsonReader is a ref struct

The `JsonTextReader` in `Newtonsoft.Json` is a class. The `Utf8JsonReader` type differs in that it's a *ref struct*. For more information, see ref struct limitations for Utf8JsonReader.

### Read null values into nullable value types

`Newtonsoft.Json` provides APIs that return `System.Nullable`1`, such as `ReadAsBoolean`, which handles a `Null` `TokenType` for you by returning a `bool?`. The built-in `System.Text.Json` APIs return only non-nullable value types. For more information, see Read null values into nullable value types.

### Multi-target for reading JSON

If you need to continue to use `Newtonsoft.Json` for certain target frameworks, you can multi-target and have two implementations. However, this is not trivial and would require some `#ifdefs` and source duplication. One way to share as much code as possible is to create a `ref struct` wrapper around `System.Text.Json.Utf8JsonReader` and `Newtonsoft.Json.JsonTextReader`. This wrapper would unify the public surface area while isolating the behavioral differences. This lets you isolate the changes mainly to the construction of the type, along with passing the new type around by reference. This is the pattern that the Microsoft.Extensions.DependencyModel library follows:

* UnifiedJsonReader.JsonTextReader.cs
* UnifiedJsonReader.Utf8JsonReader.cs

## Utf8JsonWriter vs. JsonTextWriter

`System.Text.Json.Utf8JsonWriter` is a high-performance way to write UTF-8 encoded JSON text from common .NET types like `String`, `Int32`, and `DateTime`. The writer is a low-level type that can be used to build custom serializers.

### Write raw values

`Newtonsoft.Json` has a `WriteRawValue` method that writes raw JSON where a value is expected. `System.Text.Json` has a direct equivalent: `System.Text.Json.Utf8JsonWriter.WriteRawValue*`. For more information, see Write raw JSON.

### Customize JSON format

**dotnet-11-0,dotnet-10-0,dotnet-9-0:**

`JsonTextWriter` includes the following settings, for which `System.Text.Json.Utf8JsonWriter` has no equivalent:

* QuoteChar - Specifies the character to use to surround string values. `Utf8JsonWriter` always uses double quotes.
* QuoteName - Specifies whether or not to surround property names with quotes. `Utf8JsonWriter` always surrounds them with quotes.

Starting in .NET 9, you can customize the indentation character and size for `System.Text.Json.Utf8JsonWriter` using options exposed by the `System.Text.Json.JsonWriterOptions` struct:

* `System.Text.Json.JsonWriterOptions.IndentCharacter`
* `System.Text.Json.JsonWriterOptions.IndentSize`

**dotnet-8-0:**

`JsonTextWriter` includes the following settings, for which `Utf8JsonWriter` has no equivalent:

* Indentation - Specifies how many characters to indent. `Utf8JsonWriter` always indents by 2 characters.
* IndentChar - Specifies the character to use for indentation. `Utf8JsonWriter` always uses whitespace.
* QuoteChar - Specifies the character to use to surround string values. `Utf8JsonWriter` always uses double quotes.
* QuoteName - Specifies whether or not to surround property names with quotes. `Utf8JsonWriter` always surrounds them with quotes.

There are no workarounds that would let you customize the JSON produced by `Utf8JsonWriter` in these ways.

### Write Timespan, Uri, or char values

`JsonTextWriter` provides `WriteValue` methods for TimeSpan, Uri, and char values. `Utf8JsonWriter` doesn't have equivalent methods. Instead, format these values as strings (by calling `ToString()`, for example) and call `System.Text.Json.Utf8JsonWriter.WriteStringValue*`.

### Multi-target for writing JSON

If you need to continue to use `Newtonsoft.Json` for certain target frameworks, you can multi-target and have two implementations. However, this is not trivial and would require some `#ifdefs` and source duplication. One way to share as much code as possible is to create a wrapper around `System.Text.Json.Utf8JsonWriter` and `Newtonsoft.Json.JsonTextWriter`. This wrapper would unify the public surface area while isolating the behavioral differences. This lets you isolate the changes mainly to the construction of the type. Microsoft.Extensions.DependencyModel library follows:

* UnifiedJsonWriter.JsonTextWriter.cs
* UnifiedJsonWriter.Utf8JsonWriter.cs

## TypeNameHandling.All not supported

The decision to exclude `TypeNameHandling.All`-equivalent functionality from `System.Text.Json` was intentional. Allowing a JSON payload to specify its own type information is a common source of vulnerabilities in web applications. In particular, configuring `Newtonsoft.Json` with `TypeNameHandling.All` allows the remote client to embed an entire executable application within the JSON payload itself, so that during deserialization the web application extracts and runs the embedded code. For more information, see Friday the 13th JSON attacks PowerPoint and Friday the 13th JSON attacks details.

## JSON Path queries not supported

The `JsonDocument` DOM doesn't support querying by using JSON Path.

In a `System.Text.Json.Nodes.JsonNode` DOM, each `JsonNode` instance has a `GetPath` method that returns a path to that node. But there is no built-in API to handle queries based on JSON Path query strings.

For more information, see the dotnet/runtime #31068 GitHub issue.

## Some limits not configurable

System.Text.Json sets limits that can't be changed for some values, such as the maximum token size in characters (166 MB) and in base 64 (125 MB). For more information, see `JsonConstants` in the source code and GitHub issue dotnet/runtime #39953.

## NaN, Infinity, -Infinity

Newtonsoft parses `NaN`, `Infinity`, and `-Infinity` JSON string tokens. With System.Text.Json, use `System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals`. For information about how to use this setting, see Allow or write numbers in quotes.

## Use AI for solution-wide migration

You can use AI tools, such as GitHub Copilot, to help with migrating your solution code from `Newtonsoft.Json` to `System.Text.Json`.

Here's an example prompt you can use in Visual Studio Copilot Chat to migrate a solution.

```copilot-prompt
Convert all serialization code in this #solution from Newtonsoft.Json to System.Text.Json, using the recommended approach for my current .NET version.
- Update attributes and properties, including rules for skipping or renaming during serialization
- Ensure polymorphic serialization continues to work correctly
- Respect existing custom converters and project-level settings (for example, from the Utilities folder or appsettings.json)
- Update related unit tests and highlight any potential breaking changes
- Generate a migration summary
```

Review Copilot's suggestions before applying them.

For more information about GitHub Copilot, see GitHub's FAQs.

## Additional resources

* System.Text.Json overview
* How to serialize and deserialize JSON
* GitHub Copilot in Visual Studio
* GitHub Copilot in VS Code
