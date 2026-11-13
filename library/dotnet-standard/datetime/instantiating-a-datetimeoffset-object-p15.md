---
title: "Instantiating a DateTimeOffset object (part 15 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object (part 15 of 16)

```csharp
using System;
using System.Globalization;

public class Class1
{
   public static void Main()
   {
      Console.WriteLine();
      CallConstructors();
      Console.WriteLine();
      CallDateTimeConstructors();
      Console.WriteLine();
      CallDateTimeWithOffsetConstructors();
      Console.WriteLine();
      CastToDateTimeOffset();
      Console.WriteLine();
      ParseTimeString();
   }

   private static void CallConstructors()
   {
      DateTimeOffset dateAndTime;

      // Instantiate date and time using years, months, days,
      // hours, minutes, and seconds
      dateAndTime = new DateTimeOffset(2008, 5, 1, 8, 6, 32,
                                       new TimeSpan(1, 0, 0));
      Console.WriteLine(dateAndTime);
      // Instantiate date and time using years, months, days,
      // hours, minutes, seconds, and milliseconds
      dateAndTime = new DateTimeOffset(2008, 5, 1, 8, 6, 32, 545,
                                       new TimeSpan(1, 0, 0));
      Console.WriteLine($"{dateAndTime.ToString("G")} {dateAndTime.ToString("zzz")}");

      // Instantiate date and time using Persian calendar with years,
      // months, days, hours, minutes, seconds, and milliseconds
      dateAndTime = new DateTimeOffset(1387, 2, 12, 8, 6, 32, 545,
                                       new PersianCalendar(),
                                       new TimeSpan(1, 0, 0));
      // Note that the console output displays the date in the Gregorian
      // calendar, not the Persian calendar.
      Console.WriteLine($"{dateAndTime.ToString("G")} {dateAndTime.ToString("zzz")}");

      // Instantiate date and time using number of ticks
      // 05/01/2008 8:06:32 AM is 633,452,259,920,000,000 ticks
      dateAndTime = new DateTimeOffset(633452259920000000, new TimeSpan(1, 0, 0));
      Console.WriteLine(dateAndTime);
      // The example displays the following output to the console:
      //       5/1/2008 8:06:32 AM +01:00
      //       5/1/2008 8:06:32 AM +01:00
      //       5/1/2008 8:06:32 AM +01:00
      //       5/1/2008 8:06:32 AM +01:00
   }

   private static void CallDateTimeConstructors()
   {
      // Declare date; Kind property is DateTimeKind.Unspecified
      DateTime sourceDate = new DateTime(2008, 5, 1, 8, 30, 0);
      DateTimeOffset targetTime;

      // Instantiate a DateTimeOffset value from a UTC time
      DateTime utcTime = DateTime.SpecifyKind(sourceDate, DateTimeKind.Utc);
      targetTime = new DateTimeOffset(utcTime);
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM +00:00
      // Because the Kind property is DateTimeKind.Utc,
      // the offset is TimeSpan.Zero.

      // Instantiate a DateTimeOffset value from a UTC time with a zero offset
      targetTime = new DateTimeOffset(utcTime, TimeSpan.Zero);
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM +00:00
      // Because the Kind property is DateTimeKind.Utc,
      // the call to the constructor succeeds

      // Instantiate a DateTimeOffset value from a UTC time with a negative offset
      try
      {
         targetTime = new DateTimeOffset(utcTime, new TimeSpan(-2, 0, 0));
         Console.WriteLine(targetTime);
      }
      catch (ArgumentException)
      {
         Console.WriteLine($"Attempt to create DateTimeOffset value from {targetTime} failed.");
      }
      // Throws exception and displays the following to the console:
      //   Attempt to create DateTimeOffset value from 5/1/2008 8:30:00 AM +00:00 failed.

      // Instantiate a DateTimeOffset value from a local time
      DateTime localTime = DateTime.SpecifyKind(sourceDate, DateTimeKind.Local);
      targetTime = new DateTimeOffset(localTime);
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM -07:00
      // Because the Kind property is DateTimeKind.Local,
      // the offset is that of the local time zone.

      // Instantiate a DateTimeOffset value from an unspecified time
      targetTime = new DateTimeOffset(sourceDate);
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM -07:00
      // Because the Kind property is DateTimeKind.Unspecified,
      // the offset is that of the local time zone.
   }

   private static void CallDateTimeWithOffsetConstructors()
   {
      DateTime sourceDate = new DateTime(2008, 5, 1, 8, 30, 0);
      DateTimeOffset targetTime;

      // Instantiate a DateTimeOffset value from a UTC time with a zero offset.
      DateTime utcTime = DateTime.SpecifyKind(sourceDate, DateTimeKind.Utc);
      targetTime = new DateTimeOffset(utcTime, TimeSpan.Zero);
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM +00:00
      // Because the Kind property is DateTimeKind.Utc,
      // the call to the constructor succeeds

      // Instantiate a DateTimeOffset value from a UTC time with a non-zero offset.
      try
      {
         targetTime = new DateTimeOffset(utcTime, new TimeSpan(-2, 0, 0));
         Console.WriteLine(targetTime);
      }
      catch (ArgumentException)
      {
         Console.WriteLine($"Attempt to create DateTimeOffset value from {utcTime} failed.");
      }
      // Throws exception and displays the following to the console:
      //   Attempt to create DateTimeOffset value from 5/1/2008 8:30:00 AM failed.

      // Instantiate a DateTimeOffset value from a local time with
      // the offset of the local time zone
      DateTime localTime = DateTime.SpecifyKind(sourceDate, DateTimeKind.Local);
      targetTime = new DateTimeOffset(localTime,
                                      TimeZoneInfo.Local.GetUtcOffset(localTime));
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM -07:00
      // Because the Kind property is DateTimeKind.Local and the offset matches
      // that of the local time zone, the call to the constructor succeeds.

      // Instantiate a DateTimeOffset value from a local time with a zero offset.
      try
      {
         targetTime = new DateTimeOffset(localTime, TimeSpan.Zero);
         Console.WriteLine(targetTime);
      }
      catch (ArgumentException)
      {
         Console.WriteLine($"Attempt to create DateTimeOffset value from {localTime} failed.");
      }
      // Throws exception and displays the following to the console:
      //   Attempt to create DateTimeOffset value from 5/1/2008 8:30:00 AM failed.

      // Instantiate a DateTimeOffset value with an arbitrary time zone.
      string timeZoneName = "Central Standard Time";
      TimeSpan offset = TimeZoneInfo.FindSystemTimeZoneById(timeZoneName).
                               GetUtcOffset(sourceDate);
      targetTime = new DateTimeOffset(sourceDate, offset);
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM -05:00
   }

   private static void CastToDateTimeOffset()
   {
      DateTimeOffset targetTime;

      // The Kind property of sourceDate is DateTimeKind.Unspecified
      DateTime sourceDate = new DateTime(2008, 5, 1, 8, 30, 0);
      targetTime = sourceDate;
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM -07:00

      // define a UTC time (Kind property is DateTimeKind.Utc)
      DateTime utcTime = DateTime.SpecifyKind(sourceDate, DateTimeKind.Utc);
      targetTime = utcTime;
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM +00:00

      // Define a local time (Kind property is DateTimeKind.Local)
      DateTime localTime = DateTime.SpecifyKind(sourceDate, DateTimeKind.Local);
      targetTime = localTime;
      Console.WriteLine(targetTime);
      // Displays 5/1/2008 8:30:00 AM -07:00
   }

   private static void ParseTimeString()
   {
      string timeString;
      DateTimeOffset targetTime;

      timeString = "05/01/2008 8:30 AM +01:00";
      try
      {
         targetTime = DateTimeOffset.Parse(timeString);
         Console.WriteLine(targetTime);
      }
      catch (FormatException)
      {
         Console.WriteLine($"Unable to parse {timeString}.");
      }

      timeString = "05/01/2008 8:30 AM";
      if (DateTimeOffset.TryParse(timeString, out targetTime))
         Console.WriteLine(targetTime);
      else
         Console.WriteLine($"Unable to parse {timeString}.");

      timeString = "Thursday, 01 May 2008 08:30";
      try
      {
         targetTime = DateTimeOffset.ParseExact(timeString, "f",
                      CultureInfo.InvariantCulture);
         Console.WriteLine(targetTime);
      }
      catch (FormatException)
      {
         Console.WriteLine($"Unable to parse {timeString}.");
      }

      timeString = "Thursday, 01 May 2008 08:30 +02:00";
      string formatString;
      formatString = CultureInfo.InvariantCulture.DateTimeFormat.LongDatePattern +
                      " " +
                      CultureInfo.InvariantCulture.DateTimeFormat.ShortTimePattern +
                      " zzz";
      if (DateTimeOffset.TryParseExact(timeString,
                                      formatString,
                                      CultureInfo.InvariantCulture,
                                      DateTimeStyles.AllowLeadingWhite,
                                      out targetTime))
         Console.WriteLine(targetTime);
      else
         Console.WriteLine($"Unable to parse {timeString}.");
      // The example displays the following output to the console:
      //    5/1/2008 8:30:00 AM +01:00
      //    5/1/2008 8:30:00 AM -07:00
      //    5/1/2008 8:30:00 AM -07:00
      //    5/1/2008 8:30:00 AM +02:00
   }
}
```
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
```
