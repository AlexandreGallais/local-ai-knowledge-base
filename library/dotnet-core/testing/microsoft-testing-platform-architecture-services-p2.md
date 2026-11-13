---
title: "Microsoft.Testing.Platform services overview (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-services.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform services overview (part 2 of 2)

## The `IMessageBus` service

The message bus service is the central mechanism that facilitates information exchange between the test framework and its extensions.

The message bus of the testing platform employs the _publish-subscribe pattern_.

The overarching structure of the shared bus is as follows:

As illustrated in the diagram, which includes an extensions and a test framework, there are two potential actions: pushing information to the bus or consuming information from the bus.

The `IMessageBus` satisfied the *pushing action* to the bus and the API is:

```csharp
public interface IMessageBus
{
    Task PublishAsync(
        IDataProducer dataProducer, 
        IData data);
}

public interface IDataProducer : IExtension
{
    Type[] DataTypesProduced { get; }
}

public interface IData
{
    string DisplayName { get; }
    string? Description { get; }
}
```

Consider the following details about the parameters:

* `IDataProducer`: The `IDataProducer` communicates to the message bus the `Type` of information it can supply and establishes ownership through inheritance from the base interface IExtension. This implies that you can't indiscriminately push data to the message bus; you must declare the data type produced in advance. If you push unexpected data, an exception will be triggered.

* `IData`: This interface serves as a placeholder where you only need to provide descriptive details such as the name and a description. The interface doesn't reveal much about the data's nature, which is intentional. It implies that the test framework and extensions can push any type of data to the bus, and this data can be consumed by any registered extension or the test framework itself.

This approach facilitates the evolution of the information exchange process, preventing breaking changes when an extension is unfamiliar with new data. **It allows different versions of extensions and the test framework to operate in harmony, based on their mutual understanding**.

The opposite end of the bus is referred to as a consumer, which is subscribed to a specific type of data and can thus consume it.

> **Important:**
> Always use *await* the call to `PublishAsync`. If you don't, the `IData` might not be processed correctly by the testing platform and extensions, which could lead to subtle bugs. It's only after you've returned from the *await* that you can be assured that the `IData` has been queued for processing on the message bus. Regardless of the extension point you're working on, ensure that you've awaited all `PublishAsync` calls before exiting the extension. For example, if you're implementing the `testing framework`, you should not call `Complete` on the requests until you've awaited all `PublishAsync` calls for that specific request.

## The `ITestCoverageCapabilities` service

Starting with MTP 2.4, retrieve `ITestCoverageCapabilities` from `IServiceProvider` to discover coverage-message support. The service exposes:

- `SupportsTestCoverageMessages`, which indicates support for the platform's coverage-message contract.
- `EnabledProducerUids`, a snapshot of enabled producer UIDs that declare at least one of `TestCoverageMessage`, `TestCoverageThresholdMessage`, or `TestCoverageReportMessage`.

Read the producer list from a session lifecycle callback after extension construction, not from a registration factory or constructor. An enabled producer declares support; the list doesn't guarantee that the producer has already published measurements. An empty list doesn't mean the platform lacks coverage-message support.

In MTP 2.5 or later, retrieve the service with `serviceProvider.GetRequiredPlatformService<ITestCoverageCapabilities>()`. In MTP 2.4, use `GetRequiredService<ITestCoverageCapabilities>()` from `Microsoft.Testing.Platform.Services`.

For a runnable producer and consumer example, see Publish coverage results.

## The `ITestCoverageResult` service

Starting with MTP 2.4, `ITestCoverageResult` provides the platform's correlated coverage data. Retrieve the service from `IServiceProvider` and use the following members:

| Member | Purpose |
|---|---|
| `GetOverall(sessionUid)` | Returns the session's reported overall summary, or `null` if none exists. |
| `Scopes` | Returns `CoverageScopeSummary` entries with their session, scope, and metrics. |
| `Thresholds` | Returns the reported threshold evaluations, including passed and failed evaluations. |
| `Reports` | Returns coverage report references and their formats and producer IDs. |
| `HasThresholdFailure` | Indicates whether any reported threshold failed. |

A measurement's correlation key includes the session, producer, scope, metric, and custom metric name when applicable. A later measurement with the same key replaces the previous value; MTP doesn't sum duplicate messages. Different producers remain separate even when they report the same metric and scope.

`CoverageScopeSummary.Metrics` preserves each metric's `ProducerId`. The convenience indexer, such as `summary[CoverageMetric.Line]`, returns the first matching producer's result. To select a particular collector, inspect `Metrics` and match `ProducerId`. Use `GetCustom(name)` for custom metrics instead of the indexer.

An absent summary means no matching measurement was reported. A result with `HasCoverableData` set to `false` means the collector reported zero coverable units. Don't replace either case with a successful 100-percent result.

Because the message bus processes data asynchronously, don't read the service immediately after `PublishAsync` and assume that the new message is present. For an end-of-run result, read after the session has finished, as the coverage example does in `ITestHostApplicationLifetime.AfterRunAsync`.

## The `IClientInfo` service

To identify the client that drives a test application, call `serviceProvider.GetClientInfo()` while a test request or session is active. In server mode, the initialize handshake establishes this information. The experimental `IClientInfo` service exposes `Id`, `Version`, and `Capabilities`. Starting with MTP 2.4, `Capabilities` provides an `IClientCapabilities` value with the client's declared statefulness.

A stateful client retains an addressable set of test nodes for the session and keeps each node's last-known state until an update replaces it. A stateless client consumes updates without retaining that state. The distinction doesn't describe connection lifetime or whether the server accepts multiple requests.

Use `clientInfo.Capabilities.IsStateful` for a conservative Boolean result: an undeclared capability returns `false`. To distinguish an explicit `false` from an undeclared capability, use `ClientCapabilitiesExtensions.GetIsStateful()` in MTP 2.4.1 or later:

| Result | Meaning |
|---|---|
| `true` | The client explicitly declares retained test-node state. |
| `false` | The client explicitly declares stateless behavior. |
| `null` | The platform-provided service has no declaration from the client. |

For a custom `IClientCapabilities` implementation, `GetIsStateful()` returns its `IsStateful` value. To declare the capability from an editor or tool, see Declare client statefulness.

> **Important:**
> `IClientInfo`, `IClientCapabilities`, `GetClientInfo`, and `ClientCapabilitiesExtensions` are experimental and use the `TPEXP` diagnostic ID. Their presence in a stable MTP package doesn't make the APIs stable.

## The `IOutputDevice` service

The testing platform encapsulates the idea of an *output device*, allowing the testing framework and extensions to *present* information by transmitting any kind of data to the currently utilized display system.

The most traditional example of an *output device* is the console output.

> **Note:**
> While the testing platform is engineered to support custom *output devices*, currently, this extension point is not available.

To transmit data to the *output device*, you must obtain the `IOutputDevice` from the `IServiceProvider`.

The API consists of:

```csharp
public interface IOutputDevice
{
    Task DisplayAsync(
        IOutputDeviceDataProducer producer,
        IOutputDeviceData data,
        CancellationToken cancellationToken);
}

public interface IOutputDeviceDataProducer : IExtension
{
}

public interface IOutputDeviceData
{
}
```

The `IOutputDeviceDataProducer` extends the `IExtension` and provides information about the sender to the *output device*.

The `IOutputDeviceData` serves as a placeholder interface. The concept behind `IOutputDevice` is to accommodate more intricate information than just colored text. For instance, it could be a complex object that can be graphically represented.

The testing platform, by default, offers a traditional colored text model for the `IOutputDeviceData` object:

```csharp
public class TextOutputDeviceData : IOutputDeviceData
{
    public TextOutputDeviceData(string text)
    public string Text { get; }
}

public sealed class FormattedTextOutputDeviceData : TextOutputDeviceData
{
    public FormattedTextOutputDeviceData(string text)
    public IColor? ForegroundColor { get; init; }
    public IColor? BackgroundColor { get; init; }
}

public sealed class SystemConsoleColor : IColor
{
    public ConsoleColor ConsoleColor { get; init; }
}
```

Here's an example of how you might use the colored text with the *active* output device:

```csharp
IServiceProvider provider = null; // Get the service provider...

var outputDevice = provider.GetOutputDevice();

await outputDevice.DisplayAsync(
    this,
    new FormattedTextOutputDeviceData($"TestingFramework version '{Version}' running tests with parallelism of {_dopValue}")
    {
        ForegroundColor = new SystemConsoleColor
        {
            ConsoleColor = ConsoleColor.Green
        }
    },
    CancellationToken.None);
```

Beyond the standard use of colored text, the main advantage of `IOutputDevice` and `IOutputDeviceData` is that the *output device* is entirely independent and unknown to the user. This allows for the development of complex user interfaces. For example, it's entirely feasible to implement a *real-time* web application that displays the progress of tests.

## The `IPlatformInformation` service

The experimental `IPlatformInformation` service provides the platform `Name`, optional `Version`, optional `CommitHash`, and optional `BuildDate`.
