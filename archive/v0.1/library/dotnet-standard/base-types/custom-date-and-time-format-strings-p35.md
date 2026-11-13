---
title: "Custom date and time format strings (part 35 of 36)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/custom-date-and-time-format-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Custom date and time format strings (part 35 of 36)

###  The "zzz" custom format specifier

With `System.DateTime` values, the "zzz" custom format specifier represents the signed offset of the specified time zone from UTC, measured in hours and minutes. The offset is always displayed with a leading sign. A plus sign (+) indicates hours ahead of UTC, and a minus sign (-) indicates hours behind UTC. A single-digit offset is formatted with a leading zero.

The following table shows how the offset value changes depending on `System.DateTimeKind`.

| `System.DateTimeKind` value | Offset value |
| - | - |
| `System.DateTimeKind.Local` | The signed offset of the local operating system's time zone from UTC. |
| `System.DateTimeKind.Unspecified` | The signed offset of the local operating system's time zone from UTC. |
| `System.DateTimeKind.Utc` | `+00:00` on .NET Core and .NET 5+.  On .NET Framework, the signed offset of the local operating system's time zone from UTC. |

With `System.DateTimeOffset` values, this format specifier represents the `System.DateTimeOffset` value's offset from UTC in hours and minutes.

The following example includes the "zzz" custom format specifier in a custom format string.

```csharp
using System;
using System.Globalization;

public class Class1
{
    public static void Main()
    {
        Show_dSpecifier();
        Console.WriteLine();
        Show_ddSpecifier();
        Show_dddSpecifier();
        Show_ddddSpecifier();
        Show_fSpecifiers();
        Show_gSpecifier();
        Show_hSpecifier();
        Show_hhSpecifier();
        ShowHSpecifier();
        ShowHHSpecifier();
        ShowMSpecifier();
        ShowKSpecifier();
        Show_ySpecifier();
        Show_zSpecifier();
    }

    private static void Show_dSpecifier()
    {
        Console.WriteLine("d format specifier");
        DateTime date1 = new DateTime(2008, 8, 29, 19, 27, 15);

        Console.WriteLine(date1.ToString("d, M",
                          CultureInfo.InvariantCulture));
        // Displays 29, 8

        Console.WriteLine(date1.ToString("d MMMM",
                          CultureInfo.CreateSpecificCulture("en-US")));
        // Displays 29 August
        Console.WriteLine(date1.ToString("d MMMM",
                          CultureInfo.CreateSpecificCulture("es-MX")));
        // Displays 29 agosto
        Console.WriteLine();
    }

    private static void Show_ddSpecifier()
    {
        Console.WriteLine("dd format specifier");
        DateTime date1 = new DateTime(2008, 1, 2, 6, 30, 15);

        Console.WriteLine(date1.ToString("dd, MM",
                          CultureInfo.InvariantCulture));
        // 02, 01
        Console.WriteLine();
    }

    private static void Show_dddSpecifier()
    {
        Console.WriteLine("ddd format specifier");
        DateTime date1 = new DateTime(2008, 8, 29, 19, 27, 15);

        Console.WriteLine(date1.ToString("ddd d MMM",
                          CultureInfo.CreateSpecificCulture("en-US")));
        // Displays Fri 29 Aug
        Console.WriteLine(date1.ToString("ddd d MMM",
                          CultureInfo.CreateSpecificCulture("fr-FR")));
        // Displays ven. 29 août
        Console.WriteLine();
    }

    private static void Show_ddddSpecifier()
    {
        Console.WriteLine("dddd format specifier");
        DateTime date1 = new DateTime(2008, 8, 29, 19, 27, 15);

        Console.WriteLine(date1.ToString("dddd dd MMMM",
                          CultureInfo.CreateSpecificCulture("en-US")));
        // Displays Friday 29 August
        Console.WriteLine(date1.ToString("dddd dd MMMM",
                          CultureInfo.CreateSpecificCulture("it-IT")));
        // Displays venerdì 29 agosto
        Console.WriteLine();
    }

    private static void Show_fSpecifiers()
    {
        Console.WriteLine("f and F format specifiers");
        DateTime date1 = new DateTime(2008, 8, 29, 19, 27, 15, 18);
        CultureInfo ci = CultureInfo.InvariantCulture;

        Console.WriteLine(date1.ToString("hh:mm:ss.f", ci));
        // Displays 07:27:15.0
        Console.WriteLine(date1.ToString("hh:mm:ss.F", ci));
        // Displays 07:27:15
        Console.WriteLine(date1.ToString("hh:mm:ss.ff", ci));
        // Displays 07:27:15.01
        Console.WriteLine(date1.ToString("hh:mm:ss.FF", ci));
        // Displays 07:27:15.01
        Console.WriteLine(date1.ToString("hh:mm:ss.fff", ci));
        // Displays 07:27:15.018
        Console.WriteLine(date1.ToString("hh:mm:ss.FFF", ci));
        // Displays 07:27:15.018
        Console.WriteLine();
    }

    private static void Show_gSpecifier()
    {
        Console.WriteLine("g format specifier");
        DateTime date1 = new DateTime(70, 08, 04);

        Console.WriteLine(date1.ToString("MM/dd/yyyy g",
                          CultureInfo.InvariantCulture));
        // Displays 08/04/0070 A.D.
        Console.WriteLine(date1.ToString("MM/dd/yyyy g",
                          CultureInfo.CreateSpecificCulture("fr-FR")));
        // Displays 08/04/0070 ap. J.-C.
        Console.WriteLine();
    }

    private static void Show_hSpecifier()
    {
        Console.WriteLine("h format specifier");
        DateTime date1;
        date1 = new DateTime(2008, 1, 1, 18, 9, 1);
        Console.WriteLine(date1.ToString("h:m:s.F t",
                          CultureInfo.InvariantCulture));
        // Displays 6:9:1 P
        Console.WriteLine(date1.ToString("h:m:s.F t",
                          CultureInfo.CreateSpecificCulture("el-GR")));
        // Displays 6:9:1 µ
        date1 = new DateTime(2008, 1, 1, 18, 9, 1, 500);
        Console.WriteLine(date1.ToString("h:m:s.F t",
                          CultureInfo.InvariantCulture));
        // Displays 6:9:1.5 P
        Console.WriteLine(date1.ToString("h:m:s.F t",
                          CultureInfo.CreateSpecificCulture("el-GR")));
        // Displays 6:9:1.5 µ
        Console.WriteLine();
    }

    private static void Show_hhSpecifier()
    {
        Console.WriteLine("hh format specifier");
        DateTime date1;
        date1 = new DateTime(2008, 1, 1, 18, 9, 1);
        Console.WriteLine(date1.ToString("hh:mm:ss tt",
                          CultureInfo.InvariantCulture));
        // Displays 06:09:01 PM
        Console.WriteLine(date1.ToString("hh:mm:ss tt",
                          CultureInfo.CreateSpecificCulture("hu-HU")));
        // Displays 06:09:01 du.
        date1 = new DateTime(2008, 1, 1, 18, 9, 1, 500);
        Console.WriteLine(date1.ToString("hh:mm:ss.ff tt",
                          CultureInfo.InvariantCulture));
        // Displays 06:09:01.50 PM
        Console.WriteLine(date1.ToString("hh:mm:ss.ff tt",
                          CultureInfo.CreateSpecificCulture("hu-HU")));
        // Displays 06:09:01.50 du.
        Console.WriteLine();
    }

    private static void ShowHSpecifier()
    {
        Console.WriteLine("H format specifier");
        DateTime date1 = new DateTime(2008, 1, 1, 6, 9, 1);
        Console.WriteLine(date1.ToString("H:mm:ss",
                          CultureInfo.InvariantCulture));
        // Displays 6:09:01
        Console.WriteLine();
    }

    private static void ShowHHSpecifier()
    {
        Console.WriteLine("HH format specifier");
        DateTime date1 = new DateTime(2008, 1, 1, 6, 9, 1);
        Console.WriteLine(date1.ToString("HH:mm:ss",
                          CultureInfo.InvariantCulture));
        // Displays 06:09:01
        Console.WriteLine();
    }

    private static void ShowMSpecifier()
    {
        Console.WriteLine("M format specifier");
        DateTime date1 = new DateTime(2008, 8, 18);
        Console.WriteLine(date1.ToString("(M) MMM, MMMM",
                          CultureInfo.CreateSpecificCulture("en-US")));
        // Displays (8) Aug, August
        Console.WriteLine(date1.ToString("(M) MMM, MMMM",
                          CultureInfo.CreateSpecificCulture("nl-NL")));
        // Displays (8) aug, augustus
        Console.WriteLine(date1.ToString("(M) MMM, MMMM",
                          CultureInfo.CreateSpecificCulture("lv-LV")));
        // Displays (8) Aug, augusts
        Console.WriteLine();
    }

    private static void ShowKSpecifier()
    {
        Console.WriteLine("K format specifier");
        Console.WriteLine(DateTime.Now.ToString("%K"));
        // Displays -07:00
        Console.WriteLine(DateTime.UtcNow.ToString("%K"));
        // Displays Z
        Console.WriteLine($"'{DateTime.SpecifyKind(DateTime.Now,
                               DateTimeKind.Unspecified).ToString("%K")}'");
        // Displays ''
        Console.WriteLine(DateTimeOffset.Now.ToString("%K"));
        // Displays -07:00
        Console.WriteLine(DateTimeOffset.UtcNow.ToString("%K"));
        // Displays +00:00
        Console.WriteLine(new DateTimeOffset(2008, 5, 1, 6, 30, 0,
                              new TimeSpan(5, 0, 0)).ToString("%K"));
        // Displays +05:00
        Console.WriteLine();
    }

    private static void Show_ySpecifier()
    {
        Console.WriteLine("y format specifier");
        DateTime date1 = new DateTime(1, 12, 1);
        DateTime date2 = new DateTime(2010, 1, 1);
        Console.WriteLine(date1.ToString("%y"));
        // Displays 1
        Console.WriteLine(date1.ToString("yy"));
        // Displays 01
        Console.WriteLine(date1.ToString("yyy"));
        // Displays 001
        Console.WriteLine(date1.ToString("yyyy"));
        // Displays 0001
        Console.WriteLine(date1.ToString("yyyyy"));
        // Displays 00001
        Console.WriteLine(date2.ToString("%y"));
        // Displays 10
        Console.WriteLine(date2.ToString("yy"));
        // Displays 10
        Console.WriteLine(date2.ToString("yyy"));
        // Displays 2010
        Console.WriteLine(date2.ToString("yyyy"));
        // Displays 2010
        Console.WriteLine(date2.ToString("yyyyy"));
        // Displays 02010
        Console.WriteLine();
    }

    private static void Show_zSpecifier()
    {
        Console.WriteLine("z format specifier");
        DateTime date1 = DateTime.UtcNow;
        Console.WriteLine(String.Format("{0:%z}, {0:zz}, {0:zzz}",
                          date1));
        // Displays -7, -07, -07:00 on .NET Framework
        // Displays +0, +00, +00:00 on .NET Core and .NET 5+

        DateTimeOffset date2 = new DateTimeOffset(2008, 8, 1, 0, 0, 0,
                                                  new TimeSpan(6, 0, 0));
        Console.WriteLine(String.Format("{0:%z}, {0:zz}, {0:zzz}",
                          date2));
        // Displays +6, +06, +06:00
        Console.WriteLine();
    }
}
```

Back to table

## Date and time separator specifiers

###  The ":" custom format specifier

The ":" custom format specifier represents the time separator, which is used to differentiate hours, minutes, and seconds. The appropriate localized time separator is retrieved from the `System.Globalization.DateTimeFormatInfo.TimeSeparator` property of the current or specified culture.

> **Note:**
> To change the time separator for a particular date and time string, specify the separator character within a literal string delimiter. For example, the custom format string `hh'_'dd'_'ss` produces a result string in which "\_" (an underscore) is always used as the time separator. To change the time separator for all dates for a culture, either change the value of the `System.Globalization.DateTimeFormatInfo.TimeSeparator` property of the current culture, or instantiate a `System.Globalization.DateTimeFormatInfo` object, assign the character to its `System.Globalization.DateTimeFormatInfo.TimeSeparator` property, and call an overload of the formatting method that includes an `System.IFormatProvider` parameter.

If the ":" format specifier is used without other custom format specifiers, it's interpreted as a standard date and time format specifier and throws a `System.FormatException`. For more information about using a single format specifier, see Using Single Custom Format Specifiers later in this article.

Back to table

###  The "/" custom format specifier

The "/" custom format specifier represents the date separator, which is used to differentiate years, months, and days. The appropriate localized date separator is retrieved from the `System.Globalization.DateTimeFormatInfo.DateSeparator` property of the current or specified culture.

> **Note:**
> To change the date separator for a particular date and time string, specify the separator character within a literal string delimiter. For example, the custom format string `mm'/'dd'/'yyyy` produces a result string in which "/" is always used as the date separator. To change the date separator for all dates for a culture, either change the value of the `System.Globalization.DateTimeFormatInfo.DateSeparator` property of the current culture, or instantiate a `System.Globalization.DateTimeFormatInfo` object, assign the character to its `System.Globalization.DateTimeFormatInfo.DateSeparator` property, and call an overload of the formatting method that includes an `System.IFormatProvider` parameter.

If the "/" format specifier is used without other custom format specifiers, it's interpreted as a standard date and time format specifier and throws a `System.FormatException`. For more information about using a single format specifier, see Using Single Custom Format Specifiers later in this article.

Back to table
