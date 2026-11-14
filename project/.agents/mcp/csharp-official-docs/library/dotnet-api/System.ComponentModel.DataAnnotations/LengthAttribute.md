---
title: "LengthAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/LengthAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LengthAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class LengthAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies the minimum and maximum length of collection/string data allowed in a property.

To be added.

## LengthAttribute.LengthAttribute(Int32, Int32) constructor

```csharp
public LengthAttribute (int minimumLength, int maximumLength);
```

To be added.

Parameters:

- `minimumLength`: To be added.
- `maximumLength`: To be added.

To be added.

## LengthAttribute.MaximumLength property

```csharp
public int MaximumLength { get; }
```

Gets the maximum allowable length of the collection/string data.

Returns: To be added.

To be added.

## LengthAttribute.MinimumLength property

```csharp
public int MinimumLength { get; }
```

Gets the minimum allowable length of the collection/string data.

Returns: To be added.

To be added.

## LengthAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Applies formatting to a specified error message. (Overrides `ValidationAttribute.FormatErrorMessage`)

Parameters:

- `name`: The name to include in the formatted string.

Returns: A localized string to describe the minimum acceptable length.

To be added.

## LengthAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## LengthAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether a specified object is valid. (Overrides `ValidationAttribute.IsValid`)

Parameters:

- `value`: The object to validate.

Returns: `true` if the value is `null` or its length is between the specified minimum length and maximum length, otherwise `false`

Exceptions:

- `InvalidOperationException`: `LengthAttribute.MinimumLength` is less than zero or `LengthAttribute.MaximumLength` is less than `LengthAttribute.MinimumLength`.

This method returns `true` if the `value` is `null`.
It is assumed the `RequiredAttribute` is used if the value may not be `null`.
