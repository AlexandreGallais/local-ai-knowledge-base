---
title: "DeniedValuesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/DeniedValuesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DeniedValuesAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class DeniedValuesAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies a list of values that should not be allowed in a property.

To be added.

## DeniedValuesAttribute.DeniedValuesAttribute(Object[]) constructor

```csharp
public DeniedValuesAttribute (params object?[] values);
```

Initializes a new instance of the `DeniedValuesAttribute` class.

Parameters:

- `values`: A list of values that the validated value should not be equal to.

To be added.

## DeniedValuesAttribute.Values property

```csharp
public object?[] Values { get; }
```

Gets the list of values denied by this attribute.

Returns: To be added.

To be added.

## DeniedValuesAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether a specified object is valid. (Overrides `ValidationAttribute.IsValid`)

Parameters:

- `value`: The object to validate.

Returns: `true` if none of the `DeniedValuesAttribute.Values` are equal to `value`, otherwise `false`.

This method can return `true` if the `value` is `null`, provided that `null` is not specified in any of the `DeniedValuesAttribute.Values`.
