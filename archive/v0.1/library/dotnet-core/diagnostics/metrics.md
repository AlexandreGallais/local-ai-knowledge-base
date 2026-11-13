---
title: "Metrics Overview"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/diagnostics/metrics.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET metrics

Metrics are numerical measurements reported over time. They are typically used to monitor the health of an app and generate alerts. For example, a web service might track how many:

* Requests it received per second.
* Milliseconds it took to respond.
* Error responses sent.

These metrics can be reported to a monitoring system at regular intervals. If the web service is intended to respond to requests within 400 ms and starts responding in 600 ms, the monitoring system can notify engineers that the app response is slower than normal.

## Using metrics

There are two parts to using metrics in a .NET app:

* **Instrumentation:** Code in .NET libraries takes measurements and associates these measurements with a metric name.
* **Collection:** A .NET app configures named metrics to be transmitted from the app for external storage and analysis. Some tools may perform configuration outside the app using configuration files or a UI tool.

.NET library developers are primarily interested in the instrumentation step. App developers or operational engineers usually focus on the collection step, leveraging the pre-existing instrumentation within libraries they are using. However, if you're an app developer and none of the existing metrics meet your needs, you can create new metrics.

## Next steps

- Instrumentation tutorial - How to create new metrics in code
- Collection tutorial - How to store and view metric data for your app
- Metrics configuration - How to filter instruments for listeners that use dependency injection
- Source generated metrics - How to use source generator to create metrics
- Source-generated metrics with strongly-typed tags - How to use source-generated metrics with strongly-typed tags
- Built-in metrics - Discover metrics that are ready for use in .NET runtime libraries
- Compare metric APIs
- EventCounters - Learn what EventCounters are, how to implement them, and how to consume them
