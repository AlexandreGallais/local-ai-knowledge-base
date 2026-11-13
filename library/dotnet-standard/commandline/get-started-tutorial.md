---
title: "Tutorial: Get started with System.CommandLine (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/get-started-tutorial.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Get started with System.CommandLine

This tutorial shows how to create a .NET command-line app that uses the `System.CommandLine` library. You'll begin by creating a simple root command that has one option. Then you'll build on that base, creating a more complex app that contains multiple subcommands and different options for each command.

In this tutorial, you learn how to:

>
> * Create commands, options, and arguments.
> * Specify default values for options.
> * Assign options and arguments to commands.
> * Assign an option recursively to all subcommands under a command.
> * Work with multiple levels of nested subcommands.
> * Create aliases for commands and options.
> * Work with `string`, `string[]`, `int`, `bool`, `FileInfo`, and enum option types.
> * Read option values in command action code.
> * Use custom code for parsing and validating options.

## Prerequisites

- The latest .NET SDK
- Visual Studio Code editor
- The C# DevKit

Or

* Visual Studio with the **.NET desktop development** workload installed.

## Create the app

Create a .NET 9 console app project named "scl".

1. Create a folder named *scl* for the project, and then open a command prompt in the new folder.

1. Run the following command:

   ```dotnetcli
   dotnet new console --framework net9.0
   ```

### Install the System.CommandLine package

* Run the following command:

  ```dotnetcli
  dotnet add package System.CommandLine
  ```

  Or, in .NET 10+:

  ```dotnetcli
  dotnet package add System.CommandLine
  ```

### Parse the arguments

Replace the contents of *Program.cs* with the following code:

```csharp
using System.CommandLine;
using System.CommandLine.Parsing;

namespace scl;

class Program
{
    static int Main(string[] args)
    {
        Option<FileInfo> fileOption = new("--file")
        {
            Description = "The file to read and display on the console"
        };

        RootCommand rootCommand = new("Sample app for System.CommandLine");
        rootCommand.Options.Add(fileOption);

        ParseResult parseResult = rootCommand.Parse(args);
        if (parseResult.Errors.Count == 0 && parseResult.GetValue(fileOption) is FileInfo parsedFile)
        {
            ReadFile(parsedFile);
            return 0;
        }
        foreach (ParseError parseError in parseResult.Errors)
        {
            Console.Error.WriteLine(parseError.Message);
        }
        return 1;
    }

    static void ReadFile(FileInfo file)
    {
        foreach (string line in File.ReadLines(file.FullName))
        {
            Console.WriteLine(line);
        }
    }
}
```
The preceding code:

* Creates an option named `--file` of type `System.IO.FileInfo` and adds it to the root command:

```csharp
Option<FileInfo> fileOption = new("--file")
{
    Description = "The file to read and display on the console"
};

RootCommand rootCommand = new("Sample app for System.CommandLine");
rootCommand.Options.Add(fileOption);
```
* Parses `args` and checks whether any value was provided for the `--file` option. If so, it calls the `ReadFile` method using the parsed value and returns exit code `0`:

```csharp
ParseResult parseResult = rootCommand.Parse(args);
if (parseResult.Errors.Count == 0 && parseResult.GetValue(fileOption) is FileInfo parsedFile)
{
    ReadFile(parsedFile);
    return 0;
}
```
* If no value was provided for `--file`, it prints available parse errors and returns exit code `1`:

```csharp
foreach (ParseError parseError in parseResult.Errors)
{
    Console.Error.WriteLine(parseError.Message);
}
return 1;
```
* The `ReadFile` method reads the specified file and displays its contents on the console:

```csharp
static void ReadFile(FileInfo file)
{
    foreach (string line in File.ReadLines(file.FullName))
    {
        Console.WriteLine(line);
    }
}
```
## Test the app

You can use any of the following ways to test while developing a command-line app:

* Run the `dotnet build` command, and then open a command prompt in the build output folder to run the executable:

  ```console
  dotnet build
  cd bin/Debug/net9.0
  scl --file scl.runtimeconfig.json
  ```

* Use `dotnet run` and pass option values to the app instead of to the `run` command by including them after `--`, as in the following example:

  ```dotnetcli
  dotnet run -- --file bin/Debug/net9.0/scl.runtimeconfig.json
  ```

(This tutorial assumes you're using the first of these options.)

When you run the app, it displays the contents of the file specified by the `--file` option.

```output
{
  "runtimeOptions": {
    "tfm": "net9.0",
    "framework": {
      "name": "Microsoft.NETCore.App",
      "version": "9.0.0"
    }
  }
}
```

But if you ask it to display the help by providing `--help`, nothing gets printed to the console. That's because the app doesn't yet handle the scenario where `--file` isn't provided and there are no parse errors.

## Parse the arguments and invoke the ParseResult

System.CommandLine allows you to specify an action that's invoked when a given symbol (command, directive, or option) is parsed successfully. The action is a delegate that takes a `System.CommandLine.ParseResult` parameter and returns an `int` exit code. (Async actions are also available). The exit code is returned by the `System.CommandLine.ParseResult.Invoke(System.CommandLine.InvocationConfiguration)` method and can be used to indicate whether the command was executed successfully or not.

Replace the contents of *Program.cs* with the following code:

```csharp
using System.CommandLine;

namespace scl;

class Program
{
    static int Main(string[] args)
    {
        Option<FileInfo> fileOption = new("--file")
        {
            Description = "The file to read and display on the console"
        };

        RootCommand rootCommand = new("Sample app for System.CommandLine");
        rootCommand.Options.Add(fileOption);

        rootCommand.SetAction(parseResult =>
        {
            FileInfo parsedFile = parseResult.GetValue(fileOption);
            ReadFile(parsedFile);
            return 0;
        });

        ParseResult parseResult = rootCommand.Parse(args);
        return parseResult.Invoke();
    }

    static void ReadFile(FileInfo file)
    {
        foreach (string line in File.ReadLines(file.FullName))
        {
            Console.WriteLine(line);
        }
    }
}
```
The preceding code:

* Specifies that `ReadFile` is the method that will be called when the root command is **invoked**:

```csharp
rootCommand.SetAction(parseResult =>
{
    FileInfo parsedFile = parseResult.GetValue(fileOption);
    ReadFile(parsedFile);
    return 0;
});
```
* Parses `args` and **invokes** the result:

```csharp
ParseResult parseResult = rootCommand.Parse(args);
return parseResult.Invoke();
```
When you run the app, it displays the contents of the file specified by the `--file` option.

If you ask it to display the help by specifying `scl --help`, the following output gets printed:

```output
Description:
  Sample app for System.CommandLine

Usage:
  scl [options]

Options:
  -?, -h, --help  Show help and usage information
  --version       Show version information
  --file          The file to read and display on the console
```

`System.CommandLine.RootCommand` by default provides Help option, Version option, and Suggest directive. The `System.CommandLine.ParseResult.Invoke(System.CommandLine.InvocationConfiguration)` method is responsible for invoking the action of the parsed symbol. It could be the action explicitly defined for the command or the help action defined by `System.CommandLine` for `System.CommandLine.Help.HelpOption`.

Moreover, when the `Invoke` method detects any parse errors, it prints them to the standard error, prints help to standard output, and returns `1` as the exit code:

```console
scl --invalid bla
```

```output
Unrecognized command or argument '--invalid'.
Unrecognized command or argument 'bla'.
```
