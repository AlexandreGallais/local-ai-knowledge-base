---
title: "Process log enricher"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/enrichment/process-log-enricher.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Process log enricher

The process enricher augments telemetry logs with process-specific information.

You can register the enrichers in an IoC container. Then, all registered enrichers are picked up automatically by the respective telemetry instances, such as logs or metrics, where they enrich the telemetry information.

## Install the package

To get started, install the 📦 Microsoft.Extensions.Telemetry NuGet package:

### .NET CLI

```dotnetcli
dotnet add package Microsoft.Extensions.Telemetry
```

Or, if you're using .NET 10+ SDK:

```dotnetcli
dotnet package add Microsoft.Extensions.Telemetry
```

### PackageReference

```xml
<PackageReference Include="Microsoft.Extensions.Telemetry"
                  Version="*" /> <!-- Adjust version -->
```

---

## Usage

To use the process log enricher, first you enable enrichment. Then you can add the `Microsoft.Extensions.DependencyInjection.ProcessEnricherServiceCollectionExtensions.AddProcessLogEnricher*` with default properties, as shown in the following code:

```csharp
﻿using System.Text.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

var builder = Host.CreateApplicationBuilder(args);

builder.Logging.EnableEnrichment();
builder.Services.AddProcessLogEnricher();

builder.Logging.AddJsonConsole(op =>
{
    op.JsonWriterOptions = new JsonWriterOptions
    {
        Indented = true
    };
});

var host = builder.Build();
var logger = host.Services.GetRequiredService<ILogger<Program>>();

logger.LogInformation("This is a sample log message");
await host.RunAsync();
```
Given this code sample, the output should be similar to the following JSON:

```json
{
  "EventId": 0,
  "LogLevel": "Information",
  "Category": "Enrichment.Program",
  "Message": "This is a sample log message",
  "State": {
    "Message": "This is a sample log message",
    "process.pid": "10696",
    "{OriginalFormat}": "This is a sample log message"
  }
}
```
## `ProcessLogEnricherOptions`

The `Microsoft.Extensions.Diagnostics.Enrichment.ProcessLogEnricherOptions` class provides fine-grained control over which process-related properties are included in your log enrichment. This options class allows you to selectively enable or disable specific enrichment features such as process ID and thread ID information. Although default properties are supplied by the process enricher, you can customize them by initializing an instance of `Microsoft.Extensions.Diagnostics.Enrichment.ProcessLogEnricherOptions` and providing it when registering the enricher.

You can enable or disable individual options of the enricher using `Microsoft.Extensions.DependencyInjection.ProcessEnricherServiceCollectionExtensions.AddProcessLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection,System.Action{Microsoft.Extensions.Diagnostics.Enrichment.ProcessLogEnricherOptions})`:

```csharp
serviceCollection.AddProcessLogEnricher(options =>
{
    options.ThreadId = true;
    options.ProcessId = true;
});
```

You may also disable or enable individual options using _appsettings.json_ file configuration, for example:

```json
{
    "ProcessLogEnricherOptions": {
        "ThreadId": true,
        "ProcessId": true
    }
}
```

and apply it accordingly using `Microsoft.Extensions.DependencyInjection.ProcessEnricherServiceCollectionExtensions.AddProcessLogEnricher(Microsoft.Extensions.DependencyInjection.IServiceCollection,Microsoft.Extensions.Configuration.IConfigurationSection)`:

```csharp
serviceCollection.AddProcessLogEnricher(
    hostBuilder.Configuration.GetSection("ProcessLogEnricherOptions"));
```

The console output after enabling both options should look like this:

```json
{
  "EventId": 0,
  "LogLevel": "Information",
  "Category": "Enrichment.Program",
  "Message": "This is a sample log message",
  "State": {
    "Message": "This is a sample log message",
    "process.pid": "12924",
    "thread.id": "2",
    "{OriginalFormat}": "This is a sample log message"
  }
}
```
## Default configuration

The default configuration for process log enrichment is:

| Property    | Default Value | Description                                             |
|-------------|---------------|---------------------------------------------------------|
| `ProcessId` | `true`        | If true, logs are enriched with the current process ID. |
| `ThreadId`  | `false`       | If true, logs are enriched with the current thread ID   |
