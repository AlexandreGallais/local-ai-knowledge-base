---
title: "Supported types in System.Text.Json (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/supported-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Supported types in System.Text.Json (part 3 of 3)

### Custom collections

Any collection type that isn't in one of the preceding namespaces is considered a custom collection. Such types include user-defined types and types defined by ASP.NET Core. For example, `Microsoft.Extensions.Primitives` is in this group.

All custom collections (everything that derives from `IEnumerable`) are supported for serialization, as long as their element types are supported.

#### Deserialization support

A custom collection is supported for deserialization if it:

* Isn't an interface or abstract.
* Has a parameterless constructor.
* Contains element types that are supported by `System.Text.Json.JsonSerializer`.
* Implements or inherits one or more of the following interfaces or classes:
  * `System.Collections.Concurrent.ConcurrentQueue`1`
  * `System.Collections.Concurrent.ConcurrentStack`1` \*
  * `System.Collections.Generic.ICollection`1`
  * `System.Collections.IDictionary`
  * `System.Collections.Generic.IDictionary`2` †
  * `System.Collections.IList`
  * `System.Collections.Generic.IList`1`
  * `System.Collections.Queue`
  * `System.Collections.Generic.Queue`1`
  * `System.Collections.Stack` \*
  * `System.Collections.Generic.Stack`1` \*

  \* See Support round trip for `Stack` types.

  † See Supported key types.

#### Known issues

There are known issues with the following custom collections:

* `System.Dynamic.ExpandoObject`: See dotnet/runtime#29690.
* `System.Dynamic.DynamicObject`: See dotnet/runtime#1808.
* `System.Data.DataTable`: See dotnet/docs#21366.
* `Microsoft.AspNetCore.Http.FormFile`: See dotnet/runtime#1559.
* `Microsoft.AspNetCore.Http.IFormCollection`: See dotnet/runtime#1559.

For more information about known issues, see the open issues in System.Text.Json.

### Supported key types

When used as the keys of `Dictionary` and `SortedList` types, the following types have built-in support:

* `System.Numerics.BFloat16` (.NET 11 and later)
* `Boolean`
* `Byte`
* `DateTime`
* `DateTimeOffset`
* `Decimal`
* `System.Numerics.Decimal32` (.NET 11 and later)
* `System.Numerics.Decimal64` (.NET 11 and later)
* `System.Numerics.Decimal128` (.NET 11 and later)
* `Double`
* `Enum`
* `Guid`
* `Int16`
* `Int32`
* `Int64`
* `Object` (Only on serialization and if the runtime type is one of the supported types in this list.)
* `SByte`
* `Single`
* `String`
* `System.TimeSpan`
* `UInt16`
* `UInt32`
* `UInt64`
* `System.Uri`
* `System.Version`

In addition, the `System.Text.Json.Serialization.JsonConverter`1.WriteAsPropertyName(System.Text.Json.Utf8JsonWriter,`0,System.Text.Json.JsonSerializerOptions)` and `System.Text.Json.Serialization.JsonConverter`1.ReadAsPropertyName(System.Text.Json.Utf8JsonReader@,System.Type,System.Text.Json.JsonSerializerOptions)` methods let you add dictionary key support for any type of your choosing.

## BFloat16 and decimal floating-point types

Starting in .NET 11, `System.Text.Json` includes built-in converters for the `System.Numerics.BFloat16`, `System.Numerics.Decimal32`, `System.Numerics.Decimal64`, and `System.Numerics.Decimal128` types. Finite values serialize as JSON numbers.

These types behave like the other built-in numeric types:

* Dictionary-key conversion supports all four types.
* They honor `System.Text.Json.Serialization.JsonNumberHandling`, including the `"NaN"`, `"Infinity"`, and `"-Infinity"` literals through `System.Text.Json.Serialization.JsonNumberHandling.AllowNamedFloatingPointLiterals`.

`System.Text.Json.Serialization.Metadata.JsonMetadataServices` exposes converter properties for source-generated metadata. The properties are `System.Text.Json.Serialization.Metadata.JsonMetadataServices.BFloat16Converter`, `System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal32Converter`, `System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal64Converter`, and `System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal128Converter`.

## F# discriminated unions

Starting in .NET 11, `System.Text.Json` serializes and deserializes F# discriminated unions, including class, struct, and recursive unions:

```fsharp
type Shape =
    | Point
    | Circle of radius: float
```

* A case without fields serializes as a JSON string that contains the case name, such as `"Point"`.
* A case that has fields serializes as a JSON object. The object contains a `$type` discriminator followed by the case's named fields, such as `{"$type":"Circle","radius":3.14}`.

`System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` applies to case names and field names. A case-level `System.Text.Json.Serialization.JsonPropertyNameAttribute` takes precedence. To use a discriminator property name other than `$type`, set `System.Text.Json.Serialization.JsonPolymorphicAttribute.TypeDiscriminatorPropertyName`.

> **Important:**
> F# discriminated union support is reflection-only. It requires dynamic code and untrimmed reflection metadata. You can't use it with `System.Text.Json` source generation or Native AOT.

## Unsupported types

The following types aren't supported for serialization:

* `System.Type` and `System.Reflection.MemberInfo`
* `System.ReadOnlySpan`1`, `System.Span`1`, and ref structs in general
* Delegate types
* `System.IntPtr` and `System.UIntPtr`

### System.Data namespace

There are no built-in converters for `System.Data.DataSet`, `System.Data.DataTable`, and related types in the `System.Data` namespace. Deserializing these types from untrusted input is not safe, as explained in the security guidance. However, you can write a custom converter to support these types. For sample custom converter code that serializes and deserializes a `DataTable`, see RoundtripDataTable.cs.

## See also

* Populate initialized properties
* System.Text.Json overview
* System.Text.Json API reference
* System.Text.Json.Serialization API reference
