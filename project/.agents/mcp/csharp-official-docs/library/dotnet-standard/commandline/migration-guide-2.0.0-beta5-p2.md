---
title: "System.CommandLine migration guide to 2.0.0-beta5+ (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/commandline/migration-guide-2.0.0-beta5.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.CommandLine migration guide to 2.0.0-beta5+ (part 2 of 2)

## Separation of parsing and invocation

In 2.0.0-beta4, it was possible to separate the parsing and invoking of commands, but it wasn't clear how to do it. `Command` didn't expose a `Parse` method, but `CommandExtensions` provided `Parse`, `Invoke`, and `InvokeAsync` extension methods for `Command`. This was confusing, as it wasn't clear which method to use and when. The following changes were made to simplify the API:

- `System.CommandLine.Command` now exposes a `Parse` method that returns a `ParseResult` object. This method is used to parse the command-line input and return the result of the parse operation. Moreover, it makes it clear that the command isn't invoked but parsed, and only in synchronous manner.
- `ParseResult` now exposes both `Invoke` and `InvokeAsync` methods that you can use to invoke the command. This pattern makes it clear that the command is invoked after parsing, and allows for both synchronous and asynchronous invocation.
- The `CommandExtensions` class was removed, as it's no longer needed.

### Configuration

Before 2.0.0-beta5, it was possible to customize the parsing, but only with some of the public `Parse` methods. There was a `Parser` class that exposed two public constructors: one accepting a `Command` and another accepting a `CommandLineConfiguration`. `CommandLineConfiguration` was immutable, and to create it, you had to use a builder pattern exposed by the `CommandLineBuilder` class. The following changes were made to simplify the API:

- `CommandLineConfiguration` was split into two *mutable* classes (in 2.0.0-beta7): `System.CommandLine.ParserConfiguration` and `System.CommandLine.InvocationConfiguration`. Creating an invocation configuration is now as simple as creating an instance of `InvocationConfiguration` and setting the properties you want to customize.
- Every `Parse` method now accepts an optional `System.CommandLine.ParserConfiguration` parameter that you can use to customize the parsing. When it isn't provided, the default configuration is used.
- To avoid name conflicts, `Parser` was renamed to `Microsoft.CodeAnalysis.CommandLineParser` to disambiguate from other parser types. Since it'<example-value>'s now a static class with only static methods. It exposes two `Parse` parse methods: one accepting an `IReadOnlyList<string> args` and another accepting a `string args`. The latter uses `System.CommandLine.Parsing.CommandLineParser.SplitCommandLine(System.String)` (also public) to split the command line input into tokens before parsing it.

`CommandLineBuilderExtensions` was also removed. Here is how you can map its methods to the new APIs:

- `CancelOnProcessTermination` is now a property of `System.CommandLine.InvocationConfiguration` called `System.CommandLine.InvocationConfiguration.ProcessTerminationTimeout`. It's enabled by default, with a 2 second timeout. To disable it, set it to `null`. For more information, see Process termination timeout.
- `EnableDirectives`, `UseEnvironmentVariableDirective`, `UseParseDirective`, and `UseSuggestDirective` were removed. A new Directive type was introduced and RootCommand now exposes a `System.CommandLine.RootCommand.Directives` property. You can add, remove, and iterate directives by using this collection. Suggest directive is included by default; you can also use other directives like DiagramDirective or `System.CommandLine.EnvironmentVariablesDirective`.
- `EnableLegacyDoubleDashBehavior` was removed. All unmatched tokens are now exposed by the `System.CommandLine.ParseResult.UnmatchedTokens` property. For more information, see Unmatched tokens.
- `EnablePosixBundling` was removed. The bundling is now enabled by default, you can disable it by setting the `System.CommandLine.ParserConfiguration.EnablePosixBundling` property to `false`. For more information, see EnablePosixBundling.
- `RegisterWithDotnetSuggest` was removed as it performed an expensive operation, typically during application startup. Now you must register commands with `dotnet suggest` manually.
- `UseExceptionHandler` was removed. The default exception handler is now enabled by default; you can disable it by setting the `System.CommandLine.InvocationConfiguration.EnableDefaultExceptionHandler` property to `false`. This is useful when you want to handle exceptions in a custom way, by just wrapping the `Invoke` or `InvokeAsync` methods in a try-catch block. For more information, see EnableDefaultExceptionHandler.
- `UseHelp` and `UseVersion` were removed. The help and version are now exposed by the `System.CommandLine.Help.HelpOption` and `System.CommandLine.VersionOption` public types. They are both included by default in the options defined by RootCommand. For more information, see Customize help output and Version option.
- `UseHelpBuilder` was removed. For more information on how to customize the help output, see How to customize help in System.CommandLine.
- `AddMiddleware` was removed. It slowed down the application startup, and features can be expressed without it.
- `UseParseErrorReporting` and `UseTypoCorrections` were removed. The parse errors are now reported by default when invoking `ParseResult`. You can configure it by using the `System.CommandLine.Invocation.ParseErrorAction` action exposed by the `System.CommandLine.ParseResult.Action` property.

  ```csharp
  ParseResult result = rootCommand.Parse("myArgs", config);
  if (result.Action is ParseErrorAction parseError)
  {
      parseError.ShowTypoCorrections = true;
      parseError.ShowHelp = false;
  }
  ```

- `UseLocalizationResources` and `LocalizationResources` were removed. This feature was used mostly by the `dotnet` CLI to add missing translations to `System.CommandLine`. All those translations were moved to the System.CommandLine itself, so this feature is no longer needed. If support for your language is missing, please report an issue.
- `UseTokenReplacer` was removed. Response files are enabled by default, but you can disable them by setting the `System.CommandLine.ParserConfiguration.ResponseFileTokenReplacer` property to `null`. You can also provide a custom implementation to customize how response files are processed.

Last but not least, the `IConsole` and all related interfaces (`IStandardOut`, `IStandardError`, `IStandardIn`) were removed. `System.CommandLine.InvocationConfiguration` exposes two `TextWriter` properties: `System.CommandLine.InvocationConfiguration.Output` and `System.CommandLine.InvocationConfiguration.Error`. You can set these properties to any `System.IO.TextWriter` instance, such as a `StringWriter`, which you can use to capture output for testing. The motivation for this change was to expose fewer types and reuse existing abstractions.

### Invocation

In 2.0.0-beta4, the `ICommandHandler` interface exposed `Invoke` and `InvokeAsync` methods that were used to invoke the parsed command. This made it easy to mix synchronous and asynchronous code, for example by defining a synchronous handler for a command and then invoking it asynchronously (which could lead to a deadlock). Moreover, it was possible to define a handler only for a command, but not for an option (like help, which displays help) or a directive.

A new abstract base class `System.CommandLine.Invocation.CommandLineAction` and two derived classes, `SynchronousCommandLineAction` and `AsynchronousCommandLineAction`, have been introduced. The former is used for synchronous actions that return an `int` exit code, while the latter is used for asynchronous actions that return a `Task<int>` exit code.

You don't need to create a derived type to define an action. You can use the `System.CommandLine.Command.SetAction*` method to set an action for a command. The synchronous action can be a delegate that takes a `System.CommandLine.ParseResult` parameter and returns an `int` exit code (or nothing, and then a default `0` exit code is returned). The asynchronous action can be a delegate that takes a `System.CommandLine.ParseResult` and `System.Threading.CancellationToken` parameters and returns a `Task<int>` (or `Task` to get default exit code returned).

```csharp
rootCommand.SetAction(ParseResult parseResult =>
{
    FileInfo parsedFile = parseResult.GetValue(fileOption);
    ReadFile(parsedFile);
});
```

In the past, the `CancellationToken` passed to `InvokeAsync` was exposed to handler via a method of `InvocationContext`:

```csharp
rootCommand.SetHandler(async (InvocationContext context) =>
{
    string? urlOptionValue = context.ParseResult.GetValueForOption(urlOption);
    var token = context.GetCancellationToken();
    returnCode = await DoRootCommand(urlOptionValue, token);
});
```

Most users weren'<example-value>'s not passed further (see CA2016).

```csharp
rootCommand.SetAction((ParseResult parseResult, CancellationToken token) =>
{
    string? urlOptionValue = parseResult.GetValue(urlOption);
    return DoRootCommandAsync(urlOptionValue, token);
});
```

As a result of these and other aforementioned changes, the `InvocationContext` class got also removed. The `ParseResult` is now passed directly to the action, so you can access the parsed values and options directly from it.

To summarize these changes:

- The `ICommandHandler` interface was removed. `SynchronousCommandLineAction` and `AsynchronousCommandLineAction` were introduced.
- The `Command.SetHandler` method was renamed to `System.CommandLine.Command.SetAction*`.
- The `Command.Handler` property was renamed to `System.CommandLine.Command.Action`. `Option` was extended with `System.CommandLine.Option.Action`.
- `InvocationContext` was removed. The `ParseResult` is now passed directly to the action.

For more details about how to use actions, see How to parse and invoke commands in System.CommandLine.

## The benefits of the simplified API

The changes made in 2.0.0-beta5 make the API more consistent, future-proof, and easier to use for existing and new users.

New users need to learn fewer concepts and types, as the number of public interfaces decreased from 11 to 0, and public classes (and structs) decreased from 56 to 38. The public method count dropped from 378 to 235, and public properties from 118 to 99.

The number of assemblies referenced by System.CommandLine is reduced from 11 to 6:

```diff
System.Collections
- System.Collections.Concurrent
- System.ComponentModel
System.Console
- System.Diagnostics.Process
System.Linq
System.Memory
- System.Net.Primitives
System.Runtime
- System.Runtime.Serialization.Formatters
+ System.Runtime.InteropServices
- System.Threading
```

The size of the library is reduced (by 32%) and so is the size of NativeAOT apps that use the library.

Simplicity has also improved the performance of the library (it's a side effect of the work, not the main goal of it). The benchmarks show that the parsing and invoking of commands is now faster than in 2.0.0-beta4, especially for large commands with many options and arguments. The performance improvements are visible in both synchronous and asynchronous scenarios.

The simplest app, presented previously, produces the following results:

```ini
BenchmarkDotNet v0.15.0, Windows 11 (10.0.26100.4061/24H2/2024Update/HudsonValley)
AMD Ryzen Threadripper PRO 3945WX 12-Cores 3.99GHz, 1 CPU, 24 logical and 12 physical cores
.NET SDK 9.0.300
  [Host]     : .NET 9.0.5 (9.0.525.21509), X64 RyuJIT AVX2
  Job-JJVAFK : .NET 9.0.5 (9.0.525.21509), X64 RyuJIT AVX2

EvaluateOverhead=False  OutlierMode=DontRemove  InvocationCount=1
IterationCount=100  UnrollFactor=1  WarmupCount=3

| Method                  | Args           | Mean      | StdDev   | Ratio |
|------------------------ |--------------- |----------:|---------:|------:|
| Empty                   | --bool -s test |  63.58 ms | 0.825 ms |  0.83 |
| EmptyAOT                | --bool -s test |  14.39 ms | 0.507 ms |  0.19 |
| SystemCommandLineBeta4  | --bool -s test |  85.80 ms | 1.007 ms |  1.12 |
| SystemCommandLineNow    | --bool -s test |  76.74 ms | 1.099 ms |  1.00 |
| SystemCommandLineNowR2R | --bool -s test |  69.35 ms | 1.127 ms |  0.90 |
| SystemCommandLineNowAOT | --bool -s test |  17.35 ms | 0.487 ms |  0.23 |
```

As you can see, the startup time (the benchmarks report the time required to run given executable) has improved by 12% compared to 2.0.0-beta4. If you compile the app with NativeAOT, it's just 3 ms slower than a NativeAOT app that does not parse the args at all (EmptyAOT in the table above). Also, if you exclude the overhead of an empty app (63.58 ms), the parsing is 40% faster than in 2.0.0-beta4 (22.22 ms vs 13.66 ms).

## See also

- System.CommandLine overview
