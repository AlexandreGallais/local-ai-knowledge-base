---
title: "System.CommandLine overview"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# System.CommandLine overview

The `System.CommandLine` library provides functionality commonly needed by command-line apps, such as parsing command-line input and displaying help text.

Apps that use `System.CommandLine` include the .NET CLI, additional tools, and many global and local tools.

For app developers, the library:

- Lets you focus on writing your app code, since you don't have to write code to parse command-line input or produce a help page.
- Lets you test app code independently of input parsing code.
- Is trim-friendly, making it a good choice for developing fast, lightweight, AOT-capable CLI apps.

Use of the library also benefits app users:

- It ensures that command-line input is parsed consistently according to POSIX or Windows conventions.
- It automatically supports tab completion and response files.

## NuGet package

The library is available as a NuGet package: System.CommandLine.

## Next steps

To get started with System.CommandLine, see the following resources:

- Tutorial: Get started with System.CommandLine
- Syntax overview: commands, options, and arguments

To learn more, see the following resources:

- How to parse and invoke the result
- How to customize parsing and validation
- How to configure the parser
- How to customize help
- How to enable and customize tab completion
- Command-line design guidance
- Migration guide to 2.0.0-beta5
- System.CommandLine API reference
