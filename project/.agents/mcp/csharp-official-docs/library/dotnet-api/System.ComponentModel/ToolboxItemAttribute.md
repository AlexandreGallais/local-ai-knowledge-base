---
title: "ToolboxItemAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ToolboxItemAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ToolboxItemAttribute class

Namespace: `System.ComponentModel`

```csharp
public class ToolboxItemAttribute : Attribute
```

Represents an attribute of a toolbox item.

#### Remarks
The `ToolboxItemAttribute` class provides a way to specify an attribute for a `ToolboxItem`. In addition to what the `Attribute` class provides, this class of object stores the type of the toolbox item.

#### Examples
The following code example demonstrates the use of `ToolboxItemAttribute` with the `ToolboxItem` class as a base class for a custom toolbox item implementation. This code example is part of a larger example provided for the `ToolboxItem` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ToolboxItemAttribute/Overview/Form1.cs._

## ToolboxItemAttribute.ToolboxItemAttribute(Boolean) constructor

```csharp
public ToolboxItemAttribute (bool defaultType);
```

Initializes a new instance of the `ToolboxItemAttribute` class and specifies whether to use default initialization values.

Parameters:

- `defaultType`: `true` to create a toolbox item attribute for a default type; `false` to associate no default toolbox item support for this attribute.

#### Remarks
By default, the `ToolboxItemType` property is set to `ToolboxItem`.

## ToolboxItemAttribute.ToolboxItemAttribute(String) constructor

```csharp
public ToolboxItemAttribute (string toolboxItemTypeName);
```

Initializes a new instance of the `ToolboxItemAttribute` class using the specified name of the type.

Parameters:

- `toolboxItemTypeName`: The names of the type of the toolbox item and of the assembly that contains the type.

#### Remarks
This constructor expects the `toolboxItemTypeName` parameter to be in the form \<*name of the item type*>*,* \<*name of the assembly*> (for example, System.Drawing.Design.ToolboxItem, System.Drawing.Design).

## ToolboxItemAttribute.ToolboxItemAttribute(Type) constructor

```csharp
public ToolboxItemAttribute (Type toolboxItemType);
```

Initializes a new instance of the `ToolboxItemAttribute` class using the specified type of the toolbox item.

Parameters:

- `toolboxItemType`: The type of the toolbox item.

To be added.

## ToolboxItemAttribute.ToolboxItemType property

```csharp
public Type? ToolboxItemType { get; }
```

Gets or sets the type of the toolbox item.

Returns: The type of the toolbox item.

Exceptions:

- `ArgumentException`: The type cannot be found.

To be added.

## ToolboxItemAttribute.ToolboxItemTypeName property

```csharp
public string ToolboxItemTypeName { get; }
```

Gets or sets the name of the type of the current `ToolboxItem`.

Returns: The fully qualified type name of the current toolbox item.

To be added.

## ToolboxItemAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An `Object` to compare with this instance or a null reference (`Nothing` in Visual Basic).

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## ToolboxItemAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## ToolboxItemAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating whether the current value of the attribute is the default value for the attribute.

Returns: `true` if the current value of the attribute is the default; otherwise, `false`.

#### Remarks
By default, this value returns `false` from the method defined in the `Attribute` class.

## ToolboxItemAttribute.Default field

```csharp
public static readonly System.ComponentModel.ToolboxItemAttribute Default;
```

Initializes a new instance of the `ToolboxItemAttribute` class and sets the type to the default, `ToolboxItem`. This field is read-only.

#### Remarks
By default, the `ToolboxItemType` property is set to `ToolboxItem`.

## ToolboxItemAttribute.None field

```csharp
public static readonly System.ComponentModel.ToolboxItemAttribute None;
```

Initializes a new instance of the `ToolboxItemAttribute` class and sets the type to `null`. This field is read-only.

To be added.
