---
title: "Enum class (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Enum.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Enum class (part 6 of 6)

## Enum.TryParse<TEnum>(String, Boolean, TEnum) method

```csharp
public static bool TryParse<TEnum> (string? value, bool ignoreCase, out TEnum result) where TEnum : struct;
```

Converts the string representation of the name or numeric value of one or more enumerated constants to an equivalent enumerated object. A parameter specifies whether the operation is case-sensitive. The return value indicates whether the conversion succeeded.

Parameters:

- `TEnum`: The enumeration type to which to convert `value`.
- `value`: The string representation of the enumeration name or underlying value to convert.
- `ignoreCase`: `true` to ignore case; `false` to consider case.
- `result`: When this method returns, contains an object of type `TEnum` whose value is represented by `value` if the parse operation succeeds. If the parse operation fails, contains the default value of the underlying type of `TEnum`. This parameter is passed uninitialized.

Returns: `true` if the `value` parameter was converted successfully; otherwise, `false`.

Exceptions:

- `ArgumentException`: `TEnum` is not an enumeration type.
- `InvalidOperationException`: .NET 8 and later versions: `TEnum` is a Boolean-backed enumeration type.

#### Remarks

`TryParse<T>` is identical to the `Parse` method, except that instead of throwing an exception, it returns `false` if the conversion fails. It eliminates the need for exception handling when parsing the string representation of an enumeration value.

The `value` parameter contains the string representation of an enumeration member's underlying value or named constant, or a list of named constants or underlying values delimited by commas (,). If `value` includes multiple named constants or values, one or more blank spaces can precede or follow each value, name, or comma in `value`. If `value` is a list, `result` reflects the value of the specified names or underlying values combined with a bitwise `OR` operation. If `value` is the string representation of the name of an enumeration value, the comparison of `value` with enumeration names depends on the `ignoreCase` parameter. If `true`, the comparison is case-insensitive; if `false`, it is case-sensitive.

If `value` is a name that does not correspond to a named constant of `TEnum`, the method returns `false`. If `value` is the string representation of an integer that does not represent an underlying value of the `TEnum` enumeration, the method returns an enumeration member whose underlying value is `value` converted to an integral type. If this behavior is undesirable, call the `Enum.IsDefined` method to ensure that a particular string representation of an integer is actually a member of `TEnum`.

If the parse operation fails, the `result` parameter contains the default value of 0, which may not be a member of the underlying `TEnum` enumeration. If no values are assigned to the named constants in `TEnum`, the default is equal to the first member of the `TEnum`. Otherwise, the default is equal to the member in the enumeration with an assigned value of 0.

#### Examples
The following example defines a `Colors` enumeration, calls the `TryParse<T>` method to convert strings to their corresponding enumeration values, and calls the `Enum.IsDefined` method to ensure that particular integral values are underlying values in the `Colors` enumeration. The `TryParse<T>` method uses case-insensitive comparison when trying to convert the string representations of named constants to their equivalent enumeration values.

_Code sample not included: ~/snippets/csharp/System/Enum/TryParseTEnum/tryparse2.cs._
