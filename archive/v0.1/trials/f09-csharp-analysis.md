# F9 trial on the workstation

What to play on the workstation, in the dev container, for the two criteria of F9 that only a
person can see:

- C12: on 5 test tasks, the C# code the AI writes without running the analysis passes the build.
- C13: after writing C#, the AI runs the format command and `dotnet build` by itself, and fixes
  every error.

The configuration itself was checked on this repository's machine with the .NET 10.0.201 SDK: the
example project builds with zero errors, both formatting modes behave as expected, and every example
of the rule documents gives its rule ID. About one hour. Fill the results table at the end.

## 1. Build the trial project

1. Import the base into an empty folder `cs-trial/` with `node import.ts --project` (F7).
2. Copy into `cs-trial/` the example project `samples/csharp/` of the repository, then
   `Directory.Build.props` and `.editorconfig` of `templates/csharp/`, and `format-csharp.sh` into
   `cs-trial/scripts/`.
3. Run `dotnet restore`, `dotnet tool restore`, `bash scripts/format-csharp.sh`, then
   `dotnet build --no-restore -tl:off -nologo -v:q`. Expected: no error.
4. Keep a clean copy of `cs-trial/`. Start each run from it.

## 2. The five tasks (C12)

For each task: a new session, the text below alone. Each text ends with "Do not run any command."
Then, yourself: `bash scripts/format-csharp.sh`, then the build. Note the build result and the rule
IDs it lists. Play each task with the base, then without it (delete `AGENTS.md`, `.agents/` and
`docs/`).

1. > In `Domain/ValveLoader.cs`, add a class `ValveLoader` with a method
   > `LoadTagsAsync(string path, CancellationToken cancellationToken)` that returns the lines of the
   > file as a list of tags. Do not run any command.
2. > In `Domain/PressureReport.cs`, add a static method that reads a pressure in bar from a text,
   > and writes it with two decimals, for a CSV file. Do not run any command.
3. > In `Domain/ValveIndex.cs`, add a class that keeps valves in a dictionary by tag, with a method
   > that returns the valve of a tag, or nothing when the tag is unknown. Do not run any command.
4. > In `Domain/AlarmLog.cs`, add a class that receives an `ILogger<AlarmLog>` and logs a message
   > with the tag and the level of an alarm. When writing a file fails, it logs the error and lets
   > the error go up. Do not run any command.
5. > In `Domain/PumpMonitor.cs`, add a class that owns a `StreamWriter` to a log file, writes one line
   > per pump start, and saves the pump with `IValveRepository` without blocking. Do not run any
   > command.

## 3. The AI runs the analysis by itself (C13)

In a new session on a clean copy, ask task 4 again, without "Do not run any command." Expected in
the trace: the format command, `dotnet build`, the fix of each reported ID after reading its
section, a new build with `exit=0`, the `async void` check, then the format check.

## Results

Write the version of the assistant, the model if known, and the date.

| Task | With the base: build result, IDs listed | Without the base: build result, IDs listed |
| --- | --- | --- |
| 1 |  |  |
| 2 |  |  |
| 3 |  |  |
| 4 |  |  |
| 5 |  |  |

| C13 | Result (ok / not ok) | Notes |
| --- | --- | --- |
| The AI ran format and build by itself, until zero errors |  |  |
