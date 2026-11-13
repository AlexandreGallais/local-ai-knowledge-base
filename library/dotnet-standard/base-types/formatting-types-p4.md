---
title: "Overview: How to format numbers, dates, enums, and other types in .NET (part 4 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/formatting-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Overview: How to format numbers, dates, enums, and other types in .NET (part 4 of 5)

## The IFormattable interface

Typically, types that overload the `ToString` method with a format string and an `System.IFormatProvider` parameter also implement the `System.IFormattable` interface. This interface has a single member, `System.IFormattable.ToString(System.String,System.IFormatProvider)`, that includes both a format string and a format provider as parameters.

Implementing the `System.IFormattable` interface for your application-defined class offers two advantages:

- Support for string conversion by the `System.Convert` class. Calls to the `System.Convert.ToString(System.Object)` and `System.Convert.ToString(System.Object,System.IFormatProvider)` methods call your `System.IFormattable` implementation automatically.

- Support for composite formatting. If a format item that includes a format string is used to format your custom type, the common language runtime automatically calls your `System.IFormattable` implementation and passes it the format string. For more information about composite formatting with methods such as `System.String.Format*` or `System.Console.WriteLine*`, see the Composite Formatting section.

The following example defines a `Temperature` class that implements the `System.IFormattable` interface. It supports the "C" or "G" format specifiers to display the temperature in Celsius, the "F" format specifier to display the temperature in Fahrenheit, and the "K" format specifier to display the temperature in Kelvin.

```csharp
using System;
using System.Globalization;

namespace HotAndCold
{

    public class Temperature : IFormattable
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
            get { return Math.Round((decimal)this.m_Temp * 9 / 5 + 32, 2); }
        }

        public override string ToString()
        {
            return this.ToString("G", null);
        }

        public string ToString(string format)
        {
            return this.ToString(format, null);
        }

        public string ToString(string format, IFormatProvider provider)
        {
            // Handle null or empty arguments.
            if (String.IsNullOrEmpty(format))
                format = "G";
            // Remove any white space and covert to uppercase.
            format = format.Trim().ToUpperInvariant();

            if (provider == null)
                provider = NumberFormatInfo.CurrentInfo;

            switch (format)
            {
                // Convert temperature to Fahrenheit and return string.
                case "F":
                    return this.Fahrenheit.ToString("N2", provider) + "°F";
                // Convert temperature to Kelvin and return string.
                case "K":
                    return this.Kelvin.ToString("N2", provider) + "K";
                // Return temperature in Celsius.
                case "C":
                case "G":
                    return this.Celsius.ToString("N2", provider) + "°C";
                default:
                    throw new FormatException(String.Format("The '{0}' format string is not supported.", format));
            }
        }
    }

    public class Example11
    {
        public static void Main()
        {
            CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("en-US");
            Temperature temp = new Temperature(22m);
            Console.WriteLine(Convert.ToString(temp, new CultureInfo("ja-JP")));
            Console.WriteLine($"Temperature: {temp:K}");
            Console.WriteLine($"Temperature: {temp:F}");
            Console.WriteLine(String.Format(new CultureInfo("fr-FR"), "Temperature: {0:F}", temp));
        }
    }
    // The example displays the following output:
    //       22.00°C
    //       Temperature: 295.15K
    //       Temperature: 71.60°F
    //       Temperature: 71,60°F
}
```

The following example instantiates a `Temperature` object. It then calls the `System.Convert.ToString*` method and uses several composite format strings to obtain different string representations of a `Temperature` object. Each of these method calls, in turn, calls the `System.IFormattable` implementation of the `Temperature` class.

```csharp
using System;
using System.Globalization;

namespace HotAndCold
{

    public class Temperature : IFormattable
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
            get { return Math.Round((decimal)this.m_Temp * 9 / 5 + 32, 2); }
        }

        public override string ToString()
        {
            return this.ToString("G", null);
        }

        public string ToString(string format)
        {
            return this.ToString(format, null);
        }

        public string ToString(string format, IFormatProvider provider)
        {
            // Handle null or empty arguments.
            if (String.IsNullOrEmpty(format))
                format = "G";
            // Remove any white space and covert to uppercase.
            format = format.Trim().ToUpperInvariant();

            if (provider == null)
                provider = NumberFormatInfo.CurrentInfo;

            switch (format)
            {
                // Convert temperature to Fahrenheit and return string.
                case "F":
                    return this.Fahrenheit.ToString("N2", provider) + "°F";
                // Convert temperature to Kelvin and return string.
                case "K":
                    return this.Kelvin.ToString("N2", provider) + "K";
                // Return temperature in Celsius.
                case "C":
                case "G":
                    return this.Celsius.ToString("N2", provider) + "°C";
                default:
                    throw new FormatException(String.Format("The '{0}' format string is not supported.", format));
            }
        }
    }

    public class Example11
    {
        public static void Main()
        {
            CultureInfo.CurrentCulture = CultureInfo.GetCultureInfo("en-US");
            Temperature temp = new Temperature(22m);
            Console.WriteLine(Convert.ToString(temp, new CultureInfo("ja-JP")));
            Console.WriteLine($"Temperature: {temp:K}");
            Console.WriteLine($"Temperature: {temp:F}");
            Console.WriteLine(String.Format(new CultureInfo("fr-FR"), "Temperature: {0:F}", temp));
        }
    }
    // The example displays the following output:
    //       22.00°C
    //       Temperature: 295.15K
    //       Temperature: 71.60°F
    //       Temperature: 71,60°F
}
```

## Composite formatting

Some methods, such as `System.String.Format*` and `System.Text.StringBuilder.AppendFormat*`, support *composite formatting*. A composite format string is a kind of template that returns a single string that incorporates the string representation of zero, one, or more objects. Each object is represented in the composite format string by an indexed format item. The index of the format item corresponds to the position of the object that it represents in the method's parameter list. Indexes are zero-based. For example, in the following call to the `System.String.Format*` method, the first format item, `{0:D}`, is replaced by the string representation of `thatDate`; the second format item, `{1}`, is replaced by the string representation of `item1`; and the third format item, `{2:C2}`, is replaced by the string representation of `item1.Value`.

```csharp
﻿using System;

public class Product
{
   private string productName;
   private int onHand;
   private decimal cost;

   public Product(string name)
   {
      this.productName = name;
   }

   public int Quantity
   {
      get { return this.onHand; }
      set { this.onHand = value; }
   }

   public decimal Price
   {
      get { return this.cost; }
      set { this.cost = value; }
   }

   public decimal Value
   {
      get { return this.cost * this.onHand; }
   }

   public string Name
   {
      get { return this.productName; }
   }

   public override string ToString()
   {
      return this.productName;
   }
}

public class Example2
{
   public static void Main()
   {
      Product item1 = new Product("WidgetA");
      item1.Quantity = 17;
      item1.Price = 6.32m;
      DateTime thatDate = new DateTime(2009, 5, 1);
      string result;
      result = String.Format("On {0:d}, the inventory of {1} was worth {2:C2}.",
                             thatDate, item1, item1.Value);
      Console.WriteLine(result);
      // The example displays output like the following if run on a system
      // whose current culture is en-US:
      //       On 5/1/2009, the inventory of WidgetA was worth $107.44.
   }
}
```

In addition to replacing a format item with the string representation of its corresponding object, format items also let you control the following:

- The specific way in which an object is represented as a string, if the object implements the `System.IFormattable` interface and supports format strings. You do this by following the format item's index with a `:` (colon) followed by a valid format string. The previous example did this by formatting a date value with the "d" (short date pattern) format string (for example, `{0:d}`) and by formatting a numeric value with the "C2" format string (for example, `{2:C2}`) to represent the number as a currency value with two fractional decimal digits.

- The width of the field that contains the object's string representation, and the alignment of the string representation in that field. You do this by following the format item's index with a `,` (comma) followed the field width. The string is right-aligned in the field if the field width is a positive value, and it's left-aligned if the field width is a negative value. The following example left-aligns date values in a 20-character field, and it right-aligns decimal values with one fractional digit in an 11-character field.

  ```csharp
﻿using System;

public class Example3
{
   public static void Main()
   {
      DateTime startDate = new DateTime(2015, 8, 28, 6, 0, 0);
      decimal[] temps = { 73.452m, 68.98m, 72.6m, 69.24563m,
                         74.1m, 72.156m, 72.228m };
      Console.WriteLine("{0,-20} {1,11}\n", "Date", "Temperature");
      for (int ctr = 0; ctr < temps.Length; ctr++)
         Console.WriteLine("{0,-20:g} {1,11:N1}", startDate.AddDays(ctr), temps[ctr]);

      // The example displays the following output:
      //       Date                 Temperature
      //
      //       8/28/2015 6:00 AM           73.5
      //       8/29/2015 6:00 AM           69.0
      //       8/30/2015 6:00 AM           72.6
      //       8/31/2015 6:00 AM           69.2
      //       9/1/2015 6:00 AM            74.1
      //       9/2/2015 6:00 AM            72.2
      //       9/3/2015 6:00 AM            72.2
   }
}
```

  If both the alignment string component and the format string component are present, the former precedes the latter (for example, `{0,-20:g}`).

For more information about composite formatting, see Composite Formatting.
