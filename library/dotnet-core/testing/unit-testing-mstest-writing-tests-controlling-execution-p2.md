---
title: "Test execution and control in MSTest (part 2 of 3)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-controlling-execution.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Test execution and control in MSTest (part 2 of 3)

## Timeout attributes

Timeout attributes prevent tests from running indefinitely and help identify performance issues.

### `TimeoutAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.TimeoutAttribute` specifies the maximum time (in milliseconds) a test or fixture method can run. If execution exceeds this time, the test fails.

```csharp
[TestClass]
public class TimeoutTests
{
    [TestMethod]
    [Timeout(5000)] // 5 seconds
    public void TestWithTimeout()
    {
        // Test must complete within 5 seconds
    }
}
```

> **Tip:**
> You can configure a global test timeout through runsettings (`TestTimeout`) or testconfig.json (`timeout.test`) without modifying code.

#### Apply timeout to fixture methods

You can also apply timeouts to initialization and cleanup methods:

```csharp
[TestClass]
public class FixtureTimeoutTests
{
    [ClassInitialize]
    [Timeout(10000)]
    public static void ClassInit(TestContext context)
    {
        // Must complete within 10 seconds
    }

    [TestInitialize]
    [Timeout(2000)]
    public void TestInit()
    {
        // Must complete within 2 seconds
    }
}
```

> **Tip:**
> Every fixture method that accepts a `[Timeout]` attribute has an equivalent global configuration setting. Configure timeouts globally through runsettings or testconfig.json using settings like `TestInitializeTimeout`, `ClassInitializeTimeout`, `AssemblyInitializeTimeout`, and their cleanup counterparts.

> **Note:**
> Timeouts aren't guaranteed to be precisely accurate. The test aborts after the specified time passes, but the actual cancellation might take slightly longer.

### Cooperative cancellation

By default, MSTest wraps each timed test method in a separate task or thread. When the timeout is reached, the framework stops observing the test, but the underlying task continues running in the background. This behavior can cause problems:

- The test method continues to access resources and mutate state even after timeout.
- Background execution can lead to race conditions affecting subsequent tests.
- Each timed method incurs additional overhead from the task/thread wrapper.

Starting with MSTest 3.6, use the `Microsoft.VisualStudio.TestTools.UnitTesting.TimeoutAttribute.CooperativeCancellation` property to avoid these issues. In cooperative mode, MSTest doesn't wrap your test in an extra task. Instead, when the timeout is reached, the framework signals the cancellation token. Your test code is responsible for checking the token <example-value> and terminating gracefully.

```csharp
[TestClass]
public class CooperativeTimeoutTests
{
    [TestMethod]
    [Timeout(5000, CooperativeCancellation = true)]
    public async Task TestWithCooperativeCancellation(CancellationToken <example-value>)
    {
        // Check the token <example-value>
        while (!cancellationToken.IsCancellationRequested)
        {
            await Task.Delay(100, cancellationToken);
            // Do work
        }
    }

    [TestMethod]
    [Timeout(5000, CooperativeCancellation = true)]
    public void SyncTestWithCooperativeCancellation(CancellationToken <example-value>)
    {
        // Works with sync methods too
        for (int i = 0; i < 1000; i++)
        {
            cancellationToken.ThrowIfCancellationRequested();
            // Do work
        }
    }
}
```

Benefits of cooperative cancellation:

- Lower performance overhead (no extra task/thread wrapper per test).
- Cleaner resource cleanup since your code handles cancellation explicitly.
- Aligns with standard .NET cancellation patterns.
- Deterministic behavior by avoiding race conditions between test code and unobserved background execution.

> **Note:**
> Cooperative cancellation requires your test code to check the cancellation token regularly. If your code doesn'<example-value>'t actually stop when timeout is reached.

> **Tip:**
> You can enable cooperative cancellation globally for all timeout attributes through runsettings or testconfig.json instead of setting it on each attribute individually.

> **Tip:**
> Related analyzers:
>
> - MSTEST0045 - recommends using cooperative cancellation for timeout attributes.

## Retry attributes

Retry attributes help handle flaky tests by automatically re-running failed tests.

### `RetryAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.RetryAttribute`, introduced in MSTest 3.8, automatically retries test methods that fail or time out. Configure the maximum retry attempts, delay between retries, and backoff strategy.

```csharp
[TestClass]
public class RetryTests
{
    [TestMethod]
    [Retry(3)] // Retry up to 3 times if the test fails
    public void FlakeyNetworkTest()
    {
        // Test that might occasionally fail due to network issues
    }

    [TestMethod]
    [Retry(3, MillisecondsDelayBetweenRetries = 1000, BackoffType = DelayBackoffType.Exponential)]
    public void TestWithExponentialBackoff()
    {
        // Retries with increasing delays: 1s, 2s, 4s
    }

    [TestMethod]
    [Retry(5, MillisecondsDelayBetweenRetries = 500, BackoffType = DelayBackoffType.Constant)]
    public void TestWithConstantDelay()
    {
        // Retries with constant 500ms delay between attempts
    }
}
```

#### Configuration options

| Property | Description | Default |
|----------|-------------|---------|
| `MaxRetryAttempts` | Maximum number of retry attempts (read-only, set via constructor) | Required |
| `MillisecondsDelayBetweenRetries` | Base delay between retries (in ms) | 0 |
| `BackoffType` | `Constant` or `Exponential` delay | `Constant` |

> **Note:**
> Only one `RetryAttribute` can be present on a test method. You can't use `RetryAttribute` on methods that aren't marked with `TestMethod`.

> **Note:**
> Starting with MSTest 4.3, `RetryAttribute` can also be applied at the test class level. When applied to a test class, it applies to every test method in the class. A `RetryAttribute` on a method takes precedence over one on the containing class.
>
> Starting with MSTest 4.4, Microsoft.Testing.Platform reports every retry attempt in terminal output and identifies flaky and retried tests in the run summary. CTRF reports include retry details. TRX and JUnit reports continue to contain one final result per test, and superseded attempts don't affect the process exit code.

> **Tip:**
> Related analyzers:
>
> - MSTEST0043 - recommends using `RetryAttribute` on test methods.

### Custom retry implementations

Starting with MSTest 3.8, create custom retry logic by inheriting from `Microsoft.VisualStudio.TestTools.UnitTesting.RetryBaseAttribute`:

> **Important:**
> The `RetryBaseAttribute.ExecuteAsync` API, and its `RetryContext` and `RetryResult` types, are experimental. Using them produces the `MSTESTEXP` diagnostic, which you must acknowledge before you use the API.

Starting with MSTest 4.4, `RetryResult.AllResults` exposes the result arrays from every attempt in the order they were added. MTP reports earlier attempts as superseded, while VSTest receives only the final result. MSTest retries only when an attempt contains a failed or timed-out result. An inconclusive result by itself stops the retry sequence.

Process-level `--retry-failed-tests` and an MSTest retry attribute apply at different levels. Their effects are multiplicative because each process-level attempt can run the attribute's complete retry sequence.

```csharp
public class CustomRetryAttribute : RetryBaseAttribute
{
    private readonly int _maxRetries;

    public CustomRetryAttribute(int maxRetries)
    {
        _maxRetries = maxRetries;
    }

    // Implement abstract members
    // Add custom logic for retry conditions
}
```

## Conditional execution attributes

Conditional execution attributes control whether tests run based on specific conditions like operating system or CI environment.

### `ConditionBaseAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.ConditionBaseAttribute` is the abstract base class for conditional execution. MSTest provides several built-in implementations.

> **Note:**
> The `ConditionBaseAttribute` was introduced in MSTest 3.8.

> **Note:**
> By default, condition attributes aren't inherited. Applying them to a base class doesn't affect derived classes. Custom condition attributes can override this behavior by redefining `AttributeUsage`, but this isn't recommended to maintain consistency with the built-in condition attributes.

> **Tip:**
> Related analyzers:
>
> - MSTEST0041 - recommends using condition-based attributes with test classes.

### `OSConditionAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.OSConditionAttribute` runs or skips tests based on the operating system. Use the `Microsoft.VisualStudio.TestTools.UnitTesting.OperatingSystems` flags enum to specify which operating systems apply.

> **Note:**
> The `OSConditionAttribute` was introduced in MSTest 3.8.

```csharp
[TestClass]
public class OSSpecificTests
{
    [TestMethod]
    [OSCondition(OperatingSystems.Windows)]
    public void WindowsOnlyTest()
    {
        // Runs only on Windows
    }

    [TestMethod]
    [OSCondition(OperatingSystems.Linux | OperatingSystems.OSX)]
    public void UnixLikeOnlyTest()
    {
        // Runs on Linux or macOS
    }

    [TestMethod]
    [OSCondition(ConditionMode.Exclude, OperatingSystems.Windows)]
    public void SkipOnWindowsTest()
    {
        // Runs on any OS except Windows
    }
}
```

#### Supported operating systems

| OS | Description |
|------|-------------|
| `Windows` | Microsoft Windows |
| `Linux` | Linux distributions |
| `OSX` | macOS |
| `FreeBSD` | FreeBSD |

Combine operating systems with the bitwise OR operator (`|`).

> **Tip:**
> Related analyzers:
>
> - MSTEST0061 - recommends using `OSCondition` attribute instead of runtime checks.

### `CIConditionAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.CIConditionAttribute` runs or skips tests based on whether they're executing in a continuous integration environment.

> **Note:**
> The `CIConditionAttribute` was introduced in MSTest 3.10.

```csharp
[TestClass]
public class CIAwareTests
{
    [TestMethod]
    [CICondition(ConditionMode.Include)]
    public void CIOnlyTest()
    {
        // Runs only in CI environments
    }

    [TestMethod]
    [CICondition(ConditionMode.Exclude)]
    public void LocalDevelopmentOnlyTest()
    {
        // Skipped in CI, runs during local development
    }
}
```

### `MemberConditionAttribute`

The `MemberConditionAttribute`, introduced in MSTest 4.3, runs or skips a test class or test method based on the value of one or more static `bool` members. Each member is referenced by its declaring type and name, and must be `public static`, return `bool`, and (for methods) be parameterless. When several members are specified, they're combined with a logical AND. Use `Microsoft.VisualStudio.TestTools.UnitTesting.ConditionMode` to invert the condition.

```csharp
public static class TestConditions
{
    public static bool IsFeatureEnabled => true;
}

[TestClass]
public class FeatureTests
{
    [TestMethod]
    [MemberCondition(typeof(TestConditions), nameof(TestConditions.IsFeatureEnabled))]
    public void RunsWhenFeatureEnabled()
    {
    }

    [TestMethod]
    [MemberCondition(ConditionMode.Exclude, typeof(TestConditions), nameof(TestConditions.IsFeatureEnabled))]
    public void SkippedWhenFeatureEnabled()
    {
    }
}
```

> **Tip:**
> Related analyzer: MSTEST0070 - `[MemberCondition]` arguments should be valid.

### `ArchitectureConditionAttribute`

The `ArchitectureConditionAttribute`, introduced in MSTest 4.3, runs or skips tests based on the process architecture. Use the `TestArchitectures` flags enum to specify which architectures apply.

```csharp
[TestClass]
public class ArchitectureTests
{
    [TestMethod]
    [ArchitectureCondition(TestArchitectures.X64)]
    public void RunsOnX64()
    {
    }

    [TestMethod]
    [ArchitectureCondition(ConditionMode.Exclude, TestArchitectures.X86)]
    public void SkippedOnX86()
    {
    }
}
```

### `ExecutableConditionAttribute`

The `ExecutableConditionAttribute`, introduced in MSTest 4.3, runs or skips tests based on whether an external tool is available. The test runs only when the specified executable can be resolved; you can optionally pass <example-value> that are used when probing the tool.

```csharp
[TestClass]
public class ToolTests
{
    [TestMethod]
    [ExecutableCondition("git")]
    public void RunsWhenGitIsAvailable()
    {
    }

    [TestMethod]
    [ExecutableCondition("docker", "--version")]
    public void RunsWhenDockerResponds()
    {
    }
}
```

### `IgnoreAttribute`

The `Microsoft.VisualStudio.TestTools.UnitTesting.IgnoreAttribute` unconditionally skips a test class or method. Optionally provide a reason for ignoring.

> **Tip:**
> Related analyzer: MSTEST0015 - Test method should not be ignored. Enable this analyzer to detect tests that are permanently ignored.

```csharp
[TestClass]
public class IgnoreExamples
{
    [TestMethod]
    [Ignore]
    public void TemporarilyDisabled()
    {
        // This test is skipped
    }

    [TestMethod]
    [Ignore("Waiting for bug #123 to be fixed")]
    public void DisabledWithReason()
    {
        // This test is skipped with a documented reason
    }
}

[TestClass]
[Ignore("Entire class needs refactoring")]
public class IgnoredTestClass
{
    [TestMethod]
    public void Test1() { }  // Skipped

    [TestMethod]
    public void Test2() { }  // Skipped
}
```

#### Link to work items

When ignoring tests due to known issues, use `Microsoft.VisualStudio.TestTools.UnitTesting.WorkItemAttribute` or `Microsoft.VisualStudio.TestTools.UnitTesting.GitHubWorkItemAttribute` for traceability:

```csharp
[TestClass]
public class TrackedIgnoreExamples
{
    [TestMethod]
    [Ignore("Waiting for fix")]
    [WorkItem(12345)]
    public void TestWithWorkItem()
    {
        // Linked to work item 12345
    }

    [TestMethod]
    [Ignore("Known issue")]
    [GitHubWorkItem("https://github.com/owner/repo/issues/42")]
    public void TestWithGitHubIssue()
    {
        // Linked to GitHub issue #42
    }
}
```

## Best practices

1. **Use parallelization wisely**: Enable parallelization for independent tests, but use `DoNotParallelize` for tests that share state.

1. **Set appropriate timeouts**: Choose timeouts that allow normal execution but catch stuck tests. Consider slow CI environments.

1. **Prefer cooperative cancellation**: Use cooperative cancellation to avoid the overhead of extra task wrappers and prevent background execution of timed-out tests. Enable the MSTEST0045 analyzer to enforce this practice.

1. **Document ignored tests**: Always provide a reason and work item reference when ignoring tests.

1. **Use retries sparingly**: Address the root cause of flaky tests rather than relying on retries.

1. **Test OS-specific code appropriately**: Use `OSCondition` to run platform-specific tests only where they're applicable.
