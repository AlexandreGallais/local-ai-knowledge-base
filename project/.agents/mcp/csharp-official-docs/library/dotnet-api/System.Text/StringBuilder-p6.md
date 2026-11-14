---
title: "StringBuilder class (part 6 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 6 of 11)

## StringBuilder.AppendFormat(IFormatProvider, String, Object[]) method

```csharp
public System.Text.StringBuilder AppendFormat (IFormatProvider? provider, string format, params object?[] args);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance. Each format item is replaced by the string representation of a corresponding argument in a parameter array using a specified format provider.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A composite format string.
- `args`: An array of objects to format.

Returns: A reference to this instance after the append operation has completed. After the append operation, this instance contains any data that existed before the operation, suffixed by a copy of `format` where any format specification is replaced by the string representation of the corresponding object argument.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
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

The `provider` parameter specifies an `IFormatProvider` implementation that can provide formatting information for the objects in `args`. `provider` can be any of the following:

- A `CultureInfo` object that provides culture-specific formatting information.

- A `NumberFormatInfo` object that provides culture-specific formatting information for numeric values in `args`.

- A `DateTimeFormatInfo` object that provides culture-specific formatting information for date and time values in `args`.

- A custom `IFormatProvider` implementation that provides formatting information for one or more of the objects in `args`. Typically, such an implementation also implements the `ICustomFormatter` interface. The second example in the next section illustrates an `AppendFormat` method call with a custom `IFormatProvider` implementation.

If the `provider` parameter is `null`, format provider information is obtained from the current culture.

`args` represents the objects to be formatted. Each format item in `format` is replaced with the string representation of the corresponding object in `args`. If the format item includes `formatString` and the corresponding object in `args` implements the `IFormattable` interface, then `args[index].ToString(formatString, provider)` defines the formatting. Otherwise, `args[index].ToString()` defines the formatting.

#### Examples
The following example demonstrates the `StringBuilder.AppendFormat` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/AppendFormat/appfmt.cs._

The following example defines a custom `IFormatProvider` implementation named `CustomerFormatter` that formats a 10-digit customer number with hyphens after the fourth and seventh digits. It is passed to the `AppendFormat` method to create a string that includes the formatted customer number and customer name.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/AppendFormat/customernumberformatter1.cs._

## StringBuilder.AppendFormat(IFormatProvider, String, Object>) method

```csharp
public System.Text.StringBuilder AppendFormat (IFormatProvider? provider, string format, scoped ReadOnlySpan<object?> args);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance.
Each format item is replaced by the string representation of a corresponding argument in a parameter span using a specified format provider.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
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

## StringBuilder.AppendFormat(IFormatProvider, CompositeFormat, Object[]) method

```csharp
public System.Text.StringBuilder AppendFormat (IFormatProvider? provider, System.Text.CompositeFormat format, params object?[] args);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance.
Each format item is replaced by the string representation of any of the arguments using a specified format provider.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `args`: An array of objects to format.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentNullException`: `format` or  `args` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## StringBuilder.AppendFormat(IFormatProvider, CompositeFormat, Object>) method

```csharp
public System.Text.StringBuilder AppendFormat (IFormatProvider? provider, System.Text.CompositeFormat format, scoped ReadOnlySpan<object?> args);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance.
Each format item is replaced by the string representation of any of the arguments using a specified format provider.

Parameters:

- `provider`: An object that supplies culture-specific formatting information.
- `format`: A `CompositeFormat`.
- `args`: A span of objects to format.

Returns: A reference to this instance after the append operation has completed.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: The index of a format item is greater than or equal to the number of supplied arguments.

To be added.

## StringBuilder.AppendFormat(String, Object, Object) method

```csharp
public System.Text.StringBuilder AppendFormat (string format, object? arg0, object? arg1);
```

Appends the string returned by processing a composite format string, which contains zero or more format items, to this instance. Each format item is replaced by the string representation of either of two arguments.

Parameters:

- `format`: A composite format string.
- `arg0`: The first object to format.
- `arg1`: The second object to format.

Returns: A reference to this instance with `format` appended. Each format item in `format` is replaced by the string representation of the corresponding object argument.

Exceptions:

- `ArgumentNullException`: `format` is `null`.
- `FormatException`: `format` is invalid.

-or-

The index of a format item is less than 0 (zero), or greater than or equal to 2.
- `ArgumentOutOfRangeException`: The length of the expanded string would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method uses the composite formatting feature of .NET to convert the value of an object to its text representation and embed that representation in the current `StringBuilder` object.

The `format` parameter consists of zero or more runs of text intermixed with zero or more indexed placeholders, called format items, that correspond to `arg0` and `arg1`, the two objects in the parameter list of this method. The formatting process replaces each format item with the string representation of the corresponding object.

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

`arg0` and `arg1` represent the objects to be formatted. Each format item in `format` is replaced with the string representation of either `arg0` or `arg1`. If the format item includes `formatString` and the corresponding object implements the `IFormattable` interface, then `arg`*x*`.ToString(formatString, provider)` defines the formatting, where *x* is the index of the argument. Otherwise, `arg`*x*`.ToString()` defines the formatting.

If the string assigned to `format` is "Thank you for your donation of {0:####} cans of food to our charitable organization." and `arg0` is an integer with the value 10, the return value will be "Thank you for your donation of 10 cans of food to our charitable organization."

#### Examples
The following example demonstrates the `StringBuilder.AppendFormat` method.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/AppendFormat/appfmt.cs._
