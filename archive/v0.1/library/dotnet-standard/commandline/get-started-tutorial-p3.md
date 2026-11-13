---
title: "Tutorial: Get started with System.CommandLine (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/get-started-tutorial.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Get started with System.CommandLine (part 3 of 3)

## Add subcommands and custom validation

This section creates the final version of the app. When finished, the app will have the following commands and options:

| Command      | Options                                    | Arguments            |
|--------------|--------------------------------------------|----------------------|
| Root command | `--file` (*recursive*)                     |                      |
| `quotes`     |                                            |                      |
| `read`       | `--delay`, `--fgcolor`, `--light-mode`     |                      |
| `add`        |                                            | `quote` and `byline` |
| `delete`     | `--search-terms`                           |                      |

(A *recursive* option is available to the command it's assigned to and recursively to all its subcommands.)

Here's sample command-line input that invokes each of the available commands with its options and arguments:

```console
scl quotes read --file sampleQuotes.txt --delay 40 --fgcolor red --light-mode
scl quotes add "Hello world!" "Nancy Davolio"
scl quotes delete --search-terms David "You can do" Antoine "Perfection is achieved"
```

1. In *Program.cs*, replace the code that creates the `--file` option with the following code:

```csharp
Option<FileInfo> fileOption = new("--file")
{
    Description = "An option whose argument is parsed as a FileInfo",
    DefaultValueFactory = _ => new FileInfo("sampleQuotes.txt"),
    CustomParser = result =>
    {
        var file = new FileInfo(result.Tokens.Single().Value);
        if (!file.Exists)
        {
            result.AddError("File does not exist");
        }
        return file;
    }
};
```
   This code uses two separate mechanisms:

   * `System.CommandLine.Option`1.DefaultValueFactory` supplies `sampleQuotes.txt` as the default when you don't provide `--file`. `DefaultValueFactory` doesn't run when you do provide `--file`.
   * `System.CommandLine.Option`1.CustomParser` runs when you explicitly provide `--file`. It converts the token to a `FileInfo` and validates that the file exists. Without validation, a missing file would cause an unhandled `FileNotFoundException` with a stack trace. With validation, just the specified error message is displayed.

1. After the code that creates `lightModeOption`, add options and arguments for the `add` and `delete` commands:

```csharp
Option<string[]> searchTermsOption = new("--search-terms")
{
    Description = "Strings to search for when deleting entries",
    Required = true,
    AllowMultipleArgumentsPerToken = true
};
Argument<string> quoteArgument = new("quote")
{
    Description = "Text of quote."
};
Argument<string> bylineArgument = new("byline")
{
    Description = "Byline of quote."
};
```
   The `System.CommandLine.Option.AllowMultipleArgumentsPerToken` setting lets you omit the `--search-terms` option name when specifying elements in the list after the first one. It makes the following examples of command-line input equivalent:

   ```console
   scl quotes delete --search-terms David "You can do"
   scl quotes delete --search-terms David --search-terms "You can do"
   ```

1. Replace the code that creates the root command and the `read` command with the following code:

```csharp
RootCommand rootCommand = new("Sample app for System.CommandLine");
fileOption.Recursive = true;
rootCommand.Options.Add(fileOption);

Command quotesCommand = new("quotes", "Work with a file that contains quotes.");
rootCommand.Subcommands.Add(quotesCommand);

Command readCommand = new("read", "Read and display the file.")
{
    delayOption,
    fgcolorOption,
    lightModeOption
};
quotesCommand.Subcommands.Add(readCommand);

Command deleteCommand = new("delete", "Delete lines from the file.");
deleteCommand.Options.Add(searchTermsOption);
quotesCommand.Subcommands.Add(deleteCommand);

Command addCommand = new("add", "Add an entry to the file.");
addCommand.Arguments.Add(quoteArgument);
addCommand.Arguments.Add(bylineArgument);
addCommand.Aliases.Add("insert");
quotesCommand.Subcommands.Add(addCommand);
```
   This code makes the following changes:

   * Removes the `--file` option from the `read` command.
   * Adds the `--file` option as a recursive option to the root command.

   * Creates a `quotes` command and adds it to the root command.
   * Adds the `read` command to the `quotes` command instead of to the root command.
   * Creates `add` and `delete` commands and adds them to the `quotes` command.

   The result is the following command hierarchy:

   Root command
     └──`quotes`
           └──`read`
           └──`add`
           └──`delete`

   The app now implements the recommended pattern where the parent command (`quotes`) specifies an area or group, and its children commands (`read`, `add`, `delete`) are actions.

   Recursive options are applied to the command and recursively to subcommands. Since `--file` is on the root command, it will be available automatically in all subcommands of the app.

1. After the `SetAction` code, add new `SetAction` code for the new subcommands:

```csharp
deleteCommand.SetAction(parseResult => DeleteFromFile(
    parseResult.GetValue(fileOption),
    parseResult.GetValue(searchTermsOption)));

addCommand.SetAction(parseResult => AddToFile(
    parseResult.GetValue(fileOption),
    parseResult.GetValue(quoteArgument),
    parseResult.GetValue(bylineArgument))
    );
```
   Subcommand `quotes` doesn't have an action because it isn't a leaf command. Subcommands `read`, `add`, and `delete` are leaf commands under `quotes`, and `SetAction` is called for each of them.

1. Add the actions for `add` and `delete`.

```csharp
internal static void DeleteFromFile(FileInfo file, string[] searchTerms)
{
    Console.WriteLine("Deleting from file");

    var lines = File.ReadLines(file.FullName).Where(line => searchTerms.All(s => !line.Contains(s))).ToList();
    File.WriteAllLines(file.FullName, lines);
}
internal static void AddToFile(FileInfo file, string quote, string byline)
{
    Console.WriteLine("Adding to file");

    using StreamWriter writer = file.AppendText();
    writer.WriteLine($"{Environment.NewLine}{Environment.NewLine}{quote}");
    writer.WriteLine($"{Environment.NewLine}-{byline}");
}
```
The finished app looks like this:

```csharp
using System.CommandLine;

namespace scl;

class Program
{
    static int Main(string[] args)
    {
        Option<FileInfo> fileOption = new("--file")
        {
            Description = "An option whose argument is parsed as a FileInfo",
            DefaultValueFactory = _ => new FileInfo("sampleQuotes.txt"),
            CustomParser = result =>
            {
                var file = new FileInfo(result.Tokens.Single().Value);
                if (!file.Exists)
                {
                    result.AddError("File does not exist");
                }
                return file;
            }
        };

        Option<int> delayOption = new("--delay")
        {
            Description = "Delay between lines, specified as milliseconds per character in a line",
            DefaultValueFactory = parseResult => 42
        };
        Option<ConsoleColor> fgcolorOption = new("--fgcolor")
        {
            Description = "Foreground color of text displayed on the console",
            DefaultValueFactory = parseResult => ConsoleColor.White
        };
        Option<bool> lightModeOption = new("--light-mode")
        {
            Description = "Background color of text displayed on the console: default is black, light mode is white"
        };

        Option<string[]> searchTermsOption = new("--search-terms")
        {
            Description = "Strings to search for when deleting entries",
            Required = true,
            AllowMultipleArgumentsPerToken = true
        };
        Argument<string> quoteArgument = new("quote")
        {
            Description = "Text of quote."
        };
        Argument<string> bylineArgument = new("byline")
        {
            Description = "Byline of quote."
        };

        RootCommand rootCommand = new("Sample app for System.CommandLine");
        fileOption.Recursive = true;
        rootCommand.Options.Add(fileOption);

        Command quotesCommand = new("quotes", "Work with a file that contains quotes.");
        rootCommand.Subcommands.Add(quotesCommand);

        Command readCommand = new("read", "Read and display the file.")
        {
            delayOption,
            fgcolorOption,
            lightModeOption
        };
        quotesCommand.Subcommands.Add(readCommand);

        Command deleteCommand = new("delete", "Delete lines from the file.");
        deleteCommand.Options.Add(searchTermsOption);
        quotesCommand.Subcommands.Add(deleteCommand);

        Command addCommand = new("add", "Add an entry to the file.");
        addCommand.Arguments.Add(quoteArgument);
        addCommand.Arguments.Add(bylineArgument);
        addCommand.Aliases.Add("insert");
        quotesCommand.Subcommands.Add(addCommand);

        readCommand.SetAction(parseResult => ReadFile(
            parseResult.GetValue(fileOption),
            parseResult.GetValue(delayOption),
            parseResult.GetValue(fgcolorOption),
            parseResult.GetValue(lightModeOption)));

        deleteCommand.SetAction(parseResult => DeleteFromFile(
            parseResult.GetValue(fileOption),
            parseResult.GetValue(searchTermsOption)));

        addCommand.SetAction(parseResult => AddToFile(
            parseResult.GetValue(fileOption),
            parseResult.GetValue(quoteArgument),
            parseResult.GetValue(bylineArgument))
            );

        return rootCommand.Parse(args).Invoke();
    }

    internal static void ReadFile(FileInfo file, int delay, ConsoleColor fgColor, bool lightMode)
    {
        Console.BackgroundColor = lightMode ? ConsoleColor.White : ConsoleColor.Black;
        Console.ForegroundColor = fgColor;
        foreach (string line in File.ReadLines(file.FullName))
        {
            Console.WriteLine(line);
            Thread.Sleep(TimeSpan.FromMilliseconds(delay * line.Length));
        }
    }
    internal static void DeleteFromFile(FileInfo file, string[] searchTerms)
    {
        Console.WriteLine("Deleting from file");

        var lines = File.ReadLines(file.FullName).Where(line => searchTerms.All(s => !line.Contains(s))).ToList();
        File.WriteAllLines(file.FullName, lines);
    }
    internal static void AddToFile(FileInfo file, string quote, string byline)
    {
        Console.WriteLine("Adding to file");

        using StreamWriter writer = file.AppendText();
        writer.WriteLine($"{Environment.NewLine}{Environment.NewLine}{quote}");
        writer.WriteLine($"{Environment.NewLine}-{byline}");
    }
}
```
Build the project, and then try the following commands.

Submit a nonexistent file to `--file` with the `read` command, and you get an error message instead of an exception and stack trace:

```console
scl quotes read --file nofile
```

```output
File does not exist
```

If you try to run subcommand `quotes`, you get a message directing you to use `read`, `add`, or `delete`:

```console
scl quotes
```

```output
Required command was not provided.

Description:
  Work with a file that contains quotes.

Usage:
  scl quotes [command] [options]

Options:
  --file <file>   An option whose argument is parsed as a FileInfo [default: sampleQuotes.txt]
  -?, -h, --help  Show help and usage information

Commands:
  read                          Read and display the file.
  delete                        Delete lines from the file.
  add, insert <quote> <byline>  Add an entry to the file.
```

Run subcommand `add`, and then look at the end of the text file to see the added text:

```console
scl quotes add "Hello world!" "Nancy Davolio"
```

Run subcommand `delete` with search strings from the beginning of the file, and then look at the beginning of the text file to see where text was removed:

```console
scl quotes delete --search-terms David "You can do" Antoine "Perfection is achieved"
```

> **Note:**
> The file in the output folder reflects the changes from the `add` and `delete` commands. The copy of the file in the project folder remains unchanged.

## Next steps

In this tutorial, you created a simple command-line app that uses `System.CommandLine`. To learn more about the library, see System.CommandLine overview. To enable tab completion capabilities, see Tab completion for System.CommandLine.
