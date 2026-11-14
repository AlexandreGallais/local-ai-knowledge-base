---
title: "JsonParameterInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonParameterInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonParameterInfo class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public abstract class JsonParameterInfo
```

Provides JSON serialization-related metadata about a constructor parameter.

To be added.

## JsonParameterInfo.AttributeProvider property

```csharp
public System.Reflection.ICustomAttributeProvider? AttributeProvider { get; }
```

Gets a custom attribute provider for the current parameter.

Returns: To be added.

When resolving metadata via the built-in resolvers this will be populated with
the underlying `ParameterInfo` of the constructor metadata.

## JsonParameterInfo.DeclaringType property

```csharp
public Type DeclaringType { get; }
```

Gets the declaring type of the constructor.

Returns: To be added.

To be added.

## JsonParameterInfo.DefaultValue property

```csharp
public object? DefaultValue { get; }
```

Gets a value indicating the default value if the parameter has a default value.

Returns: To be added.

To be added.

## JsonParameterInfo.HasDefaultValue property

```csharp
public bool HasDefaultValue { get; }
```

Gets a value indicating whether the parameter has a default value.

Returns: To be added.

To be added.

## JsonParameterInfo.IsMemberInitializer property

```csharp
public bool IsMemberInitializer { get; }
```

Gets a value indicating whether the parameter represents a required or init-only member initializer.

Returns: To be added.

Only returns `true` for source-generated metadata that can only access
required or init-only member initializers using object initialize expressions.

## JsonParameterInfo.IsNullable property

```csharp
public bool IsNullable { get; }
```

Gets a value indicating whether the constructor parameter is annotated as nullable.

Returns: To be added.

Contracts originating from `DefaultJsonTypeInfoResolver` or
`JsonSerializerContext`, derive the value of this parameter from nullable
reference type annotations, including annotations from attributes such as
`AllowNullAttribute` or
`DisallowNullAttribute`. This property has no effect on deserialization
unless the `JsonSerializerOptions.RespectNullableAnnotations` property has been enabled,
in which case the serializer will reject any `null` deserialization results. This setting is in sync
with the associated `JsonPropertyInfo.IsSetNullable` property.

## JsonParameterInfo.Name property

```csharp
public string Name { get; }
```

Gets the name of the parameter.

Returns: To be added.

To be added.

## JsonParameterInfo.ParameterType property

```csharp
public Type ParameterType { get; }
```

Gets the type of this parameter.

Returns: To be added.

To be added.

## JsonParameterInfo.Position property

```csharp
public int Position { get; }
```

Gets the zero-based position of the parameter in the formal parameter list.

Returns: To be added.

To be added.
