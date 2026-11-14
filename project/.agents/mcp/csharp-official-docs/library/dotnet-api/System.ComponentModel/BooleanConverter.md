---
title: "BooleanConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BooleanConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BooleanConverter class

Namespace: `System.ComponentModel`

```csharp
public class BooleanConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `Boolean` objects to and from various other representations.

#### Remarks
This converter can only convert a `Boolean` object to and from a string.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of a `BooleanConverter`. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Boolean` to and from a string.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## BooleanConverter.BooleanConverter() constructor

```csharp
public BooleanConverter ();
```

Initializes a new instance of the `BooleanConverter` class.

To be added.

## BooleanConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a Boolean object using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this object can perform the conversion; otherwise, `false`.

#### Remarks
This converter can only convert a Boolean object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## BooleanConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given value object to a Boolean object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture to which to convert.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `FormatException`: `value` is not a valid value for the target type.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert a Boolean object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## BooleanConverter.GetStandardValues(ITypeDescriptorContext) method

```csharp
public override System.ComponentModel.TypeConverter.StandardValuesCollection GetStandardValues (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a collection of standard values for the Boolean data type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: A `StandardValuesCollection` that holds a standard set of valid values.

#### Remarks
The Boolean data type has two standard values, `true` and `false`.

## BooleanConverter.GetStandardValuesExclusive(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesExclusive (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether the list of standard values returned from the `BooleanConverter.GetStandardValues` method is an exclusive list.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because the `StandardValuesCollection` returned from `BooleanConverter.GetStandardValues` is an exhaustive list of possible values. This method never returns `false`.

#### Remarks
The Boolean data type has only two standard values, `true` and `false`. The `StandardValuesCollection` returned from this method has all possible values. Therefore, this method always returns `true`.

## BooleanConverter.GetStandardValuesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether this object supports a standard set of values that can be picked from a list.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because `BooleanConverter.GetStandardValues` can be called to find a common set of values the object supports. This method never returns `false`.

#### Remarks
The Boolean data type supports standard values, because a Boolean can only be `true` or `false`. Therefore, this method always returns `true`.
