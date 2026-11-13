---
title: "Overview: How to format numbers, dates, enums, and other types in .NET (part 2 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/formatting-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Overview: How to format numbers, dates, enums, and other types in .NET (part 2 of 5)

## The ToString method and format strings

Relying on the default `ToString` method or overriding `ToString` is appropriate when an object has a single string representation. However, the value of an object often has multiple representations. For example, a temperature can be expressed in degrees Fahrenheit, degrees Celsius, or kelvins. Similarly, the integer value 10 can be represented in numerous ways, including 10, 10.0, 1.0e01, or $10.00.

To enable a single value to have multiple string representations, .NET uses format strings. A format string is a string that contains one or more predefined format specifiers, which are single characters or groups of characters that define how the `ToString` method should format its output. The format string is then passed as a parameter to the object's `ToString` method and determines how the string representation of that object's value should appear.

All numeric types, date and time types, and enumeration types in .NET support a predefined set of format specifiers. You can also use format strings to define multiple string representations of your application-defined data types.

### Standard format strings

A standard format string contains a single format specifier, which is an alphabetic character that defines the string representation of the object to which it's applied, along with an optional precision specifier that affects how many digits are displayed in the result string. If the precision specifier is omitted or isn't supported, a standard format specifier is equivalent to a standard format string.

.NET defines a set of standard format specifiers for all numeric types, all date and time types, and all enumeration types. For example, each of these categories supports a "G" standard format specifier, which defines a general string representation of a value of that type.

Standard format strings for enumeration types directly control the string representation of a value. The format strings passed to an enumeration value's `ToString` method determine whether the value is displayed using its string name (the "G" and "F" format specifiers), its underlying integral value (the "D" format specifier), or its hexadecimal value (the "X" format specifier). The following example illustrates the use of standard format strings to format a `System.DayOfWeek` enumeration value.

```csharp
﻿using System;

public class Example16
{
   public static void Main()
   {
      DayOfWeek thisDay = DayOfWeek.Monday;
      string[] formatStrings = {"G", "F", "D", "X"};

      foreach (string formatString in formatStrings)
         Console.WriteLine(thisDay.ToString(formatString));
      // The example displays the following output:
      //       Monday
      //       Monday
      //       1
      //       00000001
   }
}
```

For information about enumeration format strings, see Enumeration Format Strings.

Standard format strings for numeric types usually define a result string whose precise appearance is controlled by one or more property values. For example, the "C" format specifier formats a number as a currency value. When you call the `ToString` method with the "C" format specifier as the only parameter, the following property values from the current culture's `System.Globalization.NumberFormatInfo` object are used to define the string representation of the numeric value:

- The `System.Globalization.NumberFormatInfo.CurrencySymbol` property, which specifies the current culture's currency symbol.

- The `System.Globalization.NumberFormatInfo.CurrencyNegativePattern*` or `System.Globalization.NumberFormatInfo.CurrencyPositivePattern` property, which returns an integer that determines the following:

  - The placement of the currency symbol.

  - Whether negative values are indicated by a leading negative sign, a trailing negative sign, or parentheses.

  - Whether a space appears between the numeric value and the currency symbol.

- The `System.Globalization.NumberFormatInfo.CurrencyDecimalDigits` property, which defines the number of fractional digits in the result string.

- The `System.Globalization.NumberFormatInfo.CurrencyDecimalSeparator` property, which defines the decimal separator symbol in the result string.

- The `System.Globalization.NumberFormatInfo.CurrencyGroupSeparator` property, which defines the group separator symbol.

- The `System.Globalization.NumberFormatInfo.CurrencyGroupSizes` property, which defines the number of digits in each group to the left of the decimal.

- The `System.Globalization.NumberFormatInfo.NegativeSign` property, which determines the negative sign used in the result string if parentheses aren't used to indicate negative values.

In addition, numeric format strings can include a precision specifier. The meaning of this specifier depends on the format string with which it's used, but it typically indicates either the total number of digits or the number of fractional digits that should appear in the result string. For example, the following example uses the "X4" standard numeric string and a precision specifier to create a string value that has four hexadecimal digits.

```csharp
﻿using System;

public class Example13
{
   public static void Main()
   {
      byte[] byteValues = { 12, 163, 255 };
      foreach (byte byteValue in byteValues)
         Console.WriteLine(byteValue.ToString("X4"));
      // The example displays the following output:
      //       000C
      //       00A3
      //       00FF
   }
}
```

For more information about standard numeric formatting strings, see Standard Numeric Format Strings.

Standard format strings for date and time values are aliases for custom format strings stored by a particular `System.Globalization.DateTimeFormatInfo` property. For example, calling the `ToString` method of a date and time value with the "D" format specifier displays the date and time by using the custom format string stored in the current culture's `System.Globalization.DateTimeFormatInfo.LongDatePattern` property. (For more information about custom format strings, see the next section.) The following example illustrates this relationship.

```csharp
using System;
using System.Globalization;

public class Example
{
   public static void Main()
   {
      DateTime date1 = new DateTime(2009, 6, 30);
      Console.WriteLine($"D Format Specifier:     {date1:D}");
      string longPattern = CultureInfo.CurrentCulture.DateTimeFormat.LongDatePattern;
      Console.WriteLine($"'{longPattern}' custom format string:     {date1.ToString(longPattern)}");
   }
}
// The example displays the following output when run on a system whose
// current culture is en-US:
//    D Format Specifier:     Tuesday, June 30, 2009
//    'dddd, MMMM dd, yyyy' custom format string:     Tuesday, June 30, 2009
```

For more information about standard date and time format strings, see Standard Date and Time Format Strings.

You can also use standard format strings to define the string representation of an application-defined object that is produced by the object's `ToString(String)` method. You can define the specific standard format specifiers that your object supports, and you can determine whether they're case-sensitive or case-insensitive. Your implementation of the `ToString(String)` method should support the following:

- A "G" format specifier that represents a customary or common format of the object. The parameterless overload of your object's `ToString` method should call its `ToString(String)` overload and pass it the "G" standard format string.

- Support for a format specifier that's equal to a null reference (`Nothing` in Visual Basic). A format specifier that's equal to a null reference should be considered equivalent to the "G" format specifier.

For example, a `Temperature` class can internally store the temperature in degrees Celsius and use format specifiers to represent the value of the `Temperature` object in degrees Celsius, degrees Fahrenheit, and kelvins. The following example provides an illustration.

```csharp
using System;

public class Temperature
{
   private decimal m_Temp;

   public Temperature(decimal temperature)
   {
      this.m_Temp = temperature;
   }

   public decimal Celsius
   {
      get { return this.m_Temp; }
   }

   public decimal Kelvin
   {
      get { return this.m_Temp + 273.15m; }
   }

   public decimal Fahrenheit
   {
      get { return Math.Round(((decimal) (this.m_Temp * 9 / 5 + 32)), 2); }
   }

   public override string ToString()
   {
      return this.ToString("C");
   }

   public string ToString(string format)
   {
      // Handle null or empty string.
      if (String.IsNullOrEmpty(format)) format = "C";
      // Remove spaces and convert to uppercase.
      format = format.Trim().ToUpperInvariant();

      // Convert temperature to Fahrenheit and return string.
      switch (format)
      {
         // Convert temperature to Fahrenheit and return string.
         case "F":
            return this.Fahrenheit.ToString("N2") + " °F";
         // Convert temperature to Kelvin and return string.
         case "K":
            return this.Kelvin.ToString("N2") + " K";
         // return temperature in Celsius.
         case "G":
         case "C":
            return this.Celsius.ToString("N2") + " °C";
         default:
            throw new FormatException(String.Format("The '{0}' format string is not supported.", format));
      }
   }
}

public class Example1
{
   public static void Main()
   {
      Temperature temp1 = new Temperature(0m);
      Console.WriteLine(temp1.ToString());
      Console.WriteLine(temp1.ToString("G"));
      Console.WriteLine(temp1.ToString("C"));
      Console.WriteLine(temp1.ToString("F"));
      Console.WriteLine(temp1.ToString("K"));

      Temperature temp2 = new Temperature(-40m);
      Console.WriteLine(temp2.ToString());
      Console.WriteLine(temp2.ToString("G"));
      Console.WriteLine(temp2.ToString("C"));
      Console.WriteLine(temp2.ToString("F"));
      Console.WriteLine(temp2.ToString("K"));

      Temperature temp3 = new Temperature(16m);
      Console.WriteLine(temp3.ToString());
      Console.WriteLine(temp3.ToString("G"));
      Console.WriteLine(temp3.ToString("C"));
      Console.WriteLine(temp3.ToString("F"));
      Console.WriteLine(temp3.ToString("K"));

      Console.WriteLine(String.Format("The temperature is now {0:F}.", temp3));
   }
}
// The example displays the following output:
//       0.00 °C
//       0.00 °C
//       0.00 °C
//       32.00 °F
//       273.15 K
//       -40.00 °C
//       -40.00 °C
//       -40.00 °C
//       -40.00 °F
//       233.15 K
//       16.00 °C
//       16.00 °C
//       16.00 °C
//       60.80 °F
//       289.15 K
//       The temperature is now 16.00 °C.
```

### Custom format strings

In addition to the standard format strings, .NET defines custom format strings for both numeric values and date and time values. A custom format string consists of one or more custom format specifiers that define the string representation of a value. For example, the custom date and time format string "yyyy/mm/dd hh:mm:ss.ffff t zzz" converts a date to its string representation in the form "2008/11/15 07:45:00.0000 P -08:00" for the en-US culture. Similarly, the custom format string "0000" converts the integer value 12 to "0012". For a complete list of custom format strings, see Custom Date and Time Format Strings and Custom Numeric Format Strings.

If a format string consists of a single custom format specifier, the format specifier should be preceded by the percent (%) symbol to avoid confusion with a standard format specifier. The following example uses the "M" custom format specifier to display a one-digit or two-digit number of the month of a particular date.

```csharp
﻿using System;

public class Example14
{
   public static void Main()
   {
      DateTime date1 = new DateTime(2009, 9, 8);
      Console.WriteLine(date1.ToString("%M"));       // Displays 9
   }
}
```

Many standard format strings for date and time values are aliases for custom format strings that are defined by properties of the `System.Globalization.DateTimeFormatInfo` object. Custom format strings also offer considerable flexibility in providing application-defined formatting for numeric values or date and time values. You can define your own custom result strings for both numeric values and date and time values by combining multiple custom format specifiers into a single custom format string. The following example defines a custom format string that displays the day of the week in parentheses after the month name, day, and year.

```csharp
﻿using System;

public class Example8
{
   public static void Main()
   {
      string customFormat = "MMMM dd, yyyy (dddd)";
      DateTime date1 = new DateTime(2009, 8, 28);
      Console.WriteLine(date1.ToString(customFormat));
      // The example displays the following output if run on a system
      // whose language is English:
      //       August 28, 2009 (Friday)
   }
}
```

The following example defines a custom format string that displays an `System.Int64` value as a standard, seven-digit U.S. telephone number along with its area code.

```csharp
using System;

public class Example17
{
   public static void Main()
   {
      long number = 8009999999;
      string fmt = "000-000-0000";
      Console.WriteLine(number.ToString(fmt));
   }
}
// The example displays the following output:
//        800-999-9999
```

Although standard format strings can generally handle most of the formatting needs for your application-defined types, you can also define custom format specifiers to format your types.
