---
title: "DateTimeOffset struct (part 10 of 15)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTimeOffset.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeOffset struct (part 10 of 15)

## DateTimeOffset.ParseExact(String, String[], IFormatProvider, DateTimeStyles) method

```csharp
public static DateTimeOffset ParseExact (string input, string[] formats, IFormatProvider? formatProvider, System.Globalization.DateTimeStyles styles);
```

Converts the specified string representation of a date and time to its `DateTimeOffset` equivalent using the specified formats, culture-specific format information, and style. The format of the string representation must match one of the specified formats exactly.

Parameters:

- `input`: A string that contains a date and time to convert.
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
- `ArgumentNullException`: `input` is `null`.
- `FormatException`: `input` is an empty string ("").

-or-

`input` does not contain a valid string representation of a date and time.

-or-

No element of `formats` contains a valid format specifier.

-or-

The hour component and the AM/PM designator in `input` do not agree.

#### Remarks
The `ParseExact` method parses the string representation of a date that matches any one of the patterns assigned to the `formats` parameter. If the `input` string does not match any one of these patterns with any of the variations defined by the `styles` parameter, the method throws a `FormatException`. Aside from comparing `input` to multiple formatting patterns, this overload behaves identically to the `ParseExact` method.

The `formats` parameter is a string array whose elements contain either a single standard format specifier or one or more custom format specifiers that define the possible pattern of the `input` parameter. When the method is called, `input` must match one of these patterns. For details about valid formatting codes, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. If the matched element in `formats` includes the `z`, `zz`, or `zzz` custom format specifiers to indicate that an offset must be present in `input`, that offset must include either a negative sign or a positive sign. If the sign is missing, the method throws a `FormatException`.

> **Important:**
>  Using the `formats` parameter of this overload to specify multiple formats can help reduce the frustration many users experience when they enter dates and times. In particular, the ability to define multiple input patterns enables an application to handle date and time representations that can either include or lack leading zeros in months, days, hours, minutes, and seconds. The example provides an illustration of this.

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

#### Examples
The following example defines multiple input formats for the string representation of a date and time and offset value, and then passes the string that is entered by the user to the `ParseExact` method.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/ParseExact/ParseExact.cs._

## DateTimeOffset.Subtract(DateTimeOffset) method

```csharp
public TimeSpan Subtract (DateTimeOffset value);
```

Subtracts a `DateTimeOffset` value that represents a specific date and time from the current `DateTimeOffset` object.

Parameters:

- `value`: An object that represents the value to subtract.

Returns: An object that specifies the interval between the two `DateTimeOffset` objects.

#### Remarks
This method converts both `DateTimeOffset` objects to Coordinated Universal Time (UTC) before calculating the time interval that separates them. This removes any effect that different offsets from UTC may have on the comparison.

> **Note:**
>  For languages that support custom operators, you can also perform date and time subtraction by using the subtraction operator. For details, see the `DateTimeOffset.op_Subtraction` method.

Because neither the current `DateTimeOffset` object nor the `value` parameter represent the date and time in a specific time zone, the `Subtract` method does not consider a particular time zone's adjustment rules when it subtracts dates and times.

#### Examples
The following example illustrates subtraction that uses the `Subtract` method.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.Subtract(TimeSpan) method

```csharp
public DateTimeOffset Subtract (TimeSpan value);
```

Subtracts a specified time interval from the current `DateTimeOffset` object.

Parameters:

- `value`: The time interval to subtract.

Returns: An object that is equal to the date and time represented by the current `DateTimeOffset` object, minus the time interval represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTimeOffset` value is less than <see cref="F:System.DateTimeOffset.MinValue">DateTimeOffset.MinValue</see>.

-or-

The resulting `DateTimeOffset` value is greater than <see cref="F:System.DateTimeOffset.MaxValue">DateTimeOffset.MaxValue</see>.

#### Remarks
You can use the `DateTimeOffset.Subtract` method to subtract more than one kind of time interval (days, hours, minutes, seconds, or milliseconds) in a single operation. Its behavior is identical to the `op_Subtraction` method, which defines the subtraction operator. The `DateTimeOffset` structure also supports specialized addition methods (such as `DateTimeOffset.AddDays`, `DateTimeOffset.AddHours`, and `DateTimeOffset.AddMinutes`) that allow you to perform subtraction by assigning a negative value to the method parameter.

> **Note:**
>  This method returns a new `DateTimeOffset` object. It does not modify the value of the current object by subtracting `value` from its date and time.

The `DateTimeOffset.Subtract` method does not affect the value of the `DateTimeOffset` object's `Offset` property. The returned `DateTimeOffset` object has the same offset as the original object.

Because the current `DateTimeOffset` object does not represent the date and time in a specific time zone, the `Subtract` method does not consider a particular time zone's adjustment rules when it performs the subtraction.

#### Examples
The following example illustrates subtraction that uses the `DateTimeOffset.Subtract` method.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._

## DateTimeOffset.System.IComparable.CompareTo(Object) method

```csharp
int IComparable.CompareTo (object obj);
```

Compares the value of the current `DateTimeOffset` object with another object of the same type.

Parameters:

- `obj`: The object to compare with the current `DateTimeOffset` object.

Returns: A 32-bit signed integer that indicates whether the current `DateTimeOffset` object is less than, equal to, or greater than `obj`. The return values of the method are interpreted as follows:

-  Less than zero

:  The current `DateTimeOffset` object is less than (earlier than) `obj`.

-  Zero

:  The current `DateTimeOffset` object is equal to (the same point in time as) `obj`.

-  Greater than zero

:  The current `DateTimeOffset` object is greater than (later than) `obj`.

To be added.

## DateTimeOffset.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Runs when the deserialization of an object has been completed.

Parameters:

- `sender`: The object that initiated the callback. The functionality for this parameter is not currently implemented.

To be added.

## DateTimeOffset.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data required to serialize the current `DateTimeOffset` object.

Parameters:

- `info`: The object to populate with data.
- `context`: The destination for this serialization (see `StreamingContext`).

Exceptions:

- `ArgumentNullException`: The `info` parameter is `null`.

To be added.

## DateTimeOffset.ToFileTime() method

```csharp
public long ToFileTime ();
```

Converts the value of the current `DateTimeOffset` object to a Windows file time.

Returns: The value of the current `DateTimeOffset` object, expressed as a Windows file time.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting file time would represent a date and time before midnight on January 1, 1601 C.E. Coordinated Universal Time (UTC).

#### Remarks
A Windows file time is a 64-bit value that represents the number of 100-nanosecond intervals that have elapsed since 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC). Windows uses a file time to record when an application creates, accesses, or writes to a file.

The `DateTimeOffset.ToFileTime` method converts the current `DateTimeOffset` object's date and time to UTC before it performs the conversion. In other words, calling the `DateTimeOffset.ToFileTime` method is equivalent to the following method call:

```csharp
this.ToUtcDateTime().ToFileTime();
```

```vb
Me.ToUtcDateTime().ToFileTime()
```

## DateTimeOffset.ToLocalTime() method

```csharp
public DateTimeOffset ToLocalTime ();
```

Converts the current `DateTimeOffset` object to a `DateTimeOffset` object that represents the local time.

Returns: An object that represents the date and time of the current `DateTimeOffset` object converted to local time.

#### Remarks
In performing the conversion to local time, the method first converts the current `DateTimeOffset` object's date and time to Coordinated Universal Time (UTC) by subtracting the offset from the time. It then converts the UTC date and time to local time by adding the local time zone offset. In doing this, it takes account of any adjustment rules for the local time zone.

Both the value of the current `DateTimeOffset` object and the value of the `DateTimeOffset` object returned by the method call represent the same point in time. That is, if both are passed to the `Equals` method, the method will return `true`.

If the conversion causes a time that is out of range of the `DateTimeOffset` type, the `DateTimeOffset.ToLocalTime` method returns a `DateTimeOffset` object that has the date and time set to either `MaxValue` or `MinValue` and the offset set to the local time zone offset.

#### Examples
The following example uses the `DateTimeOffset.ToLocalTime` method to convert a `DateTimeOffset` value to local time in the Pacific Standard Time zone. It also illustrates the method's support for the local time zone's adjustment rules.

_Code sample not included: ~/snippets/csharp/System/DateTimeOffset/Add/Methods.cs._
