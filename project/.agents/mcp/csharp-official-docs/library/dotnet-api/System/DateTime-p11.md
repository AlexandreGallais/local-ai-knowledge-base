---
title: "DateTime struct (part 11 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 11 of 18)

## DateTime.ParseExact(String, String, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTime ParseExact (string s, string format, IFormatProvider? provider, System.Globalization.DateTimeStyles style);
```

Converts the specified string representation of a date and time to its `DateTime` equivalent using the specified format, culture-specific format information, and style. The format of the string representation must match the specified format exactly or an exception is thrown.

Parameters:

- `s`: A string containing a date and time to convert.
- `format`: A format specifier that defines the required format of `s`. For more information, see the Remarks section.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `style`: A bitwise combination of the enumeration values that provides additional information about `s`, about style elements that may be present in `s`, or about the conversion from `s` to a `DateTime` value. A typical value to specify is `DateTimeStyles.None`.

Returns: An object that is equivalent to the date and time contained in `s`, as specified by `format`, `provider`, and `style`.

Exceptions:

- `ArgumentNullException`: `s` or `format` is `null`.
- `FormatException`: `s` or `format` is an empty string.

-or-

`s` does not contain a date and time that corresponds to the pattern specified in `format`.

-or-

The hour component and the AM/PM designator in `s` do not agree.
- `ArgumentException`: `style` contains an invalid combination of `DateTimeStyles` values. For example, both `DateTimeStyles.AssumeLocal` and `DateTimeStyles.AssumeUniversal`.

#### Remarks
The `ParseExact` method parses the string representation of a date, which must be in a format defined by the `format` parameter. It also requires that the date and time elements in `s` appear in the order specified by `format`. If `s` does not match the pattern of the `format` parameter, with any variations defined by the `style` parameter, the method throws a `FormatException`. In contrast, the `Parse` method parses the string representation of a date in any one of the formats recognized by the format provider's `DateTimeFormatInfo` object. The `Parse` method also allows the date and time elements in `s` to appear in any order.

If the `s` parameter contains only a time and no date, the current date is used unless the `style` parameter includes the `NoCurrentDateDefault` flag, in which case the default date (`DateTime.Date.MinValue`) is used. If the `s` parameter contains only a date and no time, midnight (00:00:00) is used. The `style` parameter also determines whether the `s` parameter can contain leading, inner, or trailing white space characters.

If `s` contains no time zone information, the `Kind` property of the returned `DateTime` object is `Unspecified`. This behavior can be changed by using the `AssumeLocal` flag, which returns a `DateTime` value whose `Kind` property is `Local`, or by using the `AssumeUniversal` and `AdjustToUniversal` flags, which returns a `DateTime` value whose `Kind` property is `Utc`. If `s` contains time zone information, the time is converted to local time, if necessary, and the `Kind` property of the returned `DateTime` object is set to `Local`. This behavior can be changed by using the `RoundtripKind` flag to not convert Coordinated Universal Time (UTC) to a local time and to set the `Kind` property to `Utc`.

The `format` parameter defines the required pattern of the `s` parameter. It can consist of either one or more custom format specifiers from the Custom Date and Time Format Strings table, or a single standard format specifier, which identifies a predefined pattern, from the Standard Date and Time Format Strings table.

If you do not use date or time separators in a custom format pattern, use the invariant culture for the `provider` parameter and the widest form of each custom format specifier. For example, if you want to specify hours in the pattern, specify the wider form, "HH", instead of the narrower form, "H".

> **Note:**
> Rather than requiring that `s` conform to a single format for the parse operation to succeed, you can call the `ParseExact` method and specify multiple permitted formats. This makes the parse operation more likely to succeed.

The `styles` parameter includes one or more members of the `DateTimeStyles` enumeration that determine whether and where white space not defined by `format` can appear in `s` and that control the precise behavior of the parse operation. The following table describes how each member of the `DateTimeStyles` enumeration affects the operation of the `ParseExact` method.

|DateTimeStyles member|Description|
|---------------------------|-----------------|
|`AdjustToUniversal`|Parses `s` and, if necessary, converts it to UTC. If `s` includes a time zone offset, or if `s` contains no time zone information but `styles` includes the `AssumeLocal` flag, the method parses the string, calls `DateTime.ToUniversalTime` to convert the returned `DateTime` value to UTC, and sets the `Kind` property to `Utc`. If `s` indicates that it represents UTC, or if `s` does not contain time zone information but `styles` includes the `AssumeUniversal` flag, the method parses the string, performs no time zone conversion on the returned `DateTime` value, and sets the `Kind` property to `Utc`. In all other cases, the flag has no effect.|
|`AllowInnerWhite`|Specifies that white space not defined by `format` can appear between any individual date or time element.|
|`AllowLeadingWhite`|Specifies that white space not defined by `format` can appear at the beginning of `s`.|
|`AllowTrailingWhite`|Specifies that white space not defined by `format` can appear at the end of `s`.|
|`AllowWhiteSpaces`|Specifies that `s` may contain leading, inner, and trailing white spaces not defined by `format`.|
|`AssumeLocal`|Specifies that if `s` lacks any time zone information, it is assumed to represent a local time. Unless the `AdjustToUniversal` flag is present, the `Kind` property of the returned `DateTime` value is set to `Local`.|
|`AssumeUniversal`|Specifies that if `s` lacks any time zone information, it is assumed to represent UTC. Unless the `AdjustToUniversal` flag is present, the method converts the returned `DateTime` value from UTC to local time and sets its `Kind` property to `Local`.|
|`NoCurrentDateDefault`|If `s` contains time without date information, the date of the return value is set to `DateTime.MinValue.Date`.|
|`None`|The `s` parameter is parsed using default values. No white space other than that present in `format` is allowed. If `s` lacks a date component, the date of the returned `DateTime` value is set to 1/1/0001. If `s` contains no time zone information, the `Kind` property of the returned `DateTime` object is set to `Unspecified`. If time zone information is present in `s`, the time is converted to local time and the `Kind` property of the returned `DateTime` object is set to `Local`.|
|`RoundtripKind`|For strings that contain time zone information, tries to prevent the conversion to a `DateTime` value date and time with its `Kind` property set to `Local`. This flag primarily prevents the conversion of UTC times to local times.|

The particular date and time symbols and strings (such as the names of the days of the week in a particular language) used in `s` are defined by the `provider` parameter, as is the precise format of `s` if `format` is a standard format specifier string. The `provider` parameter can be any of the following:

- A `CultureInfo` object that represents the culture used to interpret `s`. The `DateTimeFormatInfo` object returned by its `DateTimeFormat` property defines the symbols and formatting in `s`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

- A custom `IFormatProvider` implementation whose `IFormatProvider.GetFormat` method returns either the `CultureInfo` object or the `DateTimeFormatInfo` object that provides formatting information.

If `provider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

#### Examples
The following example demonstrates the `ParseExact` method. Note that the string " 5/01/2009 8:30 AM" cannot be parsed successfully when the `styles` parameter equals `None` because leading spaces are not allowed by `format`. Additionally, the string "5/01/2009 09:00" cannot be parsed successfully with a `format` of "MM/dd/yyyyhh:mm" because the date string does not precede the month number with a leading zero, as `format` requires.

_Code sample not included: ~/snippets/csharp/System/DateTime/ParseExact/parseexact2.cs._
