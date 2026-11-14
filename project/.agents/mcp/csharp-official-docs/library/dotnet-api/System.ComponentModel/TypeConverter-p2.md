---
title: "TypeConverter class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeConverter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeConverter class (part 2 of 3)

## TypeConverter.ConvertToInvariantString(Object) method

```csharp
public string? ConvertToInvariantString (object? value);
```

Converts the specified value to a culture-invariant string representation.

Parameters:

- `value`: The `Object` to convert.

Returns: A `String` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
The `context` parameter can be used to extract additional information about the environment from which this converter is being invoked. This can be `null`, so always check. Also, properties on the context object can return `null`.

Depending on the implementation of the value formatter, it might be possible to pass the returned string back into the value formatter to re-create an instance of the object.

## TypeConverter.ConvertToInvariantString(ITypeDescriptorContext, Object) method

```csharp
public string? ConvertToInvariantString (System.ComponentModel.ITypeDescriptorContext? context, object? value);
```

Converts the specified value to a culture-invariant string representation, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: The `Object` to convert.

Returns: A `String` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

Depending on the implementation of the value formatter, it might be possible to pass the returned string back into the value formatter to re-create an instance of the object.

## TypeConverter.ConvertToString(Object) method

```csharp
public string? ConvertToString (object? value);
```

Converts the specified value to a string representation.

Parameters:

- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
Depending on the implementation of the value formatter, it might be possible to pass the returned string back into the value formatter to re-create an instance of the object.

#### Examples
For an example on this function, see the `TypeConverter` class.

## TypeConverter.ConvertToString(ITypeDescriptorContext, Object) method

```csharp
public string? ConvertToString (System.ComponentModel.ITypeDescriptorContext? context, object? value);
```

Converts the given value to a string representation, using the given context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

Depending on the implementation of the value formatter, it might be possible to pass the returned string back into the value formatter to re-create an instance of the object.

## TypeConverter.ConvertToString(ITypeDescriptorContext, CultureInfo, Object) method

```csharp
public string? ConvertToString (System.ComponentModel.ITypeDescriptorContext? context, System.Globalization.CultureInfo? culture, object? value);
```

Converts the given value to a string representation, using the specified context and culture information.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `culture`: A `CultureInfo`. If `null` is passed, the current culture is assumed.
- `value`: The `Object` to convert.

Returns: An `Object` that represents the converted value.

Exceptions:

- `NotSupportedException`: The conversion cannot be performed.

#### Remarks
Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

Depending on the implementation of the value formatter, it might be possible to pass the returned string back into the value formatter to re-create an instance of the object.

## TypeConverter.CreateInstance(IDictionary) method

```csharp
public object? CreateInstance (System.Collections.IDictionary propertyValues);
```

Re-creates an `Object` given a set of property values for the object.

Parameters:

- `propertyValues`: An `IDictionary` that represents a dictionary of new property values.

Returns: An `Object` representing the given `IDictionary`, or `null` if the object cannot be created. This method always returns `null`.

#### Remarks
Use this method for objects that are immutable, but for which you want to provide changeable properties.

The dictionary provided by the `propertyValues` parameter has a series of name/value pairs, one for each property returned from `TypeConverter.GetProperties`.

## TypeConverter.CreateInstance(ITypeDescriptorContext, IDictionary) method

```csharp
public virtual object? CreateInstance (System.ComponentModel.ITypeDescriptorContext? context, System.Collections.IDictionary propertyValues);
```

Creates an instance of the type that this `TypeConverter` is associated with, using the specified context, given a set of property values for the object.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `propertyValues`: An `IDictionary` of new property values.

Returns: An `Object` representing the given `IDictionary`, or `null` if the object cannot be created. This method always returns `null`.

#### Remarks
Use this method for objects that are immutable, but for which you want to provide changeable properties.

## TypeConverter.GetConvertFromException(Object) method

```csharp
protected Exception GetConvertFromException (object? value);
```

Returns an exception to throw when a conversion cannot be performed.

Parameters:

- `value`: The `Object` to convert, or `null` if the object is not available.

Returns: An `Exception` that represents the exception to throw when a conversion cannot be performed.

Exceptions:

- `NotSupportedException`: Automatically thrown by this method.

To be added.

## TypeConverter.GetConvertToException(Object, Type) method

```csharp
protected Exception GetConvertToException (object? value, Type destinationType);
```

Returns an exception to throw when a conversion cannot be performed.

Parameters:

- `value`: The `Object` to convert, or `null` if the object is not available.
- `destinationType`: A `Type` that represents the type the conversion was trying to convert to.

Returns: An `Exception` that represents the exception to throw when a conversion cannot be performed.

Exceptions:

- `NotSupportedException`: Automatically thrown by this method.

To be added.

## TypeConverter.GetCreateInstanceSupported() method

```csharp
public bool GetCreateInstanceSupported ();
```

Returns whether changing a value on this object requires a call to the `TypeConverter.CreateInstance` method to create a new value.

Returns: `true` if changing a property on this object requires a call to `TypeConverter.CreateInstance` to create a new value; otherwise, `false`.

To be added.

## TypeConverter.GetCreateInstanceSupported(ITypeDescriptorContext) method

```csharp
public virtual bool GetCreateInstanceSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether changing a value on this object requires a call to `TypeConverter.CreateInstance` to create a new value, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if changing a property on this object requires a call to `TypeConverter.CreateInstance` to create a new value; otherwise, `false`.

#### Remarks
As implemented in this class, this method always returns `false`.

## TypeConverter.GetProperties(Object) method

```csharp
public System.ComponentModel.PropertyDescriptorCollection? GetProperties (object value);
```

Returns a collection of properties for the type of array specified by the value parameter.

Parameters:

- `value`: An `Object` that specifies the type of array for which to get properties.

Returns: A `PropertyDescriptorCollection` with the properties that are exposed for this data type, or `null` if there are no properties.

#### Remarks
As implemented in this class, this method always returns `null`.

By default, a type does not return properties. An easy implementation of this method can call `TypeDescriptor.GetProperties` for the correct data type.

## TypeConverter.GetProperties(ITypeDescriptorContext, Object) method

```csharp
public System.ComponentModel.PropertyDescriptorCollection? GetProperties (System.ComponentModel.ITypeDescriptorContext? context, object value);
```

Returns a collection of properties for the type of array specified by the value parameter, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: An `Object` that specifies the type of array for which to get properties.

Returns: A `PropertyDescriptorCollection` with the properties that are exposed for this data type, or `null` if there are no properties.

#### Remarks
Use the `context` parameter to extract additional information about the environment from which this converter is invoked. This parameter can be `null`, so always check it. Also, properties on the context object can return `null`.

As implemented in this class, this method always returns `null`.

By default, a type does not return properties. An easy implementation of this method can call `TypeDescriptor.GetProperties` for the correct data type.

## TypeConverter.GetProperties(ITypeDescriptorContext, Object, Attribute[]) method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection? GetProperties (System.ComponentModel.ITypeDescriptorContext? context, object value, Attribute[]? attributes);
```

Returns a collection of properties for the type of array specified by the value parameter, using the specified context and attributes.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.
- `value`: An `Object` that specifies the type of array for which to get properties.
- `attributes`: An array of type `Attribute` that is used as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that are exposed for this data type, or `null` if there are no properties.

#### Remarks
As implemented in this class, this method always returns `null`.

## TypeConverter.GetPropertiesSupported() method

```csharp
public bool GetPropertiesSupported ();
```

Returns whether this object supports properties.

Returns: `true` if `TypeConverter.GetProperties` should be called to find the properties of this object; otherwise, `false`.

#### Remarks
As implemented in this class, this method always returns `false`.

## TypeConverter.GetPropertiesSupported(ITypeDescriptorContext) method

```csharp
public virtual bool GetPropertiesSupported (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns whether this object supports properties, using the specified context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context.

Returns: `true` if `TypeConverter.GetProperties` should be called to find the properties of this object; otherwise, `false`.

#### Remarks
As implemented in this class, this method always returns `false`.

## TypeConverter.GetStandardValues() method

```csharp
public System.Collections.ICollection? GetStandardValues ();
```

Returns a collection of standard values from the default context for the data type this type converter is designed for.

Returns: A `StandardValuesCollection` containing a standard set of valid values, or `null` if the data type does not support a standard set of values.

#### Remarks
As implemented in this class, this method always returns `null`.

## TypeConverter.GetStandardValues(ITypeDescriptorContext) method

```csharp
public virtual System.ComponentModel.TypeConverter.StandardValuesCollection? GetStandardValues (System.ComponentModel.ITypeDescriptorContext? context);
```

Returns a collection of standard values for the data type this type converter is designed for when provided with a format context.

Parameters:

- `context`: An `ITypeDescriptorContext` that provides a format context that can be used to extract additional information about the environment from which this converter is invoked. This parameter or properties of this parameter can be `null`.

Returns: A `StandardValuesCollection` that holds a standard set of valid values, or `null` if the data type does not support a standard set of values.

#### Remarks
As implemented in `TypeConverter`, this method always returns `null`.

#### Examples
For an example on this function, see the `TypeConverter` class.

## TypeConverter.GetStandardValuesExclusive() method

```csharp
public bool GetStandardValuesExclusive ();
```

Returns whether the collection of standard values returned from `TypeConverter.GetStandardValues` is an exclusive list.

Returns: `true` if the `StandardValuesCollection` returned from `TypeConverter.GetStandardValues` is an exhaustive list of possible values; `false` if other values are possible.

#### Remarks
As implemented in this class, this method always returns `false`.

If the list is exclusive, such as in an enumeration data type, then no other values are valid. If the list is not exclusive, then other valid values might exist in addition to the list of standard values that the `TypeConverter.GetStandardValues` method provides. If the values are exclusive, the list returned by `TypeConverter.GetStandardValues` should not allow these values to be edited.
