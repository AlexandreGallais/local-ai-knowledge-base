---
title: "How to configure the parser in System.CommandLine"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/commandline/how-to-configure-the-parser.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to configure the parser in System.CommandLine

Parsing and invocation are two separate steps, so each of them has their own configuration:

- `System.CommandLine.ParserConfiguration` is a class that provides properties to configure the parsing. It is an optional argument for every `Parse` method, such as `System.CommandLine.Command.Parse*` and `System.CommandLine.Parsing.CommandLineParser.Parse*`.
- `System.CommandLine.InvocationConfiguration` is a class that provides properties to configure the invocation. It is an optional argument of the `System.CommandLine.ParseResult.Invoke*` and `System.CommandLine.ParseResult.InvokeAsync*` methods.

They are exposed by the `System.CommandLine.ParseResult.Configuration` and `System.CommandLine.ParseResult.InvocationConfiguration` properties. When they aren't provided, the default configurations are used.

## ParserConfiguration

### EnablePosixBundling

Bundling of single-character options is enabled by default, but you can disable it by setting the `System.CommandLine.ParserConfiguration.EnablePosixBundling` property to `false`.

### ResponseFileTokenReplacer

Response files are enabled by default, but you can disable them by setting the `System.CommandLine.ParserConfiguration.ResponseFileTokenReplacer` property to `null`. You can also provide a custom implementation to customize how response files are processed.

Response file can contain other response file names, hence parsing might include opening other files. The library expects that all response files were generated and stored by trustworthy agents.

## InvocationConfiguration

### Standard output and error

`System.CommandLine.InvocationConfiguration` makes testing, as well as many extensibility scenarios, easier than using `System.Console`. It exposes two `TextWriter` properties: `System.CommandLine.InvocationConfiguration.Output` and `System.CommandLine.InvocationConfiguration.Error`. You can set these properties to any `TextWriter` instance, such as a `StringWriter`, which you can use to capture output for testing.

Define a simple command that writes to standard output:

```csharp
Option<FileInfo?> fileOption = new("--file")
{
    Description = "An option whose argument is parsed as a FileInfo"
};

RootCommand rootCommand = new("Configuration sample")
{
    fileOption
};

rootCommand.SetAction((parseResult) =>
{
    FileInfo? fileOptionValue = parseResult.GetValue(fileOption);
    parseResult.InvocationConfiguration.Output.WriteLine(
        $"File option value: {fileOptionValue?.FullName}"
        );
});
```
Now, use `System.CommandLine.InvocationConfiguration` to capture the output:

```csharp
StringWriter output = new();
rootCommand.Parse("-h").Invoke(new() { Output = output });
Debug.Assert(output.ToString().Contains("Configuration sample"));
```
### ProcessTerminationTimeout

Process termination timeout can be configured via the `System.CommandLine.InvocationConfiguration.ProcessTerminationTimeout` property. The default value is 2 seconds.

### EnableDefaultExceptionHandler

By default, all unhandled exceptions thrown during the invocation of a command are caught and reported to the user. You can disable this behavior by setting the `System.CommandLine.InvocationConfiguration.EnableDefaultExceptionHandler` property to `false`. This is useful when you want to handle exceptions in a custom way, such as logging them or providing a different user experience.

### Derived classes

`System.CommandLine.InvocationConfiguration` is not sealed, so you can derive from it to add custom properties or methods. This is useful when you want to provide additional configuration options specific to your application.

## See also

- System.CommandLine overview
