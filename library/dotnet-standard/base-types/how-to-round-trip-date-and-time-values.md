---
title: "How to: Round-trip Date and Time Values"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/how-to-round-trip-date-and-time-values.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Round-trip Date and time values

In many applications, a date and time value is intended to unambiguously identify a single point in time. This article shows how to save and restore a `System.DateTime` value, a `System.DateTimeOffset` value, and a date and time value with time zone information so that the restored value identifies the same time as the saved value.

## Round-trip a DateTime value

1. Convert the `System.DateTime` value to its string representation by calling the `System.DateTime.ToString(System.String)` method with the "o" format specifier.

2. Save the string representation of the `System.DateTime` value to a file, or pass it across a process, application domain, or machine boundary.

3. Retrieve the string that represents the `System.DateTime` value.

4. Call the `System.DateTime.Parse(System.String,System.IFormatProvider,System.Globalization.DateTimeStyles)` method, and pass `System.Globalization.DateTimeStyles.RoundtripKind` as the value of the `styles` parameter.

The following example illustrates how to round-trip a `System.DateTime` value.

```csharp
using System;
using System.Globalization;
using System.IO;

public class Class1
{
    public static void Main()
    {
        RoundTripDateTime();
        Console.WriteLine();
        RoundTripDateTimeOffset();
        Console.WriteLine();
    }

    private static void RoundTripDateTime()
    {
        const string fileName = @".\DateFile.txt";

        StreamWriter outFile = new StreamWriter(fileName);

        // Save DateTime value.
        DateTime dateToSave = DateTime.SpecifyKind(new DateTime(2008, 6, 12, 18, 45, 15),
                                                   DateTimeKind.Local);
        string? dateString = dateToSave.ToString("o");
        Console.WriteLine($"Converted {dateToSave.ToString()} ({dateToSave.Kind.ToString()}) to {dateString}.");
        outFile.WriteLine(dateString);
        Console.WriteLine($"Wrote {dateString} to {fileName}.");
        outFile.Close();

        // Restore DateTime value.
        DateTime restoredDate;

        using StreamReader inFile = new StreamReader(fileName);
        dateString = inFile.ReadLine();

        if (dateString is not null)
        {
            restoredDate = DateTime.Parse(dateString, null, DateTimeStyles.RoundtripKind);
            Console.WriteLine($"Read {restoredDate.ToString()} ({restoredDate.Kind.ToString()}) from {fileName}.");
        }

        // The example displays the following output:
        //    Converted 6/12/2008 6:45:15 PM (Local) to 2008-06-12T18:45:15.0000000-05:00.
        //    Wrote 2008-06-12T18:45:15.0000000-05:00 to .\DateFile.txt.
        //    Read 6/12/2008 6:45:15 PM (Local) from .\DateFile.txt.
    }

    private static void RoundTripDateTimeOffset()
    {
        const string fileName = @".\DateOff.txt";

        StreamWriter outFile = new StreamWriter(fileName);

        // Save DateTime value.
        DateTimeOffset dateToSave = new DateTimeOffset(2008, 6, 12, 18, 45, 15,
                                                       new TimeSpan(7, 0, 0));
        string? dateString = dateToSave.ToString("o");
        Console.WriteLine($"Converted {dateToSave.ToString()} to {dateString}.");
        outFile.WriteLine(dateString);
        Console.WriteLine($"Wrote {dateString} to {fileName}.");
        outFile.Close();

        // Restore DateTime value.
        DateTimeOffset restoredDateOff;

        using StreamReader inFile = new StreamReader(fileName);
        dateString = inFile.ReadLine();

        if (dateString is not null)
        {
            restoredDateOff = DateTimeOffset.Parse(dateString, null,
                                                   DateTimeStyles.RoundtripKind);
            Console.WriteLine($"Read {restoredDateOff.ToString()} from {fileName}.");
        }

        // The example displays the following output:
        //    Converted 6/12/2008 6:45:15 PM +07:00 to 2008-06-12T18:45:15.0000000+07:00.
        //    Wrote 2008-06-12T18:45:15.0000000+07:00 to .\DateOff.txt.
        //    Read 6/12/2008 6:45:15 PM +07:00 from .\DateOff.txt.
    }
}

[Serializable]
public class DateInTimeZone
{
    private TimeZoneInfo? tz;
    private DateTimeOffset thisDate;

    public DateInTimeZone() { }

    public DateInTimeZone(DateTimeOffset date, TimeZoneInfo timeZone)
    {
        if (timeZone is null)
            throw new ArgumentNullException("timeZone", "The time zone cannot be null.");

        this.thisDate = date;
        this.tz = timeZone;
    }

    public DateTimeOffset DateAndTime
    {
        get
        {
            return thisDate;
        }
        set
        {
            if ((tz is not null) && (value.Offset != tz.GetUtcOffset(value)))
                thisDate = TimeZoneInfo.ConvertTime(value, tz);
            else
                thisDate = value;
        }
    }

    public TimeZoneInfo? TimeZone => tz;
}
```

When round-tripping a `System.DateTime` value, this technique successfully preserves the time for all local and universal times. For example, if a local `System.DateTime` value is saved on a system in the U.S. Pacific Standard Time zone and is restored on a system in the U.S. Central Standard Time zone, the restored date and time will be two hours later than the original time, which reflects the time difference between the two time zones. However, this technique is not necessarily accurate for unspecified times. All `System.DateTime` values whose `System.DateTime.Kind` property is `System.DateTimeKind.Unspecified` are treated as if they are local times. If it's not a local time, the `System.DateTime` doesn't successfully identify the correct point in time. The workaround for this limitation is to tightly couple a date and time value with its time zone for the save and restore operation.

## Round-trip a DateTimeOffset value

1. Convert the `System.DateTimeOffset` value to its string representation by calling the `System.DateTimeOffset.ToString(System.String)` method with the "o" format specifier.

2. Save the string representation of the `System.DateTimeOffset` value to a file, or pass it across a process, application domain, or machine boundary.

3. Retrieve the string that represents the `System.DateTimeOffset` value.

4. Call the `System.DateTimeOffset.Parse(System.String,System.IFormatProvider,System.Globalization.DateTimeStyles)` method, and pass `System.Globalization.DateTimeStyles.RoundtripKind` as the value of the `styles` parameter.

The following example illustrates how to round-trip a `System.DateTimeOffset` value.

```csharp
using System;
using System.Globalization;
using System.IO;

public class Class1
{
    public static void Main()
    {
        RoundTripDateTime();
        Console.WriteLine();
        RoundTripDateTimeOffset();
        Console.WriteLine();
    }

    private static void RoundTripDateTime()
    {
        const string fileName = @".\DateFile.txt";

        StreamWriter outFile = new StreamWriter(fileName);

        // Save DateTime value.
        DateTime dateToSave = DateTime.SpecifyKind(new DateTime(2008, 6, 12, 18, 45, 15),
                                                   DateTimeKind.Local);
        string? dateString = dateToSave.ToString("o");
        Console.WriteLine($"Converted {dateToSave.ToString()} ({dateToSave.Kind.ToString()}) to {dateString}.");
        outFile.WriteLine(dateString);
        Console.WriteLine($"Wrote {dateString} to {fileName}.");
        outFile.Close();

        // Restore DateTime value.
        DateTime restoredDate;

        using StreamReader inFile = new StreamReader(fileName);
        dateString = inFile.ReadLine();

        if (dateString is not null)
        {
            restoredDate = DateTime.Parse(dateString, null, DateTimeStyles.RoundtripKind);
            Console.WriteLine($"Read {restoredDate.ToString()} ({restoredDate.Kind.ToString()}) from {fileName}.");
        }

        // The example displays the following output:
        //    Converted 6/12/2008 6:45:15 PM (Local) to 2008-06-12T18:45:15.0000000-05:00.
        //    Wrote 2008-06-12T18:45:15.0000000-05:00 to .\DateFile.txt.
        //    Read 6/12/2008 6:45:15 PM (Local) from .\DateFile.txt.
    }

    private static void RoundTripDateTimeOffset()
    {
        const string fileName = @".\DateOff.txt";

        StreamWriter outFile = new StreamWriter(fileName);

        // Save DateTime value.
        DateTimeOffset dateToSave = new DateTimeOffset(2008, 6, 12, 18, 45, 15,
                                                       new TimeSpan(7, 0, 0));
        string? dateString = dateToSave.ToString("o");
        Console.WriteLine($"Converted {dateToSave.ToString()} to {dateString}.");
        outFile.WriteLine(dateString);
        Console.WriteLine($"Wrote {dateString} to {fileName}.");
        outFile.Close();

        // Restore DateTime value.
        DateTimeOffset restoredDateOff;

        using StreamReader inFile = new StreamReader(fileName);
        dateString = inFile.ReadLine();

        if (dateString is not null)
        {
            restoredDateOff = DateTimeOffset.Parse(dateString, null,
                                                   DateTimeStyles.RoundtripKind);
            Console.WriteLine($"Read {restoredDateOff.ToString()} from {fileName}.");
        }

        // The example displays the following output:
        //    Converted 6/12/2008 6:45:15 PM +07:00 to 2008-06-12T18:45:15.0000000+07:00.
        //    Wrote 2008-06-12T18:45:15.0000000+07:00 to .\DateOff.txt.
        //    Read 6/12/2008 6:45:15 PM +07:00 from .\DateOff.txt.
    }
}

[Serializable]
public class DateInTimeZone
{
    private TimeZoneInfo? tz;
    private DateTimeOffset thisDate;

    public DateInTimeZone() { }

    public DateInTimeZone(DateTimeOffset date, TimeZoneInfo timeZone)
    {
        if (timeZone is null)
            throw new ArgumentNullException("timeZone", "The time zone cannot be null.");

        this.thisDate = date;
        this.tz = timeZone;
    }

    public DateTimeOffset DateAndTime
    {
        get
        {
            return thisDate;
        }
        set
        {
            if ((tz is not null) && (value.Offset != tz.GetUtcOffset(value)))
                thisDate = TimeZoneInfo.ConvertTime(value, tz);
            else
                thisDate = value;
        }
    }

    public TimeZoneInfo? TimeZone => tz;
}
```

This technique always unambiguously identifies a `System.DateTimeOffset` value as a single point in time. The value can then be converted to Coordinated Universal Time (UTC) by calling the `System.DateTimeOffset.ToUniversalTime*` method, or it can be converted to the time in a particular time zone by calling the `System.DateTimeOffset.ToOffset*` or `System.TimeZoneInfo.ConvertTime(System.DateTimeOffset,System.TimeZoneInfo)` method. The major limitation of this technique is that date and time arithmetic, when performed on a `System.DateTimeOffset` value that represents the time in a particular time zone, may not produce accurate results for that time zone. This is because when a `System.DateTimeOffset` value is instantiated, it is disassociated from its time zone. Therefore, that time zone's adjustment rules can no longer be applied when you perform date and time calculations. You can work around this problem by defining a custom type that includes both a date and time value and its accompanying time zone.

## Compile the code

These examples require that the following namespaces be imported with C# `using` directives or Visual Basic `Imports` statements:

- `System` (C# only)
- `System.Globalization`
- `System.IO`

## See also

- Choosing Between DateTime, DateTimeOffset, TimeSpan, and TimeZoneInfo
- Standard Date and Time Format Strings
