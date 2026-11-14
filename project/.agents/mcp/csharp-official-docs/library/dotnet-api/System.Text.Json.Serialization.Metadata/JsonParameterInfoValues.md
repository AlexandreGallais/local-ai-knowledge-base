---
title: "JsonParameterInfoValues class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json.Serialization.Metadata/JsonParameterInfoValues.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonParameterInfoValues class

Namespace: `System.Text.Json.Serialization.Metadata`

```csharp
public sealed class JsonParameterInfoValues
```

Provides information about a constructor parameter required for JSON deserialization.

This API is intended for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonParameterInfoValues.JsonParameterInfoValues() constructor

```csharp
public JsonParameterInfoValues ();
```

To be added.

To be added.

## JsonParameterInfoValues.DefaultValue property

```csharp
public object? DefaultValue { get; init; }
```

Gets or sets the default value of the parameter.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonParameterInfoValues.HasDefaultValue property

```csharp
public bool HasDefaultValue { get; init; }
```

Gets or sets a value that specifies whether a default value was specified for the parameter.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonParameterInfoValues.IsMemberInitializer property

```csharp
public bool IsMemberInitializer { get; init; }
```

Whether the parameter represents a required or init-only member initializer.

Returns: To be added.

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonParameterInfoValues.IsNullable property

```csharp
public bool IsNullable { get; init; }
```

Whether the parameter allows `null` values.

Returns: To be added.

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonParameterInfoValues.Name property

```csharp
public string Name { get; init; }
```

Gets or sets the name of the parameter.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonParameterInfoValues.ParameterType property

```csharp
public Type ParameterType { get; init; }
```

Gets or sets the type of the parameter.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.

## JsonParameterInfoValues.Position property

```csharp
public int Position { get; init; }
```

Gets or sets the zero-based position of the parameter in the formal parameter list.

Returns: To be added.

#### Remarks

This API is for use by the output of the System.Text.Json source generator and should not be called directly.
