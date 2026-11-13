---
title: "How to customize help in System.CommandLine"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/how-to-customize-help.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Customize help output

Command-line apps typically provide an option to display a brief description of the available commands, options, and arguments. `System.CommandLine` provides `System.CommandLine.Help.HelpOption`, which is included in the RootCommand options by default. `HelpOption` generates help output for defined symbols by using the information exposed by `System.CommandLine.Symbol.Name`, `System.CommandLine.Option.HelpName`, `System.CommandLine.Symbol.Description`, and other properties like default value or completion sources.

```csharp
Option<FileInfo> fileOption = new("--file")
{
    Description = "The file to print out",
};
Option<bool> lightModeOption = new("--light-mode")
{
    Description = "Determines whether the background color will be black or white"
};
Option<ConsoleColor> foregroundColorOption = new("--color")
{
    Description = "Specifies the foreground color of console output",
    DefaultValueFactory = _ => ConsoleColor.White
};

RootCommand rootCommand = new("Read a file")
{
    fileOption,
    lightModeOption,
    foregroundColorOption
};
rootCommand.Parse("-h").Invoke();
```
```dotnetcli
Description:
  Read a file

Usage:
  scl [options]

Options:
  -?, -h, --help                                            Show help and usage information
  --version                                                 Show version information
  --file                                                    The file to print out.
  --light-mode                                              Determines whether the background color will be black
                                                            or white
  --color                                                   Specifies the foreground color of console output
  <Black|Blue|Cyan|DarkBlue|DarkCyan|DarkGray|DarkGreen|Da  [default: White]
  rkMagenta|DarkRed|DarkYellow|Gray|Green|Magenta|Red|Whit
  e|Yellow>
```

App users might be accustomed to different ways to request help on different platforms, so apps built on `System.CommandLine` respond to many ways of requesting help. The following commands are all equivalent:

```dotnetcli
dotnet --help
dotnet -h
dotnet /h
dotnet -?
dotnet /?
```

Help output doesn't necessarily show all available commands, arguments, and options. Some of them might be *hidden* via the `System.CommandLine.Symbol.Hidden` property, which means they don't show up in help output (and completions) but can be specified on the command line.

## Help customization

You can customize help output for commands by defining specific help text for each symbol, providing further clarity to users regarding their usage.

To customize the name of an option's argument, use the option's `System.CommandLine.Option.HelpName` property.

In the sample app, `--light-mode` is explained adequately, but changes to the `--file` and `--color` option descriptions will be helpful. For `--file`, the argument can be identified as a `<FILEPATH>`. For the `--color` option, you can shorten the list of available colors.

To make these changes, extend the previous code with the following code:

```csharp
fileOption.HelpName = "FILEPATH";
foregroundColorOption.AcceptOnlyFromAmong(
    ConsoleColor.Black.ToString(),
    ConsoleColor.White.ToString(),
    ConsoleColor.Red.ToString(),
    ConsoleColor.Yellow.ToString()
);
```
The app now produces the following help output:

```output
Description:
  Read a file

Usage:
  scl [options]

Options:
  -?, -h, --help                    Show help and usage information
  --version                         Show version information
  --file <FILEPATH>                 The file to print out.
  --light-mode                      Determines whether the background color will be black or white
  --color <Black|Red|White|Yellow>  Specifies the foreground color of console output [default: White]
```

## Add sections to help output

You can add first or last sections to the help output. For example, suppose you want to add some ASCII art to the description section by using the Spectre.Console NuGet package.

Define a custom action that performs some extra logic before and after calling the default `HelpAction`:

```csharp
internal class CustomHelpAction : SynchronousCommandLineAction
{
    private readonly HelpAction _defaultHelp;

    public CustomHelpAction(HelpAction action) => _defaultHelp = action;

    public override int Invoke(ParseResult parseResult)
    {
        Spectre.Console.AnsiConsole.Write(new FigletText(parseResult.RootCommandResult.Command.Description!));

        int result = _defaultHelp.Invoke(parseResult);

        Spectre.Console.AnsiConsole.WriteLine("Sample usage: --file input.txt");

        return result;

    }
}
```
Update the `HelpAction` defined by `RootCommand` to use the custom action:

```csharp
for (int i = 0; i < rootCommand.Options.Count; i++)
{
    // RootCommand has a default HelpOption; update its Action.
    if (rootCommand.Options[i] is HelpOption defaultHelpOption)
    {
        defaultHelpOption.Action = new CustomHelpAction((HelpAction)defaultHelpOption.Action!);
        break;
    }
}
```
The help output now looks like this:

```output
  ____                       _                __   _   _
 |  _ \    ___    __ _    __| |     __ _     / _| (_) | |   ___
 | |_) |  / _ \  / _` |  / _` |    / _` |   | |_  | | | |  / _ \
 |  _ <  |  __/ | (_| | | (_| |   | (_| |   |  _| | | | | |  __/
 |_| \_\  \___|  \__,_|  \__,_|    \__,_|   |_|   |_| |_|  \___|

Description:
  Read a file

Usage:
  scl [options]

Options:
  -?, -h, --help                    Show help and usage information
  --version                         Show version information
  --file <FILEPATH>                 The file to print out.
  --light-mode                      Determines whether the background color will be black or white
  --color <Black|Red|White|Yellow>  Specifies the foreground color of console output [default: White]

Sample usage: --file input.txt
```

## See also

System.CommandLine overview
