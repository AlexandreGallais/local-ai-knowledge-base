---
title: "Build a test framework for Microsoft.Testing.Platform (MTP) (part 4 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-test-framework.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build a test framework for Microsoft.Testing.Platform (MTP) (part 4 of 5)

### The `TestNodeUpdateMessage` data

As mentioned in the IMessageBus section, before utilizing the message bus, you must specify the type of data you intend to supply. The testing platform has defined a well-known type, `TestNodeUpdateMessage`, to represent the concept of a *test update information*.

This part of the document will explain how to utilize this payload data. Let's examine the surface:

```csharp
public sealed class TestNodeUpdateMessage(
    SessionUid sessionUid,
    TestNode testNode,
    TestNodeUid? parentTestNodeUid = null)
{
    public TestNode TestNode { get; }
    public TestNodeUid? ParentTestNodeUid { get; }
}

public class TestNode
{
    public required TestNodeUid Uid { get; init; }
    public required string DisplayName { get; init; }
    public PropertyBag Properties { get; init; } = new();
}

public sealed class TestNodeUid(string value);

public sealed partial class PropertyBag
{
    public PropertyBag();
    public PropertyBag(params IProperty[] properties);
    public PropertyBag(IEnumerable<IProperty> properties);
    public int Count { get; }
    public void Add(IProperty property);
    public bool Any<TProperty>();
    public TProperty? SingleOrDefault<TProperty>();
    public TProperty Single<TProperty>();
    public TProperty[] OfType<TProperty>();
    public IEnumerable<IProperty> AsEnumerable();
    public IEnumerator<IProperty> GetEnumerator();
    ...
}

public interface IProperty
{
}
```

* `TestNodeUpdateMessage`: The `TestNodeUpdateMessage` consists of two properties: a `TestNode` and a `ParentTestNodeUid`. The `ParentTestNodeUid` indicates that a test may have a parent test, introducing the concept of a **test tree** where `TestNode`s can be arranged in relation to each other. This structure allows for future enhancements and features based on the *tree* relationship between the nodes. If your test framework doesn't require a test tree structure, you can opt not to use it and simply set it to null, resulting in a straightforward flat list of `TestNode`s.

* `TestNode`: The `TestNode` is composed of three properties, one of which is the `Uid` of type `TestNodeUid`. This `Uid` serves as the **UNIQUE STABLE ID** for the node. The term **UNIQUE STABLE ID** implies that the same `TestNode` should maintain an **IDENTICAL** `Uid` across different runs and operating systems. The `TestNodeUid` is an **arbitrary opaque string** that the testing platform accepts as is.

> **Important:**
> The stability and uniqueness of the ID are crucial in the testing domain. They enable the precise targeting of a single test for execution and allow the ID to serve as a persistent identifier for a test, facilitating powerful extensions and features.

The second property is `DisplayName`, which is the human-friendly name for the test. For example, this name is displayed when you execute the `--list-tests` command line.

The third attribute is `Properties`, which is a `PropertyBag` type. As demonstrated in the code, this is a specialized property bag that holds generic properties about the `TestNodeUpdateMessage`. This implies that you can append any property to the node that implements the placeholder interface `IProperty`.

***The testing platform identifies specific properties added to a `TestNode.Properties` to determine whether a test has passed, failed, or been skipped.***

You can find the current list of available properties with the relative description in the section TestNodeUpdateMessage.TestNode.

The `PropertyBag` type is typically accessible in every `IData` and is utilized to store miscellaneous properties that can be queried by the platform and extensions. This mechanism allows us to enhance the platform with new information without introducing breaking changes. If a component recognizes the property, it can query it; otherwise, it will disregard it.

Finally this section makes clear that you test framework implementation needs to implement the `IDataProducer` that produces `TestNodeUpdateMessage`s like in the sample below:

```csharp
internal sealed class TestingFramework
    : ITestFramework, IDataProducer
{
   // ...

   public Type[] DataTypesProduced =>
   [
       typeof(TestNodeUpdateMessage)
   ];

   // ...
}
```

If your test adapter produces *files* during execution, the platform recognizes two distinct mechanisms, and the right one depends on whether the file belongs to a specific test or to the run as a whole. For details, see Message bus file artifacts.

- Run-level or session-level files are standalone bus messages: publish a `FileArtifact` (unscoped) or a `SessionFileArtifact` (scoped to the run through its `SessionUid`).
- Test-specific attachments aren't standalone messages. Add them as `FileArtifactProperty` entries on `TestNode.Properties` inside a `TestNodeUpdateMessage`, so the terminal, `dotnet test`, and IDEs associate each file with its test.

If you intend to publish a `SessionFileArtifact`, you must declare that runtime type to the platform in advance through `DataTypesProduced`, as shown below. Note that `FileArtifactProperty` isn't listed separately, because it travels inside a `TestNodeUpdateMessage` rather than as its own message type:

```csharp
internal sealed class TestingFramework
    : ITestFramework, IDataProducer
{
   // ...

   public Type[] DataTypesProduced =>
   [
       typeof(TestNodeUpdateMessage),
       typeof(SessionFileArtifact)
   ];

   // ...
}
```

#### Well-known properties

As detailed in the requests section, the testing platform identifies specific properties added to the `TestNodeUpdateMessage` to determine the status of a `TestNode` (for example, successful, failed, skipped, etc.). This allows the runtime to accurately display a list of failed tests with their corresponding information in the console, and to set the appropriate exit code for the test process.

As detailed in the requests section, the testing platform identifies specific properties added to the `TestNodeUpdateMessage` to determine the status of a `TestNode` (for example, successful, failed, and skipped). This allows the runtime to accurately display a list of failed tests with their corresponding information in the console, and to set the appropriate exit code for the test process.

This section describes the various well-known `IProperty` options and their respective implications.

For a comprehensive list of well-known properties, see TestNodeStateProperties.cs (and other `Property` types in the same directory). If you notice that a property description is missing, please file an issue.

These properties can be divided into the following categories:

1. *Generic information*: Properties that can be included in any kind of request.
1. *Discovery information*: Properties that are supplied during a `DiscoverTestExecutionRequest` discovery request.
1. *Execution information*: Properties that are supplied during a test execution request `RunTestExecutionRequest`.

Certain properties are **required**, while others are optional. The mandatory properties are required to provide basic testing functionality, such as reporting failed tests and indicating whether the entire test session was successful or not.

Optional properties, on the other hand, enhance the testing experience by providing additional information. They are particularly useful in IDE scenarios (like VS, VSCode, etc.), console runs, or when supporting specific extensions that require more detailed information to function correctly. However, these optional properties do not affect the execution of the tests.

> **Note:**
> Extensions are tasked with alerting and managing exceptions when they require specific information to operate correctly. If an extension lacks the necessary information, it should not cause the test execution to fail, but rather, it should simply opt-out.

##### Generic information

```csharp
public record struct LinePosition(
    int Line,
    int Column);

public record struct LinePositionSpan(
    LinePosition Start,
    LinePosition End);

public abstract record FileLocationProperty(
    string FilePath,
    LinePositionSpan LineSpan)
        : IProperty;

public sealed record TestFileLocationProperty(
    string FilePath,
    LinePositionSpan LineSpan)
        : FileLocationProperty(FilePath, LineSpan);
```

`TestFileLocationProperty` is used to pinpoint the location of the test within the source file. This is particularly useful when the initiator is an IDE like Visual Studio or Visual Studio Code.

```csharp
public sealed record TestMethodIdentifierProperty(
    string AssemblyFullName,
    string Namespace,
    string TypeName,
    string MethodName,
    string[] ParameterTypeFullNames,
    string ReturnTypeFullName)
```

`TestMethodIdentifierProperty` is a unique identifier for a test method.

To publish portable key-value metadata, create a `TestMetadataProperty` from `Microsoft.Testing.Platform.Extensions.Messages` and add it to `TestNode.Properties`:

```csharp
var metadata = new TestMetadataProperty("Environment", "Staging");
```

```vb
Dim metadata = New TestMetadataProperty("Environment", "Staging")
```

MTP exposes these properties as *traits* in JSON discovery output and server-mode updates. Arbitrary `IProperty` implementations remain available to in-process consumers but don't automatically serialize to external clients. The platform's internal `SerializableKeyValuePairStringProperty` type isn't a public extension point.

Starting with MTP 2.4, add `AssertionFailureProperty` to a failed test node to supply separate, preformatted expected and actual values. Report consumers can use these values to render a structured difference instead of parsing the failure message. At least one value must be non-`null`. Consumers prefer this property but can fall back to the legacy `assert.expected` and `assert.actual` entries in `System.Exception.Data`.

Starting with MTP 2.4, add `RetryAttemptProperty` to every update in an in-process retry sequence. `AttemptNumber` is one-based, and `IsSuperseded` marks an attempt that a later attempt replaces. TRX, JUnit, and the process exit code ignore superseded attempts, while the terminal, HTML, and CTRF consumers can preserve the full history. This property doesn't represent the out-of-process `--retry-failed-tests` attempts.

##### Captured test output

To associate captured text with a test, add `StandardOutputProperty` and `StandardErrorProperty` from `Microsoft.Testing.Platform.Extensions.Messages` to that test's `TestNode.Properties`. Publish the node through a `TestNodeUpdateMessage` with the same stable UID and session as the test result.

Your framework owns output capture and attribution, including isolation between parallel tests. MTP consumes the properties; it doesn't automatically capture arbitrary calls to `System.Console.WriteLine*`. The following example uses sample text in place of output captured by a real framework:

```csharp
var testNode = new TestNode
{
    Uid = uid,
    DisplayName = name,
    Properties = new PropertyBag(
        PassedTestNodeStateProperty.CachedInstance,
        new StandardOutputProperty($"Output from {name}."),
        new StandardErrorProperty($"Diagnostic from {name}."))
};

await context.MessageBus.PublishAsync(
    this, new TestNodeUpdateMessage(request.Session.SessionUid, testNode));
```
```vb
Dim testNode As New TestNode With {
    .Uid = uid,
    .DisplayName = name,
    .Properties = New PropertyBag(
        PassedTestNodeStateProperty.CachedInstance,
        New StandardOutputProperty($"Output from {name}."),
        New StandardErrorProperty($"Diagnostic from {name}."))
}

Await context.MessageBus.PublishAsync(
    Me, New TestNodeUpdateMessage(request.Session.SessionUid, testNode))
```
The terminal reporter uses these properties with `--show-stdout` and `--show-stderr`. A standard-error property doesn't make a test fail; the test's state property determines its outcome.

Keep per-test output separate from diagnostic logs and extension-level output through `IOutputDevice`. To include text in a TRX report, also supply the TRX-specific message properties. Don't assume every report consumer maps the same properties.

##### Discovery information

```csharp
public sealed record DiscoveredTestNodeStateProperty(
    string? Explanation = null)
{
    public static DiscoveredTestNodeStateProperty CachedInstance { get; }
}
```

The `DiscoveredTestNodeStateProperty` indicates that this TestNode has been discovered. It is utilized when a `DiscoverTestExecutionRequest` is sent to the test framework.
Take note of the handy cached value offered by the `CachedInstance` property.
This property is **required**.

##### Execution information

```csharp
public sealed record InProgressTestNodeStateProperty(
    string? Explanation = null)
{
    public static InProgressTestNodeStateProperty CachedInstance { get; }
}
```

The `InProgressTestNodeStateProperty` informs the testing platform that the `TestNode` has been scheduled for execution and is currently in progress.
Take note of the handy cached value offered by the `CachedInstance` property.

```csharp
public readonly record struct TimingInfo(
    DateTimeOffset StartTime,
    DateTimeOffset EndTime,
    TimeSpan Duration);

public sealed record StepTimingInfo(
    string Id,
    string Description,
    TimingInfo Timing);

public sealed record TimingProperty : IProperty
{
    public TimingProperty(TimingInfo globalTiming)
        : this(globalTiming, [])
    {
    }

    public TimingProperty(
        TimingInfo globalTiming,
        StepTimingInfo[] stepTimings)
    {
        GlobalTiming = globalTiming;
        StepTimings = stepTimings;
    }

    public TimingInfo GlobalTiming { get; }

    public StepTimingInfo[] StepTimings { get; }
}
```

The `TimingProperty` is utilized to relay timing details about the `TestNode` execution. It also allows for the timing of individual execution steps via `StepTimingInfo`. This is particularly useful when your test concept is divided into multiple phases such as initialization, execution, and cleanup.

***One and only one*** of the following properties is **required** per `TestNode` and communicates the result of the `TestNode` to the testing platform.

```csharp
public sealed record PassedTestNodeStateProperty(
    string? Explanation = null)
        : TestNodeStateProperty(Explanation)
{
    public static PassedTestNodeStateProperty CachedInstance
        { get; } = new PassedTestNodeStateProperty();
}
```

`PassedTestNodeStateProperty` informs the testing platform that this `TestNode` is passed.
Take note of the handy cached value offered by the `CachedInstance` property.

```csharp
public sealed record SkippedTestNodeStateProperty(
    string? Explanation = null)
        : TestNodeStateProperty(Explanation)
{
    public static SkippedTestNodeStateProperty CachedInstance
        { get; } =  new SkippedTestNodeStateProperty();
}
```
