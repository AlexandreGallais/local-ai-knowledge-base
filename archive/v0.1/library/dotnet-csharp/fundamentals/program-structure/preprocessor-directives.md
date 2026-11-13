---
title: "Preprocessor directives"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/program-structure/preprocessor-directives.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Preprocessor directives

> **Tip:**
> **New to developing software?** You won't need preprocessor directives right away. Focus on the Get started tutorials first and come back here when your projects require conditional compilation or build configuration.
>
> **Experienced in another language?** If you're familiar with `#ifdef` in C/C++ or conditional compilation in other languages, C# preprocessor directives work similarly. Skim ahead to the syntax you need.

C# preprocessor directives tell the compiler what code to include, exclude, or treat differently when it builds your app. This guidance can change the resulting program. Preprocessor directives always start with `#` and must appear on their own line (ignoring leading whitespace). You can add a trailing comment after the directive. While the language reference documents all available directives, three groups cover everyday use:

- **File-based apps** (`#:`) - configure file-based apps.
- **Conditional compilation** (`#if` / `#elif` / `#else` / `#endif`) — include or exclude code based on build configuration or target framework.
- **Warning suppression** (`#pragma warning`) — suppress or restore specific compiler warnings.

## File-based app directives

Starting with C# 14, file-based apps use two additional directives:

- `#!` — the *shebang* line that enables executing the file directly on Unix (for example, `./Program.cs`). This requires the *execute* permission to be set on the file (`chmod +x <file>`).
- `#:` — build-system directives that configure packages, SDK settings, and other options for single-file programs.

Use `#:package` to add a NuGet package. For example, the following file-based app uses the `Spectre.Console` package to render styled output:

```csharp
#!/usr/bin/env dotnet
#:package Spectre.Console@*

AnsiConsole.MarkupLine("[bold green]Hello[/] from a file-based app!");
```

You can specify an exact version with `@`, or use `@*` to pull the latest version. Add multiple `#:package` directives to include more packages:

```csharp
#:package user@example.com
```

Other `#:` directives let you reference projects, set MSBuild properties, or change the SDK:

```csharp
#:project ../SharedLibrary/SharedLibrary.csproj
#:property PublishAot=false
#:sdk Microsoft.NET.Sdk.Web
```

For the full list of directives, see File-based apps and the language reference.

## Conditional compilation

Use `#if`, `#elif`, `#else`, and `#endif` to include or exclude code based on whether a symbol is defined. The most common symbols are `DEBUG` (set automatically for Debug builds) and target framework symbols like `NET10_0_OR_GREATER`:

```csharp
static void ConfigureLogging()
{
#if DEBUG
    Console.WriteLine("Debug logging enabled — verbose output active.");
#else
    Console.WriteLine("Release logging — errors only.");
#endif
}
```
The build system defines the `DEBUG` symbol when you build in the Debug configuration. You don't need to define it yourself. Target framework symbols like `NET10_0_OR_GREATER` and `NET8_0_OR_GREATER` let you write code that adapts to different .NET versions in multi-targeting projects.

You can combine symbols with logical operators: `&&` (and), `||` (or), and `!` (not):

```csharp
static void ShowPlatformInfo()
{
#if NET10_0_OR_GREATER
    Console.WriteLine("Running on .NET 10 or later.");
#elif NET8_0_OR_GREATER
    Console.WriteLine("Running on .NET 8 or 9.");
#else
    Console.WriteLine("Running on an older .NET version.");
#endif
}
```
Use `#define` at the top of a file to define your own symbols. You can also define symbols for the entire project by using the `DefineConstants` property in your project file.

## Warning suppression

Use `#pragma warning disable` to suppress specific compiler warnings, and `#pragma warning restore` to re-enable them. Always scope the suppression as narrowly as possible:

```csharp
    static void ProcessData()
    {
        try
        {
            // Some operation that might fail
            var data = File.ReadAllText("config.json");
            Console.WriteLine($"Config loaded: {data.Length} characters");
        }
#pragma warning disable CS0168 // Variable is declared but never used
        catch (FileNotFoundException ex)
#pragma warning restore CS0168
        {
            // Fall back to defaults — the exception details aren't needed here
            Console.WriteLine("Config file not found, using defaults.");
        }
    }
```
> **Tip:**
> Always specify the warning number, such as `CS0168`, rather than disabling all warnings. This approach keeps the suppression targeted and makes it clear *why* a warning is being suppressed.

## Related content

- C# preprocessor directives (language reference)
- File-based apps
