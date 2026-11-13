---
title: "Best practices for displaying and persisting formatted data in .NET"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/best-practices-display-data.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Best practices for displaying and persisting formatted data

This article examines how formatted data, such as numeric data and date-and-time data, is handled for display and for storage.

When you develop with .NET, use culture-sensitive formatting to display non-string data, such as numbers and dates, in a user interface. Use formatting with the invariant culture to persist non-string data in string form. Do not use culture-sensitive formatting to persist numeric or date-and-time data in string form.

## Display formatted data

When you display non-string data such as numbers and dates and times to users, format them by using the user's cultural settings. By default, the following all use the current culture in formatting operations:

- Interpolated strings supported by the C# and Visual Basic compilers.
- String concatenation operations that use the C# or Visual Basic <example-value> operators or that call the `System.String.Concat*` method directly.
- The `System.String.Format*` method.
- The `ToString` methods of the numeric types and the date and time types.

To explicitly specify that a string should be formatted by using the conventions of a designated culture or the invariant culture, you can do the following:

- When using the `System.String.Format*` and `ToString` methods, call an overload that has a `provider` parameter, such as `System.String.Format(System.IFormatProvider,System.String,System.Object[])` or `System.DateTime.ToString(System.IFormatProvider)`, and pass it the `System.Globalization.CultureInfo.CurrentCulture` property, a `System.Globalization.CultureInfo` instance that represents the desired culture, or the `System.Globalization.CultureInfo.InvariantCulture` property.

- For string concatenation, do not allow the compiler to perform any implicit conversions. Instead, perform an explicit conversion by calling a `ToString` overload that has a `provider` parameter. For example, the compiler implicitly uses the current culture when converting a `System.Double` value to a string in the following code:

  ```csharp
﻿using System;
using System.Globalization;

class Program
{
    static void Main(string[] args)
    {
        string concat1 = "The amount is " + 126.03 + ".";
        Console.WriteLine(concat1);

        string concat2 = "The amount is " + 126.03.ToString(CultureInfo.InvariantCulture) + ".";
        Console.WriteLine(concat2);
    }
}
```
  ```vb
﻿Imports System.Globalization

Module Program
    Sub Main(args As String())
        Dim concat1 As String = "The amount is " & 126.03 & "."
        Console.WriteLine(concat1)

        Dim concat2 As String = "The amount is " & 126.03.ToString(CultureInfo.InvariantCulture) & "."
        Console.WriteLine(concat2)
    End Sub
End Module
```

  Instead, you can explicitly specify the culture whose formatting conventions are used in the conversion by calling the `System.Double.ToString(System.IFormatProvider)` method, as the following code does:

  ```csharp
﻿using System;
using System.Globalization;

class Program
{
    static void Main(string[] args)
    {
        string concat1 = "The amount is " + 126.03 + ".";
        Console.WriteLine(concat1);

        string concat2 = "The amount is " + 126.03.ToString(CultureInfo.InvariantCulture) + ".";
        Console.WriteLine(concat2);
    }
}
```
  ```vb
﻿Imports System.Globalization

Module Program
    Sub Main(args As String())
        Dim concat1 As String = "The amount is " & 126.03 & "."
        Console.WriteLine(concat1)

        Dim concat2 As String = "The amount is " & 126.03.ToString(CultureInfo.InvariantCulture) & "."
        Console.WriteLine(concat2)
    End Sub
End Module
```

- For string interpolation, rather than assigning an interpolated string to a `System.String` instance, assign it to a `System.FormattableString`. You can then call its `System.FormattableString.ToString` method to produce a result string that reflects the conventions of the current culture, or you can call the `System.FormattableString.ToString(System.IFormatProvider)` method to produce a result string that reflects the conventions of a specified culture.

  You can also pass the formattable string to the static `System.FormattableString.Invariant*` method to produce a result string that reflects the conventions of the invariant culture. The following example illustrates this approach. (The output from the example reflects a current culture of `en-US`.)

  ```csharp
﻿using System;
using System.Globalization;

class Program
{
    static void Main()
    {
        Decimal value = 126.03m;
        FormattableString amount = $"The amount is {value:C}";
        Console.WriteLine(amount.ToString());
        Console.WriteLine(amount.ToString(new CultureInfo("fr-FR")));
        Console.WriteLine(FormattableString.Invariant(amount));
    }
}
// The example displays the following output:
//    The amount is $126.03
//    The amount is 126,03 €
//    The amount is ¤126.03
```
  ```vb
﻿Imports System.Globalization

Module Program
    Sub Main()
        Dim value As Decimal = 126.03
        Dim amount As FormattableString = $"The amount is {value:C}" 
        Console.WriteLine(amount.ToString())
        Console.WriteLine(amount.ToString(new CultureInfo("fr-FR")))
        Console.WriteLine(FormattableString.Invariant(amount))
    End Sub
End Module
' The example displays the following output:
'    The amount is $126.03
'    The amount is 126,03 €
'    The amount is ¤126.03
```

  > **Note:**
  > If you're using C# and formatting using the invariant culture, it's more performant to call `System.String.Create(System.IFormatProvider,System.Runtime.CompilerServices.DefaultInterpolatedStringHandler@)` and pass `System.Globalization.CultureInfo.InvariantCulture` for the first parameter. For more information, see String interpolation in C# 10 and .NET 6.

## Persist formatted data

You can persist non-string data either as binary data or as formatted data. If you choose to save it as formatted data, you should call a formatting method overload that includes a `provider` parameter and pass it the `System.Globalization.CultureInfo.InvariantCulture` property. The invariant culture provides a consistent format for formatted data that is independent of culture and machine. In contrast, persisting data that is formatted by using cultures other than the invariant culture has a number of limitations:

- The data is likely to be unusable if it is retrieved on a system that has a different culture, or if the user of the current system changes the current culture and tries to retrieve the data.
- The properties of a culture on a specific computer can differ from standard values. At any time, a user can customize culture-sensitive display settings. Because of this, formatted data that is saved on a system may not be readable after the user customizes cultural settings. The portability of formatted data across computers is likely to be even more limited.
- International, regional, or national standards that govern the formatting of numbers or dates and times change over time, and these changes are incorporated into Windows operating system updates. When formatting conventions change, data that was formatted by using the previous conventions may become unreadable.

The following example illustrates the limited portability that results from using culture-sensitive formatting to persist data. The example saves an array of date and time values to a file. These are formatted by using the conventions of the English (United States) culture. After the application changes the current culture to French (Switzerland), it tries to read the saved values by using the formatting conventions of the current culture. The attempt to read two of the data items throws a `System.FormatException` exception, and the array of dates now contains two incorrect elements that are equal to `System.DateTime.MinValue`.

```csharp
using System;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading;

public class Example
{
   private static string filename = @".\dates.dat";

   public static void Main()
   {
      DateTime[] dates = { new DateTime(1758, 5, 6, 21, 26, 0),
                           new DateTime(1818, 5, 5, 7, 19, 0),
                           new DateTime(1870, 4, 22, 23, 54, 0),
                           new DateTime(1890, 9, 8, 6, 47, 0),
                           new DateTime(1905, 2, 18, 15, 12, 0) };
      // Write the data to a file using the current culture.
      WriteData(dates);
      // Change the current culture.
      Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture("fr-CH");
      // Read the data using the current culture.
      DateTime[] newDates = ReadData();
      foreach (var newDate in newDates)
         Console.WriteLine(newDate.ToString("g"));
   }

   private static void WriteData(DateTime[] dates)
   {
      StreamWriter sw = new StreamWriter(filename, false, Encoding.UTF8);
      for (int ctr = 0; ctr < dates.Length; ctr++) {
         sw.Write("{0}", dates[ctr].ToString("g", CultureInfo.CurrentCulture));
         if (ctr < dates.Length - 1) sw.Write("|");
      }
      sw.Close();
   }

   private static DateTime[] ReadData()
   {
      bool exceptionOccurred = false;

      // Read file contents as a single string, then split it.
      StreamReader sr = new StreamReader(filename, Encoding.UTF8);
      string output = sr.ReadToEnd();
      sr.Close();

      string[] values = output.Split( new char[] { '|' } );
      DateTime[] newDates = new DateTime[values.Length];
      for (int ctr = 0; ctr < values.Length; ctr++) {
         try {
            newDates[ctr] = DateTime.Parse(values[ctr], CultureInfo.CurrentCulture);
         }
         catch (FormatException) {
            Console.WriteLine($"Failed to parse {values[ctr]}");
            exceptionOccurred = true;
         }
      }
      if (exceptionOccurred) Console.WriteLine();
      return newDates;
   }
}
// The example displays the following output:
//       Failed to parse 4/22/1870 11:54 PM
//       Failed to parse 2/18/1905 3:12 PM
//
//       05.06.1758 21:26
//       05.05.1818 07:19
//       01.01.0001 00:00
//       09.08.1890 06:47
//       01.01.0001 00:00
//       01.01.0001 00:00
```

However, if you replace the `System.Globalization.CultureInfo.CurrentCulture` property with `System.Globalization.CultureInfo.InvariantCulture*` in the calls to `System.DateTime.ToString(System.String,System.IFormatProvider)` and `System.DateTime.Parse(System.String,System.IFormatProvider)`, the persisted date and time data is successfully restored, as the following output shows:

```console
06.05.1758 21:26
05.05.1818 07:19
22.04.1870 23:54
08.09.1890 06:47
18.02.1905 15:12
```
