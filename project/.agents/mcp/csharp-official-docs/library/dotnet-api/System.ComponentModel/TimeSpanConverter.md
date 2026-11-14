---
title: "TimeSpanConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TimeSpanConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeSpanConverter class

Namespace: `System.ComponentModel`

```csharp
public class TimeSpanConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `TimeSpan` objects to and from other representations.

#### Remarks
This converter can only convert a `TimeSpan` object to and from a string.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of a `TimeSpanConverter`. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `TimeSpan` to a string, and vice versa. Both variables are represented in `TimeSpan.Ticks` format.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## TimeSpanConverter.TimeSpanConverter() constructor

```csharp
public TimeSpanConverter ();
```

Initializes a new instance of the `TimeSpanConverter` class.

To be added.

## TimeSpanConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a `TimeSpan` using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
This converter can only convert a `TimeSpan` object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## TimeSpanConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Gets a value indicating whether this converter can convert an object to the given destination type using the context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: A `Type` that represents the type you wish to convert to.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `FormatException`: `destinationType` is not a valid value for the target type.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## TimeSpanConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given object to a `TimeSpan`.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.
- `FormatException`: `value` is not a valid value for the target type.

#### Remarks
This converter can only convert a `TimeSpan` object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## TimeSpanConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given object to another type.

Parameters:

- `context`: A formatter context.
- `culture`: The culture into which `value` will be converted.
- `value`: The object to convert.
- `destinationType`: The type to convert the object to.

Returns: The converted object.

#### Remarks
This method most commonly converts types to and from string objects.

The default implementation will make a call to `Object.ToString` on the object if the object is valid and if the destination type is string. If this method cannot convert to the destination type, it will throw a `NotSupportedException`.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.
