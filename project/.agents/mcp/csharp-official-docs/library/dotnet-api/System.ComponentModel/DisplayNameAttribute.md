---
title: "DisplayNameAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DisplayNameAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DisplayNameAttribute class

Namespace: `System.ComponentModel`

```csharp
public class DisplayNameAttribute : Attribute
```

Specifies the display name for a property, event, or public void method that takes no arguments.

#### Remarks
The default is the name of the property or event. The default implementation of `DesignerActionList.GetSortedActionItems` uses reflection to search the public properties and public void methods that take no arguments. `DesignerActionList.GetSortedActionItems` searches for the `DisplayNameAttribute` on each property and method and, if found, uses that string instead of the property or method name.

#### Examples
The following code example demonstrates using the `DisplayNameAttribute` class to change the name of a property called `MisnamedProperty` to `RenamedProperty` in a `PropertyGrid` control. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## DisplayNameAttribute.DisplayNameAttribute() constructor

```csharp
public DisplayNameAttribute ();
```

Initializes a new instance of the `DisplayNameAttribute` class.

To be added.

## DisplayNameAttribute.DisplayNameAttribute(String) constructor

```csharp
public DisplayNameAttribute (string displayName);
```

Initializes a new instance of the `DisplayNameAttribute` class using the display name.

Parameters:

- `displayName`: The display name.

To be added.

## DisplayNameAttribute.DisplayName property

```csharp
public virtual string DisplayName { get; }
```

Gets the display name for a property, event, or public void method that takes no arguments stored in this attribute.

Returns: The display name.

To be added.

## DisplayNameAttribute.DisplayNameValue property

```csharp
protected string DisplayNameValue { get; set; }
```

Gets or sets the display name.

Returns: The display name.

To be added.

## DisplayNameAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether two `DisplayNameAttribute` instances are equal.

Parameters:

- `obj`: The `DisplayNameAttribute` to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current object; otherwise, `false`.

To be added.

## DisplayNameAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `DisplayNameAttribute`.

To be added.

## DisplayNameAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Determines if this attribute is the default.

Returns: `true` if the attribute is the default value for this attribute class; otherwise, `false`.

To be added.

## DisplayNameAttribute.Default field

```csharp
public static readonly System.ComponentModel.DisplayNameAttribute Default;
```

Specifies the default value for the `DisplayNameAttribute`. This field is read-only.

To be added.
