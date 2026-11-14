---
title: "DesignTimeVisibleAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DesignTimeVisibleAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DesignTimeVisibleAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DesignTimeVisibleAttribute : Attribute
```

`DesignTimeVisibleAttribute` marks a component's visibility. If `DesignTimeVisibleAttribute.Yes` is present, a visual designer can show this component on a designer.

#### Remarks
The `DesignTimeVisibleAttribute` is a hint to the Designer. The Designer will ignore this attribute for components that have a UI presence. It can only be applied to classes.

The `DesignTimeVisibleAttribute` is most useful when you have a control that accepts child components. For example, the `TreeView` control's node items should not appear in the component tray because they are drawn by the `TreeView` control.

## DesignTimeVisibleAttribute.DesignTimeVisibleAttribute() constructor

```csharp
public DesignTimeVisibleAttribute ();
```

Creates a new `DesignTimeVisibleAttribute` set to the default value of `false`.

To be added.

## DesignTimeVisibleAttribute.DesignTimeVisibleAttribute(Boolean) constructor

```csharp
public DesignTimeVisibleAttribute (bool visible);
```

Creates a new `DesignTimeVisibleAttribute` with the `DesignTimeVisibleAttribute.Visible` property set to the given value in `visible`.

Parameters:

- `visible`: The value that the `DesignTimeVisibleAttribute.Visible` property will be set against.

To be added.

## DesignTimeVisibleAttribute.Visible property

```csharp
public bool Visible { get; }
```

Gets or sets whether the component should be shown at design time.

Returns: `true` if this component should be shown at design time, or `false` if it shouldn't.

To be added.

## DesignTimeVisibleAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An Object to compare with this instance or a null reference (`Nothing` in Visual Basic).

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## DesignTimeVisibleAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DesignTimeVisibleAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating if this instance is equal to the `DesignTimeVisibleAttribute.Default` value.

Returns: `true`, if this instance is equal to the `DesignTimeVisibleAttribute.Default` value; otherwise, `false`.

To be added.

## DesignTimeVisibleAttribute.Default field

```csharp
public static readonly System.ComponentModel.DesignTimeVisibleAttribute Default;
```

The default visibility which is `Yes`.

To be added.

## DesignTimeVisibleAttribute.No field

```csharp
public static readonly System.ComponentModel.DesignTimeVisibleAttribute No;
```

Marks a component as not visible in a visual designer.

To be added.

## DesignTimeVisibleAttribute.Yes field

```csharp
public static readonly System.ComponentModel.DesignTimeVisibleAttribute Yes;
```

Marks a component as visible in a visual designer.

To be added.
