---
title: "PropertyFilterOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyFilterOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyFilterOptions enum

Namespace: `System.ComponentModel`

```csharp
public enum PropertyFilterOptions
```

Specifies which properties should be reported by type descriptors, specifically the `TypeDescriptor.GetProperties` method. This enumeration is used to specify the value of the `PropertyFilterAttribute.Filter` property.

#### Remarks
This filter mechanism is only implemented by the custom `DependencyPropertyDescriptor` for `DependencyObject`.

Invalid and Valid are relevant only for attached properties. The validity of a property is determined by working with the following attributes: `AttachedPropertyBrowsableForChildrenAttribute` , `AttachedPropertyBrowsableForTypeAttribute`, `AttachedPropertyBrowsableWhenAttributePresentAttribute`. They define the intended scope of the attached property in the object tree once the XAML is loaded. Designer applications that populate property grids and include attached properties in the grid must examine the value or presence of these attributes and the relative position of the current element versus either a parent or child element that "owns" the attached property. The owner-setter relationship together with the attribute values and `PropertyFilterOptions` will define whether a given attached property that is set on an element is valid or invalid.

## PropertyFilterOptions.All field

```csharp
All
```

Return all properties.

## PropertyFilterOptions.Invalid field

```csharp
Invalid
```

Return only those properties that are not valid given the current context of the object.

## PropertyFilterOptions.None field

```csharp
None
```

Return no properties.

## PropertyFilterOptions.SetValues field

```csharp
SetValues
```

Return only those properties that have local values currently set.

## PropertyFilterOptions.UnsetValues field

```csharp
UnsetValues
```

Return only those properties whose local values are not set, or do not have properties set in an external expression store (such as binding or deferred resource).

## PropertyFilterOptions.Valid field

```csharp
Valid
```

Return any property that is valid on the object in the current scope.
