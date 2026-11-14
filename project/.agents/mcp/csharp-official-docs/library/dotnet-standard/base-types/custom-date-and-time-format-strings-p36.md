---
title: "Custom date and time format strings (part 36 of 36)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/custom-date-and-time-format-strings.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Custom date and time format strings (part 36 of 36)

##  Character literals

The following characters in a custom date and time format string are reserved and are always interpreted as formatting characters or, in the case of `"`, `'`, `/`, and `\`, as special characters.

- `F`
- `H`
- `K`
- `M`
- `d`
- `f`
- `g`
- `h`
- `m`
- `s`
- `t`
- `y`
- `z`
- `%`
- `:`
- `/`
- `"`
- `'`
- `\`

All other characters are always interpreted as character literals and, in a formatting operation, are included in the result string unchanged.  In a parsing operation, they must match the characters in the input string exactly; the comparison is case-sensitive.

The following example includes the literal characters "PST" (for Pacific Standard Time) and "PDT" (for Pacific Daylight Time) to represent the local time zone in a format string. Note that the string is included in the result string, and that a string that includes the local time zone string also parses successfully.

```csharp
﻿using System;
using System.Globalization;

public class Example5
{
    public static void Main()
    {
        string[] formats = { "dd MMM yyyy hh:mm tt PST",
                           "dd MMM yyyy hh:mm tt PDT" };
        var dat = new DateTime(2016, 8, 18, 16, 50, 0);
        // Display the result string.
        Console.WriteLine(dat.ToString(formats[1]));

        // Parse a string.
        string value = "25 Dec 2016 12:00 pm PST";
        if (DateTime.TryParseExact(value, formats, null,
                                   DateTimeStyles.None, out DateTime newDate))
            Console.WriteLine(newDate);
        else
            Console.WriteLine($"Unable to parse '{value}'");

        // The example displays the following output:
        //       18 Aug 2016 04:50 PM PDT
        //       12/25/2016 12:00:00 PM
    }
}
```

There are two ways to indicate that characters are to be interpreted as literal characters and not as reserve characters, so that they can be included in a result string or successfully parsed in an input string:

- By escaping each reserved character. For more information, see Using the Escape Character.

The following example includes the literal characters "pst" (for Pacific Standard time) to represent the local time zone in a format string. Because both "s" and "t" are custom format strings, both characters must be escaped to be interpreted as character literals.

```csharp
﻿using System;
using System.Globalization;

public class Example3
{
    public static void Main()
    {
        string format = "dd MMM yyyy hh:mm tt p\\s\\t";
        var dat = new DateTime(2016, 8, 18, 16, 50, 0);
        // Display the result string.
        Console.WriteLine(dat.ToString(format));

        // Parse a string.
        string value = "25 Dec 2016 12:00 pm pst";
        if (DateTime.TryParseExact(value, format, null,
                                   DateTimeStyles.None, out DateTime newDate))
            Console.WriteLine(newDate);
        else
            Console.WriteLine($"Unable to parse '{value}'");

        // The example displays the following output:
        //       18 Aug 2016 04:50 PM pst
        //       12/25/2016 12:00:00 PM
    }
}
```

- By enclosing the entire literal string in quotation marks or apostrophes. The following example is like the previous one, except that "pst" is enclosed in quotation marks to indicate that the entire delimited string should be interpreted as character literals.

```csharp
﻿using System;
using System.Globalization;

public class Example6
{
    public static void Main()
    {
        string format = "dd MMM yyyy hh:mm tt \"pst\"";
        var dat = new DateTime(2016, 8, 18, 16, 50, 0);
        // Display the result string.
        Console.WriteLine(dat.ToString(format));

        // Parse a string.
        string value = "25 Dec 2016 12:00 pm pst";
        if (DateTime.TryParseExact(value, format, null,
                                   DateTimeStyles.None, out DateTime newDate))
            Console.WriteLine(newDate);
        else
            Console.WriteLine($"Unable to parse '{value}'");

        // The example displays the following output:
        //       18 Aug 2016 04:50 PM pst
        //       12/25/2016 12:00:00 PM
    }
}
```

## Notes

###  Using single custom format specifiers

A custom date and time format string consists of two or more characters. Date and time formatting methods interpret any single-character string as a standard date and time format string. If they don't recognize the character as a valid format specifier, they throw a `System.FormatException`. For example, a format string that consists only of the specifier "h" is interpreted as a standard date and time format string. However, in this particular case, an exception is thrown because there is no "h" standard date and time format specifier.

To use any of the custom date and time format specifiers as the only specifier in a format string (that is, to use the "d", "f", "F", "g", "h", "H", "K", "m", "M", "s", "t", "y", "z", ":", or "/" custom format specifier by itself), include a space before the specifier, or include a percent ("%") format specifier before the single custom date and time specifier.

For example, "`%h"` is interpreted as a custom date and time format string that displays the hour represented by the current date and time value. You can also use the " h" format string, although this includes a space in the result string along with the hour. The following example illustrates these format strings.

```csharp
﻿using System;

public class Example2
{
    public static void Main()
    {
        DateTime dat1 = new(2009, 6, 15, 13, 45, 0);

        Console.WriteLine($"'{dat1:%h}'");
        Console.WriteLine($"'{dat1: h}'");

        // The example displays the following output:
        //       '1'
        //       ' 1'
    }
}
```

####  Using the Escape character

The "d", "f", "F", "g", "h", "H", "K", "m", "M", "s", "t", "y", "z", ":", or "/" characters in a format string are interpreted as custom format specifiers rather than as literal characters. To prevent a character from being interpreted as a format specifier, you can precede it with a backslash (\\), which is the escape character. The escape character signifies that the following character is a character literal that should be included in the result string unchanged.

To include a backslash in a result string, you must escape it with another backslash (`\\`).

> **Note:**
> Some compilers, such as the C++ and C# compilers, may also interpret a single backslash character as an escape character. To ensure that a string is interpreted correctly when formatting, you can use the verbatim string literal character (the @ character) before the string in C#, or add another backslash character before each backslash in C# and C++. The following C# example illustrates both approaches.

The following example uses the escape character to prevent the formatting operation from interpreting the "h" and "m" characters as format specifiers.

```csharp
using System;

public class Example4
{
    public static void Main()
    {
        DateTime date = new DateTime(2009, 06, 15, 13, 45, 30, 90);
        string fmt1 = "h \\h m \\m";
        string fmt2 = @"h \h m \m";

        Console.WriteLine($"{date} ({fmt1}) -> {date.ToString(fmt1)}");
        Console.WriteLine($"{date} ({fmt2}) -> {date.ToString(fmt2)}");

        // The example displays the following output:
        //       6/15/2009 1:45:30 PM (h \h m \m) -> 1 h 45 m
        //       6/15/2009 1:45:30 PM (h \h m \m) -> 1 h 45 m
    }
}
```

### Control Panel settings

The **Regional and Language Options** settings in Control Panel influence the result string produced by a formatting operation that includes many of the custom date and time format specifiers. These settings are used to initialize the `System.Globalization.DateTimeFormatInfo` object associated with the current culture, which provides values used to govern formatting. Computers that use different settings generate different result strings.

In addition, if you use the `System.Globalization.CultureInfo.#ctor(System.String)` constructor to instantiate a new `System.Globalization.CultureInfo` object that represents the same culture as the current system culture, any customizations established by the **Regional and Language Options** item in Control Panel will be applied to the new `System.Globalization.CultureInfo` object. You can use the `System.Globalization.CultureInfo.#ctor(System.String,System.Boolean)` constructor to create a `System.Globalization.CultureInfo` object that doesn't reflect a system's customizations.

### DateTimeFormatInfo properties

Formatting is influenced by properties of the current `System.Globalization.DateTimeFormatInfo` object, which is provided implicitly by the current culture or explicitly by the `System.IFormatProvider` parameter of the method that invokes formatting. For the `System.IFormatProvider` parameter, you should specify a `System.Globalization.CultureInfo` object, which represents a culture, or a `System.Globalization.DateTimeFormatInfo` object.

The result string produced by many of the custom date and time format specifiers also depends on properties of the current `System.Globalization.DateTimeFormatInfo` object. Your application can change the result produced by some custom date and time format specifiers by changing the corresponding `System.Globalization.DateTimeFormatInfo` property. For example, the "ddd" format specifier adds an abbreviated weekday name found in the `System.Globalization.DateTimeFormatInfo.AbbreviatedDayNames*` string array to the result string. Similarly, the "MMMM" format specifier adds a full month name found in the `System.Globalization.DateTimeFormatInfo.MonthNames*` string array to the result string.

## See also

- `System.DateTime`
- `System.IFormatProvider`
- Formatting types
- Standard Date and Time format strings
- Sample: .NET Core WinForms formatting utility (C#)
- Sample: .NET Core WinForms formatting utility (Visual Basic)
