---
title: "EnumConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EnumConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EnumConverter class

Namespace: `System.ComponentModel`

```csharp
public class EnumConverter : System.ComponentModel.TypeConverter
```

Provides a type converter to convert `Enum` objects to and from various other representations.

#### Remarks
This converter can only convert an enumeration object to and from a string. The `EnumConverter` class provides the `Comparer` property to get an `IComparer` interface that can be used to sort the values of the enumeration. By default, the enumeration values are sorted in the order they appear in the file.

For more information about type converters, see the `TypeConverter` base class.

> **Note:**
> You should never create an instance of an `EnumConverter`. Instead, call the `TypeDescriptor.GetConverter` method of the `TypeDescriptor` class. For more information, see the examples in the `TypeConverter` base class.

#### Examples
The following code example converts a variable of type `Enum` to a string, and vice versa. The example requires that you have declared an `Enum` called `Servers` and that it has the following members:

```
Windows=1, Exchange=2, BizTalk=3
```

_Code sample not included: ~/snippets/csharp/System.ComponentModel/BooleanConverter/Overview/converters.cs._

## EnumConverter.EnumConverter(Type) constructor

```csharp
public EnumConverter (Type type);
```

Initializes a new instance of the `EnumConverter` class for the given type.

Parameters:

- `type`: A `Type` that represents the type of enumeration to associate with this enumeration converter.

Exceptions:

- `ArgumentException`: .NET 9 and later versions: `type` is not of an enum type.

To be added.

## EnumConverter.Comparer property

```csharp
protected virtual System.Collections.IComparer Comparer { get; }
```

Gets an `IComparer` that can be used to sort the values of the enumeration.

Returns: An `IComparer` for sorting the enumeration values.

#### Remarks
By default, the enumeration values are sorted in the order they appear in the file.

## EnumConverter.EnumType property

```csharp
protected Type EnumType { get; }
```

Specifies the type of the enumerator this converter is associated with.

Returns: The type of the enumerator this converter is associated with.

To be added.

## EnumConverter.Values property

```csharp
protected System.ComponentModel.TypeConverter.StandardValuesCollection? Values { get; set; }
```

Gets or sets a `StandardValuesCollection` that specifies the possible values for the enumeration.

Returns: A `StandardValuesCollection` that specifies the possible values for the enumeration.

To be added.

## EnumConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Gets a value indicating whether this converter can convert an object in the given source type to an enumeration object using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you wish to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
This converter can only convert an enumeration object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## EnumConverter.CanConvertTo(ITypeDescriptorContext, Type) method

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

## EnumConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public override object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the specified value object to an enumeration object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: An optional `CultureInfo`. If not supplied, the current culture is assumed.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted `value`.

Exceptions:

- `FormatException`: `value` is not a valid value for the target type.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert an enumeration object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## EnumConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

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
- `ArgumentException`: `value` is not a valid value for the enumeration.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
This converter can only convert an enumeration object to and from a string.

The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

> **Note:**
>  The behavior of the `EnumConverter.ConvertTo` method is undefined if the enumeration has multiple fields with the same value.

## EnumConverter.GetStandardValues(ITypeDescriptorContext) method

```csharp
public override System.ComponentModel.TypeConverter.StandardValuesCollection GetStandardValues (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a collection of standard values for the data type this validator is designed for.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: A `StandardValuesCollection` that holds a standard set of valid values, or `null` if the data type does not support a standard set of values.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

> **Note:**
>  Any fields of the enumeration that are marked with `BrowsableAttribute` set to `false` will not be returned.

## EnumConverter.GetStandardValuesExclusive(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesExclusive (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether the list of standard values returned from `TypeConverter.GetStandardValues` is an exclusive list using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if the `StandardValuesCollection` returned from `TypeConverter.GetStandardValues` is an exhaustive list of possible values; `false` if other values are possible.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## EnumConverter.GetStandardValuesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Gets a value indicating whether this object supports a standard set of values that can be picked from a list using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` because `TypeConverter.GetStandardValues` should be called to find a common set of values the object supports. This method never returns `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.

## EnumConverter.IsValid(ITypeDescriptorContext, Object) method

```csharp
public override bool IsValid (System.ComponentModel.ITypeDescriptorContext? context, object? value);
```

Gets a value indicating whether the given object value is valid for this type.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: The `Object` to test.

Returns: `true` if the specified value is valid for this object; otherwise, `false`.

#### Remarks
The `context` parameter can be used to extract additional information about the environment this converter is being invoked from. This can be `null`, so always check. Also, properties on the context object can return `null`.
