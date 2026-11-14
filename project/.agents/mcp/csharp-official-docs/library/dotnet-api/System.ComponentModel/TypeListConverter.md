---
title: "TypeListConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeListConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeListConverter class

Namespace: `System.ComponentModel`

```csharp
public abstract class TypeListConverter : System.ComponentModel.TypeConverter
```

Provides a type converter that can be used to populate a list box with available types.

#### Remarks
You must provide the list of types to the constructor of this `abstract` class.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
>  You should never create an instance of a `TypeListConverter`. Instead, call the `TypeDescriptor.GetConverter` method of `TypeDescriptor`. For more information, see the examples in the `TypeConverter` base class.

## TypeListConverter.TypeListConverter(Type[]) constructor

```csharp
protected TypeListConverter (Type[] types);
```

Initializes a new instance of the `TypeListConverter` class using the type array as the available types.

Parameters:

- `types`: The array of type `Type` to use as the available types.

#### Remarks
The types provided in the `types` parameter can be used to populate a list box with the available types.

## TypeListConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert the specified `Type` of the source object using the given context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: The `Type` of the source object.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

To be added.

## TypeListConverter.CanConvertTo(ITypeDescriptorContext, Type) method

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

## TypeListConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the specified object to the native type of the converter.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo` that specifies the culture used to represent the font.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

To be added.

## TypeListConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to the specified destination type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value to.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This method most commonly converts types to and from string objects.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## TypeListConverter.GetStandardValues(ITypeDescriptorContext) method

```csharp
public override System.ComponentModel.TypeConverter.StandardValuesCollection GetStandardValues (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a collection of standard values for the data type this validator is designed for.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: A `StandardValuesCollection` that holds a standard set of valid values, or `null` if the data type does not support a standard set of values.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## TypeListConverter.GetStandardValuesExclusive(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesExclusive (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether the list of standard values returned from the `TypeListConverter.GetStandardValues` method is an exclusive list.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because the `StandardValuesCollection` returned from `TypeListConverter.GetStandardValues` is an exhaustive list of possible values. This method never returns `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

When the list is exclusive, no other values are valid besides the list of standard values the `TypeListConverter.GetStandardValues` method provides.

## TypeListConverter.GetStandardValuesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether this object supports a standard set of values that can be picked from a list using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because `TypeListConverter.GetStandardValues` should be called to find a common set of values the object supports. This method never returns `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.
