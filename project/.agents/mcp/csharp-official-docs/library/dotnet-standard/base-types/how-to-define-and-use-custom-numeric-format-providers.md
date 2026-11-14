---
title: "How to: Define and Use Custom Numeric Format Providers (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/base-types/how-to-define-and-use-custom-numeric-format-providers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Define and Use Custom Numeric Format Providers

.NET gives you extensive control over the string representation of numeric values. It supports the following features for customizing the format of numeric values:

- Standard numeric format strings, which provide a predefined set of formats for converting numbers to their string representation. You can use them with any numeric formatting method, such as `System.Decimal.ToString(System.String)`, that has a `format` parameter. For details, see Standard Numeric Format Strings.

- Custom numeric format strings, which provide a set of symbols that can be combined to define custom numeric format specifiers. They can also be used with any numeric formatting method, such as `System.Decimal.ToString(System.String)`, that has a `format` parameter. For details, see Custom Numeric Format Strings.

- Custom `System.Globalization.CultureInfo` or `System.Globalization.NumberFormatInfo` objects, which define the symbols and format patterns used in displaying the string representations of numeric values. You can use them with any numeric formatting method, such as `System.Int32.ToString*`, that has a `provider` parameter. Typically, the `provider` parameter is used to specify culture-specific formatting.

 In some cases (such as when an application must display a formatted account number, an identification number, or a postal code) these three techniques are inappropriate. .NET also enables you to define a formatting object that is neither a `System.Globalization.CultureInfo` nor a `System.Globalization.NumberFormatInfo` object to determine how a numeric value is formatted. This topic provides the step-by-step instructions for implementing such an object, and provides an example that formats telephone numbers.

## Define a custom format provider

1. Define a class that implements the `System.IFormatProvider` and `System.ICustomFormatter` interfaces.

2. Implement the `System.IFormatProvider.GetFormat*` method. `System.IFormatProvider.GetFormat*` is a callback method that the formatting method (such as the `System.String.Format(System.IFormatProvider,System.String,System.Object[])` method) invokes to retrieve the object that is actually responsible for performing custom formatting. A typical implementation of `System.IFormatProvider.GetFormat*` does the following:

    1. Determines whether the `System.Type` object passed as a method parameter represents an `System.ICustomFormatter` interface.

    2. If the parameter does represent the `System.ICustomFormatter` interface, `System.IFormatProvider.GetFormat*` returns an object that implements the `System.ICustomFormatter` interface that is responsible for providing custom formatting. Typically, the custom formatting object returns itself.

    3. If the parameter does not represent the `System.ICustomFormatter` interface, `System.IFormatProvider.GetFormat*` returns `null`.

3. Implement the `System.ICustomFormatter.Format*` method. This method is called by the `System.String.Format(System.IFormatProvider,System.String,System.Object[])` method and is responsible for returning the string representation of a number. Implementing the method typically involves the following:

    1. Optionally, make sure that the method is legitimately intended to provide formatting services by examining the `provider` parameter. For formatting objects that implement both `System.IFormatProvider` and `System.ICustomFormatter`, this involves testing the `provider` parameter for equality with the current formatting object.

    2. Determine whether the formatting object should support custom format specifiers. (For example, an "N" format specifier might indicate that a U.S. telephone number should be output in NANP format, and an "I" might indicate output in ITU-T Recommendation E.123 format.) If format specifiers are used, the method should handle the specific format specifier. It is passed to the method in the `format` parameter. If no specifier is present, the value of the `format` parameter is `System.String.Empty`.

    3. Retrieve the numeric value passed to the method as the `arg` parameter. Perform whatever manipulations are required to convert it to its string representation.

    4. Return the string representation of the `arg` parameter.

## Use a custom numeric formatting object

1. Create a new instance of the custom formatting class.

2. Call the `System.String.Format(System.IFormatProvider,System.String,System.Object[])` formatting method, passing it the custom formatting object, the formatting specifier (or `System.String.Empty`, if one is not used), and the numeric value to be formatted.
