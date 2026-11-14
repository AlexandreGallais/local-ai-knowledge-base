---
title: "JsonObject class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Nodes/JsonObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonObject class (part 2 of 2)

## JsonObject.TryAdd(String, JsonNode, Int32) method

```csharp
public bool TryAdd (string propertyName, System.Text.Json.Nodes.JsonNode? value, out int index);
```

Adds an element with the provided name and value to the `JsonObject`, if a property named `propertyName` doesn't already exist.

Parameters:

- `propertyName`: The property name of the element to add.
- `value`: The value of the element to add.
- `index`: The index of the added or existing `propertyName`. This is always a valid index into the `JsonObject`.

Returns: `true` if the property didn't exist and the element was added; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## JsonObject.TryGetPropertyValue(String, JsonNode) method

```csharp
public bool TryGetPropertyValue (string propertyName, out System.Text.Json.Nodes.JsonNode? jsonNode);
```

Returns the value of a property with the specified name.

Parameters:

- `propertyName`: The name of the property to return.
- `jsonNode`: The JSON value of the property with the specified name.

Returns: `true` if a property with the specified name was found; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## JsonObject.TryGetPropertyValue(String, JsonNode, Int32) method

```csharp
public bool TryGetPropertyValue (string propertyName, out System.Text.Json.Nodes.JsonNode? jsonNode, out int index);
```

Gets the value associated with the specified property name.

Parameters:

- `propertyName`: The property name of the value to get.
- `jsonNode`: When this method returns, it contains the value associated with the specified property name, if the property name is found; otherwise `null`.
- `index`: The index of `propertyName` if found; otherwise, -1.

Returns: `true` if the `JsonObject` contains an element with the specified property name; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.

To be added.

## JsonObject.WriteTo(Utf8JsonWriter, JsonSerializerOptions) method

```csharp
public override void WriteTo (System.Text.Json.Utf8JsonWriter writer, System.Text.Json.JsonSerializerOptions? options = default);
```

Writes the `JsonNode` into the provided `Utf8JsonWriter` as JSON.

Parameters:

- `writer`: The `Utf8JsonWriter`.
- `options`: Options to control the serialization behavior.

Exceptions:

- `ArgumentNullException`: The `writer` parameter is `null`.

To be added.
