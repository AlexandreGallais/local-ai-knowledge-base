---
title: "TypeConverterAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/TypeConverterAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TypeConverterAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class TypeConverterAttribute : Attribute
```

Specifies what type to use as a converter for the object this attribute is bound to.

#### Remarks
The class you use for conversion must inherit from `TypeConverter`. Use the `ConverterTypeName` property to get the name of the class that provides the data conversion for the object this attribute is bound to.

For more information about attributes, see Attributes. For more information about type converters, see the `TypeConverter` base class.

In order to establish a type converter on a custom class that provides type conversion behavior for XAML, you apply the `TypeConverterAttribute` attribute to your type. The argument of the attribute references your type converter implementation. Your type converter should be able to accept values from a string that is used for attributes or initialization text in XAML markup, and convert that string into your intended destination type. For more information, see TypeConverters and XAML.

Rather than applying to all values of a type, a type converter behavior for XAML can also be established on a specific property. In this case, you apply `TypeConverterAttribute` to the property definition (the outer definition, not the specific `get` and `set` definitions).

A type converter behavior for XAML usage of a custom attachable member can be assigned by applying `TypeConverterAttribute` to the `get` method accessor that supports the XAML usage. For more information, see Attached Properties Overview.

For complex XAML serialization cases that require additional state from the object runtime, consider defining a value serializer in addition to a type converter, and attribute both support classes on your custom types or custom members. For more information, see `ValueSerializer`.

#### Examples
The following example declares `MyClass` to use the type converter called `MyClassConverter`. This example assumes that `MyClassConverter` has been implemented elsewhere. The class implementing the converter (`MyClassConverter`) must inherit from the `TypeConverter` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeConverterAttribute/Overview/source.cs._

The next example creates an instance of `MyClass`. Then it gets the attributes for the class, and prints the name of the type converter used by `MyClass`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/TypeConverterAttribute/Overview/source.cs._

## TypeConverterAttribute.TypeConverterAttribute() constructor

```csharp
public TypeConverterAttribute ();
```

Initializes a new instance of the `TypeConverterAttribute` class with the default type converter, which is an empty string ("").

#### Remarks
The class that provides the data conversion must inherit from `TypeConverter`.

## TypeConverterAttribute.TypeConverterAttribute(String) constructor

```csharp
public TypeConverterAttribute (string typeName);
```

Initializes a new instance of the `TypeConverterAttribute` class, using the specified type name as the data converter for the object this attribute is bound to.

Parameters:

- `typeName`: The fully qualified name of the class to use for data conversion for the object this attribute is bound to.

#### Remarks
The class that provides the data conversion must inherit from `TypeConverter`.

## TypeConverterAttribute.TypeConverterAttribute(Type) constructor

```csharp
public TypeConverterAttribute (Type type);
```

Initializes a new instance of the `TypeConverterAttribute` class, using the specified type as the data converter for the object this attribute is bound to.

Parameters:

- `type`: A `Type` that represents the type of the converter class to use for data conversion for the object this attribute is bound to.

#### Remarks
The class that provides the data conversion must inherit from `TypeConverter`.

## TypeConverterAttribute.ConverterTypeName property

```csharp
public string ConverterTypeName { get; }
```

Gets the fully qualified type name of the `Type` to use as a converter for the object this attribute is bound to.

Returns: The fully qualified type name of the `Type` to use as a converter for the object this attribute is bound to, or an empty string ("") if none exists. The default value is an empty string ("").

To be added.

## TypeConverterAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `TypeConverterAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current `TypeConverterAttribute`; otherwise, `false`.

To be added.

## TypeConverterAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A hash code for the current `TypeConverterAttribute`.

To be added.

## TypeConverterAttribute.Default field

```csharp
public static readonly System.ComponentModel.TypeConverterAttribute Default;
```

Specifies the type to use as a converter for the object this attribute is bound to.

To be added.
