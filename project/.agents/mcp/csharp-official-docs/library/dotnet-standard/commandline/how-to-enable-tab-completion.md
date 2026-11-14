---
title: "Tab completion for System.CommandLine"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/commandline/how-to-enable-tab-completion.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Tab completion for System.CommandLine

Apps that use `System.CommandLine` have built-in support for tab completion in certain shells. To enable it, the end user must take a few steps once per shell. Once this is done, tab completion is automatic for static values in your app, such as enum values or values defined by calling `System.CommandLine.Option`1.AcceptOnlyFromAmong(System.String[])`. You can also customize tab completion by providing values dynamically at runtime.

## Enable tab completion

On the machine where you (the end user) want to enable tab completion, follow these steps.

For the .NET CLI:

* See How to enable tab completion.

For other command-line apps built on `System.CommandLine`:

* Install the `dotnet-suggest` global tool:

  ```dotnetcli
  dotnet tool install -g dotnet-suggest
  ```

* Add the appropriate shim script to your shell profile. You might need to create a shell profile file. The shim script forwards completion requests from your shell to the `dotnet-suggest` tool, which delegates them to the appropriate `System.CommandLine`-based app.

  * For `bash`, add the contents of *dotnet-suggest-shim.bash* to *~/.bash_profile*.

  * For `zsh`, add the contents of *dotnet-suggest-shim.zsh* to *~/.zshrc*.

  * For PowerShell, add the contents of *dotnet-suggest-shim.ps1* to your PowerShell profile, and then restart PowerShell. You can find the expected path to your PowerShell profile with the following command:

    ```console
    echo $profile
    ```

* Register the app by calling  `dotnet-suggest register --command-path $executableFilePath`, where `$executableFilePath` is the path to the app's executable file.

Once the user's shell is set up and the executable is registered, completions will work for all apps that are built by using `System.CommandLine`.

For *cmd.exe* on Windows (the Windows Command Prompt), there is no pluggable tab completion mechanism, so no shim script is available. For other shells, look for a GitHub issue that's labeled `Area-Completions`. If you don't find an issue, you can open a new one.

## Get tab completion values at runtime

The following code shows an app that retrieves values for tab completion dynamically at runtime. The code gets a list of the next week of dates following the current date. The list is provided to the `--date` option by calling `CompletionSources.Add`:

```csharp
using System.CommandLine;
using System.CommandLine.Completions;
using System.CommandLine.Parsing;

var rootCommand = new RootCommand("Sample app with tab-completion")
{
    new DateCommand()
};

await rootCommand.Parse(args).InvokeAsync();

class DateCommand : Command
{
    private Argument<string> subjectArgument = new("subject")
    {
        Description = "The subject of the appointment."
    };
    private Option<DateTime> dateOption = new("--date")
    {
        Description = "The day of week to schedule. Should be within one week."
    };

    public DateCommand() : base("schedule", "Makes an appointment for sometime in the next week.")
    {
        this.Arguments.Add(subjectArgument);
        this.Options.Add(dateOption);

        dateOption.CompletionSources.Add(ctx => {
            var today = System.DateTime.Today;
            List<CompletionItem> dates = new();
            foreach (var i in Enumerable.Range(1, 7))
            {
                var date = today.AddDays(i);
                dates.Add(new CompletionItem(
                    label: date.ToShortDateString(),
                    sortText: $"{i:2}"));
            }
            return dates;
        });

        this.SetAction(parseResult =>
        {
            Console.WriteLine($"Scheduled \"{parseResult.GetValue(subjectArgument)}\" for {parseResult.GetValue(dateOption)}");
        });
    }
}
```
The values shown when the `Tab` key is pressed are provided as `System.CommandLine.Completions.CompletionItem` instances:

```csharp
dates.Add(new CompletionItem(
    label: date.ToShortDateString(),
    sortText: $"{i:2}"));
```
The following `CompletionItem` properties are set:

* `System.CommandLine.Completions.CompletionItem.Label` is the completion value to be shown.
* `System.CommandLine.Completions.CompletionItem.SortText` ensures that the values in the list are presented in the correct order. It's set by converting `i` to a two-digit string, so that sorting is based on 01, 02, 03, and so on, through 14. If you don't set this parameter, sorting is based on `Label`, which in this example is in short date format and won't sort correctly.

There are other `CompletionItem` properties, such as `Documentation` and `Detail`, but they aren't yet used in `System.CommandLine`.

The dynamic tab completion list created by this code also appears in help output:

```output
Description:
  Makes an appointment for sometime in the next week.

Usage:
  schedule <subject> [options]

Arguments:
  <subject>  The subject of the appointment.

Options:
  --date                                                                          The day of week to schedule. Should be within one week.
  <12/4/2025|12/5/2025|12/6/2025|12/7/2025|12/8/2025|12/9/2025|12/10/2025>
  --version                                                                       Show version information
  -?, -h, --help
```

## See also

* System.CommandLine overview
* How to enable tab completion for the .NET CLI
