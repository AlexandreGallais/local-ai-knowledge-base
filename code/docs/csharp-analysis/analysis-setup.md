---
id: csharp-analysis-analysis-setup
title: C# analysis setup
topic: csharp-analysis
summary: Configuration files, format and build commands, and the strict formatting switch of a .NET project. .NET 10.
tool: dotnet
version: "10.0"
checked: 2026-11-13
sources: [S1, S2, S3]
license: MIT, written for this base
variant: files
---

# C# analysis setup

Contents: 1. Files · 2. Commands · 3. Strict formatting · 4. Reading the errors · Sources

## 1. The configuration files (.NET analyzers)

Three files of `templates/csharp/` go to the root of the .NET project or solution:

- `Directory.Build.props`: nullable reference types on, every warning is an error, `AnalysisLevel` set to the release of the project (never `latest`), code style checked during the build, and the `StrictFormatting` switch. [S1]
- `.editorconfig`: the closed list of rules that fail the build, one line per rule ID, with the reason in a comment. [S1]
- `format-csharp.sh`, in the `scripts/` folder of the project: the format command.

Never change these files to remove an error. Fix the code.

## 2. The commands (.NET SDK)

Run them from the folder that holds `Directory.Build.props`, in this order:

1. Format: `bash scripts/format-csharp.sh`
2. Build and analyze: `dotnet build --no-restore -tl:off -nologo -v:q > /tmp/build.log 2>&1; echo "exit=$?"`
3. List the errors: `grep -E ": (error|warning) " /tmp/build.log | sort -u | head -n 30`
4. Check async void, which must print nothing: `grep -rn --include=*.cs "async void" . | grep -v EventArgs`
5. Check the format: `bash scripts/format-csharp.sh --check`

Run `dotnet restore` once before, and again after a package changes. [S2]

## 3. The strict formatting switch (StrictFormatting)

The line `<StrictFormatting>false</StrictFormatting>` of `Directory.Build.props` selects the formatter:

- `false`: `dotnet format` applies spaces, style and analyzer fixes. It never wraps a long line. [S2]
- `true`: `dotnet format style` and `dotnet format analyzers`, then CSharpier, which also wraps lines longer than 100 characters. [S3]

The strict mode needs CSharpier once per project: `dotnet new tool-manifest`, then `dotnet tool install csharpier`.

## 4. Reading the errors (MSBuild output)

Each error line gives the file, the line, the rule ID and a message: `Valve.cs(12,20): error CA2016: …`. Fix the first one, then build again: later errors often come from the first. Find the rule ID in the index of this base, open that document, and read only its section.

## Sources

- [S1] Microsoft, "Code analysis in .NET: configuration options", .NET 10, <https://learn.microsoft.com/en-us/dotnet/fundamentals/code-analysis/configuration-options>, read 2026-11-13, CC BY 4.0, summarized.
- [S2] Microsoft, "dotnet format", .NET 10, <https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-format>, read 2026-11-13, CC BY 4.0, summarized.
- [S3] CSharpier, "CSharpier documentation", version 1.4, <https://csharpier.com/docs/About>, read 2026-11-13, MIT, summarized.
