---
title: "NumberFormatInfo class (part 4 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/NumberFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NumberFormatInfo class (part 4 of 5)

## NumberFormatInfo.NegativeSign property

```csharp
public string NegativeSign { get; set; }
```

Gets or sets the string that denotes that the associated number is negative.

Returns: The string that denotes that the associated number is negative. The default for `NumberFormatInfo.InvariantInfo` is "-".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
This property is used in both formatting and parsing operations. For more information on its use in formatting operations, see the Standard Numeric Format Strings and Custom Numeric Format Strings topics.

#### Examples
The following example instantiates a read-write `CultureInfo` object that represents the invariant culture and assigns the OVERLINE character (U+203E) to its `NegativeSign` property. It then uses this `CultureInfo` object to format an array of negative floating-point numbers.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NegativeSign/negativesign1.cs._

## NumberFormatInfo.NumberDecimalDigits property

```csharp
public int NumberDecimalDigits { get; set; }
```

Gets or sets the number of decimal places to use in numeric values.

Returns: The number of decimal places to use in numeric values. The default for `NumberFormatInfo.InvariantInfo` is 2.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is less than 0 or greater than 99.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `NumberDecimalDigits` property is used with the "F" and "N" standard format strings without a precision specifier in numeric formatting operations. It defines the default number of fractional digits that appear after the decimal separator. This value is overridden if a precision specifier is used. For more information, see Standard Numeric Format Strings.

#### Examples
The following example demonstrates the effect of changing the `NumberDecimalDigits` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NumberDecimalDigits/numberdecimaldigits.cs._

## NumberFormatInfo.NumberDecimalSeparator property

```csharp
public string NumberDecimalSeparator { get; set; }
```

Gets or sets the string to use as the decimal separator in numeric values.

Returns: The string to use as the decimal separator in numeric values. The default for `NumberFormatInfo.InvariantInfo` is ".".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.
- `ArgumentException`: The property is being set to an empty string.

#### Remarks
The `NumberDecimalSeparator` property is used with the "E", "F", "G", "N", and "R" standard format strings to define the symbol that separates integral from fractional digits. For more information, see Standard Numeric Format Strings.

On Windows, the initial value of this property is derived from the settings in the **Region and Language** item in Control Panel.

#### Examples
The following example demonstrates the effect of changing the `NumberDecimalSeparator` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NumberDecimalSeparator/numberdecimalseparator.cs._

## NumberFormatInfo.NumberGroupSeparator property

```csharp
public string NumberGroupSeparator { get; set; }
```

Gets or sets the string that separates groups of digits to the left of the decimal in numeric values.

Returns: The string that separates groups of digits to the left of the decimal in numeric values. The default for `NumberFormatInfo.InvariantInfo` is ",".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `NumberGroupSeparator` property is used with the "N" standard format string to define the symbol that separates groups of integral digits. For more information, see Standard Numeric Format Strings.

On Windows, the initial value of this property is derived from the settings in the **Region and Language** item in Control Panel.

#### Examples
The following example demonstrates the effect of changing the `NumberGroupSeparator` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NumberGroupSeparator/numbergroupseparator.cs._

## NumberFormatInfo.NumberGroupSizes property

```csharp
public int[] NumberGroupSizes { get; set; }
```

Gets or sets the number of digits in each group to the left of the decimal in numeric values.

Returns: The number of digits in each group to the left of the decimal in numeric values. The default for `NumberFormatInfo.InvariantInfo` is a one-dimensional array with only one element, which is set to 3.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentException`: The property is being set and the array contains an entry that is less than 0 or greater than 9.

-or-

The property is being set and the array contains an entry, other than the last entry, that is set to 0.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The value of the `NumberGroupSizes` property affects the result of number values that are formatted by using the "N" . If a custom numeric format string or other standard numeric format strings are used, the value of the `NumberGroupSizes` property is ignored.

Every element in the one-dimensional array must be an integer from 1 through 9. The last element can be 0.

The first element of the array defines the number of elements in the least significant group of digits immediately to the left of the `NumberFormatInfo.NumberDecimalSeparator`. Each subsequent element refers to the next significant group of digits to the left of the previous group. If the last element of the array is not 0, the remaining digits are grouped based on the last element of the array. If the last element is 0, the remaining digits are not grouped.

For example, if the array contains { 3, 4, 5 }, the digits are grouped similar to "55,55555,55555,55555,4444,333.00". If the array contains { 3, 4, 0 }, the digits are grouped similar to "55555555555555555,4444,333.00".

#### Examples
The following example demonstrates the effect of changing the `NumberGroupSizes` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NumberGroupSizes/numbergroupsizes.cs._

The following example prints a value using different `NumberFormatInfo.NumberGroupSizes` arrays.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NumberGroupSizes/source.cs._

## NumberFormatInfo.NumberNegativePattern property

```csharp
public int NumberNegativePattern { get; set; }
```

Gets or sets the format pattern for negative numeric values.

Returns: The format pattern for negative numeric values.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is less than 0 or greater than 4.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `NumberNegativePattern` property defines the format of negative values formatted with the "N" standard numeric format string. This property has one of the values in the following table. The symbol "-" is the `NumberFormatInfo.NegativeSign` and `n` is a number.

| Value | Associated pattern |
|-------|--------------------|
| 0     | (n)                |
| 1     | -n                 |
| 2     | - n                |
| 3     | n-                 |
| 4     | n -                |

The default value for the invariant culture returned by the `InvariantInfo` property is 1, which represents "-n", where *n* is a number.

#### Examples
The following example displays a value using different `NumberFormatInfo.NumberNegativePattern` patterns.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NumberNegativePattern/source.cs._

## NumberFormatInfo.PercentDecimalDigits property

```csharp
public int PercentDecimalDigits { get; set; }
```

Gets or sets the number of decimal places to use in percent values.

Returns: The number of decimal places to use in percent values. The default for `NumberFormatInfo.InvariantInfo` is 2.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is less than 0 or greater than 99.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `PercentDecimalDigits` property is used with the "P" standard format string without a precision specifier in numeric formatting operations. It defines the default number of fractional digits that appear after the decimal separator. This value is overridden if a precision specifier is used. For more information, see Standard Numeric Format Strings.

#### Examples
The following example demonstrates the effect of changing the `PercentDecimalDigits` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/PercentDecimalDigits/percentdecimaldigits.cs._

## NumberFormatInfo.PercentDecimalSeparator property

```csharp
public string PercentDecimalSeparator { get; set; }
```

Gets or sets the string to use as the decimal separator in percent values.

Returns: The string to use as the decimal separator in percent values. The default for `NumberFormatInfo.InvariantInfo` is ".".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.
- `ArgumentException`: The property is being set to an empty string.

#### Remarks
The `PercentDecimalSeparator` property is used with the "P" standard format string to define the symbol that separates integral from fractional digits. For more information, see Standard Numeric Format Strings.

#### Examples
The following example demonstrates the effect of changing the `PercentDecimalSeparator` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/PercentDecimalSeparator/percentdecimalseparator.cs._

## NumberFormatInfo.PercentGroupSeparator property

```csharp
public string PercentGroupSeparator { get; set; }
```

Gets or sets the string that separates groups of digits to the left of the decimal in percent values.

Returns: The string that separates groups of digits to the left of the decimal in percent values. The default for `NumberFormatInfo.InvariantInfo` is ",".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `PercentGroupSeparator` property is used with the "P" standard format string to define the symbol that separates groups of integers. For more information, see Standard Numeric Format Strings.

#### Examples
The following example demonstrates the effect of changing the `PercentGroupSeparator` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/PercentGroupSeparator/percentgroupseparator.cs._

## NumberFormatInfo.PercentGroupSizes property

```csharp
public int[] PercentGroupSizes { get; set; }
```

Gets or sets the number of digits in each group to the left of the decimal in percent values.

Returns: The number of digits in each group to the left of the decimal in percent values. The default for `NumberFormatInfo.InvariantInfo` is a one-dimensional array with only one element, which is set to 3.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentException`: The property is being set and the array contains an entry that is less than 0 or greater than 9.

-or-

The property is being set and the array contains an entry, other than the last entry, that is set to 0.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `PercentGroupSizes` property is used with the "P" standard format string to define the number of digits that appear in integral groups. For more information, see Standard Numeric Format Strings. Every element in the one-dimensional array must be an integer from 1 through 9. The last element can be 0.

The first element of the array defines the number of elements in the least significant group of digits immediately to the left of the `NumberFormatInfo.PercentDecimalSeparator`. Each subsequent element refers to the next significant group of digits to the left of the previous group. If the last element of the array is not 0, the remaining digits are grouped based on the last element of the array. If the last element is 0, the remaining digits are not grouped.

For example, if the array contains { 3, 4, 5 }, the digits are grouped similar to "55,55555,55555,55555,4444,333.00%". If the array contains { 3, 4, 0 }, the digits are grouped similar to "55555555555555555,4444,333.00%".

#### Examples
The following example demonstrates the effect of changing the `PercentGroupSizes` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/PercentGroupSizes/percentgroupsizes.cs._

## NumberFormatInfo.PercentNegativePattern property

```csharp
public int PercentNegativePattern { get; set; }
```

Gets or sets the format pattern for negative percent values.

Returns: The format pattern for negative percent values. The default for `NumberFormatInfo.InvariantInfo` is 0, which represents "-n %", where "%" is the `NumberFormatInfo.PercentSymbol` and "n" is a number.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is less than 0 or greater than 11.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `PercentNegativePattern` property is used with the "P" standard format string to define the pattern of negative percentage values. For more information, see Standard Numeric Format Strings. This property has one of the values in the following table. The symbol "%" is the `NumberFormatInfo.PercentSymbol`, the symbol "-" is the `NumberFormatInfo.NegativeSign`, and `n` is a number.

| Value | Associated pattern |
|-------|--------------------|
| 0     | -n %               |
| 1     | -n%                |
| 2     | -%n                |
| 3     | %-n                |
| 4     | %n-                |
| 5     | n-%                |
| 6     | n%-                |
| 7     | -% n               |
| 8     | n %-               |
| 9     | % n-               |
| 10    | % -n               |
| 11    | n- %               |
