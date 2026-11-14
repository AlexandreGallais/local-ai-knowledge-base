---
title: "DateTimeConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DateTimeConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeConverter class

Namespace: `System.ComponentModel`

```csharp
public class DateTimeConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `DateTime` objects to and from various other representations.

#### Remarks
This converter can only convert a `DateTime` object to and from a string.

The `TypeConverter.ConvertFrom` method uses the `DateTime.Parse` method of the `DateTime` class to convert from a string.

The `TypeConverter.ConvertTo` method uses the current culture, if a `CultureInfo` is not supplied. Generally, `TypeConverter.ConvertTo` uses the `ShortDatePattern` property to format a date and `DateTimeFormatInfo.ShortDatePattern` with the `ShortTimePattern` property to format a date and time. If the `InvariantCulture` property is passed, `TypeConverter.ConvertTo` uses yyyy-MM-dd to format a date and `Object.ToString` to format a date and time.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of `DateTimeConverter`. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `DateTime` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## DateTimeConverter.DateTimeConverter() constructor

```csharp
public DateTimeConverter ();
```

Initializes a new instance of the `DateTimeConverter` class.

To be added.

## DateTimeConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a `DateTime` using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this object can perform the conversion; otherwise, `false`.

#### Remarks
This converter can only convert a `DateTime` to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## DateTimeConverter.CanConvertTo(ITypeDescriptorContext, Type) method

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

## DateTimeConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given value object to a `DateTime`.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `FormatException`: `value` is not a valid value for the target type.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert a `DateTime` to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## DateTimeConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to a `DateTime` using the arguments.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value to.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert a `DateTime` to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.
