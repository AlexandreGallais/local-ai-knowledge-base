---
title: "DateTimeFormatInfo class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeFormatInfo class (part 3 of 7)

The parsing methods implicitly or explicitly use a `DateTimeStyles` enumeration value to determine which style elements (such as leading, trailing, or inner white space) can be present in the string to be parsed, and how to interpret the parsed string or any missing elements. If you don't provide a `DateTimeStyles` value when you call the `Parse` or `TryParse` method, the default is `AllowWhiteSpaces`, which is a composite style that includes the `AllowLeadingWhite`, `AllowTrailingWhite`, and `AllowInnerWhite` flags. For the `ParseExact` and `TryParseExact` methods, the default is `None`; the input string must correspond precisely to a particular custom date and time format string.

The parsing methods also implicitly or explicitly use a `DateTimeFormatInfo` object that defines the specific symbols and patterns that can occur in the string to be parsed. If you don't provide a `DateTimeFormatInfo` object, the `DateTimeFormatInfo` object for the current culture is used by default. For more information about parsing date and time strings, see the individual parsing methods, such as `DateTime.Parse`, `DateTime.TryParse`, `DateTimeOffset.ParseExact`, and `DateTimeOffset.TryParseExact`.

The following example illustrates the culture-sensitive nature of parsing date and time strings. It tries to parse two date strings by using the conventions of the en-US, en-GB, fr-FR, and fi-FI cultures. The date that is interpreted as 8/18/2014 in the en-US culture throws a `FormatException` exception in the other three cultures because 18 is interpreted as the month number. 1/2/2015 is parsed as the second day of the first month in the en-US culture, but as the first day of the second month in the remaining cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/parse1.cs._
Date and time strings are typically parsed for two reasons:

- To convert user input into a date and time value.
- To round-trip a date and time value; that is, to deserialize a date and time value that was previously serialized as a string.

The following sections discuss these two operations in greater detail.

#### Parse user strings

When you parse date and time strings input by the user, you should always instantiate a `DateTimeFormatInfo` object that reflects the user's cultural settings, including any customizations the user may have made. Otherwise, the date and time object may have incorrect values. For information about how to instantiate a `DateTimeFormatInfo` object that reflects user cultural customizations, see the DateTimeFormatInfo and dynamic data section.

The following example illustrates the difference between a parsing operation that reflects user cultural settings and one that does not. In this case, the default system culture is en-US, but the user has used Control Panel, **Region and Language** to change the short date pattern from its default of "M/d/yyyy" to "yy/MM/dd". When the user enters a string that reflects user settings, and the string is parsed by a `DateTimeFormatInfo` object that also reflects user settings (overrides), the parsing operation returns a correct result. However, when the string is parsed by a `DateTimeFormatInfo` object that reflects standard en-US cultural settings, the parsing method throws a `FormatException` exception because it interprets 14 as the number of the month, not the last two digits of the year.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/parse2.cs._
#### Serialize and deserialize date and time data

Serialized date and time data are expected to round-trip; that is, all serialized and deserialized values should be identical. If a date and time value represents a single moment in time, the deserialized value should represent the same moment in time regardless of the culture or time zone of the system on which it was restored. To round-trip date and time data successfully, you must use the conventions of the invariant culture, which is returned by the `InvariantInfo` property, to generate and parse the data. The formatting and parsing operations should never reflect the conventions of the default culture. If you use default cultural settings, the portability of the data is strictly limited; it can be successfully deserialized only on a thread whose cultural-specific settings are identical to those of the thread on which it was serialized. In some cases, this means that the data cannot even be successfully serialized and deserialized on the same system.

If the time component of a date and time value is significant, it should also be converted to UTC and serialized by using the "o" or "r" standard format string. The time data can then be restored by calling a parsing method and passing it the appropriate format string along with the invariant culture as the `provider` argument.

The following example illustrates the process of round-tripping a date and time value. It serializes a date and time on a system that observes U.S. Pacific time and whose current culture is en-US.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/serialize1.cs._
It deserializes the data on a system in the Brussels, Copenhagen, Madrid and Paris time zone and whose current culture is fr-FR. The restored date is nine hours later than the original date, which reflects the time zone adjustment from eight hours behind UTC to one hour ahead of UTC. Both the original date and the restored date represent the same moment in time.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/serialize2.cs._
The following example uses reflection to get the properties of the `DateTimeFormatInfo` object for the English (United States) culture. It displays the value of those properties that contain custom format strings and uses those strings to display formatted dates.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Overview/format1.cs._

## DateTimeFormatInfo.DateTimeFormatInfo() constructor

```csharp
public DateTimeFormatInfo ();
```

Initializes a new writable instance of the `DateTimeFormatInfo` class that is culture-independent (invariant).

#### Remarks
This constructor creates a `DateTimeFormatInfo` object that represents the date and time information of the invariant culture. To create a `DateTimeFormatInfo` object for a specific culture, create a `CultureInfo` object for that culture and retrieve the `DateTimeFormatInfo` object returned by its `DateTimeFormat` property.

The properties of the `DateTimeFormatInfo` object created by this constructor can be modified. However, you cannot modify the `Calendar` property, because the invariant culture supports only a localized version of the Gregorian calendar. To create a `DateTimeFormatInfo` object that uses a specific calendar, you must instantiate a `CultureInfo` object that supports that calendar and assign the calendar to the `Calendar` property of the `DateTimeFormatInfo` object returned by the `DateTimeFormat` property.

## DateTimeFormatInfo.AbbreviatedDayNames property

```csharp
public string[] AbbreviatedDayNames { get; set; }
```

Gets or sets a one-dimensional array of type `String` containing the culture-specific abbreviated names of the days of the week.

Returns: A one-dimensional array of type `String` containing the culture-specific abbreviated names of the days of the week. The array for `DateTimeFormatInfo.InvariantInfo` contains "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", and "Sat".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentException`: The property is being set to an array that is multidimensional or that has a length that is not exactly 7.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
If setting this property, the array must be one-dimensional and must have exactly seven elements. The first element (the element at index zero) represents the first day of the week in the calendar defined by the `Calendar` property.

If a custom format string includes the "ddd" format specifier, the `DateTime.ToString` or `DateTimeOffset.ToString` method includes the appropriate member of the `DateTimeFormatInfo.AbbreviatedDayNames` array in place of the "ddd" in the result string.

This property is affected if the value of the `Calendar` property changes. If the selected `DateTimeFormatInfo.Calendar` does not support abbreviated day names, the array contains the full day names.

#### Examples
The following example creates a read/write `CultureInfo` object that represents the English (United States) culture and assigns abbreviated day names to its `AbbreviatedDayNames` property. It then uses the "ddd" format specifier in a custom date and time format string to display the string representation of dates for one week beginning May 28, 2014.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/AbbreviatedDayNames/abbreviateddaynames1.cs._

## DateTimeFormatInfo.AbbreviatedMonthGenitiveNames property

```csharp
public string[] AbbreviatedMonthGenitiveNames { get; set; }
```

Gets or sets a string array of abbreviated month names associated with the current `DateTimeFormatInfo` object.

Returns: An array of abbreviated month names.

Exceptions:

- `ArgumentException`: In a set operation, the array is multidimensional or has a length that is not exactly 13.
- `ArgumentNullException`: In a set operation, the array or one of the elements of the array is `null`.
- `InvalidOperationException`: In a set operation, the current `DateTimeFormatInfo` object is read-only.

#### Remarks
In some languages, a month name that is part of a date appears in the genitive case. For example, a date in the ru-RU or Russian (Russia) culture consists of the day number and the genitive month name, such as 1 Января (1 January). For these cultures, if a custom format string includes the "MMM" format specifier, the `DateTime.ToString` or `DateTimeOffset.ToString` method includes the appropriate member of the `DateTimeFormatInfo.AbbreviatedMonthGenitiveNames` array in place of the "MMM" in the result string.

In a set operation, the array must be one-dimensional with exactly 13 elements, because `Calendar` objects accommodate calendars that have 13 months. For calendars that have 12 months, the thirteenth element should be `Empty`. The first element (the element at index zero) represents the first month of the year defined by the `Calendar` property.

If you set the `AbbreviatedMonthGenitiveNames` property, you must also set the `AbbreviatedMonthNames` property.

#### Examples
The following example creates a read/write `CultureInfo` object that represents the English (United States) culture and assigns abbreviated genitive month names to its `DateTimeFormatInfo.AbbreviatedMonthNames` and `DateTimeFormatInfo.AbbreviatedMonthGenitiveNames` properties. It then displays the string representation of dates that include the abbreviated month name of each month in the culture's supported calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/AbbreviatedMonthGenitiveNames/abbreviatedmonthnames1.cs._

## DateTimeFormatInfo.AbbreviatedMonthNames property

```csharp
public string[] AbbreviatedMonthNames { get; set; }
```

Gets or sets a one-dimensional string array that contains the culture-specific abbreviated names of the months.

Returns: A one-dimensional string array with 13 elements that contains the culture-specific abbreviated names of the months. For 12-month calendars, the 13th element of the array is an empty string. The array for `DateTimeFormatInfo.InvariantInfo` contains "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", and "".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentException`: The property is being set to an array that is multidimensional or that has a length that is not exactly 13.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
If you set this property, the array must be one-dimensional with exactly 13 elements. `Calendar` objects accommodate calendars with 13 months. The first element (the element at index zero) represents the first month of the year defined by the `Calendar` property.

If you set the `AbbreviatedMonthNames` property, you must also set the `AbbreviatedMonthGenitiveNames` property. The `DateTimeFormatInfo.AbbreviatedMonthNames` and `DateTimeFormatInfo.AbbreviatedMonthGenitiveNames` properties are used to format dates using the following format strings:

- A standard date and time format string that aliases a custom format string that includes the "MMM" format specifier.
- A custom date and time format string that includes the "MMM" format specifier.

This property is affected if the value of the `Calendar` property changes. If the selected `DateTimeFormatInfo.Calendar` does not support abbreviated month names, the array contains the full month names.

#### Examples
The following example creates a read/write `CultureInfo` object that represents the English (United States) culture and assigns abbreviated genitive month names to its `DateTimeFormatInfo.AbbreviatedMonthNames` and `DateTimeFormatInfo.AbbreviatedMonthGenitiveNames` properties. It then displays the string representation of dates that include the abbreviated name of each month in the culture's supported calendar.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/AbbreviatedMonthGenitiveNames/abbreviatedmonthnames1.cs._
