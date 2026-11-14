---
title: "Build file-based apps (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/tutorials/file-based-programs.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Build file-based apps (part 2 of 2)

## Test the final application

Test the application by running several different commands. If you have trouble, here's the finished sample to compare with what you built:

```csharp
#!/usr/bin/env dotnet

#:package user@example.com
#:package user@example.com

using System.CommandLine;
using System.CommandLine.Parsing;

Option<int> delayOption = new("--delay")
{
    Description = "Delay between lines, specified as milliseconds.",
    DefaultValueFactory = parseResult => 100
};

Argument<string[]> messagesArgument = new("Messages")
{
    Description = "Text to render."
};

RootCommand rootCommand = new("Ascii Art file-based app sample");

rootCommand.Options.Add(delayOption);
rootCommand.Arguments.Add(messagesArgument);

ParseResult result = rootCommand.Parse(args);
foreach (ParseError parseError in result.Errors)
{
    Console.Error.WriteLine(parseError.Message);
}
if (result.Errors.Count > 0)
{
    return 1;
}

var parsedArgs = await ProcessParseResults(result);

await WriteAsciiArt(parsedArgs);
return 0;

async Task<AsciiMessageOptions> ProcessParseResults(ParseResult result)
{
    int delay = result.GetValue(delayOption);
    List<string> messages = [.. result.GetValue(messagesArgument) ?? Array.Empty<string>()];

    if (messages.Count == 0)
    {
        while (Console.ReadLine() is string line && line.Length > 0)
        {
            Colorful.Console.WriteAscii(line);
            await Task.Delay(delay);
        }
    }
    return new([.. messages], delay);
}

async Task WriteAsciiArt(AsciiMessageOptions options)
{
    foreach (string message in options.Messages)
    {
        Colorful.Console.WriteAscii(message);
        await Task.Delay(options.Delay);
    }
}

public record AsciiMessageOptions(string[] Messages, int Delay);
```
In this tutorial, you learned to build a file-based app, where you build the program in a single C# file. These programs don't use a project file, and can use the `#!` directive on Unix systems. Learners can create these programs after trying our online tutorials and before building larger project-based apps. File-based apps are also a great platform for command line utilities.

## Related content

- File-based apps reference
- Top level statement
- Preprocessor directives
- What's new in C# 14
