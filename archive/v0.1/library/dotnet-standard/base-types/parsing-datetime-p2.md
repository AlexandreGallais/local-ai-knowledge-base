---
title: "Parse date and time strings (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/parsing-datetime.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Parse date and time strings (part 2 of 2)

## DateOnly parsing

The `System.DateOnly` structure represents only a date without time information, making it perfect for scenarios like birthdays, anniversaries, or business dates. Since it has no time component, it represents a date from the start of the day to the end of the day.

`DateOnly` has several advantages over using `DateTime` for date-only scenarios:

- The `DateTime` structure might roll into the previous or next day if it's offset by a time zone. `DateOnly` can't be offset by a time zone, and it always represents the date that was set.
- Serializing a `DateOnly` includes less data than `DateTime`.
- When code interacts with a database, such as SQL Server, whole dates are generally stored as the `date` data type, which doesn't include a time. `DateOnly` matches the database type better.

### DateOnly.Parse

The `System.DateOnly.Parse*` method converts common date string representations to a `System.DateOnly` object. The method accepts various formats and uses the current culture or a specified culture for parsing.

```csharp
static void DateOnlyParseExample()
{
    // Parse common date formats
    var date1 = DateOnly.Parse("1/15/2025");
    var date2 = DateOnly.Parse("January 15, 2025", CultureInfo.InvariantCulture);
    var date3 = DateOnly.Parse("2025-01-15");

    Console.WriteLine($"Parsed date: {date1}");
    Console.WriteLine($"Parsed date: {date2.ToString("D")}"); // Long date format
    Console.WriteLine($"Parsed date: {date3.ToString("yyyy-MM-dd")}");

    // Parse with specific culture
    var germanDate = DateOnly.Parse("15.01.2025", new CultureInfo("de-DE"));
    Console.WriteLine($"German date: {germanDate}");
}
```
```vb
Sub DateOnlyParseExample()
    ' Parse common date formats
    Dim date1 = DateOnly.Parse("1/15/2025")
    Dim date2 = DateOnly.Parse("January 15, 2025", CultureInfo.InvariantCulture)
    Dim date3 = DateOnly.Parse("2025-01-15")

    Console.WriteLine($"Parsed date: {date1}")
    Console.WriteLine($"Parsed date: {date2.ToString("D")}") ' Long date format
    Console.WriteLine($"Parsed date: {date3.ToString("yyyy-MM-dd")}")

    ' Parse with specific culture
    Dim germanDate = DateOnly.Parse("15.01.2025", New CultureInfo("de-DE"))
    Console.WriteLine($"German date: {germanDate}")
End Sub
```
### DateOnly.ParseExact

The `System.DateOnly.ParseExact*` method provides precise control over the expected format of the input string. Use this method when you know the exact format of the date string and want to ensure strict parsing.

```csharp
static void DateOnlyParseExactExample()
{
    // Parse exact format
    var exactDate = DateOnly.ParseExact("21 Oct 2015", "dd MMM yyyy", CultureInfo.InvariantCulture);
    Console.WriteLine($"Exact date: {exactDate}");

    // Parse ISO format
    var isoDate = DateOnly.ParseExact("2025-01-15", "yyyy-MM-dd", CultureInfo.InvariantCulture);
    Console.WriteLine($"ISO date: {isoDate}");

    // Parse with multiple possible formats
    string[] formats = { "MM/dd/yyyy", "M/d/yyyy", "dd/MM/yyyy" };
    var flexibleDate = DateOnly.ParseExact("1/15/2025", formats, CultureInfo.InvariantCulture, DateTimeStyles.None);
    Console.WriteLine($"Flexible parse: {flexibleDate}");
}
```
```vb
Sub DateOnlyParseExactExample()
    ' Parse exact format
    Dim exactDate = DateOnly.ParseExact("21 Oct 2015", "dd MMM yyyy", CultureInfo.InvariantCulture)
    Console.WriteLine($"Exact date: {exactDate}")

    ' Parse ISO format
    Dim isoDate = DateOnly.ParseExact("2025-01-15", "yyyy-MM-dd", CultureInfo.InvariantCulture)
    Console.WriteLine($"ISO date: {isoDate}")

    ' Parse with multiple possible formats
    Dim formats() As String = {"MM/dd/yyyy", "M/d/yyyy", "dd/MM/yyyy"}
    Dim flexibleDate = DateOnly.ParseExact("1/15/2025", formats, CultureInfo.InvariantCulture, DateTimeStyles.None)
    Console.WriteLine($"Flexible parse: {flexibleDate}")
End Sub
```
The `ParseExact` method accepts either a single format string or an array of format strings, allowing you to parse dates that might come in multiple acceptable formats.

## TimeOnly parsing

The `System.TimeOnly` structure represents a time-of-day value, such as a daily alarm clock or what time you eat lunch each day. `TimeOnly` is limited to the range of **00:00:00.0000000** - **23:59:59.9999999**, a specific time of day.

`TimeOnly` solves several problems that existed when using other types for time-only scenarios:

- `TimeSpan` represents elapsed time and can be negative or exceed 24 hours, making it unsuitable for representing a specific time of day.
- Using `DateTime` for a time of day requires an arbitrary date, which can lead to unexpected behavior when performing calculations.
- `TimeOnly` naturally handles 24-hour rollover when adding or subtracting time values.

### TimeOnly.Parse

The `System.TimeOnly.Parse*` method converts common time string representations to a `System.TimeOnly` object. The method accepts various formats including 12-hour and 24-hour notation.

```csharp
static void TimeOnlyParseExample()
{
    // Parse common time formats
    var time1 = TimeOnly.Parse("14:30:15");
    var time2 = TimeOnly.Parse("2:30 PM", CultureInfo.InvariantCulture);
    var time3 = TimeOnly.Parse("17:45");

    Console.WriteLine($"Parsed time: {time1}");
    Console.WriteLine($"Parsed time: {time2.ToString("t")}"); // Short time format
    Console.WriteLine($"Parsed time: {time3.ToString("HH:mm")}");

    // Parse with milliseconds
    var preciseTime = TimeOnly.Parse("14:30:15.123");
    Console.WriteLine($"Precise time: {preciseTime.ToString("HH:mm:ss.fff")}");
}
```
```vb
Sub TimeOnlyParseExample()
    ' Parse common time formats
    Dim time1 = TimeOnly.Parse("14:30:15")
    Dim time2 = TimeOnly.Parse("2:30 PM", CultureInfo.InvariantCulture)
    Dim time3 = TimeOnly.Parse("17:45")

    Console.WriteLine($"Parsed time: {time1}")
    Console.WriteLine($"Parsed time: {time2.ToString("t")}") ' Short time format
    Console.WriteLine($"Parsed time: {time3.ToString("HH:mm")}")

    ' Parse with milliseconds
    Dim preciseTime = TimeOnly.Parse("14:30:15.123")
    Console.WriteLine($"Precise time: {preciseTime.ToString("HH:mm:ss.fff")}")
End Sub
```
### TimeOnly.ParseExact

The `System.TimeOnly.ParseExact*` method provides precise control over the expected format of the input time string. Use this method when you know the exact format and want to ensure strict parsing.

```csharp
static void TimeOnlyParseExactExample()
{
    // Parse exact format
    var exactTime = TimeOnly.ParseExact("5:00 pm", "h:mm tt", CultureInfo.InvariantCulture);
    Console.WriteLine($"Exact time: {exactTime}");

    // Parse 24-hour format
    var militaryTime = TimeOnly.ParseExact("17:30:25", "HH:mm:ss", CultureInfo.InvariantCulture);
    Console.WriteLine($"Military time: {militaryTime}");

    // Parse with multiple possible formats
    string[] timeFormats = { "h:mm tt", "HH:mm", "H:mm" };
    var flexibleTime = TimeOnly.ParseExact("2:30 PM", timeFormats, CultureInfo.InvariantCulture, DateTimeStyles.None);
    Console.WriteLine($"Flexible time parse: {flexibleTime}");
}
```
```vb
Sub TimeOnlyParseExactExample()
    ' Parse exact format
    Dim exactTime = TimeOnly.ParseExact("5:00 pm", "h:mm tt", CultureInfo.InvariantCulture)
    Console.WriteLine($"Exact time: {exactTime}")

    ' Parse 24-hour format
    Dim militaryTime = TimeOnly.ParseExact("17:30:25", "HH:mm:ss", CultureInfo.InvariantCulture)
    Console.WriteLine($"Military time: {militaryTime}")

    ' Parse with multiple possible formats
    Dim timeFormats() As String = {"h:mm tt", "HH:mm", "H:mm"}
    Dim flexibleTime = TimeOnly.ParseExact("2:30 PM", timeFormats, CultureInfo.InvariantCulture, DateTimeStyles.None)
    Console.WriteLine($"Flexible time parse: {flexibleTime}")
End Sub
```
## See also

- Parsing strings
- Formatting types
- Type conversion in .NET
- Standard date and time formats
- Custom date and time format strings
- How to use the DateOnly and TimeOnly structures
