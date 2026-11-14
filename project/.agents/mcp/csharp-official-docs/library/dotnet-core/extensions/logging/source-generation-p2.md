---
title: "Compile-time logging source generation (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/extensions/logging/source-generation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Compile-time logging source generation (part 2 of 2)

## Summary

With the advent of C# source generators, writing highly performant logging APIs is easier. Using the source generator approach has several key <example-value>:

- Allows the logging structure to be preserved and enables the exact format syntax required by Message Templates.
- Allows supplying alternative names for the template placeholders and using format specifiers.
- Allows the passing of all original data as-is, without any complication around how it's stored before something is done with it (other than creating a `string`).
- Provides logging-specific diagnostics and emits warnings for duplicate event IDs.

Additionally, there are benefits over manually using `Microsoft.Extensions.Logging.LoggerMessage.Define*`:

- Shorter and simpler syntax: Declarative attribute usage rather than coding boilerplate.
- Guided developer experience: The generator gives warnings to help developers do the right thing.
- Support for an arbitrary number of logging parameters. `LoggerMessage.Define` supports a maximum of six.
- Support for dynamic log level. This isn't possible with `LoggerMessage.Define` alone.

## See also

- Logging in .NET
- High-performance logging in .NET
- Console log formatting
- Data redaction in .NET
- Data classification in .NET
- NuGet: Microsoft.Extensions.Logging.Abstractions
