---
title: "StringBuilder class (part 5 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 5 of 11)

## StringBuilder.AppendFormat(String, Object) method

```csharp
public System.Text.StringBuilder AppendFormat (string format, object? arg0);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance. Each format item is replaced by the string representation of a single argument.

Parameters:

- `format`: A composite format string.
- `arg0`: An object to format.

Returns: A reference to this instance with `format` appended. Each format item in `format` is replaced by the string representation of `arg0`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to 1.
- `ArgumentOutOfRangeException`: The length of the expanded string would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method uses the composite formatting feature to convert the value of an object to its text representation and embed that representation in the current `StringBuilder` object.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items. The index of the format items must be 0, to correspond to `arg0`, the single object in the parameter list of this method. The formatting process replaces each format item with the string representation of `arg0`.

The syntax of a format item is as follows:

{*index*,*length*}

Elements in square brackets are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*index*|The zero-based position in the parameter list of the object to be formatted. If the object specified by *index* is `null`, the format item is replaced by `Empty`. If there is no parameter in the *index* position, a `FormatException` is thrown.|
|,*length*|The minimum number of characters in the string representation of the parameter. If positive, the parameter is right-aligned; if negative, it is left-aligned.|
|:*formatString*|A standard or custom format string that is supported by the parameter.|

> **Note:**
>  For the standard and custom format strings used with date and time values, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. For the standard and custom format strings used with numeric values, see Standard Numeric Format Strings and Custom Numeric Format Strings. For the standard format strings used with enumerations, see Enumeration Format Strings.

`arg0` represents the object to be formatted. Each format item in `format` is replaced with the string representation of `arg0`. If the format item includes `formatString` and `arg0` implements the `IFormattable` interface, then `arg0.ToString(formatString, null)` defines the formatting. Otherwise, `arg0.ToString()` defines the formatting.

If the string assigned to `format` is "Thank you for your donation of {0:####} cans of food to our charitable organization." and `arg0` is an integer with the value 10, the return value will be "Thank you for your donation of 10 cans of food to our charitable organization."

#### Examples
The following example demonstrates the `StringBuilder.AppendFormat` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/AppendFormat/appfmt.cs._

## StringBuilder.AppendFormat(String, Object[]) method

```csharp
public System.Text.StringBuilder AppendFormat (string format, params object?[] args);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance. Each format item is replaced by the string representation of a corresponding argument in a parameter array.

Parameters:

- `format`: A composite format string.
- `args`: An array of objects to format.

Returns: A reference to this instance with `format` appended. Each format item in `format` is replaced by the string representation of the corresponding object argument.

Exceptions:

- `ArgumentNullException`: `format` or `args` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to the length of the `args` array.
- `ArgumentOutOfRangeException`: The length of the expanded string would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method uses the composite formatting feature of .NET to convert the value of an object to its text representation and embed that representation in the current `StringBuilder` object.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items, that correspond to objects in the parameter list of this method. The formatting process replaces each format item with the string representation of the corresponding object.

The syntax of a format item is as follows:

{*index*,*length*}

Elements in square brackets are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*index*|The zero-based position in the parameter list of the object to be formatted. If the object specified by *index* is `null`, the format item is replaced by `Empty`. If there is no parameter in the *index* position, a `FormatException` is thrown.|
|,*length*|The minimum number of characters in the string representation of the parameter. If positive, the parameter is right-aligned; if negative, it is left-aligned.|
|:*formatString*|A standard or custom format string that is supported by the parameter.|

> **Note:**
>  For the standard and custom format strings used with date and time values, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. For the standard and custom format strings used with numeric values, see Standard Numeric Format Strings and Custom Numeric Format Strings. For the standard format strings used with enumerations, see Enumeration Format Strings.

`args` represents the objects to be formatted. Each format item in `format` is replaced with the string representation of the corresponding object in `args`. If the format item includes `formatString` and the corresponding object in `args` implements the `IFormattable` interface, then `args[index].ToString(formatString, provider)` defines the formatting. Otherwise, `args[index].ToString()` defines the formatting.

If the string assigned to `format` is "Thank you for your donation of {0:####} cans of food to our charitable organization." and `arg0` is an integer with the value 10, the return value will be "Thank you for your donation of 10 cans of food to our charitable organization."

#### Examples
The following example demonstrates the `StringBuilder.AppendFormat` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/AppendFormat/appfmt.cs._

## StringBuilder.AppendFormat(String, Object>) method

```csharp
public System.Text.StringBuilder AppendFormat (string format, scoped ReadOnlySpan<object?> args);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance.
Each format item is replaced by the string representation of a corresponding argument in a parameter span.

Parameters:

- `format`: A composite format string.
- `args`: A span of objects to format.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `ArgumentOutOfRangeException`: The length of the expanded string would exceed `StringBuilder.MaxCapacity`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to the length of the `args` span.

To be added.

## StringBuilder.AppendFormat(IFormatProvider, String, Object) method

```csharp
public System.Text.StringBuilder AppendFormat (IFormatProvider? provider, string format, object? arg0);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance. Each format item is replaced by the string representation of a single argument using a specified format provider.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A composite format string.
- `arg0`: The object to format.

Returns: A reference to this instance after the append operation has completed. After the append operation, this instance contains any data that existed before the operation, suffixed by a copy of `format` in which any format specification is replaced by the string representation of `arg0`.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to one (1).
- `ArgumentOutOfRangeException`: The length of the expanded string would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method uses the  composite formatting feature of .NET to convert the value of `arg0` to its text representation and embed that representation in the current `StringBuilder` object.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items. The index of each format item must be zero (0) since this method includes an argument list with a single argument. The formatting process replaces each format item with the string representation of `arg0`.

The syntax of a format item is as follows:

{*index*,*length*}

Elements in square brackets are optional. The following table describes each element.

|Element|Description|
|-------------|-----------------|
|*index*|The zero-based position in the parameter list of the object to be formatted. If the object specified by *index* is `null`, the format item is replaced by `Empty`. In this case, since the `AppendFormat` method has a single argument in the argument list, the value of *index* must always be 0. If it is not, a `FormatException` is thrown.|
|,*length*|The minimum number of characters in the string representation of the parameter. If positive, the parameter is right-aligned; if negative, it is left-aligned.|
|:*formatString*|A standard or custom format string that is supported by the parameter.|

> **Note:**
>  For the standard and custom format strings used with date and time values, see Standard Date and Time Format Strings and Custom Date and Time Format Strings. For the standard and custom format strings used with numeric values, see Standard Numeric Format Strings and Custom Numeric Format Strings. For the standard format strings used with enumerations, see Enumeration Format Strings.

The `provider` parameter specifies an `IFormatProvider` implementation that can provide formatting information for the objects in `args`. `provider` can be any of the following:

- A `CultureInfo` object that provides culture-specific formatting information.

- A `NumberFormatInfo` object that provides culture-specific formatting information for `arg0` if it is a numeric value.

- A `DateTimeFormatInfo` object that provides culture-specific formatting information for `arg0` if it is a date and time value.

- A custom `IFormatProvider` implementation that provides formatting information for `arg0`. Typically, such an implementation also implements the `ICustomFormatter` interface.

If the `provider` parameter is `null`, formatting information is obtained from the current culture.

`arg0` represents the object to be formatted. Each format item in `format` is replaced with the string representation of `arg0`. If the format item includes `formatString` and `arg0` implements the `IFormattable` interface, then `arg0.ToString(formatString, provider)` defines the formatting. Otherwise, `arg0.ToString()` defines the formatting.

#### Examples
The following includes two calls to the `AppendFormat` method. Both use the formatting conventions of the English-United Kingdom (en-GB) culture. The first inserts the string representation of a `Decimal` value currency in a result string. The second inserts a `DateTime` value in two places in a result string, the first including only the short date string and the second the short time string.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/AppendFormat/appendformat1.cs._
