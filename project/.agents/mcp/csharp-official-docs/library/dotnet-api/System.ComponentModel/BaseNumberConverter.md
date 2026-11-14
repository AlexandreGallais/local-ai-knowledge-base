---
title: "BaseNumberConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/BaseNumberConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# BaseNumberConverter class

Namespace: `System.ComponentModel`

```csharp
public abstract class BaseNumberConverter : System.ComponentModel.TypeConverter
```

Provides a base type converter for nonfloating-point numerical types.

To be added.

## BaseNumberConverter.BaseNumberConverter() constructor

```csharp
protected BaseNumberConverter ();
```

Initializes a new instance of the `BaseNumberConverter` class.

To be added.

## BaseNumberConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Determines if this converter can convert an object in the given source type to the native type of the converter.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type from which you want to convert.

Returns: `true` if this converter can perform the operation; otherwise, `false`.

To be added.

## BaseNumberConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Returns a value indicating whether this converter can convert an object to the given destination type using the context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: A `Type` that represents the type to which you want to convert.

Returns: `true` if this converter can perform the operation; otherwise, `false`.

To be added.

## BaseNumberConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given object to the converter's native type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture to represent the number.
- `value`: The object to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `Exception`: `value` is not a valid value for the target type.
- `NotSupportedException`: The conversion cannot be performed.

To be added.

## BaseNumberConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the specified object to another type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture to represent the number.
- `value`: The object to convert.
- `destinationType`: The type to convert the object to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

To be added.
