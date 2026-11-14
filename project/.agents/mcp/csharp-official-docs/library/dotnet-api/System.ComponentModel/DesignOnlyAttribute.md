---
title: "DesignOnlyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DesignOnlyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DesignOnlyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class DesignOnlyAttribute : Attribute
```

Specifies whether a property can only be set at design time.

#### Remarks
Members marked with the `DesignOnlyAttribute` set to `true` can be set only at design time. Typically, these properties exist only at design time and do not correspond to a real property on the object at run time.

Members that either have no attribute or are marked with the `DesignOnlyAttribute` set to `false` can be set during run time. The default is `false`.

A property with the `DesignOnlyAttribute` set to `true` has its value serialized to the .resx file instead of the `InitializeComponent` method.

For more information, see Attributes.

#### Examples
The following example creates a `GetLanguage` property. The property is marked with a `DesignOnlyAttribute`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignOnlyAttribute/Overview/source.cs._

The next example gets the value of the `DesignOnlyAttribute`. First the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next it indexes into the `PropertyDescriptorCollection` to find the `GetLanguage` property. Then it returns the attributes for this property and saves them in the attributes variable.

The example then prints whether the property is design only by retrieving `DesignOnlyAttribute` from the `AttributeCollection`, and writing it to the console screen.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DesignOnlyAttribute/Overview/source.cs._

## DesignOnlyAttribute.DesignOnlyAttribute(Boolean) constructor

```csharp
public DesignOnlyAttribute (bool isDesignOnly);
```

Initializes a new instance of the `DesignOnlyAttribute` class.

Parameters:

- `isDesignOnly`: `true` if a property can be set only at design time; `false` if the property can be set at design time and at run time.

To be added.

## DesignOnlyAttribute.IsDesignOnly property

```csharp
public bool IsDesignOnly { get; }
```

Gets a value indicating whether a property can be set only at design time.

Returns: `true` if a property can be set only at design time; otherwise, `false`.

To be added.

## DesignOnlyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `DesignOnlyAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## DesignOnlyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DesignOnlyAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## DesignOnlyAttribute.Default field

```csharp
public static readonly System.ComponentModel.DesignOnlyAttribute Default;
```

Specifies the default value for the `DesignOnlyAttribute`, which is `DesignOnlyAttribute.No`. This `static` field is read-only.

To be added.

## DesignOnlyAttribute.No field

```csharp
public static readonly System.ComponentModel.DesignOnlyAttribute No;
```

Specifies that a property can be set at design time or at run time. This `static` field is read-only.

#### Remarks
The `No` field is the default setting for this attribute.

## DesignOnlyAttribute.Yes field

```csharp
public static readonly System.ComponentModel.DesignOnlyAttribute Yes;
```

Specifies that a property can be set only at design time. This `static` field is read-only.

To be added.
