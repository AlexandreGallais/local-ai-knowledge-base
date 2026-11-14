---
title: "JsonNode class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Nodes/JsonNode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonNode class

Namespace: `System.Text.Json.Nodes`

```csharp
public abstract class JsonNode
```

The base class that represents a single node within a mutable JSON document.

To be added.

## JsonNode.Item property

```csharp
public System.Text.Json.Nodes.JsonNode? this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: To be added.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0 or `index` is greater than the number of properties.
- `InvalidOperationException`: The current `JsonNode` is not a `JsonArray`.

To be added.

## JsonNode.Item property

```csharp
public System.Text.Json.Nodes.JsonNode? this[string propertyName] { get; set; }
```

Gets or sets the element with the specified property name.
If the property is not found, `null` is returned.

Parameters:

- `propertyName`: The name of the property to return.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `propertyName` is `null`.
- `InvalidOperationException`: The current `JsonNode` is not a `JsonObject`.

To be added.

## JsonNode.Options property

```csharp
public System.Text.Json.Nodes.JsonNodeOptions? Options { get; }
```

Gets the options to control the behavior.

Returns: To be added.

To be added.

## JsonNode.Parent property

```csharp
public System.Text.Json.Nodes.JsonNode? Parent { get; }
```

Gets the parent `JsonNode`.
If there is no parent, `null` is returned.
A parent can either be a `JsonObject` or a `JsonArray`.

Returns: To be added.

To be added.

## JsonNode.Root property

```csharp
public System.Text.Json.Nodes.JsonNode Root { get; }
```

Gets the root `JsonNode`.

Returns: To be added.

#### Remarks

The current node is returned if it is a root.

## JsonNode.AsArray() method

```csharp
public System.Text.Json.Nodes.JsonArray AsArray ();
```

Casts to the derived `JsonArray` type.

Returns: A `JsonArray`.

Exceptions:

- `InvalidOperationException`: The node is not a `JsonArray`.

To be added.

## JsonNode.AsObject() method

```csharp
public System.Text.Json.Nodes.JsonObject AsObject ();
```

Casts to the derived `JsonObject` type.

Returns: A `JsonObject`.

Exceptions:

- `InvalidOperationException`: The node is not a `JsonObject`.

To be added.

## JsonNode.AsValue() method

```csharp
public System.Text.Json.Nodes.JsonValue AsValue ();
```

Casts to the derived `JsonValue` type.

Returns: A `JsonValue`.

Exceptions:

- `InvalidOperationException`: The node is not a `JsonValue`.

To be added.

## JsonNode.DeepClone() method

```csharp
public System.Text.Json.Nodes.JsonNode DeepClone ();
```

Creates a new instance of the `JsonNode` class. All child nodes are recursively cloned.

Returns: A new cloned instance of the current node.

To be added.

## JsonNode.DeepEquals(JsonNode, JsonNode) method

```csharp
public static bool DeepEquals (System.Text.Json.Nodes.JsonNode? node1, System.Text.Json.Nodes.JsonNode? node2);
```

Compares the values of two nodes, including the values of all descendant nodes.

Parameters:

- `node1`: The `JsonNode` to compare.
- `node2`: The `JsonNode` to compare.

Returns: `true` if the tokens are equal; otherwise `false`.

To be added.

## JsonNode.GetElementIndex() method

```csharp
public int GetElementIndex ();
```

Returns the index of the current node from the parent `JsonArray`.

Returns: The index of the current node.

Exceptions:

- `InvalidOperationException`: The current parent is not a `JsonArray`.

To be added.

## JsonNode.GetPath() method

```csharp
public string GetPath ();
```

Gets the JSON path.

Returns: The JSON Path value.

To be added.

## JsonNode.GetPropertyName() method

```csharp
public string GetPropertyName ();
```

Returns the property name of the current node from the parent object.

Returns: The property name of the current node.

Exceptions:

- `InvalidOperationException`: The current parent is not a `JsonObject`.

To be added.

## JsonNode.GetValue<T>() method

```csharp
public virtual T GetValue<T> ();
```

Gets the value for the current `JsonValue`.

Parameters:

- `T`: The type of the value to obtain from the `JsonValue`.

Returns: A value converted from the `JsonValue` instance.

Exceptions:

- `FormatException`: The current `JsonNode` cannot be represented as a {TValue}.
- `InvalidOperationException`: The current `JsonNode` is not a `JsonValue` or is not compatible with {TValue}.

#### Remarks

{T} can be the type or base type of the underlying value. If the underlying value is a `JsonElement` then {T} can also be the type of any primitive value supported by current `JsonElement`.

Specifying the `Object` type for {T} will always succeed and return the underlying value as `Object`.

The underlying value of a `JsonValue` after deserialization is an instance of `JsonElement`,otherwise it's the value specified when the `JsonValue` was created.

## JsonNode.GetValueKind() method

```csharp
public System.Text.Json.JsonValueKind GetValueKind ();
```

Returns the `JsonValueKind` of the current instance.

Returns: The json value kind of the current instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator bool (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `Boolean`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator byte (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `Byte`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator char (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `Char`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator DateTime (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `DateTime`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator DateTimeOffset (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `DateTimeOffset`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator decimal (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `Decimal`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator double (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `Double`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator Guid (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to a `Guid`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator short (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to an `Int16`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator int (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to an `Int32`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator long (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to an `Int64`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator bool? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Boolean`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator byte? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Byte`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator char? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a given `JsonNode` to a `Char`.

Parameters:

- `value`: A `Char` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator DateTime? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `DateTime`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator DateTimeOffset? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `DateTimeOffset`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator decimal? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Decimal`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator double? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Double`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator Guid? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Guid`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator short? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Int16`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator int? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Int32`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator long? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Int64`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator sbyte? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `SByte`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator float? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `Single`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator ushort? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `UInt16`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator uint? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `UInt32`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator ulong? (System.Text.Json.Nodes.JsonNode? value);
```

Defines an explicit conversion of a specified nullable `JsonNode` to a nullable `UInt64`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.

## JsonNode.op_Explicit(JsonNode) method

```csharp
public static explicit operator sbyte (System.Text.Json.Nodes.JsonNode value);
```

Defines an explicit conversion of a given `JsonNode` to an `SByte`.

Parameters:

- `value`: A `JsonNode` to explicitly convert.

Returns: A value converted from the `JsonNode` instance.

To be added.
