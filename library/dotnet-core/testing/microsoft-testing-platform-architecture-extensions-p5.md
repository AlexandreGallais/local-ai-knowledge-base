---
title: "Build extensions for Microsoft.Testing.Platform (MTP) (part 5 of 6)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/testing/microsoft-testing-platform-architecture-extensions.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Build extensions for Microsoft.Testing.Platform (MTP) (part 5 of 6)

### The `ITestHostEnvironmentVariableProvider` extensions

The `ITestHostEnvironmentVariableProvider` is an *out-of-process* extension that enables you to establish custom environment variables for the test host. Utilizing this extension point ensures that the testing platform will initiate a new host with the appropriate environment variables, as detailed in the architecture section.

To register a custom `ITestHostEnvironmentVariableProvider`, utilize the following API:

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);

// ...

builder.TestHostControllers.AddEnvironmentVariableProvider(
    static serviceProvider => new CustomEnvironmentVariableForTestHost());
```

The factory utilizes the IServiceProvider to gain access to the suite of services offered by the testing platform.

> **Important:**
> The sequence of registration is significant, as the APIs are called in the order they were registered.

The `ITestHostEnvironmentVariableProvider` interface includes the following methods and types:

```csharp
public interface ITestHostEnvironmentVariableProvider : ITestHostControllersExtension, IExtension
{
    Task UpdateAsync(IEnvironmentVariables environmentVariables);

    Task<ValidationResult> ValidateTestHostEnvironmentVariablesAsync(
        IReadOnlyEnvironmentVariables environmentVariables);
}

public interface IEnvironmentVariables : IReadOnlyEnvironmentVariables
{
    void SetVariable(EnvironmentVariable environmentVariable);
    void RemoveVariable(string variable);
}

public interface IReadOnlyEnvironmentVariables
{
    bool TryGetVariable(
        string variable,
        [NotNullWhen(true)] out OwnedEnvironmentVariable? environmentVariable);
}

public sealed class OwnedEnvironmentVariable : EnvironmentVariable
{
    public IExtension Owner { get; }

    public OwnedEnvironmentVariable(
        IExtension owner,
        string variable,
        string? value,
        bool isSecret,
        bool isLocked);
}

public class EnvironmentVariable
{
    public string Variable { get; }
    public string? Value { get; }
    public bool IsSecret { get; }
    public bool IsLocked { get; }
}
```

The `ITestHostEnvironmentVariableProvider` is a type of `ITestHostControllersExtension`, which serves as a base for all *test host controller* extensions. Like all other extension points, it also inherits from IExtension. Therefore, like any other extension, you can choose to enable or disable it using the `IExtension.IsEnabledAsync` API.

Consider the details for this API:

`UpdateAsync`: This update API provides an instance of the `IEnvironmentVariables` object, from which you can call the `SetVariable` or `RemoveVariable` methods. When using `SetVariable`, you must pass an object of type `EnvironmentVariable`, which requires the following specifications:

* `Variable`: The name of the environment variable.
* `Value`: The value of the environment variable.
* `IsSecret`: This indicates whether the environment variable contains sensitive information that should not be logged or accessible via the `TryGetVariable`.
* `IsLocked`: This determines whether other `ITestHostEnvironmentVariableProvider` extensions can modify this value.

`ValidateTestHostEnvironmentVariablesAsync`: This method is invoked after all the `UpdateAsync` methods of the registered `ITestHostEnvironmentVariableProvider` instances have been called. It allows you to *verify* the correct setup of the environment variables. It takes an object that implements `IReadOnlyEnvironmentVariables`, which provides the `TryGetVariable` method to fetch specific environment variable information with the `OwnedEnvironmentVariable` object type. After validation, you return a `ValidationResult` containing any failure reasons.

> **Note:**
> The testing platform, by default, implements and registers the `SystemEnvironmentVariableProvider`. This provider loads all the *current* environment variables. As the first registered provider, it executes first, granting access to the default environment variables for all other `ITestHostEnvironmentVariableProvider` user extensions.

If your extension requires intensive initialization and you need to use the async/await pattern, you can refer to the `Async extension initialization and cleanup`. If you need to *share state* between extension points, you can refer to the `CompositeExtensionFactory<T>` section.

### The `ITestHostProcessLifetimeHandler` extensions

The `ITestHostProcessLifetimeHandler` is an *out-of-process* extension that allows you to observe the test host process from an external standpoint. This ensures that your extension remains unaffected by potential crashes or hangs that could be induced by the code under test. Utilizing this extension point will prompt the testing platform to initiate a new host, as detailed in the architecture section.

To register a custom `ITestHostProcessLifetimeHandler`, utilize the following API:

```csharp
var builder = await TestApplication.CreateBuilderAsync(args);

// ...

builder.TestHostControllers.AddProcessLifetimeHandler(
    static serviceProvider => new CustomMonitorTestHost());
```

The factory utilizes the IServiceProvider to gain access to the suite of services offered by the testing platform.

> **Important:**
> The sequence of registration is significant, as the APIs are called in the order they were registered.

The `ITestHostProcessLifetimeHandler` interface includes the following methods:

```csharp
public interface ITestHostProcessLifetimeHandler : ITestHostControllersExtension
{
    Task BeforeTestHostProcessStartAsync(CancellationToken cancellationToken);

    Task OnTestHostProcessStartedAsync(
        ITestHostProcessInformation testHostProcessInformation,
        CancellationToken cancellation);

    Task OnTestHostProcessExitedAsync(
        ITestHostProcessInformation testHostProcessInformation,
        CancellationToken cancellation);
}

public interface ITestHostProcessInformation
{
    int PID { get; }
    int ExitCode { get; }
    bool HasExitedGracefully { get; }
}
```

The `ITestHostProcessLifetimeHandler` is a type of `ITestHostControllersExtension`, which serves as a base for all *test host controller* extensions. Like all other extension points, it also inherits from IExtension. Therefore, like any other extension, you can choose to enable or disable it using the `IExtension.IsEnabledAsync` API.

Consider the following details for this API:

`BeforeTestHostProcessStartAsync`: This method is invoked prior to the testing platform initiating the test hosts.

`OnTestHostProcessStartedAsync`: This method is invoked immediately after the test host starts. This method offers an object that implements the `ITestHostProcessInformation` interface, which provides key details about the test host process result.
> **Important:**
> The invocation of this method does not halt the test host's execution. If you need to pause it, you should register an *in-process* extension such as `ITestHostApplicationLifetime` and synchronize it with the *out-of-process* extension.

`OnTestHostProcessExitedAsync`: This method is invoked when the test suite execution is complete. This method supplies an object that adheres to the `ITestHostProcessInformation` interface, which conveys crucial details about the outcome of the test host process.

The `ITestHostProcessInformation` interface provides the following details:

* `PID`: The process ID of the test host.
* `ExitCode`: The exit code of the process. This value is only available within the `OnTestHostProcessExitedAsync` method. Attempting to access it within the `OnTestHostProcessStartedAsync` method will result in an exception.
* `HasExitedGracefully`: A boolean value indicating whether the test host has crashed. If true, it signifies that the test host did not exit gracefully.

## Auto-register your extension with `TestingPlatformBuilderHook`

Every preceding extension section shows a *manual* registration call (for example, `builder.TestHost.AddDataConsumer(...)`). Asking consumers to edit their `Main` method is a poor onboarding experience. The `Microsoft.Testing.Platform.MSBuild` package solves this by generating a `SelfRegisteredExtensions.AddSelfRegisteredExtensions(builder, args)` method that runs from the autogenerated entry point. To plug your extension into that generated method, ship two artifacts in your NuGet package:

- A public static `TestingPlatformBuilderHook` class with an `AddExtensions` method that registers your extension.
- An MSBuild props file that declares a `<TestingPlatformBuilderHook>` item pointing at that class.

When a consumer installs your package, the MSBuild integration picks up the item and generates the call into your hook, and your extension is registered with no code changes on the consumer side.

> **Note:**
> Auto-registration only works when the consumer has `Microsoft.Testing.Platform.MSBuild` in their project (it's included transitively by MSTest, NUnit, and xUnit runners) and hasn't opted out by setting `<GenerateTestingPlatformEntryPoint>false</GenerateTestingPlatformEntryPoint>`. Consumers who disable the autogenerated entry point still need to call your manual registration API from their `Main` method.

### Create the hook class

Add a `public static class TestingPlatformBuilderHook` in your extension assembly with an `AddExtensions(ITestApplicationBuilder, string[])` method that performs the same registration users would otherwise call manually:

```csharp
using Microsoft.Testing.Platform.Builder;

namespace Contoso.MyExtension;

public static class TestingPlatformBuilderHook
{
    public static void AddExtensions(ITestApplicationBuilder testApplicationBuilder, string[] arguments)
        => testApplicationBuilder.AddMyExtension();
}
```

The class name doesn't have to be `TestingPlatformBuilderHook` — the MSBuild item points at it by full type name — but using that name keeps your code consistent with the in-box extensions like `Microsoft.Testing.Extensions.Retry` and `Microsoft.Testing.Extensions.HotReload`.

The method must:

* Be `public static`.
* Have a first parameter of type `Microsoft.Testing.Platform.Builder.ITestApplicationBuilder`.
* Have a second parameter of type `string[]` (the command-line arguments passed to the test host). You can ignore it if your extension doesn't need it.
* Return `void`.

### Declare the MSBuild item

Ship a props file under `buildMultiTargeting/<PackageId>.props` inside your NuGet package. Declare a `<TestingPlatformBuilderHook>` item that points the MSBuild task at your hook class:

```xml
<Project>
  <ItemGroup>
    <TestingPlatformBuilderHook Include="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx">
      <DisplayName>Contoso.MyExtension</DisplayName>
      <TypeFullName>Contoso.MyExtension.TestingPlatformBuilderHook</TypeFullName>
    </TestingPlatformBuilderHook>
  </ItemGroup>
</Project>
```

The metadata is as follows:

* `Include`: A GUID that uniquely identifies your hook. See The `Include` GUID is a random identifier.
* `DisplayName`: The friendly name shown in MSBuild diagnostic messages when the entry point is generated. Use your package or extension name.
* `TypeFullName`: The fully qualified name of the `TestingPlatformBuilderHook` class you created previously. The MSBuild task uses this to emit `global::Contoso.MyExtension.TestingPlatformBuilderHook.AddExtensions(builder, args);` into the generated entry point.

### The `Include` GUID is a random identifier

The GUID in the `Include` attribute is **not** the same as your extension's `IExtension.Uid`. It's a registration identifier used by the MSBuild task to deduplicate hooks across NuGet references and (in a few well-known cases) to order them.

When you author a new extension, generate a brand new GUID and hard-code it in your props file. Some ways to generate one:

* PowerShell: `[guid]::NewGuid()`
* Visual Studio: **Tools** > **Create GUID**
* `uuidgen` on Linux and macOS

> **Important:**
> Never copy a GUID from another extension's props file (whether shipped by Microsoft or by a third party). Two extensions that share the same `Include` value are treated as duplicates: only one hook is invoked, so your extension silently fails to register.

> **Note:**
> Once you ship a GUID, treat it as permanent. Changing it in a later release is harmless on its own, but reusing the *old* value for a different hook in a future package version can confuse consumers who have both versions in their dependency graph during an upgrade.

### Verify the hook is wired up

After installing your package in a test project that uses `Microsoft.Testing.Platform.MSBuild`, build the project and inspect the generated `SelfRegisteredExtensions.g.cs` file under `obj/<Configuration>/<TargetFramework>/`. You should see a call into your hook, for example:

```csharp
public static void AddSelfRegisteredExtensions(this global::Microsoft.Testing.Platform.Builder.ITestApplicationBuilder builder, string[] args)
{
    global::Contoso.MyExtension.TestingPlatformBuilderHook.AddExtensions(builder, args);
}
```

If the call is missing, double-check that the props file is packaged under `buildMultiTargeting/` (not `build/`) inside the `.nupkg`, that `DisplayName` and `TypeFullName` metadata are present, and that the consumer hasn't set `<GenerateTestingPlatformEntryPoint>false</GenerateTestingPlatformEntryPoint>`.

## Load extensions dynamically

Starting with MTP 2.4.0, pass `--enable-dynamic-extensions` to load extensions declared by `*.testingplatformextensions.json` manifest files next to the test application. MTP doesn't scan for arbitrary assemblies, and dynamic loading stays disabled unless each run explicitly enables it.

Each manifest entry identifies an assembly and a `TestingPlatformBuilderHook` type to invoke. MTP reports every loaded extension in terminal output and fails the run if a manifest, assembly, type, or hook is invalid. Set an entry's `enabled` property to `false` to disable it without deleting the manifest.

> **Warning:**
> Dynamically loaded extensions run with full trust inside the test process. Use manifests and assemblies only from directories and sources you trust.

For the complete manifest contract, see the extension manifest JSON schema and dynamic extension loading design.
