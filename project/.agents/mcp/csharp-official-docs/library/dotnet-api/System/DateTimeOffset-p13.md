---
title: "DateTimeOffset struct (part 13 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 13 of 15)

## DateTimeOffset.TryParseExact(Char>, Char>, IFormatProvider, DateTimeStyles, DateTimeOffset) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> input, ReadOnlySpan<char> format, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles, out DateTimeOffset result);
```

Converts the representation of a date and time in a character span to its `DateTimeOffset` equivalent using the specified format, culture-specific format information, and style. The format of the date and time representation must match the specified format exactly.

Parameters:

- `input`: A span containing the characters that represent a date and time to convert.
- `format`: A format specifier that defines the required format of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`. A typical value to specify is `DateTimeStyles.None`.
- `result`: When the method returns, contains the `DateTimeOffset` equivalent to the date and time of `input`, if the conversion succeeded, or <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> if the conversion failed. The conversion fails if the

Returns: `true` if the `input` parameter is successfully converted; otherwise, `false`.

Exceptions:

- `ArgumentException`: `styles` includes an undefined `DateTimeStyles` value.
-or-
`DateTimeStyles.NoCurrentDateDefault` is not supported.
-or-
`styles` includes mutually exclusive `DateTimeStyles` values.

#### Remarks

This overload is like the `ParseExact` method, except that this method does not throw an exception if the conversion fails. It parses the representation of a date and time that must exactly match the pattern specified by the `format` parameter. If `input` does not match this pattern, with some possible variations in white space defined by the `styles` parameter, the parsing operation fails and the method returns `false`.

The `format` parameter is a character span that contains either a single standard format specifier or one or more custom format specifiers that define the required pattern of `input`. For details about valid formatting codes, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. If `format` includes the `z`, `zz`, or `zzz` custom format specifiers to indicate that an offset must be present in `input`, that offset must include either a negative sign or a positive sign. If the sign is missing, the parsing operation fails and the method returns `false`.

If `format` requires that `input` contain a date but not a time, the resulting `DateTimeOffset` object is assigned a time of midnight (0:00:00). If `format` requires that `input` contain a time but not a date, the resulting `DateTimeOffset` object is assigned the current date on the local system. If `format` does not require that `input` contain an offset, the offset of the resulting `DateTimeOffset` object depends on the value of the `styles` parameter. If `styles` includes `AssumeLocal`, the offset of the local time zone is assigned to the `DateTimeOffset` object. If `styles` includes `AssumeUniversal`, the Coordinated Universal Time (UTC) offset, or +00:00, is assigned to the `DateTimeOffset` object. If neither value is specified, the offset of the local time zone is used.

The particular date and time symbols and strings used in `input` are defined by the `formatProvider` parameter. The same is true for the precise pattern of `input` if `format` is a standard format specifier string. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture based on which `input` is interpreted. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the symbols and standard formats allowed in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The `styles` parameter defines whether white space is allowed in the input string, indicates how strings without an explicit offset component are parsed, and supports UTC conversion as part of the parsing operation. All members of the `DateTimeStyles` enumeration are supported except `NoCurrentDateDefault`. The following table lists the effect of each supported member.

|`DateTimeStyles` member|Behavior|
|-----------------------------|--------------|
|`AdjustToUniversal`|Parses `input` and, if necessary, converts it to UTC. It is equivalent to parsing a date and time representation, and then calling the `DateTimeOffset.ToUniversalTime` method of the returned `DateTimeOffset` object.|
|`AssumeLocal`|If `format` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the offset of the local time zone. This is the default behavior.|
|`AssumeUniversal`|If `format` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the UTC offset (+00:00).|
|`AllowInnerWhite`|Allows `input` to include inner white space not specified by format. Extra white space can appear between date and time components and within individual components, other than the offset, and is ignored when parsing the string.|
|`AllowLeadingWhite`|Allows `input` to include leading spaces not specified by `format`. These are ignored when parsing the string.|
|`AllowTrailingWhite`|Allows `input` to include trailing spaces not specified by `format`. These are ignored when parsing the string.|
|`AllowWhiteSpaces`|Allows `input` to include leading, trailing, and inner spaces not specified by `format`. All extra white-space characters not specified in `format` are ignored when parsing the string.|
|`None`|Indicates that additional white space is not permitted in `input`. White space must appear exactly as specified in `format`. This is the default behavior.|
|`RoundtripKind`|Has no effect, because the `DateTimeOffset` structure does not include a `Kind` property.|

## DateTimeOffset.TryParseExact(Char>, String[], IFormatProvider, DateTimeStyles, DateTimeOffset) method

```csharp
public static bool TryParseExact (ReadOnlySpan<char> input, string?[]? formats, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles, out DateTimeOffset result);
```

Converts the representation of a date and time in a character span to its `DateTimeOffset` equivalent using the specified formats, culture-specific format information, and style. The format of the date and time representation must match one of the specified formats exactly.

Parameters:

- `input`: A span containing the characters that represent a date and time to convert.
- `formats`: A array of standard or custom format strings that define the acceptable formats of `input`.
- `formatProvider`: An object that supplies culture-specific formatting information about `input`.
- `styles`: A bitwise combination of enumeration values that indicates the permitted format of `input`. A typical value to specify is `DateTimeStyles.None`.
- `result`: When the method returns, contains the `DateTimeOffset` equivalent to the date and time of `input`, if the conversion succeeded, or <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see> if the conversion failed. The conversion fails if the

Returns: `true` if the `input` parameter is successfully converted; otherwise, `false`.

Exceptions:

- `ArgumentException`: `styles` includes an undefined `DateTimeStyles` value.
-or-
`DateTimeStyles.NoCurrentDateDefault` is not supported.
-or-
`styles` includes mutually exclusive `DateTimeStyles` values.

#### Remarks

This method parses the string representation of a date that matches any one of the patterns assigned to the `formats` array. If `input` does not match any one of these patterns with any variations defined by the `styles` parameter, the parsing operation fails and the method returns `false`. Aside from comparing `input` to multiple strings that contain format specifiers, this overload behaves identically to the `ParseExact` method.

The `formats` parameter is a string array whose elements contain either a single standard format specifier or one or more custom format specifiers that define the possible pattern of `input`. For details about valid formatting codes, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. If the matched element in `formats` includes the `z`, `zz`, or `zzz` custom format specifiers to indicate that an offset must be present in `input`, that offset must include either a negative sign or a positive sign. If the sign is missing, the parse operation fails and the method returns `false`.

> **Important:**
>  Using the `formats` parameter of this overload to specify multiple formats can help reduce the frustration many users experience when they enter dates and times. In particular, the ability to define multiple input patterns enables an application to handle date and time representations that can either include or lack leading zeros in months, days, hours, minutes, and seconds. The example provides an illustration of this.

If the matched element in `formats` requires that `input` contain a date but not a time, the resulting `DateTimeOffset` object is assigned a time of midnight (0:00:00). If the matched element in `formats` requires that input contain a time but not a date, the resulting `DateTimeOffset` object is assigned the current date on the local system. If the matched element in `formats` does not require that `input` contain an offset, the offset of the resulting `DateTimeOffset` object depends on the value of the `styles` parameter. If `styles` includes `AssumeLocal`, the offset of the local time zone is assigned to the `DateTimeOffset` object. If `styles` includes `AssumeUniversal`, the Coordinated Universal Time (UTC) offset, or +00:00, is assigned to the `DateTimeOffset` object. If neither value is specified, the offset of the local time zone is used.

The particular date and time symbols used in `input` are defined by the `formatProvider` parameter. The same is true for the precise pattern of `input` if the matching element of `formats` is a standard format specifier string. The `formatProvider` parameter can be either of the following:

- A `CultureInfo` object that represents the culture based on which `input` is interpreted. The `DateTimeFormatInfo` object returned by the `DateTimeFormat` property defines the symbols and formatting in `input`.

- A `DateTimeFormatInfo` object that defines the format of date and time data.

If `formatprovider` is `null`, the `CultureInfo` object that corresponds to the current culture is used.

The `styles` parameter defines whether white space is permitted in the input string, indicates how strings without an explicit offset component are parsed, and supports UTC conversion as part of the parsing operation. All members of the `DateTimeStyles` enumeration are supported except `NoCurrentDateDefault`. The following table lists the effect of each supported member.

|`DateTimeStyles` member|Behavior|
|-----------------------------|--------------|
|`AdjustToUniversal`|Parses `input` and, if necessary, converts it to UTC. It is equivalent to parsing a string, and then calling the `DateTimeOffset.ToUniversalTime` method of the returned `DateTimeOffset` object.|
|`AssumeLocal`|If the matched element in `formats` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the offset of the local time zone. This is the default value.|
|`AssumeUniversal`|If the matched element in `formats` does not require that `input` contain an offset value, the returned `DateTimeOffset` object is given the UTC offset (+00:00).|
|`AllowInnerWhite`|Allows `input` to include inner white space not specified by the elements in `formats`. Extra white space can appear between date and time components and within individual components (except for the offset) and is ignored when parsing the string.|
|`AllowLeadingWhite`|Allows `input` to include leading spaces not specified by the elements in `formats`. These are ignored when parsing the string.|
|`AllowTrailingWhite`|Allows `input` to include trailing spaces not specified by the elements in `formats`. These are ignored when parsing the string.|
|`AllowWhiteSpaces`|Allows `input` to include leading, trailing, and inner spaces not specified by the elements in `formats`. All extra white-space characters not specified in the matched element in `formats` are ignored when parsing the string.|
|`None`|Indicates that additional white space is not permitted in `input`. White space must appear exactly as specified in a particular element in `formats` for a successful match to occur. This is the default behavior.|
|`RoundtripKind`|Has no effect because the `DateTimeOffset` structure does not include a `Kind` property.|
