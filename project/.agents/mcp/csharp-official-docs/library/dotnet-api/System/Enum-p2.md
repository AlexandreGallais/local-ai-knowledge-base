---
title: "Enum class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Enum.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enum class (part 2 of 6)

## Enum.CompareTo(Object) method

```csharp
public int CompareTo (object? target);
```

Compares this instance to a specified object and returns an indication of their relative values.

Parameters:

- `target`: An object to compare, or `null`.

Returns: A signed number that indicates the relative values of this instance and `target`.

-  Less than zero

:  The value of this instance is less than the value of `target`.

-  Zero

:  The value of this instance is equal to the value of `target`.

-  Greater than zero

:  The value of this instance is greater than the value of `target`, or `target` is `null`.

Exceptions:

- `ArgumentException`: `target` and this instance are not the same type.
- `InvalidOperationException`: This instance is not type `SByte`, `Int16`, `Int32`, `Int64`, `Byte`, `UInt16`, `UInt32`, or `UInt64`.
- `NullReferenceException`: This instance is null.

#### Examples
The following example illustrates the use of `CompareTo` in the context of `Enum`.

_Code sample not included: ~/snippets/csharp/System/Enum/CompareTo/EnumCompareTo.cs._

## Enum.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether this instance is equal to a specified object.

Parameters:

- `obj`: An object to compare with this instance, or `null`.

Returns: `true` if `obj` is an enumeration value of the same type and with the same underlying value as this instance; otherwise, `false`.

#### Remarks
The `Equals` method overrides `Equals` to define how enumeration members are evaluated for equality.

#### Examples
The following example illustrates the use of the `Enum.Equals` method.

_Code sample not included: ~/snippets/csharp/System/Enum/Equals/EnumEquals.cs._

The following example defines two enumeration types, `SledDog` and `WorkDog`. The `SledDog` enumeration has two members, `SledDog.AlaskanMalamute` and `SledDog.Malamute`, that have the same underlying value. The call to the `Enum.Equals` method indicates that these values are equal because their underlying values are the same. The `SledDog.Malamute` and `WorkDog.Newfoundland` members have the same underlying value, although they represent different enumeration types. A call to the `Enum.Equals` method indicates that these values are not equal.

_Code sample not included: ~/snippets/csharp/System/Enum/Equals/enumequals1.cs._

## Enum.Format(Type, Object, String) method

```csharp
public static string Format (Type enumType, object value, string format);
```

Converts the specified value of a specified enumerated type to its equivalent string representation according to the specified format.

Parameters:

- `enumType`: The enumeration type of the value to convert.
- `value`: The value to convert.
- `format`: The output format to use.

Returns: A string representation of `value`.

Exceptions:

- `ArgumentNullException`: The `enumType`, `value`, or `format` parameter is `null`.
- `ArgumentException`: The `enumType` parameter is not an `Enum` type.

-or-

The `value` is from an enumeration that differs in type from `enumType`.

-or-

The type of `value` is not an underlying type of `enumType`.
- `FormatException`: The `format` parameter contains an invalid value.
- `InvalidOperationException`: `format` equals "X", but the enumeration type is unknown.

-or-

.NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The following table shows the valid values for the `format` parameter.

|Format|Description|
|------------|-----------------|
|"G" or "g"|If `value` is equal to a named enumerated constant, the name of that constant is returned; otherwise, the decimal equivalent of `value` is returned. For example, suppose the only enumerated constant is named Red, and its value is 1. If `value` is specified as 1, this format returns "Red". However, if `value` is specified as 2, this format returns "2". -or- If the `FlagsAttribute` custom attribute is applied to the enumeration, `value` is treated as a bit field that contains one or more flags that consist of one or more bits. If `value` is equal to a combination of named enumerated constants, a delimiter-separated list of the names of those constants is returned. `value` is searched for flags, going from the flag with the largest value to the smallest value. For each flag that corresponds to a bit field in `value`, the name of the constant is concatenated to the delimiter-separated list. The value of that flag is then excluded from further consideration, and the search continues for the next flag. If `value` is not equal to a combination of named enumerated constants, the decimal equivalent of `value` is returned.|
|"X" or "x"|Represents `value` in hexadecimal format without a leading "0x".|
|"D" or "d"|Represents `value` in decimal form.|
|"F" or "f"|Behaves identically to "G" or "g", except that the `FlagsAttribute` is not required to be present on the `Enum` declaration.|

#### Examples
The following example illustrates the use of `Format` in the context of `Enum`.

_Code sample not included: ~/snippets/csharp/System/Enum/Format/EnumFormat.cs._

## Enum.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for the value of this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## Enum.GetName(Type, Object) method

```csharp
public static string? GetName (Type enumType, object value);
```

Retrieves the name of the constant in the specified enumeration that has the specified value.

Parameters:

- `enumType`: An enumeration type.
- `value`: The value of a particular enumerated constant in terms of its underlying type.

Returns: A string containing the name of the enumerated constant in `enumType` whose value is `value`; or `null` if no such constant is found.

Exceptions:

- `ArgumentNullException`: `enumType` or `value` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.

-or-

`value` is neither of type `enumType` nor does it have the same underlying type as `enumType`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
If multiple enumeration members have the same underlying value, the `Enum.GetName` method guarantees that it will return the name of one of those enumeration members. However, it does not guarantee that it will always return the name of the same enumeration member. As a result, when multiple enumeration members have the same value, your application code should never depend on the method returning a particular member's name.

#### Examples
The following example illustrates the use of `GetName`.

_Code sample not included: ~/snippets/csharp/System/Enum/GetName/EnumGetName.cs._

## Enum.GetName<TEnum>(TEnum) method

```csharp
public static string? GetName<TEnum> (TEnum value) where TEnum : struct;
```

Retrieves the name of the constant in the specified enumeration type that has the specified value.

Parameters:

- `TEnum`: The type of the enumeration.
- `value`: The value of a particular enumerated constant in terms of its underlying type.

Returns: A string containing the name of the enumerated constant in `TEnum` whose value is `value`; or `null` if no such constant is found.

Exceptions:

- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

## Enum.GetNames(Type) method

```csharp
public static string[] GetNames (Type enumType);
```

Retrieves an array of the names of the constants in a specified enumeration.

Parameters:

- `enumType`: An enumeration type.

Returns: A string array of the names of the constants in `enumType`.

Exceptions:

- `ArgumentNullException`: `enumType` is `null`.
- `ArgumentException`: `enumType` parameter is not an `Enum`.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The elements of the return value array are sorted by the binary values of the enumerated constants (that is, by their unsigned magnitude). The following example provides displays information about the array returned by the `Enum.GetNames` method for an enumeration that includes a negative, zero, and a positive value.

_Code sample not included: ~/snippets/csharp/System/Enum/GetNames/getnames1.cs._

If there are enumerated constants with same value, the order of their corresponding names is unspecified.

#### Examples
The following example illustrates the use of the `Enum.GetNames` method.

_Code sample not included: ~/snippets/csharp/System/Enum/GetNames/EnumGetNames.cs._

## Enum.GetNames<TEnum>() method

```csharp
public static string[] GetNames<TEnum> () where TEnum : struct;
```

Retrieves an array of the names of the constants in a specified enumeration type.

Parameters:

- `TEnum`: The type of the enumeration.

Returns: A string array of the names of the constants in `TEnum`.

Exceptions:

- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

## Enum.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the type code of the underlying type of this enumeration member.

Returns: The type code of the underlying type of this instance.

Exceptions:

- `InvalidOperationException`: The enumeration type is unknown.

To be added.

## Enum.GetUnderlyingType(Type) method

```csharp
public static Type GetUnderlyingType (Type enumType);
```

Returns the underlying type of the specified enumeration.

Parameters:

- `enumType`: The enumeration whose underlying type will be retrieved.

Returns: The underlying type of `enumType`.

Exceptions:

- `ArgumentNullException`: `enumType` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.

#### Remarks
The `Enum` structure enables values to be represented as named constants. The data type of the enumeration's values is known as its underlying type. For example, the underlying type of the `DayOfWeek` enumeration, which consists of constants that represent each day of the week (`Monday`, `Tuesday`, and so on), is `Int32`.

#### Examples
The following example calls the `Enum.GetUnderlyingType` method to display the underlying type of some enumeration members.

_Code sample not included: ~/snippets/csharp/System/Enum/GetUnderlyingType/getunderlyingtype1.cs._

## Enum.GetValues(Type) method

```csharp
public static Array GetValues (Type enumType);
```

Retrieves an array of the values of the constants in a specified enumeration.

Parameters:

- `enumType`: An enumeration type.

Returns: An array that contains the values of the constants in `enumType`.

Exceptions:

- `ArgumentNullException`: `enumType` is `null`.
- `ArgumentException`: `enumType` is not an `Enum`.
- `InvalidOperationException`: The method is invoked by reflection in a reflection-only context,

-or-

`enumType` is a type from an assembly loaded in a reflection-only context.
- `InvalidOperationException`: .NET 8 and later versions: `enumType` is a Boolean-backed enumeration type.

#### Remarks
The elements of the array are sorted by the binary values of the enumeration constants (that is, by their unsigned magnitude). The following example displays information about the array returned by the `Enum.GetValues` method for an enumeration that includes a negative value, zero, and a positive value.

_Code sample not included: ~/snippets/csharp/System/Enum/GetValues/getvalues1.cs._

The `Enum.GetValues` method returns an array that contains a value for each member of the `enumType` enumeration. If multiple members have the same value, the returned array includes duplicate values. In this case, calling the `Enum.GetName` method with each value in the returned array does not restore the unique names assigned to members that have duplicate values. To retrieve all the names of enumeration members successfully, call the `Enum.GetNames` method.

The `Enum.GetValues` method cannot be invoked by using reflection in a reflection-only context. Instead, you can retrieve the value of all enumeration members by using the `Type.GetFields` method to get an array of `FieldInfo` objects that represent enumeration members and then call the `FieldInfo.GetRawConstantValue` method on each element of the array. The following example illustrates this technique. It requires that you define the following enumeration in an assembly named Enumerations.dll:

_Code sample not included: ~/snippets/csharp/System/Enum/GetValues/getvalues_reflectiononly.cs._

The assembly is loaded in a reflection-only context, a `Type` object that represents the `Pets` enumeration is instantiated, an array of `FieldInfo` objects is retrieved, and the field values are displayed to the console.

_Code sample not included: ~/snippets/csharp/System/Enum/GetValues/getvalues_reflectiononly.cs._

#### Examples
The following example illustrates the use of `Enum.GetValues`.

_Code sample not included: ~/snippets/csharp/System/Enum/GetValues/EnumGetValues.cs._

## Enum.GetValues<TEnum>() method

```csharp
public static TEnum[] GetValues<TEnum> () where TEnum : struct;
```

Retrieves an array of the values of the constants in a specified enumeration type.

Parameters:

- `TEnum`: The type of the enumeration.

Returns: An array that contains the values of the constants in `TEnum`.

Exceptions:

- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

To be added.

## Enum.GetValuesAsUnderlyingType(Type) method

```csharp
public static Array GetValuesAsUnderlyingType (Type enumType);
```

Retrieves an array of the values of the underlying type constants in a specified enumeration.

Parameters:

- `enumType`: An enumeration type.

Returns: An array that contains the values of the underlying type constants in  `enumType`.

Exceptions:

- `ArgumentNullException`: `enumType` is null.
- `ArgumentException`: `enumType` is not an enumeration type.

You can use this method to get enumeration values when it's hard to create an array of the enumeration type.
For example, you might use this method for the `MetadataLoadContext` enumeration or on a platform where run-time code generation is not available.

## Enum.GetValuesAsUnderlyingType<TEnum>() method

```csharp
public static Array GetValuesAsUnderlyingType<TEnum> () where TEnum : struct;
```

Retrieves an array of the values of the underlying type constants in a specified enumeration type.

Parameters:

- `TEnum`: An enumeration type.

Returns: An array that contains the values of the underlying type constants in `TEnum`.

You can use this method to get enumeration values when it's hard to create an array of the enumeration type.
For example, you might use this method for the `MetadataLoadContext` enumeration or on a platform where run-time code generation is not available.
