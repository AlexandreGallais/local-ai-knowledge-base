---
title: "MinLengthAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/MinLengthAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MinLengthAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class MinLengthAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies the minimum length of array or string data allowed in a property.

To be added.

## MinLengthAttribute.MinLengthAttribute(Int32) constructor

```csharp
public MinLengthAttribute (int length);
```

Initializes a new instance of the `MinLengthAttribute` class.

Parameters:

- `length`: The length of the array or string data.

To be added.

## MinLengthAttribute.Length property

```csharp
public int Length { get; }
```

Gets or sets the minimum allowable length of the array or string data.

Returns: The minimum allowable length of the array or string data.

To be added.

## MinLengthAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Applies formatting to a specified error message.

Parameters:

- `name`: The name to include in the formatted string.

Returns: A localized string to describe the minimum acceptable length.

To be added.

## MinLengthAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## MinLengthAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether a specified object is valid.

Parameters:

- `value`: The object to validate.

Returns: `true` if the specified object is valid; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: Length is less than zero.

This method returns `true` if `value` is `null`. It assumes the `RequiredAttribute` is used if the value may not be `null`.
