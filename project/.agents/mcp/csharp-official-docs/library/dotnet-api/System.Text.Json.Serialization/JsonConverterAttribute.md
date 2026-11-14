---
title: "JsonConverterAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonConverterAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonConverterAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public class JsonConverterAttribute : System.Text.Json.Serialization.JsonAttribute
```

When placed on a property or type, specifies the converter type to use.

#### Remarks

The specified converter type must derive from `JsonConverter`.

When placed on a property, the specified converter will always be used.

When placed on a type, the specified converter will be used unless a compatible converter is added to the `Converters` collection or there is another `JsonConverterAttribute` on a property of the same type.

For more information, see How to write custom converters for JSON serialization.

## JsonConverterAttribute.JsonConverterAttribute() constructor

```csharp
protected JsonConverterAttribute ();
```

Initializes a new instance of `JsonConverterAttribute`.

To be added.

## JsonConverterAttribute.JsonConverterAttribute(Type) constructor

```csharp
public JsonConverterAttribute (Type converterType);
```

Initializes a new instance of `JsonConverterAttribute` with the specified converter type.

Parameters:

- `converterType`: The type of the converter.

To be added.

## JsonConverterAttribute.ConverterType property

```csharp
public Type? ConverterType { get; }
```

Gets the type of the `JsonConverterAttribute`, or `null` if it was created without a type.

Returns: The type of the `JsonConverterAttribute`, or `null` if it was created without a type.

To be added.

## JsonConverterAttribute.CreateConverter(Type) method

```csharp
public virtual System.Text.Json.Serialization.JsonConverter? CreateConverter (Type typeToConvert);
```

When overridden in a derived class and `JsonConverterAttribute.ConverterType` is `null`, allows the derived class to create a `JsonConverter` in order to pass <example-value> state.

Parameters:

- `typeToConvert`: The type of the converter.

Returns: The custom converter.

To be added.
