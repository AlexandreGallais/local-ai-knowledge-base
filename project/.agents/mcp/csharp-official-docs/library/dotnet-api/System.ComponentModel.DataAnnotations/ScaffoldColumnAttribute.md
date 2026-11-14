---
title: "ScaffoldColumnAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/ScaffoldColumnAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ScaffoldColumnAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class ScaffoldColumnAttribute : Attribute
```

Specifies whether a class or data column uses scaffolding.

#### Remarks
Scaffolding is the mechanism for generating web page templates based on database schemas. ASP.NET Dynamic Data uses scaffolding to generate Web-based UI that lets a user to view and update a database. This class uses the `Scaffold` property to enable scaffolding in a Dynamic Data Web Site.

Scaffolding enhances ASP.NET page framework by dynamically displaying pages based on the data model with no physical pages required.

Scaffolding provides the following capabilities:

- Minimal or no code to create a data-driven Web application.

- Quick development time.

- Pages that are fully functional and include display, insert, edit, delete, sorting, and paging functionalities.

- Built-in data validation that is based on the database schema.

- Filters that are created for each foreign key or Boolean fields.

This class can be used to enable or disable scaffolding of data columns in a data model by applying this attribute to the appropriate data field object in the class that represents the table.

#### Examples
The following code example exposes the ProductID column of the Products table in the AdventureWorksLT data base by applying the scaffold property to the ProductID object in the Products partial class and setting it to `true`. It hides the ThumbnailPhotoFileName column by applying the scaffold property to the ThumbnailPhotoFileName object and setting it to `false`.

```csharp
[MetadataType(typeof(ProductMetadata))]
public partial class Product
{

}

public class ProductMetadata
{
    [ScaffoldColumn(true)]
    public object ProductID;

    [ScaffoldColumn(false)]
    public object ThumbnailPhotoFileName;

}
```

```vb
<MetadataType(GetType(ProductMetadata))>
Public Partial Class Product

End Class

Public Class ProductMetadata
    <ScaffoldColumn(True)>
    Public ProductID As Object

    <ScaffoldColumn(False)>
    Public ThumbnailPhotoFileName As Object

End Class

```

To compile the example code, you need the following:

- Any edition of Visual Studio 2010 or later.

- The AdventureWorksLT sample database. For information about how to download and install the SQL Server sample database, see Microsoft SQL Server Product Samples: Database on GitHub. Make sure that you install the correct version of the sample database for the version of SQL Server that you are running.

- A Dynamic Data Web site. This enables you to create a data context for the database and the class that contains the data field to customize and the methods to override. In addition, it creates the environment in which to use the page described before.

## ScaffoldColumnAttribute.ScaffoldColumnAttribute(Boolean) constructor

```csharp
public ScaffoldColumnAttribute (bool scaffold);
```

Initializes a new instance of `ScaffoldColumnAttribute` using the `ScaffoldColumnAttribute.Scaffold` property.

Parameters:

- `scaffold`: The value that specifies whether scaffolding is enabled.

#### Remarks
You can set `scaffold` to `true` for the entire data model to expose all data columns in the database for CRUD (Create, Read, Update and Delete) operations by setting `scaffold` to `true` in the Global.asax file or expose individual data columns in a data table to CRUD operations by setting `scaffold` to `true` in the partial class.

## ScaffoldColumnAttribute.Scaffold property

```csharp
public bool Scaffold { get; }
```

Gets or sets the value that specifies whether scaffolding is enabled.

Returns: `true` if scaffolding is enabled; otherwise, `false`.

#### Remarks
You can use this property to enable scaffolding in individual data columns in a data model. If you set this property to `true` in the global.asax file, the entire data model will expose all data columns in the database for CRUD (Create, Read, Update and Delete) operations.
