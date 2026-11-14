---
title: "DateTimeOffsetConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DateTimeOffsetConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffsetConverter class

Namespace: `System.ComponentModel`

```csharp
public class DateTimeOffsetConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `DateTimeOffset` structures to and from various other representations.

To be added.

## DateTimeOffsetConverter.DateTimeOffsetConverter() constructor

```csharp
public DateTimeOffsetConverter ();
```

Initializes a new instance of the `DateTimeOffsetConverter` class.

To be added.

## DateTimeOffsetConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Returns a value that indicates whether an object of the specified source type can be converted to a `DateTimeOffset`.

Parameters:

- `context`: The date format context.
- `sourceType`: The source type to check.

Returns: `true` if the specified type can be converted to a `DateTimeOffset`; otherwise, `false`.

To be added.

## DateTimeOffsetConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Returns a value that indicates whether a `DateTimeOffset` can be converted to an object of the specified type.

Parameters:

- `context`: The date format context.
- `destinationType`: The destination type to check.

Returns: `true` if a `DateTimeOffset` can be converted to the specified type; otherwise, `false`.

To be added.

## DateTimeOffsetConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the specified object to a `DateTimeOffset`.

Parameters:

- `context`: The date format context.
- `culture`: The date culture.
- `value`: The object to be converted.

Returns: A `DateTimeOffset` that represents the specified object.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

To be added.

## DateTimeOffsetConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts a `DateTimeOffset` to an object of the specified type.

Parameters:

- `context`: The date format context.
- `culture`: The date culture.
- `value`: The `DateTimeOffset` to be converted.
- `destinationType`: The type to convert to.

Returns: An object of the specified type that represents the `DateTimeOffset`.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

To be added.
