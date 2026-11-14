---
title: "JsonObjectCreationHandlingAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonObjectCreationHandlingAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonObjectCreationHandlingAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonObjectCreationHandlingAttribute : System.Text.Json.Serialization.JsonAttribute
```

Determines how deserialization handles object creation for fields or properties.

When placed on a field or property, this attribute indicates if the member will be replaced or populated.
When default resolvers are used, this attribute maps to `JsonPropertyInfo.ObjectCreationHandling`.

When placed on a type with `JsonObjectCreationHandling.Populate`, this attribute indicates that all members that support population will be populated. When default resolvers are used, this attribute maps to `JsonTypeInfo.PreferredPropertyObjectCreationHandling`.

The attribute corresponds only to the preferred values of creation handling for properties when placed on a type.
For example, when `JsonObjectCreationHandlingAttribute` with `JsonObjectCreationHandling.Populate` is placed on a class and a property is not capable of being populated, it will be replaced.
That might be `true` if, for example, the value type doesn't have a setter or the property is of type `IEnumerable<T>`.

Only the property type is taken into consideration. For example, if the property is of type `IEnumerable<T>` has and has a run-time value of type `List<T>`, it won't be populated because `IEnumerable<T>` is not capable of populating.

Value types require a setter to support population. In such cases, deserialization uses a copy of the property value, which will get assigned back to the setter once finished.

## JsonObjectCreationHandlingAttribute.JsonObjectCreationHandlingAttribute(JsonObjectCreationHandling) constructor

```csharp
public JsonObjectCreationHandlingAttribute (System.Text.Json.Serialization.JsonObjectCreationHandling handling);
```

Initializes a new instance of `JsonObjectCreationHandlingAttribute`.

Parameters:

- `handling`: The handling to apply to the current member.

To be added.

## JsonObjectCreationHandlingAttribute.Handling property

```csharp
public System.Text.Json.Serialization.JsonObjectCreationHandling Handling { get; }
```

Gets the configuration to use when deserializing members.

Returns: To be added.

To be added.
