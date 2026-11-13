---
title: "Command-line syntax overview for System.CommandLine (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/syntax.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Syntax overview: Commands, options, and arguments

This article explains the command-line syntax that `System.CommandLine` recognizes. The information is useful to both users and developers of .NET command-line apps, including the .NET CLI.

## Tokens

`System.CommandLine` parses command-line input into *tokens*, which are strings delimited by spaces. For example, consider the following command line:

```dotnetcli
dotnet tool install dotnet-suggest --global --verbosity quiet
```

This input is parsed by the `dotnet` application into tokens `tool`, `install`, `dotnet-suggest`, `--global`, `--verbosity`, and `quiet`.

Tokens are interpreted as commands, options, or arguments. The command-line app that is being invoked determines how the tokens after the first one are interpreted. The following table shows how `System.CommandLine` interprets the preceding example:

| Token            | Parsed as                         |
|------------------|-----------------------------------|
| `tool`           | Subcommand                        |
| `install`        | Subcommand                        |
| `dotnet-suggest` | Argument for install command      |
| `--global`       | Option for install command        |
| `--verbosity`    | Option for install command        |
| `quiet`          | Argument for `--verbosity` option |

A token can contain spaces if it'<example-value>'s an example:

```console
dotnet tool search "ef migrations add"
```

The symbol hierarchy (commands, options, arguments) is considered to be trusted input; the token <example-value> are not.

## Commands

A *command* in command-line input is a token that specifies an action or defines a group of related actions. For example:

* In `dotnet run`, `run` is a command that specifies an action.
* In `dotnet tool install`, `install` is a command that specifies an action, and `tool` is a command that specifies a group of related commands. There are other tool-related commands, such as `tool uninstall`, `tool list`, and `tool update`.

### Root command

The *root command* is the one that specifies the name of the app's executable. For example, the `dotnet` command specifies the *dotnet.exe* executable.

`System.CommandLine.Command` is the general-purpose class for any command or subcommand, while `System.CommandLine.RootCommand` is a specialized version intended for the application's root entry point. `RootCommand` inherits all features of `Command` but adds root-specific behavior and defaults, such as Help option, Version option, and Suggest directive.

### Subcommands

Most command-line apps support *subcommands*, also known as *verbs*. For example, the `dotnet` command has a `run` subcommand that you invoke by entering `dotnet run`.

Subcommands can have their own subcommands. In `dotnet tool install`, `install` is a subcommand of `tool`.

You can add subcommands as shown in the following example:

```csharp
RootCommand rootCommand = new();

Command sub1Command = new("sub1", "First-level subcommand");
rootCommand.Subcommands.Add(sub1Command);

Command sub1aCommand = new("sub1a", "Second level subcommand");
sub1Command.Subcommands.Add(sub1aCommand);
```
The innermost subcommand in this example can be invoked like this:

```console
myapp sub1 sub1a
```

## Options

An option is a named parameter that can be passed to a command. POSIX CLIs typically prefix the option name with two hyphens (`--`). The following example shows two options:

```dotnetcli
dotnet tool update dotnet-suggest --verbosity quiet --global
                                  ^---------^       ^------^
```

As this example illustrates, the value of the option can be explicit (`quiet` for `--verbosity`) or implicit (nothing follows `--global`). Options that have no value specified are typically Boolean parameters that default to `true` if the option is specified on the command line.

For some Windows command-line apps, you identify an option by using a leading slash (`/`) with the option name. For example:

```console
msbuild /version
        ^------^
```

`System.CommandLine` supports both POSIX and Windows prefix conventions.

When you configure an option, you specify the option name including the prefix:

```csharp
Option<int> delayOption = new("--delay", "-d")
{
    Description = "An option whose argument is parsed as an int",
    DefaultValueFactory = parseResult => 42,
};
Option<string> messageOption = new("--message", "-m")
{
    Description = "An option whose argument is parsed as a string"
};

RootCommand rootCommand = new();
rootCommand.Options.Add(delayOption);
rootCommand.Options.Add(messageOption);
```
### Global options

To add an option to a command and recursively to all of its subcommands, set the `System.CommandLine.Option.Recursive` property to `true`. This is useful for options that apply across your entire application, such as verbosity, output format, or configuration file paths.

The following example shows how to create a global option that's available to all commands:

```csharp
static void GlobalOptionExample(string[] args)
{
    // Create a global option that applies to all commands.
    Option<bool> verboseOption = new("--verbose", "-v")
    {
        Description = "Show verbose output",
        Recursive = true
    };

    RootCommand rootCommand = new("Sample app demonstrating global options");
    rootCommand.Options.Add(verboseOption);

    Command buildCommand = new("build", "Build the project");
    Command testCommand = new("test", "Run tests");

    rootCommand.Subcommands.Add(buildCommand);
    rootCommand.Subcommands.Add(testCommand);

    buildCommand.SetAction(parseResult =>
    {
        bool isVerbose = parseResult.GetValue(verboseOption);
        Console.WriteLine($"Building project... (verbose: {isVerbose})");
    });

    testCommand.SetAction(parseResult =>
    {
        bool isVerbose = parseResult.GetValue(verboseOption);
        Console.WriteLine($"Running tests... (verbose: {isVerbose})");
    });

    rootCommand.Parse(args).Invoke();
}
```
In this example, the `--verbose` option is available to both the `build` and `test` commands without having to add it to each command individually.

### The verbosity option

Many command-line apps provide a `--verbosity` option to control the amount of output displayed. The design guidance recommends five standard verbosity levels: `Q[uiet]`, `M[inimal]`, `N[ormal]`, `D[etailed]`, and `Diag[nostic]`.

The following example shows how to implement a verbosity option that accepts both full and abbreviated names and has an alias (`-v`). When `-v` is specified without a value, it defaults to diagnostic verbosity level, which follows the design guidance. The example also includes a shorthand option (`-q`) for `--verbosity quiet`:

```csharp
static void VerbosityOptionExample(string[] args)
{
    // Create verbosity option that accepts full and short names as strings.
    // -v without an argument defaults to diagnostic.
    Option<string> verbosityOption = new("--verbosity", "-v")
    {
        Description = "Output verbosity level. Allowed values are q[uiet], m[inimal], n[ormal], d[etailed], and diag[nostic].",
        Recursive = true,
        Arity = ArgumentArity.ZeroOrOne,
        DefaultValueFactory = result =>
            {
                // This runs only when the option isn't specified at all.
                // If the option is specified without a value (for example, `-v`),
                // DefaultValueFactory isn't called and the value is an empty string,
                // which is handled later when mapping to "diagnostic".
                return "normal";
            }
    };

    // Add -q as a separate option for quiet verbosity.
    Option<bool> quietOption = new("-q")
    {
        Description = "Set verbosity to quiet (shorthand for --verbosity quiet)",
        Recursive = true
    };

    // Handle both short and long forms.
    verbosityOption.Validators.Add(result =>
    {
        if (result.Tokens.Count == 0)
        {
            return; // Allow default value.
        }

        string value = result.Tokens.Single().Value.ToLowerInvariant();
        string[] validValues = new[] { "quiet", "q", "minimal", "m", "normal", "n", "detailed", "d", "diagnostic", "diag" };

        if (!validValues.Contains(value))
        {
            result.AddError($"Argument '{value}' not recognized. Must be one of: 'q[uiet]', 'm[inimal]', 'n[ormal]', 'd[etailed]', 'diag[nostic]'");
        }
    });

    RootCommand rootCommand = new("Sample app with verbosity");
    rootCommand.Options.Add(verbosityOption);
    rootCommand.Options.Add(quietOption);

    Command processCommand = new("build", "Build the project");
    rootCommand.Subcommands.Add(processCommand);

    processCommand.SetAction(parseResult =>
    {
        string verbosityString;

        // Check if -q was specified.
        if (parseResult.GetValue(quietOption))
        {
            verbosityString = "quiet";
        }
        else
        {
            verbosityString = parseResult.GetValue(verbosityOption);

            // If the option was specified without an argument,
            // the value will be empty string.
            // Set it to diagnostic as per design guidance.
            if (string.IsNullOrEmpty(verbosityString))
            {
                verbosityString = "diagnostic";
            }
        }

        // Convert string to enum.
        VerbosityLevel verbosity = verbosityString switch
        {
            "quiet" or "q" => VerbosityLevel.Quiet,
            "minimal" or "m" => VerbosityLevel.Minimal,
            "normal" or "n" => VerbosityLevel.Normal,
            "detailed" or "d" => VerbosityLevel.Detailed,
            "diagnostic" or "diag" => VerbosityLevel.Diagnostic,
            _ => VerbosityLevel.Normal
        };

        Console.WriteLine($"Verbosity level: {verbosity}");
    });

    rootCommand.Parse(args).Invoke();
}

enum VerbosityLevel
{
    Quiet,
    Minimal,
    Normal,
    Detailed,
    Diagnostic
}
```
You can invoke the app with any of these command lines:

```console
myapp build -q
myapp build -v
myapp build --verbosity minimal
myapp build --verbosity m
myapp build
```

### Required options

Some options have required arguments. For example in the .NET CLI, `--output` requires a folder name argument. If the argument is not provided, the command fails. To make an option required, set its `System.CommandLine.Option.Required` property to `true`, as shown in the following example:

```csharp
Option<FileInfo> fileOption = new("--output")
{
    Required = true
};
```
If a required option has a default value (specified via the `System.CommandLine.Option`1.DefaultValueFactory` property), the option doesn't have to be specified on the command line. In that case, the default value provides the required option value.

## Arguments

An argument is an unnamed parameter that can be passed to a command. The following example shows an argument for the `build` command.

```console
dotnet build myapp.csproj
             ^----------^
```

When you configure an argument, you specify the argument name (it's not used for parsing, but it can be used for getting parsed values by name or displaying help) and type:

```csharp
Argument<int> delayArgument = new("delay")
{
    Description = "An argument that is parsed as an int.",
    DefaultValueFactory = parseResult => 42
};
Argument<string> messageArgument = new("message")
{
    Description = "An argument that is parsed as a string."
};

RootCommand rootCommand = new();
rootCommand.Arguments.Add(delayArgument);
rootCommand.Arguments.Add(messageArgument);
```
## Default values

Both arguments and options can have default values that apply if no argument is explicitly provided. For example, many options are implicitly Boolean parameters with a default of `true` when the option name is in the command line. The following command-line examples are equivalent:

```dotnetcli
dotnet tool update dotnet-suggest --global
                                  ^------^

dotnet tool update dotnet-suggest --global true
                                  ^-----------^
```

An argument that's defined without a default value is treated as a required argument.

## Parse errors

Options and arguments have expected types, and an error is produced when the value can't be parsed. For example, the following command errors because `silent` isn't one of the valid values for `--verbosity`:

```dotnetcli
dotnet build --verbosity silent
```

```csharp
Option<string> verbosityOption = new("--verbosity", "-v")
{
    Description = "Set the verbosity level",
};
verbosityOption.AcceptOnlyFromAmong("quiet", "minimal", "normal", "detailed", "diagnostic");
RootCommand rootCommand = new() { verbosityOption };

ParseResult parseResult = rootCommand.Parse(args);
foreach (ParseError parseError in parseResult.Errors)
{
    Console.WriteLine(parseError.Message);
}
```
```output
Argument 'silent' not recognized. Must be one of:
        'quiet'
        'minimal'
        'normal'
        'detailed'
        'diagnostic'
```

Arguments also have expectations about how many values can be provided. Examples are provided in the section on argument arity.

## Order of options and arguments

You can provide options before arguments, or arguments before options, on the command line. The following commands are equivalent:

```dotnetcli
dotnet add package System.CommandLine --no-restore
dotnet add package --no-restore System.CommandLine
```

Options can be specified in any order. The following commands are equivalent:

```dotnetcli
dotnet add package System.CommandLine --no-restore --source https://api.nuget.org/v3/index.json
dotnet add package System.CommandLine --source https://api.nuget.org/v3/index.json --no-restore
```

When there are multiple arguments, the order does matter. The following commands are not equivalent; they differ in the order of the values, which could lead to different results:

```console
myapp argument1 argument2
myapp argument2 argument1
```
