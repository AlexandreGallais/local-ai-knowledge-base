---
title: "IFormatProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IFormatProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IFormatProvider interface

Namespace: `System`

```csharp
public interface IFormatProvider
```

Provides a mechanism for retrieving an object to control formatting.

#### Remarks
The `IFormatProvider` interface supplies an object that provides formatting information for formatting and parsing operations. Formatting operations convert the value of a type to the string representation of that value. Typical formatting methods are the `ToString` methods of a type, as well as `String.Format`. Parsing operations convert the string representation of a value to a type with that value. Typical parsing methods are `Parse` and `TryParse`.

The `IFormatProvider` interface consists of a single method, `IFormatProvider.GetFormat`. `IFormatProvider.GetFormat` is a callback method: The parsing or formatting method calls it and passes it a `Type` object that represents the type of object that the formatting or parsing method expects will provide formatting information. The `IFormatProvider.GetFormat` method is responsible for returning an object of that type.

`IFormatProvider` implementations are often used implicitly by formatting and parsing methods. For example, the `ToString` method implicitly uses an `IFormatProvider` implementation that represents the system's current culture. `IFormatProvider` implementations can also be specified explicitly by methods that have a parameter of type `IFormatProvider`, such as `Parse` and `Format`.

.NET includes the following three predefined `IFormatProvider` implementations to provide culture-specific information that is used in formatting or parsing numeric and date and time values:

- The `NumberFormatInfo` class, which provides information that is used to format numbers, such as the currency, thousands separator, and decimal separator symbols for a particular culture. For information about the predefined format strings recognized by a `NumberFormatInfo` object and used in numeric formatting operations, see Standard Numeric Format Strings and Custom Numeric Format Strings.

- The `DateTimeFormatInfo` class, which provides information that is used to format dates and times, such as the date and time separator symbols for a particular culture or the order and format of a date's year, month, and day components. For information about the predefined format strings recognized by a `DateTimeFormatInfo` object and used in numeric formatting operations, see Standard Date and Time Format Strings and Custom Date and Time Format Strings.

- The `CultureInfo` class, which represents a particular culture. Its `IFormatProvider.GetFormat` method returns a culture-specific `NumberFormatInfo` or `DateTimeFormatInfo` object, depending on whether the `CultureInfo` object is used in a formatting or parsing operation that involves numbers or dates and times.

.NET also supports custom formatting. This typically involves the creation of a formatting class that implements both `IFormatProvider` and `ICustomFormatter`. An instance of this class is then passed as a parameter to a method that performs a custom formatting operation, such as `Format` The example provides an illustration of such a custom implementation that formats a number as a 12-digit account number.

#### Examples
The following example illustrates how an `IFormatProvider` implementation can change the representation of a date and time value. In this case, a single date is displayed by using `CultureInfo` objects that represent four different cultures.

_Code sample not included: ~/snippets/csharp/System/IFormatProvider/Overview/provider2.cs._

The following example illustrates the use of a class that implements the `IFormatProvider` interface and the `IFormatProvider.GetFormat` method. The `AcctNumberFormat` class converts an `Int64` value that represents an account number to a formatted 12-digit account number. Its `GetFormat` method returns a reference to the current `AcctNumberFormat` instance if the `formatType` parameter refers to a class that implements `ICustomFormatter`; otherwise, `GetFormat` returns `null`.

_Code sample not included: ~/snippets/csharp/System/IFormatProvider/Overview/Provider.cs._

The class that implements `IFormatProvider` can then be used in a call to a formatting and parsing operation. For example, the following code calls the `Format` method to generate a string that contains a formatted 12-digit account number.

_Code sample not included: ~/snippets/csharp/System/IFormatProvider/Overview/Provider.cs._

## IFormatProvider.GetFormat(Type) method

```csharp
public object? GetFormat (Type? formatType);
```

Returns an object that provides formatting services for the specified type.

Parameters:

- `formatType`: An object that specifies the type of format object to return.

Returns: An instance of the object specified by `formatType`, if the `IFormatProvider` implementation can supply that type of object; otherwise, `null`.

#### Remarks
`IFormatProvider.GetFormat` is a callback method that formatting and parsing methods invoke to retrieve information about the format of the input string in parsing operations or the format of the output string in formatting operations. In the `formatType` parameter, the formatting or parsing method passes the type of object it requires to perform its operation. If the `IFormatProvider` implementation can supply this formatting or parsing object, it returns that object. If not, it returns `null`.

For example, in the call to the `ToString` method, the method argument is an `IFormatProvider` object that provides information about how the string representation of the current integer instance might be formatted. When the runtime executes the method, it calls the `IFormatProvider` object's `IFormatProvider.GetFormat` method and passes it a `Type` object that represents the `NumberFormatInfo` type. If the `IFormatProvider` object can supply a `NumberFormatInfo` object, it returns that object. If it cannot supply an object of that type, it returns `null`.

You can implement the `IFormatProvider` interface and the `IFormatProvider.GetFormat` method in classes that provide custom formatting or parsing services. The `IFormatProvider` implementation is then passed as an argument to any overload of a parsing or formatting method that has a parameter of type `IFormatProvider`, such as `Format`, `ToString`, or `Parse`.

#### Examples
The following example illustrates the use of a class that implements the `IFormatProvider` interface and the `IFormatProvider.GetFormat` method. The `AcctNumberFormat` class converts an `Int64` value that represents an account number to a formatted 12-digit account number. Its `GetFormat` method returns a reference to itself if the `formatType` parameter refers to a class that implements `ICustomFormatter`; otherwise, `GetFormat` returns `null`.

_Code sample not included: ~/snippets/csharp/System/IFormatProvider/Overview/Provider.cs._

An instance of the `AcctNumberFormat` class can then be passed as an argument to a method that provides formatting or parsing services. For example, the following code passes an `AcctNumberFormat` class to the `Format` method to generate a formatted 12-digit account number.

_Code sample not included: ~/snippets/csharp/System/IFormatProvider/Overview/Provider.cs._
