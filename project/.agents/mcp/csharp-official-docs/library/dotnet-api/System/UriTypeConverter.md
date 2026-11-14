---
title: "UriTypeConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UriTypeConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UriTypeConverter class

Namespace: `System`

```csharp
public class UriTypeConverter : System.ComponentModel.TypeConverter
```

Converts a `String` type to a `Uri` type, and vice versa.

To be added.

## UriTypeConverter.UriTypeConverter() constructor

```csharp
public UriTypeConverter ();
```

Initializes a new instance of the `UriTypeConverter` class.

To be added.

## UriTypeConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Returns whether this converter can convert an object of the given type to the type of this converter.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type that you want to convert from.

Returns: `true` if `sourceType` is a `String` type or a `Uri` type can be assigned from `sourceType`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `sourceType` parameter is `null`.

To be added.

## UriTypeConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Returns whether this converter can convert the object to the specified type, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: A `Type` that represents the type that you want to convert to.

Returns: `true` if `destinationType` is of type `InstanceDescriptor`, `String`, or `Uri`; otherwise, `false`.

To be added.

## UriTypeConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given object to the type of this converter, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The `CultureInfo` to use as the current culture.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

To be added.

## UriTypeConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts a given value object to the specified type, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo`. If `null` is passed, the current culture is assumed.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the `value` parameter to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: The `destinationType` parameter is `null`.
- `NotSupportedException`: The conversion cannot be performed.

To be added.

## UriTypeConverter.IsValid(ITypeDescriptorContext, Object) method

```csharp
public override bool IsValid (System.ComponentModel.ITypeDescriptorContext? context, object? value);
```

Returns whether the given value object is a `Uri` or a `Uri` can be created from it.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: The `Object` to test for validity.

Returns: `true` if `value` is a `Uri` or a `String` from which a `Uri` can be created; otherwise, `false`.

To be added.
