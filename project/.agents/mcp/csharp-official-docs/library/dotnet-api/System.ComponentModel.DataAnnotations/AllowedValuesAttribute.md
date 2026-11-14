---
title: "AllowedValuesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/AllowedValuesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# AllowedValuesAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class AllowedValuesAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies a list of values that should be allowed in a property.

To be added.

## AllowedValuesAttribute.AllowedValuesAttribute(Object[]) constructor

```csharp
public AllowedValuesAttribute (params object?[] values);
```

Initializes a new instance of the `AllowedValuesAttribute` class.

Parameters:

- `values`: A list of values that the validated value should be equal to.

To be added.

## AllowedValuesAttribute.Values property

```csharp
public object?[] Values { get; }
```

Gets the list of values allowed by this attribute.

Returns: To be added.

To be added.

## AllowedValuesAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether a specified object is valid. (Overrides `ValidationAttribute.IsValid`)

Parameters:

- `value`: The object to validate.

Returns: `true` if any of the `AllowedValuesAttribute.Values` are equal to `value`, otherwise `false`

This method can return `true` if the `value` is `null`, provided that `null` is also specified in one of the `AllowedValuesAttribute.Values`.
