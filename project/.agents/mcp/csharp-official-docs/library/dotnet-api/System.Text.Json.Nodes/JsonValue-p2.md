---
title: "JsonValue class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Nodes/JsonValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonValue class (part 2 of 2)

## JsonValue.Create(SByte, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue Create (sbyte value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `value`: The underlying value of the new `JsonValue` instance.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create(Single, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue Create (float value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `value`: The underlying value of the new `JsonValue` instance.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create(String, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue? Create (string? value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `value`: The underlying value of the new `JsonValue` instance.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create(JsonElement, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue? Create (System.Text.Json.JsonElement value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `value`: The underlying value of the new `JsonValue` instance.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create(UInt16, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue Create (ushort value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `value`: The underlying value of the new `JsonValue` instance.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create(UInt32, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue Create (uint value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `value`: The underlying value of the new `JsonValue` instance.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create(UInt64, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue Create (ulong value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `value`: The underlying value of the new `JsonValue` instance.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create<T>(T, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue? Create<T> (T? value, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `T`: The type of value to create.
- `value`: The value to create.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.Create<T>(T, JsonTypeInfo<T>, JsonNodeOptions>) method

```csharp
public static System.Text.Json.Nodes.JsonValue? Create<T> (T? value, System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> jsonTypeInfo, System.Text.Json.Nodes.JsonNodeOptions? options = default);
```

Initializes a new instance of the `JsonValue` class that contains the specified value.

Parameters:

- `T`: The type of value to create.
- `value`: The value to create.
- `jsonTypeInfo`: The `JsonTypeInfo` that will be used to serialize the value.
- `options`: Options to control the behavior.

Returns: The new instance of the `JsonValue` class that contains the specified value.

To be added.

## JsonValue.TryGetValue<T>(T) method

```csharp
public abstract bool TryGetValue<T> (out T? value);
```

Tries to obtain the current JSON value and returns a value that indicates whether the operation succeeded.

Parameters:

- `T`: The type of value to obtain.
- `value`: When this method returns, contains the parsed value.

Returns: `true` if the value can be successfully obtained; otherwise, `false`.

#### Remarks

{T} can be the type or base type of the underlying value. If the underlying value is a `JsonElement`, then {T} can also be the type of any primitive value supported by current `JsonElement`.

Specifying the `Object` type for {T} will always succeed and return the underlying value as `Object`.

The underlying value of a `JsonValue` after deserialization is an instance of `JsonElement`, otherwise it's the value specified when the `JsonValue` was created.
