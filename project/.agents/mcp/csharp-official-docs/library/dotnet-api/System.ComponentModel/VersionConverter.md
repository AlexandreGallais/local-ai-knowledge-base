---
title: "VersionConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/VersionConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# VersionConverter class

Namespace: `System.ComponentModel`

```csharp
public class VersionConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `Version` objects to and from various other representations.

To be added.

## VersionConverter.VersionConverter() constructor

```csharp
public VersionConverter ();
```

Initializes a new instance of the `VersionConverter` class.

To be added.

## VersionConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a `Version`.

Parameters:

- `context`: An object that provides contextual information.
- `sourceType`: The type of the object to be converted.

Returns: `true` if this converter can convert `sourceType` to a `Version`; otherwise, `false`.

To be added.

## VersionConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Gets a value indicating whether this converter can convert an object to the given destination type using the context.

Parameters:

- `context`: An object that provides contextual information.
- `destinationType`: The target type for the conversion.

Returns: `true` if the converter can convert an object to the given destination type; otherwise, `false`.

To be added.

## VersionConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the specified object to a `Version`.

Parameters:

- `context`: An object that provides contextual information.
- `culture`: The culture to use for the conversion.
- `value`: The value to convert to a `Version`.

Returns: `value` converted to a `Version` value.

Exceptions:

- `FormatException`: `value` is not a valid `Version` string.

To be added.

## VersionConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the specified value to the specified destination type using the specified context and arguments.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The culture that supplies formatting information for the conversion.
- `value`: The value to be converted.
- `destinationType`: The type to convert the value parameter to.

Returns: An object that represents the converted value.

To be added.

## VersionConverter.IsValid(ITypeDescriptorContext, Object) method

```csharp
public override bool IsValid (System.ComponentModel.ITypeDescriptorContext? context, object? value);
```

Returns a value that indicates whether the given value object is valid for this type and for the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: The object to test for validity.

Returns: `true` if the specified value is valid for this object; otherwise, `false`.

To be added.
