---
title: "JsonExtensionDataAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization/JsonExtensionDataAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonExtensionDataAttribute class

Namespace: `System.Text.Json.Serialization`

```csharp
public sealed class JsonExtensionDataAttribute : System.Text.Json.Serialization.JsonAttribute
```

When placed on a property of type `IDictionary<T1,T2>`, any properties that do not have a matching member are added to that dictionary during deserialization and written during serialization.

#### Remarks

The dictionary's `TKey` value must be `String`, and `TValue` must be `JsonElement` or `Object`.

During deserialization, when using `Object`, a "null" JSON value is treated as a `null` object reference, and when using `JsonElement`, a "null" is treated as a JsonElement with `ValueKind` set to `Null`.

During serialization, the name of the extension data property is not included in the JSON; the data contained within the extension data is serialized as properties of the JSON object.

If there is more than one property on a type with this extension data attribute, or if the property itself is not of the correct `IDictionary<T1,T2>` type, an `InvalidOperationException` is thrown during the first serialization or deserialization of that type.

For more information, see How to handle overflow JSON with System.Text.Json.

## JsonExtensionDataAttribute.JsonExtensionDataAttribute() constructor

```csharp
public JsonExtensionDataAttribute ();
```

Initializes a new instance of the `JsonExtensionDataAttribute` class.

To be added.
