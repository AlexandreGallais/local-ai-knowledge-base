---
title: "Convert strings to types"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/parsing-strings.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Parse strings in .NET

A *parsing* operation converts a string that represents a .NET base type into that base type. For example, a parsing operation is used to convert a string to a floating-point number or to a date-and-time value. The method most commonly used to perform a parsing operation is the `Parse` method. Because parsing is the reverse operation of formatting (which involves converting a base type into its string representation), many of the same rules and conventions apply. Just as formatting uses an object that implements the `System.IFormatProvider` interface to provide culture-sensitive formatting information, parsing also uses an object that implements the `System.IFormatProvider` interface to determine how to interpret a string representation. For more information, see Format types.

## In This Section

 Parsing Numeric Strings\
 Describes how to convert strings into .NET numeric types.

 Parsing Date and Time Strings\
 Describes how to convert strings into .NET **DateTime** types.

 Parsing Other Strings\
 Describes how to convert strings into **Char**, **Boolean**, and **Enum** types.

## Related Sections

 Formatting Types\
 Describes basic <example-value> concepts like format specifiers and format providers.

 Type Conversion in .NET\
 Describes how to convert types.
