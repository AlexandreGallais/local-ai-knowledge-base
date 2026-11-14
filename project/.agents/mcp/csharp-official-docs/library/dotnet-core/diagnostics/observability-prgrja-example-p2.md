---
title: "Example: Use OpenTelemetry with Prometheus, Grafana, and Jaeger (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/diagnostics/observability-prgrja-example.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Example: Use OpenTelemetry with Prometheus, Grafana, and Jaeger (part 2 of 2)

## 9. Distributed tracing with Jaeger

In step 6, you saw that distributed tracing information was being exposed to the console. This information tracks units of work with activities. Some activities are created automatically by the platform, such as the one by ASP.NET to represent the handling of a request, and libraries and app code can also create activities. The greetings example has a `Greeter` activity. The activities are correlated using the `TraceId`, `SpanId`, and `ParentId` tags.

Each process in a distributed system produces its own stream of activity information, and like metrics, you need a system to collect, store, and correlate the activities to be able to visualize the work done for each transaction. Jaeger is an open-source project to enable this collection and visualization.

Download the latest binary distribution archive of Jaeger for your platform from https://www.jaegertracing.io/download/.

Then, extract the download to a local location that's easy to access. Run the *jaeger-all-in-one(.exe)* executable:

```dotnetcli
./jaeger-all-in-one --collector.otlp.enabled
```

Look through the console output to find the port where it's listening for OTLP traffic via gRPC. For example:

```json
{"level":"info","ts":1686963686.3854616,"caller":"user@example.com/otlp.go:83","msg":"Starting GRPC server","endpoint":"0.0.0.0:4317"}
```

This output tells you it's listening on `0.0.0.0:4317`, so you can configure that port as the destination for your OTLP exporter.

Open the `AppSettings.json` file for our project, and add the following line, changing the port if applicable.

```json
"OTLP_ENDPOINT_URL" :  "http://localhost:4317/"
```

Restart the greeter process so that it can pick up the property change and start directing tracing information to Jaeger.

Now, you should be able to see the Jaeger UI at `http://localhost:16686/` from a web browser.

[](./media/jaeger-search-results.png#lightbox)

To see a list of traces, select `OTel-Prometheus-grafana-Jaeger` from the **Service** dropdown. Selecting a trace should show a gantt chart of the activities as part of that trace. Clicking on each of the operations shows more details about the activity.

[](./media/jaeger-activity-details.png#lightbox)

In a distributed system, you want to send traces from all processes to the same Jaeger installation so that it can correlate the transactions across the system.

You can make your app a little more interesting by having it make HTTP calls to itself.

- Add an `HttpClient` factory to the application:

```csharp
builder.Services.AddHttpClient();
```
- Add a new endpoint for making nested greeting calls:

```csharp
app.MapGet("/NestedGreeting", SendNestedGreeting);
```
- Implement the endpoint so that it makes HTTP calls that can also be traced. In this case, it calls back to itself in an artificial loop (really only applicable to demo scenarios):

```csharp
async Task SendNestedGreeting(int nestlevel, ILogger<Program> logger, HttpContext context, IHttpClientFactory clientFactory)
{
    // Create a new Activity scoped to the method
    using var activity = greeterActivitySource.StartActivity("GreeterActivity");

    if (nestlevel <= 5)
    {
        // Log a message
        logger.LogInformation("Sending greeting, level {nestlevel}", nestlevel);

        // Increment the custom counter
        countGreetings.Add(1);

        // Add a tag to the Activity
        activity?.SetTag("nest-level", nestlevel);

        await context.Response.WriteAsync($"Nested Greeting, level: {nestlevel}\r\n");

        if (nestlevel > 0)
        {
            var request = context.Request;
            var url = new Uri($"{request.Scheme}://{request.Host}{request.Path}?nestlevel={nestlevel - 1}");

            // Makes an http call passing the activity information as http headers
            var nestedResult = await clientFactory.CreateClient().GetStringAsync(url);
            await context.Response.WriteAsync(nestedResult);
        }
    }
    else
    {
        // Log a message
        logger.LogError("Greeting nest level {nestlevel} too high", nestlevel);
        await context.Response.WriteAsync("Nest level too high, max is 5");
    }
}
```
This results in a more interesting graph with a pyramid shape for the requests, as each level waits for the response from the previous call.

[](./media/jaeger-nested-activity-details.png#lightbox)
