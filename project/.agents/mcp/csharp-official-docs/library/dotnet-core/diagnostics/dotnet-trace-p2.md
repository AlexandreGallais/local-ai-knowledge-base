---
title: "dotnet-trace diagnostic tool - .NET CLI (part 2 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/dotnet-trace.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# dotnet-trace diagnostic tool - .NET CLI (part 2 of 5)

## dotnet-trace collect

Collects a diagnostic trace from a running process or launches a child process and traces it (.NET 5 or later). To have the tool run a child process and trace it from its startup, append `--` to the collect command.

### Synopsis

```dotnetcli
dotnet-trace collect
    [--buffering-mode <Drop|Block>]
    [--buffersize <size>]
    [--clreventlevel <clreventlevel>]
    [--clrevents <clrevents>]
    [--dsrouter <ios|ios-sim|android|android-emu>]
    [--format <Chromium|NetTrace|Speedscope>]
    [-h|--help]
    [--duration dd:hh:mm:ss]
    [-n, --name <name>]
    [--diagnostic-port]
    [-o|--output <trace-file-path>]
    [-p|--process-id <pid>]
    [--profile <list-of-comma-separated-profile-names>]
    [--providers <list-of-comma-separated-providers>]
    [-- <command>] (for target applications running .NET 5 or later)
    [--show-child-io]
    [--resume-runtime]
    [--stopping-event-provider-name <stoppingEventProviderName>]
    [--stopping-event-event-name <stoppingEventEventName>]
    [--stopping-event-payload-filter <stoppingEventPayloadFilter>]
```
