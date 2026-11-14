---
title: "Composite formatting (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/composite-formatting.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Composite formatting (part 2 of 3)

## Format item syntax

Each format item takes the following form and consists of the following components:

`{index,width}`

The matching braces (`{` and `}`) are required.

### Index component

The mandatory `index` component, which is also called a parameter specifier, is a number starting from 0 that identifies a corresponding item in the list of objects. That is, the format item whose parameter specifier is `0` formats the first object in the list. The format item whose parameter specifier is `1` formats the second object in the list, and so on. The following example includes four parameter specifiers, numbered zero through three,  to represent prime numbers less than 10:

```csharp
string primes = string.Format("Four prime numbers: {0}, {1}, {2}, {3}",
                              2, 3, 5, 7);
Console.WriteLine(primes);

// The example displays the following output:
//      Four prime numbers: 2, 3, 5, 7
```
```vb
Dim primes As String = String.Format("Four prime numbers: {0}, {1}, {2}, {3}",
                                      2, 3, 5, 7)
Console.WriteLine(primes)

'The example displays the following output
'     Four prime numbers 2, 3, 5, 7
```
Multiple format items can refer to the same element in the list of objects by specifying the same parameter specifier. For example, you can format the same numeric value in hexadecimal, scientific, and number format by specifying a composite format string such as `"0x{0:X} {0:E} {0:N}"`, as the following example shows:

```csharp
string multiple = string.Format("0x{0:X} {0:E} {0:N}",
                                Int64.MaxValue);
Console.WriteLine(multiple);

// The example displays the following output:
//      0x7FFFFFFFFFFFFFFF 9.223372E+018 9,223,372,036,854,775,807.00
```
```vb
Dim multiple As String = String.Format("0x{0:X} {0:E} {0:N}",
                                       Int64.MaxValue)
Console.WriteLine(multiple)

'The example displays the following output
'     0x7FFFFFFFFFFFFFFF 9.223372E+018 9,223,372,036,854,775,807.00
```
Each format item can refer to any object in the list. For example, if there are three objects, you can format the second, first, and third object by specifying a composite format string such as `{1} {0} {2}`. An object that isn't referenced by a format item is ignored. A `System.FormatException` is thrown at runtime if a parameter specifier designates an item outside the bounds of the list of objects.

### Width component

The optional `width` component is a signed integer indicating the preferred formatted field width. If the value of `width` is less than the length of the formatted string, `width` is ignored, and the length of the formatted string is used as the field width. The formatted data in the field is right-aligned if `width` is positive and left-aligned if `width` is negative. If padding is necessary, white space is used. The comma is required if `width` is specified.

The following example defines two arrays, one containing the names of employees and the other containing the hours they worked over two weeks. The composite format string left-aligns the names in a 20-character field and right-aligns their hours in a 5-character field. The "N1" standard format string formats the hours with one fractional digit.

```csharp
string[] names = { "Adam", "Bridgette", "Carla", "Daniel",
                   "Ebenezer", "Francine", "George" };
decimal[] hours = { 40, 6.667m, 40.39m, 82,
                    40.333m, 80, 16.75m };

Console.WriteLine("{0,-20} {1,5}\n", "Name", "Hours");

for (int counter = 0; counter < names.Length; counter++)
    Console.WriteLine("{0,-20} {1,5:N1}", names[counter], hours[counter]);

// The example displays the following output:
//      Name                 Hours
//      
//      Adam                  40.0
//      Bridgette              6.7
//      Carla                 40.4
//      Daniel                82.0
//      Ebenezer              40.3
//      Francine              80.0
//      George                16.8
```
```vb
Dim names As String() = {"Adam", "Bridgette", "Carla", "Daniel",
                         "Ebenezer", "Francine", "George"}

Dim hours As Decimal() = {40, 6.667D, 40.39D, 82,
                          40.333D, 80, 16.75D}

Console.WriteLine("{0,-20} {1,5}\n", "Name", "Hours")

For counter = 0 To names.Length - 1
    Console.WriteLine("{0,-20} {1,5:N1}", names(counter), hours(counter))
Next

'The example displays the following output
'     Name                 Hours
'     
'     Adam                  40.0
'     Bridgette              6.7
'     Carla                 40.4
'     Daniel                82.0
'     Ebenezer              40.3
'     Francine              80.0
'     George                16.8
```
### Format string component

The optional `formatString` component is a format string that's appropriate for the type of object being formatted. You can specify:

- A standard or custom numeric format string if the corresponding object is a numeric value.
- A standard or custom date and time format string if the corresponding object is a `System.DateTime` object.
- An enumeration format string if the corresponding object is an enumeration value.

If `formatString` isn't specified, the general ("G") format specifier for a numeric, date and time, or enumeration type is used. The colon is required if `formatString` is specified.

The following table lists types or categories of types in the .NET class library that support a predefined set of format strings, and provides links to the articles that list the supported format strings. String formatting is an extensible mechanism that makes it possible to define new format strings for all existing types and to define a set of format strings supported by an application-defined type.

For more information, see the `System.IFormattable` and `System.ICustomFormatter` interface articles.

| Type or type category | See |
|--|--|
| Date and time types (`System.DateTime`, `System.DateTimeOffset`) | Standard Date and Time Format Strings Custom Date and Time Format Strings |
| Enumeration types (all types derived from `System.Enum`) | Enumeration Format Strings |
| Numeric types (`System.Numerics.BigInteger`, `System.Byte`, `System.Decimal`, `System.Double`, `System.Int16`, `System.Int32`, `System.Int64`, `System.SByte`, `System.Single`, `System.UInt16`, `System.UInt32`, `System.UInt64`) | Standard Numeric Format Strings Custom Numeric Format Strings |
| `System.Guid` | `System.Guid.ToString(System.String)` |
| `System.TimeSpan` | Standard TimeSpan Format Strings Custom TimeSpan Format Strings |

### Escaping braces

Opening and closing braces are interpreted as starting and ending a format item. To display a literal opening brace or closing brace, you must use an escape sequence. Specify two opening braces (`{{`) in the fixed text to display one opening brace (`{`), or two closing braces (`}}`) to display one closing brace (`}`).

Escaped braces with a format item are parsed differently between .NET and .NET Framework.

#### .NET

Braces can be escaped around a format item. For example, consider the format item `{{{0:D}}}`, which is intended to display an opening brace, a numeric value formatted as a decimal number, and a closing brace. The format item is interpreted in the following manner:

1. The first two opening braces (`{{`) are escaped and yield one opening brace.
1. The next three characters (`{0:`) are interpreted as the start of a format item.
1. The next character (`D`) is interpreted as the Decimal standard numeric format specifier.
1. The next brace (`}`) is interpreted as the end of the format item.
1. The final two closing braces are escaped and yield one closing brace.
1. The final result that's displayed is the literal string, `{6324}`.

```csharp
int value = 6324;
string output = string.Format("{{{0:D}}}", value);

Console.WriteLine(output);
// The example displays the following output:
//       {6324}
```
```vb
Dim value As Integer = 6324
Dim output As String = String.Format("{{{0:D}}}", value)

Console.WriteLine(output)

'The example displays the following output
'      {6324}
```
#### .NET Framework

Braces in a format item are interpreted sequentially in the order they're encountered. Interpreting nested braces isn't supported.

The way escaped braces are interpreted can lead to unexpected results. For example, consider the format item `{{{0:D}}}`, which is intended to display an opening brace, a numeric value formatted as a decimal number, and a closing brace. However, the format item is interpreted in the following manner:

1. The first two opening braces (`{{`) are escaped and yield one opening brace.
1. The next three characters (`{0:`) are interpreted as the start of a format item.
1. The next character (`D`) is interpreted as the Decimal standard numeric format specifier, but the next two escaped braces (`}}`) yield a single brace. Because the resulting string (`D}`) isn't a standard numeric format specifier, the resulting string is interpreted as a custom format string that means display the literal string `D}`.
1. The last brace (`}`) is interpreted as the end of the format item.
1. The final result that's displayed is the literal string, `{D}`. The numeric value that was to be formatted isn't displayed.

```csharp
int value = 6324;
string output = string.Format("{{{0:D}}}",
                              value);
Console.WriteLine(output);

// The example displays the following output:
//       {D}
```
```vb
Dim value As Integer = 6324
Dim output As String = String.Format("{{{0:D}}}",
                                     value)
Console.WriteLine(output)

'The example displays the following output:
'      {D}
```
One way to write your code to avoid misinterpreting escaped braces and format items is to format the braces and format items separately. That is, in the first format operation, display a literal opening brace. In the next operation, display the result of the format item, and in the final operation, display a literal closing brace. The following example illustrates this approach:

```csharp
int value = 6324;
string output = string.Format("{0}{1:D}{2}",
                             "{", value, "}");
Console.WriteLine(output);

// The example displays the following output:
//       {6324}
```
```vb
Dim value As Integer = 6324
Dim output As String = String.Format("{0}{1:D}{2}",
                                     "{", value, "}")
Console.WriteLine(output)

'The example displays the following output:
'      {6324}
```
### Processing order

If the call to the composite formatting method includes an `System.IFormatProvider` argument whose value isn't `null`, the runtime calls its `System.IFormatProvider.GetFormat*` method to request an `System.ICustomFormatter` implementation. If the method can return an `System.ICustomFormatter` implementation, it's cached during the call of the composite formatting method.

Each value in the parameter list that corresponds to a format item is converted to a string as follows:

1. If the value to be formatted is `null`, an empty string `System.String.Empty` is returned.
1. If an `System.ICustomFormatter` implementation is available, the runtime calls its `System.ICustomFormatter.Format*` method. The runtime passes the format item's `formatString` value (or `null` if it's not present) to the method. The runtime also passes the `System.IFormatProvider` implementation to the method. If the call to the `System.ICustomFormatter.Format*` method returns `null`, execution proceeds to the next step. Otherwise, the result of the `System.ICustomFormatter.Format*` call is returned.
1. If the value implements the `System.IFormattable` interface, the interface's `System.IFormattable.ToString(System.String,System.IFormatProvider)` method is called. If one is present in the format item, the `formatString` value is passed to the method. Otherwise, `null` is passed. The `System.IFormatProvider` argument is determined as follows:

    - For a numeric value, if a composite formatting method with a non-null `System.IFormatProvider` argument is called, the runtime requests a `System.Globalization.NumberFormatInfo` object from its `System.IFormatProvider.GetFormat*` method. If it's unable to supply one, if the value of the argument is `null`, or if the composite formatting method doesn't have an `System.IFormatProvider` parameter, the `System.Globalization.NumberFormatInfo` object for the current culture is used.
    - For a date and time value, if a composite formatting method with a non-null `System.IFormatProvider` argument is called, the runtime requests a `System.Globalization.DateTimeFormatInfo` object from its `System.IFormatProvider.GetFormat*` method. In the following situations, the `System.Globalization.DateTimeFormatInfo` object for the current culture is used instead:

       - The `System.IFormatProvider.GetFormat*` method is unable to supply a `System.Globalization.DateTimeFormatInfo` object.
       - The value of the argument is `null`.
       - The composite formatting method doesn't have an `System.IFormatProvider` parameter.

    - For objects of other types, if a composite formatting method is called with an `System.IFormatProvider` argument, its value is passed directly to the `System.IFormattable.ToString*` implementation. Otherwise, `null` is passed to the `System.IFormattable.ToString*` implementation.

1. The type's parameterless `ToString` method, which either overrides `System.Object.ToString` or inherits the behavior of its base class, is called. In this case, the format string specified by the `formatString` component in the format item, if it's present, is ignored.

Alignment is applied after the preceding steps have been performed.
