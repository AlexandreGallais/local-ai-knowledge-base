---
title: "DataObjectAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DataObjectAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataObjectAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DataObjectAttribute : Attribute
```

Identifies a type as an object suitable for binding to an `ObjectDataSource` object. This class cannot be inherited.

#### Remarks
Use the `DataObjectAttribute` attribute to identify an object as suitable for use by an `ObjectDataSource` object. Design-time classes such as the `ObjectDataSourceDesigner` class use the `DataObjectAttribute` attribute to present suitable objects to bind to an `ObjectDataSource` object.

For more information about using attributes, see Attributes.

#### Examples
The following code example demonstrates how you can apply the `DataObjectAttribute` attribute to indicate an object is suitable for binding to an `ObjectDataSource` object. In this example, the `NorthwindData` object is intended for use with an `ObjectDataSource` object.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectAttribute.DataObjectAttribute() constructor

```csharp
public DataObjectAttribute ();
```

Initializes a new instance of the `DataObjectAttribute` class.

#### Remarks
The `IsDataObject` property is set to `true` when you use the `%23ctor` constructor.

#### Examples
The following code example demonstrates using the `%23ctor` constructor.

_Code sample not included: ~/snippets/csharp/VS_Snippets_WebNet/System.ComponentModel.DataObjectMethodAttribute/CS/dataobjectmethodattribute.cs._

## DataObjectAttribute.DataObjectAttribute(Boolean) constructor

```csharp
public DataObjectAttribute (bool isDataObject);
```

Initializes a new instance of the `DataObjectAttribute` class and indicates whether an object is suitable for binding to an `ObjectDataSource` object.

Parameters:

- `isDataObject`: `true` if the object is suitable for binding to an `ObjectDataSource` object; otherwise, `false`.

#### Remarks
Use the `%23ctor` constructor to indicate to a design-time class such as the `ObjectDataSourceDesigner` class that an object should be excluded from the list of suitable objects for binding to an `ObjectDataSource` object.

The `IsDataObject` property is set to the value of the `isDataObject` parameter.

## DataObjectAttribute.IsDataObject property

```csharp
public bool IsDataObject { get; }
```

Gets a value indicating whether an object should be considered suitable for binding to an `ObjectDataSource` object at design time.

Returns: `true` if the object should be considered suitable for binding to an `ObjectDataSource` object; otherwise, `false`.

To be added.

## DataObjectAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether this instance of `DataObjectAttribute` fits the pattern of another object.

Parameters:

- `obj`: An object to compare with this instance of `DataObjectAttribute`.

Returns: `true` if this instance is the same as the instance specified by the `obj` parameter; otherwise, `false`.

#### Remarks
This method determines whether this instance of `DataObjectAttribute` fits the pattern of another object.

## DataObjectAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DataObjectAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating whether the current value of the attribute is the default value for the attribute.

Returns: `true` if the current value of the attribute is the default; otherwise, `false`.

To be added.

## DataObjectAttribute.DataObject field

```csharp
public static readonly System.ComponentModel.DataObjectAttribute DataObject;
```

Indicates that the class is suitable for binding to an `ObjectDataSource` object at design time. This field is read-only.

#### Remarks
The `DataObject` field returns a new `DataObjectAttribute` object with the `IsDataObject` property set to `true`.

## DataObjectAttribute.Default field

```csharp
public static readonly System.ComponentModel.DataObjectAttribute Default;
```

Represents the default value of the `DataObjectAttribute` class, which indicates that the class is suitable for binding to an `ObjectDataSource` object at design time. This field is read-only.

#### Remarks
The `Default` field defines an instance of the `DataObjectAttribute` class initialized with the `DataObjectAttribute.%23ctor` constructor, which sets the `IsDataObject` property to `true`.

## DataObjectAttribute.NonDataObject field

```csharp
public static readonly System.ComponentModel.DataObjectAttribute NonDataObject;
```

Indicates that the class is not suitable for binding to an `ObjectDataSource` object at design time. This field is read-only.

#### Remarks
The `NonDataObject` field returns a new `DataObjectAttribute` object with the `IsDataObject` property set to `false`.
