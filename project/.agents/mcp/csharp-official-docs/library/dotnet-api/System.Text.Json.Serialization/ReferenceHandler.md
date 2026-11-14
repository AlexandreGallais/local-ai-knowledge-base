---
title: "ReferenceHandler class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/ReferenceHandler.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReferenceHandler class

Namespace: `System.Text.Json.Serialization`

```csharp
public abstract class ReferenceHandler
```

Defines how the `JsonSerializer` deals with references on serialization and deserialization.

To be added.

## ReferenceHandler.ReferenceHandler() constructor

```csharp
protected ReferenceHandler ();
```

Initializes a new instance of the `ReferenceHandler` class.

To be added.

## ReferenceHandler.IgnoreCycles property

```csharp
public static System.Text.Json.Serialization.ReferenceHandler IgnoreCycles { get; }
```

Gets an object that indicates whether an object is ignored when a reference cycle is detected during serialization.

Returns: To be added.

To be added.

## ReferenceHandler.Preserve property

```csharp
public static System.Text.Json.Serialization.ReferenceHandler Preserve { get; }
```

Gets an object that indicates whether metadata properties are honored when JSON objects and arrays are deserialized into reference types, and written when reference types are serialized. This is necessary to create round-trippable JSON from objects that contain cycles or duplicate references.

Returns: To be added.

#### Remarks

* On Serialize:

* When writing complex reference types, the serializer also writes metadata properties (`$id`, `$values`, and `$ref`) within them.
* The output JSON will contain an extra `$id` property for every object, and for every enumerable type the JSON array emitted will be nested within a JSON object containing an `$id` and `$values` property.
* `ReferenceEquals` is used to determine whether objects are identical.
* When an object is identical to a previously serialized one, a pointer (`$ref`) to the identifier (`$id`) of such object is written instead.
* No metadata properties are written for value types.

* On Deserialize:

* The metadata properties within the JSON that are used to preserve duplicated references and cycles will be honored as long as they are well-formed.\*
* For JSON objects that don't contain any metadata properties, the deserialization behavior is identical to not using `Preserve`.
* For value types, the `$id` metadata property is ignored. A `JsonException` is thrown if a `$ref` metadata property is found within the JSON object.
* For enumerable value types, the `$values` metadata property is ignored.

* For the metadata properties within the JSON to be considered well-formed, they must follow these rules:

* Unless `AllowOutOfOrderMetadataProperties` is set to `true`, the `$id` metadata property must be the first property in the JSON object.
* A JSON object that contains a `$ref` metadata property must not contain any other properties.
* The value of the `$ref` metadata property must refer to an `$id` that has appeared earlier in the JSON.
* The value of the `$id` and `$ref` metadata properties must be a JSON string.
* For enumerable types, such as `List<T>`, the JSON array must be nested within a JSON object containing an `$id` and `$values` metadata property, in that order. (However, the order is not important if `AllowOutOfOrderMetadataProperties` is set to `true`.)
* For enumerable types, the `$values` metadata property must be a JSON array.
* The `$values` metadata property is only valid when referring to enumerable types.

If the JSON is not well-formed, a `JsonException` is thrown.

## ReferenceHandler.CreateResolver() method

```csharp
public abstract System.Text.Json.Serialization.ReferenceResolver CreateResolver ();
```

Returns the `ReferenceResolver` used for each serialization call.

Returns: The resolver to use for serialization and deserialization.

To be added.
