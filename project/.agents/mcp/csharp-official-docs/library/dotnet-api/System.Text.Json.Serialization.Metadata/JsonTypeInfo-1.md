---
title: "JsonTypeInfo<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonTypeInfo`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonTypeInfo<T> class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public sealed class JsonTypeInfo<T> : System.Text.Json.Serialization.Metadata.JsonTypeInfo
```

Provides JSON serialization-related metadata about a type.

Parameters:

- `T`: The generic definition of the type.

To be added.

## JsonTypeInfo<T>.CreateObject property

```csharp
public Func<T>? CreateObject { get; set; }
```

Gets or sets a parameterless factory to be used on deserialization.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

A parameterless factory is not supported for the current metadata `JsonTypeInfo.Kind`.

#### Remarks

If set to `null`, any attempt to deserialize instances of the given type will fail at run time.

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
types with a single default constructor or default constructors annotated with `JsonConstructorAttribute`
will be mapped to this delegate.

## JsonTypeInfo<T>.SerializeHandler property

```csharp
public Action<System.Text.Json.Utf8JsonWriter,T>? SerializeHandler { get; }
```

Serializes an instance of `T` using `JsonSourceGenerationOptionsAttribute` values specified at design time.

Returns: To be added.

#### Remarks

The writer is not flushed after writing.

## JsonTypeInfo<T>.UnionConstructor property

```csharp
public Func<Type,object?,T>? UnionConstructor { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonTypeInfo<T>.UnionDeconstructor property

```csharp
public Func<T,(Type? CaseType, object? CaseValue)>? UnionDeconstructor { get; set; }
```

To be added.

Returns: To be added.

To be added.
