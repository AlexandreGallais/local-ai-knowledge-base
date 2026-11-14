---
title: "Enum class (part 3 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Enum.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enum class (part 3 of 6)

## Enum.HasFlag(Enum) method

```csharp
public bool HasFlag (Enum flag);
```

Determines whether one or more bit fields are set in the current instance.

Parameters:

- `flag`: An enumeration value.

Returns: `true` if the bit field or bit fields that are set in `flag` are also set in the current instance; otherwise, `false`.

Exceptions:

- `ArgumentException`: `flag` is a different type than the current instance.

#### Remarks
The `Enum.HasFlag` method returns the result of the following Boolean expression.

```csharp
(thisInstance & flag) == flag
```

If the underlying value of `flag` is zero, the method returns `true`. If this behavior is not desirable, you can use the `Enum.Equals` method to test for equality with zero and call `Enum.HasFlag` only if the underlying value of `flag` is non-zero, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System/Enum/HasFlag/hasflag0.cs._

The `Enum.HasFlag` method is designed to be used with enumeration types that are marked with the `FlagsAttribute` attribute and can be used to determine whether multiple bit fields are set. For enumeration types that are not marked with the `FlagsAttribute` attribute, call either the `Enum.Equals` method or the `Enum.CompareTo` method.

#### Examples
The following example defines an `DinnerItems` enumeration that reflects categories of items that a customer can order in a restaurant. The example tests whether the customer has ordered both an entrée and a beverage.

_Code sample not included: ~/snippets/csharp/System/Enum/HasFlag/hasflag1.cs._

## Enum.IsDefined(Type, Object) method

```csharp
public static bool IsDefined (Type enumType, object value);
```

Returns a Boolean telling whether a given integral value, or its name as a string, exists in a specified enumeration.

Parameters:

- `enumType`: An enumeration type.
- `value`: The value or name of a constant in `enumType`.

Returns: `true` if a constant in `enumType` has a value equal to `value`; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: `enumType` or `value` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.

-or-

The type of `value` is an enumeration, but it is not an enumeration of type `enumType`.

-or-

The type of `value` is not an underlying type of `enumType`.
- `InvalidOperationException`: `value` is not type `SByte`, `Int16`, `Int32`, `Int64`, `Byte`, `UInt16`, `UInt32`, or `UInt64`, or `String`.

#### Remarks
The `value` parameter can be any of the following:

- Any member of type `enumType`.

- A variable whose value is an enumeration member of type `enumType`.

- The string representation of the name of an enumeration member. The characters in the string must have the same case as the enumeration member name.

- A value of the underlying type of `enumType`.

If the constants in `enumType` define a set of bit fields and `value` contains the values, names, or underlying values of multiple bit fields, the `Enum.IsDefined` method returns `false`. In other words, for enumerations that define a set of bit fields, the method determines only whether a single bit field belongs to the enumeration. To determine whether multiple bit fields are set in an enumeration type that is tagged with the `FlagsAttribute` attribute, you can call the `Enum.HasFlag` method.

#### Examples
The following example defines an enumeration named `PetType` that consists of individual bit fields. It then calls the `Enum.IsDefined` method with possible underlying enumeration values, string names, and composite values that result from setting multiple bit fields.

_Code sample not included: ~/snippets/csharp/System/Enum/IsDefined/isdefined1.cs._

## Enum.IsDefined<TEnum>(TEnum) method

```csharp
public static bool IsDefined<TEnum> (TEnum value) where TEnum : struct;
```

Returns a boolean telling whether a given integral value, or its name as a string, exists in a specified enumeration.

Parameters:

- `TEnum`: The type of the enumeration.
- `value`: The value or name of a constant in `TEnum`.

Returns: `true` if a given integral value, or its name as a string, exists in a specified enumeration; `false` otherwise.

To be added.

## Enum.Parse(Type, Char>) method

```csharp
public static object Parse (Type enumType, ReadOnlySpan<char> value);
```

Converts the span of characters representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.

Parameters:

- `enumType`: An enumeration type.
- `value`: A span containing the name or value to convert.

Returns: An object of type `enumType` whose value is represented by `value`.

Exceptions:

- `ArgumentNullException`: `enumType` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.
- `ArgumentException`: `value` is either an empty string or only contains white space.
- `ArgumentException`: `value` is a name, but not one of the named constants defined for the enumeration.
- `OverflowException`: `value` is outside the range of the underlying type of `enumType`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

To be added.

## Enum.Parse(Type, String) method

```csharp
public static object Parse (Type enumType, string value);
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object.

Parameters:

- `enumType`: An enumeration type.
- `value`: A string containing the name or value to convert.

Returns: An object of type `enumType` whose value is represented by `value`.

Exceptions:

- `ArgumentNullException`: `enumType` or `value` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.

-or-

`value` is either an empty string or only contains white space.

-or-

`value` is a name, but not one of the named constants defined for the enumeration.
- `OverflowException`: `value` is outside the range of the underlying type of `enumType`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The `value` parameter contains the string representation of an enumeration member's underlying value or named constant, or a list of named constants delimited by commas (,). One or more blank spaces can precede or follow each value, name, or comma in `value`. If `value` is a list, the return value is the value of the specified names combined with a bitwise `OR` operation.

If `value` is a name that does not correspond to a named constant of `enumType`, the method throws an `ArgumentException`. If `value` is the string representation of an integer that does not represent an underlying value of the `enumType` enumeration, the method returns an enumeration member whose underlying value is `value` converted to an integral type. If this behavior is undesirable, call the `Enum.IsDefined` method to ensure that a particular string representation of an integer is actually a member of `enumType`. The following example defines a `Colors` enumeration, calls the `Parse` method to convert strings to their corresponding enumeration values, and calls the `Enum.IsDefined` method to ensure that particular integral values are underlying values in the `Colors` enumeration.

_Code sample not included: ~/snippets/csharp/System/Enum/Parse/ParseExample1.cs._

This operation is case-sensitive.

#### Examples
The following example uses the `Parse` method to parse an array of strings that are created by calling the `Enum.GetNames` method. It also uses the `Parse` method to parse an enumeration value that consists of a bit field.

_Code sample not included: ~/snippets/csharp/System/Enum/Parse/EnumParse.cs._

## Enum.Parse(Type, Char>, Boolean) method

```csharp
public static object Parse (Type enumType, ReadOnlySpan<char> value, bool ignoreCase);
```

Converts the span of characters representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object. A parameter specifies whether the operation is case-insensitive.

Parameters:

- `enumType`: An enumeration type.
- `value`: A span containing the name or value to convert.
- `ignoreCase`: `true` to ignore case; `false` to regard case.

Returns: An object of type `enumType` whose value is represented by `value`.

Exceptions:

- `ArgumentNullException`: `enumType` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.
- `ArgumentException`: `value` is either an empty string or only contains white space.
- `ArgumentException`: `value` is a name, but not one of the named constants defined for the enumeration.
- `OverflowException`: `value` is outside the range of the underlying type of `enumType`
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

To be added.

## Enum.Parse(Type, String, Boolean) method

```csharp
public static object Parse (Type enumType, string value, bool ignoreCase);
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object. A parameter specifies whether the operation is case-insensitive.

Parameters:

- `enumType`: An enumeration type.
- `value`: A string containing the name or value to convert.
- `ignoreCase`: `true` to ignore case; `false` to regard case.

Returns: An object of type `enumType` whose value is represented by `value`.

Exceptions:

- `ArgumentNullException`: `enumType` or `value` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.

-or-

`value` is either an empty string ("") or only contains white space.

-or-

`value` is a name, but not one of the named constants defined for the enumeration.
- `OverflowException`: `value` is outside the range of the underlying type of `enumType`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The `value` parameter contains the string representation of an enumeration member's underlying value or named constant, or a list of named constants delimited by commas (,). One or more blank spaces can precede or follow each value, name, or comma in `value`. If `value` is a list, the return value is the value of the specified names combined with a bitwise `OR` operation.

If `value` is a name that does not correspond to a named constant of `enumType`, the method throws an `ArgumentException`. If `value` is the string representation of an integer that does not represent an underlying value of the `enumType` enumeration, the method returns an enumeration member whose underlying value is `value` converted to an integral type. If this behavior is undesirable, call the `Enum.IsDefined` method to ensure that a particular string representation of an integer is actually a member of `enumType`. The following example defines a `Colors` enumeration, calls the `Parse` method to convert strings to their corresponding enumeration values, and calls the `Enum.IsDefined` method to ensure that particular integral values are underlying values in the `Colors` enumeration.

The `ignoreCase` parameter specifies whether this operation is case-sensitive.

#### Examples
The following example uses the `Parse` method to parse an array of strings that are created by calling the `Enum.GetNames` method. It also uses the `Parse` method to parse an enumeration value that consists of a bit field.

_Code sample not included: ~/snippets/csharp/System/Enum/Parse/ParseExample2.cs._

## Enum.Parse<TEnum>(Char>) method

```csharp
public static TEnum Parse<TEnum> (ReadOnlySpan<char> value) where TEnum : struct;
```

Converts the span of characters representation of the name or numeric value of one or more enumerated constants specified by `TEnum` to an equivalent enumerated object.

Parameters:

- `TEnum`: An enumeration type.
- `value`: A span containing the name or value to convert.

Returns: `TEnum` An object of type `TEnum` whose value is represented by `value`.

Exceptions:

- `ArgumentException`: `TEnum` is not an `Enum` type.
- `ArgumentException`: `value` does not contain enumeration information.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

## Enum.Parse<TEnum>(String) method

```csharp
public static TEnum Parse<TEnum> (string value) where TEnum : struct;
```

Converts the string representation of the name or numeric value of one or more enumerated constants specified by `TEnum` to an equivalent enumerated object.

Parameters:

- `TEnum`: An enumeration type.
- `value`: A string containing the name or value to convert.

Returns: An object of type `TEnum` whose value is represented by `value`.

Exceptions:

- `ArgumentException`: `TEnum` is not an `Enum` type.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` does not contain enumeration information.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

## Enum.Parse<TEnum>(Char>, Boolean) method

```csharp
public static TEnum Parse<TEnum> (ReadOnlySpan<char> value, bool ignoreCase) where TEnum : struct;
```

Converts the span of characters representation of the name or numeric value of one or more enumerated constants specified by `TEnum` to an equivalent enumerated object. A parameter specifies whether the operation is case-insensitive.

Parameters:

- `TEnum`: An enumeration type.
- `value`: A span containing the name or value to convert.
- `ignoreCase`: `true` to ignore case; `false` to regard case.

Returns: `TEnum` An object of type `TEnum` whose value is represented by `value`.

Exceptions:

- `ArgumentException`: `TEnum` is not an `Enum` type.
- `ArgumentException`: `value` does not contain enumeration information.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

## Enum.Parse<TEnum>(String, Boolean) method

```csharp
public static TEnum Parse<TEnum> (string value, bool ignoreCase) where TEnum : struct;
```

Converts the string representation of the name or numeric value of one or more enumerated constants specified by `TEnum` to an equivalent enumerated object. A parameter specifies whether the operation is case-insensitive.

Parameters:

- `TEnum`: An enumeration type.
- `value`: A string containing the name or value to convert.
- `ignoreCase`: `true` to ignore case; `false` to regard case.

Returns: An object of type `TEnum` whose value is represented by `value`.

Exceptions:

- `ArgumentException`: `TEnum` is not an `Enum` type.
- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` does not contain enumeration information.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.
