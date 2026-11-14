---
title: "DateTime struct (part 9 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 9 of 18)

## DateTime.GetDateTimeFormats(IFormatProvider) method

```csharp
public string[] GetDateTimeFormats (IFormatProvider? provider);
```

Converts the value of this instance to all the string representations supported by the standard date and time format specifiers and the specified culture-specific formatting information.

Parameters:

- `provider`: An object that supplies culture-specific formatting information about this instance.

Returns: A string array where each element is the representation of the value of this instance formatted with one of the standard date and time format specifiers.

#### Remarks
The string array returned by the `GetDateTimeFormats` method is equivalent to combining the string arrays returned by separate calls to the `GetDateTimeFormats` method with the "d", "D", "f", "F", "g", "G", "m", "o", "r", "s", "t", "T", "u", "U", and "y" standard format strings. For more information about standard format specifiers, see Standard Date and Time Format Strings.

Each element of the return value is formatted using culture-specific information supplied by `provider`.

> **Important:**
> Because this method uses culture-sensitive data, you should not assume that multiple calls to the method will return identical data unless `provider` is a `CultureInfo` object that represents the invariant culture. The data returned by this method can change if the user overrides the individual cultural settings of `provider` or if an update occurs to the system's cultural data for `provider`.

#### Examples
The following example demonstrates the `GetDateTimeFormats` method. It displays the string representation of a date using all possible standard date and time formats for the fr-FR culture.

_Code sample not included: ~/snippets/csharp/System/DateTime/GetDateTimeFormats/class1.cs._

The example displays the following output:

```txt
28/07/2009
28/07/09
28.07.09
28-07-09
2009-07-28
mardi 28 juillet 2009
28 juil. 09
28 juillet 2009
mardi 28 juillet 2009 05:23
mardi 28 juillet 2009 5:23
mardi 28 juillet 2009 05.23
mardi 28 juillet 2009 05 h 23
28 juil. 09 05:23
28 juil. 09 5:23
28 juil. 09 05.23
28 juil. 09 05 h 23
28 juillet 2009 05:23
28 juillet 2009 5:23
28 juillet 2009 05.23
28 juillet 2009 05 h 23
mardi 28 juillet 2009 05:23:15
mardi 28 juillet 2009 5:23:15
mardi 28 juillet 2009 05.23
mardi 28 juillet 2009 05 h 23
28 juil. 09 05:23:15
28 juil. 09 5:23:15
28 juil. 09 05.23
28 juil. 09 05 h 23
28 juillet 2009 05:23:15
28 juillet 2009 5:23:15
28 juillet 2009 05.23
28 juillet 2009 05 h 23
28/07/2009 05:23
28/07/2009 5:23
28/07/2009 05.23
28/07/2009 05 h 23
28/07/09 05:23
28/07/09 5:23
28/07/09 05.23
28/07/09 05 h 23
28.07.09 05:23
28.07.09 5:23
28.07.09 05.23
28.07.09 05 h 23
28-07-09 05:23
28-07-09 5:23
28-07-09 05.23
28-07-09 05 h 23
2009-07-28 05:23
2009-07-28 5:23
2009-07-28 05.23
2009-07-28 05 h 23
28/07/2009 05:23:15
28/07/2009 5:23:15
28/07/2009 05.23
28/07/2009 05 h 23
28/07/09 05:23:15
28/07/09 5:23:15
28/07/09 05.23
28/07/09 05 h 23
28.07.09 05:23:15
28.07.09 5:23:15
28.07.09 05.23
28.07.09 05 h 23
28-07-09 05:23:15
28-07-09 5:23:15
28-07-09 05.23
28-07-09 05 h 23
2009-07-28 05:23:15
2009-07-28 5:23:15
2009-07-28 05.23
2009-07-28 05 h 23
28 juillet
28 juillet
2009-07-28T05:23:15.0160000
2009-07-28T05:23:15.0160000
Tue, 28 Jul 2009 05:23:15 GMT
Tue, 28 Jul 2009 05:23:15 GMT
2009-07-28T05:23:15
05:23
5:23
05.23
05 h 23
05:23:15
5:23:15
05.23
05 h 23
2009-07-28 05:23:15Z
mardi 28 juillet 2009 12:23:15
mardi 28 juillet 2009 12:23:15
mardi 28 juillet 2009 12.23
mardi 28 juillet 2009 12 h 23
28 juil. 09 12:23:15
28 juil. 09 12:23:15
28 juil. 09 12.23
28 juil. 09 12 h 23
28 juillet 2009 12:23:15
28 juillet 2009 12:23:15
28 juillet 2009 12.23
28 juillet 2009 12 h 23
juillet 2009
juillet 2009
```

## DateTime.GetDateTimeFormats(Char, IFormatProvider) method

```csharp
public string[] GetDateTimeFormats (char format, IFormatProvider? provider);
```

Converts the value of this instance to all the string representations supported by the specified standard date and time format specifier and culture-specific formatting information.

Parameters:

- `format`: A date and time format string.
- `provider`: An object that supplies culture-specific formatting information about this instance.

Returns: A string array where each element is the representation of the value of this instance formatted with one of the standard date and time format specifiers.

Exceptions:

- `FormatException`: `format` is not a valid standard date and time format specifier character.

#### Remarks
The format parameter can be any of the standard date and time format specifiers. These include d, D, f, F, g, G, M (or m), O (or o), R (or r), s, t, T, u, U, and Y (or y). For more information, see Standard Date and Time Format Strings.

Each element of the return value is formatted using culture-specific information supplied by `provider`.

> **Important:**
> Because this method uses culture-sensitive data, you should not assume that multiple calls to the method will return identical data unless `provider` is a `CultureInfo` object that represents the invariant culture. The data returned by this method can change if the user overrides the individual cultural settings of `provider` or if an update occurs to the system's cultural data for `provider`.

#### Examples
The following example demonstrates the `GetDateTimeFormats` method. It displays the string representations of a date using the short date format specifier ("d") for the fr-FR culture.

_Code sample not included: ~/snippets/csharp/System/DateTime/GetDateTimeFormats/class1.cs._

## DateTime.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## DateTime.GetTypeCode() method

```csharp
public TypeCode GetTypeCode ();
```

Returns the `TypeCode` for value type `DateTime`.

Returns: The enumerated constant, `TypeCode.DateTime`.

To be added.

## DateTime.IsDaylightSavingTime() method

```csharp
public bool IsDaylightSavingTime ();
```

Indicates whether this instance of `DateTime` is within the daylight saving time range for the current time zone.

Returns: `true` if the value of the `DateTime.Kind` property is `DateTimeKind.Local` or `DateTimeKind.Unspecified` and the value of this instance of `DateTime` is within the daylight saving time range for the local time zone; `false` if `DateTime.Kind` is `DateTimeKind.Utc`.

#### Remarks
This method determines whether the current `DateTime` value falls within the daylight saving time range of the local time zone, which is returned by the `Local` property. You can determine whether a time zone supports daylight saving time by retrieving the value of its `SupportsDaylightSavingTime` property. For time zones that observe daylight saving time, you can determine when the transition to and from daylight saving time occurs by retrieving the `AdjustmentRule` array returned by the time zone's `GetAdjustmentRules` property.

If the current `DateTime` value represents either an ambiguous or an invalid time in the local time zone, the method returns `false`.

## DateTime.IsLeapYear(Int32) method

```csharp
public static bool IsLeapYear (int year);
```

Returns an indication whether the specified year is a leap year.

Parameters:

- `year`: A 4-digit year.

Returns: `true` if `year` is a leap year; otherwise, `false`.

Exceptions:

- `ArgumentOutOfRangeException`: `year` is less than 1 or greater than 9999.

#### Remarks
`year` is specified as a 4-digit base 10 number; for example, 1996.

`year` is always interpreted as a year in the Gregorian calendar. To determine whether a particular year was a leap year in some other calendar, call that calendar object's `IsLeapYear` method.

#### Examples
The following example uses the `DateTime.IsLeapYear` method to determine which years between 1994 and 2014 are leap years. The example also illustrates the result when the `DateTime.AddYears` method is used to add a year to a leap day.

_Code sample not included: ~/snippets/csharp/System/DateTime/IsLeapYear/IsLeapYear1.cs._

## DateTime.op_Addition(DateTime, TimeSpan) method

```csharp
public static DateTime operator + (DateTime d, TimeSpan t);
```

Adds a specified time interval to a specified date and time, yielding a new date and time.

Parameters:

- `d`: The date and time value to add.
- `t`: The time interval to add.

Returns: An object that is the sum of the values of `d` and `t`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

The equivalent method for this operator is `Add`

#### Examples
The following example demonstrates the addition operator.

_Code sample not included: ~/snippets/csharp/System/DateTime/op_Addition/class1.cs._

## DateTime.op_Equality(DateTime, DateTime) method

```csharp
public static bool operator == (DateTime d1, DateTime d2);
```

Determines whether two specified instances of `DateTime` are equal.

Parameters:

- `d1`: The first object to compare.
- `d2`: The second object to compare.

Returns: `true` if `d1` and `d2` represent the same date and time; otherwise, `false`.

#### Remarks
The `DateTime.op_Equality` operator determines whether two `DateTime` values are equal by comparing their number of ticks. Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `Kind` property.

The equivalent method for this operator is `Equals`

#### Examples
The following example demonstrates the equality operator.

_Code sample not included: ~/snippets/csharp/System/DateTime/op_Addition/class1.cs._

## DateTime.op_GreaterThan(DateTime, DateTime) method

```csharp
public static bool operator > (DateTime t1, DateTime t2);
```

Determines whether one specified `DateTime` is later than another specified `DateTime`.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: `true` if `t1` is later than `t2`; otherwise, `false`.

#### Remarks
The `DateTime.op_GreaterThan` operator determines the relationship between two `DateTime` values by comparing their number of ticks. Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `Kind` property.

The equivalent method for this operator is `Compare`

## DateTime.op_GreaterThanOrEqual(DateTime, DateTime) method

```csharp
public static bool operator >= (DateTime t1, DateTime t2);
```

Determines whether one specified `DateTime` represents a date and time that is the same as or later than another specified `DateTime`.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: `true` if `t1` is the same as or later than `t2`; otherwise, `false`.

#### Remarks
The `DateTime.op_GreaterThanOrEqual` operator determines the relationship between two `DateTime` values by comparing their number of ticks. Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `Kind` property.

The equivalent method for this operator is `Compare`

## DateTime.op_Inequality(DateTime, DateTime) method

```csharp
public static bool operator != (DateTime d1, DateTime d2);
```

Determines whether two specified instances of `DateTime` are not equal.

Parameters:

- `d1`: The first object to compare.
- `d2`: The second object to compare.

Returns: `true` if `d1` and `d2` do not represent the same date and time; otherwise, `false`.

#### Remarks
The `DateTime.op_Inequality` operator determines whether two `DateTime` values are not equal by comparing their number of ticks. Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `Kind` property.

The equivalent method for this operator is `Equals`

## DateTime.op_LessThan(DateTime, DateTime) method

```csharp
public static bool operator < (DateTime t1, DateTime t2);
```

Determines whether one specified `DateTime` is earlier than another specified `DateTime`.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: `true` if `t1` is earlier than `t2`; otherwise, `false`.

#### Remarks
The `DateTime.op_LessThan` operator determines the relationship between two `DateTime` values by comparing their number of ticks. Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `Kind` property.

The equivalent method for this operator is `Compare`

## DateTime.op_LessThanOrEqual(DateTime, DateTime) method

```csharp
public static bool operator <= (DateTime t1, DateTime t2);
```

Determines whether one specified `DateTime` represents a date and time that is the same as or earlier than another specified `DateTime`.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: `true` if `t1` is the same as or earlier than `t2`; otherwise, `false`.

#### Remarks
The `DateTime.op_LessThanOrEqual` operator determines the relationship between two `DateTime` values by comparing their number of ticks. Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `Kind` property.

The equivalent method for this operator is `Compare`

## DateTime.op_Subtraction(DateTime, DateTime) method

```csharp
public static TimeSpan operator - (DateTime d1, DateTime d2);
```

Subtracts a specified date and time from another specified date and time and returns a time interval.

Parameters:

- `d1`: The date and time value to subtract from (the minuend).
- `d2`: The date and time value to subtract (the subtrahend).

Returns: The time interval between `d1` and `d2`; that is, `d1` minus `d2`.

#### Remarks
The `op_Subtraction` method does not consider the value of the `Kind` property of the two `DateTime` values when performing the subtraction. Before subtracting `DateTime` objects, ensure that the objects represent times in the same time zone. Otherwise, the result will include the difference between time zones.

> **Note:**
> The `op_Subtraction` method does consider the difference between time zones when performing the subtraction.

The equivalent method for this operator is `Subtract`

#### Examples
The following example demonstrates the `DateTime.Subtract` method and the subtraction operator.

_Code sample not included: ~/snippets/csharp/System/DateTime/op_Subtraction/class1.cs._
