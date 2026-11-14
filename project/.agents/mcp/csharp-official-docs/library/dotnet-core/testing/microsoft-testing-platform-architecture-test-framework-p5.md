---
title: "Build a test framework for Microsoft.Testing.Platform (MTP) (part 5 of 5)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-architecture-test-framework.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Build a test framework for Microsoft.Testing.Platform (MTP) (part 5 of 5)

`SkippedTestNodeStateProperty` informs the testing platform that this `TestNode` was skipped.
Take note of the handy cached value offered by the `CachedInstance` property.

```csharp
public sealed record FailedTestNodeStateProperty : TestNodeStateProperty
{
    public FailedTestNodeStateProperty()
        : base(default(string))
    {
    }

    public FailedTestNodeStateProperty(string explanation)
        : base(explanation)
    {
    }

    public FailedTestNodeStateProperty(
        Exception exception,
        string? explanation = null)
        : base(explanation ?? exception.Message)
    {
        Exception = exception;
    }

    public Exception? Exception { get; }
}
```

`FailedTestNodeStateProperty` informs the testing platform that this `TestNode` is failed after an assertion.

```csharp
public sealed record ErrorTestNodeStateProperty : TestNodeStateProperty
{
    public ErrorTestNodeStateProperty()
        : base(default(string))
    {
    }

    public ErrorTestNodeStateProperty(string explanation)
        : base(explanation)
    {
    }

    public ErrorTestNodeStateProperty(
        Exception exception,
        string? explanation = null)
            : base(explanation ?? exception.Message)
    {
        Exception = exception;
    }

    public Exception? Exception { get; }
}
```

`ErrorTestNodeStateProperty` informs the testing platform that this `TestNode` has failed. This type of failure is different from the `FailedTestNodeStateProperty`, which is used for assertion failures. For example, you can report issues like test initialization errors with `ErrorTestNodeStateProperty`.

```csharp
public sealed record TimeoutTestNodeStateProperty : TestNodeStateProperty
{
    public TimeoutTestNodeStateProperty()
        : base(default(string))
    {
    }

    public TimeoutTestNodeStateProperty(string explanation)
        : base(explanation)
    {
    }

    public TimeoutTestNodeStateProperty(
        Exception exception,
        string? explanation = null)
            : base(explanation ?? exception.Message)
    {
        Exception = exception;
    }

    public Exception? Exception { get; }

    public TimeSpan? Timeout { get; init; }
}
```

`TimeoutTestNodeStateProperty` informs the testing platform that this `TestNode` is failed for a timeout reason. You can report the timeout using the `Timeout` property.

```csharp
public sealed record CancelledTestNodeStateProperty : TestNodeStateProperty
{
    public CancelledTestNodeStateProperty()
        : base(default(string))
    {
    }

    public CancelledTestNodeStateProperty(string explanation)
        : base(explanation)
    {
    }

    public CancelledTestNodeStateProperty(
        Exception exception,
        string? explanation = null)
        : base(explanation ?? exception.Message)
    {
        Exception = exception;
    }

    public Exception? Exception { get; }
}
```

`CancelledTestNodeStateProperty` informs the testing platform that this `TestNode` has failed due to cancellation.
