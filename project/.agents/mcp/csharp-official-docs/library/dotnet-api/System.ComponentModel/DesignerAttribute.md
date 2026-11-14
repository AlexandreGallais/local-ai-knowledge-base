---
title: "DesignerAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DesignerAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DesignerAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DesignerAttribute : Attribute
```

Specifies the class used to implement design-time services for a component.

#### Remarks
The class you use for the design-time services must implement the `IDesigner` interface.

Use the `DesignerBaseTypeName` property to find the designer's base type. Use the `DesignerTypeName` property to get the name of the type of designer associated with this member.

For more information, see Attributes.

#### Examples
The following example creates a class called `MyForm`. `MyForm` has two attributes, a `DesignerAttribute` that specifies this class uses the `DocumentDesigner`, and a `DesignerCategoryAttribute` that specifies the `Form` category.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignerAttribute/Overview/source.cs._

The next example creates an instance of `MyForm`. Then it gets the attributes for the class, extracts the `DesignerAttribute`, and prints the name of the designer.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignerAttribute/Overview/source.cs._

## DesignerAttribute.DesignerAttribute(String) constructor

```csharp
public DesignerAttribute (string designerTypeName);
```

Initializes a new instance of the `DesignerAttribute` class using the name of the type that provides design-time services.

Parameters:

- `designerTypeName`: The concatenation of the fully qualified name of the type that provides design-time services for the component this attribute is bound to, and the name of the assembly this type resides in.

#### Remarks
The class you use for the design-time services must implement the `IDesigner` interface.

## DesignerAttribute.DesignerAttribute(Type) constructor

```csharp
public DesignerAttribute (Type designerType);
```

Initializes a new instance of the `DesignerAttribute` class using the type that provides design-time services.

Parameters:

- `designerType`: A `Type` that represents the class that provides design-time services for the component this attribute is bound to.

#### Remarks
The class you use for the design-time services must implement the `IDesigner` interface.

## DesignerAttribute.DesignerAttribute(String, String) constructor

```csharp
public DesignerAttribute (string designerTypeName, string designerBaseTypeName);
```

Initializes a new instance of the `DesignerAttribute` class using the designer type and the base class for the designer.

Parameters:

- `designerTypeName`: The concatenation of the fully qualified name of the type that provides design-time services for the component this attribute is bound to, and the name of the assembly this type resides in.
- `designerBaseTypeName`: The fully qualified name of the base class to associate with the designer class.

#### Remarks
The class you use for the design-time services must implement the `IDesigner` interface.

The `designerBaseTypeName` parameter allows you to attach more than one type of designer for a given class.

## DesignerAttribute.DesignerAttribute(String, Type) constructor

```csharp
public DesignerAttribute (string designerTypeName, Type designerBaseType);
```

Initializes a new instance of the `DesignerAttribute` class, using the name of the designer class and the base class for the designer.

Parameters:

- `designerTypeName`: The concatenation of the fully qualified name of the type that provides design-time services for the component this attribute is bound to, and the name of the assembly this type resides in.
- `designerBaseType`: A `Type` that represents the base class to associate with the `designerTypeName`.

#### Remarks
The class you use for the design-time services must implement the `IDesigner` interface.

The `designerBaseType` parameter allows you to attach more than one type of designer for a given class.

## DesignerAttribute.DesignerAttribute(Type, Type) constructor

```csharp
public DesignerAttribute (Type designerType, Type designerBaseType);
```

Initializes a new instance of the `DesignerAttribute` class using the types of the designer and designer base class.

Parameters:

- `designerType`: A `Type` that represents the class that provides design-time services for the component this attribute is bound to.
- `designerBaseType`: A `Type` that represents the base class to associate with the `designerType`.

#### Remarks
The class you use for the design-time services must implement the `IDesigner` interface.

The `designerBaseType` parameter allows you to attach more than one type of designer for a given class.

## DesignerAttribute.DesignerBaseTypeName property

```csharp
public string DesignerBaseTypeName { get; }
```

Gets the name of the base type of this designer.

Returns: The name of the base type of this designer.

To be added.

## DesignerAttribute.DesignerTypeName property

```csharp
public string DesignerTypeName { get; }
```

Gets the name of the designer type associated with this designer attribute.

Returns: The name of the designer type associated with this designer attribute.

To be added.

## DesignerAttribute.TypeId property

```csharp
public override object TypeId { get; }
```

Gets a unique ID for this attribute type.

Returns: A unique ID for this attribute type.

#### Remarks
It is used by filtering algorithms to identify two attributes that are the same type. For most attributes, this just returns the `Type` instance for the attribute. `DesignerAttribute` overrides this to include the type of the designer base type.

## DesignerAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `DesignerAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## DesignerAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.
