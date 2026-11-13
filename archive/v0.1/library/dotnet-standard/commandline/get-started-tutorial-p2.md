---
title: "Tutorial: Get started with System.CommandLine (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/get-started-tutorial.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Tutorial: Get started with System.CommandLine (part 2 of 3)

## Add a subcommand and options

In this section, you:

* Create more options.
* Create a subcommand.
* Assign the new options to the new subcommand.

The new options let the end user configure the foreground and background text colors and the readout speed. These features will be used to read a collection of quotes that comes from the Teleprompter console app tutorial.

1. Copy the sampleQuotes.txt file from the dotnet samples repository into your project directory.

   (For information on how to download files, see the instructions in Samples and tutorials.)

1. Open the project file and add an `<ItemGroup>` element just before the closing `</Project>` tag:

   ```xml
   <ItemGroup>
     <Content Include="sampleQuotes.txt">
       <CopyToOutputDirectory>Always</CopyToOutputDirectory>
     </Content>
   </ItemGroup>
   ```

   Adding this markup causes the text file to be copied to the output folder when you build the app. So when you run the executable in that folder, you can access the file by name without specifying a folder path.

1. In *Program.cs*, after the code that creates the `--file` option, create options to control the readout speed and text colors:

```csharp
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
```
1. After the line that creates the root command, delete the code that adds the `--file` option to it. You're removing it here because you'll add it to a new subcommand.

1. After the line that creates the root command, create a `read` subcommand. Add the options to this subcommand (by using collection initializer syntax rather than `Options` property), and add the subcommand to the root command.

```csharp
Command readCommand = new("read", "Read and display the file.")
{
    fileOption,
    delayOption,
    fgcolorOption,
    lightModeOption
};
rootCommand.Subcommands.Add(readCommand);
```
1. Replace the `SetAction` code with the following `SetAction` code for the new subcommand:

```csharp
readCommand.SetAction(parseResult => ReadFile(
    parseResult.GetValue(fileOption),
    parseResult.GetValue(delayOption),
    parseResult.GetValue(fgcolorOption),
    parseResult.GetValue(lightModeOption)));
```
   You're no longer calling `SetAction` on the root command because the root command no longer needs an action. When a command has subcommands, you typically have to specify one of the subcommands when invoking a command-line app.

1. Replace the `ReadFile` action method with the following code:

```csharp
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
```
The app now looks like this:

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

        RootCommand rootCommand = new("Sample app for System.CommandLine");

        Command readCommand = new("read", "Read and display the file.")
        {
            fileOption,
            delayOption,
            fgcolorOption,
            lightModeOption
        };
        rootCommand.Subcommands.Add(readCommand);

        readCommand.SetAction(parseResult => ReadFile(
            parseResult.GetValue(fileOption),
            parseResult.GetValue(delayOption),
            parseResult.GetValue(fgcolorOption),
            parseResult.GetValue(lightModeOption)));

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
}
```
### Test the new subcommand

Now if you try to run the app without specifying the subcommand, you get an error message followed by a help message that specifies the subcommand that is available.

```console
scl --file sampleQuotes.txt
```

```output
'--file' was not matched. Did you mean one of the following?
--help

Required command was not provided.
Unrecognized command or argument '--file'.
Unrecognized command or argument 'sampleQuotes.txt'.

Description:
  Sample app for System.CommandLine

Usage:
  scl [command] [options]

Options:
  -?, -h, --help  Show help and usage information
  --version       Show version information

Commands:
  read  Read and display the file.
```

The help text for subcommand `read` shows that four options are available. It shows valid values for the enum.

```console
scl read -h
```

```output
Description:
  Read and display the file.

Usage:
  scl read [options]

Options:
  --file <file>                                               The file to read and display on the console.
  --delay <delay>                                             Delay between lines, specified as milliseconds per
                                                              character in a line. [default: 42]
  --fgcolor                                                   Foreground color of text displayed on the console.
  <Black|Blue|Cyan|DarkBlue|DarkCyan|DarkGray|DarkGreen|Dark  [default: White]
  Magenta|DarkRed|DarkYellow|Gray|Green|Magenta|Red|White|Ye
  llow>
  --light-mode                                                Background color of text displayed on the console:
                                                              default is black, light mode is white.
  -?, -h, --help                                              Show help and usage information
```

Run subcommand `read` specifying only the `--file` option, and you get the default values for the other three options.

```console
scl read --file sampleQuotes.txt
```

The 42 milliseconds per character default delay causes a slow readout speed. You can speed it up by setting `--delay` to a lower number.

```console
scl read --file sampleQuotes.txt --delay 0
```

You can use `--fgcolor` and `--light-mode` to set text colors:

```console
scl read --file sampleQuotes.txt --fgcolor red --light-mode
```

If you provide an invalid value for `--delay`, you get an error message:

```console
scl read --file sampleQuotes.txt --delay forty-two
```

```output
Cannot parse argument 'forty-two' for option '--int' as expected type 'System.Int32'.
```

If you provide an invalid value for `--file`, you get an exception:

```console
scl read --file nofile
```

```output
Unhandled exception: System.IO.FileNotFoundException: Could not find file 'C:\bin\Debug\net9.0\nofile''.
File name: 'C:\bin\Debug\net9.0\nofile''
```
