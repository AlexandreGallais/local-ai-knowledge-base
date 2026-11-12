---
name: analyze-csharp
description: Format C# code, run the .NET analyzers through the build, and fix every reported error until the build is clean. Use when you write or change a C# file, or when the user asks to lint, analyze, format or build C# code.
license: MIT
metadata:
  variant: files
  version: "0.1.0"
---

# Analyze C# code

## Rules

- Fix the code. Never change `.editorconfig`, `Directory.Build.props` or a `.globalconfig` file to pass.
- Never add `#pragma warning disable`, `[SuppressMessage]`, `<NoWarn>` or the `!` operator to hide an error.
- Never write `async void`, except for an event handler.
- Never fix formatting by hand. The format command does it.
- Fix one error ID at a time. Start with the first error of the list.
- Stop after 3 failed attempts on the same error. Show the error to the user.
- Never search the web. Never open a URL.

## Steps

1. Note the C# files you wrote or changed. Follow the "Right" examples of `docs/csharp-analysis/` for the kind of code you write.

<!-- files:begin id=analyze -->

2. Run the format command from the folder that holds `Directory.Build.props`:
   `bash scripts/format-csharp.sh`
3. Run the build. The build runs the analyzers:
   `dotnet build --no-restore -tl:off -nologo -v:q > /tmp/build.log 2>&1; echo "exit=$?"`
4. If the output is `exit=0`, go to step 9.
5. List the errors, each one once, 30 lines at most:
   `grep -E ": (error|warning) " /tmp/build.log | sort -u | head -n 30`
6. Take the first error. Note its ID (for example `CA2016`), its file and its line.
7. Find the ID in the index of this base. Open that document of `docs/csharp-analysis/`. Read only the section of that ID. Change the code to the "Right" form.
8. Go back to step 2.
9. Run `grep -rn --include=*.cs "async void" . | grep -v EventArgs`. It must print nothing. Else return a `Task` and go back to step 2.
10. Run the format check: `bash scripts/format-csharp.sh --check`. If it fails, go back to step 2.

<!-- files:end -->

11. Give the result: the IDs you fixed, and every error left.

## Example

Wrong:

```csharp
#pragma warning disable CA2016
string text = await File.ReadAllTextAsync(path);
#pragma warning restore CA2016
```

Right:

```csharp
string text = await File.ReadAllTextAsync(path, cancellationToken);
```

## Pitfalls

- Many errors after one change: fix the first one, then build again. Later errors often disappear.
- The base has no section for the ID: read the error message and fix the code as the message says.
- The build fails and step 5 lists nothing: read the end of the log with `tail -n 20 /tmp/build.log`.
- The build says that the assets file is missing: run `dotnet restore` once, then go back to step 2.
- A file changed after the format command: read it again before you edit it.
- The rule looks wrong for this code: do not suppress it. Stop and ask the user.

## Final check

- Did the build end with `exit=0`, and did the format check pass?
- Did you fix the code, with no suppression and no change to the configuration?
- Is there no `async void` outside an event handler?
