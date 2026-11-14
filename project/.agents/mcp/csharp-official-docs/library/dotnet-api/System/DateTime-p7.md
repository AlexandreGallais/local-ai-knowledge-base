---
title: "DateTime struct (part 7 of 18)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DateTime.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTime struct (part 7 of 18)

## DateTime.AddMinutes(Double) method

```csharp
public DateTime AddMinutes (double value);
```

Returns a new `DateTime` that adds the specified number of minutes to the value of this instance.

Parameters:

- `value`: A number of whole and fractional minutes. The `value` parameter can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by this instance and the number of minutes represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation.

The fractional part of `value` is the fractional part of a minute. For example, 4.5 is equivalent to 4 minutes, 30 seconds, 0 milliseconds, and 0 ticks.

The full `Double` precision of the `value` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

#### Examples
The following example uses the `DateTime.AddMinutes` method to add a number of whole and fractional values to a date and time.

_Code sample not included: ~/snippets/csharp/System/DateTime/AddMinutes/addminutes1.cs._

## DateTime.AddMonths(Int32) method

```csharp
public DateTime AddMonths (int months);
```

Returns a new `DateTime` that adds the specified number of months to the value of this instance.

Parameters:

- `months`: A number of months. The `months` parameter can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by this instance and `months`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

-or-

`months` is less than -120,000 or greater than 120,000.

#### Remarks
This method does not change the value of this `DateTime` object. Instead, it returns a new `DateTime` object whose value is the result of this operation.

The `DateTime.AddMonths` method calculates the resulting month and year, taking into account leap years and the number of days in a month, then adjusts the day part of the resulting `DateTime` object. If the resulting day is not a valid day in the resulting month, the last valid day of the resulting month is used. For example, March 31st + 1 month = April 30th, and March 31st - 1 month = February 28 for a non-leap year and February 29 for a leap year.

The time-of-day part of the resulting `DateTime` object remains the same as this instance.

#### Examples
The following example adds between zero and fifteen months to the last day of December, 2015. In this case, the AddMonths method returns the date of the last day of each month, and successfully handles leap years.

_Code sample not included: ~/snippets/csharp/System/DateTime/AddMonths/addmonths1.cs._

## DateTime.AddSeconds(Double) method

```csharp
public DateTime AddSeconds (double value);
```

Returns a new `DateTime` that adds the specified number of seconds to the value of this instance.

Parameters:

- `value`: A number of whole and fractional seconds. The `value` parameter can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by this instance and the number of seconds represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation.

The fractional part of `value` is the fractional part of a second. For example, 4.5 is equivalent to 4 seconds, 500 milliseconds, and 0 ticks.

The full `Double` precision of the `value` parameter is used. However, due to the inherent imprecision of floating point math, the resulting precision will vary.

#### Examples
The following example uses the `DateTime.AddSeconds` method to add 30 seconds and the number of seconds in one day to a `DateTime` value. It then displays each new value and displays the difference between it and the original value. The difference is displayed both as a time span and as a number of ticks.

_Code sample not included: ~/snippets/csharp/System/DateTime/AddSeconds/addseconds1.cs._

## DateTime.AddTicks(Int64) method

```csharp
public DateTime AddTicks (long value);
```

Returns a new `DateTime` that adds the specified number of ticks to the value of this instance.

Parameters:

- `value`: A number of 100-nanosecond ticks. The `value` parameter can be positive or negative.

Returns: An object whose value is the sum of the date and time represented by this instance and the time represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: The resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method does not change the value of this `DateTime`. Instead, it returns a new `DateTime` whose value is the result of this operation.

## DateTime.AddYears(Int32) method

```csharp
public DateTime AddYears (int value);
```

Returns a new `DateTime` that adds the specified number of years to the value of this instance.

Parameters:

- `value`: A number of years. The `value` parameter can be negative or positive.

Returns: An object whose value is the sum of the date and time represented by this instance and the number of years represented by `value`.

Exceptions:

- `ArgumentOutOfRangeException`: `value` or the resulting `DateTime` is less than <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> or greater than <see cref="F:System.DateTime.MaxValue">DateTime.MaxValue</see>.

#### Remarks
This method does not change the value of this `DateTime` object. Instead, it returns a new `DateTime` object whose value is the result of this operation.

The `DateTime.AddYears` method calculates the resulting year taking into account leap years. The month and time-of-day part of the resulting `DateTime` object remains the same as this instance.

If the current instance represents the leap day in a leap year, the return value depends on the target date:

- If `value` + `DateTime.Year` is also a leap year, the return value represents the leap day in that year. For example, if four years is added to February 29, 2012, the date returned is February 29, 2016.

- If `value` + `DateTime.Year` is not a leap year, the return value represents the day before the leap day in that year. For example, if one year is added to February 29, 2012, the date returned is February 28, 2013.

The following example illustrates using the `DateTime.AddYears` method with a `DateTime` value that represents a leap year day. It displays the date for the fifteen years prior to and the fifteen years that follow February 29, 2000.

_Code sample not included: ~/snippets/csharp/System/DateTime/AddYears/addyears1.cs._

## DateTime.Compare(DateTime, DateTime) method

```csharp
public static int Compare (DateTime t1, DateTime t2);
```

Compares two instances of `DateTime` and returns an integer that indicates whether the first instance is earlier than, the same as, or later than the second instance.

Parameters:

- `t1`: The first object to compare.
- `t2`: The second object to compare.

Returns: A signed number indicating the relative values of `t1` and `t2`.

-  Less than zero

: `t1` is earlier than `t2`.

-  Zero

: `t1` is the same as `t2`.

-  Greater than zero

: `t1` is later than `t2`.

#### Remarks
To determine the relationship of `t1` to `t2`, the `DateTime.Compare` method compares the `Ticks` property of `t1` and `t2` but ignores their `Kind` property. Before comparing `DateTime` objects, ensure that the objects represent times in the same time zone.

#### Examples

The following example demonstrates the `DateTime.Compare` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/Compare/compare1.cs._

## DateTime.CompareTo(DateTime) method

```csharp
public int CompareTo (DateTime value);
```

Compares the value of this instance to a specified `DateTime` value and returns an integer that indicates whether this instance is earlier than, the same as, or later than the specified `DateTime` value.

Parameters:

- `value`: The object to compare to the current instance.

Returns: A signed number indicating the relative values of this instance and the `value` parameter.

-  Less than zero

:  This instance is earlier than `value`.

-  Zero

:  This instance is the same as `value`.

-  Greater than zero

:  This instance is later than `value`.

#### Remarks
To determine the relationship of the current instance to `value`, the `DateTime.CompareTo` method compares the `Ticks` property of the current instance and `value` but ignores their `Kind` property.  Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `DateTime.Kind` properties.

This method implements the `IComparable<T>` interface and performs slightly better than the `CompareTo` method overload because it does not have to convert the `value` parameter to an object.

#### Examples
The following example instantiates three `DateTime` objects, one that represents today's date, another that represents the date one year previously, and a third that represents the date one year in the future. It then calls the `CompareTo` method and displays the result of the comparison.

_Code sample not included: ~/snippets/csharp/System/DateTime/CompareTo/CompareTo_CS1_24564.cs._

## DateTime.CompareTo(Object) method

```csharp
public int CompareTo (object? value);
```

Compares the value of this instance to a specified object that contains a specified `DateTime` value, and returns an integer that indicates whether this instance is earlier than, the same as, or later than the specified `DateTime` value.

Parameters:

- `value`: A boxed object to compare, or `null`.

Returns: A signed number indicating the relative values of this instance and `value`.

-  Less than zero

:  This instance is earlier than `value`.

-  Zero

:  This instance is the same as `value`.

-  Greater than zero

:  This instance is later than `value`, or `value` is `null`.

Exceptions:

- `ArgumentException`: `value` is not a `DateTime`.

#### Remarks
To determine the relationship of the current instance to `value`, the `DateTime.CompareTo` method compares the `Ticks` property of the current instance and `value` but ignores their `Kind` property. Before comparing `DateTime` objects, make sure that the objects represent times in the same time zone. You can do this by comparing the values of their `DateTime.Kind` properties.

Any instance of `DateTime`, regardless of its value, is considered greater than `null`.

#### Examples
The following example demonstrates the `DateTime.CompareTo` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/CompareTo/class1.cs._

## DateTime.DaysInMonth(Int32, Int32) method

```csharp
public static int DaysInMonth (int year, int month);
```

Returns the number of days in the specified month and year.

Parameters:

- `year`: The year.
- `month`: The month (a number ranging from 1 to 12).

Returns: The number of days in `month` for the specified `year`.

For example, if `month` equals 2 for February, the return value is 28 or 29 depending upon whether `year` is a leap year.

Exceptions:

- `ArgumentOutOfRangeException`: `month` is less than 1 or greater than 12.

-or-

`year` is less than 1 or greater than 9999.

#### Remarks
The `DateTime.DaysInMonth` method always interprets `month` and `year` as the month and year of the Gregorian calendar even if the Gregorian calendar is not the current culture's current calendar. To get the number of days in a specified month of a particular calendar, call that calendar's `Calendar.GetDaysInMonth` method.

#### Examples
The following example demonstrates how to use the `DateTime.DaysInMonth` method to determine the number of days in July 2001, February 1998 (a non-leap year), and February 1996 (a leap year).

_Code sample not included: ~/snippets/csharp/System/DateTime/DaysInMonth/class1.cs._

The following example displays the number of days in each month of a year specified in an integer array.

_Code sample not included: ~/snippets/csharp/System/DateTime/DaysInMonth/daysinmonth3.cs._

## DateTime.Deconstruct(DateOnly, TimeOnly) method

```csharp
public void Deconstruct (out DateOnly date, out TimeOnly time);
```

Deconstructs this `DateTime` instance by `DateOnly` and `TimeOnly`.

Parameters:

- `date`: When this method returns, represents the `System.DateOnly` value of this `DateTime` instance.
- `time`: When this method returns, represents the `System.TimeOnly` value of this `DateTime` instance.

To be added.

## DateTime.Deconstruct(Int32, Int32, Int32) method

```csharp
public void Deconstruct (out int year, out int month, out int day);
```

Deconstructs this `DateOnly` instance by `DateTime.Year`, `DateTime.Month`, and `DateTime.Day`.

Parameters:

- `year`: When this method returns, represents the `DateTime.Year` value of this `DateTime` instance.
- `month`: When this method returns, represents the `DateTime.Month` value of this `DateTime` instance.
- `day`: When this method returns, represents the `DateTime.Day` value of this `DateTime` instance.

To be added.

## DateTime.Equals(DateTime) method

```csharp
public bool Equals (DateTime value);
```

Returns a value indicating whether the value of this instance is equal to the value of the specified `DateTime` instance.

Parameters:

- `value`: The object to compare to this instance.

Returns: `true` if the `value` parameter equals the value of this instance; otherwise, `false`.

#### Remarks
The current instance and `value` are equal if their `Ticks` property values are equal. Their `Kind` property values are not considered in the test for equality.

This method implements the `IEquatable<T>` interface, and performs slightly better than the `DateTime.Equals` method because the `value` parameter does not have to be converted to an object.

#### Examples
The following example demonstrates the `DateTime.Equals` method.

_Code sample not included: ~/snippets/csharp/System/DateTime/Equals/sample.cs._
