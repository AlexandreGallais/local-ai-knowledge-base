---
title: "PropertyFilterAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyFilterAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyFilterAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class PropertyFilterAttribute : Attribute
```

Specifies which properties should be reported by type descriptors, specifically the `TypeDescriptor.GetProperties` method.

#### Remarks
The `PropertyFilterAttribute` supports an internal mechanism that limits the number of properties on a type that are returned by the custom `DependencyObject` type descriptor. If the attribute is found, the type descriptor narrows the scope of returned properties. `PropertyFilterAttribute` differs from typical attributes because you cannot apply it to a class as metadata. The filter mechanism works through code instead of through static metadata.

## PropertyFilterAttribute.PropertyFilterAttribute(PropertyFilterOptions) constructor

```csharp
public PropertyFilterAttribute (System.ComponentModel.PropertyFilterOptions filter);
```

Initializes a new instance of the `PropertyFilterAttribute` class.

Parameters:

- `filter`: The options that describe this property filter.

To be added.

## PropertyFilterAttribute.Filter property

```csharp
public System.ComponentModel.PropertyFilterOptions Filter { get; }
```

Gets the filter options for this `PropertyFilterAttribute`.

Returns: The property filter options.

#### Remarks
The value of `PropertyFilterAttribute.Filter` is the same value as was provided for the `filter` constructor argument when this `PropertyFilterAttribute` was constructed. There is no other means of setting the `PropertyFilterAttribute.Filter` value.

## PropertyFilterAttribute.Equals(Object) method

```csharp
public override bool Equals (object value);
```

Returns a value that indicates whether the current `PropertyFilterAttribute` is equal to a specified object.

Parameters:

- `value`: The object to compare to this `PropertyFilterAttribute`.

Returns: `true` if the specified `PropertyFilterAttribute` is equal to the current `PropertyFilterAttribute`; otherwise, `false`.

#### Remarks
This implementation compares the `PropertyFilterOptions` values on each `PropertyFilterAttribute` for value equality. If the `PropertyFilterOptions` are the same, then the two `PropertyFilterAttribute` instances are equal.

## PropertyFilterAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the current `PropertyFilterAttribute`.

Returns: A signed 32-bit integer value.

To be added.

## PropertyFilterAttribute.Match(Object) method

```csharp
public override bool Match (object value);
```

Returns a value that indicates whether the property filter options of the current `PropertyFilterAttribute` match the property filter options of the provided object.

Parameters:

- `value`: The object to compare. This object is expected to be a `PropertyFilterAttribute`.

Returns: `true` if a match exists; otherwise, `false`.

#### Remarks
For attributes that store flags, which is true for `PropertyFilterAttribute`, a `PropertyFilterAttribute.Match` result may be different from an `PropertyFilterAttribute.Equals` result. For example, a filter of `SetValues` matches a filter of `All`, because `All` is a merge of all filter values.

## PropertyFilterAttribute.Default field

```csharp
public static readonly System.ComponentModel.PropertyFilterAttribute Default;
```

This member supports the .NET infrastructure and is not intended to be used directly from your code.

To be added.
