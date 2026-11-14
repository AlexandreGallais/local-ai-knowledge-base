---
title: "DateTimeOffset struct (part 7 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 7 of 15)

## DateTimeOffset.op_Subtraction(DateTimeOffset, TimeSpan) method

```csharp
public static DateTimeOffset operator - (DateTimeOffset dateTimeOffset, TimeSpan timeSpan);
```

Subtracts a specified time interval from a specified date and time, and yields a new date and time.

Parameters:

- `dateTimeOffset`: The date and time object to subtract from.
- `timeSpan`: The time interval to subtract.

Returns: An object that is equal to the value of `dateTimeOffset` minus `timeSpan`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> or greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
The `DateTimeOffset.op_Subtraction` method defines the subtraction operation for `DateTimeOffset` objects. It enables code such as the following:

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/op_Addition/Operators.cs._

Languages that do not support custom operators and operator overloading can call the `Subtract` method instead.

The equivalent method for this operator is `Subtract`.

## DateTimeOffset.Parse(String) method

```csharp
public static DateTimeOffset Parse (string input);
```

Converts the specified string representation of a date, time, and offset to its `DateTimeOffset` equivalent.

Parameters:

- `input`: A string that contains a date and time to convert.

Returns: An object that is equivalent to the date and time that is contained in `input`.

Exceptions:

- `ArgumentException`: The offset is greater than 14 hours or less than -14 hours.
- `ArgumentNullException`: `input` is `null`.
- `FormatException`: `input` does not contain a valid string representation of a date and time.

-or-

`input` contains the string representation of an offset value without a date or time.

#### Remarks
`Parse` parses a string with three elements that can appear in any order and are delimited by white space. These three elements are as shown in the following table.

|Element|Example|
|-------------|-------------|
|\<Date>|"2/10/2007"|
|\<Time>|"1:02:03 PM"|
|\<Offset>|"-7:30"|

Although each of these elements is optional, \<Offset> cannot appear by itself. It must be provided together with either \<Date> or \<Time>. If \<Date> is missing, its default value is the current day. If \<Time> is missing, its default value is 12:00:00 AM. If \<Date> is present but its year component consists of only two digits, it is converted to a year in the current culture's current calendar based on the value of the `TwoDigitYearMax` property. If \<Offset> is missing, its default value is the offset of the local time zone. \<Offset> can represent either a negative or a positive offset from Coordinated Universal Time (UTC). In either case, \<Offset> must include a sign symbol.

The `input` string is parsed by using the formatting information in a `DateTimeFormatInfo` object that is initialized for the current culture. To parse a string that contains designated formatting that does not necessarily correspond to the formatting of the current culture, use the `DateTimeOffset.ParseExact` method and provide a format specifier.

#### Examples
The following example calls the `Parse` method to parse several date and time strings. The example includes output from March 22, 2007, on a system whose culture is en-us.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Parse/ParseExamples.cs._

## DateTimeOffset.Parse(Char>, IFormatProvider) method

```csharp
public static DateTimeOffset Parse (ReadOnlySpan<char> s, IFormatProvider? provider);
```

Parses a span of characters into a value.

Parameters:

- `s`: The span of characters to parse.
- `provider`: An object that provides culture-specific formatting information about `s`.

Returns: The result of parsing `s`.

To be added.

## DateTimeOffset.Parse(String, IFormatProvider) method

```csharp
public static DateTimeOffset Parse (string input, IFormatProvider? formatProvider);
```

Converts the specified string representation of a date and time to its `DateTimeOffset` equivalent using the specified culture-specific format information.

Parameters:

- `input`: A string that contains a date and time to convert.
- `formatProvider`: An object that provides culture-specific format information about `input`.

Returns: An object that is equivalent to the date and time that is contained in `input`, as specified by `formatProvider`.

Exceptions:

- `ArgumentException`: The offset is greater than 14 hours or less than -14 hours.
- `ArgumentNullException`: `input` is `null`.
- `FormatException`: `input` does not contain a valid string representation of a date and time.

-or-

`input` contains the string representation of an offset value without a date or time.

#### Remarks
This method parses a string with three elements that can appear in any order and are delimited by white space. These three elements are shown in the following table.

|Element|Example|
|-------------|-------------|
|\<Date>|"2/10/2007"|
|\<Time>|"1:02:03 PM"|
|\<Offset>|"-7:30"|

Although each of these elements is optional, \<Offset> cannot appear by itself. It must be provided together with either \<Date> or \<Time>. If \<Date> is missing, its default value is the current day. If \<Date> is present but its year component consists of only two digits, it is converted to a year in the `provider` parameter's current calendar based on the value of the `TwoDigitYearMax` property. If \<Time> is missing, its default value is 12:00:00 AM. If \<Offset> is missing, its default value is the offset of the local time zone. \<Offset> can represent either a negative or a positive offset from Coordinated Universal Time (UTC). In either case, \<Offset> must include a sign symbol.

The format of these three elements is defined by the `formatProvider` parameter, which can be either of the following:

- A `CultureInfo` object that represents the culture whose formatting is used in the `input` parameter. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting used in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The positive or negative sign used in \<Offset> must be either + or -. It is not defined by the `NumberFormatInfo.PositiveSign` or `NumberFormatInfo.NegativeSign` properties of the `NumberFormatInfo` object of the `formatProvider` parameter.

#### Examples
The following example parses date and time strings that are formatted for the fr-fr culture and displays them using the local system's default en-us culture.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Parse/ParseExamples.cs._

## DateTimeOffset.Parse(Char>, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTimeOffset Parse (ReadOnlySpan<char> input, IFormatProvider? formatProvider = default, System.Globalization.DateTimeStyles styles = System.Globalization.DateTimeStyles.None);
```

Converts the specified span representation of a date and time to its `DateTimeOffset` equivalent using the specified culture-specific format information and formatting style.

Parameters:

- `input`: A span containing the characters that represent a date and time to convert.
- `formatProvider`: An object that provides culture-specific format information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time that is contained in `input` as specified by `formatProvider` and `styles`.

To be added.

## DateTimeOffset.Parse(String, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTimeOffset Parse (string input, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles);
```

Converts the specified string representation of a date and time to its `DateTimeOffset` equivalent using the specified culture-specific format information and formatting style.

Parameters:

- `input`: A string that contains a date and time to convert.
- `formatProvider`: An object that provides culture-specific format information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time that is contained in `input` as specified by `formatProvider` and `styles`.

Exceptions:

- `ArgumentException`: The offset is greater than 14 hours or less than -14 hours.

-or-

`styles` is not a valid `DateTimeStyles` value.

-or-

`styles` includes an unsupported `DateTimeStyles` value.

-or-

`styles` includes `DateTimeStyles` values that cannot be used together.
- `ArgumentNullException`: `input` is `null`.
- `FormatException`: `input` does not contain a valid string representation of a date and time.

-or-

`input` contains the string representation of an offset value without a date or time.

#### Remarks
This method parses a string with three elements that can appear in any order and are delimited by white space. These three elements are shown in the following table.

|Element|Example|
|-------------|-------------|
|\<Date>|"2/10/2007"|
|\<Time>|"1:02:03 PM"|
|\<Offset>|"-7:30"|

Although each of these elements is optional, \<Offset> cannot appear by itself. It must be provided together with either \<Date> or \<Time>. If \<Date> is missing, its default value is the current day. If \<Date> is present but its year component consists of only two digits, it is converted to a year in the `provider` parameter's current calendar based on the value of the `TwoDigitYearMax` property. If \<Time> is missing, its default value is 12:00:00 AM. If \<Offset> is missing, its default value is the offset of the local time zone, or `Zero` if either the `AdjustToUniversal` or `AssumeUniversal` value is specified in the `styles` parameter. If \<Offset> is present, it can represent either a negative or a positive offset from Coordinated Universal Time (UTC). In either case, \<Offset> must include a sign symbol.

The format of these three elements is defined by the `formatProvider` parameter, which can be either of the following:

- A `CultureInfo` object that represents the culture whose formatting is used in the `input` parameter. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the formatting used in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

Each element can also be enclosed by leading or trailing white space, and the \<Date> and \<Time> elements can include inner white space (such as 6:   00:00). Only the \<Offset> component cannot include inner white space.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The positive or negative sign used in \<Offset> must be either + or -. It is not defined by the `NumberFormatInfo.PositiveSign` or `NumberFormatInfo.NegativeSign` properties of the `NumberFormatInfo` object returned by the `formatProvider` parameter.

The following table shows the members of the `DateTimeStyles` enumeration that are supported.

|DateTimeStyles member|Description|
|---------------------------|-----------------|
|`AdjustToUniversal`|Parses the string represented by `input` and, if necessary, converts it to UTC. It is equivalent to parsing a string and then calling the `DateTimeOffset.ToUniversalTime` method of the returned `DateTimeOffset` object.|
|`AllowInnerWhite`|Although valid, this value is ignored. Inner white space is permitted in the \<Date> and \<Time> elements.|
|`AllowLeadingWhite`|Although valid, this value is ignored. Leading white space is permitted in front of each component in the parsed string.|
|`AllowTrailingWhite`|Although valid, this value is ignored. Trailing white space is permitted in front of each component in the parsed string.|
|`AllowWhiteSpaces`|This is the default behavior. It cannot be overridden by supplying a more restrictive `DateTimeStyles` enumeration value, such as `None`.|
|`AssumeLocal`|Indicates that, if the `input` parameter lacks an \<Offset> element, the offset of the local time zone should be provided. This is the default behavior of the `DateTimeOffset.Parse` method.|
|`AssumeUniversal`|Indicates that, if the `input` parameter lacks an \<Offset> element, the UTC offset (00:00) should be provided.|
|`None`|Although valid, this value is ignored and has no effect.|
|`RoundtripKind`|Because the `DateTimeOffset` structure does not include a `Kind` property, this value has no effect.|

Only the `NoCurrentDateDefault` value is not supported. An `ArgumentException` is thrown if this value is included in the `styles` parameter.

#### Examples
The following example illustrates the effect of passing the `AssumeLocal`, `AssumeUniversal`, and `AdjustToUniversal` values to the `styles` parameter of the `Parse` method.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Parse/ParseExamples.cs._
