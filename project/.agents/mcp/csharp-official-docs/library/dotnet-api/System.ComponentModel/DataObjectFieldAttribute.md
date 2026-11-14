---
title: "DataObjectFieldAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DataObjectFieldAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataObjectFieldAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DataObjectFieldAttribute : Attribute
```

Provides metadata for a property representing a data field. This class cannot be inherited.

#### Remarks
Use the `DataObjectFieldAttribute` attribute to provide information about the schema of the underlying data. Design-time classes such as the `ObjectDataSourceDesigner` class use the `DataObjectAttribute` attribute to set properties at design-time based on the exposed schema.

You apply the `DataObjectFieldAttribute` attribute to members of the data item objects that are returned by the Select method of an object marked with the `DataObjectAttribute` attribute. In the following example, the `NorthwindData` class is marked with the `DataObjectAttribute` attribute, and returns an `IEnumerable` object containing `NorthwindEmployee` objects from the `GetAllEmployees` method. Fields in the `NorthwindEmployee` class are marked with the `DataObjectFieldAttribute` attribute to indicate they represent data fields in the underlying data source.

For more information about using attributes, see Attributes.

#### Examples
The following code example demonstrates how you can apply the `DataObjectFieldAttribute` to a publicly exposed property to identify metadata associated with the property. In this example the `NorthwindEmployee` type exposes three data properties: `EmployeeID`, `FirstName`, and `LastName`. The `DataObjectFieldAttribute` attribute is applied to all three properties; however, only the `EmployeeID` property attribute indicates it is the primary key for the data row.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectFieldAttribute.DataObjectFieldAttribute(Boolean) constructor

```csharp
public DataObjectFieldAttribute (bool primaryKey);
```

Initializes a new instance of the `DataObjectFieldAttribute` class and indicates whether the field is the primary key for the data row.

Parameters:

- `primaryKey`: `true` to indicate that the field is in the primary key of the data row; otherwise, `false`.

To be added.

## DataObjectFieldAttribute.DataObjectFieldAttribute(Boolean, Boolean) constructor

```csharp
public DataObjectFieldAttribute (bool primaryKey, bool isIdentity);
```

Initializes a new instance of the `DataObjectFieldAttribute` class and indicates whether the field is the primary key for the data row, and whether the field is a database identity field.

Parameters:

- `primaryKey`: `true` to indicate that the field is in the primary key of the data row; otherwise, `false`.
- `isIdentity`: `true` to indicate that the field is an identity field that uniquely identifies the data row; otherwise, `false`.

To be added.

## DataObjectFieldAttribute.DataObjectFieldAttribute(Boolean, Boolean, Boolean) constructor

```csharp
public DataObjectFieldAttribute (bool primaryKey, bool isIdentity, bool isNullable);
```

Initializes a new instance of the `DataObjectFieldAttribute` class and indicates whether the field is the primary key for the data row, whether the field is a database identity field, and whether the field can be null.

Parameters:

- `primaryKey`: `true` to indicate that the field is in the primary key of the data row; otherwise, `false`.
- `isIdentity`: `true` to indicate that the field is an identity field that uniquely identifies the data row; otherwise, `false`.
- `isNullable`: `true` to indicate that the field can be null in the data store; otherwise, `false`.

#### Examples
The following code example demonstrates how you can apply the `DataObjectFieldAttribute` to a publicly exposed property to identify metadata associated with the property. In this example the `NorthwindEmployee` type exposes three data properties: `EmployeeID`, `FirstName`, and `LastName`. The `DataObjectFieldAttribute` attribute is applied to all three properties; however, only the `EmployeeID` property attribute indicates it is the primary key for the data row.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectFieldAttribute.DataObjectFieldAttribute(Boolean, Boolean, Boolean, Int32) constructor

```csharp
public DataObjectFieldAttribute (bool primaryKey, bool isIdentity, bool isNullable, int length);
```

Initializes a new instance of the `DataObjectFieldAttribute` class and indicates whether the field is the primary key for the data row, whether it is a database identity field, and whether it can be null and sets the length of the field.

Parameters:

- `primaryKey`: `true` to indicate that the field is in the primary key of the data row; otherwise, `false`.
- `isIdentity`: `true` to indicate that the field is an identity field that uniquely identifies the data row; otherwise, `false`.
- `isNullable`: `true` to indicate that the field can be null in the data store; otherwise, `false`.
- `length`: The length of the field in bytes.

To be added.

## DataObjectFieldAttribute.IsIdentity property

```csharp
public bool IsIdentity { get; }
```

Gets a value indicating whether a property represents an identity field in the underlying data.

Returns: `true` if the property represents an identity field in the underlying data; otherwise, `false`. The default value is `false`.

#### Remarks
Set the `IsIdentity` property to `true` when the `DataObjectFieldAttribute` attribute is applied to a property that represents an identity field in the underlying data store. Typically an identity field is generated by the data store and uniquely identifies an entity in the data store.

Set the `IsIdentity` property with one of the `DataObjectFieldAttribute` constructors.

## DataObjectFieldAttribute.IsNullable property

```csharp
public bool IsNullable { get; }
```

Gets a value indicating whether a property represents a field that can be null in the underlying data store.

Returns: `true` if the property represents a field that can be null in the underlying data store; otherwise, `false`.

#### Remarks
Set the `IsNullable` property to `true` when then `DataObjectFieldAttribute` attribute is applied to a property that represents a field in the underlying data store that can be set to null. The value that represents null in the data store may be different from `null` in the programming language.

Set the `IsNullable` property with one of the `DataObjectFieldAttribute` constructors.

## DataObjectFieldAttribute.Length property

```csharp
public int Length { get; }
```

Gets the length of the property in bytes.

Returns: The length of the property in bytes, or -1 if not set.

#### Remarks
Set the `Length` property to the length, in bytes, of the data from the underlying data store. If the `Length` property is not set, it will be -1.

Set the `Length` property with one of the `DataObjectFieldAttribute` constructors.

## DataObjectFieldAttribute.PrimaryKey <example-value>

```csharp
public bool PrimaryKey { get; }
```

Gets a value indicating whether a property is in the primary key in the underlying data.

Returns: `true` if the property is in the primary key of the data store; otherwise, `false`.

#### Remarks
Set the `PrimaryKey` property to `true` when the `DataObjectFieldAttribute` attribute is applied to a property that represents the primary key value of the underlying data. The primary key is typically used by the underlying data store to uniquely identify an entity in the data store, and often is, but is not required to be, a data store identity field.

Set the `PrimaryKey` property with one of the `DataObjectFieldAttribute` constructors.

## DataObjectFieldAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance of `DataObjectFieldAttribute`.

Returns: `true` if this instance is the same as the instance specified by the `obj` parameter; otherwise, `false`.

#### Remarks
This method determines whether this instance of `DataObjectFieldAttribute` fits the pattern of another object.

## DataObjectFieldAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.
