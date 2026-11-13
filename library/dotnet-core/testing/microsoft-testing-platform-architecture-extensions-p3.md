---
title: "Build extensions for Microsoft.Testing.Platform (MTP) (part 3 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-extensions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build extensions for Microsoft.Testing.Platform (MTP) (part 3 of 6)

### The `IDataConsumer` extensions

The `IDataConsumer` is an *in-process* extension capable of subscribing to and receiving `IData` information that is published to the IMessageBus by the testing framework and its extensions.

*This extension point is crucial as it enables developers to gather and process all the information generated during a test session.*

To register a custom `IDataConsumer`, utilize the following api:

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);

// ...

builder.TestHost.AddDataConsumer(
    static serviceProvider => new CustomDataConsumer());
```

The factory utilizes the IServiceProvider to gain access to the suite of services offered by the testing platform.

> **Important:**
> The sequence of registration is significant, as the APIs are called in the order they were registered.

The `IDataConsumer` interface includes the following methods:

```csharp
public interface IDataConsumer : IExtension
{
    Type[] DataTypesConsumed { get; }

    Task ConsumeAsync(
        IDataProducer dataProducer,
        IData value,
        CancellationToken <example-value>);
}

public interface IData
{
    string DisplayName { get; }
    string? Description { get; }
}
```

> **Important:**
> In MTP 2.0.0, `IDataConsumer` moved to the `Microsoft.Testing.Platform.Extensions` namespace and now extends `IExtension` directly. In MTP 1.x, it extended `ITestHostExtension`. You still register it with `builder.TestHost.AddDataConsumer(...)`. For more information, see Migrate from Microsoft.Testing.Platform (MTP) v1 to v2.

The `IDataConsumer` inherits from IExtension. Therefore, like any other extension, you can choose to enable or disable it using the `IExtension.IsEnabledAsync` API.

`DataTypesConsumed`: This property returns a list of `Type` that this extension plans to consume. It corresponds to `IDataProducer.DataTypesProduced`. Notably, an `IDataConsumer` can subscribe to multiple types originating from different `IDataProducer` instances without any issues.

`ConsumeAsync`: This method is triggered whenever data of a type to which the current consumer is subscribed is published to the `IMessageBus`. It receives the `IDataProducer` to provide details about the data payload's producer, as well as the `IData` payload itself. As you can see, `IData` is a generic placeholder interface that contains general informative data. The ability to publish different types of `IData` implies that the consumer needs to *switch* on the type itself to cast it to the correct type and access the specific information.

> **Important:**
> The message bus doesn't invoke an `IDataConsumer` for data from an `IDataProducer` whose `IExtension.Uid` matches the consumer's `IExtension.Uid`. If an extension both publishes and subscribes to message bus data, assign distinct UIDs to its producer and consumer registrations. To process data that the extension produces itself, call the processing logic directly instead of routing the data through the message bus.

A sample implementation of a consumer that wants to elaborate the `TestNodeUpdateMessage` produced by a testing framework could be:

```csharp
internal class CustomDataConsumer : IDataConsumer, IOutputDeviceDataProducer
{
    public Type[] DataTypesConsumed => new[] { typeof(TestNodeUpdateMessage) };
    ...
    public Task ConsumeAsync(
        IDataProducer dataProducer,
        IData value,
        CancellationToken <example-value>)
    {
        var testNodeUpdateMessage = (TestNodeUpdateMessage)value;

        switch (testNodeUpdateMessage.TestNode.Properties.Single<TestNodeStateProperty>())
        {
            case InProgressTestNodeStateProperty _:
                {
                    ...
                    break;
                }
            case PassedTestNodeStateProperty _:
                {
                    ...
                    break;
                }
            case FailedTestNodeStateProperty failedTestNodeStateProperty:
                {
                    ...
                    break;
                }
            case SkippedTestNodeStateProperty _:
                {
                    ...
                    break;
                }
            ...
        }

        return Task.CompletedTask;
    }
...
}
```

Finally, the API takes a `CancellationToken` which the extension is expected to honor.

> **Important:**
> Process the payload directly within the `ConsumeAsync` method. A regular `IDataConsumer` consumes data asynchronously: the IMessageBus queues each published payload and processes it on a background loop, so `IMessageBus.PublishAsync` doesn't block the producer, and there's no guarantee about when `ConsumeAsync` runs relative to the producer continuing its work. The platform serializes delivery so that only one payload is processed at a time per consumer, which eliminates the need for complex synchronization within a single consumer.

> **Note:**
> For scenarios that need a guarantee that consumption happens before the producer proceeds (for example, before a test starts running), MTP 2.3.0 introduced the experimental `IBlockingDataConsumer` marker interface (requires the `TPEXP` diagnostic to be suppressed). A consumer that also implements `IBlockingDataConsumer` is invoked *inline* by the message bus: calls are serialized, `PublishAsync` blocks until `ConsumeAsync` completes, and any exception thrown by `ConsumeAsync` propagates back to the producer that published the data. The message bus skips delivering a producer's data back to that same producer (same UID), so publishing under your own UID is safe. However, a blocking consumer must not, from within `ConsumeAsync`, publish data that is routed back to itself under a *different* producer UID, because that reentrancy would deadlock.

> **Warning:**
> When using `IDataConsumer` in conjunction with ITestSessionLifetimeHandler within a composite extension point, **it's crucial to disregard any data received post the execution of ITestSessionLifetimeHandler.OnTestSessionFinishingAsync**. The `OnTestSessionFinishingAsync` is the final opportunity to process accumulated data and transmit new information to the IMessageBus, hence, any data consumed beyond this point will not be *utilizable* by the extension.

If your extension requires intensive initialization and you need to use the async/await pattern, you can refer to the `Async extension initialization and cleanup`. If you need to *share state* between extension points, you can refer to the `CompositeExtensionFactory<T>` section.

### Message bus file artifacts

A custom `IData` payload has no automatic UI or command-line output. The platform only surfaces data for which a matching consumer is registered, so if you publish your own `IData` type and nothing consumes it, nothing is printed or forwarded. To make files that your extension produces visible to users and tooling, publish one of the built-in file artifact messages, which the built-in *terminal* and *dotnet test* consumers already recognize.

For run-level or session-level files, publish a `FileArtifact` or a `SessionFileArtifact`. Both were introduced in MTP 1.0.0 and live in the `Microsoft.Testing.Platform.Extensions.Messages` namespace:

- `FileArtifact` is unscoped. Use it for a file that isn't tied to a specific test session.
- `SessionFileArtifact` is scoped to a run/session through its `SessionUid`. Use it for artifacts produced for the run as a whole, such as coverage results, reports, dumps, or recorded videos.

The built-in terminal and `dotnet test` consumers pick up both types and print or forward the file paths, so the files become discoverable in the console output and across the `dotnet test` pipe. Because consumers control the ultimate presentation, keep each file on disk and available for as long as it might be consumed or forwarded; don't delete it inside the same `PublishAsync` call.

The artifact object itself carries no producer identity. The message bus supplies the originating `IDataProducer` to each consumer through the `dataProducer` argument of `IDataConsumer.ConsumeAsync`, so consumers learn who produced a file from that argument, not from the artifact. The message bus also doesn't take ownership of, move, or delete the referenced file: the producer owns the file's lifetime, and consumers only receive, read, or forward its path.

> **Note:**
> Third-party `IDataConsumer` registration is public only on `builder.TestHost` (the *in-process* test host). There's no public `builder.TestHostControllers.AddDataConsumer` API for *out-of-process* consumers. The first-party report extensions that display artifacts use internal platform integration that custom extensions can't rely on. To surface files from your own extension, publish the built-in artifact messages described here and let the built-in consumers present them.

A producer that publishes a session artifact must implement `IDataProducer` and list the exact runtime message types it publishes in `DataTypesProduced`. The following example publishes a coverage report when the session finishes:

```csharp
internal sealed class CoverageReportProducer(IMessageBus messageBus)
    : IDataProducer, ITestSessionLifetimeHandler
{
    public string Uid => nameof(CoverageReportProducer);
    public string Version => "1.0.0";
    public string DisplayName => "Coverage report producer";
    public string Description => "Publishes the coverage report as a session artifact.";

    // List the exact runtime message types this producer publishes.
    public Type[] DataTypesProduced => new[] { typeof(SessionFileArtifact) };

    public Task<bool> IsEnabledAsync() => Task.FromResult(true);

    public Task OnTestSessionStartingAsync(ITestSessionContext context)
        => Task.CompletedTask;

    public Task OnTestSessionFinishingAsync(ITestSessionContext context)
    {
        var report = new FileInfo("coverage.cobertura.xml");
        return messageBus.PublishAsync(
            this,
            new SessionFileArtifact(
                context.SessionUid,
                report,
                "Code coverage",
                "Cobertura coverage report for the run."));
    }
}
```

To attach a file to a *specific test* so that the terminal, `dotnet test`, and IDEs associate and display it with that test, don't publish a standalone file artifact. Instead, add one or more `FileArtifactProperty` entries to the `TestNode` that your testing framework reports through a `TestNodeUpdateMessage`. `FileArtifactProperty` was introduced in MTP 1.7.0:

```csharp
var testNode = new TestNode
{
    Uid = testUid,
    DisplayName = testDisplayName,
    Properties = new PropertyBag(
        PassedTestNodeStateProperty.CachedInstance,
        new FileArtifactProperty(
            new FileInfo("screenshot.png"),
            "Failure screenshot",
            "Screenshot captured while the test ran.")),
};

await messageBus.PublishAsync(
    dataProducer,
    new TestNodeUpdateMessage(sessionUid, testNode));
```

> **Important:**
> `TestNodeFileArtifact` is obsolete and was removed in MTP 2.0.0. To attach test-level files, use `FileArtifactProperty` on the `TestNode`. For more information, see Migrate from Microsoft.Testing.Platform (MTP) v1 to v2.

> **Note:**
> MTP 2.4.0 adds an experimental `kind` constructor overload and `Kind` property to `FileArtifact` and `SessionFileArtifact` (requires the `TPEXP` diagnostic to be suppressed). `Kind` is a producer-asserted, reverse-DNS identifier of the artifact *format* (for example, `microsoft.testing.trx`, `microsoft.testing.junit`, `microsoft.testing.ctrf`, or `microsoft.testing.html`) that post-processing uses to group artifacts of the same format. Leave it `null` or omit it when the producer doesn't declare a known kind.
>
> ```csharp
> #pragma warning disable TPEXP // Experimental API.
> new SessionFileArtifact(
>     context.SessionUid,
>     trxFile,
>     "TRX report",
>     "Test results in TRX format.",
>     kind: "microsoft.testing.trx");
> #pragma warning restore TPEXP
> ```
