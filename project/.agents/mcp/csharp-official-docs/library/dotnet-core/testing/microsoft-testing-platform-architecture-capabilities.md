---
title: "Microsoft.Testing.Platform (MTP) capabilities overview (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/testing/microsoft-testing-platform-architecture-capabilities.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Microsoft.Testing.Platform (MTP) capabilities

In the context of MTP, a *capability* refers to the *potential to perform a specific action or provide specific information*. It's a means for the testing framework and extensions to *declare* their *ability* to *operate* in a certain manner or provide specific information to the *requesters*.

The *requesters* can be any component involved in a test session, such as the platform, an extension, or the testing framework itself.

The primary objective of the capability system is to facilitate effective communication among the components involved in a test session, enabling them to exchange information and meet their respective needs accurately.

## Guided example

Let's consider a hypothetical example to demonstrate the necessity of a capability system.

> **Note:**
> This example is purely for illustrative purposes and isn't currently implemented within MTP or any testing framework.

Imagine a situation where you have an extension that requires the testing framework to execute no more than one test at a time. Furthermore, after each test, the extension needs to know the CPU usage for that specific test.

To accommodate the preceding scenario, you need to inquire from the testing framework if:

1. It has the capability to execute only one test at a time.
2. It can provide information regarding the amount of CPU consumed by each test.

How can the extension determine if the testing framework has the ability to operate in this mode and provide CPU usage information for a test session? In MTP, this capability is represented by an implementation the `Microsoft.Testing.Platform.Capabilities.ICapability` interface:

```csharp
// Base capabilities contracts

public interface ICapability
{
}

public interface ICapabilities<TCapability>
    where TCapability : ICapability
{
    IReadOnlyCollection<TCapability> Capabilities { get; }
}

// Specific testing framework capabilities

public interface ITestFrameworkCapabilities : ICapabilities<ITestFrameworkCapability>
{
}

public interface ITestFrameworkCapability : ICapability
{
}
```

As you can see, the `ICapability` interface is a *marker* interface because it can represent *any capability*, and the actual implementation will be context dependent. You'll also observe the `ITestFrameworkCapability`, which inherits from `ICapability` to classify the capability. The capability system's generic nature allows for convenient grouping by context. The `ITestFrameworkCapability` groups all the capabilities implemented by the testing framework. The `ICapabilities<TCapability>` interface reveals the *set* of all capabilities implemented by an extension. Similarly, for the base one, there's a context-specific testing framework called `ITestFrameworkCapabilities`. The `ITestFrameworkCapabilities` is provided to the platform during the testing framework registration process.

To create a capability that addresses the aforementioned scenario, you define it as follows:

```csharp
public interface IDisableParallelismCapability : ITestFrameworkCapability
{
    bool CanDisableParallelism { get; }
    bool CanProvidePerTestCpuConsumption { get; }
    void Enable();
}
```

If the testing framework implements this interface, at runtime, the following can be queried:

* Verify if the testing framework has the ability to turn off parallelism `CanDisableParallelism = true`.
* Determine if the testing framework can supply CPU usage data `CanProvidePerTestCPUConsumption = true`.
* Request the testing adapter to activate this mode by invoking the `Enable()` method before the test session commences.

The hypothetical code fragment inside the extension could be something like:

```csharp
IServiceProvider serviceProvider = null; // TODO: Get IServiceProvider.
var capabilities = serviceProvider.GetRequiredService<ITestFrameworkCapabilities>();

// Utilize the `GetCapability` API to search for the specific capability to query.
var capability = capabilities.GetCapability<IDisableParallelismCapability>();
if (capability is null)
{
    // Capability not supported...
}
else
{
    capability.Enable();
    if (capability.CanDisableParallelism)
    {
        // Do something...
    }

    if (capability.CanProvidePerTestCpuConsumption)
    {
        // Do something...
    }
}
```

The preceding example illustrates how the capability infrastructure enables a powerful mechanism for communicating abilities between the components involved in a test session. While the sample demonstrates a capability specifically designed for the testing framework, any component can expose and implement extensions that inherit from `ICapability`.

It's evident that not all details can be communicated through an interface. Considering the previous example, what should the extension expect if the `CanProvidePerTestCpuConsumption` is supported? What kind of custom information is expected to be transmitted via the IMessageBus by the testing framework? The solution is **documentation of the capability**. It's the responsibility of the capability *owner* to design, ship, and document it as clearly as possible to assist implementors who want to effectively *collaborate* with the extension that requires the specific capability.

For instance, the TRX report extension enables the testing framework to implement the necessary capability to accurately generate a TRX report. The extension to register is included in the <https://www.nuget.org/packages/Microsoft.Testing.Extensions.TrxReport> NuGet package, but the capability to implement is found in the contract-only package.

In conclusion, let's summarize the primary aspects of the capability system:

* It's essential for facilitating clear and stable communication between components.
* All capabilities should inherit from `ICapability` or an interface that inherits from it, and are exposed through a collection with the `ICapabilities` interface.
* It aids in the evolution of features without causing breaking changes. If a certain capability isn't supported, appropriate action can be taken.
* The responsibility of designing, shipping, and documenting the usage of a capability lies with the *capability owner*. MTP can also *own* a capability in the same way as any other extension.
