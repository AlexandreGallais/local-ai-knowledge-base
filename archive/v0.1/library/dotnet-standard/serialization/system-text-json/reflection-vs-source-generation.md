---
title: "How to choose reflection or source generation in System.Text.Json"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/reflection-vs-source-generation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Reflection versus source generation in System.Text.Json

This article explains the differences between reflection and source generation as it relates to `System.Text.Json` serialization. It also provides guidance on how to choose the best approach for your scenario.

## Metadata collection

To serialize or deserialize a type, `System.Text.Json.JsonSerializer` needs information about how to access the members of the type. `JsonSerializer` needs the following information:

* How to access property getters and fields for serialization.
* How to access a constructor, property setters, and fields for deserialization.
* Information about which attributes have been used to customize serialization or deserialization.
* Runtime configuration from `System.Text.Json.JsonSerializerOptions`.

This information is referred to as *metadata*.

## Reflection

By default, `System.Text.Json.JsonSerializer` collects metadata at runtime by using reflection. Whenever `JsonSerializer` has to serialize or deserialize a type for the first time, it collects and caches this metadata. The metadata collection process takes time and uses memory.

## Source generation

As an alternative, `System.Text.Json` can use the C# source generation feature to improve performance, reduce private memory usage, and facilitate assembly trimming, which reduces app size. In addition, certain reflection APIs can't be used in Native AOT applications, so you must use source generation for those apps.

Source generation can be used in two modes:

* **Metadata-based mode**

  During compilation, `System.Text.Json` collects the information needed for serialization and generates source code files that populate JSON contract metadata for the requested types.

* **Serialization-optimization (fast path) mode**

  `System.Text.Json.JsonSerializer` features that customize the output of serialization, such as naming policies and reference preservation, carry a performance overhead. In serialization-optimization mode, System.Text.Json generates optimized serialization code that uses `Utf8JsonWriter` directly. This optimized or *fast path* code increases serialization throughput.

  Fast-path *deserialization* isn't currently available. For more information, see dotnet/runtime issue 55043.

Source generation for `System.Text.Json` requires C# 9.0 or a later version.

> **Note:**
> F# discriminated union support works only in reflection mode. It requires dynamic code and untrimmed reflection metadata. You can't use it with source generation or Native AOT. For more information, see F# discriminated unions.

## Feature comparison

Choose reflection or source-generation modes based on the following benefits that each one offers:

| Benefit                                              | Reflection | Source generation(Metadata-based mode) | Source generation(Serialization-optimization mode) |
|------------------------------------------------------|------------|---------------------|----------------------------|
| Simpler to code.                                     | ✔️        | ❌                  | ❌                        |
| Simpler to debug.                                    | ❌        | ✔️                  | ✔️                        |
| Supports `[JsonInclude]` on non-public members.      | ✔️        | ✔️*      | ✔️*            |
| Supports all available serialization customizations. | ✔️        | ❌†      | ❌†            |
| Reduces start-up time.                               | ❌        | ✔️                  | ✔️                        |
| Reduces private memory usage.                        | ❌        | ✔️                  | ✔️                        |
| Eliminates runtime reflection.                      | ❌        | ✔️                  | ✔️                        |
| Facilitates trim-safe app size reduction.            | ❌        | ✔️                  | ✔️                        |
| Increases serialization throughput.                  | ❌        | ❌                  | ✔️                        |

\* Starting in .NET 11, source generation supports `private`, `internal`, and `protected` members that you explicitly mark with [JsonInclude]. It also supports `private`, `internal`, and `protected` accessors on properties that you mark with `[JsonInclude]`. Metadata-based source generation supports inaccessible constructors that you mark with [JsonConstructor]. Generated setters run only for `init`-only properties that appear in the JSON, so omitted properties keep their initializer values. In .NET 10 and earlier versions, source generation doesn't support `private` or `protected` members or accessors, or inaccessible constructors. The generated context can access `internal` members and accessors only when they share an assembly. For more information, see Non-public members and constructors.
† Use the contract customization API to modify source-generated contracts.
