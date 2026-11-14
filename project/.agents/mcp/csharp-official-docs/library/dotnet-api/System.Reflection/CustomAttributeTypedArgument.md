---
title: "CustomAttributeTypedArgument struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeTypedArgument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeTypedArgument struct

Namespace: `System.Reflection`

```csharp
public readonly struct CustomAttributeTypedArgument : IEquatable<System.Reflection.CustomAttributeTypedArgument>
```

Represents an argument of a custom attribute in the reflection-only context, or an element of an array argument.

#### Remarks
Code that is being examined in the reflection-only context cannot be executed, so it is not always possible to examine custom attributes by creating instances of them and then examining their properties, using methods like `Attribute.GetCustomAttributes`, `MemberInfo.GetCustomAttributes`, and so on. If the code for the attribute type itself is loaded into the reflection-only context, it cannot be executed.

The `CustomAttributeNamedArgument` structure is used by the `CustomAttributeData` class to provide access to the type and value of a positional argument specified for a custom attribute instance, without executing the attribute constructor. It also provides access to the type and value of a named argument without executing the code of the corresponding property of the custom attribute type.

The types and values of all the positional and named arguments of an attribute instance are provided by `CustomAttributeTypedArgument` structures. The positional attributes returned by the `ConstructorArguments` property are directly represented by `CustomAttributeTypedArgument` structures, but the named arguments returned by the `NamedArguments` property are represented by `CustomAttributeNamedArgument` structures; to get the `CustomAttributeTypedArgument` structure for a named argument, use the `TypedValue` property.

If an argument is an array of values, the `Value` property of the `CustomAttributeTypedArgument` that represents the argument returns a generic `ReadOnlyCollection<T>` of `CustomAttributeTypedArgument` objects. Each `CustomAttributeTypedArgument` object in the collection represents the corresponding element of the array.

To create instances of the `CustomAttributeData` class, use the `static` `CustomAttributeData.GetCustomAttributes` factory method.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeTypedArgument.CustomAttributeTypedArgument(Object) constructor

```csharp
public CustomAttributeTypedArgument (object value);
```

Initializes a new instance of the `CustomAttributeTypedArgument` class with the specified value.

Parameters:

- `value`: The value of the custom attribute argument.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
The `value` parameter cannot be `null` for this constructor, because the argument type is inferred from the type of `value`. To specify a `null` value, use the `%23ctor` constructor.

This constructor is for use by inheritors of the `CustomAttributeTypedArgument` class. It is not intended for use in application code.

## CustomAttributeTypedArgument.CustomAttributeTypedArgument(Type, Object) constructor

```csharp
public CustomAttributeTypedArgument (Type argumentType, object? value);
```

Initializes a new instance of the `CustomAttributeTypedArgument` class with the specified type and value.

Parameters:

- `argumentType`: The type of the custom attribute argument.
- `value`: The value of the custom attribute argument.

Exceptions:

- `ArgumentNullException`: `argumentType` is `null`.

#### Remarks
This constructor is for use by inheritors of the `CustomAttributeTypedArgument` class. It is not intended for use in application code.

## CustomAttributeTypedArgument.ArgumentType property

```csharp
public Type ArgumentType { get; }
```

Gets the type of the argument or of the array argument element.

Returns: A `Type` object representing the type of the argument or of the array element.

#### Remarks
For simple arguments or for elements of array arguments, this property identifies the actual type of the value returned by the `Value` property. For array arguments, this property returns the array type, but the `Value` property returns a `ReadOnlyCollection<CustomAttributeTypedArgument>` (`ReadOnlyCollection(Of CustomAttributeTypedArgument)` in Visual Basic) in which each element of the collection represents the corresponding element of the array argument.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `ArgumentType` property is used in the `ShowValueOrArray` method that displays custom attribute data, to display the types of attributes.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeTypedArgument.Value property

```csharp
public object? Value { get; }
```

Gets the value of the argument for a simple argument or for an element of an array argument; gets a collection of values for an array argument.

Returns: An object that represents the value of the argument or element, or a generic `ReadOnlyCollection<T>` of `CustomAttributeTypedArgument` objects that represent the values of an array-type argument.

#### Remarks
If the `CustomAttributeTypedArgument` represents an array argument, this property returns a `ReadOnlyCollection<CustomAttributeTypedArgument>` (`ReadOnlyCollection(Of CustomAttributeTypedArgument)` in Visual Basic). Each element of the collection represents the corresponding element of the array argument.

The type of the value can be obtained by using the `ArgumentType` property. `CustomAttributeTypedArgument.ArgumentType` gets the actual type of the value returned by the `Value` property for simple arguments or for elements of array arguments. It returns the array type for array arguments.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `Value` property is used in the `ShowValueOrArray` method that displays custom attribute data, to display the values of attributes.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

`CustomAttributeTypedArgument.ArgumentType` | `Assembly.ReflectionOnlyLoad`

## CustomAttributeTypedArgument.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: Another object to compare to.

Returns: `true` if `obj` and this instance are the same type and represent the same value; otherwise, `false`.

To be added.

## CustomAttributeTypedArgument.Equals(CustomAttributeTypedArgument) method

```csharp
public bool Equals (System.Reflection.CustomAttributeTypedArgument other);
```

Indicates whether the current instance is equal to another instance of the same type.

Parameters:

- `other`: An instance to compare with this instance.

Returns: `true` if the current instance is equal to the other instance; otherwise, `false`.

To be added.

## CustomAttributeTypedArgument.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer that is the hash code for this instance.

To be added.

## CustomAttributeTypedArgument.op_Equality(CustomAttributeTypedArgument, CustomAttributeTypedArgument) method

```csharp
public static bool operator == (System.Reflection.CustomAttributeTypedArgument left, System.Reflection.CustomAttributeTypedArgument right);
```

Tests whether two `CustomAttributeTypedArgument` structures are equivalent.

Parameters:

- `left`: The `CustomAttributeTypedArgument` structure to the left of the equality operator.
- `right`: The `CustomAttributeTypedArgument` structure to the right of the equality operator.

Returns: `true` if the two `CustomAttributeTypedArgument` structures are equal; otherwise, `false`.

The equivalent method for this operator is `CustomAttributeTypedArgument.Equals`.

## CustomAttributeTypedArgument.op_Inequality(CustomAttributeTypedArgument, CustomAttributeTypedArgument) method

```csharp
public static bool operator != (System.Reflection.CustomAttributeTypedArgument left, System.Reflection.CustomAttributeTypedArgument right);
```

Tests whether two `CustomAttributeTypedArgument` structures are different.

Parameters:

- `left`: The `CustomAttributeTypedArgument` structure to the left of the inequality operator.
- `right`: The `CustomAttributeTypedArgument` structure to the right of the inequality operator.

Returns: `true` if the two `CustomAttributeTypedArgument` structures are different; otherwise, `false`.

The equivalent method for this operator is `CustomAttributeTypedArgument.Equals`.

## CustomAttributeTypedArgument.ToString() method

```csharp
public override string ToString ();
```

Returns a string consisting of the argument name, the equal sign, and a string representation of the argument value.

Returns: A string consisting of the argument name, the equal sign, and a string representation of the argument value.

To be added.
