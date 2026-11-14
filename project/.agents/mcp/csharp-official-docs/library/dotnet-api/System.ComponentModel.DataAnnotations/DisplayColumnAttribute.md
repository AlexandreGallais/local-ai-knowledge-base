---
title: "DisplayColumnAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel.DataAnnotations/DisplayColumnAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DisplayColumnAttribute class

Namespace: `System.ComponentModel.DataAnnotations`

```csharp
public class DisplayColumnAttribute : Attribute
```

Specifies the column that is displayed in the referred table as a foreign-key column.

#### Remarks
When a column in a table contains a foreign key, Dynamic Data infers the display value for that column from the referenced table. By default, the first column of the referenced table whose type is string (or text) is used. The `DisplayColumnAttribute` attribute enables you to change this default behavior and to specify a different parent table column to use as the column for the foreign key field.

When you apply this attribute, you must adhere to the following usage constraints:

- The attribute can only be applied to a class.

- The attribute can be inherited by derived classes.

- The attribute can be applied only one time.

## Examples
The following example shows how to use the `DisplayColumnAttribute` attribute. The example performs the following tasks:

- Implements metadata partial classes for the Address and Customer tables, which are parent tables for the CustomerAddress table.

- Applies the `DisplayColumnAttribute` attribute to the `Address` metadata partial class to specify the following:

- The City column from the Address table (the parent table) is displayed as the foreign-key <example-value> in the CustomerAddress child table.

- The PostalCode column from the Address table (the parent table) is used for sorting the Address selection box in the CustomerAddress child table.

- The sort order is set to ascending.

The example applies the `DisplayColumnAttribute` attribute to the `Customer` metadata partial class to specify that the LastName column in displayed as the foreign-key <example-value> for the CustomerAddress table.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayColumnAttribute/CS/Address.cs._

To compile the example, you need the following:

- Any edition of Visual Studio 2010 or later.

- The AdventureWorksLT sample database. For information about how to download and install the SQL Server sample database, see Microsoft SQL Server Product Samples: Database on GitHub. Make sure that you install the correct version of the sample database for the version of SQL Server that you are running.

- A dynamic data-driven Web site. This enables you to create a data context for the database and to create the class that contains the data field to customize. For more information, see `Walkthrough: Creating a New Dynamic Data Web Site using Scaffolding`.

## DisplayColumnAttribute.DisplayColumnAttribute(String) constructor

```csharp
public DisplayColumnAttribute (string displayColumn);
```

Initializes a new instance of the `DisplayColumnAttribute` class by using the specified column.

Parameters:

- `displayColumn`: The name of the column to use as the display column.

#### Examples
The following example shows how to define the parent column to display in a page for the child table as the foreign-key column.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayColumnAttribute/CS/Address.cs._

## DisplayColumnAttribute.DisplayColumnAttribute(String, String) constructor

```csharp
public DisplayColumnAttribute (string displayColumn, string? sortColumn);
```

Initializes a new instance of the `DisplayColumnAttribute` class by using the specified display and sort columns.

Parameters:

- `displayColumn`: The name of the column to use as the display column.
- `sortColumn`: The name of the column to use for sorting.

#### Remarks
By default, the column specified in `sortColumn` will be sorted in ascending order.

## DisplayColumnAttribute.DisplayColumnAttribute(String, String, Boolean) constructor

```csharp
public DisplayColumnAttribute (string displayColumn, string? sortColumn, bool sortDescending);
```

Initializes a new instance of the `DisplayColumnAttribute` class by using the specified display column, and the specified sort column and sort order.

Parameters:

- `displayColumn`: The name of the column to use as the display column.
- `sortColumn`: The name of the column to use for sorting.
- `sortDescending`: `true` to sort in descending order; otherwise, `false`. The default is `false`.

#### Examples
The following example shows how to define the parent column to display in a page for the child table as the foreign-key column. It sets the parent table column for sorting and also sets the sort order.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataAnnotations.DisplayColumnAttribute/CS/Address.cs._

## DisplayColumnAttribute.DisplayColumn property

```csharp
public string DisplayColumn { get; }
```

Gets the name of the column to use as the display field.

Returns: The name of the display column.

To be added.

## DisplayColumnAttribute.SortColumn property

```csharp
public string? SortColumn { get; }
```

Gets the name of the column to use for sorting.

Returns: The name of the sort column.

To be added.

## DisplayColumnAttribute.SortDescending property

```csharp
public bool SortDescending { get; }
```

Gets a value that indicates whether to sort in descending or ascending order.

Returns: `true` if the column will be sorted in descending order; otherwise, `false`.

To be added.
