---
title: "Parse date and time strings (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/parsing-datetime.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Parse date and time strings in .NET

.NET provides several types for working with date and time data, each optimized for different scenarios:

- **`System.DateTime`** - Represents a date and time together, ideal when you need both components or when working with legacy code.
- **`System.DateOnly`** (not available in .NET Framework) - Represents only a date without time information, perfect for birthdays, anniversaries, or business dates.
- **`System.TimeOnly`** (not available in .NET Framework) - Represents only a time without date information, ideal for schedules, alarms, or recurring daily events.

Each type provides parsing methods that convert strings to their respective objects, with different levels of flexibility and control over the parsing process.

## Common parsing concepts

All three date and time types share similar parsing approaches:

- **`Parse` and `TryParse` methods** - Convert many common string representations using current culture or specified culture settings.
- **`ParseExact` and `TryParseExact` methods** - Convert strings that conform to specific format patterns, providing precise control over expected formats, including culture settings.
- **Format strings** - Define patterns for parsing using standard or custom format specifiers.

Different cultures use different orders for day, month, and year. Some time representations use a 24-hour clock, others specify "AM" and "PM." The parsing methods handle these variations through culture-specific formatting rules.

The `System.Globalization.DateTimeFormatInfo` object provides control over how text should be interpreted. Properties describe the date and time separators, names of months, days, eras, and the format for "AM" and "PM" designations. You can specify culture through the `System.IFormatProvider` parameter using a `System.Globalization.CultureInfo` object or a `System.Globalization.DateTimeFormatInfo` object.

For more information about format patterns, see standard date and time format strings and custom date and time format strings.

> **Important:**
> `System.DateOnly` and `System.TimeOnly` types aren't available for .NET Framework.

## DateTime parsing

`System.DateTime` represents both date and time components together. When parsing strings to `DateTime` objects, you need to consider several `DateTime`-specific aspects:

- **Missing information handling** - `DateTime` uses defaults when parts are missing from the input string.
- **Time zone and UTC offset support** - `DateTime` can represent local, UTC, or unspecified time zones.
- **Combined date and time parsing** - Must handle both date and time components in a single operation.

### Missing information handling

The text representing a date or time might be missing some information. For example, most people would assume the date "March 12" represents the current year. Similarly, "March 2018" represents the month of March in the year 2018. Text representing time often includes only hours, minutes, and an AM/PM designation. `DateTime` parsing methods handle this missing information by using reasonable defaults:

- When only the time is present, the date portion uses the current date.
- When only the date is present, the time portion is midnight.
- When the year isn't specified in a date, the current year is used.
- When the day of the month isn't specified, the first day of the month is used.

If the date is present in the string, it must include the month and one of the day or year. If the time is present, it must include the hour, and either the minutes or the AM/PM designator.

You can specify the `System.Globalization.DateTimeStyles.NoCurrentDateDefault` constant to override these defaults. When you use that constant, any missing year, month, or day properties are set to the value `1`. The last example using `System.DateTime.Parse*` demonstrates this behavior.

### UTC offset and time zone handling

In addition to a date and a time component, the string representation of a date and time can include an offset that indicates how much the time differs from Coordinated Universal Time (UTC). For example, the string "2/14/2007 5:32:00 -7:00" defines a time that's seven hours earlier than UTC. If an offset is omitted from the string representation of a time, parsing returns a `System.DateTime` object with its `System.DateTime.Kind` property set to `System.DateTimeKind.Unspecified`. If an offset is specified, parsing returns a `System.DateTime` object with its `System.DateTime.Kind` property set to `System.DateTimeKind.Local`. Its value is also adjusted to the local time zone of your machine. You can modify this behavior by using a `System.Globalization.DateTimeStyles` value with the parsing method.

### Ambiguous date handling

The format provider is also used to interpret an ambiguous numeric date. It's unclear which components of the date represented by the string "02/03/04" are the month, day, and year. The components are interpreted according to the order of similar date formats in the format provider.

### DateTime.Parse

The following example shows the use of the `System.DateTime.Parse*` method to convert a `string` into a `System.DateTime`. This example uses the culture associated with the current thread. If the `System.Globalization.CultureInfo` associated with the current culture can't parse the input string, a `System.FormatException` is thrown.

```csharp
static void DateTimeParseExample()
{
    // Parse common date and time formats using current culture
    var dateTime1 = DateTime.Parse("1/15/2025 3:30 PM");
    var dateTime2 = DateTime.Parse("January 15, 2025");
    var dateTime3 = DateTime.Parse("15:30:45");

    Console.WriteLine($"Parsed: {dateTime1}");
    Console.WriteLine($"Parsed: {dateTime2}");
    Console.WriteLine($"Parsed: {dateTime3}");

    // Parse with specific culture
    var germanDate = DateTime.Parse("15.01.2025", new CultureInfo("de-DE"));
    Console.WriteLine($"German date parsed: {germanDate}");
}
```
```vb
Sub DateTimeParseExample()
    ' Parse common date and time formats using current culture
    Dim dateTime1 = DateTime.Parse("1/15/2025 3:30 PM")
    Dim dateTime2 = DateTime.Parse("January 15, 2025")
    Dim dateTime3 = DateTime.Parse("15:30:45")

    Console.WriteLine($"Parsed: {dateTime1}")
    Console.WriteLine($"Parsed: {dateTime2}")
    Console.WriteLine($"Parsed: {dateTime3}")

    ' Parse with specific culture
    Dim germanDate = DateTime.Parse("15.01.2025", New CultureInfo("de-DE"))
    Console.WriteLine($"German date parsed: {germanDate}")
End Sub
```
You can also explicitly define the culture whose formatting conventions are used when you parse a string. You specify one of the standard `System.Globalization.DateTimeFormatInfo` objects returned by the `System.Globalization.CultureInfo.DateTimeFormat` property. The following example uses a format provider to parse a German string into a `System.DateTime`. It creates a `System.Globalization.CultureInfo` representing the `de-DE` culture. That `CultureInfo` object ensures successful parsing of this particular string. This process precludes whatever setting is in the `System.Threading.Thread.CurrentCulture` of the `System.Threading.Thread.CurrentThread`.

```csharp
static void DateTimeParseGermanExample()
{
    var cultureInfo = new CultureInfo("de-DE");
    string dateString = "12 Juni 2008";
    var dateTime = DateTime.Parse(dateString, cultureInfo);
    Console.WriteLine(dateTime);
    // The example displays the following output:
    //       6/12/2008 00:00:00
}
```
```vb
Sub DateTimeParseGermanExample()
    Dim MyCultureInfo As New CultureInfo("de-DE")
    Dim MyString As String = "12 Juni 2008"
    Dim MyDateTime As DateTime = DateTime.Parse(MyString, MyCultureInfo)
    Console.WriteLine(MyDateTime)
    ' The example displays the following output:
    '       6/12/2008 00:00:00
End Sub
```
However, you can use overloads of the `System.DateTime.Parse*` method to specify custom format providers. The `System.DateTime.Parse*` method doesn't support parsing non-standard formats. To parse a date and time expressed in a non-standard format, use the `System.DateTime.ParseExact*` method instead.

The following example uses the `System.Globalization.DateTimeStyles` enumeration to specify that the current date and time information shouldn't be added to the `System.DateTime` for unspecified fields.

```csharp
static void DateTimeParseNoDefaultExample()
{
    var cultureInfo = new CultureInfo("de-DE");
    string dateString = "12 Juni 2008";
    var dateTime = DateTime.Parse(dateString, cultureInfo,
                                    DateTimeStyles.NoCurrentDateDefault);
    Console.WriteLine(dateTime);
    // The example displays the following output if the current culture is en-US:
    //      6/12/2008 00:00:00
}
```
```vb
Sub DateTimeParseNoDefaultExample()
    Dim MyCultureInfo As New CultureInfo("de-DE")
    Dim MyString As String = "12 Juni 2008"
    Dim MyDateTime As DateTime = DateTime.Parse(MyString, MyCultureInfo,
                               DateTimeStyles.NoCurrentDateDefault)
    Console.WriteLine(MyDateTime)
    ' The example displays the following output if the current culture is en-US:
    '       6/12/2008 00:00:00
End Sub
```
### DateTime.ParseExact

The `System.DateTime.ParseExact*` method converts a string to a `System.DateTime` object if it conforms to one of the specified string patterns. When a string that isn't one of the forms specified is passed to this method, a `System.FormatException` is thrown. You can specify one of the standard date and time format specifiers or a combination of the custom format specifiers. Using the custom format specifiers, it's possible for you to construct a custom recognition string. For an explanation of the specifiers, see the articles on standard date and time format strings and custom date and time format strings.

In the following example, the `System.DateTime.ParseExact*` method is passed a string object to parse, followed by a format specifier, followed by a `System.Globalization.CultureInfo` object. This `System.DateTime.ParseExact*` method can only parse strings that follow the long date pattern in the `en-US` culture.

```csharp
static void DateTimeParseExactExample()
{
    // Parse exact format
    var exactDate = DateTime.ParseExact("2025-01-15T14:30:00", "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture);
    Console.WriteLine($"Exact parse: {exactDate}");

    // Parse with custom format
    var customDate = DateTime.ParseExact("15/Jan/2025 2:30 PM", "dd/MMM/yyyy h:mm tt", CultureInfo.InvariantCulture);
    Console.WriteLine($"Custom format: {customDate}");
}
```
```vb
Sub DateTimeParseExactExample()
    ' Parse exact format
    Dim exactDate = DateTime.ParseExact("2025-01-15T14:30:00", "yyyy-MM-ddTHH:mm:ss", CultureInfo.InvariantCulture)
    Console.WriteLine($"Exact parse: {exactDate}")

    ' Parse with custom format
    Dim customDate = DateTime.ParseExact("15/Jan/2025 2:30 PM", "dd/MMM/yyyy h:mm tt", CultureInfo.InvariantCulture)
    Console.WriteLine($"Custom format: {customDate}")
End Sub
```
Each overload of the `System.DateTime.Parse*` and `System.DateTime.ParseExact*` methods also has an `System.IFormatProvider` parameter that provides culture-specific information about the formatting of the string. The `System.IFormatProvider` object is a `System.Globalization.CultureInfo` object that represents a standard culture or a `System.Globalization.DateTimeFormatInfo` object that's returned by the `System.Globalization.CultureInfo.DateTimeFormat` property. `System.DateTime.ParseExact*` also uses an additional string or string array argument that defines one or more custom date and time formats.
