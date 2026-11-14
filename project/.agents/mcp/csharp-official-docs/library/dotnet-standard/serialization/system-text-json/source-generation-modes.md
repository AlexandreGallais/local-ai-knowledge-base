---
title: "Source-generation modes in System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/source-generation-modes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Source-generation modes in System.Text.Json

Source generation can be used in two modes: *metadata-based* and *serialization optimization*. This article describes the different modes.

For information about how to use source generation modes, see How to use source generation in System.Text.Json.

## Metadata-based mode

You can use source generation to move the metadata collection process from runtime to compile time. During compilation, the metadata is collected and source code files are generated. The generated source code files are automatically compiled as an integral part of the application. This technique eliminates runtime metadata collection, which improves performance of both serialization and deserialization.

The performance improvements provided by source generation can be substantial. For example, test results have shown up to 40% or more startup time reduction, private memory reduction, throughput speed increase (in serialization optimization mode), and app size reduction.

### Non-public members and constructors

By default, both reflection mode and source-generation mode include only `public` properties and fields in the serialization contract.

Starting in .NET 11, source generation supports members that you explicitly mark with the [JsonInclude] attribute. The member can be `private`, `internal`, or `protected`. It also supports `private`, `internal`, and `protected` accessors on properties that you mark with `[JsonInclude]`. Source generation also supports inaccessible constructors marked with [JsonConstructor].

On .NET 11, the generated accessors use `System.Runtime.CompilerServices.UnsafeAccessorAttribute`.

A source-generated setter for an `init`-only property runs only when the JSON payload contains that property. An `init`-only property that the payload omits keeps the value from its property initializer.

In .NET 10 and earlier versions, source generation has the following limitations:

* Source generation doesn't support `private` or `protected` members or accessors. If you mark such a member with `[JsonInclude]`, the serializer throws a `System.NotSupportedException` at runtime.
* Source generation supports `internal` members and accessors only when they're accessible to the generated `System.Text.Json.Serialization.JsonSerializerContext` in the same assembly.
* Source generation doesn't support constructors that are inaccessible to the generated context, even when you mark them with `[JsonConstructor]`.

### Known issues

For information about other known issues with source generation, see the GitHub issues that are labeled "source-generator" in the *dotnet/runtime* repository.

## Serialization-optimization (fast path) mode

`JsonSerializer` has many features that customize the output of serialization, such as naming policies and preserving references. Support for all those features causes some performance overhead. Source generation can improve serialization performance by generating optimized code that uses `Utf8JsonWriter` directly.

Serialization-optimization mode emits fast-path serialization methods but not serialization metadata. Fast-path serialization is restricted in what it can do; it doesn't support asynchronous serialization or any mode of deserialization.

In addition, the optimized code doesn't support all of the serialization features that `JsonSerializer` supports. The serializer detects whether the optimized code can be used and falls back to default serialization code if unsupported options are specified. For example, `System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString` isn't applicable to writing, so specifying this option doesn't cause a fallback to default code.

The following table shows which options in `JsonSerializerOptions` are supported by fast-path serialization:

| Serialization option                                                   | Supported for fast-path |
|------------------------------------------------------------------------|-------------------------|
| `System.Text.Json.JsonSerializerOptions.AllowTrailingCommas`      | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.Converters`               | ❌                      |
| `System.Text.Json.JsonSerializerOptions.DefaultBufferSize`        | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition`   | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.DictionaryKeyPolicy`      | ❌                      |
| `System.Text.Json.JsonSerializerOptions.Encoder`                  | ❌                      |
| `System.Text.Json.JsonSerializerOptions.IgnoreNullValues`         | ❌                      |
| `System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyFields`     | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.IgnoreReadOnlyProperties` | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.IncludeFields`            | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.MaxDepth`                 | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.NumberHandling`           | ❌                      |
| `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy`     | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.ReferenceHandler`         | ❌                      |
| `System.Text.Json.JsonSerializerOptions.TypeInfoResolver`         | ✔️                      |
| `System.Text.Json.JsonSerializerOptions.WriteIndented`            | ✔️                      |

(The following options aren't supported because they apply only to *de*serialization: `System.Text.Json.JsonSerializerOptions.PropertyNameCaseInsensitive`, `System.Text.Json.JsonSerializerOptions.ReadCommentHandling`, and `System.Text.Json.JsonSerializerOptions.UnknownTypeHandling`.)

The following table shows which attributes are supported by fast-path serialization:

| Attribute                                                         | Supported for fast-path |
|-------------------------------------------------------------------|-------------------------|
| `System.Text.Json.Serialization.JsonConstructorAttribute`    | ❌                      |
| `System.Text.Json.Serialization.JsonConverterAttribute`      | ❌                      |
| `System.Text.Json.Serialization.JsonDerivedTypeAttribute`    | ✔️                      |
| `System.Text.Json.Serialization.JsonExtensionDataAttribute`  | ❌                      |
| `System.Text.Json.Serialization.JsonIgnoreAttribute`         | ✔️                      |
| `System.Text.Json.Serialization.JsonIncludeAttribute`        | ✔️                      |
| `System.Text.Json.Serialization.JsonNumberHandlingAttribute` | ❌                      |
| `System.Text.Json.Serialization.JsonPolymorphicAttribute`    | ✔️                      |
| `System.Text.Json.Serialization.JsonPropertyNameAttribute`   | ✔️                      |
| `System.Text.Json.Serialization.JsonPropertyOrderAttribute`  | ✔️                      |
| `System.Text.Json.Serialization.JsonRequiredAttribute`       | ✔️                      |

If a non-supported option or attribute is specified for a type, the serializer falls back to metadata mode, assuming that the source generator has been configured to generate metadata. In that case, the optimized code isn't used when serializing that type, but it might be used for other types. Therefore it's important to do performance testing with your options and workloads to determine how much benefit you can actually get from serialization-optimization mode. Also, the ability to fall back to `JsonSerializer` code requires metadata mode. If you select only serialization-optimization mode, serialization might fail for types or options that need to fall back to `JsonSerializer` code.

## See also

* JSON serialization and deserialization in .NET - overview
* How to use the library
