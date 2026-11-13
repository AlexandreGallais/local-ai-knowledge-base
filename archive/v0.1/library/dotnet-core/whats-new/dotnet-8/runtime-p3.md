---
title: "What's new in .NET 8 runtime (part 3 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/whats-new/dotnet-8/runtime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# What's new in .NET 8 runtime (part 3 of 6)

### Serialization

Many improvements have been made to `System.Text.Json` serialization and deserialization functionality in .NET 8. For example, you can customize handling of JSON properties that aren't in the POCO.

The following sections describe other serialization improvements:

- Built-in support for additional types
- Source generator
- Interface hierarchies
- Naming policies
- Read-only properties
- Disable reflection-based default
- New JsonNode API methods
- Non-public members
- Streaming deserialization APIs
- WithAddedModifier extension method
- New JsonContent.Create overloads
- Freeze a JsonSerializerOptions instance

For more information about JSON serialization in general, see JSON serialization and deserialization in .NET.

#### Built-in support for additional types

The serializer has built-in support for the following additional types.

- `System.Half`, `System.Int128`, and `System.UInt128` numeric types.

  ```csharp
  Console.WriteLine(JsonSerializer.Serialize(
      [ Half.MaxValue, Int128.MaxValue, UInt128.MaxValue ]
  ));
  // [65500,170141183460469231731687303715884105727,340282366920938463463374607431768211455]
  ```

- `System.Memory`1` and `System.ReadOnlyMemory`1` values. `byte` values are serialized to Base64 strings, and other types to JSON arrays.

  ```csharp
  JsonSerializer.Serialize<ReadOnlyMemory<byte>>(new byte[] { 1, 2, 3 }); // "AQID"
  JsonSerializer.Serialize<Memory<int>>(new int[] { 1, 2, 3 }); // [1,2,3]
  ```

#### Source generator

.NET 8 includes enhancements of the System.Text.Json source generator that are aimed at making the Native AOT experience on par with the reflection-based serializer. For example:

- The source generator now supports serializing types with `required` and `init` properties. These were both already supported in reflection-based serialization.
- Improved formatting of source-generated code.
- `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute` feature parity with `System.Text.Json.JsonSerializerOptions`. For more information, see Specify options (source generation).
- Additional diagnostics (such as SYSLIB1034 and SYSLIB1039).
- Don't include types of ignored or inaccessible properties.
- Support for nesting `JsonSerializerContext` declarations within arbitrary type kinds.
- Support for compiler-generated or *unspeakable* types in weakly typed source generation scenarios. Since compiler-generated types can't be explicitly specified by the source generator, `System.Text.Json` now performs nearest-ancestor resolution at runtime. This resolution determines the most appropriate supertype with which to serialize the value.
- New converter type `JsonStringEnumConverter<TEnum>`. The existing `System.Text.Json.Serialization.JsonStringEnumConverter` class isn't supported in Native AOT. You can annotate your enum types as follows:

  ```csharp
  [JsonConverter(typeof(JsonStringEnumConverter<MyEnum>))]
  public enum MyEnum { Value1, Value2, Value3 }

  [JsonSerializable(typeof(MyEnum))]
  public partial class MyContext : JsonSerializerContext { }
  ```

  For more information, see Serialize enum fields as strings.

- New `JsonConverter.Type` property lets you look up the type of a non-generic `JsonConverter` instance:

  ```csharp
  Dictionary<Type, JsonConverter> CreateDictionary(IEnumerable<JsonConverter> converters)
      => converters.Where(converter => converter.Type != null)
                   .ToDictionary(converter => converter.Type!);
  ```

  The property is nullable since it returns `null` for `JsonConverterFactory` instances and `typeof(T)` for `JsonConverter<T>` instances.

##### Chain source generators

The `System.Text.Json.JsonSerializerOptions` class includes a new `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain` property that complements the existing `System.Text.Json.JsonSerializerOptions.TypeInfoResolver` property. These properties are used in contract customization for chaining source generators. The addition of the new property means that you don't have to specify all chained components at one call site—they can be added after the fact. `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain` also lets you introspect the chain or remove components from it. For more information, see Combine source generators.

In addition, `System.Text.Json.JsonSerializerOptions.AddContext``1` is now obsolete. It's been superseded by the `System.Text.Json.JsonSerializerOptions.TypeInfoResolver` and `System.Text.Json.JsonSerializerOptions.TypeInfoResolverChain` properties. For more information, see SYSLIB0049.

#### Interface hierarchies

.NET 8 adds support for serializing properties from interface hierarchies.

The following code shows an example where the properties from both the immediately implemented interface and its base interface are serialized.

```csharp
public static void InterfaceHierarchies()
{
    IDerived value = new DerivedImplement { Base = 0, Derived = 1 };
    string json = JsonSerializer.Serialize(value);
    Console.WriteLine(json); // {"Derived":1,"Base":0}
}

public interface IBase
{
    public int Base { get; set; }
}

public interface IDerived : IBase
{
    public int Derived { get; set; }
}

public class DerivedImplement : IDerived
{
    public int Base { get; set; }
    public int Derived { get; set; }
}
```
#### Naming policies

`JsonNamingPolicy` includes new naming policies for `snake_case` (with an underscore) and `kebab-case` (with a hyphen) property name conversions. Use these policies similarly to the existing `System.Text.Json.JsonNamingPolicy.CamelCase` policy:

```csharp
var options = new JsonSerializerOptions
{
    PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower
};
JsonSerializer.Serialize(new { PropertyName = "value" }, options);
// { "property_name" : "value" }
```

For more information, see Use a built-in naming policy.

#### Read-only properties

You can now deserialize onto read-only fields or properties (that is, those that don't have a `set` accessor).

To opt in to this support globally, set a new option, `System.Text.Json.JsonSerializerOptions.PreferredObjectCreationHandling`, to `System.Text.Json.Serialization.JsonObjectCreationHandling.Populate`. If compatibility is a concern, you can also enable the functionality more granularly by placing the `[JsonObjectCreationHandling(JsonObjectCreationHandling.Populate)]` attribute on specific types whose properties are to be populated, or on individual properties.

For example, consider the following code that deserializes into a `CustomerInfo` type that has two read-only properties.

```csharp
public static void ReadOnlyProperties()
{
    CustomerInfo customer = JsonSerializer.Deserialize<CustomerInfo>("""
        { "Names":["John Doe"], "Company":{"Name":"Contoso"} }
        """)!;

    Console.WriteLine(JsonSerializer.Serialize(customer));
}

class CompanyInfo
{
    public required string Name { get; set; }
    public string? PhoneNumber { get; set; }
}

[JsonObjectCreationHandling(JsonObjectCreationHandling.Populate)]
class CustomerInfo
{
    // Both of these properties are read-only.
    public List<string> Names { get; } = new();
    public CompanyInfo Company { get; } = new()
    {
        Name = "N/A",
        PhoneNumber = "N/A"
    };
}
```
Prior to .NET 8, the input values were ignored and the `Names` and `Company` properties retained their default values.

```output
{"Names":[],"Company":{"Name":"N/A","PhoneNumber":"N/A"}}
```

Now, the input values are used to populate the read-only properties during deserialization.

```output
{"Names":["John Doe"],"Company":{"Name":"Contoso","PhoneNumber":"N/A"}}
```

For more information about the *populate* deserialization behavior, see Populate initialized properties.

#### Disable reflection-based default

You can now disable using the reflection-based serializer by default. This disablement is useful to avoid accidental rooting of reflection components that aren't even in use, especially in trimmed and Native AOT apps. To disable default reflection-based serialization by requiring that a `System.Text.Json.JsonSerializerOptions` argument be passed to the `System.Text.Json.JsonSerializer` serialization and deserialization methods, set the `JsonSerializerIsReflectionEnabledByDefault` MSBuild property to `false` in your project file.

Use the new `System.Text.Json.JsonSerializer.IsReflectionEnabledByDefault` API to check the value of the feature switch. If you're a library author building on top of `System.Text.Json`, you can rely on the property to configure your defaults without accidentally rooting reflection components.

For more information, see Disable reflection defaults.

#### New JsonNode API methods

The `System.Text.Json.Nodes.JsonNode` and `System.Text.Json.Nodes.JsonArray` types include the following new methods.

```csharp
public partial class JsonNode
{
    // Creates a deep clone of the current node and all its descendants.
    public JsonNode DeepClone();

    // Returns true if the two nodes are equivalent JSON representations.
    public static bool DeepEquals(JsonNode? node1, JsonNode? node2);

    // Determines the JsonValueKind of the current node.
    public JsonValueKind GetValueKind(JsonSerializerOptions options = null);

    // If node is the value of a property in the parent
    // object, returns its name.
    // Throws InvalidOperationException otherwise.
    public string GetPropertyName();

    // If node is the element of a parent JsonArray,
    // returns its index.
    // Throws InvalidOperationException otherwise.
    public int GetElementIndex();

    // Replaces this instance with a new value,
    // updating the parent object/array accordingly.
    public void ReplaceWith<T>(T value);

    // Asynchronously parses a stream as UTF-8 encoded data
    // representing a single JSON value into a JsonNode.
    public static Task<JsonNode?> ParseAsync(
        Stream utf8Json,
        JsonNodeOptions? nodeOptions = null,
        JsonDocumentOptions documentOptions = default,
        CancellationToken <example-value> = default);
}

public partial class JsonArray
{
    // Returns an IEnumerable<T> view of the current array.
    public IEnumerable<T> GetValues<T>();
}
```

#### Non-public members

You can opt non-public members into the serialization contract for a given type using `System.Text.Json.Serialization.JsonIncludeAttribute` and `System.Text.Json.Serialization.JsonConstructorAttribute` attribute annotations.

```csharp
public static void NonPublicMembers()
{
    string json = JsonSerializer.Serialize(new MyPoco(42));
    Console.WriteLine(json);
    // {"X":42}

    JsonSerializer.Deserialize<MyPoco>(json);
}

public class MyPoco
{
    [JsonConstructor]
    internal MyPoco(int x) => X = x;

    [JsonInclude]
    internal int X { get; }
}
```
For more information, see Use immutable types and non-public members and accessors.

#### Streaming deserialization APIs

.NET 8 includes new `System.Collections.Generic.IAsyncEnumerable`1` streaming deserialization extension methods, for example `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsAsyncEnumerable*`. Similar methods have existed that return `System.Threading.Tasks.Task`1`, for example, `System.Net.Http.Json.HttpClientJsonExtensions.GetFromJsonAsync*`. The new extension methods invoke streaming APIs and return `System.Collections.Generic.IAsyncEnumerable`1`.

The following code shows how you might use the new extension methods.

```csharp
public async static void StreamingDeserialization()
{
    const string RequestUri = "https://api.contoso.com/books";
    using var client = new HttpClient();
    IAsyncEnumerable<Book?> books = client.GetFromJsonAsAsyncEnumerable<Book>(RequestUri);

    await foreach (Book? book in books)
    {
        Console.WriteLine($"Read book '{book?.title}'");
    }
}

public record Book(int id, string title, string author, int publishedYear);
```
#### WithAddedModifier extension method

The new `System.Text.Json.Serialization.Metadata.JsonTypeInfoResolver.WithAddedModifier(System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver,System.Action{System.Text.Json.Serialization.Metadata.JsonTypeInfo})` extension method lets you easily introduce modifications to the serialization contracts of arbitrary `IJsonTypeInfoResolver` instances.

```csharp
var options = new JsonSerializerOptions
{
    TypeInfoResolver = MyContext.Default
        .WithAddedModifier(static typeInfo =>
        {
            foreach (JsonPropertyInfo prop in typeInfo.Properties)
            {
                prop.Name = prop.Name.ToUpperInvariant();
            }
        })
};
```

#### New JsonContent.Create overloads

You can now create `System.Net.Http.Json.JsonContent` instances using trim-safe or source-generated contracts. The new methods are:

- `System.Net.Http.Json.JsonContent.Create(System.Object,System.Text.Json.Serialization.Metadata.JsonTypeInfo,System.Net.Http.Headers.MediaTypeHeaderValue)`
- `System.Net.Http.Json.JsonContent.Create``1(``0,System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0},System.Net.Http.Headers.MediaTypeHeaderValue)`

```csharp
var book = new Book(id: 42, "Title", "Author", publishedYear: 2023);
HttpContent content = JsonContent.Create(book, MyContext.Default.Book);

public record Book(int id, string title, string author, int publishedYear);

[JsonSerializable(typeof(Book))]
public partial class MyContext : JsonSerializerContext
{
}
```

#### Freeze a JsonSerializerOptions instance

The following new methods let you control when a `System.Text.Json.JsonSerializerOptions` instance is frozen:

- `System.Text.Json.JsonSerializerOptions.MakeReadOnly`

  This overload is designed to be trim-safe and will therefore throw an exception in cases where the options instance hasn't been configured with a resolver.

- `System.Text.Json.JsonSerializerOptions.MakeReadOnly(System.Boolean)`

  If you pass `true` to this overload, it populates the options instance with the default reflection resolver if one is missing. This method is marked `RequiresUnreferenceCode`/`RequiresDynamicCode` and is therefore unsuitable for Native AOT applications.

The new `System.Text.Json.JsonSerializerOptions.IsReadOnly` property lets you check if the options instance is frozen.
