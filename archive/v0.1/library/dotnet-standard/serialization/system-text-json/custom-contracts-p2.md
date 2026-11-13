---
title: "Custom serialization and deserialization contracts (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/system-text-json/custom-contracts.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom serialization and deserialization contracts (part 2 of 2)

## Example: Ignore properties with a specific type

Perhaps your model has properties with specific names or types that you don't want to expose to users. For example, you might have a property that stores credentials or some information that's useless to have in the payload.

The following example shows how to filter out properties with a specific type, `SecretHolder`. It does this by using an `System.Collections.Generic.IList`1` extension method to remove any properties that have the specified type from the `System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties` list. The filtered properties completely disappear from the contract, which means `System.Text.Json` doesn't look at them either during serialization or deserialization.

```csharp
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;

namespace Serialization
{
    class ExampleClass
    {
        public string Name { get; set; } = "";
        public SecretHolder? Secret { get; set; }
    }

    class SecretHolder
    {
        public string Value { get; set; } = "";
    }

    class IgnorePropertiesWithType
    {
        private readonly Type[] _ignoredTypes;

        public IgnorePropertiesWithType(params Type[] ignoredTypes)
            => _ignoredTypes = ignoredTypes;

        public void ModifyTypeInfo(JsonTypeInfo ti)
        {
            if (ti.Kind != JsonTypeInfoKind.Object)
                return;

            ti.Properties.RemoveAll(prop => _ignoredTypes.Contains(prop.PropertyType));
        }
    }

    public class IgnoreTypeExample
    {
        public static void RunIt()
        {
            var modifier = new IgnorePropertiesWithType(typeof(SecretHolder));

            JsonSerializerOptions options = new()
            {
                TypeInfoResolver = new DefaultJsonTypeInfoResolver
                {
                    Modifiers = { modifier.ModifyTypeInfo }
                }
            };

            ExampleClass obj = new()
            {
                Name = "<example-value>",
                Secret = new SecretHolder { Value = "<example-value>" }
            };

            string output = JsonSerializer.Serialize(obj, options);
            Console.WriteLine(output);
            // {"Name":"<example-value>"}
        }
    }

    public static class ListHelpers
    {
        // IList<T> implementation of List<T>.RemoveAll method.
        public static void RemoveAll<T>(this IList<T> list, Predicate<T> predicate)
        {
            for (int i = 0; i < list.Count; i++)
            {
                if (predicate(list[i]))
                {
                    list.RemoveAt(i--);
                }
            }
        }
    }
}
```
## Example: Allow int values to be strings

Perhaps your input JSON can contain quotes around one of the numeric types but not on others. If you had control over the class, you could place `System.Text.Json.Serialization.JsonNumberHandlingAttribute` on the type to fix this, but you don't. Before .NET 7, you'd need to write a custom converter to fix this behavior, which requires writing a fair bit of code. Using contract customization, you can customize the number handling behavior for any type.

The following example changes the behavior for all `int` values. The example can be easily adjusted to apply to any type or for a specific property of any type.

```csharp
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

namespace Serialization
{
    public class Point
    {
        public int X { get; set; }
        public int Y { get; set; }
    }

    public class AllowIntsAsStringsExample
    {
        static void SetNumberHandlingModifier(JsonTypeInfo jsonTypeInfo)
        {
            if (jsonTypeInfo.Type == typeof(int))
            {
                jsonTypeInfo.NumberHandling = JsonNumberHandling.AllowReadingFromString;
            }
        }

        public static void RunIt()
        {
            JsonSerializerOptions options = new()
            {
                TypeInfoResolver = new DefaultJsonTypeInfoResolver
                {
                    Modifiers = { SetNumberHandlingModifier }
                }
            };

            // Triple-quote syntax is a C# 11 feature.
            Point point = JsonSerializer.Deserialize<Point>("""{"X":"12","Y":"3"}""", options)!;
            Console.WriteLine($"({point.X},{point.Y})");
            // (12,3)
        }
    }
}
```
Without the modifier to allow reading `int` values from a string, the program would have ended with an exception:

> Unhandled exception. System.Text.Json.JsonException: The JSON value could not be converted to System.Int32. Path: $.X | LineNumber: 0 | BytePositionInLine: 9.

## Other ways to customize serialization

Besides customizing a contract, there are other ways to influence serialization and deserialization behavior, including the following:

- By using attributes derived from `System.Text.Json.Serialization.JsonAttribute`, for example, `System.Text.Json.Serialization.JsonIgnoreAttribute` and `System.Text.Json.Serialization.JsonPropertyOrderAttribute`.
- By modifying `System.Text.Json.JsonSerializerOptions`, for example, to set a naming policy or serialize enumeration values as strings instead of numbers.
- By writing a custom converter that does the actual work of writing the JSON and, during deserialization, constructing an object.

Contract customization is an improvement over these pre-existing customizations because you might not have access to the type to add attributes. In addition, writing a custom converter is complex and hurts performance.

## See also

- JSON contract customization (blog post)
- What's new in System.Text.Json in .NET 7 (blog post)
