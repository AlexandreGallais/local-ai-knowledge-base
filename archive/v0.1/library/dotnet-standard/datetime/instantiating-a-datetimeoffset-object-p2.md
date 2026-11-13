---
title: "Instantiating a DateTimeOffset object (part 2 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object (part 2 of 16)

## Date and time literals

For languages that support it, one of the most common ways to instantiate a `System.DateTime` value is to provide the date and time as a hard-coded literal value. For example, the following Visual Basic code creates a `System.DateTime` object whose value is May 1, 2008, at 8:06:32 AM.

```vb
﻿' Visual Basic .NET Document
Option Strict On

Imports System.Globalization

Module modMain
    Public Sub Main()
        UseLiteralDate()
        Console.WriteLine()
        UseLiteralDTO()
        Console.WriteLine()
        CallConstructors()
        Console.WriteLine()
        CallDateTimeConstructors()
        Console.WriteLine()
        CallDateTimeWithOffsetConstructors()
        Console.WriteLine()
        CastToDateTimeOffset()
        Console.WriteLine()
        ParseTimeString()
    End Sub

    Private Sub UseLiteralDate()
        Dim literalDate1 As Date = #05/01/2008 8:06:32 AM#
        Console.WriteLine(literalDate1.ToString())
        ' Displays:
        '              5/1/2008 8:06:32 AM
    End Sub

    Private Sub UseLiteralDTO()
        Dim literalDate As DateTimeOffset = #05/01/2008 8:06:32 AM#
        Console.WriteLine(literalDate.ToString())
        ' Displays:
        '              5/1/2008 8:06:32 AM -07:00
    End Sub

    Private Sub CallConstructors()
        Console.WriteLine("***Begin Snippet3***")
        Dim dateAndTime As DateTimeOffset

        ' Instantiate date and time using years, months, days, 
        ' hours, minutes, and seconds
        dateAndTime = New DateTimeOffset(2008, 5, 1, 8, 6, 32, _
                                         New TimeSpan(1, 0, 0))
        Console.WriteLine(dateAndTime)
        ' Instantiate date and time using years, months, days,
        ' hours, minutes, seconds, and milliseconds
        dateAndTime = New DateTimeOffset(2008, 5, 1, 8, 6, 32, 545, _
                                         New TimeSpan(1, 0, 0))
        Console.WriteLine("{0} {1}", dateAndTime.ToString("G"), _
                                     dateAndTime.ToString("zzz"))

        ' Instantiate date and time using Persian calendar with years,
        ' months, days, hours, minutes, seconds, and milliseconds
        dateAndTime = New DateTimeOffset(1387, 2, 12, 8, 6, 32, 545, New PersianCalendar, New TimeSpan(1, 0, 0))
        ' Note that the console output displays the date in the Gregorian
        ' calendar, not the Persian calendar. 
        Console.WriteLine("{0} {1}", dateAndTime.ToString("G"), _
                                     dateAndTime.ToString("zzz"))

        ' Instantiate date and time using number of ticks
        ' 05/01/2008 8:06:32 AM is 633,452,259,920,000,000 ticks
        dateAndTime = New DateTimeOffset(633452259920000000, New TimeSpan(1, 0, 0))
        Console.WriteLine(dateAndTime)
        ' The example displays the following output to the console:
        '       5/1/2008 8:06:32 AM +01:00
        '       5/1/2008 8:06:32 AM +01:00
        '       5/1/2008 8:06:32 AM +01:00
        '       5/1/2008 8:06:32 AM +01:00
        Console.WriteLine("***End Snippet3***")
    End Sub

    Private Sub CallDateTimeConstructors()
        ' Declare date; Kind property is DateTimeKind.Unspecified
        Dim sourceDate As Date = #5/1/2008 8:30 AM#
        Dim targetTime As DateTimeOffset

        ' Instantiate a DateTimeOffset value from a UTC time 
        Dim utcTime As Date = Date.SpecifyKind(sourceDate, DateTimeKind.Utc)
        targetTime = New DateTimeOffset(utcTime)
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM +00:00
        ' Because the Kind property is DateTimeKind.Utc, 
        ' the offset is TimeSpan.Zero.

        ' Instantiate a DateTimeOffset value from a local time
        Dim localTime As Date = Date.SpecifyKind(sourceDate, DateTimeKind.Local)
        targetTime = New DateTimeOffset(localTime)
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM -07:00
        ' Because the Kind property is DateTimeKind.Local, 
        ' the offset is that of the local time zone.

        ' Instantiate a DateTimeOffset value from an unspecified time
        targetTime = New DateTimeOffset(sourceDate)
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM -07:00
        ' Because the Kind property is DateTimeKind.Unspecified, 
        ' the offset is that of the local time zone.

        '
    End Sub

    Private Sub CallDateTimeWithOffsetConstructors()
        Dim sourceDate As Date = #5/1/2008 8:30 AM#
        Dim targetTime As DateTimeOffset

        ' Instantiate a DateTimeOffset value from a UTC time with a zero offset.
        Dim utcTime As Date = Date.SpecifyKind(sourceDate, DateTimeKind.Utc)
        targetTime = New DateTimeOffset(utcTime, TimeSpan.Zero)
        Console.WriteLine(targetTime)
        ' Displays 5/1/2008 8:30:00 AM +00:00
        ' Because the Kind property is DateTimeKind.Utc,  
        ' the call to the constructor succeeds.

        ' Instantiate a DateTimeOffset value from a UTC time with a non-zero offset.
        Try
            targetTime = New DateTimeOffset(utcTime, New TimeSpan(-2, 0, 0))
            Console.WriteLine(targetTime)
        Catch e As ArgumentException
            Console.WriteLine("Attempt to create DateTimeOffset value from {0} failed.", _
                               utcTime)
        End Try
        ' Throws exception and displays the following to the console:
        '   Attempt to create DateTimeOffset value from 5/1/2008 8:30:00 AM failed.

        ' Instantiate a DateTimeOffset value from a local time with 
        ' the offset of the local time zone.
        Dim localTime As Date = Date.SpecifyKind(sourceDate, DateTimeKind.Local)
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
`System.DateTimeOffset` values can also be initialized using date and time literals when using languages that support `System.DateTime` literals. For example, the following Visual Basic code creates a `System.DateTimeOffset` object.
