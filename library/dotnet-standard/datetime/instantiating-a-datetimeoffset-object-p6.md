---
title: "Instantiating a DateTimeOffset object (part 6 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object (part 6 of 16)

```vb
        targetTime = New DateTimeOffset(localTime, _
                                        TimeZoneInfo.Local.GetUtcOffset(localTime))
        Console.WriteLine(targetTime)
        ' Because the Kind property is DateTimeKind.Local and the offset matches
        ' that of the local time zone, the call to the constructor succeeds.

        ' Instantiate a DateTimeOffset value from a local time with a zero offset.
        Try
            targetTime = New DateTimeOffset(localTime, TimeSpan.Zero)
            Console.WriteLine(targetTime)
        Catch e As ArgumentException
            Console.WriteLine("Attempt to create DateTimeOffset value from {0} failed.", _
                               localTime)
        End Try
        ' Throws exception and displays the following to the console:
        '   Attempt to create DateTimeOffset value from 5/1/2008 8:30:00 AM failed.

        ' Instantiate a DateTimeOffset value with an arbitrary time zone.
        Dim timeZoneName As String = "Central Standard Time"
        Dim offset As TimeSpan = TimeZoneInfo.FindSystemTimeZoneById(timeZoneName). _
                                 GetUtcOffset(sourceDate)
        targetTime = New DateTimeOffset(sourceDate, offset)
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM -05:00
    End Sub

    Private Sub CastToDateTimeOffset()
        Dim targetTime As DateTimeOffset

        ' The Kind property of sourceDate is DateTimeKind.Unspecified
        Dim sourceDate As Date = #5/1/2008 8:30 AM#
        targetTime = sourceDate
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM -07:00

        ' define a UTC time (Kind property is DateTimeKind.Utc)
        Dim utcTime As Date = Date.SpecifyKind(sourceDate, DateTimeKind.Utc)
        targetTime = utcTime
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM +00:00

        ' Define a local time (Kind property is DateTimeKind.Local)
        Dim localTime As Date = Date.SpecifyKind(sourceDate, DateTimeKind.Local)
        targetTime = localTime
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM -07:00
    End Sub

    Private Sub ParseTimeString()
        Dim timeString As String
        Dim targetTime As DateTimeOffset

        timeString = "05/01/2008 8:30 AM +01:00"
        Try
            targetTime = DateTimeOffset.Parse(timeString)
            Console.WriteLine(targetTime)
        Catch e As FormatException
            Console.WriteLine("Unable to parse {0}.", timeString)
        End Try

        timeString = "05/01/2008 8:30 AM"
        If DateTimeOffset.TryParse(timeString, targetTime) Then
            Console.WriteLine(targetTime)
        Else
            Console.WriteLine("Unable to parse {0}.", timeString)
        End If

        timeString = "Thursday, 01 May 2008 08:30"
        Try
            targetTime = DateTimeOffset.ParseExact(timeString, "f", _
                         CultureInfo.InvariantCulture)
            Console.WriteLine(targetTime)
        Catch e As FormatException
            Console.WriteLine("Unable to parse {0}.", timeString)
        End Try

        timeString = "Thursday, 01 May 2008 08:30 +02:00"
        Dim formatString As String
        formatString = CultureInfo.InvariantCulture.DateTimeFormat.LongDatePattern & _
                        " " & _
                        CultureInfo.InvariantCulture.DateTimeFormat.ShortTimePattern & _
                        " zzz"
        If DateTimeOffset.TryParseExact(timeString, _
                                        formatString, _
                                        CultureInfo.InvariantCulture, _
                                        DateTimeStyles.AllowLeadingWhite, _
                                        targetTime) Then
            Console.WriteLine(targetTime)
        Else
            Console.WriteLine("Unable to parse {0}.", timeString)
        End If
        ' The example displays the following output to the console:
        '    5/1/2008 8:30:00 AM +01:00
        '    5/1/2008 8:30:00 AM -07:00
        '    5/1/2008 8:30:00 AM -07:00
        '    5/1/2008 8:30:00 AM +02:00
    End Sub
End Module
```
Note that, when the value of the `System.DateTimeOffset` object instantiated using a `System.Globalization.PersianCalendar` object as one of the arguments to its constructor is displayed to the console, it is expressed as a date in the Gregorian rather than the Persian calendar. To output a date using the Persian calendar, see the example in the `System.Globalization.PersianCalendar` topic.

The other two constructors create a `System.DateTimeOffset` object from a `System.DateTime` value. The first of these has a single parameter, the `System.DateTime` value to convert to a `System.DateTimeOffset` value. The offset of the resulting `System.DateTimeOffset` value depends on the `System.DateTime.Kind` property of the constructor's single parameter. If its value is `System.DateTimeKind.Utc`, the offset is set equal to `System.TimeSpan.Zero`. Otherwise, its offset is set equal to that of the local time zone. The following example illustrates the use of this constructor to instantiate `System.DateTimeOffset` objects representing UTC and the local time zone:
