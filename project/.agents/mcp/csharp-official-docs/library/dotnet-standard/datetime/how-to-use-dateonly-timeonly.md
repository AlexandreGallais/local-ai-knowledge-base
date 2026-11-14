---
title: "How to use DateOnly and TimeOnly (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/how-to-use-dateonly-timeonly.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use the DateOnly and TimeOnly structures

The `System.DateOnly` and `System.TimeOnly` structures were introduced with .NET 6 and represent a specific date or time-of-day, respectively. Prior to .NET 6, and always in .NET Framework, developers used the `System.DateTime` type (or some other alternative) to represent one of the following:

- A whole date and time.
- A date, disregarding the time.
- A time, disregarding the date.

`DateOnly` and `TimeOnly` are types that represent those particular portions of a `DateTime` type.

> **Important:**
> `System.DateOnly` and `System.TimeOnly` types aren't available for .NET Framework.

## The DateOnly structure

The `System.DateOnly` structure represents a specific date, without time. Since it has no time component, it represents a date from the start of the day to the end of the day. This structure is ideal for storing specific dates, such as a birth date, an anniversary date, or business-related dates.

Although you could use `DateTime` while ignoring the time component, there are a few benefits to using `DateOnly` over `DateTime`:

- The `DateTime` structure may roll into the previous or next day if it's offset by a time zone. `DateOnly` can't be offset by a time zone, and it always represents the date that was set.

- Serializing a `DateTime` structure includes the time component, which may obscure the intent of the data. Also, `DateOnly` serializes less data.

- When code interacts with a database, such as SQL Server, whole dates are generally stored as the `date` data type, which doesn't include a time. `DateOnly` matches the database type better.

`DateOnly` has a range from 0001-01-01 through 9999-12-31, just like `DateTime`. You can specify a specific calendar in the `DateOnly` constructor. However, a `DateOnly` object always represents a date in the proleptic Gregorian calendar, regardless of which calendar was used to construct it. For example, you can build the date from a Hebrew calendar, but the date is converted to Gregorian:

```csharp
var hebrewCalendar = new System.Globalization.HebrewCalendar();
var theDate = new DateOnly(5776, 2, 8, hebrewCalendar); // 8 Cheshvan 5776

Console.WriteLine(theDate);

/* This example produces the following output:
 *
 * 10/21/2015
*/
```
```vb
Dim hebrewCalendar = New System.Globalization.HebrewCalendar()
Dim theDate = New DateOnly(5776, 2, 8, hebrewCalendar) ' 8 Cheshvan 5776

Console.WriteLine(theDate)

' This example produces the following output
'
' 10/21/2015
```
## DateOnly examples

Use the following examples to learn about `DateOnly`:

- Convert DateTime to DateOnly
- Add or subtract days, months, years
- Parse and format DateOnly
- Compare DateOnly

### Convert DateTime to DateOnly

Use the `System.DateOnly.FromDateTime*` static method to create a `DateOnly` type from a `DateTime` type, as demonstrated in the following code:

```csharp
var today = DateOnly.FromDateTime(DateTime.Now);
Console.WriteLine($"Today is {today}");

/* This example produces output similar to the following:
 * 
 * Today is 12/28/2022
*/
```
```vb
Dim today = DateOnly.FromDateTime(DateTime.Now)
Console.WriteLine($"Today is {today}")

' This example produces output similar to the following
' 
' Today is 12/28/2022
```
### Add or subtract days, months, years

There are three methods used to adjust a `System.DateOnly` structure: `System.DateOnly.AddDays*`, `System.DateOnly.AddMonths*`, and `System.DateOnly.AddYears*`. Each method takes an integer parameter, and increases the date by that measurement. If a negative number is provided, the date is decreased by that measurement. The methods return a new instance of `DateOnly`, as the structure is immutable.

```csharp
var theDate = new DateOnly(2015, 10, 21);

var nextDay = theDate.AddDays(1);
var previousDay = theDate.AddDays(-1);
var decadeLater = theDate.AddYears(10);
var lastMonth = theDate.AddMonths(-1);

Console.WriteLine($"Date: {theDate}");
Console.WriteLine($" Next day: {nextDay}");
Console.WriteLine($" Previous day: {previousDay}");
Console.WriteLine($" Decade later: {decadeLater}");
Console.WriteLine($" Last month: {lastMonth}");

/* This example produces the following output:
 * 
 * Date: 10/21/2015
 *  Next day: 10/22/2015
 *  Previous day: 10/20/2015
 *  Decade later: 10/21/2025
 *  Last month: 9/21/2015
*/
```
```vb
Dim theDate = New DateOnly(2015, 10, 21)

Dim nextDay = theDate.AddDays(1)
Dim previousDay = theDate.AddDays(-1)
Dim decadeLater = theDate.AddYears(10)
Dim lastMonth = theDate.AddMonths(-1)

Console.WriteLine($"Date: {theDate}")
Console.WriteLine($" Next day: {nextDay}")
Console.WriteLine($" Previous day: {previousDay}")
Console.WriteLine($" Decade later: {decadeLater}")
Console.WriteLine($" Last month: {lastMonth}")

' This example produces the following output
' 
' Date: 10/21/2015
'  Next day: 10/22/2015
'  Previous day: 10/20/2015
'  Decade later: 10/21/2025
'  Last month: 9/21/2015
```
### Parse and format DateOnly

`System.DateOnly` can be parsed from a string, just like the `System.DateTime` structure. All of the standard .NET date-based parsing tokens work with `DateOnly`. When converting a `DateOnly` type to a string, you can use standard .NET date-based formatting patterns too. For more information about formatting strings, see Standard date and time format strings.

```csharp
var theDate = DateOnly.ParseExact("21 Oct 2015", "dd MMM yyyy", CultureInfo.InvariantCulture);  // Custom format
var theDate2 = DateOnly.Parse("October 21, 2015", CultureInfo.InvariantCulture);

Console.WriteLine(theDate.ToString("m", CultureInfo.InvariantCulture));     // Month day pattern
Console.WriteLine(theDate2.ToString("o", CultureInfo.InvariantCulture));    // ISO 8601 format
Console.WriteLine(theDate2.ToLongDateString());

/* This example produces the following output:
 * 
 * October 21
 * 2015-10-21
 * Wednesday, October 21, 2015
*/
```
```vb
Dim theDate = DateOnly.ParseExact("21 Oct 2015", "dd MMM yyyy", CultureInfo.InvariantCulture) ' Custom format
Dim theDate2 = DateOnly.Parse("October 21, 2015", CultureInfo.InvariantCulture)

Console.WriteLine(theDate.ToString("m", CultureInfo.InvariantCulture))     ' Month day pattern
Console.WriteLine(theDate2.ToString("o", CultureInfo.InvariantCulture))    ' ISO 8601 format
Console.WriteLine(theDate2.ToLongDateString())

' This example produces the following output
' 
' October 21
' 2015-10-21
' Wednesday, October 21, 2015
```
### Compare DateOnly

`System.DateOnly` can be compared with other instances. For example, you can check if a date is before or after another, or if a date today matches a specific date.

```csharp
var theDate = DateOnly.ParseExact("21 Oct 2015", "dd MMM yyyy", CultureInfo.InvariantCulture);  // Custom format
var theDate2 = DateOnly.Parse("October 21, 2015", CultureInfo.InvariantCulture);
var dateLater = theDate.AddMonths(6);
var dateBefore = theDate.AddDays(-10);

Console.WriteLine($"Consider {theDate}...");
Console.WriteLine($" Is '{nameof(theDate2)}' equal? {theDate == theDate2}");
Console.WriteLine($" Is {dateLater} after? {dateLater > theDate} ");
Console.WriteLine($" Is {dateLater} before? {dateLater < theDate} ");
Console.WriteLine($" Is {dateBefore} after? {dateBefore > theDate} ");
Console.WriteLine($" Is {dateBefore} before? {dateBefore < theDate} ");

/* This example produces the following output:
 * 
 * Consider 10/21/2015
 *  Is 'theDate2' equal? True
 *  Is 4/21/2016 after? True
 *  Is 4/21/2016 before? False
 *  Is 10/11/2015 after? False
 *  Is 10/11/2015 before? True
*/
```
```vb
Dim theDate = DateOnly.ParseExact("21 Oct 2015", "dd MMM yyyy", CultureInfo.InvariantCulture) ' Custom format
Dim theDate2 = DateOnly.Parse("October 21, 2015", CultureInfo.InvariantCulture)
Dim dateLater = theDate.AddMonths(6)
Dim dateBefore = theDate.AddDays(-10)

Console.WriteLine($"Consider {theDate}...")
Console.WriteLine($" Is '{NameOf(theDate2)}' equal? {theDate = theDate2}")
Console.WriteLine($" Is {dateLater} after? {dateLater > theDate} ")
Console.WriteLine($" Is {dateLater} before? {dateLater < theDate} ")
Console.WriteLine($" Is {dateBefore} after? {dateBefore > theDate} ")
Console.WriteLine($" Is {dateBefore} before? {dateBefore < theDate} ")

' This example produces the following output
' 
' Consider 10/21/2015
'  Is 'theDate2' equal? True
'  Is 4/21/2016 after? True
'  Is 4/21/2016 before? False
'  Is 10/11/2015 after? False
'  Is 10/11/2015 before? True
```
## The TimeOnly structure

The `System.TimeOnly` structure represents a time-of-day value, such as a daily alarm clock or what time you eat lunch each day. `TimeOnly` is limited to the range of **00:00:00.0000000** - **23:59:59.9999999**, a specific time of day.

Prior to the `TimeOnly` type being introduced, programmers typically used either the `System.DateTime` type or the `System.TimeSpan` type to represent a specific time. However, using these structures to simulate a time without a date may introduce some problems, which `TimeOnly` solves:

- `TimeSpan` represents elapsed time, such as time measured with a stopwatch. The upper range is more than 29,000 years, and its value can be negative to indicate moving backwards in time. A negative `TimeSpan` doesn't indicate a specific time of the day.

- If `TimeSpan` is used as a time of day, there's a risk that it could be manipulated to a value outside of the 24-hour day. `TimeOnly` doesn't have this risk. For example, if an employee's work shift starts at 18:00 and lasts for 8 hours, adding 8 hours to the `TimeOnly` structure rolls over to 2:00

- Using `DateTime` for a time of day requires that an arbitrary date be associated with the time, and then later disregarded. It's common practice to choose `DateTime.MinValue` (0001-01-01) as the date, however, if hours are subtracted from the `DateTime` value, an `OutOfRange` exception might occur. `TimeOnly` doesn't have this problem as the time rolls forwards and backwards around the 24-hour timeframe.

- Serializing a `DateTime` structure includes the date component, which may obscure the intent of the data. Also, `TimeOnly` serializes less data.
