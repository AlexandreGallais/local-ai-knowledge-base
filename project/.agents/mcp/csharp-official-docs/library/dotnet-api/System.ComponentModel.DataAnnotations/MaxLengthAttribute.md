---
title: "MaxLengthAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/MaxLengthAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaxLengthAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class MaxLengthAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies the maximum length of array or string data allowed in a property.

To be added.

## MaxLengthAttribute.MaxLengthAttribute() constructor

```csharp
public MaxLengthAttribute ();
```

Initializes a new instance of the `MaxLengthAttribute` class.

#### Remarks
The maximum allowable length supported by the database will be used.

## MaxLengthAttribute.MaxLengthAttribute(Int32) constructor

```csharp
public MaxLengthAttribute (int length);
```

Initializes a new instance of the `MaxLengthAttribute` class based on the `length` parameter.

Parameters:

- `length`: The maximum allowable length of array or string data.

To be added.

## MaxLengthAttribute.Length property

```csharp
public int Length { get; }
```

Gets the maximum allowable length of the array or string data.

Returns: The maximum allowable length of the array or string data.

To be added.

## MaxLengthAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Applies formatting to a specified error message.

Parameters:

- `name`: The name to include in the formatted string.

Returns: A localized string to describe the maximum acceptable length.

To be added.

## MaxLengthAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## MaxLengthAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether a specified object is valid.

Parameters:

- `value`: The object to validate.

Returns: `true` if the value is null, or if the value is less than or equal to the specified maximum length; otherwise, `false`.

Exceptions:

- `InvalidOperationException`: Length is zero or less than negative one.

#### Remarks
This method returns `true` if the `value` parameter is null.
