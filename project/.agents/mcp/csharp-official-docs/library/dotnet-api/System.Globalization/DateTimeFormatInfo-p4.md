---
title: "DateTimeFormatInfo class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/DateTimeFormatInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DateTimeFormatInfo class (part 4 of 7)

## DateTimeFormatInfo.AMDesignator property

```csharp
public string AMDesignator { get; set; }
```

Gets or sets the string designator for hours that are "ante meridiem" (before noon).

Returns: The string designator for hours that are ante meridiem. The default for `DateTimeFormatInfo.InvariantInfo` is "AM".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `AMDesignator` property is used for all times from 0:00:00 (midnight) to 11:59:59.999.

If a custom format string includes the "tt" format specifier and the time is before noon, the `DateTime.ToString` or `DateTimeOffset.ToString` method includes the value of the `AMDesignator` property in place of "tt" in the result string. If the custom format string includes the "t" custom format specifier, only the first character of the `AMDesignator` property value is included. You should use "tt" for languages for which it is necessary to maintain the distinction between A.M. and P.M. An example is Japanese, in which the A.M. and P.M. designators differ in the second character instead of the first character.

For cultures that do not use an A.M. designator, this property returns an empty string.

## DateTimeFormatInfo.Calendar property

```csharp
public System.Globalization.Calendar Calendar { get; set; }
```

Gets or sets the calendar to use for the current culture.

Returns: The calendar to use for the current culture. The default for `DateTimeFormatInfo.InvariantInfo` is a `GregorianCalendar` object.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentOutOfRangeException`: The property is being set to a `Calendar` object that is not valid for the current culture.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `Calendar` property accepts only calendars that are valid for the culture that is associated with the `DateTimeFormatInfo` object. The `OptionalCalendars` property specifies the calendars that can be used by a particular culture, and the `Calendar` property specifies the default calendar for the culture.

Changing the value of this property affects the following properties as well: `DateTimeFormatInfo.MonthNames`, `DateTimeFormatInfo.AbbreviatedMonthNames`, `DateTimeFormatInfo.DayNames`, `DateTimeFormatInfo.AbbreviatedDayNames`, `DateTimeFormatInfo.CalendarWeekRule`, `DateTimeFormatInfo.FirstDayOfWeek`, `DateTimeFormatInfo.FullDateTimePattern`, `DateTimeFormatInfo.LongDatePattern`, `DateTimeFormatInfo.ShortDatePattern`, `DateTimeFormatInfo.YearMonthPattern`, and `DateTimeFormatInfo.MonthDayPattern`.

For example, if the culture of the current thread is Japanese, this property accepts `JapaneseCalendar`, `Localized``GregorianCalendar`, or `USEnglish``GregorianCalendar`. When the `JapaneseCalendar` is used, the default long date specifier is "gg y'\x5e74'M'\x6708'd'\x65e5'". When the `Localized``GregorianCalendar`, is used, the default long date specifier is "yyyy'\x5e74'M'\x6708'd'\x65e5'".

#### Examples
The following example defines a `ChangeCalendar` method that changes a culture's current calendar to a specified calendar unless it is already the current calendar or if it is not supported by the culture. The code that calls the method instantiates a `CultureInfo` object that represents the Arabic (Egypt) culture and first attempts to change its calendar to the Japanese calendar. Because the Japanese calendar is not supported, the method makes not change the culture's calendar. However, because the Umm al-Qura calendar is a member of the `CultureInfo.OptionalCalendars` collection, the method does succeed in making it the current calendar for the ar-EG culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/Calendar/CalendarTest1.cs._

## DateTimeFormatInfo.CalendarWeekRule property

```csharp
public System.Globalization.CalendarWeekRule CalendarWeekRule { get; set; }
```

Gets or sets a value that specifies which rule is used to determine the first calendar week of the year.

Returns: A value that determines the first calendar week of the year. The default for `DateTimeFormatInfo.InvariantInfo` is `CalendarWeekRule.FirstDay`.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is not a valid `CalendarWeekRule` value.
- `InvalidOperationException`: In a set operation, the current `DateTimeFormatInfo` object is read-only.

#### Remarks
This property is affected if the value of the `Calendar` property changes.

## DateTimeFormatInfo.CurrentInfo property

```csharp
public static System.Globalization.DateTimeFormatInfo CurrentInfo { get; }
```

Gets a read-only `DateTimeFormatInfo` object that formats values based on the current culture.

Returns: A read-only `DateTimeFormatInfo` object based on the `CultureInfo` object for the current thread.

#### Remarks
The `DateTimeFormatInfo` object returned by the `CurrentInfo` property reflects user overrides.

#### Examples
The following example uses the `CurrentInfo` property to retrieve a `DateTimeFormatInfo` object that represents the formatting conventions of the current culture, which in this case is the en-US culture. It then displays the format string and the result string for six formatting properties.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/CurrentInfo/CurrentInfo1.cs._

## DateTimeFormatInfo.DateSeparator property

```csharp
public string DateSeparator { get; set; }
```

Gets or sets the string that separates the components of a date, that is, the year, month, and day.

Returns: The string that separates the components of a date, that is, the year, month, and day. The default for `DateTimeFormatInfo.InvariantInfo` is "/".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
If a custom format string includes the "/" format specifier, the `DateTime.ToString` method displays the value of `DateTimeFormatInfo.DateSeparator` in place of the "/" in the result string.

The `DateSeparator` property defines the string that replaces the date separator ("/" custom date and time format specifier) in a result string in a formatting operation. It also defines the date separator string in a parsing operation.

#### Examples
The following example instantiates a `CultureInfo` object for the en-US culture, changes its date separator to "-", and displays a date by using the "d", "G", and "g" standard format strings.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/DateSeparator/dateseparatorex.cs._

## DateTimeFormatInfo.DayNames property

```csharp
public string[] DayNames { get; set; }
```

Gets or sets a one-dimensional string array that contains the culture-specific full names of the days of the week.

Returns: A one-dimensional string array that contains the culture-specific full names of the days of the week. The array for `DateTimeFormatInfo.InvariantInfo` contains "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", and "Saturday".

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `ArgumentException`: The property is being set to an array that is multidimensional or that has a length that is not exactly 7.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
If setting this property, the array must be one-dimensional and must have exactly seven elements. The first element (the element at index zero) represents the first day of the week in the calendar defined by the `Calendar` property.

If a custom format string includes the "dddd" format specifier, the `DateTime.ToString` method includes the value of the appropriate `DateTimeFormatInfo.DayNames` member in place of "dddd" in the result string.

This property is affected if the value of the `Calendar` property changes.

## DateTimeFormatInfo.FirstDayOfWeek property

```csharp
public DayOfWeek FirstDayOfWeek { get; set; }
```

Gets or sets the first day of the week.

Returns: An enumeration value that represents the first day of the week. The default for `DateTimeFormatInfo.InvariantInfo` is `DayOfWeek.Sunday`.

Exceptions:

- `ArgumentOutOfRangeException`: The property is being set to a value that is not a valid `DayOfWeek` value.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
This property is affected if the value of the `Calendar` property changes.

## DateTimeFormatInfo.FullDateTimePattern property

```csharp
public string FullDateTimePattern { get; set; }
```

Gets or sets the custom format string for a long date and long time value.

Returns: The custom format string for a long date and long time value.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The "F" standard format string is an alias for the `FullDateTimePattern` property. In other words, the custom format string assigned to this property defines the format of the result string for the "F" standard format string. For more information, see Standard Date and Time Format Strings.

The value of the `FullDateTimePattern` property is generated dynamically by concatenating the `DateTimeFormatInfo.LongDatePattern` and `DateTimeFormatInfo.LongTimePattern` properties separated by a space. This dynamic assignment occurs under the following conditions:

- If the property value is retrieved before it has been explicitly set.
- When the value of the `LongDatePattern` property changes.
- When the value of the `LongTimePattern` property changes.

This property is affected if the value of the `Calendar` property changes.

#### Examples
The following example displays the value of `DateTimeFormatInfo.FullDateTimePattern` for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/FullDateTimePattern/dtfi_fulldatetimepattern.cs._

## DateTimeFormatInfo.InvariantInfo property

```csharp
public static System.Globalization.DateTimeFormatInfo InvariantInfo { get; }
```

Gets the default read-only `DateTimeFormatInfo` object that is culture-independent (invariant).

Returns: A read-only object that is culture-independent (invariant).

#### Remarks
This property does not change, regardless of the current culture. Because of this, the invariant culture's `DateTimeFormatInfo` object can be used to produce consistent, culture-independent results in parsing and formatting operations on data that is multi-cultural. For example, if date and time data from multiple cultures is to be persisted in string form, it can be formatted by using the `DateTimeFormatInfo` object of the invariant culture and saved. It can then be parsed by using the invariant culture's `DateTimeFormatInfo` object.

## DateTimeFormatInfo.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the `DateTimeFormatInfo` object is read-only.

Returns: `true` if the `DateTimeFormatInfo` object is read-only; otherwise, `false`.

To be added.

## DateTimeFormatInfo.LongDatePattern property

```csharp
public string LongDatePattern { get; set; }
```

Gets or sets the custom format string for a long date value.

Returns: The custom format string for a long date value.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `LongDatePattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "D" standard format string. The following example illustrates the relationships among the following: the "D" standard format string, the custom format string returned by the `LongDatePattern` property, and  the culture-specific representation of a date.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/LongDatePattern/longdatepattern1.cs._

See Custom Date and Time Format Strings for individual custom format specifiers that can be combined to construct custom format strings such as "dddd, dd MMMM yyyy".

You should set the date separator in the long date pattern to an exact string instead of using the date separator placeholder. For example, to obtain the pattern MM-DD-yyyy, set the long date pattern to "MM-DD-yyyy".

The value of this property may change if the calendar used by a culture changes. For instance, the following example shows how the `LongDatePattern` property of a `CultureInfo` object that represents the Arabic (Syria) culture changes when the `Calendar` object used by the culture changes.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/LongDatePattern/longdatepattern2.cs._

#### Examples
The following example displays the value of the `LongDatePattern` property for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/LongDatePattern/dtfi_longdatepattern.cs._

## DateTimeFormatInfo.LongTimePattern property

```csharp
public string LongTimePattern { get; set; }
```

Gets or sets the custom format string for a long time value.

Returns: The format pattern for a long time value.

Exceptions:

- `ArgumentNullException`: The property is being set to `null`.
- `InvalidOperationException`: The property is being set and the `DateTimeFormatInfo` object is read-only.

#### Remarks
The `LongTimePattern` property defines the culture-specific format of date strings that are returned by calls to the `DateTime.ToString` and `DateTimeOffset.ToString` methods and by composite format strings that are supplied the "T" standard format string.

We recommend that you set the time separator in the long time pattern to an exact string instead of using the time separator placeholder. For example, to obtain the pattern h-mm-ss, set the long date pattern to "h-mm-ss".

#### Examples
The following example displays the value of `DateTimeFormatInfo.LongTimePattern` for a few cultures.

_Code sample not included: ~/snippets/csharp/System.Globalization/DateTimeFormatInfo/LongTimePattern/dtfi_longtimepattern.cs._
