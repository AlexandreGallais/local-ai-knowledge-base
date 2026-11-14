---
title: "DateTimeFormatInfo class (part 7 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeFormatInfo class (part 7 of 7)

## DateTimeFormatInfo.GetEraName(Int32) method

```csharp
public string GetEraName (int era);
```

Returns the string containing the name of the specified era.

Parameters:

- `era`: The integer representing the era.

Returns: A string containing the name of the era.

Exceptions:

- `ArgumentOutOfRangeException`: `era` does not represent a valid era in the calendar specified in the `DateTimeFormatInfo.Calendar` property.

#### Remarks
The era name is the name a calendar uses to refer to a period of time reckoned from a fixed point or event. For example, "A.D." or "C.E." is the current era in the Gregorian calendar.

The valid values for `era` are listed in the `Eras` property of the appropriate class derived from `Calendar`. For example: `JapaneseCalendar.Eras` displays a list of eras that are supported by this implementation.

## DateTimeFormatInfo.GetFormat(Type) method

```csharp
public object? GetFormat (Type? formatType);
```

Returns an object of the specified type that provides a date and time  formatting service.

Parameters:

- `formatType`: The type of the required formatting service.

Returns: The current  object, if `formatType` is the same as the type of the current `DateTimeFormatInfo`; otherwise, `null`.

#### Remarks
The `Format(String, IFormatProvider)` method supported by the base data types invoke this method when the current `DateTimeFormatInfo` object is passed as the `IFormatProvider` parameter. This method implements `IFormatProvider.GetFormat`.

## DateTimeFormatInfo.GetInstance(IFormatProvider) method

```csharp
public static System.Globalization.DateTimeFormatInfo GetInstance (IFormatProvider? provider);
```

Returns the `DateTimeFormatInfo` object associated with the specified `IFormatProvider`.

Parameters:

- `provider`: The `IFormatProvider` that gets the `DateTimeFormatInfo` object.

-or-

`null` to get `DateTimeFormatInfo.CurrentInfo`.

Returns: A `DateTimeFormatInfo` object associated with `IFormatProvider`.

#### Remarks
This method uses the `IFormatProvider.GetFormat` method of `formatProvider` using an `DateTimeFormatInfo` object as the `Type` parameter. If `formatProvider` is `null` or if `IFormatProvider.GetFormat` returns `null`, this method returns `DateTimeFormatInfo.CurrentInfo`.

Your application can get a `DateTimeFormatInfo` object for a specific culture using one of the following methods:

- The `DateTimeFormat` property.
- The `DateTimeFormatInfo.GetInstance` method, where `provider` is a `CultureInfo` object.

A `DateTimeFormatInfo` object can be created only for the invariant culture or for specific cultures, not for neutral cultures.

For more information about the invariant culture, specific cultures, and neutral cultures, see the `CultureInfo` class description.

## DateTimeFormatInfo.GetMonthName(Int32) method

```csharp
public string GetMonthName (int month);
```

Returns the culture-specific full name of the specified month based on the culture associated with the current `DateTimeFormatInfo` object.

Parameters:

- `month`: An integer from 1 through 13 representing the name of the month to retrieve.

Returns: The culture-specific full name of the month represented by `month`.

Exceptions:

- `ArgumentOutOfRangeException`: `month` is less than 1 or greater than 13.

#### Remarks
For the default invariant `DateTimeFormatInfo` object, this method returns a string from the `GregorianCalendar` object.

| `month` | Return value |
|---------|--------------|
| 1       | "January"    |
| 2       | "February"   |
| 3       | "March"      |
| 4       | "April"      |
| 5       | "May"        |
| 6       | "June"       |
| 7       | "July"       |
| 8       | "August"     |
| 9       | "September"  |
| 10      | "October"    |
| 11      | "November"   |
| 12      | "December"   |
| 13      | ""           |

`Calendar` objects can accommodate calendars with 13 months. For 12-month calendars, the empty string is always returned as the name of the 13th month.

## DateTimeFormatInfo.GetShortestDayName(DayOfWeek) method

```csharp
public string GetShortestDayName (DayOfWeek dayOfWeek);
```

Obtains the shortest abbreviated day name for a specified day of the week associated with the current `DateTimeFormatInfo` object.

Parameters:

- `dayOfWeek`: One of the `DayOfWeek` values.

Returns: The abbreviated name of the week that corresponds to the `dayOfWeek` parameter.

Exceptions:

- `ArgumentOutOfRangeException`: `dayOfWeek` is not a value in the `DayOfWeek` enumeration.

#### Examples

The following example demonstrates several methods and properties that specify date and time format patterns, native calendar name, and full and abbreviated month and day names.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetShortestDayName/dtfi1.cs._

## DateTimeFormatInfo.ReadOnly(DateTimeFormatInfo) method

```csharp
public static System.Globalization.DateTimeFormatInfo ReadOnly (System.Globalization.DateTimeFormatInfo dtfi);
```

Returns a read-only `DateTimeFormatInfo` wrapper.

Parameters:

- `dtfi`: The `DateTimeFormatInfo` object to wrap.

Returns: A read-only `DateTimeFormatInfo` wrapper.

Exceptions:

- `ArgumentNullException`: `dtfi` is `null`.

#### Remarks
This wrapper prevents any modifications to `dtfi`.

## DateTimeFormatInfo.SetAllDateTimePatterns(String[], Char) method

```csharp
public void SetAllDateTimePatterns (string[] patterns, char format);
```

Sets the custom date and time format strings that correspond to a specified standard format string.

Parameters:

- `patterns`: An array of custom format strings.
- `format`: The standard format string associated with the custom format strings specified in the `patterns` parameter.

Exceptions:

- `ArgumentException`: `patterns` is `null` or a zero-length array.

-or-

`format` is not a valid standard format string or is a standard format string whose patterns cannot be set.
- `ArgumentNullException`: `patterns` has an array element whose value is `null`.
- `InvalidOperationException`: This `DateTimeFormatInfo` object is read-only.

#### Remarks
The `DateTimeFormatInfo.SetAllDateTimePatterns` method defines the custom format strings that correspond to a particular standard date and time format string. If a call to a date and time formatting method includes the standard date and time format string specified by `format`, the method uses the first element in the `patterns` array to define the format of the resulting string.

> **Warning:**
> The `Parse` and `TryParse` methods do not fully iterate all strings in `patterns` when parsing the string representation of a date and time. If you require a date and time string to have particular formats in a parsing operation, you should pass the array of valid formats to the `ParseExact`, `ParseExact`, `TryParseExact`, or `TryParseExact` method.

You can define custom format strings that correspond to the "d", "D", "t", "T", and "y" or "Y" standard date and time format strings. If the value of `format` is any other standard format string, the `DateTimeFormatInfo.SetAllDateTimePatterns` method throws an `ArgumentException`.

If your custom date and time format strings include date separators, you should explicitly specify a date separator instead of relying on the parsing or formatting method that replaces the "/" custom format specifier with a particular date separator. For example, to obtain the pattern MM-DD-yyyy, use the pattern "MM-DD-yyyy".

#### Examples
The following example instantiates a `CultureInfo` object that represents the "en-US" (English - United States) culture and uses it to parse an array of date and time strings using the "Y" standard format string. It then uses the `DateTimeFormatInfo.SetAllDateTimePatterns` method to associate a new custom format string with the "Y" standard format string, and then attempts to parse the array of date and time strings. Output from the example demonstrates that the new custom format string is used in both the parsing and formatting operations.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/SetAllDateTimePatterns/setalldatetimepatterns.cs._
