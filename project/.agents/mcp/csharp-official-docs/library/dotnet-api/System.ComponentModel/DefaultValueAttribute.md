---
title: "DefaultValueAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DefaultValueAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DefaultValueAttribute class

Namespace: `System.ComponentModel`

```csharp
public class DefaultValueAttribute : Attribute
```

Specifies the default value for a property.

#### Remarks

You can create a `DefaultValueAttribute` with any value. A member's default value is typically its initial value. A visual designer can use the default value to reset the member's value. Code generators can use the default values also to determine whether code should be generated for the member.

> **Note:**
> A `DefaultValueAttribute` will not cause a member to be automatically initialized with the attribute's value. You must set the initial value in your code.

For more information, see Attributes.

#### Examples
The following example sets the default value of `MyProperty` to `false`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DefaultValueAttribute/Overview/source.cs._

The next example checks the default value of `MyProperty`. First the code gets a `PropertyDescriptorCollection` with all the properties for the object. Next it indexes into the `PropertyDescriptorCollection` to get `MyProperty`. Then it returns the attributes for this property and saves them in the attributes variable.

The example then prints the default value by retrieving the `DefaultValueAttribute` from the `AttributeCollection`, and writing its name to the console screen.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/DefaultValueAttribute/Overview/source.cs._

## DefaultValueAttribute.DefaultValueAttribute(Boolean) constructor

```csharp
public DefaultValueAttribute (bool value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a `Boolean` value.

Parameters:

- `value`: A `Boolean` that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Byte) constructor

```csharp
public DefaultValueAttribute (byte value);
```

Initializes a new instance of the `DefaultValueAttribute` class using an 8-bit unsigned integer.

Parameters:

- `value`: An 8-bit unsigned integer that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Char) constructor

```csharp
public DefaultValueAttribute (char value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a Unicode character.

Parameters:

- `value`: A Unicode character that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Double) constructor

```csharp
public DefaultValueAttribute (double value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a double-precision floating point number.

Parameters:

- `value`: A double-precision floating point number that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Int16) constructor

```csharp
public DefaultValueAttribute (short value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a 16-bit signed integer.

Parameters:

- `value`: A 16-bit signed integer that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Int32) constructor

```csharp
public DefaultValueAttribute (int value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a 32-bit signed integer.

Parameters:

- `value`: A 32-bit signed integer that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Int64) constructor

```csharp
public DefaultValueAttribute (long value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a 64-bit signed integer.

Parameters:

- `value`: A 64-bit signed integer that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Object) constructor

```csharp
public DefaultValueAttribute (object? value);
```

Initializes a new instance of the `DefaultValueAttribute` class.

Parameters:

- `value`: An `Object` that represents the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(SByte) constructor

```csharp
public DefaultValueAttribute (sbyte value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a `SByte` value.

Parameters:

- `value`: The default signed byte value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Single) constructor

```csharp
public DefaultValueAttribute (float value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a single-precision floating point number.

Parameters:

- `value`: A single-precision floating point number that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(String) constructor

```csharp
public DefaultValueAttribute (string? value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a `String`.

Parameters:

- `value`: A `String` that is the default value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(UInt16) constructor

```csharp
public DefaultValueAttribute (ushort value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a `UInt16` value.

Parameters:

- `value`: The default unsigned 16-bit integer value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(UInt32) constructor

```csharp
public DefaultValueAttribute (uint value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a `UInt32` value.

Parameters:

- `value`: The default unsigned integer value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(UInt64) constructor

```csharp
public DefaultValueAttribute (ulong value);
```

Initializes a new instance of the `DefaultValueAttribute` class using a `UInt64` value.

Parameters:

- `value`: The default unsigned long integer value.

To be added.

## DefaultValueAttribute.DefaultValueAttribute(Type, String) constructor

```csharp
public DefaultValueAttribute (Type type, string? value);
```

Initializes a new instance of the `DefaultValueAttribute` class, converting the specified value to the specified type, and using an invariant culture as the translation context.

Parameters:

- `type`: A `Type` that represents the type to convert the value to.
- `value`: A `String` that can be converted to the type using the `TypeConverter` for the type and the U.S. English culture.

To be added.

## DefaultValueAttribute.Value property

```csharp
public virtual object? Value { get; }
```

Gets the default value of the property this attribute is bound to.

Returns: An `Object` that represents the default value of the property this attribute is bound to.

To be added.

## DefaultValueAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns whether the value of the given object is equal to the current `DefaultValueAttribute`.

Parameters:

- `obj`: The object to test the value equality of.

Returns: `true` if the value of the given object is equal to that of the current; otherwise, `false`.

To be added.

## DefaultValueAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DefaultValueAttribute.SetValue(Object) method

```csharp
protected void SetValue (object? value);
```

Sets the default value for the property to which this attribute is bound.

Parameters:

- `value`: The default value.

To be added.
