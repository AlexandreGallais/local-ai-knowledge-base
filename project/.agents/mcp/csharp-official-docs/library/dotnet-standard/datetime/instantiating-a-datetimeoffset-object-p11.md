---
title: "Instantiating a DateTimeOffset object (part 11 of 16)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/datetime/instantiating-a-datetimeoffset-object.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Instantiating a DateTimeOffset object (part 11 of 16)

## Implicit type conversion

The `System.DateTimeOffset` type supports one *implicit* type conversion: from a `System.DateTime` value to a `System.DateTimeOffset` value. (An implicit type conversion is a conversion from one type to another that does not require an explicit cast (in C#) or conversion (in Visual Basic) and that does not lose information.) It makes code like the following possible.
