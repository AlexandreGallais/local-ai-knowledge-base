---
title: "Custom serialization and deserialization contracts (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/system-text-json/custom-contracts.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Customize a JSON contract

The `System.Text.Json` library constructs a JSON *contract* for each .NET type, which defines how the type should be serialized and deserialized. The contract is derived from the type's shape, which includes characteristics such as its properties and fields and whether it implements the `System.Collections.IEnumerable` or `System.Collections.IDictionary` interface. Types are mapped to contracts either at runtime using reflection or at compile time using the source generator.

Starting in .NET 7, you can customize these JSON contracts to provide more control over how types are converted into JSON and vice versa. The following list shows just some examples of the types of customizations you can make to serialization and deserialization:

- Serialize private fields and properties.
- Support multiple names for a single property (for example, if a previous library version used a different name).
- Ignore properties with a specific name, type, or value.
- Distinguish between explicit `null` values and the lack of a value in the JSON payload.
- Support `System.Runtime.Serialization` attributes, such as `System.Runtime.Serialization.DataContractAttribute`. For more information, see System.Runtime.Serialization attributes.
- Throw an exception if the JSON includes a property that's not part of the target type. For more information, see Handle missing members.

## How to opt in

There are two ways to plug into customization. Both involve obtaining a resolver, whose job is to provide a `System.Text.Json.Serialization.Metadata.JsonTypeInfo` instance for each type that needs to be serialized.

- By calling the `System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver.#ctor` constructor to obtain the `System.Text.Json.JsonSerializerOptions.TypeInfoResolver` and adding your custom actions to its `System.Text.Json.Serialization.Metadata.DefaultJsonTypeInfoResolver.Modifiers` property.

  For example:

  ```csharp
  JsonSerializerOptions options = new()
  {
      TypeInfoResolver = new DefaultJsonTypeInfoResolver
      {
          Modifiers =
          {
              MyCustomModifier1,
              MyCustomModifier2
          }
      }
  };
  ```

  If you add multiple modifiers, they'll be called sequentially.

- By writing a custom resolver that implements `System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver`.

  - If a type isn't handled, `System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver.GetTypeInfo*` should return `null` for that type.
  - You can also combine your custom resolver with others, for example, the default resolver. The resolvers will be queried in order until a non-null `System.Text.Json.Serialization.Metadata.JsonTypeInfo` value is returned for the type.

## Get strongly typed metadata

Starting in .NET 11, use `System.Text.Json.JsonSerializerOptions.GetTypeInfo``1` and `System.Text.Json.JsonSerializerOptions.TryGetTypeInfo``1(System.Text.Json.Serialization.Metadata.JsonTypeInfo{``0}@)` as strongly typed alternatives to casting the result of `System.Text.Json.JsonSerializerOptions.GetTypeInfo(System.Type)`:

```csharp
JsonTypeInfo<WeatherForecast> typeInfo =
    options.GetTypeInfo<WeatherForecast>();

bool found = options.TryGetTypeInfo<WeatherForecast>(
    out JsonTypeInfo<WeatherForecast>? optionalTypeInfo);
```

`TryGetTypeInfo<T>` returns `false` when no resolver supplies metadata for `T`.

## Configurable aspects

The `System.Text.Json.Serialization.Metadata.JsonTypeInfo.Kind` property indicates how the converter serializes a given type—for example, as an object or as an array, and whether its properties are serialized. Query this property to determine which aspects of a type's JSON contract you can configure. The property has five possible values:

| `JsonTypeInfo.Kind` | Description |
|---------------------|-------------|
| `System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Object` | The converter will serialize the type into a JSON object and uses its properties. **This kind is used for most class and struct types and allows for the most flexibility.** |
| `System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Enumerable` | The converter will serialize the type into a JSON array. This kind is used for types like `List<T>` and array. |
| `System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Dictionary` | The converter will serialize the type into a JSON object. This kind is used for types like `Dictionary<K, V>`. |
| `System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Union` | The converter serializes the active case value from a union. Starting in .NET 11, this kind is used for C# union types and exposes case, classifier, constructor, and deconstructor metadata. |
| `System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.None` | The converter doesn't specify how it will serialize the type or what `JsonTypeInfo` properties it will use. This kind is used for types like `System.Object`, `int`, and `string`, and for all types that use a custom converter. |

## Modifiers

A modifier is an `Action<JsonTypeInfo>` or a method with a `System.Text.Json.Serialization.Metadata.JsonTypeInfo` parameter that gets the current state of the contract as an argument and makes modifications to the contract. For example, you could iterate through the prepopulated properties on the specified `System.Text.Json.Serialization.Metadata.JsonTypeInfo` to find the one you're interested in and then modify its `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Get` property (for serialization) or `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set` property (for deserialization). Or, you can construct a new property using `System.Text.Json.Serialization.Metadata.JsonTypeInfo.CreateJsonPropertyInfo(System.Type,System.String)` and add it to the `System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties` collection.

The following table shows the modifications you can make and how to achieve them.

| Modification | Applicable `JsonTypeInfo.Kind` | How to achieve it | Example |
|--------------|--------------------------------|-------------------|---------|
| Customize a property's value | `JsonTypeInfoKind.Object` | Modify the `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Get` delegate (for serialization) or `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set` delegate (for deserialization) for the property. | Increment a property's value |
| Add or remove properties | `JsonTypeInfoKind.Object` | Add or remove items from the `System.Text.Json.Serialization.Metadata.JsonTypeInfo.Properties` list. | Serialize private fields |
| Conditionally serialize a property | `JsonTypeInfoKind.Object` | Modify the `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.ShouldSerialize` predicate for the property. | Ignore properties with a specific type |
| Customize number handling for a specific type | `JsonTypeInfoKind.None` | Modify the `System.Text.Json.Serialization.Metadata.JsonTypeInfo.NumberHandling` value for the type. | Allow int values to be strings |
| Customize union cases or classification | `JsonTypeInfoKind.Union` | Modify the union cases, classifier, constructor, or deconstructor on `System.Text.Json.Serialization.Metadata.JsonTypeInfo`. | Serialize union types |

## Example: Increment a property's value

Consider the following example where the modifier increments the value of a certain property on deserialization by modifying its `System.Text.Json.Serialization.Metadata.JsonPropertyInfo.Set` delegate. Besides defining the modifier, the example also introduces a new attribute that it uses to locate the property whose value should be incremented. This is an example of *customizing a property*.

```csharp
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;

namespace Serialization
{
    // Custom attribute to annotate the property
    // we want to be incremented.
    [AttributeUsage(AttributeTargets.Property)]
    class SerializationCountAttribute : Attribute
    {
    }

    // Example type to serialize and deserialize.
    class Product
    {
        public string Name { get; set; } = "";
        [SerializationCount]
        public int RoundTrips { get; set; }
    }

    public class SerializationCountExample
    {
        // Custom modifier that increments the value
        // of a specific property on deserialization.
        static void IncrementCounterModifier(JsonTypeInfo typeInfo)
        {
            foreach (JsonPropertyInfo propertyInfo in typeInfo.Properties)
            {
                if (propertyInfo.PropertyType != typeof(int))
                    continue;

                object[] serializationCountAttributes = propertyInfo.AttributeProvider?.GetCustomAttributes(typeof(SerializationCountAttribute), true) ?? Array.Empty<object>();
                SerializationCountAttribute? attribute = serializationCountAttributes.Length == 1 ? (SerializationCountAttribute)serializationCountAttributes[0] : null;

                if (attribute != null)
                {
                    Action<object, object?>? setProperty = propertyInfo.Set;
                    if (setProperty is not null)
                    {
                        propertyInfo.Set = (obj, value) =>
                        {
                            if (value != null)
                            {
                                // Increment the value by 1.
                                value = (int)value + 1;
                            }

                            setProperty (obj, value);
                        };
                    }
                }
            }
        }

        public static void RunIt()
        {
            var product = new Product
            {
                Name = "Aquafresh"
            };

            JsonSerializerOptions options = new()
            {
                TypeInfoResolver = new DefaultJsonTypeInfoResolver
                {
                    Modifiers = { IncrementCounterModifier }
                }
            };

            // First serialization and deserialization.
            string serialized = JsonSerializer.Serialize(product, options);
            Console.WriteLine(serialized);
            // {"Name":"Aquafresh","RoundTrips":0}

            Product deserialized = JsonSerializer.Deserialize<Product>(serialized, options)!;
            Console.WriteLine($"{deserialized.RoundTrips}");
            // 1

            // Second serialization and deserialization.
            serialized = JsonSerializer.Serialize(deserialized, options);
            Console.WriteLine(serialized);
            // { "Name":"Aquafresh","RoundTrips":1}

            deserialized = JsonSerializer.Deserialize<Product>(serialized, options)!;
            Console.WriteLine($"{deserialized.RoundTrips}");
            // 2
        }
    }
}
```
Notice in the output that the value of `RoundTrips` is incremented each time the `Product` instance is deserialized.

## Example: Serialize private fields

By default, `System.Text.Json` ignores private fields and properties. This example adds a new class-wide attribute, `JsonIncludePrivateFieldsAttribute`, to change that default. If the modifier finds the attribute on a type, it adds all the private fields on the type as new properties to `System.Text.Json.Serialization.Metadata.JsonTypeInfo`.

```csharp
using System.Reflection;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Text.Json.Serialization.Metadata;

namespace Serialization
{
    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Struct)]
    public class JsonIncludePrivateFieldsAttribute : Attribute { }

    [JsonIncludePrivateFields]
    public class Human
    {
        private string _name;
        private int _age;

        public Human()
        {
            // This constructor should be used only by deserializers.
            _name = null!;
            _age = 0;
        }

        public static Human Create(string name, int age)
        {
            Human h = new()
            {
                _name = name,
                _age = age
            };

            return h;
        }

        [JsonIgnore]
        public string Name
        {
            get => _name;
            set => throw new NotSupportedException();
        }

        [JsonIgnore]
        public int Age
        {
            get => _age;
            set => throw new NotSupportedException();
        }
    }

    public class PrivateFieldsExample
    {
        static void AddPrivateFieldsModifier(JsonTypeInfo jsonTypeInfo)
        {
            if (jsonTypeInfo.Kind != JsonTypeInfoKind.Object)
                return;

            if (!jsonTypeInfo.Type.IsDefined(typeof(JsonIncludePrivateFieldsAttribute), inherit: false))
                return;

            foreach (FieldInfo field in jsonTypeInfo.Type.GetFields(BindingFlags.Instance | BindingFlags.NonPublic))
            {
                JsonPropertyInfo jsonPropertyInfo = jsonTypeInfo.CreateJsonPropertyInfo(field.FieldType, field.Name);
                jsonPropertyInfo.Get = field.GetValue;
                jsonPropertyInfo.Set = field.SetValue;

                jsonTypeInfo.Properties.Add(jsonPropertyInfo);
            }
        }

        public static void RunIt()
        {
            var options = new JsonSerializerOptions
            {
                TypeInfoResolver = new DefaultJsonTypeInfoResolver
                {
                    Modifiers = { AddPrivateFieldsModifier }
                }
            };

            var human = Human.Create("Julius", 37);
            string json = JsonSerializer.Serialize(human, options);
            Console.WriteLine(json);
            // {"_name":"Julius","_age":37}

            Human deserializedHuman = JsonSerializer.Deserialize<Human>(json, options)!;
            Console.WriteLine($"[Name={deserializedHuman.Name}; Age={deserializedHuman.Age}]");
            // [Name=Julius; Age=37]
        }
    }
}
```
> **Tip:**
> If your private field names start with underscores, consider removing the underscores from the names when you add the fields as new JSON properties.
