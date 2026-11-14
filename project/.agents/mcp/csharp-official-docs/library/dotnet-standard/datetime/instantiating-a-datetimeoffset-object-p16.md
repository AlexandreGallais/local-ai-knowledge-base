---
title: "Instantiating a DateTimeOffset object (part 16 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object (part 16 of 16)

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
## See also

- Dates, times, and time zones
