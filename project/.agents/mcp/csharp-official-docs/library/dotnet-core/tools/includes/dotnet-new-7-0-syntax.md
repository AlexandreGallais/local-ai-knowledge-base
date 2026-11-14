---
title: "dotnet-new-7-0-syntax"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/includes/dotnet-new-7-0-syntax.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-new-7-0-syntax

Starting with the .NET 7 SDK, the `dotnet new` syntax has changed:

- The `--list`, `--search`, `--install`, and `--uninstall` options became `list`, `search`, `install`, and `uninstall` subcommands.
- The `--update-apply` option became the `update` subcommand.
- To use `--update-check`, use the `update` subcommand with the `--check-only` option.

Other options that were available before are still available to use with their respective subcommands.
Separate help for each subcommand is available via the `-h` or `--help` option: `dotnet new <subcommand> --help` lists all supported options for the subcommand.

Additionally, tab completion is now available for `dotnet new`. It supports completion for installed template names and for the options a selected template provides.
To activate tab completion for the .NET SDK, see Enable tab completion.
