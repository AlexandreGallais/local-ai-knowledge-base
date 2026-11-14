---
title: "InheritanceAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/InheritanceAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InheritanceAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class InheritanceAttribute : Attribute
```

Indicates whether the component associated with this attribute has been inherited from a base class. This class cannot be inherited.

#### Remarks
`InheritanceAttribute` represents the type and level of inheritance of a member.

When the `IInheritanceService.AddInheritedComponents` method of the `IInheritanceService` searches the component fields of a component to identify fields that are inherited from a base class, the method represents the inheritance level of each component using an `InheritanceAttribute`.

## InheritanceAttribute.InheritanceAttribute() constructor

```csharp
public InheritanceAttribute ();
```

Initializes a new instance of the `InheritanceAttribute` class.

To be added.

## InheritanceAttribute.InheritanceAttribute(InheritanceLevel) constructor

```csharp
public InheritanceAttribute (System.ComponentModel.InheritanceLevel inheritanceLevel);
```

Initializes a new instance of the `InheritanceAttribute` class with the specified inheritance level.

Parameters:

- `inheritanceLevel`: An `InheritanceLevel` that indicates the level of inheritance to set this attribute to.

To be added.

## InheritanceAttribute.InheritanceLevel property

```csharp
public System.ComponentModel.InheritanceLevel InheritanceLevel { get; }
```

Gets or sets the current inheritance level stored in this attribute.

Returns: The `InheritanceLevel` stored in this attribute.

To be added.

## InheritanceAttribute.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Override to test for equality.

Parameters:

- `value`: The object to test.

Returns: `true` if the object is the same; otherwise, `false`.

To be added.

## InheritanceAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hashcode for this object.

Returns: A hash code for the current `InheritanceAttribute`.

To be added.

## InheritanceAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating whether the current value of the attribute is the default value for the attribute.

Returns: `true` if the current value of the attribute is the default; otherwise, `false`.

To be added.

## InheritanceAttribute.ToString() method

```csharp
public override string ToString ();
```

Converts this attribute to a string.

Returns: A string that represents this `InheritanceAttribute`.

To be added.

## InheritanceAttribute.Default field

```csharp
public static readonly System.ComponentModel.InheritanceAttribute Default;
```

Specifies that the default value for `InheritanceAttribute` is `InheritanceAttribute.NotInherited`. This field is read-only.

#### Remarks
This field creates a new `InheritanceAttribute` that indicates that the associated component is not inherited.

## InheritanceAttribute.Inherited field

```csharp
public static readonly System.ComponentModel.InheritanceAttribute Inherited;
```

Specifies that the component is inherited. This field is read-only.

#### Remarks
This field creates a new `InheritanceAttribute` that indicates that the associated component is inherited.

## InheritanceAttribute.InheritedReadOnly field

```csharp
public static readonly System.ComponentModel.InheritanceAttribute InheritedReadOnly;
```

Specifies that the component is inherited and is read-only. This field is read-only.

#### Remarks
This field creates a new `InheritanceAttribute` that indicates that the associated component is inherited and read-only.

## InheritanceAttribute.NotInherited field

```csharp
public static readonly System.ComponentModel.InheritanceAttribute NotInherited;
```

Specifies that the component is not inherited. This field is read-only.

#### Remarks
This field creates a new `InheritanceAttribute` that indicates that the associated component is not inherited.
