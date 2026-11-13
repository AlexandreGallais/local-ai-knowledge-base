---
title: "ASP.NET Core metrics (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/metrics/overview.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core metrics (part 2 of 2)

## View metrics in Grafana with OpenTelemetry and Prometheus

### Overview

OpenTelemetry:

* Is a vendor-neutral open-source project supported by the Cloud Native Computing Foundation.
* Standardizes generating and collecting telemetry for cloud-native software.
* Works with .NET using the .NET metric APIs.
* Is endorsed by Azure Monitor and many APM vendors.

Starting in ASP.NET Core 11, the framework's built-in HTTP server metrics and traces comply with the required parts of the OpenTelemetry HTTP server semantic conventions. The HTTP server request activity emits these attributes by default, matching the built-in metrics. As a result, the `OpenTelemetry.Instrumentation.AspNetCore` NuGet package is optional for collecting HTTP server metrics and traces. The sample in this article uses only the built-in meters (`Microsoft.AspNetCore.Hosting` and `Microsoft.AspNetCore.Server.Kestrel`) and doesn't reference the instrumentation package. For the list of built-in instruments and their attributes, see ASP.NET Core built-in HTTP metrics.

Although the package is optional, it isn't a drop-in equivalent of the built-in instrumentation. The built-in instrumentation covers only the *required* parts of the semantic conventions. Consider the following differences before you remove the package:

* Some *recommended* HTTP server attributes aren't emitted by the built-in instrumentation, such as certain client and network attributes (for example, `client.address`). Full support for the *conditionally required* `url.query` attribute, including redaction, is also still in progress. If you rely on these attributes, keep the package. For more information, see dotnet/aspnetcore#65873.
* The package is also a convenience for enabling telemetry beyond the HTTP server, including Blazor and SignalR. For tracing, it registers extra activity sources for SignalR (`Microsoft.AspNetCore.SignalR.Server` on .NET 9 and later) and Blazor (`Microsoft.AspNetCore.Components` and `Microsoft.AspNetCore.Components.Server.Circuits` on .NET 10 and later). For metrics, it enables the related built-in meters (such as `Microsoft.AspNetCore.Components`). Without the package, register the sources with `AddSource` and the meters with `AddMeter` yourself to collect the same telemetry.

When you add telemetry to an app that only needs HTTP server metrics and traces, you can rely on the built-in instrumentation and omit the package. When you upgrade an existing app from .NET 10 to .NET 11 that already references the package, keep it if you depend on the attributes, sources, or meters described in the preceding list. Removing the package silently drops that telemetry.

> **Important:**
> When you enable OpenTelemetry *tracing* (in addition to metrics) without the `OpenTelemetry.Instrumentation.AspNetCore` package, register the framework's HTTP server `System.Diagnostics.ActivitySource` so that the request activity is recorded. ASP.NET Core's HTTP server activity source is named `Microsoft.AspNetCore`, and the framework creates a request activity named `Microsoft.AspNetCore.Hosting.HttpRequestIn` for each request to propagate trace context. If the `Microsoft.AspNetCore` source isn't registered with the OpenTelemetry SDK, the request activity isn't recorded, and the default `ParentBased` sampler silently drops any custom child spans started during the request.

In your existing tracing pipeline, register the source explicitly:

```csharp
builder.Services.AddOpenTelemetry()
    .WithTracing(tracing => tracing
        .AddSource("Microsoft.AspNetCore")
        .AddSource("MyApp"));
```

In the preceding example:

* `AddSource("Microsoft.AspNetCore")` registers ASP.NET Core's HTTP server activity source so the request activity is recorded.
* `AddSource("MyApp")` registers the app's own `System.Diagnostics.ActivitySource`. Replace `MyApp` with the name your app uses.
* An exporter isn't shown. This example assumes an exporter is already configured in your tracing pipeline.

Alternatively, call `AddAspNetCoreInstrumentation()` from the `OpenTelemetry.Instrumentation.AspNetCore` package, which registers the source for you.

To prevent ASP.NET Core from adding OpenTelemetry HTTP semantic-convention attributes to the built-in request activity, set the `Microsoft.AspNetCore.Hosting.SuppressActivityOpenTelemetryData` `System.AppContext` switch to `true` early in app startup:

```csharp
AppContext.SetSwitch(
    "Microsoft.AspNetCore.Hosting.SuppressActivityOpenTelemetryData", true);
```

The switch only suppresses the OpenTelemetry attributes that ASP.NET Core adds to the activity. It doesn't disable activity creation, tracing propagation, or metrics collection.

This tutorial shows one of the integrations available for OpenTelemetry metrics using the OSS Prometheus and Grafana projects. The metrics data flow:

1. The ASP.NET Core metric APIs record measurements from the example app.
1. The OpenTelemetry .NET library running in the app aggregates the measurements.
1. The Prometheus exporter library makes the aggregated data available via an HTTP metrics endpoint. 'Exporter' is what OpenTelemetry calls the libraries that transmit telemetry to vendor-specific backends.
1. A Prometheus server:

   * Polls the metrics endpoint.
   * Reads the data.
   * Stores the data in a database for long-term persistence. Prometheus refers to reading and storing data as *scraping* an endpoint.
   * Can run on a different machine.

1. The Grafana server:

   * Queries the data stored in Prometheus and displays it on a web-based monitoring dashboard.
   * Can run on a different machine.

### View metrics from sample app

Go to the sample app. The browser shows `Hello OpenTelemetry! ticks:<3digits>` where `3digits` are the last three digits of the current DateTime.Ticks.

Append `/metrics` to the URL to view the metrics endpoint. The browser displays the metrics being collected:

### Set up and configure Prometheus

Follow the Prometheus first steps to set up a Prometheus server and confirm it's working.

Modify the *prometheus.yml* configuration file so that Prometheus scrapes the metrics endpoint that the example app exposes. Add the following highlighted text in the `scrape_configs` section:

```yaml
# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "prometheus"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9090"]

  - job_name: 'MyASPNETApp'
    scrape_interval: 5s # Poll every 5 seconds for a more responsive demo.
    static_configs:
      - targets: ["localhost:5045"]  ## Enter the HTTP port number of the demo app.
```
In the preceding highlighted YAML, replace `5045` with the port number that the example app uses.

#### Start Prometheus

1. Reload the configuration or restart the Prometheus server.
1. Confirm that OpenTelemetryTest is in the UP state in the **Status** > **Targets** page of the Prometheus web portal.

Select the **Open metric explorer** icon to see available metrics:

Enter a counter category such as `http_` in the **Expression** input box to see the available metrics:

Alternatively, enter a counter category such as `kestrel` in the **Expression** input box to see the available metrics:

### Show metrics on a Grafana dashboard

* Follow the installation instructions to install Grafana and connect it to a Prometheus data source.

* Follow Creating a Prometheus graph. Alternatively, pre-built dashboards for .NET metrics are available to download at .NET team dashboards @ grafana.com. Downloaded dashboard JSON can be imported into Grafana.

## Test metrics in ASP.NET Core apps

You can test metrics in ASP.NET Core apps. One way to do this is to collect and assert metrics values in ASP.NET Core integration tests by using `Microsoft.Extensions.Diagnostics.Metrics.Testing.MetricCollector`1`.

```csharp
public class BasicTests : IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;
    public BasicTests(WebApplicationFactory<Program> factory) => _factory = factory;

    [Fact]
    public async Task Get_RequestCounterIncreased()
    {
        // Arrange
        var client = _factory.CreateClient();
        var meterFactory = _factory.Services.GetRequiredService<IMeterFactory>();
        var collector = new MetricCollector<double>(meterFactory,
            "Microsoft.AspNetCore.Hosting", "http.server.request.duration");

        // Act
        var response = await client.GetAsync("/");

        // Assert
        Assert.Contains("Hello OpenTelemetry!", await response.Content.ReadAsStringAsync());

        await collector.WaitForMeasurementsAsync(minCount: 1).WaitAsync(TimeSpan.FromSeconds(5));
        Assert.Collection(collector.GetMeasurementSnapshot(),
            measurement =>
            {
                Assert.Equal("http", measurement.Tags["url.scheme"]);
                Assert.Equal("GET", measurement.Tags["http.request.method"]);
                Assert.Equal("/", measurement.Tags["http.route"]);
            });
    }
}
```
The preceding test:

* Bootstraps a web app in memory with `Microsoft.AspNetCore.Mvc.Testing.WebApplicationFactory`1`. `Program` in the factory's generic argument specifies the web app.
* Collects metrics values with `Microsoft.Extensions.Diagnostics.Metrics.Testing.MetricCollector`1`
  * Requires a package reference to `Microsoft.Extensions.Diagnostics.Testing`.
  * The `MetricCollector<T>` is created using the web app's `System.Diagnostics.Metrics.IMeterFactory`. This allows the collector to only report metrics values recorded by test.
  * Includes the meter name, `Microsoft.AspNetCore.Hosting`, and counter name, `http.server.request.duration` to collect.
* Makes an HTTP request to the web app.
* Asserts the test by using results from the metrics collector.

## ASP.NET Core Identity metrics

ASP.NET Core Identity observability helps you monitor user management activities and authentication processes.

The metrics are in the `Microsoft.AspNetCore.Identity` meter and are described in the following sections.

### User management metrics

* `aspnetcore.identity.user.create.duration` measures the duration of user creation operations.
* `aspnetcore.identity.user.update.duration` measures the duration of user update operations.
* `aspnetcore.identity.user.delete.duration` measures the duration of user deletion operations.
* `aspnetcore.identity.user.check_password_attempts` counts password verification attempts.
* `aspnetcore.identity.user.generated_tokens` counts tokens generated for users, such as password reset tokens.
* `aspnetcore.identity.user.verify_token_attempts` counts token verification attempts.

### Authentication metrics

* `aspnetcore.identity.sign_in.authenticate.duration` measures the duration of authentication operations.
* `aspnetcore.identity.sign_in.check_password_attempts` counts password check attempts during sign-in.
* `aspnetcore.identity.sign_in.sign_ins` counts successful sign-ins.
* `aspnetcore.identity.sign_in.sign_outs` counts sign-outs.
* `aspnetcore.identity.sign_in.two_factor_clients_remembered` counts remembered two-factor clients.
* `aspnetcore.identity.sign_in.two_factor_clients_forgotten` counts forgotten two-factor clients.

Use these metrics to:

* Monitor user registration and management.
* Track authentication patterns and potential security issues.
* Measure performance of Identity operations.
* Observe two-factor authentication usage.

### Viewing Identity metrics

Use `dotnet-counters` to view these metrics and monitor them in real-time. Or, export them to Prometheus and visualize them in Grafana by using the techniques described earlier in this article.

For example, to monitor all Identity metrics with `dotnet-counters`:

```dotnetcli
dotnet-counters monitor -n YourAppName --counters Microsoft.AspNetCore.Identity
```

## ASP.NET Core meters and counters

For a list of ASP.NET Core meters and counters, see ASP.NET Core metrics. In ASP.NET Core 11 and later, the built-in HTTP server meters (for example, `Microsoft.AspNetCore.Hosting` and `Microsoft.AspNetCore.Server.Kestrel`) emit data that conforms to the required parts of the OpenTelemetry HTTP server semantic conventions. You can consume these meters with the OpenTelemetry SDK without the `OpenTelemetry.Instrumentation.AspNetCore` package.

## Additional resources

* Aspire dashboard overview
* Explore Aspire telemetry
* ASP.NET Core built-in metrics
