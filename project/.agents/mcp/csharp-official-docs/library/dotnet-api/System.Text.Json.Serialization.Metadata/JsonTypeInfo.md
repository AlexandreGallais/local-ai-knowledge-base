---
title: "JsonTypeInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonTypeInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonTypeInfo class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public abstract class JsonTypeInfo
```

Provides JSON serialization-related metadata about a type.

To be added.

## JsonTypeInfo.ConstructorAttributeProvider property

```csharp
public System.Reflection.ICustomAttributeProvider? ConstructorAttributeProvider { get; }
```

Gets or sets an attribute provider corresponding to the deserialization constructor.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

When resolving metadata via the built-in resolvers this will be populated with

the underlying `ConstructorInfo` of the serialized property or field.

## JsonTypeInfo.Converter property

```csharp
public System.Text.Json.Serialization.JsonConverter Converter { get; }
```

Gets the `JsonConverter` associated with the current type.

Returns: To be added.

#### Remarks

The `JsonConverter` associated with the type determines the value of `Kind`,
and by extension the types of metadata that are configurable in the current JSON contract.
As such, the value of the converter cannot be changed once a `JsonTypeInfo` instance has been created.

## JsonTypeInfo.CreateObject property

```csharp
public Func<object>? CreateObject { get; set; }
```

Gets or sets a parameterless factory to be used on deserialization.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

A parameterless factory is not supported for the current metadata `JsonTypeInfo.Kind`.

#### Remarks

If set to `null`, any attempt to deserialize instances of the given type will result in an exception.

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
types with a single default constructor or default constructors annotated with `JsonConstructorAttribute`
will be mapped to this delegate.

## JsonTypeInfo.ElementType property

```csharp
public Type? ElementType { get; }
```

Gets the element type corresponding to an enumerable, dictionary or optional type.

Returns: To be added.

Returns the element type for enumerable types, the value type for dictionary types,

and the underlying type for `Nullable<T>` or F# optional types.

Returns `null` for all other types or types using custom converters.

## JsonTypeInfo.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether the current instance has been locked for modification.

Returns: To be added.

A `JsonTypeInfo` instance can be locked if it has been passed to one of the `JsonSerializer` methods, has been associated with a `JsonSerializerContext` instance, or a user explicitly called the `JsonTypeInfo.MakeReadOnly` method on the instance.

## JsonTypeInfo.KeyType property

```csharp
public Type? KeyType { get; }
```

Gets the key type corresponding to a dictionary type.

Returns: To be added.

Returns the key type for dictionary types.

Returns `null` for all other types or types using custom converters.

## JsonTypeInfo.Kind property

```csharp
public System.Text.Json.Serialization.Metadata.JsonTypeInfoKind Kind { get; }
```

Gets a value that describes the kind of contract metadata that the current instance specifies.

Returns: To be added.

#### Remarks

The value of `Kind` determines what aspects of the JSON contract are configurable.
For example, it is only possible to configure the `Properties` list for metadata
of kind `Object`.

The value of `Kind` is determined exclusively by the `JsonConverter`
resolved for the current type, and cannot be changed once resolution has happened.
User-defined custom converters (specified either via `JsonConverterAttribute` or `Converters`)
are metadata-agnostic and thus always resolve to `None`.

## JsonTypeInfo.NumberHandling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling? NumberHandling { get; set; }
```

Gets or sets the type-level `JsonSerializerOptions.NumberHandling` override.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.
- `ArgumentOutOfRangeException`: An invalid `JsonNumberHandling` value was specified.

#### Remarks

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
the value of this callback will be mapped from any `JsonNumberHandling` annotations.

## JsonTypeInfo.OnDeserialized property

```csharp
public Action<object>? OnDeserialized { get; set; }
```

Gets or sets a callback to be invoked after deserialization occurs.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

Serialization callbacks are only supported for `JsonTypeInfoKind.Object` metadata.

#### Remarks

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
the value of this callback will be mapped from any `IJsonOnDeserialized` implementation on the type.

## JsonTypeInfo.OnDeserializing property

```csharp
public Action<object>? OnDeserializing { get; set; }
```

Gets or sets a callback to be invoked before deserialization occurs.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

Serialization callbacks are only supported for `JsonTypeInfoKind.Object` metadata.

#### Remarks

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
the value of this callback will be mapped from any `IJsonOnDeserializing` implementation on the type.

## JsonTypeInfo.OnSerialized property

```csharp
public Action<object>? OnSerialized { get; set; }
```

Gets or sets a callback to be invoked after serialization occurs.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

Serialization callbacks are only supported for `JsonTypeInfoKind.Object` metadata.

#### Remarks

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
the value of this callback will be mapped from any `IJsonOnSerialized` implementation on the type.

## JsonTypeInfo.OnSerializing property

```csharp
public Action<object>? OnSerializing { get; set; }
```

Gets or sets a callback to be invoked before serialization occurs.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

Serialization callbacks are only supported for `JsonTypeInfoKind.Object` metadata.

#### Remarks

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
the value of this callback will be mapped from any `IJsonOnSerializing` implementation on the type.

## JsonTypeInfo.Options property

```csharp
public System.Text.Json.JsonSerializerOptions Options { get; }
```

Gets the `JsonSerializerOptions` value associated with the current `JsonTypeInfo` instance.

Returns: To be added.

To be added.

## JsonTypeInfo.OriginatingResolver property

```csharp
public System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver? OriginatingResolver { get; set; }
```

Gets or sets the `IJsonTypeInfoResolver` from which this metadata instance originated.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

This metadata is used to determine the `JsonSerializerContext.GeneratedSerializerOptions` configuration for the current metadata instance.

## JsonTypeInfo.PolymorphismOptions property

```csharp
public System.Text.Json.Serialization.Metadata.JsonPolymorphismOptions? PolymorphismOptions { get; set; }
```

Gets or sets a configuration object specifying polymorphism metadata.

Returns: To be added.

Exceptions:

- `ArgumentException`: `value` has been associated with a different `JsonTypeInfo` instance.
- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

Polymorphic serialization is not supported for the current metadata `JsonTypeInfo.Kind`.

#### Remarks

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`,
the configuration of this setting will be mapped from any `JsonDerivedTypeAttribute` or `JsonPolymorphicAttribute` annotations.

## JsonTypeInfo.PreferredPropertyObjectCreationHandling property

```csharp
public System.Text.Json.Serialization.JsonObjectCreationHandling? PreferredPropertyObjectCreationHandling { get; set; }
```

Gets or sets the preferred `JsonObjectCreationHandling` value for properties contained in the type.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

Unmapped member handling is only supported for <see cref="F:System.Text.Json.Serialization.Metadata.JsonTypeInfoKind.Object">JsonTypeInfoKind.Object</see>.
- `ArgumentOutOfRangeException`: Specified an invalid `JsonObjectCreationHandling` value.

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, the value of this callback will be mapped from `JsonObjectCreationHandlingAttribute` annotations on types.

## JsonTypeInfo.Properties property

```csharp
public System.Collections.Generic.IList<System.Text.Json.Serialization.Metadata.JsonPropertyInfo> Properties { get; }
```

Gets the list of `JsonPropertyInfo` metadata corresponding to the current type.

Returns: To be added.

#### Remarks

This property is only applicable to metadata of kind `Object`.
For other kinds, an empty, read-only list will be returned.

The order of `JsonPropertyInfo` entries in the list determines the serialization order,
unless either of the entries specifies a non-zero `Order` value,
in which case the properties will be stable sorted by `Order`.

It's required that added `JsonPropertyInfo` entries are unique up to `Name`,
however this will only be validated on serialization, once the metadata instance gets locked for further modification.

## JsonTypeInfo.Type property

```csharp
public Type Type { get; }
```

Gets the `JsonTypeInfo.Type` for which the JSON serialization contract is being defined.

Returns: To be added.

To be added.

## JsonTypeInfo.TypeClassifier property

```csharp
public System.Text.Json.Serialization.JsonTypeClassifier? TypeClassifier { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonTypeInfo.UnionCases property

```csharp
public System.Collections.Generic.IList<System.Text.Json.Serialization.Metadata.JsonUnionCaseInfo> UnionCases { get; }
```

To be added.

Returns: To be added.

To be added.

## JsonTypeInfo.UnionConstructor property

```csharp
public Func<Type,object?,object>? UnionConstructor { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonTypeInfo.UnionDeconstructor property

```csharp
public Func<object,(Type? CaseType, object? CaseValue)>? UnionDeconstructor { get; set; }
```

To be added.

Returns: To be added.

To be added.

## JsonTypeInfo.UnmappedMemberHandling property

```csharp
public System.Text.Json.Serialization.JsonUnmappedMemberHandling? UnmappedMemberHandling { get; set; }
```

Gets or sets the type-level `JsonUnmappedMemberHandling` override.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

-or-

Unmapped member handling is only supported for `JsonTypeInfoKind.Object`.
- `ArgumentOutOfRangeException`: An invalid `JsonUnmappedMemberHandling` value was specified.

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, the value of this callback will be mapped from any `JsonUnmappedMemberHandlingAttribute` annotations.

## JsonTypeInfo.CreateJsonPropertyInfo(Type, String) method

```csharp
public System.Text.Json.Serialization.Metadata.JsonPropertyInfo CreateJsonPropertyInfo (Type propertyType, string name);
```

Creates a blank `JsonPropertyInfo` instance for the current `JsonTypeInfo`.

Parameters:

- `propertyType`: The declared type for the property.
- `name`: The property name used in JSON serialization and deserialization.

Returns: A blank `JsonPropertyInfo` instance.

Exceptions:

- `ArgumentNullException`: `propertyType` or `name` is `null`.
- `ArgumentException`: `propertyType` cannot be used for serialization.
- `InvalidOperationException`: The `JsonTypeInfo` instance has been locked for further modification.

To be added.

## JsonTypeInfo.CreateJsonTypeInfo(Type, JsonSerializerOptions) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo CreateJsonTypeInfo (Type type, System.Text.Json.JsonSerializerOptions options);
```

Creates a blank `JsonTypeInfo` instance.

Parameters:

- `type`: The type for which contract metadata is specified.
- `options`: The `JsonSerializerOptions` instance the metadata is associated with.

Returns: A blank `JsonTypeInfo` instance.

Exceptions:

- `ArgumentNullException`: `type` or `options` is `null`.
- `ArgumentException`: `type` cannot be used for serialization.

#### Remarks

The returned `JsonTypeInfo` will be blank, with the exception of the
`Converter` property which will be resolved either from
`Converters` or the built-in converters for the type.
Any converters specified via `JsonConverterAttribute` on the type declaration
will not be resolved by this method.

Which converter gets resolved influences the value of `Kind`,
which constrains the type of metadata that can be modified in the `JsonTypeInfo` instance.

## JsonTypeInfo.CreateJsonTypeInfo<T>(JsonSerializerOptions) method

```csharp
public static System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> CreateJsonTypeInfo<T> (System.Text.Json.JsonSerializerOptions options);
```

Creates a blank `JsonTypeInfo<T>` instance.

Parameters:

- `T`: The type for which contract metadata is specified.
- `options`: The `JsonSerializerOptions` instance the metadata is associated with.

Returns: A blank `JsonTypeInfo<T>` instance.

Exceptions:

- `ArgumentNullException`: `options` is `null`.

#### Remarks

The returned <see cref="T:System.Text.Json.Serialization.Metadata.JsonTypeInfo`1> will be blank, with the exception of the
`Converter` property, which will be resolved either from
`Converters` or the built-in converters for the type.
Any converters specified via `JsonConverterAttribute` on the type declaration
will not be resolved by this method.

Which converter gets resolved influences the value of `Kind`,
which constrains the type of metadata that can be modified in the `JsonTypeInfo` instance.

## JsonTypeInfo.MakeReadOnly() method

```csharp
public void MakeReadOnly ();
```

Locks the current instance for further modification.

This method is idempotent.
