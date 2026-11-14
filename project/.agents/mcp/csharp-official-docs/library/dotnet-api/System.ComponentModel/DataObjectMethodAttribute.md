---
title: "DataObjectMethodAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DataObjectMethodAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataObjectMethodAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DataObjectMethodAttribute : Attribute
```

Identifies a data operation method exposed by a type, what type of operation the method performs, and whether the method is the default data method. This class cannot be inherited.

#### Remarks
You can use the `DataObjectMethodAttribute` to identify data operation methods on a type marked with the `DataObjectAttribute` attribute so that they are more easily identified by callers using reflection. When the `DataObjectMethodAttribute` attribute is applied to a method, it describes the type of operation the method performs and indicates whether the method is the default data operation method of a type. Components such as the `ObjectDataSource` control and the `ObjectDataSourceDesigner` class examine the values of this attribute, if present, to help determine which data method to call at run time.

#### Examples
The following code example demonstrates how you can apply the `DataObjectMethodAttribute` attribute to a publicly exposed method and identify the type of data operation it performs as well as whether it is the type's default data method. In this example the `NorthwindData` type exposes two data methods: one to retrieve a set of data named `GetAllEmployees`, and another to delete data named `DeleteEmployeeByID`. The `DataObjectMethodAttribute` attribute is applied to both methods, the `GetAllEmployees` method is marked as the default method for the Select data operation, and the `DeleteEmployeeByID` method is marked as the default method for the Delete data operation.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectMethodAttribute.DataObjectMethodAttribute(DataObjectMethodType) constructor

```csharp
public DataObjectMethodAttribute (System.ComponentModel.DataObjectMethodType methodType);
```

Initializes a new instance of the `DataObjectMethodAttribute` class and identifies the type of data operation the method performs.

Parameters:

- `methodType`: One of the `DataObjectMethodType` values that describes the data operation the method performs.

#### Remarks
The `IsDefault` property is set to `false` when you create a `DataObjectMethodAttribute` object using this `%23ctor` constructor.

#### Examples
The following code example demonstrates how you can apply the `DataObjectMethodAttribute` attribute to a publicly exposed method and identify the type of data operation it performs as well as whether it is the type's default data method. In this example the `NorthwindData` type exposes two data methods: one to retrieve a set of data named `GetAllEmployees`, and another to delete data named `DeleteEmployeeByID`. The `DataObjectMethodAttribute` attribute is applied to both methods, the `GetAllEmployees` method is marked as the default method for the Select data operation, and the `DeleteEmployeeByID` method is marked as the default method for the Delete data operation.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectMethodAttribute.DataObjectMethodAttribute(DataObjectMethodType, Boolean) constructor

```csharp
public DataObjectMethodAttribute (System.ComponentModel.DataObjectMethodType methodType, bool isDefault);
```

Initializes a new instance of the `DataObjectMethodAttribute` class, identifies the type of data operation the method performs, and identifies whether the method is the default data method that the data object exposes.

Parameters:

- `methodType`: One of the `DataObjectMethodType` values that describes the data operation the method performs.
- `isDefault`: `true` to indicate the method that the attribute is applied to is the default method of the data object for the specified `methodType`; otherwise, `false`.

#### Examples
The following code example demonstrates how you can apply the `DataObjectMethodAttribute` attribute to a publicly exposed method and identify the type of data operation it performs as well as whether it is the type's default data method. In this example the `NorthwindData` type exposes two data methods: one to retrieve a set of data named `GetAllEmployees`, and another to delete data named `DeleteEmployeeByID`. The `DataObjectMethodAttribute` attribute is applied to both methods, the `GetAllEmployees` method is marked as the default method for the Select data operation, and the `DeleteEmployeeByID` method is marked as the default method for the Delete data operation.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectMethodAttribute.IsDefault property

```csharp
public bool IsDefault { get; }
```

Gets a value indicating whether the method that the `DataObjectMethodAttribute` is applied to is the default data method exposed by the data object for a specific method type.

Returns: `true` if the method is the default method exposed by the object for a method type; otherwise, `false`.

#### Remarks
The `ObjectDataSource` control uses the `IsDefault` property to distinguish between multiple methods that match the signature requirements for a specific method type. If two methods match the signature requirements, the method with the `IsDefault` property set to `true` is selected.

At design-time the `IsDefault` property is used to automatically set the `ObjectDataSource.SelectMethod`, `ObjectDataSource.UpdateMethod`, `ObjectDataSource.DeleteMethod`, and `ObjectDataSource.InsertMethod` properties on an `ObjectDataSource` instance.

If the `DataObjectMethodAttribute` is created using the `%23ctor` constructor that only takes a `DataObjectMethodType` parameter, the `IsDefault` property is set to `false`.

## DataObjectMethodAttribute.MethodType property

```csharp
public System.ComponentModel.DataObjectMethodType MethodType { get; }
```

Gets a `DataObjectMethodType` value indicating the type of data operation the method performs.

Returns: One of the `DataObjectMethodType` values that identifies the type of data operation performed by the method to which the `DataObjectMethodAttribute` is applied.

To be added.

## DataObjectMethodAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance of `DataObjectMethodAttribute`.

Returns: `true` if this instance is the same as the instance specified by the `obj` parameter; otherwise, `false`.

#### Remarks
This method determines whether this `DataObjectMethodAttribute` fits the pattern of another object.

## DataObjectMethodAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DataObjectMethodAttribute.Match(Object) method

```csharp
public override bool Match (object? obj);
```

Gets a value indicating whether this instance shares a common pattern with a specified attribute.

Parameters:

- `obj`: An object to compare with this instance of `DataObjectMethodAttribute`.

Returns: `true` if this instance is the same as the instance specified by the `obj` parameter; otherwise, `false`.

#### Remarks
This method determines whether one `DataObjectMethodAttribute` fits the pattern of another. Its implementation is not the same as that of `DataObjectMethodAttribute.Equals`, however, because it does not test for true equality.
