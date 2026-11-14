---
title: "How to use DateOnly and TimeOnly (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/how-to-use-dateonly-timeonly.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use DateOnly and TimeOnly (part 2 of 2)

## TimeOnly examples

Use the following examples to learn about `TimeOnly`:

- Convert DateTime to TimeOnly
- Add or subtract time
- Parse and format TimeOnly
- Work with TimeSpan and DateTime
- Arithmetic operators and comparing TimeOnly

### Convert DateTime to TimeOnly

Use the `System.TimeOnly.FromDateTime*` static method to create a `TimeOnly` type from a `DateTime` type, as demonstrated in the following code:

```csharp
var now = TimeOnly.FromDateTime(DateTime.Now);
Console.WriteLine($"It is {now} right now");

/* This example produces output similar to the following:
 * 
 * It is 2:01 PM right now
*/
```
```vb
Dim now = TimeOnly.FromDateTime(DateTime.Now)
Console.WriteLine($"It is {now} right now")

' This example produces output similar to the following
' 
' It is 2:01 PM right now
```
### Add or subtract time

There are three methods used to adjust a `System.TimeOnly` structure: `System.TimeOnly.AddHours*`, `System.TimeOnly.AddMinutes*`, and `System.TimeOnly.Add*`. Both `AddHours` and `AddMinutes` take an integer parameter, and adjust the value accordingly. You can use a negative value to subtract and a positive value to add. The methods return a new instance of `TimeOnly` is returned, as the structure is immutable. The `Add` method takes a `System.TimeSpan` parameter and adds or subtracts the value from the `TimeOnly` value.

Because `TimeOnly` only represents a 24-hour period, it rolls over forwards or backwards appropriately when adding values supplied to those three methods. For example, if you use a value of `01:30:00` to represent 1:30 AM, then add -4 hours from that period, it rolls backwards to `21:30:00`, which is 9:30 PM. There are method overloads for `AddHours`, `AddMinutes`, and `Add` that capture the number of days rolled over.

```csharp
var theTime = new TimeOnly(7, 23, 11);

var hourLater = theTime.AddHours(1);
var minutesBefore = theTime.AddMinutes(-12);
var secondsAfter = theTime.Add(TimeSpan.FromSeconds(10));
var daysLater = theTime.Add(new TimeSpan(hours: 21, minutes: 200, seconds: 83), out int wrappedDays);
var daysBehind = theTime.AddHours(-222, out int wrappedDaysFromHours);

Console.WriteLine($"Time: {theTime}");
Console.WriteLine($" Hours later: {hourLater}");
Console.WriteLine($" Minutes before: {minutesBefore}");
Console.WriteLine($" Seconds after: {secondsAfter}");
Console.WriteLine($" {daysLater} is the time, which is {wrappedDays} days later");
Console.WriteLine($" {daysBehind} is the time, which is {wrappedDaysFromHours} days prior");

/* This example produces the following output:
 * 
 * Time: 7:23 AM
 *  Hours later: 8:23 AM
 *  Minutes before: 7:11 AM
 *  Seconds after: 7:23 AM
 *  7:44 AM is the time, which is 1 days later 
 *  1:23 AM is the time, which is -9 days prior
*/
```
```vb
Dim wrappedDays As Integer
Dim wrappedDaysFromHours As Integer

Dim theTime = New TimeOnly(7, 23, 11)

Dim hourLater = theTime.AddHours(1)
Dim minutesBefore = theTime.AddMinutes(-12)
Dim secondsAfter = theTime.Add(TimeSpan.FromSeconds(10))
Dim daysLater = theTime.Add(New TimeSpan(hours:=21, minutes:=200, seconds:=83), wrappedDays)
Dim daysBehind = theTime.AddHours(-222, wrappedDaysFromHours)

Console.WriteLine($"Time: {theTime}")
Console.WriteLine($" Hours later: {hourLater}")
Console.WriteLine($" Minutes before: {minutesBefore}")
Console.WriteLine($" Seconds after: {secondsAfter}")
Console.WriteLine($" {daysLater} is the time, which is {wrappedDays} days later")
Console.WriteLine($" {daysBehind} is the time, which is {wrappedDaysFromHours} days prior")

' This example produces the following output
' 
' Time: 7:23 AM
'  Hours later: 8:23 AM
'  Minutes before: 7:11 AM
'  Seconds after: 7:23 AM
'  7:44 AM is the time, which is 1 days later 
'  1:23 AM is the time, which is -9 days prior
```
### Parse and format TimeOnly

`System.TimeOnly` can be parsed from a string, just like the `System.DateTime` structure. All of the standard .NET time-based parsing tokens work with `TimeOnly`. When converting a `TimeOnly` type to a string, you can use standard .NET date-based formatting patterns too. For more information about formatting strings, see Standard date and time format strings.

```csharp
var theTime = TimeOnly.ParseExact("5:00 pm", "h:mm tt", CultureInfo.InvariantCulture);  // Custom format
var theTime2 = TimeOnly.Parse("17:30:25", CultureInfo.InvariantCulture);

Console.WriteLine(theTime.ToString("o", CultureInfo.InvariantCulture));     // Round-trip pattern.
Console.WriteLine(theTime2.ToString("t", CultureInfo.InvariantCulture));    // Long time format
Console.WriteLine(theTime2.ToLongTimeString());

/* This example produces the following output:
 * 
 * 17:00:00.0000000
 * 17:30
 * 5:30:25 PM
*/
```
```vb
Dim theTime = TimeOnly.ParseExact("5:00 pm", "h:mm tt", CultureInfo.InvariantCulture) ' Custom format
Dim theTime2 = TimeOnly.Parse("17:30:25", CultureInfo.InvariantCulture)

Console.WriteLine(theTime.ToString("o", CultureInfo.InvariantCulture))     ' Round-trip pattern.
Console.WriteLine(theTime2.ToString("t", CultureInfo.InvariantCulture))    ' Long time format
Console.WriteLine(theTime2.ToLongTimeString())

' This example produces the following output
' 
' 17:00:00.0000000
' 17:30
' 5:30:25 PM
```
### Serialize DateOnly and TimeOnly types

Starting in .NET 7, `System.Text.Json` supports serializing and deserializing `System.DateOnly` and `System.TimeOnly` types. Consider the following object:

```csharp
sealed file record Appointment(
    Guid Id,
    string Description,
    DateOnly Date,
    TimeOnly StartTime,
    TimeOnly EndTime);
```
```vb
Public NotInheritable Class Appointment
    Public Property Id As Guid
    Public Property Description As String
    Public Property DateValue As DateOnly?
    Public Property StartTime As TimeOnly?
    Public Property EndTime As TimeOnly?
End Class
```
The following example serializes an `Appointment` object, displays the resulting JSON, and then deserializes it back into a new instance of the `Appointment` type. Finally, the original and newly deserialized instances are compared for equality and the results are written to the console:

```csharp
Appointment originalAppointment = new(
    Id: Guid.NewGuid(),
    Description: "Take dog to veterinarian.",
    Date: new DateOnly(2002, 1, 13),
    StartTime: new TimeOnly(5,15),
    EndTime: new TimeOnly(5, 45));
string serialized = JsonSerializer.Serialize(originalAppointment);

Console.WriteLine($"Resulting JSON: {serialized}");

Appointment deserializedAppointment =
    JsonSerializer.Deserialize<Appointment>(serialized)!;

bool valuesAreTheSame = originalAppointment == deserializedAppointment;
Console.WriteLine($"""
    Original record has the same values as the deserialized record: {valuesAreTheSame}
    """);
```
```vb
        Dim originalAppointment As New Appointment With {
            .Id = Guid.NewGuid(),
            .Description = "Take dog to veterinarian.",
            .DateValue = New DateOnly(2002, 1, 13),
            .StartTime = New TimeOnly(5, 3, 1),
            .EndTime = New TimeOnly(5, 3, 1)
}
        Dim serialized As String = JsonSerializer.Serialize(originalAppointment)

        Console.WriteLine($"Resulting JSON: {serialized}")

        Dim deserializedAppointment As Appointment =
            JsonSerializer.Deserialize(Of Appointment)(serialized)

        Dim valuesAreTheSame As Boolean =
            (originalAppointment.DateValue = deserializedAppointment.DateValue AndAlso
            originalAppointment.StartTime = deserializedAppointment.StartTime AndAlso
            originalAppointment.EndTime = deserializedAppointment.EndTime AndAlso
            originalAppointment.Id = deserializedAppointment.Id AndAlso
            originalAppointment.Description = deserializedAppointment.Description)

        Console.WriteLine(
            $"Original object has the same values as the deserialized object: {valuesAreTheSame}")
```
In the preceding code:

- An `Appointment` object is instantiated and assigned to the `appointment` variable.
- The `appointment` instance is serialized to JSON using `System.Text.Json.JsonSerializer.Serialize*`.
- The resulting JSON is written to the console.
- The JSON is deserialized back into a new instance of the `Appointment` type using `System.Text.Json.JsonSerializer.Deserialize*`.
- The original and newly deserialized instances are compared for equality.
- The result of the comparison is written to the console.

For more information, see How to serialize and deserialize JSON in .NET.

### Work with TimeSpan and DateTime

`System.TimeOnly` can be created from and converted to a `System.TimeSpan`. Also, `TimeOnly` can be used with a `System.DateTime`, either to create the `TimeOnly` instance, or to create a `DateTime` instance as long as a date is provided.

The following example creates a `TimeOnly` object from a `TimeSpan`, and then converts it back:

```csharp
// TimeSpan must in the range of 00:00:00.0000000 to 23:59:59.9999999
var theTime = TimeOnly.FromTimeSpan(new TimeSpan(23, 59, 59));
var theTimeSpan = theTime.ToTimeSpan();

Console.WriteLine($"Variable '{nameof(theTime)}' is {theTime}");
Console.WriteLine($"Variable '{nameof(theTimeSpan)}' is {theTimeSpan}");

/* This example produces the following output:
 * 
 * Variable 'theTime' is 11:59 PM
 * Variable 'theTimeSpan' is 23:59:59
*/
```
```vb
' TimeSpan must in the range of 00:00:00.0000000 to 23:59:59.9999999
Dim theTime = TimeOnly.FromTimeSpan(New TimeSpan(23, 59, 59))
Dim theTimeSpan = theTime.ToTimeSpan()

Console.WriteLine($"Variable '{NameOf(theTime)}' is {theTime}")
Console.WriteLine($"Variable '{NameOf(theTimeSpan)}' is {theTimeSpan}")

' This example produces the following output
' 
' Variable 'theTime' is 11:59 PM
' Variable 'theTimeSpan' is 23:59:59
```
The following example creates a `DateTime` from a `TimeOnly` object, with an arbitrary date chosen:

```csharp
var theTime = new TimeOnly(11, 25, 46);   // 11:25 AM and 46 seconds
var theDate = new DateOnly(2015, 10, 21); // October 21, 2015
var theDateTime = theDate.ToDateTime(theTime);
var reverseTime = TimeOnly.FromDateTime(theDateTime);

Console.WriteLine($"Date only is {theDate}");
Console.WriteLine($"Time only is {theTime}");
Console.WriteLine();
Console.WriteLine($"Combined to a DateTime type, the value is {theDateTime}");
Console.WriteLine($"Converted back from DateTime, the time is {reverseTime}");

/* This example produces the following output:
 * 
 * Date only is 10/21/2015
 * Time only is 11:25 AM
 * 
 * Combined to a DateTime type, the value is 10/21/2015 11:25:46 AM
 * Converted back from DateTime, the time is 11:25 AM
*/
```
```vb
Dim theTime = New TimeOnly(11, 25, 46) ' 11:   25 PM And 46 seconds
Dim theDate = New DateOnly(2015, 10, 21) ' October 21, 2015
Dim theDateTime = theDate.ToDateTime(theTime)
Dim reverseTime = TimeOnly.FromDateTime(theDateTime)

Console.WriteLine($"Date only is {theDate}")
Console.WriteLine($"Time only is {theTime}")
Console.WriteLine()
Console.WriteLine($"Combined to a DateTime type, the value is {theDateTime}")
Console.WriteLine($"Converted back from DateTime, the time is {reverseTime}")

' This example produces the following output
' 
' Date only is 10/21/2015
' Time only is 11:25 AM
' 
' Combined to a DateTime type, the value is 10/21/2015 11:25:46 AM
' Converted back from DateTime, the time is 11:25 AM
```
### Arithmetic operators and comparing TimeOnly

Two `System.TimeOnly` instances can be compared with one another, and you can use the `System.TimeOnly.IsBetween*` method to check if a time is between two other times. When an addition or subtraction operator is used on a `TimeOnly`, a `System.TimeSpan` is returned, representing a duration of time.

```csharp
var start = new TimeOnly(10, 12, 01); // 10:12:01 AM
var end = new TimeOnly(14, 00, 53); // 02:00:53 PM

var outside = start.AddMinutes(-3);
var inside = start.AddMinutes(120);

Console.WriteLine($"Time starts at {start} and ends at {end}");
Console.WriteLine($" Is {outside} between the start and end? {outside.IsBetween(start, end)}");
Console.WriteLine($" Is {inside} between the start and end? {inside.IsBetween(start, end)}");
Console.WriteLine($" Is {start} less than {end}? {start < end}");
Console.WriteLine($" Is {start} greater than {end}? {start > end}");
Console.WriteLine($" Does {start} equal {end}? {start == end}");
Console.WriteLine($" The time between {start} and {end} is {end - start}");

/* This example produces the following output:
 * 
 * Time starts at 10:12 AM and ends at 2:00 PM
 *  Is 10:09 AM between the start and end? False
 *  Is 12:12 PM between the start and end? True
 *  Is 10:12 AM less than 2:00 PM? True
 *  Is 10:12 AM greater than 2:00 PM? False
 *  Does 10:12 AM equal 2:00 PM? False
 *  The time between 10:12 AM and 2:00 PM is 03:48:52
*/
```
```vb
Dim startDate = New TimeOnly(10, 12, 1) ' 10:12:01 AM
Dim endDate = New TimeOnly(14, 0, 53) ' 02:00:53 PM

Dim outside = startDate.AddMinutes(-3)
Dim inside = startDate.AddMinutes(120)

Console.WriteLine($"Time starts at {startDate} and ends at {endDate}")
Console.WriteLine($" Is {outside} between the start and end? {outside.IsBetween(startDate, endDate)}")
Console.WriteLine($" Is {inside} between the start and end? {inside.IsBetween(startDate, endDate)}")
Console.WriteLine($" Is {startDate} less than {endDate}? {startDate < endDate}")
Console.WriteLine($" Is {startDate} greater than {endDate}? {startDate > endDate}")
Console.WriteLine($" Does {startDate} equal {endDate}? {startDate = endDate}")
Console.WriteLine($" The time between {startDate} and {endDate} is {endDate - startDate}")

' This example produces the following output
' 
' Time starts at 10:12 AM And ends at 2:00 PM
'  Is 10:09 AM between the start And end? False
'  Is 12:12 PM between the start And end? True
'  Is 10:12 AM less than 2:00 PM? True
'  Is 10:12 AM greater than 2:00 PM? False
'  Does 10:12 AM equal 2:00 PM? False
'  The time between 10:12 AM and 2:00 PM is 03:48:52
```
