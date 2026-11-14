---
title: ".NET default templates for 'dotnet new' (part 1 of 4)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dotnet-new-sdk-templates.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Default templates for `dotnet new`

When you install the .NET SDK, you receive over a dozen built-in templates for creating projects and files, including console apps, class libraries, unit test projects, ASP.NET Core apps (including Angular and React projects), and configuration files. To list the built-in templates, run the `dotnet new list` command:

```dotnetcli
dotnet new list
```

## Template options

The templates that ship with the .NET SDK has template-specific options. To show the additional options available for the template, use the `--help` option with the template name argument, for example: `dotnet new console --help`. The template-specific sections in this article also describe the options.

If the template supports multiple programming languages, the `--help` option will show help for the template in the default language. By combining it with the `--language` option, you can see the help for other languages: `dotnet new console --help --language F#`.
