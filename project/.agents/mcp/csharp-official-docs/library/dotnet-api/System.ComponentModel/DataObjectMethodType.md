---
title: "DataObjectMethodType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DataObjectMethodType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataObjectMethodType enum

Namespace: `System.ComponentModel`

```csharp
public enum DataObjectMethodType
```

Identifies the type of data operation performed by a method, as specified by the `DataObjectMethodAttribute` applied to the method.

#### Examples
The following code example demonstrates how you can apply the `DataObjectMethodAttribute` to a publicly exposed method and identify the type of data operation it performs as well as whether it is the type's default data method. In this example the `NorthwindEmployee` type exposes two different data methods: one to retrieve a set of data named `GetAllEmployees`, and one to delete data named `DeleteEmployeeByID`. The `DataObjectMethodAttribute` is applied to both methods.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectMethodType.Delete field

```csharp
Delete
```

Indicates that a method is used for a data operation that deletes data.

## DataObjectMethodType.Fill field

```csharp
Fill
```

Indicates that a method is used for a data operation that fills a `DataSet` object.

## DataObjectMethodType.Insert field

```csharp
Insert
```

Indicates that a method is used for a data operation that inserts data.

## DataObjectMethodType.Select field

```csharp
Select
```

Indicates that a method is used for a data operation that retrieves data.

## DataObjectMethodType.Update field

```csharp
Update
```

Indicates that a method is used for a data operation that updates data.
