---
title: "Overview: How to format numbers, dates, enums, and other types in .NET (part 3 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/formatting-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Overview: How to format numbers, dates, enums, and other types in .NET (part 3 of 5)

### Format strings and .NET types

All numeric types (that is, the `System.Byte`, `System.Decimal`, `System.Double`, `System.Int16`, `System.Int32`, `System.Int64`, `System.SByte`, `System.Single`, `System.UInt16`, `System.UInt32`, `System.UInt64`, and `System.Numerics.BigInteger` types), as well as the `System.DateTime`, `System.DateTimeOffset`, `System.TimeSpan`, `System.Guid`, and all enumeration types, support formatting with format strings. For information on the specific format strings supported by each type, see the following articles:

|Title|Definition|
|-----------|----------------|
|Standard Numeric Format Strings|Describes standard format strings that create commonly used string representations of numeric values.|
|Custom Numeric Format Strings|Describes custom format strings that create application-specific formats for numeric values.|
|Standard Date and Time Format Strings|Describes standard format strings that create commonly used string representations of `System.DateTime` and `System.DateTimeOffset` values.|
|Custom Date and Time Format Strings|Describes custom format strings that create application-specific formats for `System.DateTime` and `System.DateTimeOffset` values.|
|Standard TimeSpan Format Strings|Describes standard format strings that create commonly used string representations of time intervals.|
|Custom TimeSpan Format Strings|Describes custom format strings that create application-specific formats for time intervals.|
|Enumeration Format Strings|Describes standard format strings that are used to create string representations of enumeration values.|
|`System.Guid.ToString(System.String)`|Describes standard format strings for `System.Guid` values.|

## Culture-sensitive formatting with format providers

Although format specifiers let you customize the formatting of objects, producing a meaningful string representation of objects often requires additional formatting information. For example, formatting a number as a currency value by using either the "C" standard format string or a custom format string such as "$ #,#.00" requires, at a minimum, information about the correct currency symbol, group separator, and decimal separator to be available to include in the formatted string. In .NET, this extra formatting information is made available through the `System.IFormatProvider` interface, which is provided as a parameter to one or more overloads of the `ToString` method of numeric types and date and time types. `System.IFormatProvider` implementations are used in .NET to support culture-specific formatting. The following example illustrates how the string representation of an object changes when it's formatted with three `System.IFormatProvider` objects that represent different cultures.

```csharp
using System;
using System.Globalization;

public class Example18
{
   public static void Main()
   {
      decimal value = 1603.42m;
      Console.WriteLine(value.ToString("C3", new CultureInfo("en-US")));
      Console.WriteLine(value.ToString("C3", new CultureInfo("fr-FR")));
      Console.WriteLine(value.ToString("C3", new CultureInfo("de-DE")));
   }
}
// The example displays the following output:
//       $1,603.420
//       1 603,420 €
//       1.603,420 €
```

The `System.IFormatProvider` interface includes one method, `System.IFormatProvider.GetFormat(System.Type)`, which has a single parameter that specifies the type of object that provides formatting information. If the method can provide an object of that type, it returns it. Otherwise, it returns a null reference (`Nothing` in Visual Basic).

`System.IFormatProvider.GetFormat*` is a callback method. When you call a `ToString` method overload that includes an `System.IFormatProvider` parameter, it calls the `System.IFormatProvider.GetFormat*` method of that `System.IFormatProvider` object. The `System.IFormatProvider.GetFormat*` method is responsible for returning an object that provides the necessary formatting information, as specified by its `formatType` parameter, to the `ToString` method.

Several formatting or string conversion methods include a parameter of type `System.IFormatProvider`, but in many cases the value of the parameter is ignored when the method is called. The following table lists some of the formatting methods that use the parameter and the type of the `System.Type` object that they pass to the `System.IFormatProvider.GetFormat*` method.

|Method|Type of `formatType` parameter|
|------------|------------------------------------|
|`ToString` method of numeric types|`System.Globalization.NumberFormatInfo`|
|`ToString` method of date and time types|`System.Globalization.DateTimeFormatInfo`|
|`System.String.Format*`|`System.ICustomFormatter`|
|`System.Text.StringBuilder.AppendFormat*`|`System.ICustomFormatter`|

> **Note:**
> The `ToString` methods of the numeric types and date and time types are overloaded, and only some of the overloads include an `System.IFormatProvider` parameter. If a method doesn't have a parameter of type `System.IFormatProvider`, the object that is returned by the `System.Globalization.CultureInfo.CurrentCulture` property is passed instead. For example, a call to the default `System.Int32.ToString` method ultimately results in a method call such as the following: `Int32.ToString("G", System.Globalization.CultureInfo.CurrentCulture)`.

.NET provides three classes that implement `System.IFormatProvider`:

- `System.Globalization.DateTimeFormatInfo`, a class that provides formatting information for date and time values for a specific culture. Its `System.IFormatProvider.GetFormat*` implementation returns an instance of itself.

- `System.Globalization.NumberFormatInfo`, a class that provides numeric formatting information for a specific culture. Its `System.IFormatProvider.GetFormat*` implementation returns an instance of itself.

- `System.Globalization.CultureInfo`. Its `System.IFormatProvider.GetFormat*` implementation can return either a `System.Globalization.NumberFormatInfo` object to provide numeric formatting information or a `System.Globalization.DateTimeFormatInfo` object to provide formatting information for date and time values.

You can also implement your own format provider to replace any one of these classes. However, your implementation's `System.IFormatProvider.GetFormat*` method must return an object of the type listed in the previous table if it has to provide formatting information to the `ToString` method.

### Culture-sensitive formatting of numeric values

By default, the formatting of numeric values is culture-sensitive. If you don't specify a culture when you call a formatting method, the formatting conventions of the current culture are used. This is illustrated in the following example, which changes the current culture four times and then calls the `System.Decimal.ToString(System.String)` method. In each case, the result string reflects the formatting conventions of the current culture. This is because the `ToString` and `ToString(String)` methods wrap calls to each numeric type's `ToString(String, IFormatProvider)` method.

```csharp
using System.Globalization;

public class Example6
{
   public static void Main()
   {
      string[] cultureNames = { "en-US", "fr-FR", "es-MX", "de-DE" };
      Decimal value = 1043.17m;

      foreach (var cultureName in cultureNames) {
         // Change the current culture.
         CultureInfo.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureName);
         Console.WriteLine($"The current culture is {CultureInfo.CurrentCulture.Name}");
         Console.WriteLine(value.ToString("C2"));
         Console.WriteLine();
      }
   }
}
// The example displays the following output:
//       The current culture is en-US
//       $1,043.17
//
//       The current culture is fr-FR
//       1 043,17 €
//
//       The current culture is es-MX
//       $1,043.17
//
//       The current culture is de-DE
//       1.043,17 €
```

You can also format a numeric value for a specific culture by calling a `ToString` overload that has a `provider` parameter and passing it either of the following:

- A `System.Globalization.CultureInfo` object that represents the culture whose formatting conventions are to be used. Its `System.Globalization.CultureInfo.GetFormat*` method returns the value of the `System.Globalization.CultureInfo.NumberFormat` property, which is the `System.Globalization.NumberFormatInfo` object that provides culture-specific formatting information for numeric values.

- A `System.Globalization.NumberFormatInfo` object that defines the culture-specific formatting conventions to be used. Its `System.Globalization.NumberFormatInfo.GetFormat*` method returns an instance of itself.

The following example uses `System.Globalization.NumberFormatInfo` objects that represent the English (United States) and English (United Kingdom) cultures and the French and Russian neutral cultures to format a floating-point number.

```csharp
using System.Globalization;

public class Example7
{
    public static void Main()
    {
        double value = 1043.62957;
        string[] cultureNames = { "en-US", "en-GB", "ru", "fr" };

        foreach (string? name in cultureNames)
        {
            NumberFormatInfo nfi = CultureInfo.CreateSpecificCulture(name).NumberFormat;
            Console.WriteLine("{0,-6} {1}", name + ":", value.ToString("N3", nfi));
        }
    }
}
// The example displays the following output:
//       en-US: 1,043.630
//       en-GB: 1,043.630
//       ru:    1 043,630
//       fr:    1 043,630
```

### Culture-sensitive formatting of date and time values

By default, the formatting of date and time values is culture-sensitive. If you don't specify a culture when you call a formatting method, the formatting conventions of the current culture are used. This is illustrated in the following example, which changes the current culture four times and then calls the `System.DateTime.ToString(System.String)` method. In each case, the result string reflects the formatting conventions of the current culture. This is because the `System.DateTime.ToString`, `System.DateTime.ToString(System.String)`, `System.DateTimeOffset.ToString`, and `System.DateTimeOffset.ToString(System.String)` methods wrap calls to the `System.DateTime.ToString(System.String,System.IFormatProvider)` and `System.DateTimeOffset.ToString(System.String,System.IFormatProvider)` methods.

```csharp
using System.Globalization;

public class Example4
{
   public static void Main()
   {
      string[] cultureNames = { "en-US", "fr-FR", "es-MX", "de-DE" };
      DateTime dateToFormat = new DateTime(2012, 5, 28, 11, 30, 0);

      foreach (var cultureName in cultureNames) {
         // Change the current culture.
         CultureInfo.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureName);
         Console.WriteLine($"The current culture is {CultureInfo.CurrentCulture.Name}");
         Console.WriteLine(dateToFormat.ToString("F"));
         Console.WriteLine();
      }
   }
}
// The example displays the following output:
//       The current culture is en-US
//       Monday, May 28, 2012 11:30:00 AM
//
//       The current culture is fr-FR
//       lundi 28 mai 2012 11:30:00
//
//       The current culture is es-MX
//       lunes, 28 de mayo de 2012 11:30:00 a.m.
//
//       The current culture is de-DE
//       Montag, 28. Mai 2012 11:30:00
```

You can also format a date and time value for a specific culture by calling a `System.DateTime.ToString*` or `System.DateTimeOffset.ToString*` overload that has a `provider` parameter and passing it either of the following:

- A `System.Globalization.CultureInfo` object that represents the culture whose formatting conventions are to be used. Its `System.Globalization.CultureInfo.GetFormat*` method returns the value of the `System.Globalization.CultureInfo.DateTimeFormat` property, which is the `System.Globalization.DateTimeFormatInfo` object that provides culture-specific formatting information for date and time values.

- A `System.Globalization.DateTimeFormatInfo` object that defines the culture-specific formatting conventions to be used. Its `System.Globalization.DateTimeFormatInfo.GetFormat*` method returns an instance of itself.

The following example uses `System.Globalization.DateTimeFormatInfo` objects that represent the English (United States) and English (United Kingdom) cultures and the French and Russian neutral cultures to format a date.

```csharp
using System.Globalization;

public class Example5
{
   public static void Main()
   {
      DateTime dat1 = new(2012, 5, 28, 11, 30, 0);
      string[] cultureNames = { "en-US", "en-GB", "ru", "fr" };

      foreach (var name in cultureNames) {
         DateTimeFormatInfo dtfi = CultureInfo.CreateSpecificCulture(name).DateTimeFormat;
         Console.WriteLine($"{name}: {dat1.ToString(dtfi)}");
      }
   }
}
// The example displays the following output:
//       en-US: 5/28/2012 11:30:00 AM
//       en-GB: 28/05/2012 11:30:00
//       ru: 28.05.2012 11:30:00
//       fr: 28/05/2012 11:30:00
```
