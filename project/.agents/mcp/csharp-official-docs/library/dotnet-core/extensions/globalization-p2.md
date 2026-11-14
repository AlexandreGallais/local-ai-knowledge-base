---
title: "Globalization (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/globalization.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Globalization (part 2 of 3)

## Handle dates and times

How you handle date and time values depends on whether they are displayed in the user interface or persisted. This section examines both usages. It also discusses how you can handle time zone differences and arithmetic operations when working with dates and times.

### Display dates and times

Typically, when dates and times are displayed in the user interface, you should use the formatting conventions of the user's culture, which is defined by the `System.Globalization.CultureInfo.CurrentCulture` property and by the `System.Globalization.DateTimeFormatInfo` object returned by the `CultureInfo.CurrentCulture.DateTimeFormat` property. The formatting conventions of the current culture are automatically used when you format a date by using any of these methods:

- The parameterless `System.DateTime.ToString` method.
- The `System.DateTime.ToString(System.String)` method, which includes a format string.
- The parameterless `System.DateTimeOffset.ToString` method.
- The `System.DateTimeOffset.ToString(System.String)`, which includes a format string.
- The composite formatting feature, when it is used with dates.

The following example displays sunrise and sunset data twice for October 11, 2012. It first sets the current culture to Croatian (Croatia), and then to English (United Kingdom). In each case, the dates and times are displayed in the format that is appropriate for that culture.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/dates1.cs._

### Persist dates and times

You should never persist date and time data in a format that can vary by culture. This is a common programming error that results in either corrupted data or a runtime exception. The following example serializes two dates, January 9, 2013 and August 18, 2013, as strings by using the formatting conventions of the English (United States) culture. When the data is retrieved and parsed by using the conventions of the English (United States) culture, it is successfully restored. However, when it is retrieved and parsed by using the conventions of the English (United Kingdom) culture, the first date is wrongly interpreted as September 1, and the second fails to parse because the Gregorian calendar does not have an eighteenth month.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/dates2.cs._

You can avoid this problem in any of three ways:

- Serialize the date and time in binary format rather than as a string.
- Save and parse the string representation of the date and time by using a custom format string that is the same regardless of the user's culture.
- Save the string by using the formatting conventions of the invariant culture.

The following example illustrates the last approach. It uses the formatting conventions of the invariant culture returned by the static `System.Globalization.CultureInfo.InvariantCulture` property.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/dates3.cs._

### Serialization and time zone awareness

A date and time value can have multiple interpretations, ranging from a general time ("The stores open on January 2, 2013, at 9:00 A.M.") to a specific moment in time ("Date of birth: January 2, 2013 6:32:00 A.M."). When a time value represents a specific moment in time and you restore it from a serialized value, you should ensure that it represents the same moment in time regardless of the user's geographical location or time zone.

The following example illustrates this problem. It saves a single local date and time value as a string in three standard formats:

- "G" for general date long time.
- "s" for sortable date/time.
- "o" for round-trip date/time.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/dates4.cs._

When the data is restored on a system in the same time zone as the system on which it was serialized, the deserialized date and time values accurately reflect the original value, as the output shows:

```console
'3/30/2013 6:00:00 PM' --> 3/30/2013 6:00:00 PM Unspecified
'2013-03-30T18:00:00' --> 3/30/2013 6:00:00 PM Unspecified
'2013-03-30T18:00:00.0000000-07:00' --> 3/30/2013 6:00:00 PM Local
```

However, if you restore the data on a system in a different time zone, only the date and time value that was formatted with the "o" (round-trip) standard format string preserves time zone information and therefore represents the same instant in time. Here's the output when the date and time data is restored on a system in the Romance Standard Time zone:

```console
'3/30/2023 6:00:00 PM' --> 3/30/2023 6:00:00 PM Unspecified
'2023-03-30T18:00:00' --> 3/30/2023 6:00:00 PM Unspecified
'2023-03-30T18:00:00.0000000-07:00' --> 3/31/2023 3:00:00 AM Local
```

To accurately reflect a date and time value that represents a single moment of time regardless of the time zone of the system on which the data is deserialized, you can do any of the following:

- Save the value as a string by using the "o" (round-trip) standard format string. Then deserialize it on the target system.
- Convert it to UTC and save it as a string by using the "r" (RFC1123) standard format string. Then deserialize it on the target system and convert it to local time.
- Convert it to UTC and save it as a string by using the "u" (universal sortable) standard format string. Then deserialize it on the target system and convert it to local time.

The following example illustrates each technique.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/dates8.cs._

When the data is serialized on a system in the Pacific Standard Time zone and deserialized on a system in the Romance Standard Time zone, the example displays the following output:

```console
'2023-03-30T18:00:00.0000000-07:00' --> 3/31/2023 3:00:00 AM Local
'Sun, 31 Mar 2023 01:00:00 GMT' --> 3/31/2023 3:00:00 AM Local
'2023-03-31 01:00:00Z' --> 3/31/2023 3:00:00 AM Local
```

For more information, see Convert times between time zones.

### Perform date and time arithmetic

Both the `System.DateTime` and `System.DateTimeOffset` types support arithmetic operations. You can calculate the difference between two date values, or you can add or subtract particular time intervals to or from a date value. However, arithmetic operations on date and time values do not take time zones and time zone adjustment rules into account. Because of this, date and time arithmetic on values that represent moments in time can return inaccurate results.

For example, the transition from Pacific Standard Time to Pacific Daylight Time occurs on the second Sunday of March, which is March 10 for the year 2013. As the following example shows, if you calculate the date and time that is 48 hours after March 9, 2013 at 10:30 A.M. on a system in the Pacific Standard Time zone, the result, March 11, 2013 at 10:30 A.M., does not take the intervening time adjustment into account.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/dates5.cs._

To ensure that an arithmetic operation on date and time values produces accurate results, follow these steps:

1. Convert the time in the source time zone to UTC.
2. Perform the arithmetic operation.
3. If the result is a date and time value, convert it from UTC to the time in the source time zone.

The following example is similar to the previous example, except that it follows these three steps to correctly add 48 hours to March 9, 2013 at 10:30 A.M.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/dates6.cs._

For more information, see Perform arithmetic operations with dates and times.

### Use culture-sensitive names for date elements

Your app may need to display the name of the month or the day of the week. To do this, code such as the following is common.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/monthname1.cs._

However, this code always returns the names of the days of the week in English. Code that extracts the name of the month is often even more inflexible. It frequently assumes a twelve-month calendar with names of months in a specific language.

By using custom date and time format strings or the properties of the `System.Globalization.DateTimeFormatInfo` object, it is easy to extract strings that reflect the names of days of the week or months in the user's culture, as the following example illustrates. It changes the current culture to French (France) and displays the name of the day of the week and the name of the month for July 1, 2013.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/monthname2.cs._

## Numeric values

The handling of numbers depends on whether they are displayed in the user interface or persisted. This section examines both usages.

> **Note:**
> In parsing and formatting operations, .NET recognizes only the Basic Latin characters 0 through 9 (U+0030 through U+0039) as numeric digits.

### Display numeric values

Typically, when numbers are displayed in the user interface, you should use the formatting conventions of the user's culture, which is defined by the `System.Globalization.CultureInfo.CurrentCulture` property and by the `System.Globalization.NumberFormatInfo` object returned by the `CultureInfo.CurrentCulture.NumberFormat` property. The formatting conventions of the current culture are automatically used when you format a date in the following ways:

- Using the parameterless `ToString` method of any numeric type.
- Using the `ToString(String)` method of any numeric type, which includes a format string as an argument.
- Using composite formatting with numeric values.

The following example displays the average temperature per month in Paris, France. It first sets the current culture to French (France) before displaying the data, and then sets it to English (United States). In each case, the month names and temperatures are displayed in the format that is appropriate for that culture. Note that the two cultures use different decimal separators in the temperature value. Also note that the example uses the "MMMM" custom date and time format string to display the full month name, and that it allocates the appropriate amount of space for the month name in the result string by determining the length of the longest month name in the `System.Globalization.DateTimeFormatInfo.MonthNames` array.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/numbers1.cs._

### Persist numeric values

You should never persist numeric data in a culture-specific format. This is a common programming error that results in either corrupted data or a runtime exception. The following example generates ten random floating-point numbers, and then serializes them as strings by using the formatting conventions of the English (United States) culture. When the data is retrieved and parsed by using the conventions of the English (United States) culture, it is successfully restored. However, when it is retrieved and parsed by using the conventions of the French (France) culture, none of the numbers can be parsed because the cultures use different decimal separators.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/numbers2.cs._

To avoid this problem, you can use one of these techniques:

- Save and parse the string representation of the number by using a custom format string that is the same regardless of the user's culture.
- Save the number as a string by using the formatting conventions of the invariant culture, which is returned by the `System.Globalization.CultureInfo.InvariantCulture` property.

Serializing currency values is a special case. Because a currency value depends on the unit of currency in which it's expressed, it makes little sense to treat it as an independent numeric value. However, if you save a currency value as a formatted string that includes a currency symbol, it cannot be deserialized on a system whose default culture uses a different currency symbol, as the following example shows.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/currency1.cs._

Instead, you should serialize the numeric value along with some cultural information, such as the name of the culture, so that the value and its currency symbol can be deserialized independently of the current culture. The following example does that by defining a `CurrencyValue` structure with two members: the `System.Decimal` value and the name of the culture to which the value belongs.

_Code sample not included: ../../../samples/snippets/csharp/VS_Snippets_CLR/conceptual.globalization/cs/currency2.cs._
