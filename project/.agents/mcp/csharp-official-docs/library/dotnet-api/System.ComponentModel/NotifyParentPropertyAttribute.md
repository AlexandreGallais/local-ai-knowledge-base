---
title: "NotifyParentPropertyAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/NotifyParentPropertyAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NotifyParentPropertyAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class NotifyParentPropertyAttribute : Attribute
```

Indicates that the parent property is notified when the value of the property that this attribute is applied to is modified. This class cannot be inherited.

#### Remarks
Apply `NotifyParentPropertyAttribute` to a property if its parent property should receive notification of changes to the property's values. For example, in the Properties window, the `RowTemplate` property has nested properties such as `DataGridViewRow.Height` and `DataGridViewRow.DefaultCellStyle`. These nested properties are marked with `NotifyParentPropertyAttribute(true)` so they notify the parent property to update its value and display when the property values change.

For more information about using attributes, see Attributes.

#### Examples
The following code example demonstrates how to use the `NotifyParentPropertyAttribute` and the `ExpandableObjectConverter` class to create an expandable property on a custom control.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ExpandableObjectConverter/Overview/DemoControl.cs._

## NotifyParentPropertyAttribute.NotifyParentPropertyAttribute(Boolean) constructor

```csharp
public NotifyParentPropertyAttribute (bool notifyParent);
```

Initializes a new instance of the `NotifyParentPropertyAttribute` class, using the specified value to determine whether the parent property is notified of changes to the value of the property.

Parameters:

- `notifyParent`: `true` if the parent should be notified of changes; otherwise, `false`.

#### Examples
The following code example demonstrates how to use the `NotifyParentPropertyAttribute` and the `ExpandableObjectConverter` class to create an expandable property on a custom control.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ExpandableObjectConverter/Overview/DemoControl.cs._

## NotifyParentPropertyAttribute.NotifyParent property

```csharp
public bool NotifyParent { get; }
```

Gets or sets a value indicating whether the parent property should be notified of changes to the value of the property.

Returns: `true` if the parent property should be notified of changes; otherwise, `false`.

To be added.

## NotifyParentPropertyAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Gets a value indicating whether the specified object is the same as the current object.

Parameters:

- `obj`: The object to test for equality.

Returns: `true` if the object is the same as this object; otherwise, `false`.

To be added.

## NotifyParentPropertyAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Gets the hash code for this object.

Returns: The hash code for the object the attribute belongs to.

To be added.

## NotifyParentPropertyAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating whether the current value of the attribute is the default value for the attribute.

Returns: `true` if the current value of the attribute is the default value of the attribute; otherwise, `false`.

To be added.

## NotifyParentPropertyAttribute.Default field

```csharp
public static readonly System.ComponentModel.NotifyParentPropertyAttribute Default;
```

Indicates the default attribute state, that the property should not notify the parent property of changes to its value. This field is read-only.

To be added.

## NotifyParentPropertyAttribute.No field

```csharp
public static readonly System.ComponentModel.NotifyParentPropertyAttribute No;
```

Indicates that the parent property is not be notified of changes to the value of the property. This field is read-only.

To be added.

## NotifyParentPropertyAttribute.Yes field

```csharp
public static readonly System.ComponentModel.NotifyParentPropertyAttribute Yes;
```

Indicates that the parent property is notified of changes to the value of the property. This field is read-only.

To be added.
