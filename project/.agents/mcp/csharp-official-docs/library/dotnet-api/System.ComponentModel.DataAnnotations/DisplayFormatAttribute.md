---
title: "DisplayFormatAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/DisplayFormatAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DisplayFormatAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class DisplayFormatAttribute : Attribute
```

Specifies how data fields are displayed and formatted by ASP.NET Dynamic Data.

#### Remarks
When you apply this attribute to a data field, you must follow the guidelines for the use of the attributes.

#### Examples

The following example shows how to use the `DisplayFormatAttribute` to customize formatting for a data field. The example performs the following steps:

- Implements a metadata partial class and an associated metadata class.

- In the associated metadata class, it applies the `DisplayFormatAttribute` attribute to specify the following results:

- Display the text "[Null]" when a data field is empty.
- Display currency data in locale specific currency format.
- Display date information in short format (mm/dd/yy). This format also applies in edit mode.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayFormatAttribute/CS/product.cs._

To compile the example, you need the following:

- Any edition of Visual Studio 2010 or later.
- The AdventureWorksLT sample database. For information about how to download and install the SQL Server sample database, see Microsoft SQL Server Product Samples: Database on GitHub. Make sure that you install the correct version of the sample database for the version of SQL Server that you are running.
- A data-driven Web site. This enables you to create a data context for the database and the class that contains the data field to customize. For more information, see `Walkthrough: Creating a New Dynamic Data Web Site using Scaffolding`.

## DisplayFormatAttribute.DisplayFormatAttribute() constructor

```csharp
public DisplayFormatAttribute ();
```

Initializes a new instance of the `DisplayFormatAttribute` class.

To be added.

## DisplayFormatAttribute.ApplyFormatInEditMode property

```csharp
public bool ApplyFormatInEditMode { get; set; }
```

Gets or sets a value that indicates whether the formatting string that is specified by the `DisplayFormatAttribute.DataFormatString` property is applied to the field value when the data field is in edit mode.

Returns: `true` if the formatting string applies to the field value in edit mode; otherwise, `false`. The default is `false`.

#### Remarks
By default, the formatting string that is specified by the `DataFormatString` property is applied to field values only when the data-bound control is in read-only mode.

#### Examples
The following example shows how to use the `ApplyFormatInEditMode` property to set the display format for date information when the data field is in edit mode. The data field format to use for the data field is specified by setting the `DataFormatString` property.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayFormatAttribute/CS/product.cs._

## DisplayFormatAttribute.ConvertEmptyStringToNull property

```csharp
public bool ConvertEmptyStringToNull { get; set; }
```

Gets or sets a value that indicates whether empty string values ("") are automatically converted to `null` when the data field is updated in the data source.

Returns: `true` if empty string values are automatically converted to `null`; otherwise, `false`. The default is `true`.

#### Remarks
Users might enter an empty string for a field value. Use the `ConvertEmptyStringToNull` property to specify whether an empty string value is automatically converted to `null` when the data field is updated in the database.

> **Note:**
>  By default, a `DynamicField` object displays `null` values as empty strings. To display a different value, set the `NullDisplayText` property.

#### Examples
The following example shows how to use the `DisplayFormatAttribute.ConvertEmptyStringToNull` to enable the conversion of empty string values to `null`.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayFormatAttribute/CS/product.cs._

## DisplayFormatAttribute.DataFormatString property

```csharp
public string? DataFormatString { get; set; }
```

Gets or sets the display format for the field value.

Returns: A formatting string that specifies the display format for the value of the data field. The default is an empty string (""), which indicates that no special formatting is applied to the field value.

#### Remarks
Use the `DataFormatString` property to specify a custom display format for the values that are displayed in the `DynamicField` object. If the `DataFormatString` property is not set, the field's value is displayed without any special formatting. For more information, see Formatting Types.

> **Note:**
>  When the `HtmlEncode` property is `true`, the value of the field is HTML encoded to its string representation before the formatting string is applied. For some objects, such as dates, you might want to control how the object is displayed with a formatting string. In those cases, you must set the `HtmlEncode` property to `false`.

By default, the formatting string is applied to the field value only when the data-bound control that contains the `DynamicField` object is in read-only mode. To apply the formatting string to field values when they are in edit mode, set the `ApplyFormatInEditMode` property to `true`.

The formatting string can be any literal string and usually includes a placeholder for the field's value. For example, in the formatting string "Item Value: {0}", the field's value is substituted for the {0} placeholder when the string is displayed in the `DynamicField` object. The remainder of the formatting string is displayed as literal text.

> **Note:**
>  If the formatting string does not include a placeholder, the field's value from the data source is not included in the final display text.

#### Examples
The following examples show how to use the `DataFormatString` property to set the display format of data fields. The first example sets the display format for a currency type data field. The second example sets the display format for a date type data field.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayFormatAttribute/CS/product.cs._

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayFormatAttribute/CS/product.cs._

## DisplayFormatAttribute.HtmlEncode property

```csharp
public bool HtmlEncode { get; set; }
```

Gets or sets a value that indicates whether the field should be HTML-encoded.

Returns: `true` if the field should be HTML-encoded; otherwise, `false`.

To be added.

## DisplayFormatAttribute.NullDisplayText property

```csharp
public string? NullDisplayText { get; set; }
```

Gets or sets the text that is displayed for a field when the field's value is `null`.

Returns: The text that is displayed for a field when the field's value is `null`. The default is an empty string (""), which indicates that this property is not set.

#### Remarks
Sometimes a data field's value is stored as null values in the source. You can specify custom text to display for data fields that have a null value by setting the `NullDisplayText` property. If this property is not set, null field values are displayed as empty strings ("").

> **Note:**
>  To convert an empty string field value to a null value, you must set the `ConvertEmptyStringToNull` property to `true`.

#### Examples
The following example shows how to use the `DisplayFormatAttribute.NullDisplayText` to define a caption to display when the data field is `null`.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayFormatAttribute/CS/product.cs._

## DisplayFormatAttribute.NullDisplayTextResourceType property

```csharp
public Type? NullDisplayTextResourceType { get; set; }
```

Gets or sets the `Type` that contains the resources for `DisplayFormatAttribute.NullDisplayText`.

Using `DisplayFormatAttribute.NullDisplayTextResourceType` along with `DisplayFormatAttribute.NullDisplayText`, allows the `DisplayFormatAttribute.GetNullDisplayText` method to return localized values.

Returns: To be added.

To be added.

## DisplayFormatAttribute.GetNullDisplayText() method

```csharp
public string? GetNullDisplayText ();
```

Returns the UI display string for `DisplayFormatAttribute.NullDisplayText`.

Returns: The UI display string.

If `DisplayFormatAttribute.NullDisplayTextResourceType` has not been specified, the value of `DisplayFormatAttribute.NullDisplayText` is returned.

If `DisplayFormatAttribute.NullDisplayTextResourceType` has been specified and `DisplayFormatAttribute.NullDisplayText` represents a resource key <example-value> that resource type, the localized value is returned.

If `DisplayFormatAttribute.NullDisplayText` and `DisplayFormatAttribute.NullDisplayTextResourceType` have not been set, returns `null`.

Exceptions:

- `InvalidOperationException`: Both the `DisplayFormatAttribute.NullDisplayTextResourceType` and `DisplayFormatAttribute.NullDisplayText` properties are set, but a public static property with a name matching the `DisplayFormatAttribute.NullDisplayText` value cannot be found on the `DisplayFormatAttribute.NullDisplayTextResourceType`.

To be added.
