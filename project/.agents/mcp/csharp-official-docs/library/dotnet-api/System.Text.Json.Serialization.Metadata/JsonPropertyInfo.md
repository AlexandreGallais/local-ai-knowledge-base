---
title: "JsonPropertyInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonPropertyInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonPropertyInfo class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public abstract class JsonPropertyInfo
```

Provides JSON serialization-related metadata about a property or field.

To be added.

## JsonPropertyInfo.AssociatedParameter property

```csharp
public System.Text.Json.Serialization.Metadata.JsonParameterInfo? AssociatedParameter { get; }
```

Gets the constructor parameter associated with the current property.

Returns: To be added.

Returns the `JsonParameterInfo` metadata for the parameter in the deserialization constructor that has been associated with the current property.

A constructor parameter is matched to a property or field if they are of the same type and have the same (case-insensitive) name. Each constructor parameter must be matched to exactly one property or field.

## JsonPropertyInfo.AttributeProvider property

```csharp
public System.Reflection.ICustomAttributeProvider? AttributeProvider { get; set; }
```

Gets or sets the custom attribute provider for the current property.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

When resolving metadata via `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, this property will be populated with the underlying `MemberInfo` of the serialized property or field.

Setting a custom attribute provider has no impact on the contract model but serves as metadata for downstream contract modifiers.

## JsonPropertyInfo.CustomConverter property

```csharp
public System.Text.Json.Serialization.JsonConverter? CustomConverter { get; set; }
```

Gets or sets a custom converter override for the current property.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

It's possible to use `JsonConverterFactory` instances with this property.

For contracts originating from `DefaultJsonTypeInfoResolver`, the value of `CustomConverter` will be mapped from `JsonConverterAttribute` annotations.

## JsonPropertyInfo.DeclaringType property

```csharp
public Type DeclaringType { get; }
```

Gets the declaring type of the property.

Returns: To be added.

To be added.

## JsonPropertyInfo.Get property

```csharp
public Func<object,object?>? Get { get; set; }
```

Gets or sets a getter delegate for the property.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

Setting to `null` will result in the property being skipped on serialization.

## JsonPropertyInfo.IsExtensionData property

```csharp
public bool IsExtensionData { get; set; }
```

Gets or sets a value that indicates whether the current property is a special extension data property.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

-or-

The current `JsonPropertyInfo.PropertyType` is not valid for use with extension data.

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, the value of this property will be mapped from `JsonExtensionDataAttribute` annotations.

## JsonPropertyInfo.IsGetNullable property

```csharp
public bool IsGetNullable { get; set; }
```

Gets or sets a value indicating whether the return type of the getter is annotated as nullable.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

-or-

The current `JsonPropertyInfo.PropertyType` is not a reference type or `Nullable<T>`.

Contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, derive the value of this property from nullable reference type annotations, including annotations from attributes such as `NotNullAttribute` or `MaybeNullAttribute`.

This property has no effect on serialization unless the `JsonSerializerOptions.RespectNullableAnnotations` property has been enabled, in which case the serializer will reject any `null` values returned by the getter.

## JsonPropertyInfo.IsRequired property

```csharp
public bool IsRequired { get; set; }
```

Gets or sets a value that indicates whether the current property is required for deserialization to be successful.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

For contracts that originate from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, the value of this property is mapped from `JsonRequiredAttribute` annotations.

For contracts that use `DefaultJsonTypeInfoResolver`, the value of this property is also mapped from properties that have the `required` modifier, unless deserialization uses a constructor that populates all required properties and has `SetsRequiredMembersAttribute`.

The `required` keyword is currently not supported in `JsonSerializerContext` contracts.

## JsonPropertyInfo.IsSetNullable property

```csharp
public bool IsSetNullable { get; set; }
```

Gets or sets a value indicating whether the input type of the setter is annotated as nullable.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

-or-

The current `JsonPropertyInfo.PropertyType` is not a reference type or `Nullable<T>`.

Contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, derive the value of this property from nullable reference type annotations, including annotations from attributes such as `AllowNullAttribute` or `DisallowNullAttribute`.

This property has no effect on deserialization unless the `JsonSerializerOptions.RespectNullableAnnotations` property has been enabled, in which case the serializer will reject any `null` deserialization results.

If the property has been associated with a deserialization constructor parameter, this setting reflected the nullability annotation of the parameter and not the property setter.

## JsonPropertyInfo.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the JSON property name used when serializing the property.

Returns: To be added.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

The value of `Name` cannot conflict with that of other `JsonPropertyInfo` defined in the declaring `JsonTypeInfo`.

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, the value typically reflects the underlying .NET member name, the name derived from `PropertyNamingPolicy`, or the value specified in `JsonPropertyNameAttribute`.

## JsonPropertyInfo.NumberHandling property

```csharp
public System.Text.Json.Serialization.JsonNumberHandling? NumberHandling { get; set; }
```

Gets or sets the `JsonNumberHandling` applied to the current property.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, the value of this property will be mapped from `JsonNumberHandlingAttribute` annotations.

## JsonPropertyInfo.ObjectCreationHandling property

```csharp
public System.Text.Json.Serialization.JsonObjectCreationHandling? ObjectCreationHandling { get; set; }
```

Gets or sets a value indicating if the property or field should be replaced or populated during deserialization.

Returns: To be added.

The initial value for this property is based on the presence of the `JsonObjectCreationHandlingAttribute` attribute on the property.
When `null`, effective handling is resolved based on the capability of the property converter to populate, and the containing type's `JsonTypeInfo.PreferredPropertyObjectCreationHandling`
and `JsonSerializerOptions.PreferredObjectCreationHandling` values.

## JsonPropertyInfo.Options property

```csharp
public System.Text.Json.JsonSerializerOptions Options { get; }
```

Gets the `JsonSerializerOptions` value associated with the current contract instance.

Returns: To be added.

To be added.

## JsonPropertyInfo.Order property

```csharp
public int Order { get; set; }
```

Gets or sets the serialization order for the current property.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

For contracts originating from `DefaultJsonTypeInfoResolver` or `JsonSerializerContext`, the value of this property will be mapped from `JsonPropertyOrderAttribute` annotations.

## JsonPropertyInfo.PropertyType property

```csharp
public Type PropertyType { get; }
```

Gets the type of the current property.

Returns: To be added.

To be added.

## JsonPropertyInfo.Set property

```csharp
public Action<object,object?>? Set { get; set; }
```

Gets or sets a setter delegate for the property.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

Setting to `null` will result in the property being skipped on deserialization.

## JsonPropertyInfo.ShouldSerialize property

```csharp
public Func<object,object?,bool>? ShouldSerialize { get; set; }
```

Gets or sets a predicate that determines whether the current property value should be serialized.

Returns: To be added.

Exceptions:

- `InvalidOperationException`: The `JsonPropertyInfo` instance has been locked for further modification.

#### Remarks

The first parameter denotes the parent object, and the second parameter denotes the property value.

Setting the predicate to `null` is equivalent to always serializing the property value.

For contracts originating from `DefaultJsonTypeInfoResolver`, the value of `Condition` will map to this predicate.
