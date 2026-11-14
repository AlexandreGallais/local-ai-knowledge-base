---
title: "RefreshPropertiesAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/RefreshPropertiesAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RefreshPropertiesAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class RefreshPropertiesAttribute : Attribute
```

Indicates that the property grid should refresh when the associated property value changes. This class cannot be inherited.

#### Remarks
The `RefreshPropertiesAttribute` indicates the type of refresh mode to use when refreshing a `PropertyGrid` control.

#### Examples
The following code example demonstrates using the `RefreshPropertiesAttribute` class to specify the refresh mode for a `DataSource` property. For a full code listing, see How to: Apply Attributes in Windows Forms Controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/AmbientValueAttribute/Overview/attributesdemocontrol.cs._

## RefreshPropertiesAttribute.RefreshPropertiesAttribute(RefreshProperties) constructor

```csharp
public RefreshPropertiesAttribute (System.ComponentModel.RefreshProperties refresh);
```

Initializes a new instance of the `RefreshPropertiesAttribute` class.

Parameters:

- `refresh`: A `RefreshProperties` value indicating the nature of the refresh.

#### Remarks
The `RefreshPropertiesAttribute` class is used for refreshing the design-time view.

## RefreshPropertiesAttribute.RefreshProperties property

```csharp
public System.ComponentModel.RefreshProperties RefreshProperties { get; }
```

Gets the refresh properties for the member.

Returns: A `RefreshProperties` that indicates the current refresh properties for the member.

To be added.

## RefreshPropertiesAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Overrides the object's `Equals` method.

Parameters:

- `obj`: To be added.

Returns: `true` if the specified object is the same; otherwise, `false`.

To be added.

## RefreshPropertiesAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this object.

Returns: The hash code for the object that the attribute belongs to.

To be added.

## RefreshPropertiesAttribute.IsDefaultAttribute() method

```csharp
public override bool IsDefaultAttribute ();
```

Gets a value indicating whether the current value of the attribute is the default value for the attribute.

Returns: `true` if the current value of the attribute is the default; otherwise, `false`.

To be added.

## RefreshPropertiesAttribute.All field

```csharp
public static readonly System.ComponentModel.RefreshPropertiesAttribute All;
```

Indicates that all properties are queried again and refreshed if the property value is changed. This field is read-only.

#### Remarks
Specify this attribute on a property to query again and refresh all properties in the `PropertyGrid` when the property value changes. The `PropertyGrid` caches data. The `All` mode causes the Properties window to query each property again and refresh its view.

## RefreshPropertiesAttribute.Default field

```csharp
public static readonly System.ComponentModel.RefreshPropertiesAttribute Default;
```

Indicates that no other properties are refreshed if the property value is changed. This field is read-only.

#### Remarks
Specify this attribute on a property to refresh only the associated property when the property value is changed.

## RefreshPropertiesAttribute.Repaint field

```csharp
public static readonly System.ComponentModel.RefreshPropertiesAttribute Repaint;
```

Indicates that all properties are repainted if the property value is changed. This field is read-only.

#### Remarks
Specify this attribute on a property to repaint all properties in the `PropertyGrid` when the property value changes.
