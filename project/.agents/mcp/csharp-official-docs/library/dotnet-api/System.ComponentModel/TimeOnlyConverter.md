---
title: "TimeOnlyConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TimeOnlyConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TimeOnlyConverter class

Namespace: `System.ComponentModel`

```csharp
public class TimeOnlyConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `TimeOnly` objects to and from various other representations.

To be added.

## TimeOnlyConverter.TimeOnlyConverter() constructor

```csharp
public TimeOnlyConverter ();
```

Initializes a new instance of the `TimeOnlyConverter` class.

To be added.

## TimeOnlyConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a `TimeOnly` object using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: The type to convert from.

Returns: `true` if this object can perform the conversion; otherwise, `false`.

To be added.

## TimeOnlyConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Gets a value indicating whether this converter can convert an object to the given destination type using the context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: The type to convert to.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

To be added.

## TimeOnlyConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given value object to a `TimeOnly` object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted `value`.

To be added.

## TimeOnlyConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object from a `TimeOnly` object using the arguments.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value to.

Returns: An `Object` that represents the converted `value`.

To be added.
