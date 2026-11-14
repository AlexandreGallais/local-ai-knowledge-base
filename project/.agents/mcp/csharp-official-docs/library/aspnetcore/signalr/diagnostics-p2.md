---
title: "Logging and diagnostics in ASP.NET Core SignalR (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/signalr/diagnostics.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Logging and diagnostics in ASP.NET Core SignalR (part 2 of 2)

## Attach diagnostics files to GitHub issues

Diagnostics files can be attached to GitHub issues by renaming them so they have a `.txt` extension and then dragging and dropping them on to the issue.

> **Note:**
> Please don't paste the content of log files or network traces into a GitHub issue. These logs and traces can be large, and GitHub usually truncates them.

## Metrics

Metrics are a representation of data measures over intervals of time. For example, requests per second. Metrics data allows observation of the state of an app at a high level. .NET gRPC metrics are emitted using `System.Diagnostics.Tracing.EventCounter`.

### SignalR server metrics

SignalR server metrics are reported on the `Microsoft.AspNetCore.Http.Connections` event source.

| Name                    | Description                 |
|-------------------------|-----------------------------|
| `connections-started`   | Total connections started   |
| `connections-stopped`   | Total connections stopped   |
| `connections-timed-out` | Total connections timed out |
| `current-connections`   | Current connections         |
| `connections-duration`  | Average connection duration |

### Observe metrics

dotnet-counters is a performance monitoring tool for ad-hoc health monitoring and first-level performance investigation. Monitor a .NET app with `Microsoft.AspNetCore.Http.Connections` as the provider name. For example:

```console
> dotnet-counters monitor --process-id 37016 --counters Microsoft.AspNetCore.Http.Connections

Press p to pause, r to resume, q to quit.
    Status: Running
[Microsoft.AspNetCore.Http.Connections]
    Average Connection Duration (ms)       16,040.56
    Current Connections                         1
    Total Connections Started                   8
    Total Connections Stopped                   7
    Total Connections Timed Out                 0
```

## Related content

* ASP.NET Core SignalR configuration
* ASP.NET Core SignalR JavaScript client
* ASP.NET Core SignalR .NET client
