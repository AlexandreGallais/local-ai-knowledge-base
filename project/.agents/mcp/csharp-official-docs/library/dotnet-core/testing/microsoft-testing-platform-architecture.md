---
title: "Create custom extensions for Microsoft.Testing.Platform (MTP)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-architecture.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Create custom extensions

This article is for developers building custom test frameworks or extensions for Microsoft.Testing.Platform (MTP).

> **Note:**
> For complete sample code, see the TestingPlatformExamples in the Microsoft Test Framework repository.

## Extension point summary

| Extension point | In/Out of process | Purpose |
|---|---|---|
| ITestFramework | In-process | The only mandatory extension. Discovers and runs tests. |
| IDataConsumer | In-process | Subscribes to and processes test data from the message bus. |
| ITestSessionLifetimeHandler | In-process | Runs code before and after a test session. |
| ITestApplicationLifecycleCallbacks | In-process | Runs code at the very start and very end of the test host. |
| ICommandLineOptionsProvider | Both | Adds custom command-line options. |
| ITestHostEnvironmentVariableProvider | Out-of-process | Sets environment variables before the test host starts. |
| ITestHostProcessLifetimeHandler | Out-of-process | Observes the test host process externally. |

## In-process vs out-of-process extensions

Extensions are categorized into two types:

- **In-process extensions** run inside the test host process, alongside the test framework. Register them through `builder.TestHost`:

    ```csharp
    var builder = await TestApplication.CreateBuilderAsync(args);
    builder.TestHost.AddXXX(/* ... */);
    ```

- **Out-of-process extensions** run in a separate process that observes the test host. Register them through `builder.TestHostControllers`:

    ```csharp
    var builder = await TestApplication.CreateBuilderAsync(args);
    builder.TestHostControllers.AddXXX(/* ... */);
    ```

Out-of-process extensions are needed when:

- You need to set environment variables before the test host starts.
- You need to monitor the test host externally because user code might crash or hang the process.

When any out-of-process extension is registered, the platform starts a second process automatically.

## The `IExtension` interface

All extension points inherit from `IExtension`, which provides identification and opt-in/opt-out:

```csharp
public interface IExtension
{
    string Uid { get; }
    string Version { get; }
    string DisplayName { get; }
    string Description { get; }
    Task<bool> IsEnabledAsync();
}
```

- `Uid`: A unique identifier for the extension. Choose a unique value to avoid conflicts.
- `Version`: The version of the extension, using semantic versioning.
- `DisplayName`: A user-friendly name that appears in logs and `--info` output.
- `Description`: A description that appears in `--info` output.
- `IsEnabledAsync()`: Return `false` to exclude the extension from the session. Typically decisions are based on configuration or command-line options.

## What to read next

- Build a test framework: Create a custom `ITestFramework` implementation, handle requests, and report test results.
- Build extensions: Create in-process and out-of-process extensions such as data consumers, session handlers, and process monitors.
- VSTest Bridge: Simplify migration of existing VSTest-based test frameworks to MTP.
- Capabilities: Declare and query framework and extension capabilities.
- Services: Access configuration, logging, message bus, and other platform services.
