---
title: "TypeConverter class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeConverter class

Namespace: `System.ComponentModel`

```csharp
public class TypeConverter
```

Provides a unified way of converting types of values to other types, as well as for accessing standard values and subproperties.

#### Remarks
The most common type of converter is one that converts to and from a text representation. The type converter for a class is bound to the class with a `TypeConverterAttribute`. Unless this attribute is overridden, all classes that inherit from this class use the same type converter as the base class.

> **Note:**
> For general type system purposes, do not access a type converter directly. Instead, access the appropriate converter by using `TypeDescriptor`. For more information, see the code examples provided.
>
> However, when using XAML, a XAML processor searches for the `TypeConverterAttribute` directly, instead of going through `TypeDescriptor`. For cases where you do want a `TypeDescriptor` instance from code, or where you create a shared instance in WPF resources, it is acceptable to construct it directly without referencing `TypeDescriptor` or other reflection and type system support.

Classes derived from `TypeConverter` are often referenced as part of how a XAML processor converts an attribute or initialization text value from markup (which is inherently a string) and generates an object for a run-time representation. Custom type authors that intend to support a type conversion behavior for XAML typically implement a `TypeConverter` class that supports their own unique `ConvertFrom` behavior from a string. This behavior enables type conversion from the string provided as a XAML attribute value and provides a XAML processor with the support needed to create an object from the string, so that the object can be produced in a parsed object graph. Custom types or members of custom types are indicated by applying `TypeConverterAttribute` to the definitions, with the attribute referencing the custom `TypeConverter` implementation. For more information, see Type Converters for XAML Overview.

#### Examples
The following code example shows how to create an instance of a type converter and bind it to a class. The class implementing the converter, `MyClassConverter`, must inherit from the `TypeConverter` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeConverter/Overview/source.cs._

When you have a property that has an enumeration, check to see whether an enumeration value is valid before setting the property. The next code example requires that an enumeration called `MyPropertyEnum` has been declared.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeConverter/Overview/source.cs._

Another common type converter usage is to convert an object to a string. The following code example prints out the name of the `Color` stored in the variable `c`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeConverter/Overview/source.cs._

You can also use a type converter to convert a value from its name, as shown in the next code example.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeConverter/Overview/source.cs._

In the following code example, you can use a type converter to print out the set of standard values that the object supports.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeConverter/Overview/source.cs._

## TypeConverter.TypeConverter() constructor

```csharp
public TypeConverter ();
```

Initializes a new instance of the `TypeConverter` class.

To be added.

## TypeConverter.CanConvertFrom(Type) method

```csharp
public bool CanConvertFrom (Type sourceType);
```

Returns whether this converter can convert an object of the given type to the type of this converter.

Parameters:

- `sourceType`: A `Type` that represents the type you want to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
As implemented in this class, this method always returns `false`. It never returns `true`.

## TypeConverter.CanConvertFrom(ITypeDescriptorContext, Type) method

```csharp
public virtual bool CanConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, Type sourceType);
```

Returns whether this converter can convert an object of the given type to the type of this converter, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `sourceType`: A `Type` that represents the type you want to convert from.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
As implemented in this class, this method returns `false`, unless `sourceType` is an `InstanceDescriptor`.

## TypeConverter.CanConvertTo(Type) method

```csharp
public bool CanConvertTo (Type? destinationType);
```

Returns whether this converter can convert the object to the specified type.

Parameters:

- `destinationType`: A `Type` that represents the type you want to convert to.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
If `destinationType` is a string, the default implementation of `TypeConverter.CanConvertTo` always returns `true`.

## TypeConverter.CanConvertTo(ITypeDescriptorContext, Type) method

```csharp
public virtual bool CanConvertTo (System.ComponentModel.ITypeDescriptorContext? context, Type? destinationType);
```

Returns whether this converter can convert the object to the specified type, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `destinationType`: A `Type` that represents the type you want to convert to.

Returns: `true` if this converter can perform the conversion; otherwise, `false`.

#### Remarks
Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

If `destinationType` is a string, the default implementation of `TypeConverter.CanConvertTo` always returns `true`.

## TypeConverter.ConvertFrom(Object) method

```csharp
public object? ConvertFrom (object value);
```

Converts the given value to the type of this converter.

Parameters:

- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

To be added.

## TypeConverter.ConvertFrom(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public virtual object? ConvertFrom (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object value);
```

Converts the given object to the type of this converter, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: The `CultureInfo` to use as the current culture.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
Custom type authors that intend to support a type conversion behavior for XAML typically implement a `TypeConverter` class that supports `TypeConverter.ConvertFrom` behavior from a string. This behavior enables type conversion from the string provided as a XAML attribute value and provides a XAML processor with the support needed to create an object from the string, so that the object can be produced in a parsed object graph. Custom types or members of custom types are indicated by applying `TypeConverterAttribute` to the definitions, with the attribute referencing the custom `TypeConverter` implementation.

For XAML purposes, you do not typically provide branching implementations based on `culture`. This is because XAML is precompiled in a development environment context, and culture-specific information for runtime XAML is not relevant for XAML type conversion. For more information, see Type Converters for XAML Overview.

## TypeConverter.ConvertFromInvariantString(String) method

```csharp
public object? ConvertFromInvariantString (string text);
```

Converts the given string to the type of this converter, using the invariant culture.

Parameters:

- `text`: The `String` to convert.

Returns: An `Object` that represents the converted text.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
The default implementation always returns `null`.

## TypeConverter.ConvertFromInvariantString(ITypeDescriptorContext, String) method

```csharp
public object? ConvertFromInvariantString (System.ComponentModel.ITypeDescriptorContext? context, string text);
```

Converts the given string to the type of this converter, using the invariant culture and the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `text`: The `String` to convert.

Returns: An `Object` that represents the converted text.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
An exception is raised if the string cannot be converted into the appropriate object. The default implementation always returns `null`.

Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

## TypeConverter.ConvertFromString(String) method

```csharp
public object? ConvertFromString (string text);
```

Converts the specified text to an object.

Parameters:

- `text`: The text representation of the object to convert.

Returns: An `Object` that represents the converted text.

Exceptions:

- `NotSupportedException`: The string cannot be converted into the appropriate object.

#### Remarks
The default implementation always returns `null`.

#### Examples
For an example of this function, see the `TypeConverter` class.

## TypeConverter.ConvertFromString(ITypeDescriptorContext, String) method

```csharp
public object? ConvertFromString (System.ComponentModel.ITypeDescriptorContext? context, string text);
```

Converts the given text to an object, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `text`: The `String` to convert.

Returns: An `Object` that represents the converted text.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
An exception is raised if the string cannot be converted into the appropriate object. The default implementation always returns `null`.

Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

## TypeConverter.ConvertFromString(ITypeDescriptorContext, CultureInfo, String) method

```csharp
public object? ConvertFromString (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, string text);
```

Converts the given text to an object, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo`. If `null` is passed, the current culture is assumed.
- `text`: The `String` to convert.

Returns: An `Object` that represents the converted text.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
An exception is raised if the string cannot be converted into the appropriate object. The default implementation always returns `null`.

Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

## TypeConverter.ConvertTo(Object, Type) method

```csharp
public object? ConvertTo (object? value, Type destinationType);
```

Converts the given value object to the specified type, using the arguments.

Parameters:

- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the `value` parameter to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: The `destinationType` parameter is `null`.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
The most common type to convert to and from is a string object. This implementation calls `Object.ToString` on the object, if the object is valid and if the destination type is a string.

## TypeConverter.ConvertTo(ITypeDescriptorContext, CultureInfo, Object, Type) method

```csharp
public virtual object? ConvertTo (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value, Type destinationType);
```

Converts the given value object to the specified type, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo`. If `null` is passed, the current culture is assumed.
- `value`: The `Object` to convert.
- `destinationType`: The `Type` to convert the `value` parameter to.

Returns: An `Object` that represents the converted value.

Exceptions:

- `ArgumentNullException`: The `destinationType` parameter is `null`.
- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
The most common types to convert are to and from a string object. This implementation calls `Object.ToString` on the object if the object is valid and if the destination type is a string.

Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

Custom type authors that intend to support a type conversion behavior for XAML typically implement a `TypeConverter` class that supports `TypeConverter.ConvertFrom` behavior from a string. These type converters might also implement `TypeConverter.ConvertTo` to support serialization back to XAML.

Some XAML serialization scenarios cannot be adequately addressed with `TypeConverter` alone. In these cases, it may be necessary to also define a `ValueSerializer` that handles the serialization cases that would otherwise be handled by `TypeConverter.ConvertTo`. For more information, see `ValueSerializer`.
