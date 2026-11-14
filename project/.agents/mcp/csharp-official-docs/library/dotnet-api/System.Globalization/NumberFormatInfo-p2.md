---
title: "NumberFormatInfo class (part 2 of 5)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/NumberFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NumberFormatInfo class (part 2 of 5)

Every formatting operation uses either a standard or a custom numeric format string to produce a result string from a number. In some cases, the use of a format string to produce a result string is explicit, as in the following example. This code calls the `ToString` method to convert a `Decimal` value to a number of different string representations by using the formatting conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/properties1.cs._
In other cases, the use of a format string is implicit. For example, in the following method calls to the default or parameterless `ToString` method, the value of the `Decimal` instance is formatted by using the general ("G") format specifier and the conventions of the current culture, which in this case is the en-US culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/properties2.cs._
Each standard numeric format string uses one or more `NumberFormatInfo` properties to determine the pattern or the symbols used in the result string. Similarly, each custom numeric format specifier except "0" and "#" insert symbols in the result string that are defined by `NumberFormatInfo` properties. The following table lists the standard and custom numeric format specifiers and their associated `NumberFormatInfo` properties. To change the appearance of the result string for a particular culture, see the Modify NumberFormatInfo properties section. For details about the use of these format specifiers, see Standard Numeric Format Strings and Custom Numeric Format Strings.

|Format specifier|Associated properties|
|----------------------|---------------------------|
|"C" or "c" (currency format specifier)|`CurrencyDecimalDigits`, to define the default number of fractional digits.`CurrencyDecimalSeparator`, to define the decimal separator symbol.`CurrencyGroupSeparator`, to define the group or thousands separator.`CurrencyGroupSizes`, to define the sizes of integral groups.`CurrencyNegativePattern`, to define the pattern of negative currency values.`CurrencyPositivePattern`, to define the pattern of positive currency values.`CurrencySymbol`, to define the currency symbol.`NegativeSign`, to define the negative sign symbol.|
|"D" or "d" (decimal format specifier)|`NegativeSign`, to define the negative sign symbol.|
|"E" or "e" (exponential or scientific format specifier)|`NegativeSign`, to define the negative sign symbol in the mantissa and exponent.`NumberDecimalSeparator`, to define the decimal separator symbol.`PositiveSign`, to define the positive sign symbol in the exponent.|
|"F" or "f" (fixed-point format specifier)|`NegativeSign`, to define the negative sign symbol.`NumberDecimalDigits`, to define the default number of fractional digits.`NumberDecimalSeparator`, to define the decimal separator symbol.|
|"G" or "g" (general format specifier)|`NegativeSign`, to define the negative sign symbol.`NumberDecimalSeparator`, to define the decimal separator symbol.`PositiveSign`, to define the positive sign symbol for result strings in exponential format.|
|"N" or "n" (number format specifier)|`NegativeSign`, to define the negative sign symbol.`NumberDecimalDigits`, to define the default number of fractional digits.`NumberDecimalSeparator`, to define the decimal separator symbol.`NumberGroupSeparator`, to define the group separator (thousands) symbol.`NumberGroupSizes`, to define the number of integral digits in a group.`NumberNegativePattern`, to define the format of negative values.|
|"P" or "p" (percent format specifier)|`NegativeSign`, to define the negative sign symbol.`PercentDecimalDigits`, to define the default number of fractional digits.`PercentDecimalSeparator`, to define the decimal separator symbol.`PercentGroupSeparator`, to define the group separator symbol.`PercentGroupSizes`, to define the number of integral digits in a group.`PercentNegativePattern`, to define the placement of the percent symbol and the negative symbol for negative values.`PercentPositivePattern`, to define the placement of the percent symbol for positive values.`PercentSymbol`, to define the percent symbol.|
|"R" or "r" (round-trip format specifier)|`NegativeSign`, to define the negative sign symbol.`NumberDecimalSeparator`, to define the decimal separator symbol.`PositiveSign`, to define the positive sign symbol in an exponent.|
|"X" or "x" (hexadecimal format specifier)|None.|
|"." (decimal point custom format specifier)|`NumberDecimalSeparator`, to define the decimal separator symbol.|
|"," (group separator custom format specifier)|`NumberGroupSeparator`, to define the group (thousands) separator symbol.|
|"%" (percentage placeholder custom format specifier)|`PercentSymbol`, to define the percent symbol.|
|"‰" (per mille placeholder custom format specifier)|`PerMilleSymbol`, to define the per mille symbol.|
|"E" (exponential notation custom format specifier)|`NegativeSign`, to define the negative sign symbol in the mantissa and exponent.`PositiveSign`, to define the positive sign symbol in the exponent.|

Note that the `NumberFormatInfo` class includes a `NativeDigits` property that specifies the base 10 digits used by a specific culture. However, the property is not used in formatting operations; only the Basic Latin digits 0 (U+0030) through 9 (U+0039) are used in the result string. In addition, for `Single` and `Double` values of `NaN`, `PositiveInfinity`, and `NegativeInfinity`, the result string consists exclusively of the symbols defined by the `NaNSymbol`, `PositiveInfinitySymbol`, and `NegativeInfinitySymbol` properties, respectively.

#### Modify NumberFormatInfo properties

You can modify the properties of a `NumberFormatInfo` object to customize the result string produced in a numeric formatting operation. To do this:

1. Create a read/write copy of a `NumberFormatInfo` object whose formatting conventions you want to modify. For more information, see the Instantiate a NumberFormatInfo object section.

2. Modify the property or properties that are used to produce the desired result string. For information about how formatting methods use `NumberFormatInfo` properties to define result strings, see the Format strings and NumberFormatInfo properties section.

3. Use the custom `NumberFormatInfo` object as the `IFormatProvider` argument in calls to formatting methods.

> **Note:**
> Instead of dynamically modifying a culture's property values each time an application is started, you can use the `CultureAndRegionInfoBuilder` class to define either a custom culture (a culture that has a unique name and that supplements existing cultures) or a replacement culture (one that is used instead of a specific culture).

The following sections provide some examples.

#### Modify the currency symbol and pattern

The following example modifies a `NumberFormatInfo` object that represents the formatting conventions of the en-US culture. It assigns the ISO-4217 currency symbol to the `CurrencySymbol` property and defines a pattern for currency values that consists of the currency symbol followed by a space and a numeric value.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/customize_currency1.cs._
#### Format a national identification number

Many national identification numbers consist exclusively of digits and so can easily be formatted by modifying the properties of a `NumberFormatInfo` object. For example, a social security number in the United States consists of 9 digits arranged as follows: `XXX-XX-XXXX`. The following example assumes that social security numbers are stored as integer values and formats them appropriately.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/customize_ssn1.cs._
#### Parse numeric strings

Parsing involves converting the string representation of a number to a number. Each numeric type in .NET includes two overloaded parsing methods: `Parse` and `TryParse`. The `Parse` method converts a string to a number and throws an exception if the conversion fails. The `TryParse` method converts a string to a number, assigns the number to an `out` argument, and returns a `Boolean` value that indicates whether the conversion succeeded.

The parsing methods implicitly or explicitly use a `NumberStyles` enumeration value to determine what style elements (such as group separators, a decimal separator, or a currency symbol) can be present in a string if the parsing operation is to succeed. If a `NumberStyles` value is not provided in the method call, the default is a `NumberStyles` value that includes the `Float` and `AllowThousands` flags, which specifies that the parsed string can include group symbols, a decimal separator, a negative sign, and white-space characters, or it can be the string representation of a number in exponential notation.

The parsing methods also implicitly or explicitly use a `NumberFormatInfo` object that defines the specific symbols and patterns that can occur in the string to be parsed. If a `NumberFormatInfo` object is not provided, the default is the `NumberFormatInfo` for the current culture. For more information about parsing, see the individual parsing methods, such as `Parse`, `Parse`, `Parse`, `Parse`, `TryParse`, and `TryParse`.

The following example illustrates the culture-sensitive nature of parsing strings. It tries to parse a string that include thousands separators by using the conventions of the en-US, fr-FR, and invariant cultures. A string that includes the comma as a group separator and the period as a decimal separator fails to parse in the fr-FR culture, and a string with white space as a group separator and a comma as a decimal separator fails to parse in the en-US and invariant cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/parse1.cs._
Parsing generally occurs in two contexts:

- As an operation that is designed to convert user input into a numeric value.

- As an operation that is designed to round-trip a numeric value; that is, to deserialize a numeric value that was previously serialized as a string.

The following sections discuss these two operations in greater detail.

#### Parse user strings

When you are parsing numeric strings input by the user, you should always instantiate a `NumberFormatInfo` object that reflects the user's cultural settings. For information about how to instantiate a `NumberFormatInfo` object that reflects user customizations, see the Dynamic data section.

The following example illustrates the difference between a parsing operation that reflects user cultural settings and one that does not. In this case, the default system culture is en-US, but the user has defined "," as the decimal symbol and "." as the group separator in Control Panel, **Region and Language**. Ordinarily, these symbols are reversed in the default en-US culture. When the user enters a string that reflects user settings, and the string is parsed by a `NumberFormatInfo` object that also reflects user settings (overrides), the parsing operation returns a correct result. However, when the string is parsed by a `NumberFormatInfo` object that reflects standard en-US cultural settings, it mistakes the comma symbol for a group separator and returns an incorrect result.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/parseuser1.cs._
#### Serialize and deserialize numeric data

When numeric data is serialized in string format and later deserialized and parsed, the strings should be generated and parsed by using the conventions of the invariant culture. The formatting and parsing operations should never reflect the conventions of a specific culture. If culture-specific settings are used, the portability of the data is strictly limited; it can be successfully deserialized only on a thread whose culture-specific settings are identical to those of the thread on which it was serialized. In some cases, this means that the data cannot even be successfully deserialized on the same system on which it was serialized.

The following example illustrates what can happen when this principle is violated. Floating-point values in an array are converted to strings when the current thread uses the culture-specific settings of the en-US culture.
The data is then parsed by a thread that uses the culture-specific settings of the pt-BR culture. In this case, although each parsing operation succeeds, the data doesn't round-trip successfully and data corruption occurs.
In other cases, a parsing operation could fail and a `FormatException` exception could be thrown.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/parsepersisted.cs._
#### Example

The following example shows how to retrieve a `NumberFormatInfo` object for a corresponding `CultureInfo` object, and use the retrieved object to query number formatting information for the particular culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/Overview/NumberFormatInfo.cs._

## NumberFormatInfo.NumberFormatInfo() constructor

```csharp
public NumberFormatInfo ();
```

Initializes a new writable instance of the `NumberFormatInfo` class that is culture-independent (invariant).

#### Remarks
The properties of the new instance can be modified if your application needs user-defined formatting.

## NumberFormatInfo.CurrencyDecimalDigits property

```csharp
public int CurrencyDecimalDigits { get; set; }
```

Gets or sets the number of decimal places to use in currency values.

Returns: The number of decimal places to use in currency values. The default for `NumberFormatInfo.InvariantInfo` is 2.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is less than 0 or greater than 99.
- `InvalidOperationException`: The property is being set and the `NumberFormatInfo` object is read-only.

#### Remarks
The `CurrencyDecimalDigits` property is used with the "C" standard format string without a precision specifier in numeric formatting operations. It defines the default number of fractional digits that appear after the decimal separator. This value is overridden if a precision specifier is used. For more information, see Standard Numeric Format Strings.

#### Examples
The following example demonstrates the effect of changing the `CurrencyDecimalDigits` property.

_Code sample not included: ~/snippets/csharp/System.Globalization/NumberFormatInfo/CurrencyDecimalDigits/currencydecimaldigits.cs._
