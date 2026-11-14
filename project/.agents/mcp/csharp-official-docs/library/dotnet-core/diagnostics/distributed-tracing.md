---
title: "Distributed tracing - .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/distributed-tracing.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# .NET distributed tracing

Distributed tracing is a diagnostic technique that helps engineers localize failures and
performance issues within applications, especially those that may be distributed across
multiple machines or processes. This technique tracks requests through an application
correlating together work done by different application components and separating it from
other work the application may be doing for concurrent requests. For example, a request to a
typical web service might be first received by a load balancer, then forwarded to a web server
process, which then makes several queries to a database. Using distributed tracing allows
engineers to distinguish if any of those steps failed, how long each step took, and potentially
logging messages produced by each step as it ran.

> **Note:**
> The term 'tracing' can have multiple meanings in older .NET APIs. This document focuses on distributed tracing. For information
> on logging and older tracing APIs, see Logging and tracing.

## Getting started for .NET app developers

Key .NET libraries are instrumented to produce distributed tracing information automatically. However, this information needs to be collected and stored so that it will be available for review later.
Typically, app developers select a telemetry service that stores this trace information for them and
then use a corresponding library to transmit the distributed tracing telemetry to their chosen
service:

- OpenTelemetry
is a vendor-neutral library that supports several services. For more information, see Collect distributed traces with OpenTelemetry.
- Application Insights
is a full-featured service provided by Microsoft. For more information, see Collect distributed traces with Application Insights.
- There are many high-quality third-party application performance monitoring (APM) vendors that offer integrated .NET solutions.

For more information, see Understand distributed tracing concepts and the following guides:

- Configure distributed tracing
- Collect distributed traces with custom logic
- Adding custom distributed trace instrumentation

For third-party telemetry collection services, follow the setup instructions provided by the vendor.

## Built-in activities emitted by .NET

For a comprehensive list of activities built into .NET see Built-in activities in .NET.

## Getting started for .NET library developers

.NET libraries don't need to be concerned with how telemetry is ultimately collected, only
with how it is produced. If you want consumers of your library to be able to see the work that it does detailed in a distributed trace, add distributed tracing instrumentation to support it.

For more information, see Understand distributed tracing concepts and the Adding custom distributed trace instrumentation guide.
