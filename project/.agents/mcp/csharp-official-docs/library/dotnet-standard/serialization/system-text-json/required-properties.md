---
title: "Require properties for deserialization"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/required-properties.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Required properties

You can mark certain properties to signify that they must be present in the JSON payload for deserialization to succeed. Similarly, you can set an option to specify that all non-optional constructor parameters are present in the JSON payload. If one or more of these required properties is not present, the `System.Text.Json.JsonSerializer.Deserialize*` methods throw a `System.Text.Json.JsonException`.

There are three ways to mark a property or field as required for JSON deserialization:

- By adding the `required` modifier.
- By annotating it with `System.Text.Json.Serialization.JsonRequiredAttribute`.
- By modifying the `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.IsRequired` property of the contract model.

To specify that all non-optional constructor parameters are required for JSON deserialization, set the `System.Text.Json.JsonSerializerOptions.RespectRequiredConstructorParameters` option (or, for source generation, `System.Text.Json.Serialization.JsonSourceGenerationOptionsAttribute.RespectRequiredConstructorParameters` property) to `true`. For more information, see the Non-optional constructor parameters section.

From the serializer's perspective, the C# `required` modifier and `[JsonRequired]` attribute are equivalent, and both map to the same piece of metadata, which is `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.IsRequired`. In most cases, you'd simply use the built-in C# keyword. However, in the following cases, you should use `System.Text.Json.Serialization.JsonRequiredAttribute` instead:

- If you're using a programming language other than C# or a down-level version of C#.
- If you only want the requirement to apply to JSON deserialization.
- If you're using `System.Text.Json` serialization in source generation mode. In this case, your code won't compile if you use the `required` modifier, as source generation occurs at compile time.

The following code snippet shows an example of a property modified with the `required` keyword. This property must be present in the JSON payload for deserialization to succeed.

```csharp
public static void RunIt()
{
    // The following line throws a JsonException at run time.
    Console.WriteLine(JsonSerializer.Deserialize<Person>("""{"Age": 42}"""));
}

public class Person
{
    public required string Name { get; set; }
    public int Age { get; set; }
}
```
Alternatively, you can use `System.Text.Json.Serialization.JsonRequiredAttribute`:

```csharp
public static void RunIt()
{
    // The following line throws a JsonException at run time.
    Console.WriteLine(JsonSerializer.Deserialize<Person>("""{"Age": 42}"""));
}

public class Person
{
    [JsonRequired]
    public string Name { get; set; }
    public int Age { get; set; }
}
```
It's also possible to control whether a property is required via the contract model using the `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.IsRequired` property:

```csharp
public static void RunIt()
{
    var options = new JsonSerializerOptions
    {
        TypeInfoResolver = new DefaultJsonTypeInfoResolver
        {
            Modifiers =
            {
                static typeInfo =>
                {
                    if (typeInfo.Kind != JsonTypeInfoKind.Object)
                        return;

                    foreach (JsonPropertyInfo propertyInfo in typeInfo.Properties)
                    {
                        // Strip IsRequired constraint from every property.
                        propertyInfo.IsRequired = false;
                    }
                }
            }
        }
    };

    // Deserialization succeeds even though
    // the Name property isn't in the JSON payload.
    JsonSerializer.Deserialize<Person>("""{"Age": 42}""", options);
}

public class Person
{
    public required string Name { get; set; }
    public int Age { get; set; }
}
```
## Non-optional constructor parameters

Prior to .NET 9, constructor-based deserialization treated all constructor parameters as optional, as the following example shows:

```csharp
var result = JsonSerializer.Deserialize<Person>("{}");
Console.WriteLine(result); // Person { Name = , Age = 0 }

record Person(string Name, int Age);
```

Starting in .NET 9, you can set the `System.Text.Json.JsonSerializerOptions.RespectRequiredConstructorParameters` flag to treat non-optional constructor parameters as required.

```csharp
public static void RunIt()
{
    JsonSerializerOptions options = new()
    {
        RespectRequiredConstructorParameters = true
    };
    string json = """{"Age": 42}""";

    // The following line throws a JsonException at run time.
    JsonSerializer.Deserialize<Person>(json, options);
}

record Person(string Name, int? Age = null);
```
### Feature switch

You can turn on the `RespectRequiredConstructorParameters` setting globally using the `System.Text.Json.Serialization.RespectRequiredConstructorParametersDefault` feature switch. Add the following MSBuild item to your project file (for example, *.csproj* file):

```xml
<ItemGroup>
  <RuntimeHostConfigurationOption Include="System.Text.Json.Serialization.RespectRequiredConstructorParametersDefault" Value="true" />
</ItemGroup>
```

The `RespectRequiredConstructorParametersDefault` API was implemented as an opt-in flag in .NET 9 to avoid breaking existing applications. If you're writing a new application, it's highly recommended that you enable this flag in your code.

## See also

- Respect nullable annotations
