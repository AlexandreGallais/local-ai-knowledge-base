---
title: "MSTest test lifecycle (part 2 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/unit-testing-mstest-writing-tests-lifecycle.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# MSTest test lifecycle (part 2 of 2)

## Test-level lifecycle

Test-level lifecycle runs for every test method. For parameterized tests, the lifecycle runs for each data row.

### Create test classes from host services

Starting with MSTest 4.5, the experimental `MSTest.Extensions.Hosting` package lets an application-owned `Microsoft.Extensions.Hosting` container create MSTest test classes.

Register the integration in the same host that runs MTP:

```csharp
HostApplicationBuilder builder = Host.CreateApplicationBuilder();
builder.Services.AddSingleton<MyApplicationService>();
builder.Services.AddMSTestTestClassInjection();
```

A test class can request registered services and an optional exact `TestContext` parameter through a public constructor:

```csharp
[TestClass]
public sealed class MyTests(MyApplicationService service, TestContext testContext)
{
    [TestMethod]
    public void ServiceIsAvailable() => Assert.IsNotNull(service);
}
```

The integration creates one dependency-injection scope for each test invocation, including each data row and retry attempt. `TestInitialize`, the test method, and `TestCleanup` share the same test-class instance and scope. After cleanup, MSTest disposes the test-class instance and then the scope. The application still owns the host and root service provider.

This first reflection-based integration doesn't support Native AOT, browser WebAssembly, AOT compilation, or MSTest source generation. The `AddMSTestTestClassInjection` API uses the `MSTESTEXP` diagnostic ID and might change in a future release. For host setup, see Microsoft.Extensions integration.

> **Tip:**
> Related analyzers: MSTEST0063 validates constructors for host-owned injection, and MSTEST0088 reports unsupported build modes.

### Setup phase

Use `TestInitialize` or a constructor for per-test setup:

```csharp
[TestClass]
public class TestLevelSetupExample
{
    private Calculator? _calculator;

    public TestLevelSetupExample()
    {
        // Constructor runs before TestInitialize
        // Use for simple synchronous initialization
    }

    [TestInitialize]
    public async Task TestInit()
    {
        // Runs before each test method
        // Supports async, attributes like Timeout
        _calculator = new Calculator();
        await _calculator.InitializeAsync();
    }

    [TestMethod]
    public void Add_TwoNumbers_ReturnsSum()
    {
        int result = _calculator!.Add(2, 3);
        Assert.AreEqual(5, result);
    }
}
```

**Constructor vs. TestInitialize:**

| Aspect | Constructor | TestInitialize |
|--------|-------------|----------------|
| Async support | No | Yes |
| Timeout support | No | Yes (with `[Timeout]` attribute) |
| Execution order | First | After constructor |
| Inheritance | Base then derived | Base then derived |
| Exception behavior | Cleanup and Dispose don't run (no instance exists) | Cleanup and Dispose still run |

> **Tip:**
> **Which approach should I use?** Constructors are generally preferred because they allow you to use `readonly` fields, which enforces immutability and makes your test class easier to reason about. Use `TestInitialize` when you need async initialization or timeout support.
>
> You can also combine both approaches: use the constructor for simple synchronous initialization of `readonly` fields, and `TestInitialize` for additional async setup that depends on those fields.
>
> You can optionally enable code analyzers to enforce a consistent approach:
>
> - MSTEST0019 - Prefer TestInitialize methods over constructors
> - MSTEST0020 - Prefer constructors over TestInitialize methods

### Execution phase

The test method executes after setup completes. For `async` test methods, MSTest awaits the returned `Task` or `ValueTask`.

> **Warning:**
> Asynchronous test methods don't have a `System.Threading.SynchronizationContext` by default. This doesn't apply to `UITestMethod` tests in UWP and WinUI, which run on the UI thread.

### Cleanup phase

Use `TestCleanup` or `IDisposable`/`IAsyncDisposable` for per-test cleanup:

```csharp
[TestClass]
public class TestLevelCleanupExample
{
    private HttpClient? _client;

    [TestInitialize]
    public void TestInit()
    {
        _client = new HttpClient();
    }

    [TestCleanup]
    public void TestCleanup()
    {
        if (_client != null)
        {
            _client.Dispose();
        }
    }

    [TestMethod]
    public async Task GetData_ReturnsSuccess()
    {
        HttpResponseMessage response = await _client!.GetAsync("https://example.com");
        Assert.IsTrue(response.IsSuccessStatusCode);
    }
}
```

**Cleanup execution order (derived to base):**

1. `TestCleanup` (derived class)
1. `TestCleanup` (base class)
1. `DisposeAsync` (if implemented)
1. `Dispose` (if implemented)

> **Tip:**
> You can optionally enable code analyzers to enforce a consistent cleanup approach:
>
> - MSTEST0021 - Prefer Dispose over TestCleanup methods
> - MSTEST0022 - Prefer TestCleanup over Dispose methods
>
> If you have non-MSTest analyzers enabled, such as .NET code analysis rules, you might see CA1001 suggesting that you implement the dispose pattern when your test class owns disposable resources. This is expected behavior and you should follow the analyzer's guidance.

### Complete test-level order

1. Create instance of test class (constructor)
1. Set `TestContext` property (if present)
1. Run `GlobalTestInitialize` methods
1. Run `TestInitialize` methods (base to derived)
1. Execute test method
1. Update `TestContext` with results (for example, `Outcome` property)
1. Run `TestCleanup` methods (derived to base)
1. Run `GlobalTestCleanup` methods
1. Run `DisposeAsync` (if implemented)
1. Run `Dispose` (if implemented)

> **Tip:**
> Related analyzers:
>
> - MSTEST0008 - validates `TestInitialize` signature.
> - MSTEST0009 - validates `TestCleanup` signature.
> - MSTEST0063 - validates test class constructor.

## Best practices

1. **Use appropriate scope**: Put setup at the highest level that makes sense to avoid redundant work.

1. **Keep setup fast**: Long-running setup affects all tests. Consider lazy initialization for expensive resources.

1. **Clean up properly**: Always clean up resources to prevent test interference and memory leaks.

1. **Handle async correctly**: Use `async Task` return types, not `async void`, for async lifecycle methods.

1. **Consider test isolation**: Each test should be independent. Avoid shared mutable state between tests.

1. **Use GlobalTest sparingly**: Global lifecycle methods run for every test, so keep them lightweight.

## See also

- Write tests in MSTest
- Test execution and control
- TestContext class
