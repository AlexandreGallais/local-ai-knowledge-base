---
title: "NumberFormatInfo class (part 3 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/NumberFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NumberFormatInfo class (part 3 of 5)

## NumberFormatInfo.CurrencyDecimalSeparator property

```csharp
public string CurrencyDecimalSeparator { get; set; }
```

Gets or sets the string to use as the decimal separator in currency values.

Returns: The string to use as the decimal separator in currency values. The default for `NumberFormatInfo.InvariantInfo` is ".".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.
- `ArgumentException`: The property is being set to an empty string.

#### Remarks
On Windows, the initial value of this property is derived from the settings in the **Region and Language** item in Control Panel.

The `CurrencyDecimalSeparator` property is used with the "C" standard format string to define the symbol that separates integral from fractional digits. For more information, see Standard Numeric Format Strings.

#### Examples
The following example demonstrates the effect of changing the `CurrencyDecimalSeparator` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/CurrencyDecimalSeparator/currencydecimalseparator.cs._

## NumberFormatInfo.CurrencyGroupSeparator property

```csharp
public string CurrencyGroupSeparator { get; set; }
```

Gets or sets the string that separates groups of digits to the left of the decimal in currency values.

Returns: The string that separates groups of digits to the left of the decimal in currency values. The default for `NumberFormatInfo.InvariantInfo` is ",".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
On Windows, the initial value of this property is derived from the settings in the **Regional and Language** item in Control Panel.

The `CurrencyGroupSeparator` property is used with the "C" standard format string to define the symbol that separates groups of integral digits. For more information, see Standard Numeric Format Strings.

#### Examples
The following example demonstrates the effect of changing the `CurrencyGroupSeparator` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/CurrencyGroupSeparator/currencygroupseparator.cs._

## NumberFormatInfo.CurrencyGroupSizes property

```csharp
public int[] CurrencyGroupSizes { get; set; }
```

Gets or sets the number of digits in each group to the left of the decimal in currency values.

Returns: The number of digits in each group to the left of the decimal in currency values. The default for `NumberFormatInfo.InvariantInfo` is a one-dimensional array with only one element, which is set to 3.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentException`: The property is being set and the array contains an entry that is less than 0 or greater than 9.

-or-

The property is being set and the array contains an entry, other than the last entry, that is set to 0.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `CurrencyGroupSizes` property is used with the "C" standard format string to define the number of digits that appear in integral groups. For more information, see Standard Numeric Format Strings. Every element in the one-dimensional array must be an integer from 1 through 9. The last element can be 0.

The first element of the array defines the number of elements in the least significant group of digits immediately to the left of the `NumberFormatInfo.CurrencyDecimalSeparator`. Each subsequent element refers to the next significant group of digits to the left of the previous group. If the last element of the array is not 0, the remaining digits are grouped based on the last element of the array. If the last element is 0, the remaining digits are not grouped.

For example, if the array contains { 3, 4, 5 }, the digits are grouped similar to "\\$55,55555,55555,55555,4444,333.00". If the array contains { 3, 4, 0 }, the digits are grouped similar to "\\$55555555555555555,4444,333.00".

#### Examples
The following example demonstrates the effect of changing the `CurrencyGroupSizes` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/CurrencyGroupSizes/currencygroupsizes.cs._

## NumberFormatInfo.CurrencyNegativePattern property

```csharp
public int CurrencyNegativePattern { get; set; }
```

Gets or sets the format pattern for negative currency values.

Returns: The format pattern for negative currency values. The default for `NumberFormatInfo.InvariantInfo` is 0, which represents "(\\$n)", where "\\$" is the `NumberFormatInfo.CurrencySymbol` and "n" is a number.

Exceptions:

- `ArgumentOutOfRangeException`: The property is set to a value that's less than 0 or greater than 16.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `CurrencyNegativePattern` property is used with the "C" standard format string to define the pattern of negative currency values. For more information, see Standard Numeric Format Strings. This property has one of the values in the following table. The symbol "$" is the `NumberFormatInfo.CurrencySymbol`, the symbol "-" is the `NumberFormatInfo.NegativeSign`, and `n` is a number.

| Value | Associated pattern |
|-------|--------------------|
| 0     | ($n)               |
| 1     | -$n                |
| 2     | $-n                |
| 3     | $n-                |
| 4     | (n$)               |
| 5     | -n$                |
| 6     | n-$                |
| 7     | n$-                |
| 8     | -n $               |
| 9     | -$ n               |
| 10    | n $-               |
| 11    | $ n-               |
| 12    | $ -n               |
| 13    | n- $               |
| 14    | ($ n)              |
| 15    | (n $)              |
| 16    | $- n               |

#### Examples
The following example shows how the `CurrencyNegativePattern` property defines the format of negative currency values.  It retrieves all the specific cultures that are defined on the host computer and displays each culture's `CurrencyNegativePattern` property value, its associated pattern, and a number formatted as a currency value.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/CurrencyNegativePattern/currencynegativepattern1.cs._

## NumberFormatInfo.CurrencyPositivePattern property

```csharp
public int CurrencyPositivePattern { get; set; }
```

Gets or sets the format pattern for positive currency values.

Returns: The format pattern for positive currency values. The default for `NumberFormatInfo.InvariantInfo` is 0, which represents "\\$n", where "\\$" is the `NumberFormatInfo.CurrencySymbol` and "n" is a number.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is less than 0 or greater than 3.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `CurrencyPositivePattern` property is used with the "C" standard format string to define pattern of positive currency values. For more information, see Standard Numeric Format Strings. This property has one of the values in the following table. The symbol "$" is the `NumberFormatInfo.CurrencySymbol` and `n` is a number.

| Value | Associated pattern |
|-------|--------------------|
| 0     | $n                 |
| 1     | n$                 |
| 2     | $ n                |
| 3     | n $                |

The pattern does not support a positive sign.

## NumberFormatInfo.CurrencySymbol property

```csharp
public string CurrencySymbol { get; set; }
```

Gets or sets the string to use as the currency symbol.

Returns: The string to use as the currency symbol. The default for `NumberFormatInfo.InvariantInfo` is "¤".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The string assigned to the `CurrencySymbol` property is included in the result string when a numeric value is formatted with the "C" standard numeric format string.

#### Examples
The following example displays the currency symbol for the current culture and uses the "C" standard numeric format string to format a currency value.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/CurrencySymbol/currencysymbolex1.cs._

## NumberFormatInfo.CurrentInfo property

```csharp
public static System.Globalization.NumberFormatInfo CurrentInfo { get; }
```

Gets a read-only `NumberFormatInfo` that formats values based on the current culture.

Returns: A read-only `NumberFormatInfo` based on the culture of the current thread.

#### Remarks
Retrieving a `NumberFormatInfo` object from the `CurrentInfo` property is equivalent to retrieving a `NumberFormatInfo` object from the `CultureInfo.CurrentCulture.NumberFormat` property.

#### Examples
The following example shows that the objects returned by the `NumberFormatInfo.CurrentInfo` and   `CultureInfo.CurrentCulture.NumberFormat` properties are identical. It then uses reflection to display the property values of the `NumberFormatInfo` object returned by the `CurrentInfo` property on a system whose current culture is en-US.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/CurrentInfo/currentinfo1.cs._

## NumberFormatInfo.DigitSubstitution property

```csharp
public System.Globalization.DigitShapes DigitSubstitution { get; set; }
```

Gets or sets a value that specifies how the graphical user interface displays the shape of a digit.

Returns: One of the enumeration values that specifies the culture-specific digit shape.

Exceptions:

- `InvalidOperationException`: The current `NumberFormatInfo` object is read-only.
- `ArgumentException`: The value in a set operation is not a valid `DigitShapes` value.

> **Important:**
> The `DigitSubstitution` property is reserved for future use. Currently, it is not used in either parsing or formatting operations for the current `NumberFormatInfo` object.

## NumberFormatInfo.InvariantInfo property

```csharp
public static System.Globalization.NumberFormatInfo InvariantInfo { get; }
```

Gets a read-only `NumberFormatInfo` object that is culture-independent (invariant).

Returns: A read-only  object that is culture-independent (invariant).

#### Remarks
This `NumberFormatInfo` object returned by this property does not change, regardless of the current culture. It represents the formatting conventions of the invariant culture, which is a culture associated with the English language but not with any country/region. The invariant culture is used in formatting operations that are culture-independent or that produce result strings suitable for display across multiple cultures.

#### Examples
The following example displays the default property values of the `NumberFormatInfo.InvariantInfo`.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/InvariantInfo/invariantinfo.cs._

## NumberFormatInfo.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether this `NumberFormatInfo` object is read-only.

Returns: `true` if the `NumberFormatInfo` is read-only; otherwise, `false`.

#### Remarks
Attempting to perform an assignment to a property of a read-only `NumberFormatInfo` causes an `InvalidOperationException`.

You can call the `NumberFormatInfo.Clone` method to create a read/write `NumberFormatInfo` object from a read-only object, as the following example illustrates.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Clone/isreadonly1.cs._

## NumberFormatInfo.NaNSymbol property

```csharp
public string NaNSymbol { get; set; }
```

Gets or sets the string that represents the IEEE NaN (not a number) value.

Returns: The string that represents the IEEE NaN (not a number) value. The default for `NumberFormatInfo.InvariantInfo` is "NaN".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
For more information on NaN values, see `Double` or `Single`.

## NumberFormatInfo.NativeDigits property

```csharp
public string[] NativeDigits { get; set; }
```

Gets or sets a string array of native digits equivalent to the Western digits 0 through 9.

Returns: A string array that contains the native equivalent of the Western digits 0 through 9. The default is an array having the elements "0", "1", "2", "3", "4", "5", "6", "7", "8", and "9".

Exceptions:

- `InvalidOperationException`: The current `NumberFormatInfo` object is read-only.
- `ArgumentNullException`: In a set operation, the value is `null`.

-or-

In a set operation, an element of the value array is `null`.
- `ArgumentException`: In a set operation, the value array does not contain 10 elements.

-or-

In a set operation, an element of the value array does not contain either a single `Char` object or a pair of `Char` objects that comprise a surrogate pair.

-or-

In a set operation, an element of the value array is not a number digit as defined by the Unicode Standard. That is, the digit in the array element does not have the Unicode `Number, Decimal Digit` (Nd) General Category value.

-or-

In a set operation, the numeric value of an element in the value array does not correspond to the element's position in the array. That is, the element at index 0, which is the first element of the array, does not have a numeric value of 0, or the element at index 1 does not have a numeric value of 1.

#### Remarks

> **Important:**
> The character set that's specified by the `NativeDigits` property has no effect on parsing or formatting operations. Only the Basic Latin digits 0 (U+0030) through 9 (U+0039) are used when formatting or parsing numeric values or date and time values.

#### Examples
The following example demonstrates the `NativeDigits` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/NativeDigits/nd.cs._

## NumberFormatInfo.NegativeInfinitySymbol property

```csharp
public string NegativeInfinitySymbol { get; set; }
```

Gets or sets the string that represents negative infinity.

Returns: The string that represents negative infinity. The default for `NumberFormatInfo.InvariantInfo` is "-Infinity".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

For more information on negative infinity, see `Double` or `Single`.
