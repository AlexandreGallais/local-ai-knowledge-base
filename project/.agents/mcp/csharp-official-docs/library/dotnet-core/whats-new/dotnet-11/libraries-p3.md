---
title: "What's new in .NET libraries for .NET 11 (part 3 of 8)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/whats-new/dotnet-11/libraries.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# What's new in .NET libraries for .NET 11 (part 3 of 8)

### System.Text.Json improvements

#### Union serialization

**C# union types.** Starting in .NET 11, C# offers union types. For example, `Reading` can hold an `int` or a `string`:

```csharp
public union Reading(int, string);
```
A `Reading` that holds `"hello"` round-trips as a JSON string:

```csharp
Reading reading = new("hello");
string json = JsonSerializer.Serialize(reading);
Reading copy = JsonSerializer.Deserialize<Reading>(json);
Console.WriteLine(json); // "hello"
Console.WriteLine(copy.Value); // hello
```
The serializer writes the active case directly, without a wrapper or `$type` discriminator. The JSON output depends on the active case:

| Union state | JSON output |
| - | - |
| `string` case with value `"hello"` | `"hello"` |
| `int` case with value `42` | `42` |
| Default struct union with no active case | `null` |

By default, deserialization selects the case from the JSON token kind: number, string, Boolean, array, or object. Two object cases share a token kind, so the default classifier can't distinguish them. To select an object case by its root-level property names, use `System.Text.Json.Serialization.JsonUnionAttribute` with the built-in `System.Text.Json.Serialization.JsonUnionTypeStructuralClassifier`:

```csharp
[JsonUnion(TypeClassifier = typeof(JsonUnionTypeStructuralClassifier))]
public union PetUnion(Dog, Cat);

public sealed record Dog(string Name, string Breed);

public sealed record Cat(string Name, int Lives);
```
```csharp
PetUnion? pet = JsonSerializer.Deserialize<PetUnion>(
    """{"Name":"Misty","Lives":9}""",
    PetJsonContext.Default.PetUnion);

Console.WriteLine(pet?.Value is Cat); // True
```
The payload'<example-value>'t inspect property values or nested content. If the payload matches zero or multiple cases, deserialization throws `System.Text.Json.JsonException`. The classifier doesn't support multiple non-object cases with the same JSON token kind, nested unions, polymorphic cases, or `System.Text.Json.Serialization.ReferenceHandler.Preserve`.

For other case-selection rules, derive from `System.Text.Json.Serialization.JsonTypeClassifierFactory`. The factory receives a `System.Text.Json.Serialization.JsonTypeClassifierContext` describing the union cases and creates a `System.Text.Json.Serialization.JsonTypeClassifier` delegate that reads JSON and selects a case type. Register the factory on one union through `System.Text.Json.Serialization.JsonUnionAttribute.TypeClassifier`, on an options instance through `System.Text.Json.JsonSerializerOptions.TypeClassifiers`, or on a source-generated context through `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.TypeClassifiers`.

`System.Text.Json.Serialization.JsonNumberHandlingAttribute` is honored on C# unions, and the source generator no longer reports SYSLIB1227 for unions that use custom converters.

If a union declares separate `T` and `T?` cases, the serializer selects the nullable case for a `null` payload. A non-null payload is ambiguous without a custom classifier because both cases use the same JSON shape. If no case accepts `null`, JSON `null` deserializes to the default union value, which also serializes as `null`.

For language syntax, see C# 15 union types. For more about classifiers and advanced contract metadata such as `System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Union` and `System.Text.Json.Serialization.Metadata.JsonUnionCaseInfo`, see Serialize union types.

**F# discriminated unions.** The serializer represents cases without fields as JSON strings and cases with fields as JSON objects that contain a `$type` discriminator:

```fsharp
type Shape =
    | Point
    | Circle of radius: float
    | Rectangle of height: float * length: float
```

| F# value | JSON output |
| - | - |
| `Point` | `"Point"` |
| `Circle 3.14` | `{"$type":"Circle","radius":3.14}` |
| `Rectangle(10.0, 20.0)` | `{"$type":"Rectangle","height":10,"length":20}` |

For cases without fields, deserialization accepts both `"Point"` and `{"$type":"Point"}`. Class, struct, and recursive unions are supported. `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy` applies to case and field names, while `System.Text.Json.Serialization.JsonPropertyNameAttribute` on a case takes precedence. You can also change the discriminator property through `System.Text.Json.Serialization.JsonPolymorphicAttribute.TypeDiscriminatorPropertyName`.

> **Important:**
> F# discriminated-union support uses reflection only. It doesn't support `System.Text.Json` source generation, trimming, or Native AOT.

#### JSON Lines output

Four `System.Text.Json.JsonSerializer.SerializeAsyncEnumerable*` overloads serialize an `System.Collections.Generic.IAsyncEnumerable`1` to either a `System.IO.Stream` or `System.IO.Pipelines.PipeWriter`. For each output type, one overload accepts `System.Text.Json.JsonSerializerOptions` and one accepts `System.Text.Json.Serialization.Metadata.JsonTypeInfo`1`.

With the default `topLevelValues: false`, the output remains one JSON array. Set `topLevelValues: true` to write canonical JSON Lines (JSONL). The serializer writes each value compactly and follows it with a line feed (LF), `\n`, including the final value. JSONL output uses LF regardless of `System.Text.Json.JsonSerializerOptions.NewLine` and ignores `System.Text.Json.JsonSerializerOptions.WriteIndented` so that each value occupies one line.

The serializer streams each JSONL entry instead of buffering the entire entry, and it supports entries that contain nested asynchronous enumerables.

```csharp
static async IAsyncEnumerable<int> GenerateNumbers()
{
    for (int i = 0; i < 5; i++)
    {
        yield return i;
        await Task.Yield();
    }
}

using var arrayStream = new MemoryStream();
PipeWriter arrayPipe = PipeWriter.Create(arrayStream);

// Write a JSON array: [0,1,2,3,4]
await JsonSerializer.SerializeAsyncEnumerable(
    arrayPipe,
    GenerateNumbers());
await arrayPipe.CompleteAsync();

using var jsonlStream = new MemoryStream();
PipeWriter jsonlPipe = PipeWriter.Create(jsonlStream);

// Write JSON Lines (one value per line): 0\n1\n2\n3\n4\n
await JsonSerializer.SerializeAsyncEnumerable(
    jsonlPipe,
    GenerateNumbers(),
    topLevelValues: true);
await jsonlPipe.CompleteAsync();
```
#### Polymorphic hierarchy support

For a C# `closed` hierarchy, the serializer can infer the derived types, including generic specializations, and assign deterministic discriminators. Configure inference at any of these scopes:

```csharp
[JsonPolymorphic(InferClosedTypePolymorphism = true)]
closed record Shape;
record Circle(double Radius) : Shape;
record Square(double Length) : Shape;
```

- Set `System.Text.Json.JsonSerializerOptions.InferClosedTypePolymorphism` for reflection-based serialization or as a global runtime setting.
- Set `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.InferClosedTypePolymorphism` so the source generator creates the required metadata at compile time.
- Set `System.Text.Json.Serialization.JsonPolymorphicAttribute.InferClosedTypePolymorphism` to `true` on one hierarchy. Set it to `false` to opt that hierarchy out of a global setting.

Inference also works through nested closed hierarchies, so a `closed` type that derives from another `closed` type contributes its own derived types to the inferred list. Explicit `System.Text.Json.Serialization.JsonDerivedTypeAttribute` registrations take precedence and replace the inferred list instead of extending it. If source-generated metadata doesn't contain inferred or explicitly registered derived types, enabling only the runtime option fails fast. A per-type opt-in on a type that isn't `closed` throws `System.InvalidOperationException` with reflection and produces a source-generation error. Combining a per-type opt-in with explicit derived-type registrations produces a source-generation warning because the explicit registrations replace inference.

Open generic derived-type registrations are also supported. For example, one attribute registers `Derived<T>` for every compatible closed `Base<T>`:

```csharp
[JsonDerivedType(typeof(Derived<>), "derived")]
public class Base<T> { }
public class Derived<T> : Base<T> { }
```

The resolver supports these type-argument patterns:

| Pattern | Example resolution |
| - | - |
| Direct binding | `Base<int>` resolves `Derived<T> : Base<T>` to `Derived<int>`. |
| Reordered parameters | `Base<int, string>` resolves `Derived : Base<V, U>` to `Derived<string, int>`. |
| Partially concrete parameters | `Base<string, int>` resolves `Derived<T> : Base<T, int>` to `Derived<string>`. |
| Nested or array parameters | `Base<List<int>>` resolves `Derived<T> : Base<List<T>>` to `Derived<int>`. |

The same rules apply to generic interfaces and types nested in generic outer types. The registration must resolve to exactly one closed derived type and satisfy its generic constraints. A ground-type mismatch, an unbound parameter, a constraint violation, an ambiguous match, or an incompatible shape throws `System.InvalidOperationException` with reflection. For source generation, an unresolved registration produces the SYSLIB1229 warning, and the generated hierarchy still fails when the serializer configures it. Suppressing the warning doesn't make the registration valid.

For serializer configuration guidance, see Infer polymorphism from a closed hierarchy and Configure open generic derived types. For more information about the language feature, see C# 15 closed hierarchies.

#### Source-generation and contract metadata

The `System.Text.Json` source generator supports more contract shapes, and the generated unsafe accessors are compatible with the updated C# unsafe semantics:

- Members marked with `System.Text.Json.Serialization.JsonIncludeAttribute` can have `private`, `internal`, or `protected` accessors. Private, internal, and protected fields are also supported when they're marked with `[JsonInclude]`.
- An inaccessible constructor marked with `System.Text.Json.Serialization.JsonConstructorAttribute` can participate in deserialization.
- An omitted `init`-only property retains its property-initializer value. The generated contract sets the property after construction only when the JSON payload contains that property.

`JsonSerializer` also deserializes types with constructors whose parameters use `in`, `ref`, `out`, or `ref readonly`. The serializer binds `in`, `ref`, and `ref readonly` parameters by their element type. An `out` parameter doesn't bind a JSON constructor argument; the constructor receives an initialized output location, and a matching writable property can receive the JSON value after construction.

For more information, see Source-generation modes in System.Text.Json and Use immutable types and properties.

Generic `System.Text.Json.JsonSerializerOptions.GetTypeInfo``1` and `System.Text.Json.JsonSerializerOptions.TryGetTypeInfo``1(System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0}@)` methods return `System.Text.Json.Serialization.Metadata.JsonTypeInfo`1` without a manual cast. `GetTypeInfo<T>()` throws if the options can't resolve the type, while `TryGetTypeInfo<T>()` returns `false` in that case. Resolver and configuration exceptions can still propagate. These methods simplify metadata access in source-generation, Native AOT, and polymorphic serialization scenarios. For more information, see Get strongly typed metadata.

```csharp
JsonSerializerOptions options = new(JsonSerializerDefaults.Web);
options.MakeReadOnly(populateMissingResolver: true);

// Before: manual downcast required
JsonTypeInfo<MyRecord> info1 = (JsonTypeInfo<MyRecord>)options.GetTypeInfo(typeof(MyRecord));

// After: generic method returns the right type directly
JsonTypeInfo<MyRecord> info2 = options.GetTypeInfo<MyRecord>();

// TryGetTypeInfo variant for cases where the type may not be registered
if (options.TryGetTypeInfo<MyRecord>(out JsonTypeInfo<MyRecord>? typeInfo))
{
    // Use typeInfo
    _ = typeInfo;
}
```
#### Property names and ignore conditions

`System.Text.Json.JsonNamingPolicy.PascalCase` and `System.Text.Json.Serialization.JsonKnownNamingPolicy.PascalCase` provide built-in PascalCase conversion. Apply `System.Text.Json.Serialization.JsonNamingPolicyAttribute` to a class, struct, interface, property, or field to select a naming policy at the type or member level.

Naming precedence, from highest to lowest, is `System.Text.Json.Serialization.JsonPropertyNameAttribute`, a member-level `[JsonNamingPolicy]`, a type-level `[JsonNamingPolicy]`, `System.Text.Json.JsonSerializerOptions.PropertyNamingPolicy`, and the original member name.

`System.Text.Json.Serialization.JsonIgnoreAttribute` can now set a default ignore condition on classes, structs, and interfaces. A member-level `[JsonIgnore]` takes precedence over the type-level condition, which takes precedence over `System.Text.Json.JsonSerializerOptions.DefaultIgnoreCondition`. `System.Text.Json.Serialization.JsonIgnoreCondition.Always` isn't valid at the type level; reflection throws `System.InvalidOperationException`, while source generation reports `SYSLIB1226` and ignores the type-level attribute.

```csharp
// Type-level JsonIgnore: all members use WhenWritingNull by default
// Type-level JsonNamingPolicy: ReleaseVersion uses snake_case
// Per-member JsonNamingPolicy: EventName uses camelCase even though the
// serializer options use PascalCase
var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.PascalCase
};

var data = new EventData { EventName = "Launch", ReleaseVersion = "11", Notes = null };
string json = JsonSerializer.Serialize(data, options);
Console.WriteLine(json);
// {"eventName":"Launch","release_version":"11"}  -- Notes omitted (null), EventName camel-cased
```
For more information, see Apply a naming policy to a type or member and Ignore properties based on a type-level condition.

#### Converters and collection contracts

**Numeric converters.** The serializer includes built-in converters for `System.Numerics.BFloat16`, `System.Numerics.Decimal32`, `System.Numerics.Decimal64`, and `System.Numerics.Decimal128`. The converters support number-handling options, dictionary keys, and JSON Schema export. For generated metadata, `System.Text.Json.Serialization.Metadata.JsonMetadataServices` exposes `System.Text.Json.Serialization.Metadata.JsonMetadataServices.BFloat16Converter`, `System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal32Converter`, `System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal64Converter`, and `System.Text.Json.Serialization.Metadata.JsonMetadataServices.Decimal128Converter`.

**Open generic converters.** `System.Text.Json.Serialization.JsonConverterAttribute` can reference an open generic converter on a generic type or member:

```csharp
[JsonConverter(typeof(OptionConverter<>))]
public readonly struct Option<T> { }
```
