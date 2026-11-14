---
title: "Add distributed tracing instrumentation - .NET (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/distributed-tracing-instrumentation-walkthroughs.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Add distributed tracing instrumentation - .NET (part 2 of 2)

## Optional: Links

When work occurs in batch processing systems, a single Activity might represent work on behalf of many
different requests simultaneously, each of which has its own trace-id. Although Activity is restricted
to have a single parent, it can link to additional trace-ids using
`System.Diagnostics.ActivityLink`. Each ActivityLink is
populated with an `System.Diagnostics.ActivityContext` that
stores ID information about the Activity being linked to. ActivityContext can be retrieved from in-process
Activity objects using `System.Diagnostics.Activity.Context` or
it can be parsed from serialized ID information using
`System.Diagnostics.ActivityContext.Parse(System.String,System.String)`.

```csharp
void DoBatchWork(ActivityContext[] requestContexts)
{
    // Assume each context in requestContexts encodes the trace-id that was sent with a request
    using(Activity activity = s_source.StartActivity(name: "BigBatchOfWork",
                                                     kind: ActivityKind.Internal,
                                                     parentContext: default,
                                                     links: requestContexts.Select(ctx => new ActivityLink(ctx))))
    {
        // do the batch of work here
    }
}
```

Unlike events and Tags that can be added on-demand, links must be added during `StartActivity()` and are immutable afterwards.

> **Important:**
> As per the OpenTelemetry specification, the suggested limit for the number of links is 128. However, it's important to note that this limit is not enforced.
