---
title: "RequiredAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/RequiredAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RequiredAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class RequiredAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies that a data field value is required.

#### Remarks
The `RequiredAttribute` attribute specifies that when a field on a form is validated, the field must contain a value. A validation exception is raised if the property is `null`, contains an empty string (""), or contains only white-space characters.

> **Note:**
>  If the MVC data model or entity partial class contains a field that is annotated with the `RequiredAttribute` attribute, but the page does not contain the property, an error is not raised. Validation occurs only for fields that are submitted to the server.

#### Examples
The following example uses the `RequiredAttribute` attribute to override the database schema rule that allows a data field to be empty. The example performs the following steps:

- Implements a metadata partial class and the associated metadata class.

- In the associated metadata class, it applies the `RequiredAttribute` attribute, which specifies the following requirements:

- The Title data field cannot be empty. If validation fails, the code in the example throws a validation exception and displays an error message. The error message is specified at the time that the attribute is applied to the data field.

- The MiddleName data field cannot be empty. If validation fails, the code in the example throws a validation exception and displays an error message.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.RequiredAttribute/CS/Customer.cs._

## RequiredAttribute.RequiredAttribute() constructor

```csharp
public RequiredAttribute ();
```

Initializes a new instance of the `RequiredAttribute` class.

#### Examples
The following example shows how to use the `RequiredAttribute.%23ctor` constructor. If validation fails, the example displays a validation error message that is provided by Dynamic Data.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.RequiredAttribute/CS/Customer.cs._

## RequiredAttribute.AllowEmptyStrings property

```csharp
public bool AllowEmptyStrings { get; set; }
```

Gets or sets a value that indicates whether an empty string is allowed.

Returns: `true` if an empty string is allowed; otherwise, `false`. The default value is `false`.

#### Remarks
When you set `RequiredAttribute.AllowEmptyStrings` to `true` for a data field, Dynamic Data does not perform validation and transforms the empty string to a `null` value. This value is then passed to the database.

If the database does not allow `null` values, it raises an error. To avoid this error, you must also set the `DisplayFormatAttribute.ConvertEmptyStringToNull` to `false`.

## RequiredAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Checks that the value of the required data field is not empty.

Parameters:

- `value`: The data field value to validate.

Returns: `true` if validation is successful; otherwise, `false`.

Exceptions:

- `ValidationException`: The data field value was `null`.

#### Remarks
If the value is an empty string, the method returns `false` and a validation error is displayed.
