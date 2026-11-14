---
title: "TypeConverter class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeConverter class (part 3 of 3)

## TypeConverter.GetStandardValuesExclusive(ITypeDescriptorContext) method

```csharp
public virtual bool GetStandardValuesExclusive (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether the collection of standard values returned from `TypeConverter.GetStandardValues` is an exclusive list of possible values, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if the `StandardValuesCollection` returned from `TypeConverter.GetStandardValues` is an exhaustive list of possible values; `false` if other values are possible.

#### Remarks
As implemented in this class, this method always returns `false`.

If the list is exclusive, such as in an enumeration data type, then no other values are valid. If the list is not exclusive, then other valid values might exist in addition to the list of standard values that the `TypeConverter.GetStandardValues` method provides. If the values are exclusive, the list returned by `TypeConverter.GetStandardValues` should not allow these values to be edited.

## TypeConverter.GetStandardValuesSupported() method

```csharp
public bool GetStandardValuesSupported ();
```

Returns whether this object supports a standard set of values that can be picked from a list.

Returns: `true` if `TypeConverter.GetStandardValues` should be called to find a common set of values the object supports; otherwise, `false`.

To be added.

## TypeConverter.GetStandardValuesSupported(ITypeDescriptorContext) method

```csharp
public virtual bool GetStandardValuesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether this object supports a standard set of values that can be picked from a list, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if `TypeConverter.GetStandardValues` should be called to find a common set of values the object supports; otherwise, `false`.

#### Remarks
As implemented in this class, this method always returns `false`.

Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

## TypeConverter.IsValid(Object) method

```csharp
public bool IsValid (object value);
```

Returns whether the given value object is valid for this type.

Parameters:

- `value`: The object to test for validity.

Returns: `true` if the specified value is valid for this object; otherwise, `false`.

#### Remarks

The `TypeConverter.IsValid` method catches exceptions from the `TypeConverter.CanConvertFrom` and `TypeConverter.ConvertFrom` methods. If the input value type causes `TypeConverter.CanConvertFrom` to return `false`, or if the input value causes `TypeConverter.ConvertFrom` to raise an exception, the `TypeConverter.IsValid` method returns `false`.

## TypeConverter.IsValid(ITypeDescriptorContext, Object) method

```csharp
public virtual bool IsValid (System.ComponentModel.ITypeDescriptorContext? context, object? value);
```

Returns whether the given value object is valid for this type and for the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: The `Object` to test for validity.

Returns: `true` if the specified value is valid for this object; otherwise, `false`.

#### Remarks

Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

The `TypeConverter.IsValid` method catches exceptions from the `TypeConverter.CanConvertFrom` and `TypeConverter.ConvertFrom` methods. If the input value type causes `TypeConverter.CanConvertFrom` to return `false`, or if the input value causes `TypeConverter.ConvertFrom` to raise an exception, the `TypeConverter.IsValid` method returns `false`.

For an example of this function, see `TypeConverter`.

## TypeConverter.SortProperties(PropertyDescriptorCollection, String[]) method

```csharp
protected System.ComponentModel.PropertyDescriptorCollection SortProperties (System.ComponentModel.PropertyDescriptorCollection props, string[] names);
```

Sorts a collection of properties.

Parameters:

- `props`: A `PropertyDescriptorCollection` that has the properties to sort.
- `names`: An array of names in the order you want the properties to appear in the collection.

Returns: A `PropertyDescriptorCollection` that contains the sorted properties.

#### Remarks
All properties in the collection that are not already in the array of names are added alphabetically to the end. If the `names` parameter is an empty array or `null`, all the properties in the collection are sorted alphabetically.
