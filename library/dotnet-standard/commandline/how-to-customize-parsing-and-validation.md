---
title: "How to customize parsing and validation in System.CommandLine"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/how-to-customize-parsing-and-validation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to customize parsing and validation in System.CommandLine

By default, System.CommandLine provides a set of built-in parsers that can parse many common types:

* `bool`
* `byte` and `sbyte`
* `short` and `ushort`
* `int` and `uint`
* `long` and `ulong`
* `float` and `double`
* `decimal`
* `DateTime` and `DateTimeOffset`
* `DateOnly`and `TimeOnly`
* `Guid`
* `System.IO.FileSystemInfo`, `System.IO.FileInfo`, and `System.IO.DirectoryInfo`
* enums
* **arrays and lists** of the listed types

Other types are not supported, but you can create custom parsers for them. You can also validate the parsed values, which is useful when you want to ensure that the input meets certain criteria.

## Validators

Every option, argument, and command can have one or more validators. Validators are used to ensure that the parsed value meets certain criteria. For example, you can validate that a number is positive, or that a string is not empty. You can also create complex validators that check against multiple conditions.

Every symbol type in System.CommandLine has a `System.CommandLine.Option.Validators` property that contains a list of validators. The validators are executed after the input is parsed, and they can report an error if the validation fails.

To provide custom validation code, call `System.CommandLine.Option.Validators.Add` on your option or argument (or command), as shown in the following example:

```csharp
        Option<int> delayOption = new("--delay");
        delayOption.Validators.Add(result =>
        {
            if (result.GetValue(delayOption) < 1)
            {
                result.AddError("Must be greater than 0");
            }
        });

        RootCommand rootCommand = new() { delayOption };
        rootCommand.SetAction((parseResult) =>
        {
            Console.WriteLine($"--delay = {parseResult.GetValue(delayOption)}");
        });

        rootCommand.Parse(args).Invoke();
    }
}
```
System.CommandLine provides a set of built-in validators that can be used to validate common types:

* `AcceptExistingOnly` - configures given option or argument to accept only values corresponding to an existing file or directory.
* `AcceptLegalFileNamesOnly` - configures given option or argument to accept only values representing legal file names.
* `AcceptOnlyFromAmong` - configures given option or argument to accept only values from a specified set of values.

## Custom parsers

To parse types with no default parser, such as complex types, you need a custom parser. Custom parsers can also be used to parse supported types in a different way than the built-in parsers.

Suppose you have a `Person` type:

```csharp
public class Person
{
    public string? FirstName { get; set; }
    public string? LastName { get; set; }
}
```
You can read the values and create an instance of `Person` in the command action:

```csharp
rootCommand.SetAction(parseResult =>
{
    Person person = new()
    {
        FirstName = parseResult.GetValue(firstNameOption),
        LastName = parseResult.GetValue(lastNameOption)
    };
    DoRootCommand(parseResult.GetValue(fileOption), person);
});
```
With a custom parser, you can get a custom type the same way you get primitive values:

```csharp
Option<Person?> personOption = new("--person")
{
    Description = "An option whose argument is parsed as a Person",
    CustomParser = result =>
    {
        if (result.Tokens.Count != 2)
        {
            result.AddError("--person requires two arguments");
            return null;
        }
        return new Person
        {
            FirstName = result.Tokens.First().Value,
            LastName = result.Tokens.Last().Value
        };
    }
};
```
If you want to parse as well as validate the input, use the `CustomParser` delegate, as shown in the following example:

```csharp
        Option<int> delayOption = new("--delay")
        {
            Description = "An option whose argument is parsed as an int",
            CustomParser = result =>
            {
                if (!result.Tokens.Any())
                {
                    return 42;
                }

                if (int.TryParse(result.Tokens.Single().Value, out var delay))
                {
                    if (delay < 1)
                    {
                        result.AddError("Must be greater than 0");
                    }
                    return delay;
                }
                else
                {
                    result.AddError("Not an int.");
                    return 0; // Ignored.
                }
            }
        };

        Option<Person?> personOption = new("--person")
        {
            Description = "An option whose argument is parsed as a Person",
            CustomParser = result =>
            {
                if (result.Tokens.Count != 2)
                {
                    result.AddError("--person requires two arguments");
                    return null;
                }
                return new Person
                {
                    FirstName = result.Tokens.First().Value,
                    LastName = result.Tokens.Last().Value
                };
            }
        };

        RootCommand rootCommand = new() { delayOption, personOption };

        rootCommand.SetAction((parseResult) =>
        {
            Console.WriteLine($"Delay = {parseResult.GetValue(delayOption)}");
            Person? person = parseResult.GetValue(personOption);
            Console.WriteLine($"Person = {person?.FirstName} {person?.LastName}");
        });

        rootCommand.Parse(args).Invoke();
    }

    public class Person
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
```
Here are some examples of what you can do with `CustomParser` that you can't do with a validator:

* Parse other kinds of input strings (for example, parse "1,2,3" into `int[]`).
* Dynamic arity. For example, if you have two arguments that are defined as string arrays, and you have to handle a sequence of strings in the command-line input, the `System.CommandLine.Parsing.ArgumentResult.OnlyTake` method enables you to dynamically divide up the input strings between the arguments.

## See also

* How to parse and invoke the result
* System.CommandLine overview
