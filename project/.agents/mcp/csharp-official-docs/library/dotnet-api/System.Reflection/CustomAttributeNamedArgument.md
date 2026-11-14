---
title: "CustomAttributeNamedArgument struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/CustomAttributeNamedArgument.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CustomAttributeNamedArgument struct

Namespace: `System.Reflection`

```csharp
public readonly struct CustomAttributeNamedArgument : IEquatable<System.Reflection.CustomAttributeNamedArgument>
```

Represents a named argument of a custom attribute in the reflection-only context.

#### Remarks
Code that is being examined in the reflection-only context cannot be executed, so it is not always possible to examine custom attributes by creating instances of them and then examining their properties, using methods like `Attribute.GetCustomAttributes`, `MemberInfo.GetCustomAttributes`, and so on. If the code for the attribute type itself is loaded into the reflection-only context, it cannot be executed.

The `CustomAttributeNamedArgument` structure is used by the `CustomAttributeData` class to provide access to a named argument specified for a custom attribute instance, without executing the code of the corresponding property of the custom attribute type. The `TypedValue` property returns a `CustomAttributeTypedArgument` structure that contains the type and value of the named argument.

> **Important:**
>  Whether an argument is named or positional, you must access its type and value by using the `CustomAttributeTypedArgument` structure.

To create instances of the `CustomAttributeData` class, use the `static` `CustomAttributeData.GetCustomAttributes` factory method.

#### Examples
The following example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays information about the custom attributes that were applied to it and to the type and members it contains.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeNamedArgument.CustomAttributeNamedArgument(MemberInfo, Object) constructor

```csharp
public CustomAttributeNamedArgument (System.Reflection.MemberInfo memberInfo, object? value);
```

Initializes a new instance of the `CustomAttributeNamedArgument` class, which represents the specified field or property of the custom attribute, and specifies the value of the field or property.

Parameters:

- `memberInfo`: A field or property of the custom attribute. The new `CustomAttributeNamedArgument` object represents this member and its value.
- `value`: The value of the field or property of the custom attribute.

Exceptions:

- `ArgumentNullException`: `memberInfo` is `null`.
- `ArgumentException`: `memberInfo` is not a field or property of the custom attribute.

#### Remarks
This constructor is for use by inheritors of the `CustomAttributeNamedArgument` class. It is not intended for use in application code.

## CustomAttributeNamedArgument.CustomAttributeNamedArgument(MemberInfo, CustomAttributeTypedArgument) constructor

```csharp
public CustomAttributeNamedArgument (System.Reflection.MemberInfo memberInfo, System.Reflection.CustomAttributeTypedArgument typedArgument);
```

Initializes a new instance of the `CustomAttributeNamedArgument` class, which represents the specified field or property of the custom attribute, and specifies a `CustomAttributeTypedArgument` object that describes the type and value of the field or property.

Parameters:

- `memberInfo`: A field or property of the custom attribute. The new `CustomAttributeNamedArgument` object represents this member and its value.
- `typedArgument`: An object that describes the type and value of the field or property.

Exceptions:

- `ArgumentNullException`: `memberInfo` is `null`.

#### Remarks
This constructor is for use by inheritors of the `CustomAttributeNamedArgument` class. It is not intended for use in application code.

## CustomAttributeNamedArgument.IsField property

```csharp
public bool IsField { get; }
```

Gets a value that indicates whether the named argument is a field.

Returns: `true` if the named argument is a field; otherwise, `false`.

To be added.

## CustomAttributeNamedArgument.MemberInfo property

```csharp
public System.Reflection.MemberInfo MemberInfo { get; }
```

Gets the attribute member that would be used to set the named argument.

Returns: The attribute member that would be used to set the named argument.

#### Remarks
In most cases, the member is a property.

## CustomAttributeNamedArgument.MemberName property

```csharp
public string MemberName { get; }
```

Gets the name of the attribute member that would be used to set the named argument.

Returns: The name of the attribute member that would be used to set the named argument.

To be added.

## CustomAttributeNamedArgument.TypedValue property

```csharp
public System.Reflection.CustomAttributeTypedArgument TypedValue { get; }
```

Gets a `CustomAttributeTypedArgument` structure that can be used to obtain the type and value of the current named argument.

Returns: A structure that can be used to obtain the type and value of the current named argument.

#### Remarks
The `CustomAttributeNamedArgument` structure only contains information about how the argument value was set. Use this property to obtain a `CustomAttributeTypedArgument` structure that contains the type and value.

#### Examples
The following code example defines a custom attribute with four constructors and four properties. Two of the properties are read-only, and are set by using the positional parameters of the constructors. The other two properties are read/write, and can be set only by using named arguments. One positional property is an array of strings, and one named property is an array of integers.

The attribute is applied to the assembly, to a type declared in the assembly, to a method of the type, and to a parameter of the method. Different constructors are used for these cases. When executed, the assembly loads itself into the reflection-only context and displays the custom attributes.

The attribute that is applied to the type demonstrates array properties, with both positional and named arguments.

The `TypedValue` property is used in the `ShowAttributeData` method that displays custom attribute data, to obtain the types and values of named attributes.

_Code sample not included: ~/snippets/csharp/System.Reflection/CustomAttributeData/Overview/source.cs._

## CustomAttributeNamedArgument.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## CustomAttributeNamedArgument.Equals(CustomAttributeNamedArgument) method

```csharp
public bool Equals (System.Reflection.CustomAttributeNamedArgument other);
```

Indicates whether the current instance is equal to another instance of the same type.

Parameters:

- `other`: An instance to compare with this instance.

Returns: `true` if the current instance is equal to the other instance; otherwise, `false`.

To be added.

## CustomAttributeNamedArgument.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## CustomAttributeNamedArgument.op_Equality(CustomAttributeNamedArgument, CustomAttributeNamedArgument) method

```csharp
public static bool operator == (System.Reflection.CustomAttributeNamedArgument left, System.Reflection.CustomAttributeNamedArgument right);
```

Tests whether two `CustomAttributeNamedArgument` structures are equivalent.

Parameters:

- `left`: The structure to the left of the equality operator.
- `right`: The structure to the right of the equality operator.

Returns: `true` if the two `CustomAttributeNamedArgument` structures are equal; otherwise, `false`.

The equivalent method for this operator is `CustomAttributeNamedArgument.Equals`.

## CustomAttributeNamedArgument.op_Inequality(CustomAttributeNamedArgument, CustomAttributeNamedArgument) method

```csharp
public static bool operator != (System.Reflection.CustomAttributeNamedArgument left, System.Reflection.CustomAttributeNamedArgument right);
```

Tests whether two `CustomAttributeNamedArgument` structures are different.

Parameters:

- `left`: The structure to the left of the inequality operator.
- `right`: The structure to the right of the inequality operator.

Returns: `true` if the two `CustomAttributeNamedArgument` structures are different; otherwise, `false`.

The equivalent method for this operator is `CustomAttributeNamedArgument.Equals`.

## CustomAttributeNamedArgument.ToString() method

```csharp
public override string ToString ();
```

Returns a string that consists of the argument name, the equal sign, and a string representation of the argument value.

Returns: A string that consists of the argument name, the equal sign, and a string representation of the argument value.

To be added.
