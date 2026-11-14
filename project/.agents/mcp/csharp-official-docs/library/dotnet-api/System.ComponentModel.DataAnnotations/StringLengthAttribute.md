---
title: "StringLengthAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/StringLengthAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringLengthAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class StringLengthAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies the minimum and maximum length of characters that are allowed in a data field.

#### Remarks
ASP.NET Dynamic Data enables CRUD (Create, Read, Update and Delete) operations in a data model. You can specify the minimum and maximum length of characters for each field when data is being inserted or updated. For character data types, the `StringLengthAttribute.MinimumLength` and `StringLengthAttribute.MaximumLength` properties identify the largest number of bytes that are required in order to store a string.

You can use composite formatting placeholders in the error message:
{0} is the name of the property; {1} is the maximum length; and {2} is the minimum length.
The placeholders correspond to arguments that are passed to the `String.Format` method at runtime.

#### Examples
The following example shows how to limit the number of characters in a field. This example works with the ThumbnailPhotoFileName field in the Products table in the AdventureWorksLT database. The field is limited 4 characters by applying the `StringLengthAttribute` attribute to the partial class that represents the Product entity.

```csharp
[MetadataType(typeof(ProductMetadata))]
public partial class Product
{

}

public class ProductMetadata
{

    [ScaffoldColumn(true)]
    [StringLength(4, ErrorMessage = "The ThumbnailPhotoFileName value cannot exceed 4 characters. ")]
    public object ThumbnailPhotoFileName;

    [ScaffoldColumn(true)]
    [StringLength(4, ErrorMessage = "The {0} value cannot exceed {1} characters. ")]
    public object PhotoFileName;

}
```

```vb
<MetadataType(GetType(ProductMetadata))> _
Public Partial Class Product

End Class

Public Class ProductMetadata

    <ScaffoldColumn(True)> _
    <StringLength(4, ErrorMessage := "The ThumbnailPhotoFileName value cannot exceed 4 characters. ")> _
    Public ThumbnailPhotoFileName As Object

    <ScaffoldColumn(True)> _
    <StringLength(4, ErrorMessage := "The {0} value cannot exceed {1} characters. ")> _
    Public PhotoFileName As Object

End Class
```

## StringLengthAttribute.StringLengthAttribute(Int32) constructor

```csharp
public StringLengthAttribute (int maximumLength);
```

Initializes a new instance of the `StringLengthAttribute` class by using a specified maximum length.

Parameters:

- `maximumLength`: The maximum length of a string.

To be added.

## StringLengthAttribute.MaximumLength property

```csharp
public int MaximumLength { get; }
```

Gets the maximum length of a string.

Returns: The maximum length of a string.

To be added.

## StringLengthAttribute.MinimumLength property

```csharp
public int MinimumLength { get; set; }
```

Gets or sets the minimum length of a string.

Returns: The minimum length of a string.

To be added.

## StringLengthAttribute.FormatErrorMessage(String) method

```csharp
public override string FormatErrorMessage (string name);
```

Applies formatting to a specified error message.

Parameters:

- `name`: The name of the field that caused the validation failure.

Returns: The formatted error message.

Exceptions:

- `ArgumentOutOfRangeException`: `maximumLength` is negative.

-or-

`maximumLength` is less than `minimumLength`.
- `InvalidOperationException`: The current attribute is ill-formed.

To be added.

## StringLengthAttribute.FormatMessage(String, String) method

```csharp
public override string FormatMessage (string format, string name);
```

To be added.

Parameters:

- `format`: To be added.
- `name`: To be added.

Returns: To be added.

To be added.

## StringLengthAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Determines whether a specified object is valid.

Parameters:

- `value`: The object to validate.

Returns: `true` if the specified object is valid; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `maximumLength` is negative.

-or-

`maximumLength` is less than `StringLengthAttribute.MinimumLength`.
- `InvalidOperationException`: The current attribute is ill-formed.

#### Remarks
This method determines whether an object is valid. If the value of the object is `null`, the method automatically validates object.
