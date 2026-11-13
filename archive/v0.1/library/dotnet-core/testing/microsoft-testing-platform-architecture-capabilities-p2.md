---
title: "Microsoft.Testing.Platform (MTP) capabilities overview (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-capabilities.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform (MTP) capabilities overview (part 2 of 2)

## Framework capabilities

The platform exposes a specialized interface named `ITestFrameworkCapability` that is the base of all capabilities exposed for test frameworks. These capabilities are provided when registering the test framework to the platform.

### `IBannerMessageOwnerCapability`

An optional test framework capability allows the test framework to provide the banner message to the platform. If the message is `null` or the capability isn't present, the platform uses its default banner message.

This capability implementation allows you to abstract away the various conditions that the test framework may need to consider when deciding whether or not the banner message should be displayed.

The platform exposes the `IPlatformInformation` service to provide some information about the platform that could be useful when building your custom banner message.

### `ITrxReportCapability`

To supply framework-specific metadata to the TRX report extension, implement `Microsoft.Testing.Extensions.TrxReport.Abstractions.ITrxReportCapability`. Reference the Microsoft.Testing.Extensions.TrxReport.Abstractions package from your framework. The test application also needs the Microsoft.Testing.Extensions.TrxReport package to create reports.

The capability separates support from activation:

- Return `true` from `IsSupported` when your framework can supply TRX metadata.
- In `Enable()`, record that the TRX reporter requested the metadata. The reporter calls this method at the start of a test session when TRX reports are enabled.
- After activation, add the TRX properties to the test nodes that your framework publishes.

The following capability stores the activation state. The example projects target .NET 10 and reference MTP 2.5.1:

```csharp
internal sealed class TrxCapability : ITrxReportCapability
{
    public bool IsSupported => true;
    public bool IsEnabled { get; private set; }

    public void Enable() => IsEnabled = true;
}
```
```vb
Friend NotInheritable Class TrxCapability
    Implements ITrxReportCapability

    Public ReadOnly Property IsSupported As Boolean Implements ITrxReportCapability.IsSupported
        Get
            Return True
        End Get
    End Property

    Public Property IsEnabled As Boolean
        Get
            Return _isEnabled
        End Get
        Private Set(value As Boolean)
            _isEnabled = value
        End Set
    End Property

    Private _isEnabled As Boolean

    Public Sub Enable() Implements ITrxReportCapability.Enable
        IsEnabled = True
    End Sub
End Class
```
Return the capability from the `capabilitiesFactory` that you pass to `RegisterTestFramework`. Give the framework the same capability instance so it can observe `Enable()`. For a manually composed test application, register the TRX provider after your framework and other extensions:

```csharp
var trxCapability = new TrxCapability();
var builder = await TestApplication.CreateBuilderAsync(args);
builder.RegisterTestFramework(
    _ => new TestFrameworkCapabilities(trxCapability),
    (_, _) => new ReportFramework(trxCapability));
builder.AddTrxReportProvider();
```
```vb
Dim trxCapability As New TrxCapability()
Dim builder = Await TestApplication.CreateBuilderAsync(args)
builder.RegisterTestFramework(
    Function(services) New TestFrameworkCapabilities(trxCapability),
    Function(capabilities, services) New ReportFramework(trxCapability))
builder.AddTrxReportProvider()
```
The abstraction package provides typed properties for `TestNode.Properties`:

| Property | Purpose |
|---|---|
| `TrxFullyQualifiedTypeNameProperty` | Supplies the fully qualified test class name. |
| `TrxCategoriesProperty` | Supplies the test's categories. |
| `TrxExceptionProperty` | Supplies the failure message and stack trace. |
| `TrxMessagesProperty` | Carries `StandardOutputTrxMessage`, `StandardErrorTrxMessage`, and `DebugOrTraceTrxMessage` entries. |
| `TrxTestDefinitionName` | Overrides the test definition name in the report. |
| `TrxWorkItemsProperty` | Supplies work-item identifiers. |

For example, enrich a result after your framework has determined the test outcome:

```csharp
if (trxCapability.IsEnabled)
{
    testNode.Properties.Add(
        new TrxFullyQualifiedTypeNameProperty("Contoso.CalculatorTests"));
    testNode.Properties.Add(new TrxCategoriesProperty(["Unit"]));
    testNode.Properties.Add(new TrxMessagesProperty(
        [new StandardOutputTrxMessage($"Captured output for {test.Name}.")]));
    if (failure is not null)
    {
        testNode.Properties.Add(
            new TrxExceptionProperty(failure.Message, failure.StackTrace));
    }
}
```
```vb
If _trxCapability.IsEnabled Then
    testNode.Properties.Add(
        New TrxFullyQualifiedTypeNameProperty("Contoso.CalculatorTests"))
    testNode.Properties.Add(New TrxCategoriesProperty({"Unit"}))
    testNode.Properties.Add(New TrxMessagesProperty(
        {New StandardOutputTrxMessage($"Captured output for {test.Name}.")}))
    If failure IsNot Nothing Then
        testNode.Properties.Add(
            New TrxExceptionProperty(failure.Message, failure.StackTrace))
    End If
End If
```
These properties supplement the required test-node state; they don't replace it. TRX-specific messages also don't replace the platform's `StandardOutputProperty` and `StandardErrorProperty`.

The complete sample contains one passing test and one intentionally failing test. With `--report-trx`, it writes both results and the enriched metadata to a TRX file, then returns exit code `2`. To run only the passing test, add `--filter-uid trx.pass`.

If the capability is absent or `IsSupported` is `false`, the TRX reporter warns that the framework doesn't support TRX enrichment. The reporter can still create a report from the available data, but framework-specific details might be missing. Don't advertise support unless your framework supplies the corresponding metadata.

### `IGracefulStopTestExecutionCapability`

To support `--maximum-failed-tests` in a custom test framework, implement `Microsoft.Testing.Platform.Capabilities.TestFramework.IGracefulStopTestExecutionCapability`. The capability is part of the Microsoft.Testing.Platform package and is available starting with MTP 1.5. Test authors who use a framework that already supports the option don't need to implement the capability.

The interface defines `Task StopTestExecutionAsync(CancellationToken <example-value>)`. When the failure count reaches the requested maximum, MTP calls this method. Your implementation must tell the framework to stop scheduling new tests while it allows tests that have already started to finish, run cleanup, and publish their results.

> **Important:**
> The capability and the `AddMaximumFailedTestsService` helper are experimental APIs that produce compiler diagnostic `TPEXP`. Their contracts can change or be removed. The example projects suppress `TPEXP` explicitly.

Follow these requirements when you implement the capability:

- Share stop state between the capability and the framework's test scheduler. Merely returning a completed task doesn't stop tests.
- Make stop requests thread-safe and idempotent. More than one platform component can request a stop.
- Return after you signal the stop. Don't wait for the entire run or the message bus to finish: MTP can call the method while it processes a test result, so that wait can deadlock.
- Keep graceful-stop state separate from request cancellation. Don'<example-value>'s cancellation token if your stop operation requires asynchronous work.
- After active tests finish, complete the normal request lifecycle, including result publication, cleanup, and the call to `ExecuteRequestContext.Complete()`.

The following implementation uses a thread-safe flag. In your framework, check `IsStopRequested` before you schedule each test and stop taking new work when the flag is `true`.

```csharp
public sealed class GracefulStopCapability : IGracefulStopTestExecutionCapability
{
    private int _stopRequested;

    public bool IsStopRequested => Volatile.Read(ref _stopRequested) != 0;

    public Task StopTestExecutionAsync(CancellationToken <example-value>)
    {
        cancellationToken.ThrowIfCancellationRequested();
        Interlocked.Exchange(ref _stopRequested, 1);
        return Task.CompletedTask;
    }
}
```
```vb
Public NotInheritable Class GracefulStopCapability
    Implements IGracefulStopTestExecutionCapability

    Private _stopRequested As Integer

    Public ReadOnly Property IsStopRequested As Boolean
        Get
            Return Volatile.Read(_stopRequested) <> 0
        End Get
    End Property

    Public Function StopTestExecutionAsync(cancellationToken As CancellationToken) As Task _
        Implements IGracefulStopTestExecutionCapability.StopTestExecutionAsync

        cancellationToken.ThrowIfCancellationRequested()
        Interlocked.Exchange(_stopRequested, 1)
        Return Task.CompletedTask
    End Function
End Class
```
Expose the capability through `ITestFrameworkCapabilities.Capabilities`. The registration example uses MTP's `TestFrameworkCapabilities` collection.

During test framework registration, pass the registered capability instance to your framework. The following helper accepts your framework factory and an `IExtension` that owns the command-line option. It also calls `AddMaximumFailedTestsService` from the `Microsoft.Testing.Platform.Helpers` namespace to register the `--maximum-failed-tests` option provider. Without that provider, MTP doesn't recognize the option.

```csharp
public static void Register(
    ITestApplicationBuilder builder,
    IExtension owner,
    Func<GracefulStopCapability, ITestFramework> createFramework)
{
    builder.RegisterTestFramework(
        _ => new TestFrameworkCapabilities(new GracefulStopCapability()),
        (capabilities, _) => createFramework(
            capabilities.Capabilities.OfType<GracefulStopCapability>().Single()));
    builder.AddMaximumFailedTestsService(owner);
}
```
```vb
Public Sub Register(
    builder As ITestApplicationBuilder,
    owner As IExtension,
    createFramework As Func(Of GracefulStopCapability, ITestFramework))

    builder.RegisterTestFramework(
        Function(services) New TestFrameworkCapabilities(New GracefulStopCapability()),
        Function(capabilities, services) createFramework(
            capabilities.Capabilities.OfType(Of GracefulStopCapability)().Single()))
    builder.AddMaximumFailedTestsService(owner)
End Sub
```
The capability factory creates fresh stop state, and the framework factory retrieves that same instance. Don't create a second, disconnected capability in your framework. For frameworks that support multiple run requests, keep stop state scoped to the corresponding execution. Don't clear an accepted stop request when execution starts.

MTP rejects `--maximum-failed-tests` during command-line validation if the option provider is registered but the framework doesn't expose this capability. When the failure threshold triggers a stop, MTP returns exit code `13`. The final failure count can exceed the threshold because result processing is asynchronous and tests might already be in progress.

For the interface contract, see the `IGracefulStopTestExecutionCapability` source.
