---
title: "NullableConverter class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/NullableConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullableConverter class

Namespace: `System.ComponentModel`

```csharp
public class NullableConverter : System.ComponentModel.TypeConverter
```

Provides automatic conversion between a nullable type and its underlying primitive type.

To be added.

## NullableConverter.NullableConverter(Type) constructor

```csharp
public NullableConverter (Type type);
```

Initializes a new instance of the `NullableConverter` class.

Parameters:

- `type`: The specified nullable type.

Exceptions:

- `ArgumentException`: `type` is not a nullable type.

To be added.

## NullableConverter.NullableType property

```csharp
public Type NullableType { get; }
```

Gets the nullable type.

Returns: A `Type` that represents the nullable type.

To be added.

## NullableConverter.UnderlyingType property

```csharp
public Type UnderlyingType { get; }
```

Gets the underlying type.

Returns: A `Type` that represents the underlying type.

To be added.

## NullableConverter.UnderlyingTypeConverter property

```csharp
public System.ComponentModel.TypeConverter UnderlyingTypeConverter { get; }
```

Gets the underlying type converter.

Returns: A `TypeConverter` that represents the underlying type converter.

To be added.

## NullableConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Returns whether this converter can convert an object of the given type to the type of this converter, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you want to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

To be added.

## NullableConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public override bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Returns whether this converter can convert the object to the specified type, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: A `Type` that represents the type you want to convert to.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

To be added.

## NullableConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

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

## NullableConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public override object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to the specified type, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The `CultureInfo` to use as the current culture.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the value parameter to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: `destinationType` is `null`.
- `NotSupportedException`: The conversion cannot be performed.

To be added.

## NullableConverter.CreateInstance(ITypeDescriptorContext, IDictionary) method

```csharp
public override object? CreateInstance (System.ComponentModel.ITypeDescriptorContext? context, System.Collections.IDictionary propertyValues);
```

Creates an instance of the type that this `TypeConverter` is associated with, using the specified context, given a set of property values for the object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `propertyValues`: An `IDictionary` of new property values.

Returns: An `Object` representing the given `IDictionary`, or `null` if the object cannot be created. This method always returns `null`.

To be added.

## NullableConverter.GetCreateInstanceSupported(ITypeDescriptorContext) method

```csharp
public override bool GetCreateInstanceSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether changing a value on this object requires a call to `TypeConverter.CreateInstance` to create a new value, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if changing a property on this object requires a call to `TypeConverter.CreateInstance` to create a new value; otherwise, `false`.

To be added.

## NullableConverter.GetProperties(ITypeDescriptorContext, Object, Attribute[]) method

```csharp
public override System.ComponentModel.PropertyDescriptorCollection? GetProperties (System.ComponentModel.ITypeDescriptorContext? context, object value, Attribute[]? attributes);
```

Returns a collection of properties for the type of array specified by the value parameter, using the specified context and attributes.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: An `Object` that specifies the type of array for which to get properties.
- `attributes`: An array of type `Attribute` that is used as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that are exposed for this data type, or `null` if there are no properties.

To be added.

## NullableConverter.GetPropertiesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetPropertiesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether this object supports properties, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if `TypeConverter.GetProperties` should be called to find the properties of this object; otherwise, `false`.

To be added.

## NullableConverter.GetStandardValues(ITypeDescriptorContext) method

```csharp
public override System.ComponentModel.TypeConverter.StandardValuesCollection? GetStandardValues (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns a collection of standard values for the data type this type converter is designed for when provided with a format context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context that can be used to extract additional information about the environment from which this converter is invoked. This parameter or properties of this parameter can be `null`.

Returns: A `StandardValuesCollection` that holds a standard set of valid values, or `null` if the data type does not support a standard set of values.

To be added.

## NullableConverter.GetStandardValuesExclusive(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesExclusive (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether the collection of standard values returned from `GetStandardValues` is an exclusive list of possible values, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if the `StandardValuesCollection` returned from `TypeConverter.GetStandardValues` is an exhaustive list of possible values; `false` if other values are possible.

To be added.

## NullableConverter.GetStandardValuesSupported(ITypeDescriptorContext) method

```csharp
public override bool GetStandardValuesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether this object supports a standard set of values that can be picked from a list, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if `TypeConverter.GetStandardValues` should be called to find a common set of values the object supports; otherwise, `false`.

To be added.

## NullableConverter.IsValid(ITypeDescriptorContext, Object) method

```csharp
public override bool IsValid (System.ComponentModel.ITypeDescriptorContext? context, object? value);
```

Returns whether the given value object is valid for this type and for the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: The `Object` to test for validity.

Returns: `true` if the specified value is valid for this object; otherwise, `false`.

To be added.
