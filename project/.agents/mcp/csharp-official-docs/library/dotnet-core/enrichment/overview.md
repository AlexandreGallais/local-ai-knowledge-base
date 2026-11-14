---
title: "Log enrichment overview"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/enrichment/overview.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Overview

Log enrichment is a powerful feature that automatically attaches contextual information to your application's logs. Instead of manually adding metadata to each log, enrichment provides a systematic way to inject relevant context automatically across your entire application.

## What is enrichment?

Enrichment augments telemetry objects with additional information that provides valuable context about the environment, application state, and execution context when the telemetry was generated. This contextual data helps with debugging, monitoring, performance analysis, and understanding application behavior in production environments.

## Why is enrichment important?

Enrichment plays a critical role in enhancing observability and diagnostics by adding standardized contextual information—such as process details, environment tags, or user identifiers—to telemetry data. This additional metadata transforms raw logs into structured, meaningful insights, making it easier to trace issues, correlate events, and improve application reliability. By enabling enrichment and configuring specific enrichers, teams can streamline troubleshooting, optimize performance monitoring, and ensure compliance with operational standards. Ultimately, enrichment is not just a technical add-on; it’s a foundational practice for building resilient, transparent systems that support informed decision-making and faster incident resolution.

## How enrichment works

The enrichment framework operates through a collection of enrichers that are registered with the dependency injection container. When telemetry is generated, all registered enrichers automatically contribute their contextual information to the telemetry payload. You just register the specific set of enrichers you want into an `Microsoft.Extensions.DependencyInjection.IServiceCollection` instance. The enrichers run automatically without requiring changes to your application code. You simply configure which enrichers you want to use during application startup.

## Dimension names and tags

Enrichers add information to telemetry using standardized dimension names (also called tags or keys).

## Setting up enrichment

To use log enrichment in your application, you need to:

1. **Enable enrichment** for logging.
2. **Register specific enrichers** you want to use.
3. **Configure options** for each enricher (optional).

### Basic setup example

Here's a simple example showing how to set up log enrichment with process information:

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
This configuration:

- Enables enrichment for logging via `EnableEnrichment()`.
- Registers the process log enricher via `AddProcessLogEnricher()`.
- Configures JSON console output to display the enriched data.

### Output example

With enrichment enabled, your log output will automatically include additional contextual information:

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
## Available enrichers

The .NET enrichment framework provides some built-in enrichers, like:

- **Process enricher**: Process and thread information

## Custom enrichers

If the built-in enrichers don't meet your specific needs, you can create custom enrichers to add application-specific context. For more information, check custom enrichment.
