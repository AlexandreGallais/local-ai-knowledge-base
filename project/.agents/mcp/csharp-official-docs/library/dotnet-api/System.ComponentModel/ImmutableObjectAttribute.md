---
title: "ImmutableObjectAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ImmutableObjectAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableObjectAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ImmutableObjectAttribute : Attribute
```

Specifies that an object has no subproperties capable of being edited. This class cannot be inherited.

#### Remarks
This attribute is typically used in the **Properties** window to determine whether to render an expandable object as read-only. As such, this property is used only at design time.

For more information about using attributes, see Attributes.

## ImmutableObjectAttribute.ImmutableObjectAttribute(Boolean) constructor

```csharp
public ImmutableObjectAttribute (bool immutable);
```

Initializes a new instance of the `ImmutableObjectAttribute` class.

Parameters:

- `immutable`: `true` if the object is immutable; otherwise, `false`.

#### Remarks
This attribute is typically used in the **Properties** window to determine whether to render an expandable object as read-only.

## ImmutableObjectAttribute.Immutable property

```csharp
public bool Immutable { get; }
```

Gets whether the object is immutable.

Returns: `true` if the object is immutable; otherwise, `false`.

#### Remarks
This attribute is typically used in the **Properties** window to determine whether to render an expandable object as read-only.

## ImmutableObjectAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An `Object` to compare with this instance or a null reference (`Nothing` in Visual Basic).

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## ImmutableObjectAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `ImmutableObjectAttribute`.

To be added.

## ImmutableObjectAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Indicates whether the value of this instance is the default value.

Returns: `true` if this instance is the default attribute for the class; otherwise, `false`.

To be added.

## ImmutableObjectAttribute.Default field

```csharp
public static readonly System.ComponentModel.ImmutableObjectAttribute Default;
```

Represents the default value for `ImmutableObjectAttribute`.

#### Remarks
Defaults to `No`.

## ImmutableObjectAttribute.No field

```csharp
public static readonly System.ComponentModel.ImmutableObjectAttribute No;
```

Specifies that an object has at least one editable subproperty. This `static` field is read-only.

#### Remarks
This field is the default setting for this attribute.

This attribute is typically used in the **Properties** window to determine whether to render an expandable object as read-only.

## ImmutableObjectAttribute.Yes field

```csharp
public static readonly System.ComponentModel.ImmutableObjectAttribute Yes;
```

Specifies that an object has no subproperties that can be edited. This `static` field is read-only.

#### Remarks
This attribute is typically used in the **Properties** window to determine whether to render an expandable object as read-only.
