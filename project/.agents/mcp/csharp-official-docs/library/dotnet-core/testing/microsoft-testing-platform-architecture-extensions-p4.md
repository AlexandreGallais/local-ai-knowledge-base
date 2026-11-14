---
title: "Build extensions for Microsoft.Testing.Platform (MTP) (part 4 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-architecture-extensions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Build extensions for Microsoft.Testing.Platform (MTP) (part 4 of 6)

### Publish coverage results

Starting with MTP 2.4, collectors can publish coverage results through stable contracts in `Microsoft.Testing.Platform.Extensions.Messages`. Use the contracts to share measurements with the terminal and compatible report consumers without requiring each consumer to parse a collector-specific file.

| Message | Purpose |
|---|---|
| `TestCoverageMessage` | Reports covered and coverable counts for one metric and scope. |
| `TestCoverageThresholdMessage` | Reports a threshold evaluation that the collector performed. |
| `TestCoverageReportMessage` | Identifies a report file, its format, and its producer for consumers that need detailed coverage data. |

Implement `IDataProducer` and declare the exact runtime types that your collector publishes in `DataTypesProduced`. The following example also publishes a `SessionFileArtifact` so users can find its report file:

```csharp
public Type[] DataTypesProduced =>
[
    typeof(TestCoverageMessage),
    typeof(TestCoverageThresholdMessage),
    typeof(TestCoverageReportMessage),
    typeof(SessionFileArtifact)
];
```
```vb
Public ReadOnly Property DataTypesProduced As Type() Implements IDataProducer.DataTypesProduced
    Get
        Return {
            GetType(TestCoverageMessage),
            GetType(TestCoverageThresholdMessage),
            GetType(TestCoverageReportMessage),
            GetType(SessionFileArtifact)
        }
    End Get
End Property
```
Use the same `SessionUid` and a stable, nonempty `ProducerId` across related measurements, thresholds, and reports. The example uses the extension's `Uid` as `ProducerId`. MTP keeps measurements from different producers separate.

Set `CoverageScope.Overall` for a whole-session measurement. Other scopes require a stable name, such as a module path or type name. Scope levels describe overlapping dimensions, not a parent-child tree. Use `CoverageMetric` to identify the units; for `CoverageMetric.Custom`, also supply `customMetricName`.

Publish counts that satisfy `0 <= coveredCount <= coverableCount`. The measurement derives `Percentage` from those counts. If `coverableCount` is zero, `HasCoverableData` is `false` and `Percentage` is zero. No coverable data isn't the same as measured zero-percent coverage.

The following sample publishes synthetic counts, evaluates a threshold, and references a custom JSON report. It demonstrates the message contract, not code instrumentation:

```csharp
var measurement = new TestCoverageMessage(
    context.SessionUid, CoverageScope.Overall, CoverageMetric.Line,
    _covered, _coverable, producerId: Uid);
await _messageBus.PublishAsync(this, measurement);

var threshold = new TestCoverageThresholdMessage(
    context.SessionUid, CoverageScope.Overall, CoverageMetric.Line,
    CoverageAggregation.None, measurement.Percentage, _required,
    measurement.HasCoverableData, producerId: Uid,
    treatNoDataAsFailure: _treatNoDataAsFailure);
await _messageBus.PublishAsync(this, threshold);

await _messageBus.PublishAsync(this, new TestCoverageReportMessage(
    context.SessionUid, report.FullName, CoverageReportFormat.Custom,
    producerId: Uid, customFormatName: "sample-json"));
await _messageBus.PublishAsync(this, new SessionFileArtifact(
    context.SessionUid, report, "Sample coverage", "Synthetic coverage counts."));
```
```vb
Dim measurement As New TestCoverageMessage(
    context.SessionUid, CoverageScope.Overall, CoverageMetric.Line,
    _covered, _coverable, producerId:=Uid)
Await _messageBus.PublishAsync(Me, measurement)

Dim threshold As New TestCoverageThresholdMessage(
    context.SessionUid, CoverageScope.Overall, CoverageMetric.Line,
    CoverageAggregation.None, measurement.Percentage, _required,
    measurement.HasCoverableData, producerId:=Uid,
    treatNoDataAsFailure:=_treatNoDataAsFailure)
Await _messageBus.PublishAsync(Me, threshold)

Await _messageBus.PublishAsync(Me, New TestCoverageReportMessage(
    context.SessionUid, report.FullName, CoverageReportFormat.Custom,
    producerId:=Uid, customFormatName:="sample-json"))
Await _messageBus.PublishAsync(Me, New SessionFileArtifact(
    context.SessionUid, report, "Sample coverage", "Synthetic coverage counts."))
```
For `CoverageAggregation.None`, omit `aggregatedOver`. For an aggregate evaluation, specify the population's scope level through `aggregatedOver`, such as `CoverageScopeLevel.Module`. The collector calculates `actualPercentage`; MTP doesn't infer the threshold or aggregate calculation from the measurement messages. Set `treatNoDataAsFailure` to choose the outcome when no coverable data exists. Its default is `true`.

Write a report before you publish its path, and keep the file available for consumers. `TestCoverageReportMessage` supplies a coverage-specific reference; `SessionFileArtifact` supplies the general file-artifact notification. Neither message transfers file ownership to MTP.

A failed threshold changes an otherwise successful run to exit code `14`. It doesn't replace an existing test or infrastructure failure.

#### Register the coverage extension

Register the collector for the session lifecycle so it publishes its results in `OnTestSessionFinishingAsync`. Register a separate report extension for the application lifecycle so it reads the platform's accumulated result in `AfterRunAsync`. The result service connects the two extensions without shared collector-specific state:

```csharp
builder.TestHost.AddTestSessionLifetimeHandler(
    services => new CoverageExtension(
        services.GetMessageBus(),
        services.GetConfiguration(),
        services.GetCommandLineOptions(),
        services.GetRequiredPlatformService<ITestCoverageCapabilities>(),
        services.GetOutputDevice()));
builder.TestHost.AddTestHostApplicationLifetime(
    services => new CoverageResultReporter(
        services.GetRequiredPlatformService<ITestCoverageResult>(),
        services.GetCommandLineOptions(),
        services.GetOutputDevice()));
```
```vb
builder.TestHost.AddTestSessionLifetimeHandler(
    Function(services) New CoverageExtension(
        services.GetMessageBus(),
        services.GetConfiguration(),
        services.GetCommandLineOptions(),
        services.GetRequiredPlatformService(Of ITestCoverageCapabilities)(),
        services.GetOutputDevice()))
builder.TestHost.AddTestHostApplicationLifetime(
    Function(services) New CoverageResultReporter(
        services.GetRequiredPlatformService(Of ITestCoverageResult)(),
        services.GetCommandLineOptions(),
        services.GetOutputDevice()))
```
The projects target .NET 10 and reference MTP 2.5.1. By default, the sample reports 8 covered lines out of 10, a 75-percent threshold, and a custom `sample-coverage.json` report. The sample disables collection and result output for `--list-tests`. To exercise a failed threshold, set `sampleCoverage:requiredPercentage` to `90` in a configuration file. Use `sampleCoverage:covered`, `sampleCoverage:coverable`, and `sampleCoverage:treatNoDataAsFailure` to exercise other count and no-data cases.

The collector validates these settings during construction so invalid counts or thresholds fail extension setup before test execution. The sample's manual entry point reports invalid settings on standard error and returns exit code `4`.

#### Consume coverage results

Use `ITestCoverageCapabilities` to check whether the platform supports the message contract and which enabled producers declare coverage messages. Read `EnabledProducerUids` after extension construction, such as in a session-start callback:

```csharp
public Task OnTestSessionStartingAsync(ITestSessionContext context)
    => _outputDevice.DisplayAsync(this, new TextOutputDeviceData(
        $"Coverage messages supported: {_capabilities.SupportsTestCoverageMessages}. " +
        $"Enabled producers: {string.Join(", ", _capabilities.EnabledProducerUids)}."),
        context.CancellationToken);
```
```vb
Public Function OnTestSessionStartingAsync(context As ITestSessionContext) As Task Implements ITestSessionLifetimeHandler.OnTestSessionStartingAsync
    Return _outputDevice.DisplayAsync(Me, New TextOutputDeviceData(
        $"Coverage messages supported: {_capabilities.SupportsTestCoverageMessages}. " &
        $"Enabled producers: {String.Join(", ", _capabilities.EnabledProducerUids)}."),
        context.CancellationToken)
End Function
```
For correlated data, use `ITestCoverageResult` rather than recomputing correlation from bus messages. Awaiting `PublishAsync` only queues a message; it doesn't guarantee that the result service has processed the message. In this sample, the application-end callback reads results after the session and its message-bus processing have finished:

```csharp
public async Task AfterRunAsync(int exitCode, CancellationToken <example-value>)
{
    foreach (CoverageScopeSummary scope in result.Scopes)
    {
        foreach (CoverageMetricResult metric in scope.Metrics)
        {
            string text = string.Create(CultureInfo.InvariantCulture,
                $"Coverage result: {metric.CoveredCount}/{metric.CoverableCount} " +
                $"{metric.Metric} ({metric.Percentage:F1}%). Producer: {metric.ProducerId}.");
            await outputDevice.DisplayAsync(
                this, new TextOutputDeviceData(text), cancellationToken);
        }
    }

    await outputDevice.DisplayAsync(this, new TextOutputDeviceData(
        $"Coverage threshold failure: {result.HasThresholdFailure}. " +
        $"Coverage reports: {result.Reports.Count}. Exit code: {exitCode}."),
        cancellationToken);
}
```
```vb
Public Async Function AfterRunAsync(exitCode As Integer, cancellationToken As CancellationToken) As Task Implements ITestHostApplicationLifetime.AfterRunAsync
    For Each scope In _result.Scopes
        For Each metric In scope.Metrics
            Dim percentage = metric.Percentage.ToString("F1", CultureInfo.InvariantCulture)
            Dim text = $"Coverage result: {metric.CoveredCount}/{metric.CoverableCount} " &
                $"{metric.Metric} ({percentage}%). Producer: {metric.ProducerId}."
            Await _outputDevice.DisplayAsync(
                Me, New TextOutputDeviceData(text), cancellationToken)
        Next
    Next

    Await _outputDevice.DisplayAsync(Me, New TextOutputDeviceData(
        $"Coverage threshold failure: {_result.HasThresholdFailure}. " &
        $"Coverage reports: {_result.Reports.Count}. Exit code: {exitCode}."),
        cancellationToken)
End Function
```
Consumers must distinguish an absent measurement from a measurement with no coverable data. Keep `ProducerId` when you present metrics from multiple collectors, and handle unknown enum values so newer collectors don't break your extension.

### The `IArtifactPostProcessor` extensions

Starting with MTP 2.4.0, the experimental `IArtifactPostProcessor` extension point processes artifacts after a `dotnet test` invocation runs multiple test modules or after a retry runs multiple attempts. The `ArtifactPostProcessingMode` value identifies whether the processor handles `TestModules` or `RetryAttempts`.

The built-in TRX, JUnit, CTRF, and HTML report extensions use this extension point to consolidate related report artifacts in a `merged` directory. HTML consolidation creates a merged summary and preserves the original per-process reports. To learn how report consolidation affects test output, see Report consolidation.

### The `ITestExecutionFilterProvider` extensions

Starting with MTP 2.4.0, the experimental `ITestExecutionFilterProvider` extension point lets an extension add a constraint to a discovery or run request before the test framework receives it. Register a provider factory with `AddTestExecutionFilterProvider`.

MTP combines the request filter and every provider filter with a logical AND. It intersects `TestNodeUidListFilter` values and uses `CompositeTestExecutionFilter` for other combinations. A test framework must understand each filter type that can reach it.

The provider receives a `TestExecutionFilterContext` that identifies whether the request is for discovery or execution and whether it came from the console or JSON-RPC server. Return `null` or `NopFilter` when the provider doesn't add a constraint. Provider constraints aren't supported for JSON-RPC server requests, so return `null` when the request origin is `Server`.

> **Important:**
> These APIs use the `TPEXP` diagnostic ID and might change in a future release.

### The `ITestHostExecutionOrchestratorMiddleware` extensions

Starting with MTP 2.5 preview, the experimental `ITestHostExecutionOrchestratorMiddleware` extension point wraps exactly one invocation of the configured test host orchestrator. Register middleware with `AddTestHostExecutionOrchestratorMiddleware`. Registration order is outermost-first.

Middleware can observe the invocation or short-circuit it, but it can't implement retries, stress loops, sharding, or multi-phase execution. The existing `--retry-failed-tests` orchestrator doesn't use this middleware API.

Follow these constraints:

- Invoke `next` at most once, and start the invocation before the middleware method returns or throws.
- When you invoke `next`, return its exact exit code, and propagate its exceptions and cancellation unchanged.
- When you short-circuit without invoking `next`, return a non-success exit code.
- Treat composition order as significant. Middleware effects aren't assumed to be commutative.

> **Important:**
> These APIs use the `TPEXP` diagnostic ID and might change or be removed in a future release.
