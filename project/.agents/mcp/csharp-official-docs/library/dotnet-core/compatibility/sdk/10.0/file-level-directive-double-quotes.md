---
title: "Breaking change - Double quotes in file-level directives are disallowed"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/file-level-directive-double-quotes.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Double quotes in file-level directives are disallowed

Usage of double quotes `"` inside `#:` file-level directives is now a build-time error when running file-based apps (for example, `dotnet run app.cs`).

## Version introduced

.NET 10 GA

## Previous behavior

In .NET 10 RC2 and older .NET 10 previews, quotes in directives weren't blocked but they didn't work as expected. They were only escaped as any other special character and passed to MSBuild. For example, `#:property Prop="my test"` resulted in `<Prop>"my test"</Prop>`.

## New behavior

An error is reported if a double quote `"` is encountered in any file-level directive. The error message is:

> Directives currently cannot contain double quotes (").

## Type of breaking change

This change can affect source compatibility.

## Reason for change

This change enables future support for quoted directives without introducing a breaking change. This also improves the error recovery experience if users try to use quotes now, thinking that's supported syntax.

## Recommended action

Don't use quotes in `#:` directives. If you really need to use a double quote (or another special character that currently isn't supported, like trailing whitespace), move the corresponding project metadata entry into a `Directory.Build.props` file instead (it will be picked up by the file-based app). Or, convert the file-based app to a full project via `dotnet project convert`.

## Affected APIs

None.
