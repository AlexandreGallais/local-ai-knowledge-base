---
title: "DateTimeOffset struct (part 9 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 9 of 15)

## DateTimeOffset.ParseExact(Char>, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static DateTimeOffset ParseExact (ReadOnlySpan<char> input, string[] formats, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles = System.Globalization.DateTimeStyles.None);
```

Converts a character span that contains the string representation of a date and time to its `DateTimeOffset` equivalent using the specified formats, culture-specific format information, and style. The format of the date and time representation must match one of the specified formats exactly.

Parameters:

- `input`: A character span that contains a date and time to convert.
- `formats`: An array of format specifiers that define the expected formats of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`.

Returns: An object that is equivalent to the date and time that is contained in the `input` parameter, as specified by the `formats`, `formatProvider`, and `styles` parameters.

Exceptions:

- `ArgumentException`: The offset is greater than 14 hours or less than -14 hours.
-or-
`styles` includes an unsupported value.
-or-
The `styles` parameter contains `DateTimeStyles` values that cannot be used together.
- `FormatException`: `input` is an empty character span.
-or-
`input` does not contain a valid string representation of a date and time.
-or-
No element of `formats` contains a valid format specifier.
-or-
The hour component and the AM/PM designator in `input` do not agree.

#### Remarks

This method parses a character span representing a date that matches any one of the patterns assigned to the `formats` parameter. If `input` does not match any one of these patterns with any of the variations defined by the `styles` parameter, the method throws a `FormatException`. Aside from comparing `input` to multiple formatting patterns, this overload behaves identically to the `ParseExact` method.

The `formats` parameter is a string array whose elements contain either a single standard format specifier or one or more custom format specifiers that define the possible pattern of the `input` parameter. When the method is called, `input` must match one of these patterns. For details about valid formatting codes, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. If the matched element in `formats` includes the `z`, `zz`, or `zzz` custom format specifiers to indicate that an offset must be present in `input`, that offset must include either a negative sign or a positive sign. If the sign is missing, the method throws a `FormatException`.

> **Important:**
>  Using the `formats` parameter of this overload to specify multiple formats can help reduce the frustration many users experience when they enter dates and times. In particular, the ability to define multiple input patterns enables an application to handle date and time representations that can either include or lack leading zeros in months, days, hours, minutes, and seconds.

If the matched element in `formats` requires that `input` contain a date but not a time, the resulting `DateTimeOffset` object is assigned a time of midnight (0:00:00). If the matched element in `formats` requires that `input` contain a time but not a date, the resulting `DateTimeOffset` object is assigned the current date on the local system. If the matched element in `formats` does not require that `input` contain an offset, the offset of the resulting `DateTimeOffset` object depends on the value of the `styles` parameter. If `styles` includes `AssumeLocal`, the offset of the local time zone is assigned to the `DateTimeOffset` object. If `styles` includes `AssumeUniversal`, the Coordinated Universal Time (UTC) offset, or +00:00, is assigned to the `DateTimeOffset` object. If neither value is specified, the offset of the local time zone is used.

The particular date and time symbols and strings used in `input` are defined by the `formatProvider` parameter. The same is true for the precise format of `input`, if the matching element of `formats` is a standard format specifier string. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture based on which `input` is interpreted. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the symbols and formatting in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The `styles` parameter defines whether white space is permitted in the input string, indicates how strings without an explicit offset component are parsed, and supports UTC conversion as part of the parsing operation. All members of the `DateTimeStyles` enumeration are supported except `NoCurrentDateDefault`. The following table lists the effect of each supported member.

|`DateTimeStyles` member|Behavior|
|-----------------------------|--------------|
|`AdjustToUniversal`|Parses `input` and, if necessary, converts it to UTC. It is equivalent to parsing a string, and then calling the `DateTimeOffset.ToUniversalTime` method of the returned `DateTimeOffset` object.|
|`AssumeLocal`|If the matched element in `formats` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the offset of the local time zone. This is the default value.|
|`AssumeUniversal`|If the matched element in `formats` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the UTC offset (+00:00).|
|`AllowInnerWhite`|Allows `input` to include inner white space not specified by `format`. Extra white space can appear between date and time components and within individual components (except the offset), and is ignored when parsing the string.|
|`AllowLeadingWhite`|Allows `input` to include leading spaces not specified by `formats`. These are ignored when parsing the string.|
|`AllowTrailingWhite`|Allows `input` to include trailing spaces not specified by `formats`. These are ignored when parsing the string.|
|`AllowWhiteSpaces`|Allows `input` to include leading, trailing, and inner spaces not specified by `formats`. All extra white-space characters not specified in the matched element in `formats` are ignored when parsing the string.|
|`None`|Indicates that additional white space is not permitted in `input`. White space must appear exactly as specified in a particular element of `formats` for a match to occur. This is the default behavior.|
|`RoundtripKind`|Has no effect because the `DateTimeOffset` structure does not include a `Kind` property.|

## DateTimeOffset.ParseExact(String, String, IFormatProvider, DateTimeStyles) method

```csharp
public static DateTimeOffset ParseExact (string input, string format, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles);
```

Converts the specified string representation of a date and time to its `DateTimeOffset` equivalent using the specified format, culture-specific format information, and style. The format of the string representation must match the specified format exactly.

Parameters:

- `input`: A string that contains a date and time to convert.
- `format`: A format specifier that defines the expected format of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`.

Returns: An object that is equivalent to the date and time that is contained in the `input` parameter, as specified by the `format`, `formatProvider`, and `styles` parameters.

Exceptions:

- `ArgumentException`: The offset is greater than 14 hours or less than -14 hours.

-or-

The `styles` parameter includes an unsupported value.

-or-

The `styles` parameter contains `DateTimeStyles` values that cannot be used together.
- `ArgumentNullException`: `input` is `null`.

-or-

`format` is `null`.
- `FormatException`: `input` is an empty string ("").

-or-

`input` does not contain a valid string representation of a date and time.

-or-

`format` is an empty string.

-or-

The hour component and the AM/PM designator in `input` do not agree.

#### Remarks
The `ParseExact` method parses the string representation of a date, which must be in the format defined by the `format` parameter. It also requires that the \<Date>, \<Time>, and \<Offset> elements of the string representation of a date and time appear in the order specified by `format`. If the `input` string does not match the pattern of the `format` parameter, with any variations defined by the `styles` parameter, the method throws a `FormatException`.  In contrast, the `Parse` method parses the string representation of a date in any one of the formats recognized by the format provider's `DateTimeFormatInfo` object. `DateTimeOffset.Parse` also allows the \<Date>, \<Time>, and \<Offset> elements of the string representation of a date and time to appear in any order.

The `format` parameter is a string that contains either a single standard format specifier or one or more custom format specifiers that define the required pattern of the `input` parameter. For details about valid formatting codes, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. If `format` includes the `z`, `zz`, or `zzz` custom format specifiers to indicate that an offset must be present in `input`, that offset must include either a negative sign or a positive sign. If the sign is missing, the method throws a `FormatException`.

If `format` requires that `input` contain a date but not a time, the resulting `DateTimeOffset` object is assigned a time of midnight (0:00:00). If `format` requires that `input` contain a time but not a date, the resulting `DateTimeOffset` object is assigned the current date on the local system. If `format` does not require that `input` contain an offset, the offset of the resulting `DateTimeOffset` object depends on the value of the `styles` parameter. If `styles` includes `AssumeLocal`, the offset of the local time zone is assigned to the `DateTimeOffset` object. If `styles` includes `AssumeUniversal`, the Coordinated Universal Time (UTC) offset, or +00:00, is assigned to the `DateTimeOffset` object. If neither value is specified, the offset of the local time zone is used.

The particular date and time symbols and strings used in `input` are defined by the `formatProvider` parameter. The same is true for the precise format of `input`, if `format` is a standard format specifier string. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture based on which `input` is interpreted. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the symbols and formatting in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The `styles` parameter defines whether white space is allowed in the input string, indicates how strings without an explicit offset component are parsed, and supports UTC conversion as part of the parsing operation. All members of the `DateTimeStyles` enumeration are supported except `NoCurrentDateDefault`. The following table lists the effect of each supported member.

|`DateTimeStyles` member|Behavior|
|-----------------------------|--------------|
|`AdjustToUniversal`|Parses `input` and, if necessary, converts it to UTC. It is equivalent to parsing a string, and then calling the `DateTimeOffset.ToUniversalTime` method of the returned `DateTimeOffset` object.|
|`AssumeLocal`|If `format` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the offset of the local time zone. This is the default value.|
|`AssumeUniversal`|If `format` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the UTC offset (+00:00).|
|`AllowInnerWhite`|Allows `input` to include inner white space not specified by `format`. Extra white space can appear between date and time components and within individual components, and is ignored when parsing the string.|
|`AllowLeadingWhite`|Allows `input` to include leading spaces not specified by `format`. These are ignored when parsing the string.|
|`AllowTrailingWhite`|Allows `input` to include trailing spaces not specified by `format`. These are ignored when parsing the string.|
|`AllowWhiteSpaces`|Allows `input` to include leading, trailing, and inner spaces not specified by `format`. All extra white-space characters not specified in `format` are ignored when parsing the string.|
|`None`|Indicates that additional white space is not permitted in `input`. White space must appear exactly as specified in `format`. This is the default behavior.|
|`RoundtripKind`|Has no effect because the `DateTimeOffset` structure does not include a `Kind` property.|

#### Examples
The following example uses the `ParseExact` method with standard and custom format specifiers, the invariant culture, and various `DateTimeStyles` values to parse several date and time strings.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ParseExact/ParseExact.cs._

The following example uses a variety of `DateTimeStyles` values to parse an array of strings that are expected to conform to ISO 8601. As the output from the example shows, strings that are in the proper format fail to parse if:

- they contain white space, and an appropriate `DateTimeStyles` flag (such as `AllowWhiteSpaces` has not been supplied in the method call.

- they contain date and time elements that are out of range.

Strings that do not specify a UTC offset are assumed to have the offset of the local time zone (in this case, -07:00) unless the `AssumeUniversal` flag is supplied in the method call. In that case, they are assumed to be Universal Coordinated Time.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ParseExact/parseexact-iso8601-2.cs._
