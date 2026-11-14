---
title: "Instantiating a DateTimeOffset object (part 14 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object (part 14 of 16)

## Parsing the string representation of a date and time

The `System.DateTimeOffset` type supports four methods that allow you to convert the string representation of a date and time into a `System.DateTimeOffset` value:

- `System.DateTimeOffset.Parse*`, which tries to convert the string representation of a date and time to a `System.DateTimeOffset` value and throws an exception if the conversion fails.

- `System.DateTimeOffset.TryParse*`, which tries to convert the string representation of a date and time to a `System.DateTimeOffset` value and returns `false` if the conversion fails.

- `System.DateTimeOffset.ParseExact*`, which tries to convert the string representation of a date and time in a specified format to a `System.DateTimeOffset` value. The method throws an exception if the conversion fails.

- `System.DateTimeOffset.TryParseExact*`, which tries to convert the string representation of a date and time in a specified format to a `System.DateTimeOffset` value. The method returns `false` if the conversion fails.

The following example illustrates calls to each of these four string conversion methods to instantiate a `System.DateTimeOffset` value.
