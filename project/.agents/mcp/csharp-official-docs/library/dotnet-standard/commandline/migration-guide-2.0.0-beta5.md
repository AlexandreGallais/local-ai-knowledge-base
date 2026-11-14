---
title: "System.CommandLine migration guide to 2.0.0-beta5+ (part 1 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/commandline/migration-guide-2.0.0-beta5.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# System.CommandLine 2.0.0-beta5+ migration guide

The main focus for the 2.0.0-beta5 release was to improve the APIs and take a step toward releasing a stable version of System.CommandLine. The APIs have been simplified and made more coherent and consistent with the Framework design guidelines. This article describes the breaking changes that were made in 2.0.0-beta5 and 2.0.0-beta7, and the reasoning behind them.

## Renaming

In 2.0.0-beta4, not all types and members followed the naming guidelines. Some weren't consistent with the naming conventions, such as using the `Is` prefix for Boolean properties. In 2.0.0-beta5, some types and members have been renamed. The following table shows the old and new names:

| Old name                                               | New name                                                       |
|--------------------------------------------------------|----------------------------------------------------------------|
| `System.CommandLine.Parsing.Parser`                    | `System.CommandLine.Parsing.CommandLineParser`            |
| `System.CommandLine.Parsing.OptionResult.IsImplicit`   | `System.CommandLine.Parsing.OptionResult.Implicit`        |
| `System.CommandLine.Option.IsRequired`                 | `System.CommandLine.Option.Required`                      |
| `System.CommandLine.Symbol.IsHidden`                   | `System.CommandLine.Symbol.Hidden`                        |
| `System.CommandLine.Option.ArgumentHelpName`           | `System.CommandLine.Option.HelpName`                      |
| `System.CommandLine.Parsing.OptionResult.Token`        | `System.CommandLine.Parsing.OptionResult.IdentifierToken` |
| `System.CommandLine.Parsing.ParseResult.FindResultFor` | `System.CommandLine.ParseResult.GetResult*`               |
| `System.CommandLine.Parsing.SymbolResult.ErrorMessage` | `System.CommandLine.Parsing.SymbolResult.AddError(System.String)`† |

†To allow multiple errors for the same symbol to be reported, the `ErrorMessage` property was converted to a method and renamed to `AddError`.

## Mutable collections of options and validators

Version 2.0.0-beta4 had numerous `Add` methods that were used to add items to collections, such as arguments, options, subcommands, validators, and completions. Some of these collections were exposed via properties as read-only collections. Because of that, it was impossible to remove items from those collections.

In 2.0.0-beta5, the APIs were changed to expose mutable collections instead of `Add` methods and (sometimes) read-only collections. This allows you to not only add items or enumerate them, but also remove them. The following table shows the old method and new property names:

| Old method name           | New property                     |
|---------------------------|----------------------------------|
| `Command.AddArgument`     | `Command.Arguments.Add`          |
| `Command.AddOption`       | `Command.Options.Add`            |
| `Command.AddCommand`      | `Command.Subcommands.Add`        |
| `Command.AddValidator`    | `Command.Validators.Add`         |
| `Option.AddValidator`     | `Option.Validators.Add`          |
| `Argument.AddValidator`   | `Argument.Validators.Add`        |
| `Command.AddCompletions`  | `Command.CompletionSources.Add`  |
| `Option.AddCompletions`   | `Option.CompletionSources.Add`   |
| `Argument.AddCompletions` | `Argument.CompletionSources.Add` |
| `Command.AddAlias`        | `Command.Aliases.Add`            |
| `Option.AddAlias`         | `Option.Aliases.Add`             |

The `RemoveAlias` and `HasAlias` methods were also removed, as the `Aliases` property is now a mutable collection. You can use the `Remove` method to remove an alias from the collection. Use the `Contains` method to check if an alias exists.

## Names and aliases

Before 2.0.0-beta5, there was no clear separation between the name and aliases of a symbol. When `name` wasn't provided for the `Option<T>` constructor, the symbol reported its name as the longest alias with prefixes like `--`, `-`, or `/` removed. That was confusing.

Moreover, to get the parsed value, you had to store a reference to an option or an argument and then use it to get the value from `ParseResult`.

To promote simplicity and explicitness, the name of a symbol is now a mandatory parameter for every symbol constructor (including `Argument<T>`). The concept of a name and aliases is now separate: aliases are just aliases and don't include the name of the symbol. Of course, they're optional. As a result, the following changes were made:

- `name` is now a mandatory argument for every public constructor of `System.CommandLine.Argument`1`, `System.CommandLine.Option`1`, and `System.CommandLine.Command`. In the case of `Argument<T>`, it isn't used for parsing, but to generate the help. In the case of `Option<T>` and `Command`, it's used to identify the symbol during parsing and also for help and completions.
- The `System.CommandLine.Symbol.Name` property is no longer `virtual`; it's now read-only and returns the name as it was provided when the symbol was created. Because of that, `Symbol.DefaultName` was removed and `System.CommandLine.Symbol.Name` no longer removes the `--`, `-`, or `/` or any other prefix from the longest alias.
- The `Aliases` property exposed by `Option` and `Command` is now a mutable collection. This collection no longer includes the name of the symbol.
- `System.CommandLine.Parsing.IdentifierSymbol` was removed (it was a base type for both `Command` and `Option`).

Having the name always present lets you get the parsed value by name:

```csharp
RootCommand command = new("The description.")
{
    new Option<int>("--number")
};

ParseResult parseResult = command.Parse(args);
int number = parseResult.GetValue<int>("--number");
```

### Creating options with aliases

In the past, `System.CommandLine.Option`1` exposed many constructors, some of which accepted the name. Since the name is now mandatory and aliases will frequently be provided for `Option<T>`, there's only a single constructor. It accepts the name and a `params` array of aliases.

Before 2.0.0-beta5, `Option<T>` had a constructor that took a name and a description. Because of that, the second argument might now be treated as an alias rather than a description. It's the only known breaking change in the API that doesn't cause a compiler error.

Update any code that passed a description to the constructor to use the new constructor that takes a name and aliases, and then set the `Description` property separately. For example:

```csharp
Option<bool> beta4 = new("--help", "An option with aliases.");
beta4b.Aliases.Add("-h");
beta4b.Aliases.Add("/h");

Option<bool> beta5 = new("--help", "-h", "/h")
{
    Description = "An option with aliases."
};
```

## Default values and custom parsing

In 2.0.0-beta4, you could set default values for options and arguments by using the `SetDefaultValue` methods. Those methods accepted an `object` value, which wasn't type safe and could lead to runtime errors if the value wasn't compatible with the option or argument type:

```csharp
Option<int> option = new("--number");
// This is not type safe, as the value is a string, not an int:
option.SetDefaultValue("text");
```

Moreover, some of the `Option` and `Argument` constructors accepted a parse delegate (`parse`) and a Boolean (`isDefault`) indicating whether the delegate was a custom parser or a default value provider, which was confusing.

`Option<T>` and `Argument<T>` classes now have a `System.CommandLine.Option`1.DefaultValueFactory` property that you can use to set a delegate that can be called to get the default value for the option or argument. This delegate is invoked when the option or argument isn't found in the parsed command-line input.

```csharp
Option<int> number = new("--number")
{
    DefaultValueFactory = _ => 42
};
```

`Argument<T>` and `Option<T>` also come with a `System.CommandLine.Option`1.CustomParser` property that you can use to set a custom parser for the symbol:

```csharp
Argument<Uri> uri = new("arg")
{
    CustomParser = result =>
    {
        if (!Uri.TryCreate(result.Tokens.Single().Value, UriKind.RelativeOrAbsolute, out var uriValue))
        {
            result.AddError("Invalid URI format.");
            return null;
        }

        return uriValue;
    }
};
```

Moreover, `CustomParser` accepts a delegate of type `Func<ParseResult,T>`, rather than the previous `ParseArgument` delegate. This and a few other custom delegates were removed to simplify the API and reduce the number of types exposed by the API, which reduces startup time spent during JIT compilation.

For more examples of how to use `DefaultValueFactory` and `CustomParser`, see How to customize parsing and validation in System.CommandLine.
