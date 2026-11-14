---
title: "Breaking change - dotnet CLI commands log non-command-relevant data to stderr"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/dotnet-cli-stderr-output.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet CLI commands log non-command-relevant data to stderr

Starting in .NET 10, some `dotnet` CLI command output that isn't core to the command being invoked emits to `stderr` instead of `stdout`.

## Version introduced

.NET 10

## Previous behavior

Previously, first-run messages for the `dotnet` CLI emitted to `stdout`.

## New behavior

Starting in .NET 10, first-run messages for the `dotnet` CLI emit to `stderr`. (In the future, more messages will undergo a similar change.)

## Type of breaking change

This change is a behavioral change.

## Reason for change

Information that's written to `stdout` that isn't directly related to the command being invoked inhibits the use of commands in scripting or noninteractive circumstances. When non-primary outputs like diagnostics, verbose messages, and incidental notifications are moved to `stderr`, `stdout` remains clean for parsing or other interpretation.

## Recommended action

For most non-PowerShell users, this change shouldn't require any action.

For PowerShell users, we recommend using at least PowerShell version 7.2, where redirecting to `stderr` doesn't set PowerShell's `$Error` variable and cause PowerShell to think the previous command failed execution.

## Affected APIs

None.
