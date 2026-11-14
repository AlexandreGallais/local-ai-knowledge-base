---
title: "DateTimeFormatInfo class (part 6 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeFormatInfo class (part 6 of 7)

## DateTimeFormatInfo.UniversalSortableDateTimePattern property

```csharp
public string UniversalSortableDateTimePattern { get; }
```

Gets the custom format string for a universal, sortable date and time string, as defined by ISO 8601.

Returns: The custom format string for a universal, sortable date and time string.

#### Remarks
The `UniversalSortableDateTimePattern` property defines the format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "u" standard format string. It can be used to display dates and times in a sortable order with the universal time designator "Z" at the end. The format is sortable because it uses leading zeros for year, month, day, hour, minute, and second. The custom format string ("yyyy'-'MM'-'dd HH':'mm':'ss'Z'") is the same regardless of culture or format provider.

The format string returned by the `UniversalSortableDateTimePattern` property reflects a defined standard, and the property is read-only. Therefore, it is always the same, regardless of the culture. The custom format string is "yyyy'-'MM'-'dd HH':'mm':'ss'Z'".

#### Examples
The following example displays the value of `DateTimeFormatInfo.UniversalSortableDateTimePattern` for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/UniversalSortableDateTimePattern/dtfi_universalsortabledatetimepattern.cs._

## DateTimeFormatInfo.YearMonthPattern property

```csharp
public string YearMonthPattern { get; set; }
```

Gets or sets the custom format string for a year and month value.

Returns: The custom format string for a year and month value.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `YearMonthPattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "y" and "Y" standard format strings.

This property is affected if the value of the `Calendar` property changes.

We recommend that you set the date separator in the year month pattern to an exact string instead of using the date separator placeholder. For example, to get the pattern MM-yyyy, set the year month pattern to "MM-yyyy".

#### Examples
The following example displays the value of `DateTimeFormatInfo.YearMonthPattern` for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/YearMonthPattern/dtfi_yearmonthpattern.cs._

## DateTimeFormatInfo.Clone() method

```csharp
public object Clone ();
```

Creates a shallow copy of the `DateTimeFormatInfo`.

Returns: A new `DateTimeFormatInfo` object copied from the original `DateTimeFormatInfo`.

#### Remarks
The clone is writable even if the original `DateTimeFormatInfo` object is read-only. Therefore, the properties of the clone can be modified with user-defined patterns.

A shallow copy of an object is a copy of the object only. If the object contains references to other objects, the shallow copy does not create copies of the referred objects. It refers to the original objects instead. In contrast, a deep copy of an object creates a copy of the object and a copy of everything directly or indirectly referenced by that object.

## DateTimeFormatInfo.GetAbbreviatedDayName(DayOfWeek) method

```csharp
public string GetAbbreviatedDayName (DayOfWeek dayofweek);
```

Returns the culture-specific abbreviated name of the specified day of the week based on the culture associated with the current `DateTimeFormatInfo` object.

Parameters:

- `dayofweek`: A `DayOfWeek` value.

Returns: The culture-specific abbreviated name of the day of the week represented by `dayofweek`.

Exceptions:

- `ArgumentOutOfRangeException`: `dayofweek` is not a valid `DayOfWeek` value.

#### Remarks
For the default invariant `DateTimeFormatInfo` object, this method returns a string from the `GregorianCalendar`:

| `dayofweek` | Return value |
|-------------|--------------|
| Sunday      | "Sun"        |
| Monday      | "Mon"        |
| Tuesday     | "Tue"        |
| Wednesday   | "Wed"        |
| Thursday    | "Thu"        |
| Friday      | "Fri"        |
| Saturday    | "Sat"        |

## DateTimeFormatInfo.GetAbbreviatedEraName(Int32) method

```csharp
public string GetAbbreviatedEraName (int era);
```

Returns the string containing the abbreviated name of the specified era, if an abbreviation exists.

Parameters:

- `era`: The integer representing the era.

Returns: A string containing the abbreviated name of the specified era, if an abbreviation exists.

-or-

A string containing the full name of the era, if an abbreviation does not exist.

Exceptions:

- `ArgumentOutOfRangeException`: `era` does not represent a valid era in the calendar specified in the `DateTimeFormatInfo.Calendar` property.

#### Remarks
The era name is the name a calendar uses to refer to a period of time reckoned from a fixed point or event. For example, "A.D." or "C.E." is the current era in the Gregorian calendar.

The valid values for `era` are listed in the `Eras` property of the appropriate class derived from `Calendar`. For example: `JapaneseCalendar.Eras` displays a list of eras that are supported by this implementation.

In the `JapaneseCalendar` class, the abbreviated era name is the first character of the full era name. This character is either the single-character case-insensitive Latin alphabet abbreviation or the single-character Kanji abbreviation.

## DateTimeFormatInfo.GetAbbreviatedMonthName(Int32) method

```csharp
public string GetAbbreviatedMonthName (int month);
```

Returns the culture-specific abbreviated name of the specified month based on the culture associated with the current `DateTimeFormatInfo` object.

Parameters:

- `month`: An integer from 1 through 13 representing the name of the month to retrieve.

Returns: The culture-specific abbreviated name of the month represented by `month`.

Exceptions:

- `ArgumentOutOfRangeException`: `month` is less than 1 or greater than 13.

#### Remarks
For the default invariant `DateTimeFormatInfo` object, this method returns a string from the `GregorianCalendar` object.

| `month` | Return value |
|---------|--------------|
| 1       | "Jan"        |
| 2       | "Feb"        |
| 3       | "Mar"        |
| 4       | "Apr"        |
| 5       | "May"        |
| 6       | "Jun"        |
| 7       | "Jul"        |
| 8       | "Aug"        |
| 9       | "Sep"        |
| 10      | "Oct"        |
| 11      | "Nov"        |
| 12      | "Dec"        |
| 13      | ""           |

`Calendar` objects can accommodate calendars with 13 months. For 12-month calendars, the empty string is always returned as the name of the 13th month.

## DateTimeFormatInfo.GetAllDateTimePatterns() method

```csharp
public string[] GetAllDateTimePatterns ();
```

Returns all the standard patterns in which date and time values can be formatted.

Returns: An array that contains the standard patterns in which date and time values can be formatted.

#### Remarks
This method returns an array that contains all custom format strings that correspond to standard format strings. See Standard Date and Time Format Strings for a list of the standard format strings.

You can use the custom format strings in the array returned by the `DateTimeFormatInfo.GetAllDateTimePatterns` method in formatting operations. However, if you do, the string representation of a date and time value returned in that formatting operation cannot always be parsed successfully by the `Parse` and `TryParse` methods. Therefore, you cannot assume that the custom format strings returned by the `DateTimeFormatInfo.GetAllDateTimePatterns` method can be used to round-trip date and time values. The following example illustrates this problem. It retrieves a `DateTimeFormatInfo` object that contains formatting information for the Italy (Italian) culture. It passes each custom format string in the array returned by the `GetAllDateTimePatterns` method to the `ToString` method to create the string representation of a date and time. This example then attempts to parse this value by calling the `TryParse` method. As the output from the example shows, some of the custom format strings do not produce a date and time value that successfully round-trips.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetAllDateTimePatterns/getalldatetimepatternsex1.cs._

To parse the string representation of a date and time that can be expressed in a number of predefined custom formats, call one of the following methods:

-   `ParseExact`

-   `ParseExact`

-   `TryParseExact`

-   `TryParseExact`

The custom format strings in the array returned by the `DateTimeFormatInfo.GetAllDateTimePatterns` method depends on the current calendar of the culture for which the `DateTimeFormatInfo` object supplies formatting information. If the calendar changes, the array returned by this method also changes.

#### Examples
The following example displays the date and time format strings for the invariant culture, as well as the result string that is produced when that format string is used to format a particular date.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetAllDateTimePatterns/getalldatetimepatternsinv.cs._

The example instantiates a `DateTimeFormatInfo` object that represents the invariant culture by calling the `DateTimeFormatInfo.%23ctor` constructor. It could also retrieve a `DateTimeFormatInfo` that represents the invariant culture from the `InvariantInfo` property.

## DateTimeFormatInfo.GetAllDateTimePatterns(Char) method

```csharp
public string[] GetAllDateTimePatterns (char format);
```

Returns all the patterns in which date and time values can be formatted using the specified standard format string.

Parameters:

- `format`: A standard format string.

Returns: An array containing the standard patterns in which date and time values can be formatted using the specified format string.

Exceptions:

- `ArgumentException`: `format` is not a valid standard format string.

#### Remarks
This method returns an array containing the custom format strings that correspond to a particular standard format string. See Standard Date and Time Format Strings for a list of the standard format strings.

You can use the custom format strings in the array returned by the `DateTimeFormatInfo.GetAllDateTimePatterns` method in formatting operations. However, if you do, the string representation of a date and time value returned in that formatting operation cannot always be parsed successfully by the `Parse` and `TryParse` methods. Therefore, you cannot assume that the custom format strings returned by the `DateTimeFormatInfo.GetAllDateTimePatterns` method can be used to round-trip date and time values. The following example illustrates this problem. It retrieves a `DateTimeFormatInfo` object that contains formatting information for the Russia (Russian) culture. It calls the `GetAllDateTimePatterns` method for each standard format string, and then passes each custom format string in the returned array to the `ToString` method to create the string representation of a date and time. This example then attempts to parse this value by calling the `TryParse` method. As the output from the example shows, some of the custom format strings do not produce a date and time value that successfully round-trips.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetAllDateTimePatterns/getalldatetimepatternsex2.cs._

To parse the string representation of a date and time that can be expressed in a number of predefined custom formats, call one of the following methods:

-   `ParseExact`

-   `ParseExact`

-   `TryParseExact`

-   `TryParseExact`

The custom format strings in the array returned by the `DateTimeFormatInfo.GetAllDateTimePatterns` method depends on the current calendar of the culture for which the `DateTimeFormatInfo` object supplies formatting information. If the calendar changes, the array returned by this method also changes.

#### Examples
The following example displays the date and time patterns for the current calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetAllDateTimePatterns/source.cs._

## DateTimeFormatInfo.GetDayName(DayOfWeek) method

```csharp
public string GetDayName (DayOfWeek dayofweek);
```

Returns the culture-specific full name of the specified day of the week based on the culture associated with the current `DateTimeFormatInfo` object.

Parameters:

- `dayofweek`: A `DayOfWeek` value.

Returns: The culture-specific full name of the day of the week represented by `dayofweek`.

Exceptions:

- `ArgumentOutOfRangeException`: `dayofweek` is not a valid `DayOfWeek` value.

#### Remarks
For the default invariant `DateTimeFormatInfo` object, this method returns a string from the `GregorianCalendar` object.

| `dayofweek` | Return value |
|-------------|--------------|
| Sunday      | "Sunday"     |
| Monday      | "Monday"     |
| Tuesday     | "Tuesday"    |
| Wednesday   | "Wednesday"  |
| Thursday    | "Thursday"   |
| Friday      | "Friday"     |
| Saturday    | "Saturday"   |

## DateTimeFormatInfo.GetEra(String) method

```csharp
public int GetEra (string eraName);
```

Returns the integer representing the specified era.

Parameters:

- `eraName`: The string containing the name of the era.

Returns: The integer representing the era, if `eraName` is valid; otherwise, -1.

Exceptions:

- `ArgumentNullException`: `eraName` is `null`.

#### Remarks
The era name is the name a calendar uses to refer to a period of time reckoned from a fixed point or event. For example, "A.D." or "C.E." is the current era in the Gregorian calendar.

The comparison with `eraName` is case-insensitive, for example, "A.D." is equivalent to "a.d.".

`DateTimeFormatInfo.GetEra` ignores punctuation in abbreviated era names, only if the `GregorianCalendar` is selected in `DateTimeFormatInfo.Calendar` and the culture uses "A.D." as the era name, that is, "A.D." is equivalent to "AD".

`DateTimeFormatInfo.GetEra` compares `eraName` with the full era name returned by `DateTimeFormatInfo.GetEraName` and with the abbreviated era name returned by `DateTimeFormatInfo.GetAbbreviatedEraName`.

#### Examples
The following example shows that `DateTimeFormatInfo` ignores the punctuation in the era name, only if the calendar is Gregorian and the culture uses the era name "A.D.".

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/GetEra/gregorian_getera.cs._
