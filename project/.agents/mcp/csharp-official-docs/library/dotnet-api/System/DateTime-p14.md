---
title: "DateTime struct (part 14 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 14 of 18)

## DateTime.ToFileTime() method

```csharp
public long ToFileTime ();
```

Converts the value of the current `DateTime` object to a Windows file time.

Returns: The value of the current `DateTime` object expressed as a Windows file time.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting file time would represent a date and time before 12:00 midnight January 1, 1601 C.E. UTC.

#### Remarks
A Windows file time is a 64-bit value that represents the number of 100-nanosecond intervals that have elapsed since 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC). Windows uses a file time to record when an application creates, accesses, or writes to a file.

The `DateTime.ToFileTime` method uses the `Kind` property to determine whether the current `DateTime` object is a local time, a UTC time, or an unspecified kind of time, which is treated as a local time.

#### Examples
The following example demonstrates the `DateTime.ToFileTime` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToFileTime/class1.cs._

## DateTime.ToFileTimeUtc() method

```csharp
public long ToFileTimeUtc ();
```

Converts the value of the current `DateTime` object to a Windows file time.

Returns: The value of the current `DateTime` object expressed as a Windows file time.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting file time would represent a date and time before 12:00 midnight January 1, 1601 C.E. UTC.

#### Remarks
A Windows file time is a 64-bit value that represents the number of 100-nanosecond intervals that have elapsed since 12:00 midnight, January 1, 1601 A.D. (C.E.) Coordinated Universal Time (UTC). Windows uses a file time to record when an application creates, accesses, or writes to a file.

The `DateTime.ToFileTimeUtc` method uses the `Kind` property to determine whether the current `DateTime` object is a local time, a UTC time, or an unspecified kind of time, which is treated as a UTC time. If it is a local time, it converts the time to UTC before performing the conversion to a Windows file time.

## DateTime.ToLocalTime() method

```csharp
public DateTime ToLocalTime ();
```

Converts the value of the current `DateTime` object to local time.

Returns: An object whose `DateTime.Kind` property is `DateTimeKind.Local`, and whose value is the local time equivalent to the value of the current `DateTime` object, or <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see> if the converted value is too large to be represented by a `DateTime` object, or <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if the converted value is too small to be represented as a `DateTime` object.

#### Remarks
The local time is equal to the Coordinated Universal Time (UTC) time plus the UTC offset. For more information about the UTC offset, see `TimeZoneInfo.GetUtcOffset`. The conversion also takes into account the daylight saving time rule that applies to the time represented by the current `DateTime` object.

The value returned by the `DateTime.ToLocalTime` method is determined by the `Kind` property of the current `DateTime` object. The following table describes the possible results.

| Kind                             | Results                                                             |
|----------------------------------|---------------------------------------------------------------------|
| `Utc`  | This instance of `DateTime` is converted to local time. |
| `Local` | No conversion is performed.                                         |
| `Unspecified` | This instance of `DateTime` is assumed to be a UTC time, and the conversion is performed as if `DateTime.Kind` were `Utc`. |

> **Note:**
> The `DateTime.ToLocalTime` method converts a `DateTime` value from UTC to local time. To convert the time in any designated time zone to local time, use the `TimeZoneInfo.ConvertTime` method.

The value returned by the conversion is a `DateTime` whose `Kind` property always returns `Local`. Consequently, a valid result is returned even if `DateTime.ToLocalTime` is applied repeatedly to the same `DateTime`.

#### Examples
The following example demonstrates the `DateTime.ToLocalTime` method. Note that the exact output depends on the current culture and the local time zone of the system on which it is run.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToLocalTime/class1.cs._

The following example uses the `DateTime.SpecifyKind` method to demonstrate how the `Kind` property influences the `DateTime.ToLocalTime` and `DateTime.ToUniversalTime` conversion methods.

_Code sample not included: ~/snippets/csharp/System/DateTime/Kind/ks.cs._

## DateTime.ToLongDateString() method

```csharp
public string ToLongDateString ();
```

Converts the value of the current `DateTime` object to its equivalent long date string representation.

Returns: A string that contains the long date string representation of the current `DateTime` object.

#### Remarks
The value of the current `DateTime` object is formatted using the pattern defined by the `LongDatePattern` property associated with the current culture. The return value is identical to the value returned by specifying the "D" standard DateTime format string with the `ToString` method.

> **Note:**
> The string returned by the `DateTime.ToLongDateString` method is culture-sensitive. It reflects the pattern defined by the current culture's `LongDatePattern` property. For example, for the en-US culture, the standard long date pattern is commonly "dddd, MMMM dd, yyyy"; for the de-DE culture, it is "dddd, d. MMMM yyyy"; for the ja-JP culture, it is "yyyy'年'M'月'd'日'". Note that its value can vary depending on the .NET implementation and its version, the operating system and its version, and user customization.

#### Examples

The following example demonstrates the `DateTime.ToLongDateString` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToLongDateString/sls.cs._

## DateTime.ToLongTimeString() method

```csharp
public string ToLongTimeString ();
```

Converts the value of the current `DateTime` object to its equivalent long time string representation.

Returns: A string that contains the long time string representation of the current `DateTime` object.

#### Remarks

The value of the current `DateTime` object is formatted using the pattern defined by the `LongTimePattern` property associated with the current culture. The return value is identical to the value returned by specifying the "T" standard date and time format string with the `ToString` method.

> **Note:**
> The string returned by the `DateTime.ToLongTimeString` method is culture-sensitive. It reflects the pattern defined by the current culture's `LongTimePattern` property. For example, for the en-US culture, the standard long time pattern is "h:mm:ss tt"; for the de-DE culture, it is "HH:mm:ss"; for the ja-JP culture, it is "H:mm:ss". Note that its value can vary depending on the .NET implementation and its version, the operating system and its version, and user customization.

#### Examples
The following example demonstrates the `DateTime.ToLongTimeString` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToLongTimeString/sls.cs._

## DateTime.ToOADate() method

```csharp
public double ToOADate ();
```

Converts the value of this instance to the equivalent OLE Automation date.

Returns: A double-precision floating-point number that contains an OLE Automation date equivalent to the value of this instance.

Exceptions:

- `OverflowException`: The value of this instance cannot be represented as an OLE Automation Date.

#### Remarks
An OLE Automation date is implemented as a floating-point number whose integral component is the number of days before or after midnight, 30 December 1899, and whose fractional component represents the time on that day divided by 24. For example, midnight, 31 December 1899 is represented by 1.0; 6 A.M., 1 January 1900 is represented by 2.25; midnight, 29 December 1899 is represented by -1.0; and 6 A.M., 29 December 1899 is represented by -1.25.

The base OLE Automation Date is midnight, 30 December 1899. The minimum OLE Automation date is midnight, 1 January 0100. The maximum OLE Automation Date is the same as `MaxValue`, the last moment of 31 December 9999.

The `DateTime.ToOADate` method throws an `OverflowException` if the current instance represents a date that is later than `MaxValue` and earlier than midnight on January1, 0100. However, if the value of the current instance is `MinValue`, the method returns 0.

For more information, see Automation.

## DateTime.ToShortDateString() method

```csharp
public string ToShortDateString ();
```

Converts the value of the current `DateTime` object to its equivalent short date string representation.

Returns: A string that contains the short date string representation of the current `DateTime` object.

#### Remarks
The value of the current `DateTime` object is formatted using the pattern defined by the `ShortDatePattern` property associated with the current culture. The return value is identical to the value returned by specifying the "d" standard DateTime format string with the `ToString` method.

> **Note:**
> The string returned by the `DateTime.ToShortDateString` method is culture-sensitive. It reflects the pattern defined by the current culture's `ShortDatePattern` property. For example, for the en-US culture, the standard short date pattern is "M/d/yyyy"; for the de-DE culture, it is "dd.MM.yyyy"; for the ja-JP culture, it is "yyyy/MM/dd". Note that its value can vary depending on the .NET implementation and its version, the operating system and its version, and user customization.

#### Examples
The following example demonstrates the `DateTime.ToShortDateString` method. It also shows that the result of calling the `DateTime.ToShortDateString` method is identical to calling the `ToString` method with "d" as the format parameter.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToShortDateString/ToShortDateString.cs._

## DateTime.ToShortTimeString() method

```csharp
public string ToShortTimeString ();
```

Converts the value of the current `DateTime` object to its equivalent short time string representation.

Returns: A string that contains the short time string representation of the current `DateTime` object.

#### Remarks

The value of the current `DateTime` object is formatted using the pattern defined by the `ShortTimePattern` property associated with the current culture. The return value is identical to the value returned by specifying the "t" standard DateTime format string with the `ToString` method.

> **Note:**
> The string returned by the `DateTime.ToShortTimeString` method is culture-sensitive. It reflects the pattern defined by the current culture's `ShortTimePattern` property. For example, for the en-US culture, the standard short time pattern is "h:mm tt"; for the de-DE culture, it is "HH:mm"; for the ja-JP culture, it is "H:mm". Note that its value can vary depending on the .NET implementation and its version, the operating system and its version, and user customization.

#### Examples
The following example demonstrates the `DateTime.ToShortTimeString` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToLongDateString/sls.cs._

## DateTime.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current `DateTime` object to its equivalent string representation using the formatting conventions of the current culture.

Returns: A string representation of the value of the current `DateTime` object.

Exceptions:

- `ArgumentOutOfRangeException`: The date and time is outside the range of dates supported by the calendar used by the current culture.

#### Remarks
The value of the current `DateTime` object is formatted using the general date and time format specifier ('G'). To format it using a specific date and time format specifier, call the `ToString` method. To format it using the general date and time format specifier ('G') for a specific culture, call the `ToString` method. To format it using a specific date and time format specifier and the conventions of a specific culture, call the `ToString` method.

This method uses formatting information derived from the current culture. In particular, it combines the custom format strings returned by the `DateTimeFormatInfo.ShortDatePattern` and `DateTimeFormatInfo.LongTimePattern` properties of the `DateTimeFormatInfo` object returned by the `Thread.CurrentThread.CurrentCulture.DateTimeFormat` property. For more information, see `CultureInfo.CurrentCulture`. Other overloads of the `DateTime.ToString` method enable you to specify the culture whose formatting to use and to define the output pattern of the `DateTime` value.

#### Examples

The following example illustrates how the string representation of a `DateTime` value returned by the `ToString` method depends on the thread current culture. It changes the current culture to en-US, fr-FR, and ja-JP, and in each case calls the `ToString` method to return the string representation of a date and time value using that culture.

_Code sample not included: ~/snippets/csharp/System/DateTime/ToString/ToString1.cs._
