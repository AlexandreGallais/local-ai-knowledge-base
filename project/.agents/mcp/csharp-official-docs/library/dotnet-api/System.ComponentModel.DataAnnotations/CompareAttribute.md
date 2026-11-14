---
title: "CompareAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/CompareAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CompareAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class CompareAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Provides an attribute that compares two properties.

To be added.

## CompareAttribute.CompareAttribute(String) constructor

```csharp
public CompareAttribute (string otherProperty);
```

Initializes a new instance of the `CompareAttribute` class.

Parameters:

- `otherProperty`: The property to compare with the current property.

To be added.

## CompareAttribute.OtherProperty property

```csharp
public string OtherProperty { get; }
```

Gets the property to compare with the current property.

Returns: The other property.

To be added.

## CompareAttribute.OtherPropertyDisplayName property

```csharp
public string? OtherPropertyDisplayName { get; }
```

Gets the display name of the other property.

Returns: The display name of the other property.

To be added.

## CompareAttribute.RequiresValidationContext property

```csharp
public override bool RequiresValidationContext { get; }
```

Gets a value that indicates whether the attribute requires validation context.

Returns: `true` if the attribute requires validation context; otherwise, `false`.

To be added.

## CompareAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Applies formatting to an error message, based on the data field where the error occurred.

Parameters:

- `name`: The name of the field that caused the validation failure.

Returns: The formatted error message.

To be added.

## CompareAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## CompareAttribute.IsValid(Object, ValidationContext) method

```csharp
protected override System.ComponentModel.DataAnnotations.ValidationResult? IsValid (object? value, System.ComponentModel.DataAnnotations.ValidationContext validationContext);
```

Determines whether a specified object is valid.

Parameters:

- `value`: The object to validate.
- `validationContext`: An object that contains information about the validation request.

Returns: `true` if `value` is valid; otherwise, `false`.

To be added.
