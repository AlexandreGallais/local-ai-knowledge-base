---
title: "MSTest test lifecycle (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/unit-testing-mstest-writing-tests-lifecycle.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSTest lifecycle

MSTest provides a well-defined lifecycle for test classes and test methods, allowing you to perform setup and teardown operations at various stages of test execution. Understanding the lifecycle helps you write efficient tests and avoid common pitfalls.

## Lifecycle overview

The lifecycle groups into four stages, executed from highest level (assembly) to lowest level (test method):

1. **Assembly-level**: Runs once when the test assembly loads and unloads
1. **Class-level**: Runs once per test class
1. **Global test-level**: Runs before and after every test method in the assembly
1. **Test-level**: Runs for each test method (including each data row in parameterized tests)

## Assembly-level lifecycle

Assembly lifecycle methods run once when the test assembly loads and unloads. Use these for expensive one-time setup like database initialization or service startup.

### `AssemblyInitialize` and `AssemblyCleanup`

```csharp
[TestClass]
public class AssemblyLifecycleExample
{
    private static IHost? _host;

    [AssemblyInitialize]
    public static async Task AssemblyInit(TestContext context)
    {
        // Runs once before any tests in the assembly
        _host = await StartTestServerAsync();
        context.WriteLine("Test server started");
    }

    [AssemblyCleanup]
    public static async Task AssemblyCleanup(TestContext context)
    {
        // Runs once after all tests complete
        // TestContext parameter available in MSTest 3.8+
        if (_host != null)
        {
            await _host.StopAsync();
        }
    }

    private static Task<IHost> StartTestServerAsync()
    {
        // Server initialization
        return Task.FromResult<IHost>(null!);
    }
}
```

#### Requirements

- Methods must be `public static`
- Return type: `void`, `Task`, or `ValueTask` (MSTest v3.3+)
- `AssemblyInitialize` requires one `TestContext` parameter
- `AssemblyCleanup` accepts zero parameters, or one `TestContext` parameter (MSTest 3.8+)
- Only one of each attribute allowed per assembly
- Must be in a class marked with `[TestClass]`

> **Tip:**
> Related analyzers:
>
> - MSTEST0012 - validates `AssemblyInitialize` signature.
> - MSTEST0013 - validates `AssemblyCleanup` signature.

### Shared assembly fixtures with `AssemblyFixtureProvider`

> **Note:**
> The `AssemblyFixtureProviderAttribute` was introduced in MSTest 4.3.0.

By default, `[AssemblyInitialize]` and `[AssemblyCleanup]` methods must be declared in the test assembly that uses them. Use `AssemblyFixtureProviderAttribute` to expose those methods from a shared fixture type. MSTest runs the shared methods once per consuming test assembly, not once for the entire test run.

```csharp
// In a shared library.
public static class SharedAssemblyFixtures
{
    [AssemblyInitialize]
    public static void Init(TestContext context)
    {
        // Runs once per consuming test assembly.
    }

    [AssemblyCleanup]
    public static void Cleanup()
    {
    }
}
```

To expose `SharedAssemblyFixtures` to test assemblies that reference the shared library, add the following assembly-level attribute **in the shared library**:

```csharp
[assembly: AssemblyFixtureProvider(typeof(SharedAssemblyFixtures))]
```

Consuming test assemblies don't need to repeat the attribute when the shared library is reachable through their compiled assembly references. MSTest searches the non-framework assembly reference graph automatically, including transitive references. The marker identifies a fixture type that an assembly supplies; it doesn't opt a consuming test assembly into provider discovery.

Automatic discovery follows references emitted into compiled assembly metadata, not every `ProjectReference` or `PackageReference`. If a shared library contains only fixtures and the consumer doesn't otherwise reference its types, the compiler might omit that library from the assembly reference graph. A project or package reference alone doesn't guarantee discovery.

To register a fixture-only library explicitly, or if you can't modify the shared library, put `[assembly: AssemblyFixtureProvider(typeof(SharedAssemblyFixtures))]` in the consuming test assembly. The marker supplies both an explicit compiled reference and fixture registration. You don't need to call a library API at runtime to force a load. The referenced fixture type can reside in a library that doesn't declare a provider marker.

> **Warning:**
> Starting with MSTest 4.4, MSTest skips `AssemblyFixtureProviderAttribute` discovery when dynamic code isn't supported, including Native AOT runs. Use fixture methods declared directly in the test assembly for Native AOT. The MSTEST0072 analyzer reports configurations that it can detect at build time.

#### Local methods and duplicate providers

Local assembly lifecycle methods take precedence independently:

- A local `[AssemblyInitialize]` method overrides shared initialization. Shared cleanup can still run.
- A local `[AssemblyCleanup]` method overrides shared cleanup. Shared initialization can still run.
- If the test assembly declares both local methods, MSTest skips the shared-provider search.

The attribute allows multiple provider declarations, but each consuming test assembly can use at most one initialization method and one cleanup method. If multiple eligible shared methods fill the same slot and no local method takes precedence, MSTest reports an error.

#### Assembly-load side effects in MSTest 4.3.0 through 4.5.2

In MSTest 4.3.0 through 4.5.2, reflection-based provider discovery loads referenced non-framework assemblies into the test process as it walks the transitive reference graph, before it checks for provider markers. The search can load otherwise-unused, unmarked assemblies even when no shared fixture providers exist.

These extra loads can change `System.AppDomain.GetAssemblies` results and lock DLLs on Windows with .NET Framework.

> **Important:**
> If your tests depend on an unused assembly remaining unloaded and don't use shared fixtures, a temporary workaround for these affected versions is to declare **both** a local `[AssemblyInitialize]` method and a local `[AssemblyCleanup]` method. With both local methods, MSTest skips this provider scan. Declaring only one local method doesn't stop the scan. The workaround bypasses shared-fixture behavior; it isn't required MSTest boilerplate and doesn't prevent other code from loading assemblies.

#### Metadata-first discovery (unreleased)

> **Important:**
> Metadata-first provider discovery is under development. MSTest 4.5.2 still uses the reflection-based search described above. No fixed release version has been assigned, and a 4.5 servicing backport hasn't been accepted.

To avoid loads caused solely by the provider scan, the metadata-first implementation reads assembly references and provider markers from portable executable (PE) metadata.

Metadata-only decisions require a matching assembly identity and a path backed by runtime binding data. On modern .NET, MSTest uses the default load context's runtime-provided trusted platform assemblies (TPA) map. On .NET Framework, metadata-only decisions are limited to unsigned, culture-neutral references in the application's base directory without binding or host overrides. For unloaded references that meet these requirements, MSTest can traverse unmarked assemblies without loading them into the test process.

A nearby DLL or a path suggested by a component dependency resolver alone doesn't establish how the runtime binds the reference.

Actual providers, fixture types registered by consumer markers, and their runtime dependencies can still load normally. MSTest preserves existing assembly binding and load-context identity; the same context doesn't prevent a first-time assembly load.

To preserve existing runtime binding behavior, MSTest uses runtime resolution rather than a metadata-only decision in cases such as:

- A trusted metadata path is unavailable, or a metadata read or resolution attempt fails.
- The consumer uses a custom assembly load context.
- An assembly with the requested simple name is already loaded, even if its full identity matches the reference.
- On .NET Framework, the global assembly cache (GAC), strong-named binding, loaded assembly images, binding redirects, `codeBase` entries, or unknown binding or host policy can affect resolution.

Fallback diagnostics include `using runtime resolution for AssemblyFixtureProvider discovery`. Missing metadata paths produce an informational trace; metadata-read or resolution failures produce warnings. The fallback can load unmarked libraries and lock their DLLs on Windows with .NET Framework. Metadata-first discovery therefore doesn't guarantee that all referenced assemblies stay unloaded or deletable.

The existing marker-placement rules, local-method precedence, duplicate-provider diagnostics, and Native AOT restrictions still apply.

Neither `.runsettings` nor `testconfig.json` provides a switch to enable or disable shared-provider discovery. For the available configuration options, see Configure MSTest.

## Class-level lifecycle

Class lifecycle methods run once per test class, before and after all test methods in that class. Use these for setup shared across tests in a class.

### `ClassInitialize` and `ClassCleanup`

```csharp
[TestClass]
public class ClassLifecycleExample
{
    private static HttpClient? _client;

    [ClassInitialize]
    public static void ClassInit(TestContext context)
    {
        // Runs once before any tests in this class
        _client = new HttpClient
        {
            BaseAddress = new Uri("https://api.example.com")
        };
    }

    [ClassCleanup]
    public static void ClassCleanup()
    {
        // Runs after all tests in this class complete
        _client?.Dispose();
    }

    [TestMethod]
    public async Task GetUsers_ReturnsSuccess()
    {
        HttpResponseMessage response = await _client!.GetAsync("/users");
        Assert.IsTrue(response.IsSuccessStatusCode);
    }
}
```

#### Requirements

- Methods must be `public static`
- Return type: `void`, `Task`, or `ValueTask` (MSTest v3.3+)
- `ClassInitialize` requires one `TestContext` parameter
- `ClassCleanup` accepts zero parameters, or one `TestContext` parameter (MSTest 3.8+)
- Only one of each attribute allowed per class

> **Note:**
> Starting with MSTest 4.2, MSTest reports failures in `ClassCleanup` and `AssemblyCleanup` as a separate test result. The separate result makes cleanup failures easier to identify in Test Explorer and TRX reports.

### Inheritance behavior

Control whether `ClassInitialize` runs for derived classes using `Microsoft.VisualStudio.TestTools.UnitTesting.InheritanceBehavior`:

```csharp
[TestClass]
public class BaseTestClass
{
    [ClassInitialize(InheritanceBehavior.BeforeEachDerivedClass)]
    public static void BaseClassInit(TestContext context)
    {
        // Runs before each derived class's tests
    }
}

[TestClass]
public class DerivedTestClass : BaseTestClass
{
    [TestMethod]
    public void DerivedTest()
    {
        // BaseClassInit runs before this class's tests
    }
}
```

| InheritanceBehavior | Description |
|---------------------|-------------|
| `None` (default) | Initialize runs only for the declaring class |
| `BeforeEachDerivedClass` | Initialize runs before each derived class |

> **Tip:**
> Related analyzers:
>
> - MSTEST0010 - validates `ClassInitialize` signature.
> - MSTEST0011 - validates `ClassCleanup` signature.
> - MSTEST0034 - recommends using `ClassCleanupBehavior.EndOfClass`.

## Global test-level lifecycle

> **Note:**
> Global test lifecycle attributes were introduced in MSTest 3.10.0.

Global test lifecycle methods run before and after *every* test method across the entire assembly, without needing to add code to each test class.

### `GlobalTestInitialize` and `GlobalTestCleanup`

```csharp
[TestClass]
public class GlobalTestLifecycleExample
{
    [GlobalTestInitialize]
    public static void GlobalTestInit(TestContext context)
    {
        // Runs before every test method in the assembly
        context.WriteLine($"Starting test: {context.TestName}");
    }

    [GlobalTestCleanup]
    public static void GlobalTestCleanup(TestContext context)
    {
        // Runs after every test method in the assembly
        context.WriteLine($"Finished test: {context.TestName}");
    }
}
```

#### Requirements

- Methods must be `public static`
- Return type: `void`, `Task`, or `ValueTask`
- Must have exactly one `TestContext` parameter
- Must be in a class marked with `[TestClass]`
- Multiple methods with these attributes are allowed across the assembly

> **Note:**
> When multiple `GlobalTestInitialize` or `GlobalTestCleanup` methods exist, the execution order isn't guaranteed. Starting with MSTest 4.4, global fixture methods support `[Timeout]` and the dedicated global fixture timeout settings.

> **Tip:**
> Related analyzer: MSTEST0050 - validates global test fixture methods.
