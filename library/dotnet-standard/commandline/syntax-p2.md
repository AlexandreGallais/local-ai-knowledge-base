---
title: "Command-line syntax overview for System.CommandLine (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/commandline/syntax.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Command-line syntax overview for System.CommandLine (part 2 of 2)

## Aliases

In both POSIX and Windows, it's common for some commands and options to have aliases. These are usually short forms that are easier to type. Aliases can also be used for other purposes, such as to simulate case-insensitivity and to support alternate spellings of a word.

POSIX short forms typically have a single leading hyphen followed by a single character. The following commands are equivalent:

```dotnetcli
dotnet build --verbosity quiet
dotnet build -v quiet
```

The GNU standard recommends automatic aliases. That is, you can enter any part of a long-form command or option name and it will be accepted. This behavior would make the following command lines equivalent:

```dotnetcli
dotnet publish --output ./publish
dotnet publish --outpu ./publish
dotnet publish --outp ./publish
dotnet publish --out ./publish
dotnet publish --ou ./publish
dotnet publish --o ./publish
```

`System.CommandLine` doesn't support automatic aliases. Each alias must be specified explicitly. Both commands and options expose an `Aliases` property. `Option` has a constructor that accepts aliases as parameters, so you can define an option with multiple aliases in a single line:

```csharp
Option<bool> helpOption = new("--help", ["-h", "/h", "-?", "/?"]);
Command command = new("serialize") { helpOption };
command.Aliases.Add("serialise");
```
We recommend that you minimize the number of option aliases that you define, and avoid defining certain aliases in particular. For more information, see Short-form aliases.

## Case sensitivity

Command and option names and aliases are case-sensitive by default according to POSIX convention, and `System.CommandLine` follows this convention. If you want your CLI to be case insensitive, define aliases for the various casing alternatives. For example, `--additional-probing-path` could have aliases `--Additional-Probing-Path` and `--ADDITIONAL-PROBING-PATH`.

In some command-line tools, a difference in casing specifies a difference in function. For example, `git clean -X` behaves differently than `git clean -x`. The .NET CLI is all lowercase.

Case sensitivity does not apply to argument values for options that are based on enums. Enum names are matched regardless of casing.

## The `--` token

POSIX convention interprets the double-dash (`--`) token as an escape mechanism. Everything that follows the double-dash token is interpreted as arguments for the command. This functionality can be used to submit arguments that look like options, since it prevents them from being interpreted as options.

Suppose *myapp* takes a `message` argument, and you want the value of `message` to be `--interactive`. The following command line might give unexpected results.

```console
myapp --interactive
```

If `myapp` doesn't have an `--interactive` option, the `--interactive` token is interpreted as an argument. But if the app does have an `--interactive` option, this input will be interpreted as referring to that option.

The following command line uses the double-dash token to set the value of the `message` argument to "--interactive":

```console
myapp -- --interactive
      ^^
```

`System.CommandLine` supports this double-dash functionality.

## Option-argument delimiters

`System.CommandLine` lets you use a space, '=', or ':' as the delimiter between an option name and its argument. For example, the following commands are equivalent:

```dotnetcli
dotnet build -v quiet
dotnet build -v=quiet
dotnet build -v:quiet
```

A POSIX convention lets you omit the delimiter when you are specifying a single-character option alias. For example, the following commands are equivalent:

```console
myapp -vquiet
myapp -v quiet
```

System.CommandLine supports this syntax by default.

## Argument arity

The *arity* of an option or command's argument is the number of values that can be passed if that option or command is specified.

Arity is expressed with a minimum value and a maximum value, as the following table illustrates:

| Min | Max     | Example validity | Example                     |
|-----|---------|------------------|-----------------------------|
| 0   | 0       | Valid:           | --file                      |
|     |         | Invalid:         | --file a.json               |
|     |         | Invalid:         | --file a.json --file b.json |
| 0   | 1       | Valid:           | --flag                      |
|     |         | Valid:           | --flag true                 |
|     |         | Valid:           | --flag false                |
|     |         | Invalid:         | --flag false --flag false   |
| 1   | 1       | Valid:           | --file a.json               |
|     |         | Invalid:         | --file                      |
|     |         | Invalid:         | --file a.json --file b.json |
| 0   | *n*     | Valid:           | --file                      |
|     |         | Valid:           | --file a.json               |
|     |         | Valid:           | --file a.json --file b.json |
| 1   | *n*     | Valid:           | --file a.json               |
|     |         | Valid:           | --file a.json b.json        |
|     |         | Invalid:         | --file                      |

`System.CommandLine` has an `System.CommandLine.ArgumentArity` struct for defining arity, with the following values:

* `System.CommandLine.ArgumentArity.Zero` - No values allowed.
* `System.CommandLine.ArgumentArity.ZeroOrOne` - Can have one value or no value.
* `System.CommandLine.ArgumentArity.ExactlyOne` - Must have one value.
* `System.CommandLine.ArgumentArity.ZeroOrMore` - Can have one value, multiple values, or no values.
* `System.CommandLine.ArgumentArity.OneOrMore` - Can have multiple values; must have at least one value.

You can explicitly set arity by using the `Arity` property, but in most cases that isn't necessary. `System.CommandLine` automatically determines the argument arity based on the argument type:

| Argument type    | Default arity              |
|------------------|----------------------------|
| `Boolean`        | `ArgumentArity.ZeroOrOne`  |
| Collection types | `ArgumentArity.ZeroOrMore` |
| Everything else  | `ArgumentArity.ExactlyOne` |

### Option overrides

If the arity maximum is 1, `System.CommandLine` can still be configured to accept multiple instances of an option. In that case, the last instance of a repeated option overwrites any earlier instances. In the following example, the value 2 would be passed to the `myapp` command.

```console
myapp --delay 3 --message example --delay 2
```

### Multiple arguments

By default, when you call a command, you can repeat an option name to specify multiple arguments for an option that has maximum arity greater than one.

```console
myapp --items one --items two --items three
```

To allow multiple arguments without repeating the option name, set `System.CommandLine.Option.AllowMultipleArgumentsPerToken` to `true`. This setting lets you enter the following command line.

```console
myapp --items one two three
```

The same setting has a different effect if maximum argument arity is 1. It allows you to repeat an option but takes only the last value on the line. In the following example, the value `three` would be passed to the app.

```console
myapp --item one --item two --item three
```

## Option bundling

POSIX recommends that you support *bundling* of single-character options, also known as *stacking*. Bundled options are single-character option aliases specified together after a single hyphen prefix. Only the last option can specify an argument. For example, the following command lines are equivalent:

```console
git clean -f -d -x
git clean -fdx
```

If an argument is provided after an option bundle, it applies to the last option in the bundle. The following command lines are equivalent:

```console
myapp -a -b -c arg
myapp -abc arg
```

In both variants in this example, the argument `arg` would apply only to the option `-c`.

## Boolean options (flags)

If `true` or `false` is passed for an option having a `bool` argument, it's parsed as expected. But an option whose argument type is `bool` typically doesn't require an argument to be specified. Boolean options, sometimes called "flags", typically have an arity of `System.CommandLine.ArgumentArity.ZeroOrOne`. The presence of the option name on the command line, with no argument following it, results in a default value of `true`. The absence of the option name in command-line input results in a value of `false`. If the `myapp` command prints out the value of a Boolean option named `--interactive`, the following input creates the following output:

```console
myapp
myapp --interactive
myapp --interactive false
myapp --interactive true
```

```output
False
True
False
True
```

## Version option

Apps built on `System.CommandLine` automatically provide the version number in response to the `--version` option used with the root command. For example:

```dotnetcli
dotnet --version
```

```output
6.0.100
```

## Response files

A *response file* is a file that contains a set of tokens for a command-line app. Response files are a feature of `System.CommandLine` that is useful in two scenarios:

* To invoke a command-line app by specifying input that is longer than the character limit of the terminal.
* To invoke the same command repeatedly without retyping the whole line.

To use a response file, enter the file name prefixed by an `@` sign wherever in the line you want to insert commands, options, and arguments. The *.rsp* file extension is a common convention, but you can use any file extension.

The following lines are equivalent:

```dotnetcli
dotnet build --no-restore --output ./build-output/
dotnet @sample1.rsp
dotnet build @sample2.rsp --output ./build-output/
```

Contents of *sample1.rsp*:

```console
build
--no-restore
--output
./build-output/
```

Contents of *sample2.rsp*:

```console
--no-restore
```

Here are syntax rules that determine how the text in a response file is interpreted:

* Tokens are delimited by spaces. A line that contains *Good morning!* is treated as two tokens, *Good* and *morning!*.
* Multiple tokens enclosed in quotes are interpreted as a single token. A line that contains *"Good morning!"* is treated as one token, *Good morning!*.
* Any text between a `#` symbol and the end of the line is treated as a comment and ignored.
* Tokens prefixed with `@` can reference additional response files.
* The response file can have multiple lines of text. The lines are concatenated and interpreted as a sequence of tokens.

## Directives

`System.CommandLine` introduces a syntactic element called a *directive* represented by the `System.CommandLine.Directive` type. For example, the `[diagram]` directive is a built-in directive. When you include `[diagram]` after the app's name, `System.CommandLine` displays a diagram of the parse result instead of invoking the command-line app:

```dotnetcli
dotnet [diagram] build --no-restore --output ./build-output/
       ^-----^
```

```output
[ dotnet [ build [ --no-restore <True> ] [ --output <./build-output/> ] ] ]
```

The purpose of directives is to provide cross-cutting functionality that can apply across command-line apps. Because directives are syntactically distinct from the app's own syntax, they can provide functionality that applies across apps.

A directive must conform to the following syntax rules:

* It's a token on the command line that comes after the app's name but before any subcommands or options.
* It's enclosed in square brackets.
* It doesn't contain spaces.

An unrecognized directive is ignored without causing a parsing error.

A directive can include an argument, separated from the directive name by a colon.

 The following directives are built in:

* `[diagram]`
* `[suggest]`

### The `[diagram]` directive

Both users and developers might find it useful to see how an app will interpret a given input. One of the default features of a `System.CommandLine` app is the `[diagram]` directive, which lets you preview the result of parsing command input. For example:

```console
myapp [diagram] --delay not-an-int --interactive --file filename.txt extra
```

```output
![ myapp [ --delay !<not-an-int> ] [ --interactive <True> ] [ --file <filename.txt> ] *[ --fgcolor <White> ] ]   ???--> extra
```

In the preceding example:

* The command (`myapp`), its child options, and the arguments to those options are grouped using square brackets.
* For the option result `[ --delay !<not-an-int> ]`, the `!` indicates a parsing error. The value `not-an-int` for an `int` option can't be parsed to the expected type. The error is also flagged by `!` in front of the command that contains the errored option: `![ myapp...`.
* For the option result `*[ --fgcolor <White> ]`, the option wasn't specified on the command line, so the configured default was used. `White` is the effective value for this option. The asterisk indicates that the value is the default.
* `???-->` points to input that wasn't matched to any of the app's commands or options.

### Suggest directive

The `[suggest]` directive lets you search for commands when you don't know the exact command.

```dotnetcli
dotnet [suggest] buil
```

```output
build
build-server
msbuild
```

## See also

* Design guidance
* Open-source CLI design guidance
* GNU standards
* System.CommandLine overview
* Tutorial: Get started with System.CommandLine
