---
title: "GuidConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/GuidConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GuidConverter class

Namespace: `System.ComponentModel`

```csharp
public class GuidConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `Guid` objects to and from various other representations.

#### Remarks
This converter can only convert a GUID object to and from a string.

For more information about type converters, see the `TypeConverter` base class.

> **Caution:**
>  You should never create an instance of a `GuidConverter`. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Guid` to a string, and vice versa.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## GuidConverter.GuidConverter() constructor

```csharp
public GuidConverter ();
```

Initializes a new instance of the `GuidConverter` class.

To be added.

## GuidConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to a GUID object using the context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
This converter can only convert a GUID object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## GuidConverter.CanConvertTo(ITypeDescriptorContext, Type) method

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

## GuidConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given object to a GUID object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert a GUID object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## GuidConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

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

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
The most common types to convert are to and from a string object. The default implementation will make a call to `Object.ToString` on the object if the object is valid and if the destination type is `string`.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.
