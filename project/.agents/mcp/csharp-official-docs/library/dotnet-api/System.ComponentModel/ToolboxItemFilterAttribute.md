---
title: "ToolboxItemFilterAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ToolboxItemFilterAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ToolboxItemFilterAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class ToolboxItemFilterAttribute : Attribute
```

Specifies the filter string and filter type to use for a toolbox item.

#### Remarks
`ToolboxItemFilterAttribute` provides a mechanism by which toolbox items can be marked for use only with designers that have a matching attribute or code that determines whether the item should be enabled or disabled in the toolbox.

A `ToolboxItemFilterAttribute` can be applied to a `ToolboxItem` to indicate a filter string and filter type that specify when to enable or disable the item. `ToolboxItemFilterAttribute` can also be applied to a designer to indicate its requirements for enabling items in the toolbox. This type of attribute can be used to indicate that a toolbox item can only be enabled when a designer with a matching filter string is being used. The type of the filter is indicated in the `FilterType` property by a `ToolboxItemFilterType` that indicates whether and how a filter string match is used, or whether to use custom code to determine whether to enable an item.

#### Examples
The following code example demonstrates how to apply the `ToolboxItemFilterAttribute`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ToolboxItemFilterAttribute/Overview/samplecontrol.cs._

## ToolboxItemFilterAttribute.ToolboxItemFilterAttribute(String) constructor

```csharp
public ToolboxItemFilterAttribute (string filterString);
```

Initializes a new instance of the `ToolboxItemFilterAttribute` class using the specified filter string.

Parameters:

- `filterString`: The filter string for the toolbox item.

To be added.

## ToolboxItemFilterAttribute.ToolboxItemFilterAttribute(String, ToolboxItemFilterType) constructor

```csharp
public ToolboxItemFilterAttribute (string filterString, System.ComponentModel.ToolboxItemFilterType filterType);
```

Initializes a new instance of the `ToolboxItemFilterAttribute` class using the specified filter string and type.

Parameters:

- `filterString`: The filter string for the toolbox item.
- `filterType`: A `ToolboxItemFilterType` indicating the type of the filter.

#### Examples
The following code example demonstrates how to apply the `ToolboxItemFilterAttribute`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ToolboxItemFilterAttribute/Overview/samplecontrol.cs._

## ToolboxItemFilterAttribute.FilterString property

```csharp
public string FilterString { get; }
```

Gets the filter string for the toolbox item.

Returns: The filter string for the toolbox item.

To be added.

## ToolboxItemFilterAttribute.FilterType property

```csharp
public System.ComponentModel.ToolboxItemFilterType FilterType { get; }
```

Gets the type of the filter.

Returns: A `ToolboxItemFilterType` that indicates the type of the filter.

#### Remarks
The type of the filter, along with any existing `ToolboxItemFilterAttribute` on the current designer, indicates the rules to use to determine whether a particular toolbox item should be enabled in the toolbox.

## ToolboxItemFilterAttribute.TypeId property

```csharp
public override object TypeId { get; }
```

Gets the type ID for the attribute.

Returns: The type ID for this attribute. All `ToolboxItemFilterAttribute` objects with the same filter string return the same type ID.

To be added.

## ToolboxItemFilterAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An `Object` to compare with this instance or a null reference (`Nothing` in Visual Basic).

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## ToolboxItemFilterAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## ToolboxItemFilterAttribute.Match(Object) method

```csharp
public override bool Match (object? obj);
```

Indicates whether the specified object has a matching filter string.

Parameters:

- `obj`: The object to test for a matching filter string.

Returns: `true` if the specified object has a matching filter string; otherwise, `false`.

To be added.

## ToolboxItemFilterAttribute.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current object.

Returns: A string that represents the current object.

To be added.
