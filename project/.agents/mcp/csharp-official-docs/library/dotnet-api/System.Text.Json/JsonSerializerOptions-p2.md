---
title: "JsonSerializerOptions class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonSerializerOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonSerializerOptions class (part 2 of 3)

## JsonSerializerOptions.PropertyNameCaseInsensitive property

```csharp
public bool PropertyNameCaseInsensitive { get; set; }
```

Gets or sets a value that indicates whether a property's name uses a case-insensitive comparison during deserialization. The default value is `false`.

Returns: `true` if property names are compared case-insensitively; otherwise, `false`.

#### Remarks

There is a performance cost associated with case-insensitive comparison (that is, when `PropertyNameCaseInsensitive` is `true`).

For more information, see How to enable case-insensitive property name matching with System.Text.Json.

## JsonSerializerOptions.PropertyNamingPolicy property

```csharp
public System.Text.Json.JsonNamingPolicy? PropertyNamingPolicy { get; set; }
```

Gets or sets a value that specifies the policy used to convert a property's name on an object to another format, such as camel-casing, or `null` to leave property names unchanged.

Returns: A property naming policy, or `null` to leave property names unchanged.

#### Remarks

The resulting property name is expected to match the JSON payload during deserialization, and will be used when writing the property name during serialization.

The policy is not used for properties that have a `JsonPropertyNameAttribute` applied.

For more information, see How to customize property names and values with System.Text.Json.

## JsonSerializerOptions.ReadCommentHandling property

```csharp
public System.Text.Json.JsonCommentHandling ReadCommentHandling { get; set; }
```

Gets or sets a value that defines how comments are handled during deserialization.

Returns: A value that indicates whether comments are allowed, disallowed, or skipped.

Exceptions:

- `InvalidOperationException`: This property was set after serialization or deserialization has occurred.
- `ArgumentOutOfRangeException`: The comment handling enum is set to a value that is not supported (or not within the `JsonCommentHandling` enum range).

#### Remarks

By default, a `JsonException` is thrown during deserialization if a comment is encountered.

For more information, see How to allow some kinds of invalid JSON with System.Text.Json.

## JsonSerializerOptions.ReferenceHandler property

```csharp
public System.Text.Json.Serialization.ReferenceHandler? ReferenceHandler { get; set; }
```

Gets or sets an object that specifies how object references are handled when reading and writing JSON.

Returns: To be added.

#### Remarks

By default, serialization does not support objects with cycles and does not preserve duplicate references. Metadata properties will not be written when serializing reference types and will be treated as regular properties on deserialize.

* On Serialize:

* Treats duplicate object references as if they were unique and writes all their properties.
* The serializer throws a `JsonException` if an object contains a cycle.

* On Deserialize:

* Metadata properties (`$id`, `$values`, and `$ref`) will not be consumed and therefore will be treated as regular JSON properties.
* The metadata properties can map to a real property on the returned object if the property names match, or will be added to the `JsonExtensionDataAttribute` overflow dictionary, if one exists; otherwise, they are ignored.

Use `Preserve` to enable unique object reference preservation on serialization and metadata consumption to read preserved references on deserialization.

## JsonSerializerOptions.RespectNullableAnnotations property

```csharp
public bool RespectNullableAnnotations { get; set; }
```

Gets or sets a value that indicates whether nullability annotations should be respected during serialization and deserialization.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

Configures the serializer to throw an exception when trying to serialize a `null` value from a non-nullable property getter,
or when deserializing a `null` value into a non-nullable property setter or constructor parameter.
Nullability annotations are resolved from the properties, fields, and constructor parameters
that are used by the serializer. This includes annotations stemming from attributes such as
`NotNullAttribute`, `MaybeNullAttribute`,
`AllowNullAttribute` and `DisallowNullAttribute`.

Due to restrictions in how nullable reference types are represented at run time,
this setting only governs nullability annotations of non-generic properties, fields, and constructor parameters.
It cannot be used to enforce nullability annotations of root-level types, collection elements, or generic parameters.
The default setting for this property can be toggled application-wide using the
"System.Text.Json.Serialization.RespectNullableAnnotationsDefault" feature switch.

Nullability validation functions independently of required-ness validation,
that is to say the setting has no effect in scenarios where the payload is missing a required property.
This can be configured independently using the `required` keyword,
the `Serialization.JsonRequiredAttribute` attribute,
or the `JsonSerializerOptions.RespectRequiredConstructorParameters` property.

It is recommended that new applications always set this property to `true`,
in combination with the closely related `JsonSerializerOptions.RespectRequiredConstructorParameters` property.

## JsonSerializerOptions.RespectRequiredConstructorParameters property

```csharp
public bool RespectRequiredConstructorParameters { get; set; }
```

Gets or sets a value that indicates whether non-optional constructor parameters should be specified during deserialization.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: This property is set after serialization or deserialization has occurred.

For historical reasons constructor-based deserialization treats all constructor parameters as optional by default,
filling missing parameters with default values when they are not present in the JSON payload.
This flag allows users to toggle that behavior as necessary for each `JsonSerializerOptions` instance.
The default setting for this property can be toggled application-wide using the
"System.Text.Json.Serialization.RespectRequiredConstructorParametersDefault" feature switch.

It is recommended that new applications always set this property to `true`,
in combination with the closely related `JsonSerializerOptions.RespectNullableAnnotations` property.

## JsonSerializerOptions.Strict property

```csharp
public static System.Text.Json.JsonSerializerOptions Strict { get; }
```

Gets a read-only, singleton instance of `JsonSerializerOptions` that uses the strict configuration.

Returns: To be added.

Each `JsonSerializerOptions` instance encapsulates its own serialization metadata caches, so using fresh default instances every time one is needed can result in redundant recomputation of converters.

This property provides a shared instance that can be consumed by any number of components without necessitating any converter recomputation.

## JsonSerializerOptions.TypeClassifiers property

```csharp
public System.Collections.Generic.IList<System.Text.Json.Serialization.JsonTypeClassifierFactory> TypeClassifiers { get; }
```

To be added.

Returns: To be added.

To be added.

## JsonSerializerOptions.TypeInfoResolver property

```csharp
public System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver? TypeInfoResolver { get; set; }
```

Gets or sets the `JsonTypeInfo` contract resolver used by this instance.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The property is set after serialization or deserialization has occurred.

#### Remarks

A `null` setting is equivalent to using the reflection-based `DefaultJsonTypeInfoResolver`.
The property will be populated automatically once used with one of the `JsonSerializer` methods.

## JsonSerializerOptions.TypeInfoResolverChain property

```csharp
public System.Collections.Generic.IList<System.Text.Json.Serialization.Metadata.IJsonTypeInfoResolver> TypeInfoResolverChain { get; }
```

Gets the list of chained `JsonTypeInfo` contract resolvers used by this instance.

Returns: To be added.

The ordering of the chain is significant: `JsonSerializerOptions` will query each of the resolvers in their specified order, returning the first result that is non-null.
If all resolvers in the chain return `null`, then `JsonSerializerOptions` will also return `null`.

This property is auxiliary to and is kept in sync with the `JsonSerializerOptions.TypeInfoResolver` property.
Any change made to this property is reflected by `JsonSerializerOptions.TypeInfoResolver` and vice versa.

## JsonSerializerOptions.UnknownTypeHandling property

```csharp
public System.Text.Json.Serialization.JsonUnknownTypeHandling UnknownTypeHandling { get; set; }
```

Gets or sets an object that specifies how deserializing a type declared as an `Object` is handled during deserialization.

Returns: To be added.

To be added.

## JsonSerializerOptions.UnmappedMemberHandling property

```csharp
public System.Text.Json.Serialization.JsonUnmappedMemberHandling UnmappedMemberHandling { get; set; }
```

Gets or sets an object that specifies how `JsonSerializer` handles JSON properties that cannot be mapped to a specific .NET member when deserializing object types.

Returns: To be added.

To be added.

## JsonSerializerOptions.Web property

```csharp
public static System.Text.Json.JsonSerializerOptions Web { get; }
```

Gets a read-only, singleton instance of `JsonSerializerOptions` that uses the web configuration.

Returns: To be added.

Each `JsonSerializerOptions` instance encapsulates its own serialization metadata caches,

so using fresh default instances every time one is needed can result in redundant recomputation of converters.

This property provides a shared instance that can be consumed by any number of components without necessitating any converter recomputation.

## JsonSerializerOptions.WriteIndented property

```csharp
public bool WriteIndented { get; set; }
```

Gets or sets a value that indicates whether JSON should use pretty printing. By default, JSON is serialized without any extra white space.

Returns: `true` if JSON is pretty printed on serialization; otherwise, `false`. The default is `false`.

Exceptions:

- `InvalidOperationException`: This property was set after serialization or deserialization has occurred.

Pretty printing includes:

- Indenting nested JSON tokens.
- Adding new lines
- Adding white space between property names and values.

For more information, see How to serialize and deserialize JSON.

## JsonSerializerOptions.AddContext<TContext>() method

```csharp
public void AddContext<TContext> () where TContext : System.Text.Json.Serialization.JsonSerializerContext, new();
```

Appends a new `JsonSerializerContext` to the metadata resolution of the current `JsonSerializerOptions` instance.

Parameters:

- `TContext`: The generic definition of the specified context type.

To be added.

## JsonSerializerOptions.GetConverter(Type) method

```csharp
public System.Text.Json.Serialization.JsonConverter GetConverter (Type typeToConvert);
```

Returns the converter for the specified type.

Parameters:

- `typeToConvert`: The type to return a converter for.

Returns: The first converter that supports the given type.

Exceptions:

- `InvalidOperationException`: The configured `JsonConverter` for `typeToConvert` returned an invalid converter.
- `NotSupportedException`: There is no compatible `JsonConverter` for `typeToConvert` or its serializable members.

#### Remarks

For more information, see How to write custom converters for JSON serialization (marshalling) in .NET.

## JsonSerializerOptions.GetTypeInfo(Type) method

```csharp
public System.Text.Json.Serialization.Metadata.JsonTypeInfo GetTypeInfo (Type type);
```

Gets the `JsonTypeInfo` contract metadata resolved by the current `JsonSerializerOptions` instance.

Parameters:

- `type`: The type to resolve contract metadata for.

Returns: The contract metadata resolved for `type`.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: `type` is not valid for serialization.

#### Remarks

Returned metadata can be downcast to `JsonTypeInfo<T>` and used with the relevant `JsonSerializer` overloads.

If the `JsonSerializerOptions` instance is locked for modification, the method returns a cached instance for the metadata.

## JsonSerializerOptions.GetTypeInfo<T>() method

```csharp
public System.Text.Json.Serialization.Metadata.JsonTypeInfo<T> GetTypeInfo<T> ();
```

To be added.

Parameters:

- `T`: To be added.

Returns: To be added.

To be added.

## JsonSerializerOptions.MakeReadOnly() method

```csharp
public void MakeReadOnly ();
```

Marks the current instance as read-only to prevent any further user modification.

Exceptions:

- `InvalidOperationException`: The instance does not specify a `JsonSerializerOptions.TypeInfoResolver` setting.

This method is idempotent.

## JsonSerializerOptions.MakeReadOnly(Boolean) method

```csharp
public void MakeReadOnly (bool populateMissingResolver);
```

Marks the current instance as read-only preventing any further user modification.

Parameters:

- `populateMissingResolver`: Populates unconfigured `JsonSerializerOptions.TypeInfoResolver` properties with the reflection-based default.

Exceptions:

- `InvalidOperationException`: The instance does not specify a `JsonSerializerOptions.TypeInfoResolver` setting. Thrown when `populateMissingResolver` is `false`.

-or-

The `JsonSerializer.IsReflectionEnabledByDefault` feature switch has been turned off.

When `populateMissingResolver` is set to `true`, configures the instance following the semantics of the `JsonSerializer` methods accepting `JsonSerializerOptions` parameters.

This method is idempotent.

## JsonSerializerOptions.TryGetTypeInfo(Type, JsonTypeInfo) method

```csharp
public bool TryGetTypeInfo (Type type, out System.Text.Json.Serialization.Metadata.JsonTypeInfo? typeInfo);
```

Tries to get the `JsonTypeInfo` contract metadata resolved by the current `JsonSerializerOptions` instance.

Parameters:

- `type`: The type to resolve contract metadata for.
- `typeInfo`: When this method returns, contains the resolved contract metadata, or `null` if the contract could not be resolved.

Returns: `true` if a contract for `type` was found, or `false` otherwise.

Exceptions:

- `ArgumentNullException`: `type` is `null`.
- `ArgumentException`: `type` is not valid for serialization.

Returned metadata can be downcast to `JsonTypeInfo<T>` and used with the relevant `JsonSerializer` overloads.

If the `JsonSerializerOptions` instance is locked for modification, the method will return a cached instance for the metadata.
