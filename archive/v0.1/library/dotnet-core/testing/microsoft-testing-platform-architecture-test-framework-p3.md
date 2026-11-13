---
title: "Build a test framework for Microsoft.Testing.Platform (MTP) (part 3 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-test-framework.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build a test framework for Microsoft.Testing.Platform (MTP) (part 3 of 5)

### Handling requests

The subsequent section provides a detailed description of the various requests that a test framework may receive and process.

Before proceeding to the next section, it's crucial to thoroughly comprehend the concept of the IMessageBus, which is the essential service for conveying test execution information to the testing platform.

#### TestSessionContext

The `TestSessionContext` is a shared property across all requests, providing information about the ongoing test session:

```csharp
public class TestSessionContext
{
    public SessionUid SessionUid { get; }
}

public readonly struct SessionUid(string value)
{
    public string Value { get; }
}
```

The `TestSessionContext` consists of the `SessionUid`, a unique identifier for the ongoing test session that aids in logging and correlating test session data.

#### DiscoverTestExecutionRequest

```csharp
public class DiscoverTestExecutionRequest
{
    public TestSessionContext Session { get; }
    public ITestExecutionFilter Filter { get; }
}
```

The `DiscoverTestExecutionRequest` instructs the test framework **to discover** the tests and communicate this information thought to the IMessageBus.

As outlined in the previous section, the property for a discovered test is `DiscoveredTestNodeStateProperty`. Here is a generic code snippet for reference:

```csharp
var testNode = new TestNode
{
    Uid = GenerateUniqueStableId(),
    DisplayName = GetDisplayName(),
    Properties = new PropertyBag(
        DiscoveredTestNodeStateProperty.CachedInstance),
};

await context.MessageBus.PublishAsync(
    this,
    new TestNodeUpdateMessage(
        discoverTestExecutionRequest.Session.SessionUid,
        testNode));

// ...
```

#### RunTestExecutionRequest

```csharp
public class RunTestExecutionRequest
{
    public TestSessionContext Session { get; }
    public ITestExecutionFilter Filter { get; }
}
```

The `RunTestExecutionRequest` instructs the test framework **to execute** the tests and communicate this information thought to the IMessageBus.

Here is a generic code snippet for reference:

```csharp
var skippedTestNode = new TestNode()
{
    Uid = GenerateUniqueStableId(),
    DisplayName = GetDisplayName(),
    Properties = new PropertyBag(
        SkippedTestNodeStateProperty.CachedInstance),
};

await context.MessageBus.PublishAsync(
    this,
    new TestNodeUpdateMessage(
        runTestExecutionRequest.Session.SessionUid,
        skippedTestNode));

// ...

var successfulTestNode = new TestNode()
{
    Uid = GenerateUniqueStableId(),
    DisplayName = GetDisplayName(),
    Properties = new PropertyBag(
        PassedTestNodeStateProperty.CachedInstance),
};

await context.MessageBus.PublishAsync(
    this,
    new TestNodeUpdateMessage(
        runTestExecutionRequest.Session.SessionUid,
        successfulTestNode));

// ...

var assertionFailedTestNode = new TestNode()
{
    Uid = GenerateUniqueStableId(),
    DisplayName = GetDisplayName(),
    Properties = new PropertyBag(
        new FailedTestNodeStateProperty(assertionException)),
};

await context.MessageBus.PublishAsync(
    this,
    new TestNodeUpdateMessage(
        runTestExecutionRequest.Session.SessionUid,
        assertionFailedTestNode));

// ...

var failedTestNode = new TestNode()
{
    Uid = GenerateUniqueStableId(),
    DisplayName = GetDisplayName(),
    Properties = new PropertyBag(
        new ErrorTestNodeStateProperty(ex.InnerException!)),
};

await context.MessageBus.PublishAsync(
    this,
    new TestNodeUpdateMessage(
        runTestExecutionRequest.Session.SessionUid,
        failedTestNode));
```

#### Honor request filters

To run only the tests that a user or tool selects, apply `TestExecutionRequest.Filter` to both discovery and execution. MTP passes the filter to your framework; the platform doesn't filter the tests that your framework publishes or executes.

The stable filter contracts in `Microsoft.Testing.Platform.Requests` include:

| Filter | Framework behavior |
|---|---|
| `NopFilter` | Apply no additional constraint. |
| `TestNodeUidListFilter` | Select only tests whose stable `TestNodeUid` appears in `TestNodeUids`. An empty array selects no tests. |

Compare UIDs as opaque, case-sensitive identifiers. Don't substitute a display name or a newly generated identifier. The platform uses UID filters for `--filter-uid`, targeted tool requests, and the retry extension.

The following helper handles these two filter types and rejects unsupported filters instead of silently executing the full suite:

```csharp
private static bool MatchesFilter(ITestExecutionFilter filter, TestNodeUid uid)
    => filter switch
    {
        NopFilter => true,
        TestNodeUidListFilter uidFilter => uidFilter.TestNodeUids.Any(
            candidate => string.Equals(candidate.Value, uid.Value, StringComparison.Ordinal)),
        _ => throw new NotSupportedException(
            $"Filter '{filter.GetType().FullName}' isn't supported.")
    };
```
```vb
Private Shared Function MatchesFilter(filter As ITestExecutionFilter, uid As TestNodeUid) As Boolean
    If TypeOf filter Is NopFilter Then
        Return True
    End If

    Dim uidFilter = TryCast(filter, TestNodeUidListFilter)
    If uidFilter IsNot Nothing Then
        Return uidFilter.TestNodeUids.Any(
            Function(candidate) String.Equals(candidate.Value, uid.Value, StringComparison.Ordinal))
    End If

    Throw New NotSupportedException($"Filter '{filter.GetType().FullName}' isn't supported.")
End Function
```
Use the helper before you publish a discovered node or execute a selected test. The following sample framework uses the same selection logic for both requests:

```csharp
public async Task ExecuteRequestAsync(ExecuteRequestContext context)
{
    if (context.Request is not DiscoverTestExecutionRequest
        and not RunTestExecutionRequest)
    {
        throw new NotSupportedException("The request type isn't supported.");
    }

    var request = (TestExecutionRequest)context.Request;
    foreach (var test in s_tests)
    {
        context.CancellationToken.ThrowIfCancellationRequested();
        var uid = new TestNodeUid(test.Uid);
        if (!MatchesFilter(request.Filter, uid))
        {
            continue;
        }

        if (request is DiscoverTestExecutionRequest)
        {
            await context.MessageBus.PublishAsync(this, new TestNodeUpdateMessage(
                request.Session.SessionUid,
                new TestNode
                {
                    Uid = uid,
                    DisplayName = test.Name,
                    Properties = new PropertyBag(DiscoveredTestNodeStateProperty.CachedInstance)
                }));
        }
        else
        {
            await PublishResultAsync(context, request, uid, test.Name);
        }
    }

    context.Complete();
}
```
```vb
Public Async Function ExecuteRequestAsync(context As ExecuteRequestContext) As Task Implements ITestFramework.ExecuteRequestAsync
    If Not TypeOf context.Request Is DiscoverTestExecutionRequest AndAlso
        Not TypeOf context.Request Is RunTestExecutionRequest Then
        Throw New NotSupportedException("The request type isn't supported.")
    End If

    Dim request = DirectCast(context.Request, TestExecutionRequest)
    For Each test In s_tests
        context.CancellationToken.ThrowIfCancellationRequested()
        Dim uid As New TestNodeUid(test.Uid)
        If Not MatchesFilter(request.Filter, uid) Then
            Continue For
        End If

        If TypeOf request Is DiscoverTestExecutionRequest Then
            Await context.MessageBus.PublishAsync(Me, New TestNodeUpdateMessage(
                request.Session.SessionUid,
                New TestNode With {
                    .Uid = uid,
                    .DisplayName = test.Name,
                    .Properties = New PropertyBag(DiscoveredTestNodeStateProperty.CachedInstance)
                }))
        Else
            Await PublishResultAsync(context, request, uid, test.Name)
        End If
    Next

    context.Complete()
End Function
```
When no tests match, complete the request without executing or publishing unselected tests. MTP applies its zero-tests or minimum-expected-tests policy.

> **Important:**
> `TreeNodeFilter` and `CompositeTestExecutionFilter` are experimental and use the `TPEXP` diagnostic ID. A framework that supports tree filters must evaluate the filter against its test tree and properties. A framework that uses filter providers must also evaluate every child of a composite filter. The helper in this example supports only `NopFilter` and `TestNodeUidListFilter`.

#### Canonical test execution

Starting with MTP 2.5 preview, call `ExecuteRequestContext.StartTestExecutionAsync` with an in-progress `TestNodeUpdateMessage` to start an experimental canonical `TestExecution`. The start method publishes the in-progress update and returns an object that keeps execution lifecycle, message ordering, and telemetry correlation together.

Use `Run` or `RunAsync` to invoke framework and test code in the canonical execution context. When OpenTelemetry is active, child activities created by the test remain under the same test execution activity.

Call `CompleteAsync` with the ordered result messages and the producer-observed execution end time. Every result must use the session, test UID, and parent UID from the start message. The last message is the final result. An empty collection publishes an execution-completed update without inventing an outcome.

Dispose an incomplete `TestExecution` to abandon it without publishing a result. After completion or disposal, the object rejects additional execution or completion calls.

> **Important:**
> `StartTestExecutionAsync` and `TestExecution` use the `TPEXP` diagnostic ID and might change or be removed in a future release.
