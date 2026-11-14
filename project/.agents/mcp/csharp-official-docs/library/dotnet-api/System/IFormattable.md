---
title: "IFormattable interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IFormattable.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IFormattable interface

Namespace: `System`

```csharp
public interface IFormattable
```

Provides functionality to format the value of an object into a string representation.

#### Remarks
The `IFormattable` interface converts an object to its string representation based on a format string and a format provider.

A format string typically defines the general appearance of an object. For example, .NET supports the following:

- Standard format strings for formatting enumeration values (see Enumeration Format Strings).
- Standard and custom format strings for formatting numeric values (see Standard Numeric Format Strings and Custom Numeric Format Strings).
- Standard and custom format strings for formatting date and time values (see Standard Date and Time Format Strings and Custom Date and Time Format Strings).
- Standard and custom format strings for formatting time intervals (see Standard TimeSpan Format Strings and Custom TimeSpan Format Strings).

You can also define your own format strings to support formatting of your application-defined types.

A format provider returns a formatting object that typically defines the symbols used in converting an object to its string representation. For example, when you convert a number to a currency value, a format provider defines the currency symbol that appears in the result string. .NET defines three format providers:

- The `CultureInfo` class, which returns either a `NumberFormatInfo` object for formatting numeric values, or a `DateTimeFormatInfo` object for formatting date and time values.
- The `NumberFormatInfo` class, which returns an instance of itself for formatting numeric values.
- The `DateTimeFormatInfo` class, which returns an instance of itself for formatting date and time values.

In addition, you can define your own custom format providers to supply culture-specific, profession-specific, or industry-specific information used in formatting. For more information about implementing custom formatting by using a custom format provider, see `ICustomFormatter`.

The `IFormattable` interface defines a single method, `IFormattable.ToString`, that supplies formatting services for the implementing type. The `IFormattable.ToString` method can be called directly. In addition, it is called automatically by the `ToString` and `ToString` methods, and by methods that use the composite formatting feature in .NET. Such methods include `WriteLine`, `String.Format`, and `AppendFormat`, among others. The `IFormattable.ToString` method is called for each format item in the method's format string.

The `IFormattable` interface is implemented by the base data types.

#### Examples
The following example defines a `Temperature` class that implements the `IFormattable` interface. The class supports four format specifiers: "G" and "C", which indicate that the temperature is to be displayed in Celsius; "F", which indicates that the temperature is to be displayed in Fahrenheit; and "K", which indicates that the temperature is to be displayed in Kelvin. In addition, the `IFormattable.ToString` implementation also can handle a format string that is `null` or empty. The other two `ToString` methods defined by the `Temperature` class simply wrap a call to the `IFormattable.ToString` implementation.

_Code sample not included: ~/snippets/csharp/System/IFormattable/Overview/example1.cs._

The following example then calls the `IFormattable.ToString` implementation either directly or by using a composite format string.

_Code sample not included: ~/snippets/csharp/System/IFormattable/Overview/example1.cs._

## IFormattable.ToString(String, IFormatProvider) method

```csharp
public string ToString (string? format, IFormatProvider? formatProvider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.

-or-

A null reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `formatProvider`: The provider to use to format the value.

-or-

A null reference (`Nothing` in Visual Basic) to obtain the numeric format information from the current locale setting of the operating system.

Returns: The value of the current instance in the specified format.

#### Remarks
The `IFormattable.ToString` method converts a value to a string representation that can be expressed in multiple ways. Its precise format depends on specific symbols or a specified order defined by specific cultures, professions, or industries. You can call the method directly. It is also called automatically by the `ToString` and `ToString` methods, and by methods that use the composite formatting feature in .NET, such as `Format`, `WriteLine`, and `AppendFormat`. (For more information, see Composite Formatting.)

Composite formatting methods call the `IFormattable.ToString` method once for each format item in a format string. The parameters passed to the method depend on the specific formatting method that is called and on the content of the format item, as follows:

- If the format item does not include a format string (for example, if the format item is simply `{0}`), it is passed `null` as the value of the `String` parameter.
- If the format item includes a format string (for example, `{0:G}`), that format string is passed as the value of the `String` parameter.
- If the original method call does not include an `IFormatProvider` parameter, `CultureInfo.CurrentCulture` is passed as the value of the `IFormatProvider` parameter.
- If the original method call includes an `IFormatProvider` parameter, the provider that is supplied in the method call is passed as the value of the `IFormatProvider` parameter.

> **Note:**
>  An object's `IFormattable.ToString` implementation is called by composite formatting methods only if they are not passed an `ICustomFormatter` format provider, or if the `ICustomFormatter.Format` method of the custom format provider returns `null`.

180 | .NET includes three format providers, all of which implement the `IFormatProvider` interface:

- `NumberFormatInfo` supplies numeric formatting information, such as the characters to use for decimal and group separators, and the spelling and placement of currency symbols in monetary values.
- `DateTimeFormatInfo` supplies date-related and time-related formatting information, such as the position of the month, the day, and the year in a date pattern.
- `CultureInfo` contains the default formatting information in a specific culture, including the numeric format information, and date-related and time-related formatting information.

In addition, you can define your own custom format provider.

#### Examples
The following example demonstrates a `Temperature` class that implements the `IFormattable.ToString` method. This code example is part of a larger example provided for the `IFormattable` class.

_Code sample not included: ~/snippets/csharp/System/IFormattable/Overview/example1.cs._
