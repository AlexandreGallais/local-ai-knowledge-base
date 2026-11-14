---
title: "CultureInfoConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/CultureInfoConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CultureInfoConverter class

Namespace: `System.ComponentModel`

```csharp
public class CultureInfoConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `CultureInfo` objects to and from various other representations.

#### Remarks
This converter can only convert a `CultureInfo` object to and from a string.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of the `CultureInfoConverter` class. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `CultureInfo` to a string, and vice versa. First it constructs a `CultureInfo` variable using the Greek culture (represented by "el") and converts it to the string "Greek". Then it converts the string "Russian" to the `CultureInfo` representation "ru".

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## CultureInfoConverter.CultureInfoConverter() constructor

```csharp
public CultureInfoConverter ();
```

Initializes a new instance of the `CultureInfoConverter` class.

To be added.

## CultureInfoConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a `CultureInfo` using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
This converter can only convert a `CultureInfo` object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## CultureInfoConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Gets a value indicating whether this converter can convert an object to the given destination type using the context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: A `Type` that represents the type you wish to convert to.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## CultureInfoConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the specified value object to a `CultureInfo`.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture to which to convert.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentException`: `value` specifies a culture that is not valid.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert a `CultureInfo` object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## CultureInfoConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to the specified destination type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture to which to convert.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value to.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert a `CultureInfo` object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## CultureInfoConverter.GetCultureName(CultureInfo) method

```csharp
protected virtual string GetCultureName (System.Globalization.CultureInfo culture);
```

Retrieves the name of the specified culture.

Parameters:

- `culture`: A `CultureInfo` that specifies the culture to get the name for.

Returns: The name of the specified culture.

To be added.

## CultureInfoConverter.GetStandardValues(ITypeDescriptorContext) method

```csharp
public override System.ComponentModel.TypeConverter.StandardValuesCollection GetStandardValues (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a collection of standard values for a `CultureInfo` object using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: A `StandardValuesCollection` containing a standard set of valid values, or `null` if the data type does not support a standard set of values.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## CultureInfoConverter.GetStandardValuesExclusive(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesExclusive (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether the list of standard values returned from `CultureInfoConverter.GetStandardValues` is an exhaustive list.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `false` because the `StandardValuesCollection` returned from `CultureInfoConverter.GetStandardValues` is not an exhaustive list of possible values (that is, other values are possible). This method never returns `true`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

When the list is not exhaustive, then there are other valid values besides the list of standard values that `CultureInfoConverter.GetStandardValues` provides.

## CultureInfoConverter.GetStandardValuesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether this object supports a standard set of values that can be picked from a list using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because `CultureInfoConverter.GetStandardValues` should be called to find a common set of values the object supports. This method never returns `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.
