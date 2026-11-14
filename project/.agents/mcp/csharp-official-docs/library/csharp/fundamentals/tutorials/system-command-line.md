---
title: "Tutorial: Build a command-line app with System.CommandLine (part 1 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/fundamentals/tutorials/system-command-line.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tutorial: Build a command-line app with System.CommandLine

> **Tip:**
> This article is part of the **Fundamentals** section, written for developers who know at least one programming language and are learning C#. If you're new to programming, start with Get started. If you need comprehensive library coverage, see the System.CommandLine library documentation.

The `System.CommandLine` library handles command-line parsing, help-text generation, and input validation so you can focus on your app's logic. In this tutorial, you build a task tracker CLI that demonstrates the core concepts: commands, subcommands, options, and arguments.

In this tutorial, you:

>
> * Create a file-based app by using the `System.CommandLine` package.
> * Define options and arguments with typed values.
> * Build subcommands and attach options and arguments to them.
> * Handle each subcommand with an action.
> * Test the app with different command-line inputs.

## Prerequisites

- Install the .NET 10 SDK or later.

## Create the app

Start by creating a file-based C# program and adding the `System.CommandLine` package.

1. Create a file named `TaskCli.cs` with the following content:

   ```csharp
   #!/usr/bin/env dotnet
   ```

   The `#!` (shebang) line lets you run the file directly on Unix systems. On Windows, run the file with `dotnet run TaskCli.cs`.

1. Add the `System.CommandLine` package directive and the required `using` statements:

```csharp
#:package user@example.com
```
```csharp
using System.CommandLine;
using System.CommandLine.Parsing;
using System.Text.Json;
```
   > **Important:**
   > Version `2.0.0` is the latest version at the time of writing. Check the package's NuGet page for the latest version to ensure you have the latest security fixes.

## Understand the command structure

Before writing any parsing code, consider what the CLI looks like from the user's perspective. The task tracker supports four operations:

```console
dotnet TaskCli.cs -- add "Write documentation" --priority High --due 2026-04-01
dotnet TaskCli.cs -- list --all
dotnet TaskCli.cs -- complete 3
dotnet TaskCli.cs -- remove 3
dotnet TaskCli.cs -- --verbose list
```

> **Note:**
> The `--` after `TaskCli.cs` in the preceding examples tells `dotnet run` that all remaining arguments are passed to your app rather than interpreted by the `dotnet` CLI itself.

Each line uses several command-line concepts:

- **Subcommands** are verbs that tell the app what to do. The task tracker has four: `add`, `list`, `complete`, and `remove`. Each subcommand can define its own parameters.
- **Arguments** are positional values that follow a subcommand. In `add "Write documentation"`, the string `"Write documentation"` is an argument specifying the task description. In `complete 3`, the number `3` is an argument specifying the task ID.
- **Options** are named values prefixed with `--`. In `add --priority High --due 2026-04-01`, both `--priority` and `--due` are options with their own values. In `list --all`, the `--all` option is a Boolean flag that doesn't need a value.
- **Global options** apply to every subcommand. The `--verbose` option is defined on the root command with `Recursive = true`, so it works with any subcommand. In `--verbose list`, the verbose flag appears before the subcommand, but `list --verbose` works equally well.

In the sections that follow, you build these pieces from the bottom up. First, you define the individual options (like `--priority` and `--all`) and arguments (like the task description and ID). Next, you create the four subcommands and attach the relevant options and arguments to each one. Then you wire up an action for each subcommand. The action is the code that runs when the user invokes that command. Finally, you assemble the root command, parse the input, and invoke the matched action.

For a deeper look at command-line syntax concepts, see Command-line syntax overview.

## Define options and arguments

Options represent named values that users specify with a `--` prefix. Arguments represent positional values. Both are strongly typed. `System.CommandLine` parses the input string into the type you specify.

The `System.CommandLine` library uses *generic types* to enforce type safety. When you write `Option<int>`, the `int` between the angle brackets is a *type argument*. It tells the library what type of value the option holds. The class itself declares a *type parameter* `T` (as in `System.CommandLine.Option`1`), and you supply the concrete type when you create an instance. The library parses the user's input string and converts it to that type automatically. If the user provides `--delay abc` for an `Option<int>`, `System.CommandLine` reports a parse error instead of passing bad data to your code. You'll see this pattern with `Option<bool>`, `Option<Priority>`, `Option<DateOnly?>`, and `System.CommandLine.Argument`1` in the steps that follow. For more information on generics, see Generics.

1. Define the options. Each `Option<T>` specifies the value type, the name, and a description. The `--priority` option uses an `enum` type, and `System.CommandLine` automatically validates the input against valid enum values:

```csharp
var verboseOption = new Option<bool>("--verbose")
{
    Description = "Show detailed output",
    Recursive = true
};

var priorityOption = new Option<Priority>("--priority")
{
    Description = "Task priority level",
    DefaultValueFactory = _ => Priority.Medium
};

var dueOption = new Option<DateOnly?>("--due")
{
    Description = "Due date (uses current culture date format)"
};

var allOption = new Option<bool>("--all")
{
    Description = "Include completed tasks"
};
```
   The `Recursive = true` setting on `--verbose` makes the option available on every subcommand. The `DefaultValueFactory` on `--priority` provides a default value so users can omit the option.

1. Define the arguments. Each `Argument<T>` specifies the value type and a name:

```csharp
var descriptionArgument = new Argument<string>("description")
{
    Description = "Task description"
};

var taskIdArgument = new Argument<int>("id")
{
    Description = "Task ID"
};
```
## Build commands and subcommands

A `System.CommandLine.Command` represents an action that the user can invoke. Add the relevant options and arguments to each command so `System.CommandLine` knows which parameters belong where.

1. Create the four subcommands. Each command gets its own combination of options and arguments:

```csharp
var addCommand = new Command("add", "Add a new task")
{
    Arguments = { descriptionArgument },
    Options = { priorityOption, dueOption }
};
```
```csharp
var listCommand = new Command("list", "List all tasks")
{
    Options = { allOption }
};
```
```csharp
var completeCommand = new Command("complete", "Mark a task as complete")
{
    Arguments = { taskIdArgument }
};
```
```csharp
var removeCommand = new Command("remove", "Remove a task")
{
    Arguments = { taskIdArgument }
};
```
1. Assemble the root command. The `System.CommandLine.RootCommand` is the entry point for the CLI. Add the global `--verbose` option and all subcommands:

```csharp
var rootCommand = new RootCommand("A simple task tracker CLI")
{
    Options = { verboseOption },
    Subcommands = { addCommand, listCommand, completeCommand, removeCommand }
};
```
   The autogenerated help text shows the root command description when the user runs `TaskCli --help`.

## Handle commands with actions

Each subcommand needs an *action*. An action is a delegate that runs when the user invokes that command. A delegate is a type that represents a reference to a method. Here, you pass a lambda expression (an inline anonymous function defined with `=>`) as the delegate. Call `SetAction` to assign each action. The delegate receives a `System.CommandLine.ParseResult` that provides access to parsed values through `GetValue`.

1. Set the action for the `add` command. This action introduces string interpolation (`$"..."` strings that embed expressions in braces), the conditional operator (`?:`), and a type test pattern (`due is DateOnly dueDate`) that checks whether a nullable value has a value and assigns it to a new variable in one step:

```csharp
addCommand.SetAction(parseResult =>
{
    var description = parseResult.GetValue(descriptionArgument)!;
    var priority = parseResult.GetValue(priorityOption);
    var due = parseResult.GetValue(dueOption);
    var verbose = parseResult.GetValue(verboseOption);

    var tasks = LoadTasks();
    var id = tasks.Count > 0 ? tasks.Max(t => t.Id) + 1 : 1;
    var task = new TaskItem(id, description, priority, due, false);
    tasks.Add(task);
    SaveTasks(tasks);

    Console.WriteLine($"Added task {id}: {description}");
    if (verbose)
    {
        Console.WriteLine($"  Priority: {priority}");
        if (due is DateOnly dueDate)
        {
            Console.WriteLine($"  Due: {dueDate}");
        }
    }
});
```
1. Set the action for the `list` command. LINQ (Language Integrated Query) gives you standard query operators for in-memory collections. In this action, `System.Linq.Enumerable.Where*` filters the tasks to only the items that match a condition, and `System.Linq.Enumerable.ToList*` materializes the filtered sequence into a list. The action then uses a `foreach` loop to iterate over the results, and the conditional operator to pick a status symbol:

```csharp
listCommand.SetAction(parseResult =>
{
    var showAll = parseResult.GetValue(allOption);
    var verbose = parseResult.GetValue(verboseOption);

    var tasks = LoadTasks();
    var filtered = showAll ? tasks : tasks.Where(t => !t.IsComplete).ToList();

    if (filtered.Count == 0)
    {
        Console.WriteLine("No tasks found.");
        return;
    }

    foreach (var task in filtered)
    {
        var status = task.IsComplete ? "✓" : " ";
        Console.WriteLine($"  [{status}] {task.Id}: {task.Description}");
        if (verbose)
        {
            Console.WriteLine($"       Priority: {task.Priority}");
            if (task.Due is DateOnly dueDate)
            {
                Console.WriteLine($"       Due: {dueDate}");
            }
        }
    }
});
```
   For more detail, see LINQ.

1. Set the action for the `complete` command. This action uses LINQ's `System.Linq.Enumerable.FirstOrDefault*` to find:

   - A matching task.
   - An `is null` pattern to check whether the task exists.
   - A `with` expression to create a new record instance by copying the existing values first, and then applying the properties you set in the `with` initializer (here, `IsComplete = true`). Records are immutable by default, so this copy-and-update pattern is how you produce a modified value.

   Because the action can fail (for example, the task ID doesn't exist), the action returns an integer error code that becomes the app's exit code:

```csharp
completeCommand.SetAction(parseResult =>
{
    var id = parseResult.GetValue(taskIdArgument);
    var verbose = parseResult.GetValue(verboseOption);

    var tasks = LoadTasks();
    var task = tasks.FirstOrDefault(t => t.Id == id);

    if (task is null)
    {
        Console.Error.WriteLine($"Task {id} not found.");
        return -1;
    }

    tasks[tasks.IndexOf(task)] = task with { IsComplete = true };
    SaveTasks(tasks);

    Console.WriteLine($"Completed task {id}: {task.Description}");
    if (verbose)
    {
        Console.WriteLine($"  Priority: {task.Priority}");
    }
    return 0;
});
```
1. Set the action for the `remove` command. This action follows the same look-up-and-validate pattern as `complete`. Use `FirstOrDefault` to find the task and `is null` to handle the missing case:

```csharp
removeCommand.SetAction(parseResult =>
{
    var id = parseResult.GetValue(taskIdArgument);
    var verbose = parseResult.GetValue(verboseOption);

    var tasks = LoadTasks();
    var task = tasks.FirstOrDefault(t => t.Id == id);

    if (task is null)
    {
        Console.Error.WriteLine($"Task {id} not found.");
        return -1;
    }

    tasks.Remove(task);
    SaveTasks(tasks);

    Console.WriteLine($"Removed task {id}: {task.Description}");
    if (verbose)
    {
        Console.WriteLine($"  Priority: {task.Priority}");
    }
    return 0;
});
```
1. Parse the command line and invoke the matched action:

```csharp
return rootCommand.Parse(args).Invoke();
```
   `rootCommand.Parse(args)` parses the input into a `System.CommandLine.ParseResult`, and `.Invoke()` runs the action for the matched command. The return value is an exit code (0 for success).
