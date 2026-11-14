---
title: "DataTypeAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/DataTypeAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataTypeAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class DataTypeAttribute : System.ComponentModel.DataAnnotations.ValidationAttribute
```

Specifies the name of an additional type to associate with a data field.

#### Remarks
The `DataTypeAttribute` attribute enables you to mark fields by using a type that is more specific than the database intrinsic type. The type name is selected from the `DataType` enumeration type. For example, a string data field that contains email addresses can be specified as the `EmailAddress` type. This information is then accessed by the field templates to modify how the data field is processed.

You use the `DataTypeAttribute` attribute for the following reasons:

- To provide additional type information for a data field. You do this by applying the `DataTypeAttribute` attribute to a data field in the data model and by specifying the additional type name from the `DataType` enumeration. The field template that processes the data field can access this additional metadata type information to determine how to process the field. For example, the text field template can generate hyperlinks for email addresses whose intrinsic type is `String`.

- To associate a custom field template with a data field. The specified custom field template will then be used to process the data field. This is an alternative to using the `UIHintAttribute` attribute.

When you apply the `DataTypeAttribute` attribute to a data field you must do the following:

- Follow the attribute usage rules.

- Implement the metadata class that contains the data fields to which you want to apply the attribute.

- Issue validation errors as appropriate.

#### Examples
The following example uses the `DataTypeAttribute` attribute to customize the display of the EmailAddress data field. The email addresses are shown as hyperlinks instead of as simple text, which is what Dynamic Data would infer from the intrinsic data type. The example code is in three parts, and it performs the following steps:

- It implements a metadata partial class and the associated metadata class.

- In the associated metadata class, it applies the `DataTypeAttribute` attribute to the EmailAddress data field by specifying the `EmailAddress` enumerated value. This indicates to the Text.ascx field template that it should customize the display of email addresses.

- It modifies the Text.ascx field template to customize the display of the EmailAddress data fields.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DataTypeAttribute/CS/Customer.cs._

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DataTypeAttribute/CS/Text.ascx._

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DataTypeAttribute/CS/Text.ascx.cs._

To compile and run the example code, you need the following:

- Any edition of Visual Studio 2010 or later.

- The AdventureWorksLT sample database. For information about how to download and install the SQL Server sample database, see Microsoft SQL Server Product Samples: Database on GitHub. Make sure that you install the correct version of the sample database for the version of SQL Server that you are running.

- A data-driven Web site. This enables you to create a data context for the database and to create the class that contains the data field to customize. For more information, see `Walkthrough: Creating a New Dynamic Data Web Site using Scaffolding`.

## DataTypeAttribute.DataTypeAttribute(DataType) constructor

```csharp
public DataTypeAttribute (System.ComponentModel.DataAnnotations.DataType dataType);
```

Initializes a new instance of the `DataTypeAttribute` class by using the specified type name.

Parameters:

- `dataType`: The name of the type to associate with the data field.

#### Remarks
The name is one of the values that are defined by the `DataType` enumeration.

#### Examples
The following example shows how to use the `%23ctor` constructor to specify an alternative type for a data field.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DataTypeAttribute/CS/Customer.cs._

## DataTypeAttribute.DataTypeAttribute(String) constructor

```csharp
public DataTypeAttribute (string customDataType);
```

Initializes a new instance of the `DataTypeAttribute` class by using the specified field template name.

Parameters:

- `customDataType`: The name of the custom field template to associate with the data field.

Exceptions:

- `ArgumentException`: `customDataType` is `null` or an empty string ("").

#### Remarks
This method provides an alternative to using the `UIHintAttribute` attribute.

## DataTypeAttribute.CustomDataType property

```csharp
public string? CustomDataType { get; }
```

Gets the name of custom field template that is associated with the data field.

Returns: The name of the custom field template that is associated with the data field.

To be added.

## DataTypeAttribute.DataType property

```csharp
public System.ComponentModel.DataAnnotations.DataType DataType { get; }
```

Gets the type that is associated with the data field.

Returns: One of the `DataType` values.

To be added.

## DataTypeAttribute.DisplayFormat property

```csharp
public System.ComponentModel.DataAnnotations.DisplayFormatAttribute? DisplayFormat { get; protected set; }
```

Gets a data-field display format.

Returns: The data-field display format.

To be added.

## DataTypeAttribute.GetDataTypeName() method

```csharp
public virtual string GetDataTypeName ();
```

Returns the name of the type that is associated with the data field.

Returns: The name of the type associated with the data field.

Exceptions:

- `InvalidOperationException`: The current attribute is ill-formed.

#### Remarks
The name of the type that is associated with the data field.

## DataTypeAttribute.IsValid(Object) method

```csharp
public override bool IsValid (object? value);
```

Checks that the value of the data field is valid.

Parameters:

- `value`: The data field value to validate.

Returns: `true` always.

Exceptions:

- `InvalidOperationException`: The current attribute is ill-formed.

#### Remarks
This method implements validation logic that is specific to the `DataTypeAttribute` attribute.
