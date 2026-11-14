---
title: "DataType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/DataType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataType enum

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public enum DataType
```

Represents an enumeration of the data types associated with data fields and parameters.

#### Remarks
This enumeration is used to specify the type of data to associate with a data column or a parameter. You use the `DataTypeAttribute` attribute class to specify the data type you want to associate with the data field or parameter. You select the data type from this enumeration.

The `DataTypeAttribute` attribute lets you mark fields by using a type that is more specific than the database intrinsic types. For example, a string data field that contains email addresses can be attributed with the  `EmailAddress` enumerated value. This information can be accessed by the field templates and modify how the data field is processed.

#### Examples
The following example uses the `DataTypeAttribute` attribute to customize the display of EmailAddress data field of the customer table in the AdventureWorksLT database. The email addresses are shown as hyperlinks instead of the simple text that ASP.NET Dynamic Data would have inferred from the intrinsic data type.

The example code:

- Implements a metadata partial class for the related table and the associated metadata class.

- Applies the `DataTypeAttribute` attribute to the EmailAddress data field by specifying the `EmailAddress` enumerated value in the associated metadata class. This indicates to the Text.ascx field template that the email address display is customized.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DataTypeAttribute/CS/Customer.cs._

To compile the example code, you need the following:

- Visual Studio 2008 Service Pack 1 or Visual Developer 2008 Express Edition Service Pack 1.

- The AdventureWorksLT sample database. For information about how to download and install the SQL Server sample database, see Microsoft SQL Server Product Samples: Database. Make sure that you install the correct version of the sample database for the version of SQL Server that you are running (SQL Server 2005 or SQL Server 2008).

- A Dynamic Data Web site. This enables you to create a data context for the database and the class that contains the data field to customize and the methods to override. In addition, it creates the environment in which to use the page described before.

For the complete code example that the field template uses to customize the display of the EmailAddress data fields, see the `DataTypeAttribute` attribute.

## DataType.CreditCard field

```csharp
CreditCard
```

Represents a credit card number.

## DataType.Currency field

```csharp
Currency
```

Represents a currency value.

## DataType.Custom field

```csharp
Custom
```

Represents a custom data type.

## DataType.Date field

```csharp
Date
```

Represents a date value.

## DataType.DateTime field

```csharp
DateTime
```

Represents an instant in time, expressed as a date and time of day.

## DataType.Duration field

```csharp
Duration
```

Represents a continuous time during which an object exists.

## DataType.EmailAddress field

```csharp
EmailAddress
```

Represents an email address.

## DataType.Html field

```csharp
Html
```

Represents an HTML file.

## DataType.ImageUrl field

```csharp
ImageUrl
```

Represents a URL to an image.

## DataType.MultilineText field

```csharp
MultilineText
```

Represents multi-line text.

## DataType.Password field

```csharp
Password
```

Represent a password value.

## DataType.PhoneNumber field

```csharp
PhoneNumber
```

Represents a phone number value.

## DataType.PostalCode field

```csharp
PostalCode
```

Represents a postal code.

## DataType.Text field

```csharp
Text
```

Represents text that is displayed.

## DataType.Time field

```csharp
Time
```

Represents a time value.

## DataType.Upload field

```csharp
Upload
```

Represents file upload data type.

## DataType.Url field

```csharp
Url
```

Represents a URL value.
